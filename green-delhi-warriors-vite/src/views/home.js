import {S} from "../state.js";
import {CH, LV, M, MC, PROG, SELF} from "../config.js";
import {BADGES, agg, ents, lvl, pts, stat, streak} from "../lib/game.js";
import {bar, cu, kpi, ring} from "../lib/ui.js";
import {esc, ic} from "../lib/utils.js";

export function home(m){const s=stat(m),g=agg(S.W),p=pts(m),i=lvl(p),nx=LV[i+1],st=streak(m);
const fv={pledge:"helped %n people pledge",install:"got %n app installs",report:"filed %n pollution reports",ewaste:"collected %n g of e-waste",media:"shared an awareness post",social:"posted %n photos or videos on social media"};
const feed=S.W.flatMap(w=>ents(w).map(e=>({...e,n:w.name}))).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8);
const done=Math.round(Object.keys(SELF).reduce((a,k)=>a+Math.min(1,s[k]/SELF[k]),0)/Object.keys(SELF).length*100);
const mom=Math.round((Math.min(1,S.W.length/PROG.onboard)+Math.min(1,g.media/PROG.media))/2*100);
const ann=S.A.slice().sort((a,b)=>b.id.localeCompare(a.id)).slice(0,3).map(x=>`<div class="msg">${ic("mega")} ${esc(x.text)} <span class="mut">${esc(x.date)}</span></div>`).join("");
const mc=Object.keys(SELF).map(k=>{const x=s[k],t=SELF[k],[icn,col]=MC[k];return `<div class="mc" style="--c:${col}"><div class="chip" style="--c:${col}">${ic(icn)}</div>${ring(x/t*100,92,col,Math.min(100,Math.round(x/t*100))+"%")}<b>${M[k][0].split(" ").slice(0,2).join(" ")}</b><small>${x} of ${t}</small></div>`}).join("");
return ann+`<div class="hero"><div><span class="pill">Level ${i+1}, ${LV[i][0]}${st?`, ${st}-day streak`:""}</span><h1>Hi ${esc(m.name.split(" ")[0])}, you have</h1><div class="big">${cu("pts",p)}<span style="font-size:.28em;font-weight:600;letter-spacing:0"> points</span></div>${nx?`<div class="pbar"><i style="width:${(p-LV[i][2])/(nx[2]-LV[i][2])*100}%"></i></div><span style="opacity:.85">${nx[2]-p} points to reach ${nx[0]}</span>`:"<span>Top level reached. You are a Delhi Hero.</span>"}</div><div style="text-align:center">${ring(done,150,"#14c47a",done+"%")}<div style="opacity:.85;font-size:13px">missions complete</div></div></div>
<div class="bento"><div class="ch s5 card" style="border:0"><small>Today's challenge</small>${CH[Math.floor(Date.now()/864e5)%CH.length]}</div>
<div class="card s7"><h2>Clean Delhi meter</h2><div class="grid">${kpi(S.W.length,"Warriors")}${kpi(S.T.length,"Tolis")}${kpi(g.pledge,"Pledges")}${kpi(g.install,"App installs")}${kpi(g.report,"Reports")}${kpi(g.ewaste,"grams of e-waste")}</div>${bar("Warriors onboarded",S.W.length,PROG.onboard,"")}${bar("Awareness photos and videos",g.media,PROG.media,"")}</div></div>
<div class="card"><h2>Your missions</h2><div class="mg">${mc}</div></div>
<div class="bento"><div class="card s7"><h2>Badges, ${BADGES.filter(b=>b[2](m,s)).length} of ${BADGES.length} earned</h2><div class="badges">${BADGES.map(b=>`<div class="bd ${b[2](m,s)?"":"off"}" style="--c:${b[3]}"><div class="chip" style="--c:${b[3]}">${ic(b[0])}</div>${b[1]}</div>`).join("")}</div></div>
<div class="card s5"><h2>Live activity</h2>${feed.map(e=>`<div class="feed"><i></i><div><b>${esc(e.n)}</b> ${esc(fv[e.type].replace("%n",e.qty))}<br><span class="mut">${esc(e.date)}</span></div></div>`).join("")||'<p class="mut">Log something today to start the feed.</p>'}</div></div>`}
