import {initializePageNavigation} from './page-navigation.js';
initializePageNavigation();

const one = selector => document.querySelector(selector);
const all = selector => [...document.querySelectorAll(selector)];
const header = one('.site-header');
if(header) new ResizeObserver(() => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)).observe(header);
const current = one('.product-nav [aria-current="page"]');
if(current){const rail=one('.product-nav-inner');const centerCurrent=()=>{rail.scrollLeft=Math.max(0,current.offsetLeft-rail.offsetLeft-rail.clientWidth/2+current.offsetWidth/2);};new ResizeObserver(centerCurrent).observe(rail);centerCurrent();}
// The original Connected Care application retains its menu and clipboard handlers.
if(document.body.classList.contains('product-page')){
  const menu = one('#menu-toggle'), nav = one('#main-nav');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}));
}
all('[data-explorer]').forEach(explorer=>{
  const tabs=[...explorer.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});
    });
    tab.addEventListener('keydown',event=>{
      const vertical=matchMedia('(min-width:681px)').matches;let next;
      if(event.key==='ArrowRight'||(vertical&&event.key==='ArrowDown'))next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft'||(vertical&&event.key==='ArrowUp'))next=(index+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();tabs[next].click();tabs[next].focus();}
    });
  });
});
const lightbox=one('#image-lightbox');
if(lightbox){
  let lastImageTrigger;
  all('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
    lastImageTrigger=button;
    const src=button.dataset.lightbox,title=button.dataset.title;
    one('#lightbox-image').src=src;one('#lightbox-image').alt=title;
    one('#lightbox-title').textContent=title;one('#lightbox-original').href=src;
    lightbox.showModal();
  }));
  one('#close-lightbox').addEventListener('click',()=>lightbox.close());
  lightbox.addEventListener('close',()=>lastImageTrigger?.focus());
  lightbox.addEventListener('click',event=>{if(event.target!==lightbox)return;const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close();});
}
