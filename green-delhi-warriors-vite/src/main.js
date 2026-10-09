import "./styles/tokens.css";
import "./styles/main.css";
import {S} from "./state.js";
import {createBackend} from "./backend/index.js";
import {DEFAULT_SITE} from "./config.js";
import {downloadFile} from "./lib/utils.js";
import "./actions.js";
import {render, upd} from "./render.js";

let unsubs=[];
const toArr=s=>s.docs.map(d=>({id:d.id,...(d.data()||{})}));

function listen(){
  unsubs.forEach(f=>f());unsubs=[];
  if(!S.uid) return;
  unsubs.push(S.backend.db.collection("warriors").onSnapshot(s=>{S.W=toArr(s);upd()},e=>{S.err="Could not load data ("+(e.code||"error")+")";render()}));
  unsubs.push(S.backend.db.collection("tolis").onSnapshot(s=>{S.T=toArr(s);upd()},()=>{}));
  unsubs.push(S.backend.db.collection("announcements").onSnapshot(s=>{S.A=toArr(s);upd()},()=>{}));
}

async function start(){
  const b=await createBackend();
  S.backend=b;S.db=b.db;
  S.downloads={save:async({filename,data})=>downloadFile(filename,data)};
  b.db.collection("site").onSnapshot(s=>{
    const d=s.docs.find(x=>x.id==="landing");
    S.SITE={...DEFAULT_SITE,...((d&&d.data())||{})};upd();
  },()=>{});
  b.onAuth(async u=>{
    S.uid=u?u.uid:null;
    S.admin=u?await b.isAdmin(u.uid):false;
    S.ASSETS=S.admin?b.assets:null;
    if(!u){S.W=[];S.T=[];S.A=[]}
    S.err="";S.ready=true;
    listen();render();
  });
  addEventListener("hashchange",render);
}
start();
