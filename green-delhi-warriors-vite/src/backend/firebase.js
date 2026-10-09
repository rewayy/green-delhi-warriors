// Production backend: Firebase Authentication + Cloud Firestore + Cloud Storage.
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as fbSignOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function createFirebaseBackend() {
  const env = import.meta.env;
  const app = initializeApp({
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  });
  const auth = getAuth(app), fs = getFirestore(app), storage = getStorage(app);
  return {
    name: "firebase",
    canGoogle: true,
    onAuth: (cb) => onAuthStateChanged(auth, (u) => cb(u ? { uid: u.uid, email: u.email } : null)),
    signUp: (email, pw) => createUserWithEmailAndPassword(auth, (email || "").trim(), pw),
    signIn: (email, pw) => signInWithEmailAndPassword(auth, (email || "").trim(), pw),
    signInGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),
    signOut: () => fbSignOut(auth),
    // A coordinator is any user that has a document admins/<uid> (create it in the Firebase console).
    async isAdmin(uid) { try { return (await getDoc(doc(fs, "admins", uid))).exists(); } catch { return false; } },
    db: {
      collection: (name) => ({
        onSnapshot: (cb, err) => onSnapshot(collection(fs, name), (snap) => cb({ docs: snap.docs.map((d) => ({ id: d.id, data: () => d.data() })) }), err),
        doc: (id) => ({
          set: (o) => setDoc(doc(fs, name, id), o),
          update: (p) => updateDoc(doc(fs, name, id), p),
          delete: () => deleteDoc(doc(fs, name, id)),
        }),
      }),
    },
    assets: {
      async upload(file) {
        const r = ref(storage, "site/" + Date.now() + "-" + file.name.replace(/[^\w.-]/g, "_"));
        await uploadBytes(r, file);
        return { id: await getDownloadURL(r) };
      },
    },
  };
}
