import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {titles,leaders,calculate,orbitPosition} from './calculations.mjs';
let checks=0;
function check(name,test){test();checks++;console.log(`PASS ${name}`);}
check('All nine personal rates and annualization',()=>titles.forEach((t,title)=>{let r=calculate('personal',{title,employees:100});assert.equal(r.monthly,t.rate*100);assert.equal(r.annual,r.monthly*12);}));
check('No negative, non-finite, or fractional lives',()=>{assert.equal(calculate('personal',{title:0,employees:-5}).monthly,0);assert.equal(calculate('personal',{title:0,employees:NaN}).monthly,0);assert.equal(calculate('personal',{title:0,employees:10.2}).monthly,350);} );
check('Agency spreads and leadership remain separate',()=>leaders.forEach((l,level)=>{const r=calculate('agency',{level,employees:500});assert.equal(r.spread,500*l.spread);assert.equal(r.bonus,500*l.bonus);assert.equal(r.monthly,500*(l.spread+l.bonus));}));
check('Six generation rates match original tool',()=>{let r=calculate('generations',{level:0,employees:[1000,2000,3000,4000,5000,6000],included:[true,true,true,true,true,true]});assert.equal(r.monthly,17000);assert.equal(r.employees,21000);} );
check('Excluded generations also lose associated leader bonus',()=>{let r=calculate('generations',{level:1,employees:[100,100,100,100,100,100],included:[false,false,false,false,false,false]});assert.equal(r.monthly,0);assert.equal(r.employees,0);} );
check('Channel uses one selected generation only',()=>{assert.equal(calculate('channel',{partners:10,lives:250,generation:0}).monthly,2250);assert.equal(calculate('channel',{partners:10,lives:250,generation:5}).monthly,62.5);} );
check('Split thresholds at 25, 26, 500, 501',()=>{[ [25,.5],[26,.75],[500,.75],[501,.8] ].forEach(([employees,share])=>assert.equal(calculate('split',{title:3,employees,additional:0}).referrerShare,share));} );
check('Split shares reconcile to full case',()=>{let r=calculate('split',{title:3,employees:50,additional:0});assert.equal(r.monthly,1875);assert.equal(r.expert,625);assert.equal(r.monthly+r.expert,r.gross);assert.equal(r.year1,22500);assert.equal(r.tenYears,225000);} );
check('Split projections match explicit month-by-month model',()=>{let r=calculate('split',{title:3,employees:50,additional:2});const monthly=m=>1875*(1+2*m);assert.equal(r.year1,Array.from({length:12},(_,i)=>monthly(i+1)).reduce((a,b)=>a+b,0));assert.equal(r.tenYears,Array.from({length:120},(_,i)=>monthly(i+1)).reduce((a,b)=>a+b,0));assert.equal(r.month12,monthly(12));} );
check('Orbit keeps four card centers inside stage at tested widths',()=>{for(const [width,height,card] of [[340,435,204],[650,504,240],[760,580,272]])for(let angle=0;angle<Math.PI*2;angle+=.1)for(let i=0;i<4;i++){let p=orbitPosition(i,angle,width,height,card);assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));assert.ok(Math.abs(p.x)<width/2);assert.ok(p.scale>=.5&&p.scale<=1.01);}} );
const html=fs.readFileSync('index.html','utf8');
check('Required links and Dreams1 are present',()=>{assert.ok(html.includes('https://contracting.usainsure.com/dreamsconnectedcare'));assert.ok(html.includes('Dreams1'));assert.ok(html.includes('https://form.jotform.com/252424912692156'));assert.equal((html.match(/us06web.zoom.us\/rec\/share/g)||[]).length,2);} );
check('Static images, documents, styles and script links resolve',()=>{for(const [,path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(https?:|mailto:|tel:)/.test(path))continue;assert.ok(fs.existsSync(''+path),path);} });
check('All internal section anchors resolve',()=>{const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(id),id);} );
check('Downloadable brochure assets are valid PDF files',()=>{for(const f of fs.readdirSync('brochures'))assert.equal(fs.readFileSync('brochures/'+f).subarray(0,4).toString(),'%PDF');} );
const productPages=['index.html','quantum.html','lifex.html','crc-benefits.html','dreams-insurance.html'];
check('All five product pages link to the same five destinations',()=>{
  for(const page of productPages){const content=fs.readFileSync(''+page,'utf8');const nav=content.match(/<nav class="product-nav"[\s\S]*?<\/nav>/)?.[0];assert.ok(nav,page);assert.equal((nav.match(/aria-current="page"/g)||[]).length,1);for(const target of productPages)assert.ok(nav.includes(`href="${target}"`),`${page} to ${target}`);assert.ok(nav.includes(`href="${page}" style=`),page);}
});
check('Every product asset and local destination exists, including anchors',()=>{
  for(const page of [...productPages,'resource-viewer.html']){const content=fs.readFileSync(''+page,'utf8');for(const [,raw] of content.matchAll(/(?:src|href|data-lightbox)="([^"\s]+)"/g)){if(/^(https?:|mailto:|tel:)/.test(raw))continue;const [path,anchor]=raw.split('#'),file=path.split('?')[0];const target=''+(file||page);assert.ok(fs.existsSync(target),`${page}: ${raw}`);if(anchor&&target.endsWith('.html')){const targetContent=fs.readFileSync(target,'utf8');assert.ok(targetContent.includes(`id="${anchor}"`),`${page}: ${raw}`);}}}
});
check('Resource library has 25 intact originals, previews, correct formats, and explicit downloads',()=>{
  const resources=JSON.parse(fs.readFileSync('product-resources.json','utf8'));assert.equal(resources.length,25);assert.equal(new Set(resources.map(r=>r.sha256)).size,25);
  const pageFor={care:'index.html',quantum:'quantum.html',lifex:'lifex.html',crc:'crc-benefits.html',dis:'dreams-insurance.html'};
  const downloads=JSON.parse(fs.readFileSync('resource-downloads.json','utf8'));
  for(const r of resources){const content=fs.readFileSync(''+pageFor[r.product],'utf8');const href=r.href||`brochures/${r.slug}.pdf`;let file;
    if(r.downloadId){const item=downloads[r.downloadId];assert.ok(item,r.slug);assert.ok(content.includes(`data-resource-download="${r.downloadId}"`),r.slug);let offset=0;file=Buffer.concat(item.parts.map(part=>{assert.equal(part.offset,offset);const bytes=fs.readFileSync(''+part.path);assert.equal(bytes.length,part.bytes);assert.ok(bytes.length<=8*1024*1024);offset+=bytes.length;return bytes;}));assert.equal(item.sha256,r.sha256);}
    else{file=fs.readFileSync(''+href);assert.ok(content.includes(`href="${href}" download`),r.slug);}
    assert.ok(fs.statSync(`assets/covers/${r.slug}.jpg`).size>2000,r.slug);assert.equal(file.length,r.bytes);assert.equal(createHash('sha256').update(file).digest('hex'),r.sha256,r.slug);if(r.format&&r.format!=='pdf'){assert.equal(file.subarray(0,2).toString(),'PK');assert.ok(content.includes(`Download ${r.format.toUpperCase()}`),r.slug);assert.ok(content.includes(`data-lightbox="assets/covers/${r.slug}.jpg"`),r.slug);}else{assert.equal(file.subarray(0,4).toString(),'%PDF');}
  }
  assert.equal(resources.filter(r=>r.product==='care').length,3);assert.equal(resources.filter(r=>r.product==='dis').length,7);
});
check('All five orbital card centers remain on stage across a full rotation',()=>{
  for(const [width,height,card] of [[324,390,180],[354,435,204],[650,504,240],[760,580,272]])for(let angle=0;angle<Math.PI*2;angle+=.1)for(let i=0;i<5;i++){const p=orbitPosition(i,angle,width,height,card,5);assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));assert.ok(Math.abs(p.x)<width/2);assert.ok(Math.abs(p.y)<height/2);}
  for(let i=0;i<5;i++){const p=orbitPosition(i,-i*Math.PI*2/5,650,504,240,5);assert.ok(Math.abs(p.x)<1e-8);assert.equal(p.front,1);}
  assert.equal((html.match(/data-program="[0-4]"/g)||[]).length,5);assert.equal((html.match(/data-orbit="[0-4]"/g)||[]).length,5);
});
check('Dreams page contains all three supplied feature images and both action paths',()=>{
  const dis=fs.readFileSync('dreams-insurance.html','utf8');for(const asset of ['dis-ecosystem.png','dis-vantage-partnership.png','dis-vantage-advantages.png'])assert.ok(dis.includes(`data-lightbox="assets/${asset}"`));assert.ok(dis.includes('https://dreamsvantage.com'));assert.ok(dis.includes('https://form.jotform.com/252424912692156'));
});
check('LifeX plan date and CRC resource audience remain explicit',()=>{
  const lifex=fs.readFileSync('lifex.html','utf8'),crc=fs.readFileSync('crc-benefits.html','utf8');assert.ok(lifex.includes('January 1, 2025'));assert.ok(lifex.includes('Research Associate'));assert.ok(crc.includes('licensed insurance agency use only'));assert.ok(crc.includes('five or more enrolled medical employees'));
});
check('Explorer tabs identify valid corresponding panels',()=>{
  for(const page of ['quantum.html','lifex.html']){const content=fs.readFileSync(''+page,'utf8');for(const [,id] of content.matchAll(/role="tab"[^>]+aria-controls="([^"]+)"/g))assert.ok(content.includes(`id="${id}" role="tabpanel"`));}
});
console.log(`${checks} validation groups passed.`);
