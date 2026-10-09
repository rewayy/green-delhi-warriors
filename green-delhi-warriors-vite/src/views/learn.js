import {MODS} from "../config.js";
import {faqH} from "../lib/ui.js";
import {esc} from "../lib/utils.js";

export function learn(m){const d=m.training||[];return `<div class="card"><h2>Training (${d.length}/${MODS.length} done)</h2>${MODS.map((x,i)=>`<label style="display:flex;gap:8px;align-items:center;margin:8px 0;color:var(--ink);font-size:15px"><input type="checkbox" style="width:auto" data-a="tr" data-k="${i}" ${d.includes(i)?"checked":""}>${esc(x)}</label>`).join("")}</div><div class="card"><h2>FAQ</h2>${faqH()}</div>`}
