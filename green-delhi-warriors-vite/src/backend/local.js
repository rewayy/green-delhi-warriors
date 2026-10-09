// Demo backend: everything is stored in this browser's localStorage. NOT for real use.
// Interface (shared with firebase.js): name, canGoogle, onAuth, signUp, signIn, signInGoogle, signOut,
// isAdmin, db.collection(name).onSnapshot / .doc(id).set|update|delete, assets.upload(file).
const DB = "gdw_local_db", ACC = "gdw_local_accounts", SES = "gdw_local_session";
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const subs = new Set();
const emit = () => subs.forEach((f) => f());
addEventListener("storage", emit);

export async function createLocalBackend() {
  const authCbs = new Set();
  const current = () => load(SES, null);
  const notify = () => authCbs.forEach((f) => f(current()));
  const session = (email, uid) => { save(SES, { uid, email }); notify(); };
  return {
    name: "local",
    canGoogle: false,
    onAuth(cb) { authCbs.add(cb); setTimeout(() => cb(current()), 0); return () => authCbs.delete(cb); },
    async signUp(email, pw) {
      email = (email || "").trim().toLowerCase();
      const acc = load(ACC, {});
      if (!/^\S+@\S+\.\S+$/.test(email)) throw { code: "auth/invalid-email" };
      if ((pw || "").length < 6) throw { code: "auth/weak-password" };
      if (acc[email]) throw { code: "auth/email-already-in-use" };
      const uid = "u" + Math.random().toString(36).slice(2, 10);
      acc[email] = { uid, pw, admin: Object.keys(acc).length === 0 };
      save(ACC, acc); session(email, uid);
    },
    async signIn(email, pw) {
      email = (email || "").trim().toLowerCase();
      const a = load(ACC, {})[email];
      if (!a || a.pw !== pw) throw { code: "auth/invalid-credential" };
      session(email, a.uid);
    },
    async signInGoogle() { throw { code: "auth/operation-not-supported-in-this-environment" }; },
    async signOut() { localStorage.removeItem(SES); notify(); },
    async isAdmin(uid) { return Object.values(load(ACC, {})).some((a) => a.uid === uid && a.admin); },
    db: {
      collection(name) {
        return {
          onSnapshot(cb) {
            const f = () => {
              const col = load(DB, {})[name] || {};
              cb({ docs: Object.entries(col).map(([id, v]) => ({ id, data: () => v })) });
            };
            subs.add(f); f();
            return () => subs.delete(f);
          },
          doc(id) {
            const w = (fn) => { const all = load(DB, {}); const col = all[name] || (all[name] = {}); fn(col); save(DB, all); emit(); };
            return {
              async set(o) { w((c) => { c[id] = o; }); },
              async update(p) { w((c) => { c[id] = { ...(c[id] || {}), ...p }; }); },
              async delete() { w((c) => { delete c[id]; }); },
            };
          },
        };
      },
    },
    assets: {
      async upload(file) {
        const id = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
        return { id };
      },
    },
  };
}
