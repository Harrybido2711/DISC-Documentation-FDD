---
id: frontend-website-layout
title: Website Layout
sidebar_position: 3
---

# Website Layout Guide

The FDD app uses **two layout patterns** depending on the route: a self-contained **PublicView layout** for the home page and a **NavLayout** (top navbar) for routes under `/app/*`.

## Layout Overview

```
┌─────────────────────────────────────────────────────────┐
│  PublicView (/)                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Header: logo | Entries/Dashboard tabs (staff) | login│  │
│  ├───────────────────────────────────────────────────┤  │
│  │ Main: Dashboard charts OR embedded AdminDashboard │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  NavLayout (/app/*)                                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │ NavBar: logo | Dashboard | Fund entries | Import/Export │
│  ├───────────────────────────────────────────────────┤  │
│  │ Page content (FileUpload, SignUp, 404, etc.)      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

Unlike the DISC CRM template, FDD does **not** use a sidebar dashboard layout. Staff management happens on the home page (`PublicView`) or via dedicated `/app/*` routes.

## PublicView (`/`)

The main landing page is **not** wrapped in `NavLayout`. It defines its own header and main content.

### Header behavior

| User state | Left | Center | Right |
|---|---|---|---|
| **Logged out** | RSAE logo | "Public Funds and Donation Dashboard" (when on Dashboard view) | Staff Log In |
| **Logged in (staff)** | Logo + **Entries** / **Dashboard** tabs | Title when on Dashboard | Account menu (initials, logout) |

### Main content views

Staff users toggle between two views using the header tabs:

1. **Dashboard** — public charts (total funds, category bar chart, state pie chart). Data is loaded from the backend via `fetchDonations()` and aggregated client-side.
2. **Entries** — embedded `AdminDashboard` with the donations table, Date Filter, Import, Export, and New/Edit/Delete actions.

Logged-out users always see the **Dashboard** view only.

### Embedded admin section

When staff select **Entries**, `AdminDashboard` renders inside `PublicView` with `embedded={true}`. The section has id `staff-admin` so the NavBar link `/#staff-admin` can scroll to it.

## NavLayout (`/app/*`)

Used for secondary routes that need the shared top navigation bar.

Defined in `src/common/layouts/NavLayout.jsx`:

- Full-height column layout
- `NavBar` at the top
- `<Outlet />` for child route content below

### NavBar links

| Link | Target |
|---|---|
| Dashboard | `/` |
| Fund entries | `/#staff-admin` (scroll anchor on home page) |
| Import / Export | `/app/file-upload` (requires login) |

The NavBar also shows a user icon: opens login modal when logged out, logout modal when logged in.

## Route Guards and Layout Access

Route guards live in `src/common/components/routes/ProtectedRoutes.jsx`:

### `PrivateRoute`

- Used for `/app/file-upload`
- If **not authenticated** → redirect to `/`
- If loading → shows "Loading..."

### `PublicOnlyRoute`

- Used for `/app/signup` and `/app/forgot-password`
- If **already authenticated** → redirect to `/`
- Prevents logged-in staff from seeing signup/forgot-password pages

### Unguarded routes

- `/` — always public
- `/app/auth/callback` — OAuth redirect handler
- `/app/auth/reset-password` — password reset from email link
- `/app/*` not-found — `NotFound` page

## Authentication and Global State

The entire app is wrapped in `UserProvider` (`App.jsx`). Components use `useUser()` for:

- `user` — current Firebase user (plus optional backend profile fields)
- `isLoading` — auth initialization
- `login`, `googleAuth`, `logout`, `requestPasswordReset`

Staff login on the home page uses **modals** (`StaffLoginModal`, `ForgotPasswordModal`) rather than a dedicated login route. Signup and password reset use full pages under `/app`.

## Styling Conventions

- **styled-components** for layout and page-specific UI
- **CSS variables** in `App.css` for RSAE brand colors (`--rsae-gold`, `--rsae-bg`, `--font-agenda`)
- **Recharts** for dashboard visualization inside white card containers
- Responsive grid for charts (two columns on desktop, one on mobile)

## When to Use Which Layout

| Adding… | Use |
|---|---|
| Public or staff-facing page on home | Extend `PublicView` or embed in it |
| Standalone page with top nav | Add route under `/app` inside `NavLayout` |
| Reusable chrome (nav, modals) | `common/components/navigation/` |
| Full-page shell for `/app` children | `NavLayout` |
