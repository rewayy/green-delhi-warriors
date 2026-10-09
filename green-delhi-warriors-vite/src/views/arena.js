import {S} from "../state.js";
import {me, pts} from "../lib/game.js";
import {esc} from "../lib/utils.js";

export function arena(m){const md=i=>`<span class="rk r${i}">${i+1}</span>`;
const ws=S.W.map(w=>({n:w.name+", "+w.college,p:pts(w),me:w.id===S.uid})).sort((a,b)=>b.p-a.p).slice(0,10);
const cs={};S.W.forEach(w=>cs[w.college]=(cs[w.college]||0)+pts(w));const col=Object.entries(cs).map(([n,p])=>({n,p})).sort((a,b)=>b.p-a.p).slice(0,10);
const ts=S.T.map(t=>({n:t.name,p:S.W.filter(w=>w.toli===t.id).reduce((a,w)=>a+pts(w),0)+(t.entries||[]).length*30,me:t.id===m.toli})).sort((a,b)=>b.p-a.p).slice(0,10);
const L=(x)=>x.map((r,i)=>`<div class="lb ${r.me?"me":""}"><span>${md(i)} ${esc(r.n)}</span><b>${r.p}</b></div>`).join("")||'<p class="mut">No data yet.</p>';
return `<div class="card"><h2> Top Warriors</h2>${L(ws)}</div><div class="card"><h2> Top Tolis</h2>${L(ts)}</div><div class="card"><h2> Top Colleges</h2>${L(col)}</div><p class="mut">Points: pledge 5, social post 5, install 5, report 10, 10 g e-waste 1, upload 20, referral 25, training module 10, Toli event 30.</p>`}
