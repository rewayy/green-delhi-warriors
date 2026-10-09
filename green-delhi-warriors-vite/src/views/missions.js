import {M, SELF} from "../config.js";
import {ents, stat} from "../lib/game.js";
import {bar, tbl} from "../lib/ui.js";
import {esc, today} from "../lib/utils.js";

export function missions(m){const s=stat(m);return `<div class="card"><h2>Self missions</h2>${Object.keys(SELF).map(k=>bar(M[k][0],s[k],SELF[k],M[k][1])).join("")}</div>
<div class="card"><h2>Log your work</h2><div class="row"><div><label>Mission</label><select id="ty">${Object.keys(M).map(k=>`<option value="${k}">${esc(M[k][0])}</option>`).join("")}</select></div><div><label id="ql">Quantity</label><input id="q" type="number" min="0" step="any"></div></div>
<div class="row"><div><label>Date</label><input id="d" type="date" value="${today()}"></div><div><label>Place / note</label><input id="p"></div></div>
<button class="btn" data-a="log">Save</button><p class="mut">Pledges and installs: ask people to use your referral code. Pollution reports: report on the Green Delhi App first, then log the count here. Social media: post your photos or videos, then log the count and paste a link to one post in the note. Coordinators verify entries.</p></div>
<div class="card"><h2>Link with the Green Delhi App</h2><label>Your Green Delhi App username or ID</label><input id="app" value="${esc(m.appId||"")}"><button class="btn" data-a="applink">Save link</button> ${m.appId?'<span class="tag">Linked, pending check</span>':''}</div>
<div class="card"><h2>My entries</h2>${tbl(ents(m).slice().reverse().map(e=>[e.date,e.type==="media"?"Awareness upload":(M[e.type]?.[0]||e.type),e.qty+" "+(M[e.type]?.[1]||""),e.place||e.caption||"",e.verified?'<span class="tag">Verified</span>':'<span class="tag p">Pending</span>',e.verified?"":`<button class="btn s" data-a="del" data-k="${esc(e.id)}">Delete</button>`]),["Date","Type","Qty","Note","Status",""])}</div>`}
