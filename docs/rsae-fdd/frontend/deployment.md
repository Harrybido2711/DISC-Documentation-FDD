---
id: frontend-deployment
title: Deployment
sidebar_position: 5
---

# Deploying the Frontend

The FDD frontend is deployed to **Firebase Hosting**. Firebase serves the static production build from `dist/`. The **backend API is deployed separately** — Firebase Hosting does not run `fdd-backend`.

## Architecture at Deploy Time

```
Browser  →  Firebase Hosting (React static files)
         →  fdd-backend API (VITE_BACKEND_URL)
         →  Firebase Auth (VITE_FIREBASE_*)
```

| Component | Hosted on |
|---|---|
| Frontend (`fdd-frontend`) | Firebase Hosting |
| Backend (`fdd-backend`) | Render, Railway, Cloud Run, etc. |
| Staff login | Firebase Authentication |
| Database | Supabase, RDS, or dev SQLite |

---

## Prerequisites

- Node.js and npm installed
- Firebase CLI access (`firebase-tools` is a dev dependency; use `npx firebase`)
- Firebase project created (e.g. `rsae-fdd-22272`)
- Logged in: `npx firebase login`
- Project linked: `npx firebase use --add` → choose project → alias `default`

This creates `.firebaserc` locally (not always committed).

---

## Environment Variables

Vite exposes only variables prefixed with `VITE_`. They are **baked into the build** — changing them requires rebuilding and redeploying.

### Local development (`.env`)

```bash
VITE_BACKEND_URL=http://localhost:5050

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

In dev, `VITE_BACKEND_URL` can be `http://localhost:5050`. Vite also proxies `/api` and `/auth` to port 5050 when the base URL is empty in development mode (see `apiUrl.js` and `vite.config.js`).

### Production (`.env.production`)

Create from `.env.production.example`:

```bash
cp .env.production.example .env.production
```

**Required for production data features:**

```bash
VITE_BACKEND_URL=https://your-deployed-api.example.com
```

Use the **public HTTPS URL** of `fdd-backend`, not `localhost`.

Copy all `VITE_FIREBASE_*` values from `.env`. Firebase config is the same project for dev and prod; only the backend URL typically changes.

### Backend CORS (coordinate with backend deploy)

On `fdd-backend`, set:

```bash
FRONTEND_URL=https://your-project.web.app
FRONTEND_URL_DEV=http://localhost:5173
```

Without `FRONTEND_URL` matching your Hosting URL, browser requests from the live site will be blocked by CORS.

---

## Deploy Commands

From `fdd-frontend/`:

```bash
npm install
npm run deploy
```

What happens:

1. `scripts/firebase-deploy.mjs` runs `firebase deploy --only hosting`
2. Vite builds the app to `dist/` — run `npm run build` first if `dist/` is not up to date (or add a `predeploy` hook to `firebase.json`)
3. Firebase uploads `dist/` and applies SPA rewrites to `index.html`

Manual alternative:

```bash
npm run build
npx firebase deploy --only hosting
```

### Deploy output

On success you receive a Hosting URL, e.g.:

```
https://rsae-fdd-22272.web.app
```

---

## Firebase Hosting Configuration

`firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

Optional: add `"predeploy": ["npm run build"]` under `hosting` to build automatically before each deploy.

The rewrite rule ensures React Router client routes (e.g. `/app/file-upload`) work on refresh.

---

## Firebase Auth for Production

In [Firebase Console](https://console.firebase.google.com) → **Authentication** → **Settings** → **Authorized domains**, include:

- `localhost` (local dev)
- `your-project.web.app`
- `your-project.firebaseapp.com`

Without these, staff login works locally but fails on the deployed URL.

---

## What Works Before Backend Is Deployed

| Feature | Without backend URL |
|---|---|
| Site loads on Firebase | Yes |
| Staff login (Firebase) | Yes (if authorized domains set) |
| Dashboard charts / entries / import / export | No — needs live API |

Until `VITE_BACKEND_URL` points to a deployed API, redeploy after updating `.env.production`.

Verify backend health:

```
https://YOUR-API-URL/health
→ {"status":"ok"}
```

---

## Troubleshooting

### Build fails locally

```bash
npm run build
```

Fix any errors before deploying. Firebase runs the same build in `predeploy`.

### Deploy succeeds but data features broken

- Check `.env.production` — `VITE_BACKEND_URL` must not be `localhost`
- Rebuild: `npm run deploy`
- Confirm backend `/health` responds
- Confirm backend `FRONTEND_URL` matches your Hosting domain

### Import / Export not visible on live site

Staff features require:

1. Staff logged in on the deployed URL
2. **Entries** tab selected (toolbar is on the embedded admin table, not the public dashboard view)
3. Or navigate to `/app/file-upload` while logged in

### Stale site after deploy

Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows).

### Missing Firebase project

Run `npx firebase use --add` or ensure `VITE_FIREBASE_PROJECT_ID` in `.env` matches a real project (used as fallback by the deploy script).

---

## Build Output

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist/` |
| Bundler | Vite 7 |

Production build minifies JS/CSS and hashes asset filenames for caching.

---

## CI / GitHub Actions

The documentation site (`Disc-documentation-fdd`) has its own deploy workflow. The **fdd-frontend** repo deploys manually via Firebase CLI unless you add a separate CI pipeline (e.g. GitHub Action on push to `main` with Firebase service account secrets).

---

## Quick Reference Checklist

1. Backend deployed and `/health` returns OK
2. `.env.production` has correct `VITE_BACKEND_URL` and Firebase keys
3. Backend `FRONTEND_URL` set to Hosting URL
4. Firebase authorized domains configured
5. `npx firebase use --add` completed
6. `npm run deploy` from `fdd-frontend`
