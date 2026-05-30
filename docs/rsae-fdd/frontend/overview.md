---
id: frontend-overview
title: Frontend Overview
sidebar_position: 1
---

# Frontend Overview

The frontend is a **React 19 + Vite** single-page application. It serves two main experiences: a public-facing donation dashboard and a private admin dashboard for RSAE staff.

## Pages

### Public View (`/`)

The landing page, accessible to anyone without login. It displays:

- **Total Funds** — the sum of all donations in the database
- **Fund Breakdown by Category** — a bar chart showing donation amounts per category (Education, Community Support, Legal, Operations, Special Projects)
- **Fund Breakdown by State** — a pie chart showing donations grouped by donor state
- **Staff Log In** button — opens the login modal

### Admin Dashboard (`/app/file-upload` area)

Accessible only to authenticated staff. It provides:

- A table of all donation entries with Date, Fund, Amount, City, and State
- **New Entry** — add a single donation record manually
- **Edit** — update an existing record
- **Delete** — remove a record
- **Date Filter** — filter the table by date range
- **File Upload** — upload a CSV to replace the entire dataset

### Account Pages

| Route | Description |
|---|---|
| `/app/signup` | Staff account signup |
| `/app/forgot-password` | Request a password reset email |
| `/app/auth/reset-password` | Set a new password via reset link |
| `/app/auth/callback` | OAuth redirect handler |

## Data Fetching

The frontend calls the backend API using two API modules:

- `src/api/statsApi.js` — fetches public stats (totals, category breakdown, state breakdown)
- `src/api/donationsApi.js` — fetches and mutates donation records (admin only)

Three custom hooks manage data for the public dashboard:

| Hook | Data |
|---|---|
| `useTotalFunds` | Total donation amount |
| `useCategoryBreakdown` | Donations grouped by category |
| `useStateBreakdown` | Donations grouped by state |

## Routing and Auth Guards

Routes are wrapped in two guard components:

- **`PrivateRoute`** — redirects unauthenticated users away from protected pages
- **`PublicOnlyRoute`** — redirects already-logged-in users away from login/signup pages

The current user is stored in `UserContext` and available throughout the app via `useContext`.

## Tech Stack Summary

| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI |
| React Router | v7 | Routing |
| styled-components | 6 | Styling |
| Recharts | 3 | Charts |
| Firebase | 12 | Authentication |
| Vite | 7 | Build tool |
