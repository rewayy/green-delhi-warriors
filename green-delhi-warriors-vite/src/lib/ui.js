import {S} from "../state.js";
import {FAQ} from "../config.js";
import {esc, ic} from "./utils.js";

export const faqH=()=>FAQ.map(([q,a])=>`<details><summary>${esc(q)}</summary><p class="mut">${esc(a)}</p></details>`).join("");
export const bar=(l,x,t,u)=>`<div class="m"><div class="t"><span>${esc(l)}</span><b>${x} / ${t} ${u||""}</b></div><div class="bar"><i style="width:${Math.min(100,x/t*100)}%"></i></div></div>`;
export const kpi=(x,l)=>`<div class="kpi"><b>${typeof x==="number"?cu("k"+l,x):esc(x)}</b><span>${esc(l)}</span></div>`;
export function celebrate(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3800);const c=["#1f7a4d","#e08433","#3b8bc4","#f2c94c","#e84a7a"];for(let i=0;i<44;i++){const e=document.createElement("i");e.className="cf";e.style.cssText=`left:${Math.random()*100}vw;background:${c[i%5]};animation-delay:${Math.random()*.5}s;--x:${Math.random()*160-80}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),2800)}}
export const cu=(k,n)=>`<span data-k="${k}" data-n="${+n||0}">${+n||0}</span>`;
export const ring=(p,sz,col,txt)=>`<svg class="rg" width="${sz}" height="${sz}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(128,140,180,.25)" stroke-width="10"/><circle class="arc" cx="50" cy="50" r="44" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" transform="rotate(-90 50 50)" style="--c:276.5;stroke-dasharray:276.5;stroke-dashoffset:${276.5*(1-Math.min(1,p/100))}"/><text x="50" y="57" text-anchor="middle" font-size="24" font-weight="800" fill="currentColor" font-family="Bricolage Grotesque,sans-serif">${txt}</text></svg>`;
export const glogo=(k,n,sub)=>`<div class="gl">${IMG(k)?`<img src="${IMG(k)}" alt="${esc(n)} logo">`:`<div class="gm">${ic("shield")}</div>`}<div><b>${esc(n)}</b>${sub?`<span>${esc(sub)}</span>`:""}</div></div>`;
export const portrait=(k,n,r,ini)=>`<div class="pt"><div class="ph">${IMG(k)?`<img src="${IMG(k)}" alt="${esc(n)}">`:`<div class="pi">${ini}</div>`}</div><div><h3>${esc(n)}</h3><p>${esc(r)}</p></div></div>`;
export function tbl(rows,h){return rows.length?`<div class="tw"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map((c,i)=>`<td>${i==0||i==3?esc(c):c.toString().startsWith("<")?c:esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`:'<p class="mut">Nothing yet.</p>'}
export const tb=(rows,h,id)=>rows.length?`<div class="tw"><table ${id?`id="${id}"`:""}><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr class="d">${r.map(c=>`<td>${c&&c.h!==undefined?c.h:esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`:'<p class="mut">Nothing yet.</p>';
export const IMG=k=>{const x=S.SITE[k]||"";return /^(https?:\/\/|data:image\/|\/)/.test(x)?x:""};
