---
id: frontend-features
title: Features
sidebar_position: 4
---

# Frontend Features

FDD features are organized under `src/pages/` with shared API, auth, and utilities in `src/common/`. Each section below maps to a route or embedded module.

## Feature Summary

| Feature | Location | Access |
|---|---|---|
| Public dashboard | `pages/public-view/` | Public |
| Staff entries table | `pages/admin-dashboard/` | Staff (embedded in PublicView) |
| Import / Export | `pages/file-upload/` + toolbar in AdminDashboard | Staff |
| Authentication | `pages/account/` + navigation modals | Mixed |
| 404 | `pages/not-found/` | Public |

---

## Public View (`pages/public-view/`)

**Route:** `/`

**File:** `PublicView.jsx`

The primary entry point for both public visitors and logged-in staff.

### Responsibilities

- Renders the **Public Funds and Donation Dashboard** (total funds, category bar chart, state pie chart)
- Loads live donation data from `GET /api/donations` and builds chart series via `buildDashboardCharts()` in `donationsUtils.js`
- Provides **Staff Log In** for unauthenticated users
- For authenticated staff, toggles between **Dashboard** and **Entries** views
- Embeds `AdminDashboard` when staff select Entries

### Key dependencies

- `fetchDonations` from `common/api/donationsApi.js`
- `StaffLoginModal`, `ForgotPasswordModal`
- `useUser()` from `UserContext`

---

## Admin Dashboard (`pages/admin-dashboard/`)

**Route:** Embedded in `/` when staff view is `entries` (not a separate URL)

**Files:**

| File | Purpose |
|---|---|
| `AdminDashboard.jsx` | Main table, toolbar, search, sort, import/export |
| `EntryFormModal.jsx` | Create and edit donation rows |
| `DeleteEntryModal.jsx` | Confirm deletion |
| `DateFilterModal.jsx` | Filter table by date range |

### Toolbar actions

| Button | Behavior |
|---|---|
| **Date Filter** | Opens modal; filters rows by `donated_at` range (works with search) |
| **Import** | CSV upload via `POST /api/donations/upload` — **appends** rows, does not replace existing data |
| **Export** | Downloads currently filtered rows as CSV (client-side) |
| **New Entry** | Opens create modal → `POST /api/donations/insert` |
| **Edit** | Opens edit modal for selected row → `PUT /api/donations/update/:id` |
| **Delete** | Removes selected row → `DELETE /api/donations/delete/:id` |

### Table columns

Date, Fund, Amount, Category, City, State — sortable and searchable.

### CSV format (import)

Expected columns: `donated_at`, `fund`, `amount`, `category`, `city`, `state`. Rows without a valid `amount` are skipped.

---

## Import / Export (`pages/file-upload/`)

**Route:** `/app/file-upload` (private — requires staff login)

**File:** `FileUpload.jsx`

Standalone page for bulk CSV import and full-dataset export. Uses the same API as the AdminDashboard toolbar:

- **Import** — `uploadDonationsCsv()` → append rows from CSV
- **Export** — fetches all donations and triggers browser download

Also linked from `NavBar` as **Import / Export**.

---

## Authentication (`pages/account/`)

Auth UI is split between **modals on the home page** and **dedicated `/app` routes**.

| File | Route / usage | Purpose |
|---|---|---|
| `StaffLoginModal.jsx` | Modal on `/` | Email/password and Google sign-in for staff |
| `StaffLogin.jsx` | Not routed | Legacy standalone login page |
| `SignUp.jsx` | `/app/signup` | Staff account registration (public-only route) |
| `RequestPasswordReset.jsx` | `/app/forgot-password` | Request reset email |
| `ResetPassword.jsx` | `/app/auth/reset-password` | Set new password from email link |
| `AuthCallback.jsx` | `/app/auth/callback` | OAuth redirect handling |
| `GoogleButton.jsx` | Shared atom | Google sign-in button |
| `styles.js` | — | Shared auth form styles |

### UserContext integration

`UserContext.jsx` listens to Firebase `onAuthStateChanged`, optionally merges backend profile from `/auth/profile`, and exposes login/logout helpers. Components should use `useUser()` rather than calling Firebase directly.

:::note
Some backend auth routes (`/auth/profile`, `/auth/signup`) may not be implemented on all deployments. Firebase auth still works; profile enrichment fails silently and falls back to the Firebase user object.
:::

---

## Navigation (`common/components/navigation/`)

| Component | Purpose |
|---|---|
| `NavBar.jsx` | Top nav for `/app/*` routes |
| `StaffLoginModal.jsx` | Login modal on home page |
| `ForgotPasswordModal.jsx` | Forgot password from home page |
| `LogoutModal.jsx` | Confirm logout from NavBar |

---

## Not Found (`pages/not-found/`)

**Route:** `/app/*` unmatched paths

**File:** `NotFound.jsx`

Basic 404 page for invalid `/app` routes.

---

## Legacy / Unused

| File | Notes |
|---|---|
| `pages/home/Home.jsx` | Not registered in `App.jsx` |
| `pages/account/StaffLogin.jsx` | Superseded by `StaffLoginModal` on PublicView |
| `src/api/donationsApi.js`, `src/api/statsApi.js` | Duplicate/legacy; primary module is `common/api/donationsApi.js` |
| `hooks/useTotalFunds.js`, etc. | Stats hooks; PublicView uses direct donation fetch + `donationsUtils` |

---

## Adding New Features

When extending FDD:

1. **Decide placement** — home page feature (`PublicView`), staff table feature (`admin-dashboard/`), or new `/app` route.
2. **Create page components** under `src/pages/<feature-name>/`.
3. **Register routes** in `App.jsx` with the appropriate guard (`PrivateRoute`, `PublicOnlyRoute`, or none).
4. **Add API calls** in `common/api/` if talking to the backend.
5. **Add shared UI** to `common/components/` only when used in **two or more** features.
6. **Use `useUser()`** for anything that depends on staff authentication.

### Example: new staff-only report page

```
src/pages/reports/Reports.jsx     # page component
App.jsx                           # <Route path="reports" element={<Reports />} /> under PrivateRoute
common/api/reportsApi.js          # optional API module
```

If the feature belongs on the home page (like Entries), embed it in `PublicView` with a new header tab rather than adding NavLayout complexity.
