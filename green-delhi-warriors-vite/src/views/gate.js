import {me} from "../lib/game.js";
import {glogo, portrait} from "../lib/ui.js";

export function gatePage(){const lg=glogo("gov","Government of National Capital Territory of Delhi")+glogo("env","Department of Environment","Government of NCT of Delhi")+glogo("dpcc","Delhi Pollution Control Committee");
const pt=(k,n,r,i)=>portrait(k,n,r,i).replace('class="pt"','class="pt g"');
return `<div class="gov">${lg}</div><section class="lhero gate"><div class="blob b1"></div><div class="blob b2"></div>
<div><span class="pill">Green Delhi Warriors</span>
<h1><span class="ln">Delhi's Youth.</span><span class="ln">Delhi's Environment.</span><span class="ln">Our Responsibility.</span></h1>
<p class="sub">Green Delhi Warriors is a 90-day student movement working with the Government of Delhi to curb pollution. Students take the VAYU Sankalp pledge, report pollution on the Green Delhi App, spread awareness, collect e-waste for authorised recycling and act in their own neighbourhoods.</p>
<div class="cta">${me()?`<button class="btn" data-a="enterp">Go to my portal</button>`:`<button class="btn" data-a="gate" data-k="reg">Register as a Green Delhi Warrior</button><button class="btn w" data-a="gate" data-k="login">Login</button>`}<button class="lnk" data-a="more">Learn more about the programme</button></div></div>
<div class="gate-r">${pt("cm","Smt. Rekha Gupta","Hon'ble Chief Minister of Delhi","R")}${pt("min","Sardar Manjinder Singh Sirsa","Hon'ble Minister of Environment, Government of NCT of Delhi","M")}</div></section>
<div class="foot" style="margin-top:16px"><p>Proposed by Student Green Delhi Warriors, University of Delhi.</p></div>`}
