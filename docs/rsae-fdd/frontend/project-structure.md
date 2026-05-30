---
id: frontend-project-structure
title: Project Structure
sidebar_position: 2
---

# Frontend Project Structure

The FDD frontend follows a modular React architecture organized by shared utilities and page-level features. This document explains the organization of `fdd-frontend` and the purpose of each directory.

## Directory Overview

```
fdd-frontend/
├── public/                       # Static assets served as-is (logo, favicon)
├── scripts/
│   └── firebase-deploy.mjs       # Deploy helper (build + firebase hosting)
├── src/
│   ├── App.css                   # Global app styles and CSS variables
│   ├── App.jsx                   # Root component and route definitions
│   ├── index.css                 # Base styles
│   ├── main.jsx                  # Application entry point
│   ├── firebase-config.js        # Firebase app initialization
│   │
│   ├── api/                      # Legacy/alternate API modules
│   │   ├── donationsApi.js
│   │   └── statsApi.js
│   │
│   ├── assets/
│   │   └── icons/                # SVG icons, logo, icon registry
│   │
│   ├── common/                   # Shared code across the application
│   │   ├── api/
│   │   │   └── donationsApi.js   # Primary donations CRUD + CSV import API
│   │   ├── components/
│   │   │   ├── atoms/            # Button, Text, GoogleButton
│   │   │   ├── form/             # Input, SubmitButton, Form, styles
│   │   │   ├── navigation/       # NavBar, login/logout modals
│   │   │   ├── routes/           # PrivateRoute, PublicOnlyRoute
│   │   │   ├── users/            # UsersList (admin user listing)
│   │   │   └── ErrorBoundary.jsx
│   │   ├── contexts/
│   │   │   └── UserContext.jsx   # Global auth state and login helpers
│   │   ├── layouts/
│   │   │   └── NavLayout.jsx     # Top-nav layout for /app/* routes
│   │   └── utils/
│   │       ├── apiUrl.js         # API base URL and fetch error helpers
│   │       └── donationsUtils.js # Chart builders, date filter, CSV export
│   │
│   ├── hooks/                    # Custom React hooks (stats API)
│   │   ├── useCategoryBreakdown.js
│   │   ├── useStateBreakdown.js
│   │   └── useTotalFunds.js
│   │
│   └── pages/                    # Route-level page components
│       ├── account/              # Auth pages and modals
│       ├── admin-dashboard/      # Staff entries table and modals
│       ├── file-upload/          # Standalone import/export page
│       ├── home/                 # Legacy home page (not routed)
│       ├── not-found/            # 404 page
│       └── public-view/          # Public dashboard + embedded admin
│
├── .env                          # Local environment variables (not committed)
├── .env.production               # Production build variables
├── firebase.json                 # Firebase Hosting config
├── .firebaserc                   # Firebase project alias (created locally)
├── package.json
└── vite.config.js                # Vite config, path alias, dev proxy
```

## Core Directories

### `src/` Directory

The source directory contains all application code. Pages hold feature UI; `common/` holds reusable pieces.

### `assets/`

Static files that are not React components:

- `icons/`: SVG icons (eye, eye-closed), RSAE logo, and `icons.js` registry
- Images referenced by components or the public folder

### `common/`

Shared resources used across multiple pages:

| Subdirectory | Purpose |
|---|---|
| `api/` | HTTP client for donations (list, create, update, delete, CSV import) |
| `components/` | Reusable UI (forms, navigation, route guards) |
| `contexts/` | React context providers (auth via `UserContext`) |
| `layouts/` | Page shells (`NavLayout` for `/app/*`) |
| `utils/` | API URL building, chart aggregation, CSV export, date filtering |

### `pages/`

Each subdirectory is a feature area tied to one or more routes. Unlike a strict `features/` folder, FDD keeps page components under `pages/` with shared logic in `common/`.

### `hooks/`

Custom hooks that fetch public stats from `/api/stats/*`. The main public dashboard in `PublicView` currently loads donations directly and builds charts via `donationsUtils.js`; the hooks remain available for stats-endpoint-based views.

## Root Files

| File | Role |
|---|---|
| `main.jsx` | Mounts the React app to `#root` |
| `App.jsx` | Wraps routes in `UserProvider`, defines all React Router paths |
| `App.css` | Global styles; defines RSAE color CSS variables (`--rsae-gold`, etc.) |
| `index.css` | Base typography and resets |
| `firebase-config.js` | Initializes Firebase from `VITE_FIREBASE_*` env vars; exports `auth` and `googleProvider` |

## Key Files

### `App.jsx`

Defines client-side routing with React Router v7:

- `/` → `PublicView` (public dashboard + embedded staff entries)
- `/app/file-upload` → `FileUpload` (private)
- `/app/signup`, `/app/forgot-password` → public-only auth pages
- `/app/auth/callback`, `/app/auth/reset-password` → OAuth and password reset

Routes under `/app` use `NavLayout` (top navbar). The home route uses its own header inside `PublicView`.

### `common/utils/apiUrl.js`

Builds API URLs from `VITE_BACKEND_URL`:

- **Development:** empty base URL; Vite proxies `/api` and `/auth` to `localhost:5050`
- **Production:** must set `VITE_BACKEND_URL` to the deployed backend (baked in at build time)

### `common/api/donationsApi.js`

Primary API module for staff data operations:

- `fetchDonations`, `createDonation`, `updateDonation`, `deleteDonation`
- `uploadDonationsCsv` → `POST /api/donations/upload`
- Date formatting helpers for table and forms

### `common/utils/donationsUtils.js`

Client-side helpers:

- `buildDashboardCharts` — aggregates donations into category/state chart data
- `filterByDateRange` — filters entries by from/to date
- `exportDonationsCsv` — downloads table data as CSV in the browser

## Dependencies

| Library | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| styled-components | Component-level styling |
| Recharts | Public dashboard bar and pie charts |
| Firebase | Staff authentication (email/password, Google) |
| Vite | Dev server, production build, path alias `@` → `src` |
| PropTypes | Runtime prop validation |

## Tools Utilized

| Tool | Usage |
|---|---|
| **Vite** | Fast dev server, optimized production builds, dev proxy to backend |
| **Firebase Hosting** | Production deployment of static `dist/` output |
| **Firebase Auth** | Staff login; no custom auth UI server required |
| **vite-plugin-svgr** | Import SVGs as React components |
| **Vitest + Testing Library** | Unit/component tests (dev dependency) |

## Path Alias

`vite.config.js` maps `@` to `src/`, so imports look like:

```js
import { useUser } from '@/common/contexts/UserContext';
import AdminDashboard from '@/pages/admin-dashboard/AdminDashboard';
```
