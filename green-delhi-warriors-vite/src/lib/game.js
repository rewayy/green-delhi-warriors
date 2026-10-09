import {S} from "../state.js";
import {LV, MODS, SELF} from "../config.js";
import {ld} from "./utils.js";

export const me=()=>S.W.find(w=>w.id===S.uid),ents=w=>Array.isArray(w.entries)?w.entries:[];
export const sum=(w,t)=>ents(w).filter(e=>e.type===t).reduce((a,e)=>a+(+e.qty||0),0);
export const stat=w=>({pledge:sum(w,"pledge"),install:sum(w,"install"),report:sum(w,"report"),ewaste:sum(w,"ewaste"),social:sum(w,"social"),media:ents(w).filter(e=>e.type==="media").length,onb:S.W.filter(x=>x.ref&&x.ref===w.code).length});
export const agg=ws=>ws.map(stat).reduce((a,s)=>{for(const k in s)a[k]=(a[k]||0)+s[k];return a},{pledge:0,install:0,report:0,ewaste:0,social:0,media:0,onb:0});
export const pts=w=>{const s=stat(w);return 50+s.pledge*5+s.install*5+s.report*10+Math.floor(s.ewaste/10)+s.social*5+s.media*20+s.onb*25+(w.training||[]).length*10};
export const lvl=p=>LV.reduce((a,l,j)=>p>=l[2]?j:a,0);
export const streak=w=>{const ds=new Set(ents(w).map(e=>e.date));let n=0,d=new Date();if(!ds.has(ld(d)))d.setDate(d.getDate()-1);while(ds.has(ld(d))){n++;d.setDate(d.getDate()-1)}return n};
export const BADGES=[["leaf","Pledged",()=>1,"var(--leaf)"],["pin","First report",(w,s)=>s.report>=1,"var(--coral)"],["phone","App champion",(w,s)=>s.install>=10,"var(--sky)"],["link","Referral star",(w,s)=>s.onb>=5,"var(--vio)"],["cpu","E-waste hero",(w,s)=>s.ewaste>=SELF.ewaste,"var(--sun)"],["camera","Storyteller",(w,s)=>s.media>=5,"var(--coral)"],["book","Scholar",w=>(w.training||[]).length>=MODS.length,"var(--sky)"],["users","Toli member",w=>!!w.toli,"var(--leaf)"],["flame","3-day streak",w=>streak(w)>=3,"var(--o)"]];
export const toliOf=w=>S.T.find(t=>t.id===w.toli);
export const elig=w=>selfDone(stat(w))&&(w.training||[]).length>=MODS.length;
export const selfDone=s=>s.pledge>=SELF.pledge&&s.install>=SELF.install&&s.report>=SELF.report&&s.ewaste>=SELF.ewaste&&s.social>=SELF.social;
