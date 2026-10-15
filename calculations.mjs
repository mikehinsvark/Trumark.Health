export const titles = [
  {name:'Referral Partner / New Agent',rate:35,employees:'10–99',groups:'1–2'},
  {name:'Agent',rate:40,employees:'100',groups:'3'},
  {name:'Senior Agent',rate:45,employees:'250',groups:'5'},
  {name:'Agency Partner',rate:50,employees:'500',groups:'8'},
  {name:'Senior Agency Partner',rate:55,employees:'750',groups:'10'},
  {name:'Regional Agency Partner',rate:57,employees:'1,000',groups:'12'},
  {name:'National Agency Partner',rate:59,employees:'1,500',groups:'15'},
  {name:'Field Vice Chairman',rate:61,employees:'2,000',groups:'20'},
  {name:'Senior Vice Chairman',rate:62.5,employees:'3,000',groups:'25'}
];
export const leaders = titles.slice(3).map((t,i)=>({...t,spread:[10,15,17,19,21,22.5][i],bonus:[0,5,7,9,11,12.5][i]}));
export const generationRates=[3,2,1,.75,.5,.25];
export const channelRates=[.9,.2,.1,.075,.05,.025];
export const bounded=(v,max=100000,min=0)=>Math.min(max,Math.max(min,Number.isFinite(Number(v))?Number(v):0));
export const count=(v,max=100000)=>Math.round(bounded(v,max));
const pick=(list,index)=>list[count(index,list.length-1)];
export function calculate(type,s){
  let monthly=0,details={};
  if(type==='personal'){
    const title=pick(titles,s.title),employees=count(s.employees);monthly=employees*title.rate;details={title,employees,rate:title.rate};
  }else if(type==='agency'){
    const level=pick(leaders,s.level),employees=count(s.employees);const spread=employees*level.spread,bonus=employees*level.bonus;monthly=spread+bonus;details={level,employees,spread,bonus};
  }else if(type==='generations'){
    const level=pick(leaders,s.level);const rows=generationRates.map((rate,i)=>({rate,employees:s.included?.[i]===false?0:count(s.employees?.[i]),included:s.included?.[i]!==false}));
    const employees=rows.reduce((t,r)=>t+r.employees,0),generations=rows.reduce((t,r)=>t+r.employees*r.rate,0),bonus=employees*level.bonus;monthly=generations+bonus;details={level,rows,employees,generations,bonus};
  }else if(type==='channel'){
    const partners=count(s.partners,1000),lives=count(s.lives),generation=count(s.generation,5),rate=channelRates[generation],employees=partners*lives;monthly=employees*rate;details={partners,lives,rate,employees,generation};
  }else if(type==='split'){
    const title=pick(titles,s.title),employees=count(s.employees),additional=count(s.additional,100),referrerShare=employees<=25?.5:employees<=500?.75:.8;
    const gross=employees*title.rate,expert=gross*(1-referrerShare);monthly=gross*referrerShare;
    const cumulative=months=>monthly*(months+additional*months*(months+1)/2);
    details={title,employees,additional,referrerShare,gross,expert,month12:monthly*(1+additional*12),year1:cumulative(12),month120:monthly*(1+additional*120),tenYears:cumulative(120)};
  }else throw new Error('Unknown calculator');
  return {monthly,annual:monthly*12,...details};
}
export function orbitPosition(index,angle,width,height,cardWidth,total=4){
  const theta=index*Math.PI*2/total+angle,front=(Math.cos(theta)+1)/2;
  const radius=Math.max(55,(width-cardWidth*.88)/2-12);
  return {x:Math.sin(theta)*radius,y:Math.cos(theta)*height*.205,scale:.51+front*.49,rotate:-Math.sin(theta)*31,z:Math.round(front*100)+2,front};
}
