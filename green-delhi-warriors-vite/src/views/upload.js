import {S} from "../state.js";
import {CATS} from "../config.js";
import {ents} from "../lib/game.js";
import {esc, url} from "../lib/utils.js";

export function upload(m){const all=S.W.flatMap(w=>ents(w).filter(e=>e.type==="media").map(e=>({...e,n:w.name}))).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10);
return `<div class="card"><h2>Upload awareness photo or video</h2><p class="mut">Paste a public link (Google Drive, Instagram, YouTube). Awareness on EV policy, Solar policy and keeping Delhi clean, plus pledge photos and videos.</p>
<div class="row"><div><label>Category</label><select id="cat">${CATS.map(c=>`<option>${esc(c)}</option>`).join("")}</select></div><div><label>Photo or video</label><select id="mt"><option>Photo</option><option>Video</option></select></div></div>
<label>Link</label><input id="lk" placeholder="https://"><label>Caption</label><input id="cp"><button class="btn" data-a="media">Upload</button></div>
<div class="card"><h2>Latest uploads</h2>${all.length?all.map(e=>`<div>${url(e.link)?`<a href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">${esc(e.caption||e.link)}</a>`:esc(e.caption)} <span class="mut">· ${esc(e.mt)}, ${esc(e.cat)}, ${esc(e.n)}</span></div>`).join(""):'<p class="mut">No uploads yet.</p>'}</div>`}
