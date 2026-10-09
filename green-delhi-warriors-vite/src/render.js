import {S} from "./state.js";
import {M} from "./config.js";
import {me} from "./lib/game.js";
import {$, esc} from "./lib/utils.js";
import {adminPage} from "./views/admin.js";
import {arena} from "./views/arena.js";
import {authPage} from "./views/auth.js";
import {gatePage} from "./views/gate.js";
import {home} from "./views/home.js";
import {landing, welcome} from "./views/landing.js";
import {learn} from "./views/learn.js";
import {missions} from "./views/missions.js";
import {refer} from "./views/refer.js";
import {rewards} from "./views/rewards.js";
import {shell} from "./views/shell.js";
import {toli} from "./views/toli.js";
import {upload} from "./views/upload.js";

export const seen={};
export function anim(){document.querySelectorAll("[data-n]").forEach(el=>{const k=el.dataset.k,n=+el.dataset.n,f=seen[k]??0;seen[k]=n;if(f===n||matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=n;return}const t0=performance.now(),st=t=>{const x=Math.min(1,(t-t0)/900);el.textContent=Math.round(f+(n-f)*(1-Math.pow(1-x,3)));if(x<1)requestAnimationFrame(st)};requestAnimationFrame(st)})}
export function render(){render0();anim()}
document.addEventListener("focusout",()=>{if(S.pend){S.pend=false;setTimeout(render,50)}});
export const upd=()=>{const e=document.activeElement;if(e&&/INPUT|TEXTAREA|SELECT/.test(e.tagName)&&$("#app").contains(e)){S.pend=true}else render()};
function render0(){
const a=$("#app");
if(location.hash==="#admin"){a.innerHTML='<main class="wide">'+(S.admin?adminPage():'<div class="msg">Coordinator access only. <a href="#">Back to portal</a></div>')+"</main>";anim();return}
if(!S.ready){a.innerHTML='<main class="wide"><p class="mut">Loading…</p></main>';return}
const m=me(),h=S.err?`<div class="msg">${esc(S.err)}</div>`:"",wide=x=>'<main class="wide">'+h+x+"</main>";
if(S.gate){a.innerHTML=wide(gatePage());return}
if(!S.uid&&S.auth){a.innerHTML=wide(authPage());return}
if(!S.uid||!m){a.innerHTML=wide(landing());return}
if(!S.entered){a.innerHTML=wide(welcome(m));return}
const views={home,missions,upload,toli,arena,refer,learn,rewards};
a.innerHTML=shell(m,h+(views[S.tab]||home)(m));
const ty=$("#ty");if(ty){const u=()=>$("#ql").textContent="Quantity ("+M[ty.value][1]+")";ty.onchange=u;u()}}
