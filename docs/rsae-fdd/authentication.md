---
id: authentication
title: Authentication
sidebar_position: 3
---

# Authentication

The RSAE-FDD project uses **Firebase Authentication** for identity management and a **session cookie** for maintaining authenticated state with the backend.

## User Roles

| Role | Access |
|---|---|
| **Public** | Can view the public donation dashboard. No login required. |
| **Staff (Admin)** | Can access the admin dashboard, manage donation entries, and upload CSV files. Must be invited and created directly in Firebase. |

There is no self-registration flow for staff — admin accounts are created manually in the Firebase console.

## How Authentication Works

```
User enters credentials
        ↓
Firebase verifies and returns an ID token
        ↓
Frontend sends ID token to POST /auth/login
        ↓
Backend verifies token with Firebase Admin SDK
        ↓
Backend sets an httpOnly session cookie
        ↓
Subsequent requests include the cookie automatically
```

Protected backend routes use the `requireAuth` middleware, which reads the session cookie (or `Authorization: Bearer <token>` header) and verifies it against Firebase Admin before allowing access.

## Sign In Methods

- **Email and Password** — standard Firebase email/password login
- **Google OAuth** — sign in with a Google account via Firebase

Both methods are available on the Staff Login modal on the public dashboard.

## Frontend Routes

| Route | Access |
|---|---|
| `/` | Public — no login required |
| `/app/signup` | Public only — redirects away if already logged in |
| `/app/forgot-password` | Public only |
| `/app/auth/callback` | OAuth callback handler |
| `/app/auth/reset-password` | Password reset link handler |
| `/app/file-upload` | **Private** — requires authentication |

## Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Exchange Firebase ID token for a session cookie |
| `POST` | `/auth/logout` | Clear the session cookie |
| `GET` | `/auth/me` | Return the current authenticated user (private) |

### POST /auth/login

**Request body:**
```json
{
  "idToken": "<Firebase ID token>"
}
```

**Response:**
```json
{
  "uid": "abc123",
  "email": "staff@rsae.org"
}
```

## Adding a New Staff Account

1. Go to your Firebase project → Authentication → Users
2. Click **Add user** and enter the staff member's email and password
3. Share the credentials with the staff member and ask them to log in and change their password
