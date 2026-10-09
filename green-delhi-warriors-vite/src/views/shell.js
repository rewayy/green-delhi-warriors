import {S} from "../state.js";
import {lvl, pts} from "../lib/game.js";
import {esc, ic} from "../lib/utils.js";

export function shell(m,body){const items=[["home","Home","home"],["missions","Missions","target"],["upload","Upload","camera"],["toli","My Toli","users"],["arena","Arena","award"],["refer","Refer","link"],["learn","Training","book"],["rewards","Rewards","gift"]];if(S.admin)items.push(["goadmin","Console","shield"]);items.push(["gate0","Start page","leaf"]);items.push(["signout","Sign out","logout"]);const p=pts(m),i=lvl(p);
return `<div class="shell"><aside class="side"><div class="brand" data-a="gate0" title="Back to start page" style="cursor:pointer"><div class="logo">${ic("leaf")}</div><span>Green Delhi<br>Warriors</span></div>${items.map(([k,l,c])=>`<button class="nv ${S.tab===k?"on":""}" data-a="go" data-k="${k}">${ic(c)}<span>${l}</span></button>`).join("")}<div class="me"><div class="av">${esc((m.name||"W")[0].toUpperCase())}</div><div><b>${esc(m.name)}</b><small>Level ${i+1}, ${p} pts</small></div></div></aside><main>${body}</main></div>`}
