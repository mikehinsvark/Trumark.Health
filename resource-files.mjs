const base=new URL('.',import.meta.url);
let catalogPromise;
export function resourceCatalog(){
  if(!catalogPromise)catalogPromise=fetch(new URL('resource-downloads.json',base)).then(response=>{
    if(!response.ok)throw new Error('The download could not be found. Please try again.');
    return response.json();
  }).catch(error=>{catalogPromise=undefined;throw error;});
  return catalogPromise;
}

// Reassemble the original bytes; no image compression or document conversion.
export async function prepareResource(id,onProgress=()=>{},signal){
  const catalog=await resourceCatalog(),item=catalog[id];
  if(!item)throw new Error('This resource is not available.');
  const data=new Uint8Array(item.bytes);
  const controller=new AbortController(),abort=()=>controller.abort();
  if(signal?.aborted)controller.abort();
  signal?.addEventListener('abort',abort,{once:true});
  let next=0,loaded=0;
  onProgress(0);
  async function worker(){
    while(next<item.parts.length){
      const part=item.parts[next++];
      const response=await fetch(new URL(part.path,base),{signal:controller.signal});
      if(!response.ok)throw new Error('The download was interrupted. Please try again.');
      const bytes=new Uint8Array(await response.arrayBuffer());
      if(bytes.length!==part.bytes)throw new Error('The download is incomplete. Please try again.');
      data.set(bytes,part.offset);loaded+=bytes.length;onProgress(Math.round(loaded/item.bytes*100));
    }
  }
  const work=Array.from({length:Math.min(3,item.parts.length)},worker);
  try{await Promise.all(work);}
  catch(error){controller.abort();await Promise.allSettled(work);throw error;}
  finally{signal?.removeEventListener('abort',abort);}
  const digest=await crypto.subtle.digest('SHA-256',data);
  const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
  if(hash!==item.sha256)throw new Error('The file could not be verified. Please try again.');
  return {...item,blob:new Blob([data],{type:item.mime})};
}
