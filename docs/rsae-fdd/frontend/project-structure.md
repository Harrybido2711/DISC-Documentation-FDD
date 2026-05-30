---
id: frontend-project-structure
title: Project Structure
sidebar_position: 2
---

# Frontend Project Structure

```
fdd-frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── donationsApi.js       # CRUD calls for donation entries
│   │   └── statsApi.js           # Public stats API calls
│   ├── assets/
│   │   └── icons/                # SVG icons and logo
│   ├── common/
│   │   ├── components/
│   │   │   ├── atoms/            # Base UI components (Button, Text, GoogleButton)
│   │   │   ├── form/             # Form primitives (Input, SubmitButton)
│   │   │   ├── navigation/       # NavBar, login/logout modals
│   │   │   └── routes/           # PrivateRoute, PublicOnlyRoute guards
│   │   ├── contexts/
│   │   │   └── UserContext.jsx   # Global auth state
│   │   ├── layouts/
│   │   │   └── NavLayout.jsx     # Shared layout with NavBar
│   │   └── utils/
│   │       ├── apiUrl.js         # API base URL helper
│   │       └── donationsUtils.js # Donation data formatting helpers
│   ├── hooks/
│   │   ├── useCategoryBreakdown.js
│   │   ├── useStateBreakdown.js
│   │   └── useTotalFunds.js
│   ├── pages/
│   │   ├── account/              # Auth pages (login, signup, reset password)
│   │   ├── admin-dashboard/      # Admin table + modals
│   │   ├── file-upload/          # CSV upload page
│   │   ├── home/                 # Home redirect
│   │   ├── not-found/            # 404 page
│   │   └── public-view/          # Public donation dashboard
│   ├── App.jsx                   # Root component with all routes
│   ├── firebase-config.js        # Firebase app initialization
│   ├── main.jsx                  # Entry point
│   └── index.css
├── .env                          # Environment variables (not committed)
├── package.json
└── vite.config.js
```

## Key Files

### `App.jsx`
Defines all client-side routes using React Router v7. Wraps the app in `UserProvider` for global auth state.

### `firebase-config.js`
Initializes the Firebase app using `VITE_FIREBASE_*` environment variables. Exports `auth` and `googleProvider` used throughout the app.

### `common/contexts/UserContext.jsx`
Provides the current authenticated user to the entire component tree. Components call `useContext(UserContext)` to access or update auth state.

### `common/utils/apiUrl.js`
Builds API URLs based on `VITE_BACKEND_URL`. In development (empty value), requests go through the Vite dev proxy to `localhost:5050`. In production, set `VITE_BACKEND_URL` to your deployed backend URL.

### `pages/public-view/PublicView.jsx`
The main public dashboard. Uses `useTotalFunds`, `useCategoryBreakdown`, and `useStateBreakdown` hooks to fetch data, then renders Recharts charts.

### `pages/admin-dashboard/AdminDashboard.jsx`
The admin table view. Fetches all donations from `GET /api/donations` and renders them in a table. Manages state for the date filter, new entry, edit, and delete modals.

### `pages/file-upload/FileUpload.jsx`
Allows authenticated staff to upload a CSV file that replaces the entire donation dataset via `POST /api/donations/upload`.
