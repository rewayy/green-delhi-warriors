import {M, MODS, SELF} from "../config.js";
import {selfDone, stat} from "../lib/game.js";
import {bar} from "../lib/ui.js";
import {esc} from "../lib/utils.js";

export function rewards(m){const s=stat(m),ok=selfDone(s)&&(m.training||[]).length>=MODS.length,c=m.claims||{};const L=c.local||{},cnt=Object.keys(SELF).filter(k=>s[k]>=SELF[k]).length+((m.training||[]).length>=MODS.length?1:0);
const lc=`<div class="card"><h2>Local Green Delhi Warrior: physical certificate</h2><p class="mut">Selected Warriors who complete all tasks become a Local Green Delhi Warrior and receive a physical certificate. The certificates are distributed by the Department of Environment, Government of NCT of Delhi.</p>${bar("Tasks completed",cnt,Object.keys(SELF).length+1,"")}${L.given?`<span class="tag">Certificate handed over on ${esc(L.given)}</span>`:L.sel?`<span class="tag">Selected on ${esc(L.sel)}</span><p class="mut">Your coordinator will share the date and venue for collecting your certificate.</p>`:ok?`<span class="tag">Eligible, awaiting selection by the coordinators</span>`:`<span class="tag p">Complete all five missions and the training to become eligible</span>`}<p class="mut">Selection is made by the coordinators from Warriors who have completed all tasks.</p></div>`;
return `<div class="card"><h2>Certificate</h2><p class="mut">Issued to every Warrior who takes the pledge.</p><button class="btn" data-a="cert">Download certificate</button> ${c.cert?'<span class="tag">Claimed</span>':""}</div>
<div class="card"><h2>Merchandise</h2><p class="mut">Unlocks when you finish all five self missions and the training.</p>${Object.keys(SELF).map(k=>bar(M[k][0],s[k],SELF[k],M[k][1])).join("")}${bar("Training modules",(m.training||[]).length,MODS.length,"")}
${c.merch?`<span class="tag">Claim sent on ${esc(c.merch)}. Collect from your college coordinator.</span>`:`<button class="btn" data-a="merch" ${ok?"":"disabled"}>Claim merchandise</button>`}</div>${lc}`}
