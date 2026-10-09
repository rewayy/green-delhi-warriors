import {DEFAULT_SITE} from "./config.js";

// Single shared, mutable application state (replaces the global variables of the single-file version).
export const S={
  backend:null, db:null, downloads:null, ready:false,
  uid:null, admin:false,
  W:[], T:[], A:[],            // warriors, tolis, announcements
  SITE:{...DEFAULT_SITE}, ASSETS:null,
  gate:true, auth:false, mode:"reg", entered:false, tab:"home", err:"", pend:false,
};
