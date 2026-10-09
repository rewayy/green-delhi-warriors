import {S} from "./state.js";
import {LV} from "./config.js";
import {ents, lvl, me, pts, stat, toliOf} from "./lib/game.js";
import {celebrate} from "./lib/ui.js";
import {$, authMsg, clean, esc, rnd, today, url, v} from "./lib/utils.js";
import {render} from "./render.js";
import {toli} from "./views/toli.js";

export async function saveW(p){S.err="";const m0=me(),b=pts(m0);try{await S.db.collection("warriors").doc(S.uid).set({...clean(m0),...p});const a=pts({...m0,...p});if(a>b)celebrate("+"+(a-b)+" points! "+(lvl(a)>lvl(b)?"Level up: "+LV[lvl(a)][1]+" "+LV[lvl(a)][0]:"Keep going!"))}catch(e){S.err="Could not save (need Contributor access?). "+(e.code||"");render()}}
export async function saveT(id,o){try{await S.db.collection("tolis").doc(id).set(o)}catch(e){S.err="Could not save Toli. "+(e.code||"");render()}}
document.addEventListener("click",async ev=>{const b=ev.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,k=b.dataset.k,m=me();S.err="";
if(a==="go"){if(k==="goadmin"){location.hash="#admin";return}if(k==="signout"){await S.backend.signOut();S.entered=false;S.gate=true;S.auth=false;S.tab="home";S.err=""}else if(k==="gate0"){S.gate=true;S.auth=false}else S.tab=k}
else if(a==="gate"){S.gate=false;S.mode=k;S.auth=!S.uid;setTimeout(()=>document.getElementById("join")?.scrollIntoView({behavior:"smooth"}),60)}
else if(a==="more"){S.gate=false;setTimeout(()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"}),60)}
else if(a==="authgo"){S.mode=k;S.auth=true}
else if(a==="auth"){const em=v("#em"),pw=document.getElementById("pw").value;try{if(S.mode==="login")await S.backend.signIn(em,pw);else await S.backend.signUp(em,pw)}catch(e){S.err=authMsg(e)}}
else if(a==="google"){try{await S.backend.signInGoogle()}catch(e){S.err=authMsg(e)}}
else if(a==="gate0"){S.gate=true;S.auth=false;if(location.hash==="#admin"){location.hash="";return}}
else if(a==="lw"||a==="lg"){const w=S.W.find(x=>x.id===k),l=w.claims?.local||{},n=a==="lw"?(l.sel?{}:{sel:today()}):{...l,given:today()};try{await S.db.collection("warriors").doc(k).update({claims:{...(w.claims||{}),local:n}})}catch(e){S.err="Could not update."}}
else if(a==="enterp"){S.gate=false;S.entered=true;S.tab="home"}
else if(a==="scr"){document.getElementById(k)?.scrollIntoView({behavior:"smooth",block:"start"});return}
else if(a==="cta"){S.mode=k;S.auth=!S.uid;setTimeout(()=>document.getElementById("join")?.scrollIntoView({behavior:"smooth",block:"start"}),60)}
else if(a==="mode"){S.mode=k}
else if(a==="enter"){S.entered=true}
else if(a==="ann"){const x=v("#an");if(x){try{await S.db.collection("announcements").doc(Date.now().toString(36)).set({text:x,date:today(),by:S.uid})}catch(e){S.err="Could not post."}}}
else if(a==="annx"){try{await S.db.collection("announcements").doc(k).delete()}catch(e){S.err="Could not delete."}}
else if(a==="given"){const w=S.W.find(x=>x.id===k);try{await S.db.collection("warriors").doc(k).update({claims:{...(w.claims||{}),given:today()}})}catch(e){S.err="Could not update."}}
else if(a==="wcsv"){const d=S.downloads,q=x=>'"'+String(x??"").replace(/"/g,'""')+'"',r=[["name","college","course","toli","code","referred_by","pledged","app_id","pledges","installs","reports","ewaste_g","uploads","referrals","points"]];S.W.forEach(w=>{const t=stat(w);r.push([w.name,w.college,w.course||"",toliOf(w)?.name||"",w.code,w.ref||"",w.pledged||"",w.appId||"",t.pledge,t.install,t.report,t.ewaste,t.media,t.onb,pts(w)])});if(d)try{await d.save({filename:"gdw-warriors.csv",data:r.map(x=>x.map(q).join(",")).join("\n")})}catch(e){}return}
else if(a==="reg"){const n=v("#n"),c=v("#c"),rc=v("#rc").toUpperCase(),tc=v("#tc").toUpperCase();let ref="",toli="";
if(!n||!c)S.err="Name and college are required.";
else if(!$("#ag").checked)S.err="Please tick the pledge box to continue.";
else if(rc&&!(ref=S.W.find(w=>w.code===rc)?.code))S.err="That referral code was not found.";
else if(tc&&!(toli=S.T.find(t=>t.code===tc)?.id))S.err="That Toli code was not found.";
if(!S.err){let code;do code="GDW-"+rnd(5);while(S.W.some(w=>w.code===code));
try{await S.db.collection("warriors").doc(S.uid).set({name:n,college:c,course:v("#y"),code,ref,toli,pledged:today(),appId:"",training:[],claims:{},entries:[]});celebrate("Welcome, Warrior! +50 points ");S.entered=true}catch(e){S.err="Could not register. Ask the coordinator for Contributor access. ("+(e.code||"")+")"}}}
else if(a==="log"){const q=parseFloat($("#q").value);if(!(q>0))S.err="Enter a quantity above zero.";else{await saveW({entries:ents(m).concat([{id:Date.now().toString(36),type:v("#ty"),qty:q,date:v("#d")||today(),place:v("#p"),verified:false}])});return}}
else if(a==="media"){const lk=v("#lk");if(!url(lk))S.err="Paste a valid link starting with https://";else{S.tab="missions";await saveW({entries:ents(m).concat([{id:Date.now().toString(36),type:"media",qty:1,date:today(),link:lk,caption:v("#cp"),cat:v("#cat"),mt:v("#mt"),verified:false}])});return}}
else if(a==="applink"){await saveW({appId:v("#app")});return}
else if(a==="del"){await saveW({entries:ents(m).filter(e=>e.id!==k)});return}
else if(a==="ctoli"){const n=v("#tn");if(!n)S.err="Give your Toli a name.";else{const id="t"+Date.now().toString(36);let code;do code="TOLI-"+rnd(4);while(S.T.some(t=>t.code===code));await saveT(id,{name:n,locality:v("#tl"),code,leader:S.uid,entries:[]});await saveW({toli:id});return}}
else if(a==="jtoli"){const t=S.T.find(t=>t.code===v("#jc").toUpperCase());if(!t)S.err="Toli code not found.";else{await saveW({toli:t.id});return}}
else if(a==="tev"){const t=toliOf(m);const lk=v("#tk");if(lk&&!url(lk))S.err="Link must start with https://";else{await saveT(t.id,{...clean(t),entries:(t.entries||[]).concat([{type:v("#tt"),date:v("#td")||today(),venue:v("#tv"),aud:+v("#ta")||0,link:lk}])});return}}
else if(a==="copy"){const t=`Join me as a Green Delhi Warrior! Register on the GDW portal and enter my referral code ${m.code}.`;try{await navigator.clipboard.writeText(t);S.err="Invite message copied."}catch(e){S.err=t}}
else if(a==="tr"){const d=new Set(m.training||[]);d.has(+k)?d.delete(+k):d.add(+k);await saveW({training:[...d]});return}
else if(a==="cert"){const d=S.downloads;if(d){const html=`<html><body style="font-family:Georgia,serif;text-align:center;border:12px double #1f7a4d;padding:60px;margin:20px"><h1 style="color:#1f7a4d">Certificate of Participation</h1><p>Green Delhi Warriors, VAYU Sankalp Pledge</p><h2>${esc(m.name)}</h2><p>${esc(m.college)} has taken the pledge to protect Delhi's environment on ${esc(m.pledged)}.</p><p>Government action + student participation = a cleaner Delhi.</p></body></html>`;try{await d.save({filename:"GDW-certificate.html",data:html});await saveW({claims:{...(m.claims||{}),cert:today()}});return}catch(e){}}}
else if(a==="merch"){await saveW({claims:{...(m.claims||{}),merch:today()}});return}
else if(a==="ver"){const [u,id]=k.split("|"),w=S.W.find(x=>x.id===u);try{await S.db.collection("warriors").doc(u).update({entries:ents(w).map(e=>e.id===id?{...e,verified:!e.verified}:e)})}catch(e){S.err="Could not update."}}
else if(a==="csv"){const d=S.downloads,q=s=>'"'+String(s??"").replace(/"/g,'""')+'"',r=[["date","name","college","toli","type","qty","link","note","verified"]];
S.W.forEach(w=>ents(w).forEach(e=>r.push([e.date,w.name,w.college,toliOf(w)?.name||"",e.type,e.qty,e.link||"",e.place||e.caption||"",e.verified?"yes":"no"])));
if(d)try{await d.save({filename:"gdw-entries.csv",data:r.map(x=>x.map(q).join(",")).join("\n")})}catch(e){}return}
render()});
document.addEventListener("change",async e=>{const k=e.target.dataset?.up;if(!k||!S.ASSETS)return;const f=e.target.files[0];if(!f)return;try{const r=await S.ASSETS.upload(f);await S.db.collection("site").doc("landing").set({...S.SITE,[k]:r.id})}catch(x){S.err="Upload failed ("+(x.code||"error")+")";render()}});
document.addEventListener("input",e=>{if(e.target.id==="wq"){const q=e.target.value.toLowerCase();document.querySelectorAll("#wt tr.d").forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q)?"":"none")}});
