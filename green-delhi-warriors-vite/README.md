# Green Delhi Warriors Portal (Vite)

The same portal as the single-file version (start page, landing page, register/login, Warrior dashboard,
Missions, Upload, Toli, Arena, Refer, Training, Rewards, Coordinator Console), rebuilt as a Vite project with
modules and a pluggable backend.

## Quick start (demo mode, no setup)
```bash
npm install
npm run dev
```
Open http://localhost:5173. With no `.env`, a browser-only demo backend (localStorage) is used.
The first account you create becomes the coordinator. Do not use demo mode for real data.

## Production setup (Firebase)
1. Create a Firebase project. Enable **Authentication** (Email/Password, optionally Google), **Firestore** and **Storage**.
2. Copy `.env.example` to `.env` and fill in the web app keys.
3. Deploy the rules: `firebase deploy --only firestore:rules,storage` (rules are in `firestore.rules`, `storage.rules`).
4. Create the first coordinator: in Firestore add a document `admins/<their user uid>` (any fields). Add more the same way.
5. Build and host: `npm run build`, then `firebase deploy --only hosting` (or upload `dist/` to any static host).
6. Custom domain (for example greendelhiwarriors.com): add it in Firebase Hosting > Add custom domain and set the DNS records shown.

## Project structure
```
index.html                 Vite entry
public/images/             CM and Minister portraits (default welcome-page photos)
src/
  main.js                  start-up: backend, auth listener, Firestore listeners
  state.js                 shared mutable state object S
  config.js                targets (SELF, TOLI, PROG), mission types, FAQ, levels, training modules
  render.js                render(), count-up animation, deferred re-render while typing
  actions.js               all click/change/input handlers and save helpers
  lib/utils.js             DOM helpers, escaping, dates, icons, download helper
  lib/ui.js                reusable UI pieces (progress bar, KPI, rings, tables, logos, portraits, confetti)
  lib/game.js              points, levels, streaks, badges, eligibility rules
  views/                   gate, auth, landing, shell, home, missions, upload, toli, arena, refer, learn, rewards, admin
  backend/index.js         picks Firebase or demo backend
  backend/firebase.js      Auth + Firestore + Storage
  backend/local.js         demo backend (localStorage)
  styles/tokens.css        colours, fonts, light/dark tokens
  styles/main.css          layout and components
firestore.rules  storage.rules  firebase.json
```

## Change targets
Edit `SELF`, `TOLI` and `PROG` in `src/config.js`.

## Differences from the Claude-hosted version
- Login is real email/password (and Google with Firebase). The registration flow is: create account, then take the pledge and complete the Warrior profile.
- Coordinators are users listed in the Firestore `admins` collection.
- Logo and portrait uploads (Coordinator tools on the landing page) go to Firebase Storage. Portraits default to `public/images`.
- A "Sign out" item was added to the menu.

## Security notes
The rules block anonymous access and limit coordinator-only writes. They are still permissive in places:
any signed-in user can edit any Toli, and a Warrior could edit fields of their own record (for example claims or entries).
For a large public launch, move verification, points and reward claims into Cloud Functions or a server.

## Testing status
Written by converting the working single-file portal into modules. In the build environment there was no network, so
`npm install` and `vite build` were not run. The modules were syntax-checked, linted for undefined names, and exercised end-to-end
(register, log, Toli, upload, verify, rewards, admin, sign-out) against a fake browser using the demo backend.
The Firebase backend and the security rules have not been run against a real project.
Run `npm run format` once to reformat the generated code with Prettier.
