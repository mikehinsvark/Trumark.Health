import {prepareResource,resourceCatalog} from './resource-files.mjs';
const one=selector=>document.querySelector(selector),params=new URLSearchParams(location.search),id=params.get('file');
let fileUrl;
async function load(){
  one('#reader-retry').hidden=true;
  try{
    const item=(await resourceCatalog())[id];
    if(!item)throw new Error('This resource could not be found. Return to the library to choose a document.');
    one('#resource-title').textContent=item.title;document.title=`${item.title} · Dreams Agent Hub`;
    one('#resource-meta').textContent=`${item.format.toUpperCase()} · ${(item.bytes/1048576).toFixed(1)} MB · Original document`;
    one('#reader-cover').src=item.cover;one('#reader-cover').alt=`Cover of ${item.title}`;one('#reader-cover').hidden=false;
    one('#reader-progress').hidden=false;
    const file=await prepareResource(id,percent=>{one('#reader-progress').value=percent;one('#reader-status').textContent=`Preparing your ${item.format==='pdf'?'guide':'presentation'}… ${percent}%`;});
    fileUrl=URL.createObjectURL(file.blob);
    const download=one('#reader-download');download.href=fileUrl;download.download=file.filename;download.hidden=false;
    one('#reader-progress').hidden=true;
    if(file.format==='pdf'){
      one('#reader-status').textContent='Your complete guide is ready. Open the PDF or download the original to read every page.';
      one('#reader-open').href=fileUrl;one('#reader-open').hidden=false;
    }else{one('#reader-status').textContent='Your presentation is ready. Download the original file to open in PowerPoint.';}
    if(params.get('download')==='1')download.click();
  }catch(error){one('#reader-status').textContent=error.message;one('#reader-progress').hidden=true;one('#reader-retry').hidden=false;}
}
one('#reader-retry').addEventListener('click',load);
window.addEventListener('pagehide',()=>{if(fileUrl)URL.revokeObjectURL(fileUrl);});
load();
