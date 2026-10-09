import {S} from "../state.js";

export function authPage(){
const reg=S.mode!=="login";
return `<section class="lhero"><div class="blob b1"></div><div class="blob b2"></div><span class="pill">Green Delhi Warriors</span><h1><span class="ln">${reg?"Create your account.":"Welcome back."}</span></h1><p class="sub">${reg?"Step 1 of 2: create your login. Step 2: take the pledge and complete your Warrior profile.":"Sign in to continue to your portal."}</p></section>
<div class="card" style="max-width:520px;margin:16px auto 0"><div class="seg"><button class="${reg?"on":""}" data-a="mode" data-k="reg">Create account</button><button class="${reg?"":"on"}" data-a="mode" data-k="login">Sign in</button></div>
<label>Email</label><input id="em" type="email" autocomplete="email"><label>Password</label><input id="pw" type="password" autocomplete="${reg?"new-password":"current-password"}" placeholder="At least 6 characters">
<button class="btn" data-a="auth">${reg?"Create account":"Sign in"}</button>${S.backend&&S.backend.canGoogle?`<button class="btn s" style="margin-left:8px" data-a="google">Continue with Google</button>`:""}
${S.backend&&S.backend.name==="local"?`<p class="mut">Demo mode: accounts are stored only in this browser. The first account created becomes the coordinator.</p>`:""}
<p style="margin:12px 0 0"><button class="lnk" style="color:var(--g)" data-a="gate0">Back to start page</button></p></div>`}
