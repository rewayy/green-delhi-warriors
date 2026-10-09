// Chooses the backend at start-up.
// If Firebase keys are present in .env, the real Firebase backend is used.
// Otherwise a browser-only demo backend (localStorage) is used so the app runs with zero setup.
export async function createBackend() {
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    const m = await import("./firebase.js");
    return m.createFirebaseBackend();
  }
  const m = await import("./local.js");
  return m.createLocalBackend();
}
