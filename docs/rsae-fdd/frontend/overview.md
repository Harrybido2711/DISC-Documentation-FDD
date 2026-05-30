---
id: frontend-overview
title: Frontend Overview
sidebar_position: 1
---

# Frontend Overview

The frontend is a **React 19 + Vite** single-page application for the RSAE Fund Donation Dashboard (FDD). It serves two main experiences: a **public donation dashboard** and **staff tools** for managing fund entries.

## Documentation Sections

| Page | Description |
|---|---|
| [Project Structure](./project-structure.md) | Directory layout, key files, dependencies |
| [Website Layout](./website-layout.md) | PublicView vs NavLayout, route guards, header behavior |
| [Features](./features.md) | Per-feature breakdown (dashboard, admin table, auth, import/export) |
| [Deployment](./deployment.md) | Firebase Hosting, env vars, troubleshooting |

## User Experiences

### Public dashboard (`/`)

Accessible without login. Displays:

- **Total Funds** — sum of all donations from the backend
- **Fund Breakdown by Category** — bar chart
- **Fund Breakdown by State** — pie chart
- **Staff Log In** — opens login modal

Charts load live data from `GET /api/donations` and aggregate client-side.

### Staff entries (embedded on `/`)

After staff login, the **Entries** tab shows:

- Sortable, searchable donations table
- **Date Filter**, **Import**, **Export**
- **New Entry**, **Edit**, **Delete**

CSV import **appends** rows; export downloads filtered table data as CSV.

### Import / Export page (`/app/file-upload`)

Private route with standalone import and export UI (also linked from the NavBar).

### Account pages

| Route | Description |
|---|---|
| `/app/signup` | Staff signup (public-only) |
| `/app/forgot-password` | Password reset request |
| `/app/auth/reset-password` | Set new password from email link |
| `/app/auth/callback` | OAuth redirect handler |

## Data Fetching

Primary API module: `src/common/api/donationsApi.js`

| Operation | Endpoint |
|---|---|
| List donations | `GET /api/donations` |
| Create | `POST /api/donations/insert` |
| Update | `PUT /api/donations/update/:id` |
| Delete | `DELETE /api/donations/delete/:id` |
| CSV import | `POST /api/donations/upload` |

URL building and dev proxy: `src/common/utils/apiUrl.js`

Optional stats hooks in `src/hooks/` call `/api/stats/*`; the main dashboard uses donation list + `donationsUtils.js` for charts.

## Routing and Auth

- **`PrivateRoute`** — redirects unauthenticated users (e.g. `/app/file-upload`)
- **`PublicOnlyRoute`** — redirects logged-in users away from signup/forgot-password
- **`UserContext`** — global auth state via `useUser()`

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI |
| React Router | v7 | Routing |
| styled-components | 6 | Styling |
| Recharts | 3 | Charts |
| Firebase | 12 | Authentication |
| Vite | 7 | Build tool and dev server |

## Deployment

Production hosting: **Firebase Hosting** (`npm run deploy`). See [Deployment](./deployment.md) for environment variables and backend coordination.

## Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Vite Production Build Guide](https://vite.dev/guide/build)
- [Frontend Repository](https://github.com/Harrybido2711/fdd-frontend)
