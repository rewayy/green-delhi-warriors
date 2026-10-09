import {S} from "../state.js";
import {M, TOLI} from "../config.js";
import {agg, stat, toliOf} from "../lib/game.js";
import {bar, tbl} from "../lib/ui.js";
import {esc, today, url} from "../lib/utils.js";

export function toli(m){const t=toliOf(m);if(!t)return `<div class="card"><h2>Create a Toli</h2><div class="row"><div><label>Toli name</label><input id="tn"></div><div><label>Locality adopted</label><input id="tl"></div></div><button class="btn" data-a="ctoli">Create Toli</button></div>
<div class="card"><h2>Join a Toli</h2><label>Toli code</label><input id="jc" placeholder="TOLI-XXXX"><button class="btn" data-a="jtoli">Join</button></div>`;
const ms=S.W.filter(w=>w.toli===t.id),g=agg(ms),te=Array.isArray(t.entries)?t.entries:[];
return `<div class="card"><h2>${esc(t.name)}</h2><p class="mut">${esc(t.locality||"")}, ${ms.length} members, Join code <b>${esc(t.code)}</b></p>${Object.keys(TOLI).map(k=>bar(M[k][0],g[k],TOLI[k],M[k][1])).join("")}</div>
<div class="card"><h2>Members</h2>${tbl(ms.map(w=>{const s=stat(w);return [w.name,w.college,s.pledge,s.install,s.report,s.ewaste+" g",s.social]}),["Name","College","Pledges","Installs","Reports","E-waste","Social posts"])}</div>
<div class="card"><h2>Group activity: Nukkad Natak and social media</h2><div class="row"><div><label>Type</label><select id="tt"><option value="nukkad">Nukkad Natak</option><option value="social">Social media post</option></select></div><div><label>Date</label><input id="td" type="date" value="${today()}"></div></div>
<div class="row"><div><label>Venue / platform</label><input id="tv"></div><div><label>Audience reached</label><input id="ta" type="number" min="0"></div></div><label>Link to photo, video or post (optional)</label><input id="tk" placeholder="https://"><button class="btn" data-a="tev">Add</button>
<div style="margin-top:10px">${tbl(te.slice().reverse().map(e=>[e.date,e.type==="nukkad"?"Nukkad Natak":"Social post",e.venue||"",e.aud||0,e.link&&url(e.link)?`<a href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">View</a>`:""]),["Date","Type","Where","Reach",""])}</div></div>`}
