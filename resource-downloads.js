import {prepareResource} from './resource-files.mjs';
const links=[...document.querySelectorAll('[data-resource-download]')];
if(links.length){
  const notice=document.createElement('div');
  notice.className='resource-download-status';notice.hidden=true;
  notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');
  const message=document.createElement('span'),dismiss=document.createElement('button');
  dismiss.type='button';dismiss.textContent='×';dismiss.setAttribute('aria-label','Dismiss download status');
  notice.append(message,dismiss);document.body.append(notice);
  dismiss.addEventListener('click',()=>{notice.hidden=true;});
  let busy=false;
  links.forEach(link=>link.addEventListener('click',async event=>{
    event.preventDefault();
    if(busy){notice.hidden=false;return;}
    busy=true;notice.hidden=false;dismiss.hidden=true;
    const id=link.dataset.resourceDownload,related=links.filter(item=>item.dataset.resourceDownload===id);
    related.forEach(item=>{item.setAttribute('aria-disabled','true');item.setAttribute('aria-busy','true');});
    try{
      const file=await prepareResource(id,percent=>{message.textContent=`Preparing your download… ${percent}%`;});
      const url=URL.createObjectURL(file.blob),download=document.createElement('a');
      download.href=url;download.download=file.filename;download.hidden=true;document.body.append(download);download.click();download.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
      message.textContent=`${file.title} is ready. Your download has started.`;
    }catch(error){message.textContent=error.message||'The download could not be completed. Please try again.';}
    finally{busy=false;dismiss.hidden=false;related.forEach(item=>{item.removeAttribute('aria-disabled');item.removeAttribute('aria-busy');});}
  }));
}
