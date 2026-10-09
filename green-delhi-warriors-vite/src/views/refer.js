import {S} from "../state.js";
import {PROG} from "../config.js";
import {esc} from "../lib/utils.js";

export function refer(m){const rs=S.W.filter(w=>w.ref===m.code),top=S.W.map(w=>({n:w.name,c:S.W.filter(x=>x.ref===w.code).length})).filter(x=>x.c).sort((a,b)=>b.c-a.c).slice(0,5);
return `<div class="card"><h2>Your referral code</h2><div class="code">${esc(m.code)}</div><p><button class="btn s" data-a="copy">Copy invite message</button></p>
<p class="mut">Use it three ways: friends enter it when joining this portal; people you help pledge mention it; people installing the Green Delhi App are asked for it. Joins are counted automatically. Log pledges and installs on the Missions tab.</p></div>
<div class="card"><h2>Warriors you onboarded: ${rs.length} / ${PROG.onboard}</h2>${rs.map(w=>`<div>${esc(w.name)} <span class="mut">· ${esc(w.college)}</span></div>`).join("")||'<p class="mut">Nobody yet. Share your code.</p>'}</div>
<div class="card"><h2>Top referrers</h2>${top.map((x,i)=>`<div>${i+1}. ${esc(x.n)}, ${x.c}</div>`).join("")||'<p class="mut">No data yet.</p>'}</div>`}
