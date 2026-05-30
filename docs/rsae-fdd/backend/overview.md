---
id: backend-overview
title: Backend Overview
sidebar_position: 1
---

# Backend Overview

The backend is a **Node.js + Express v5** REST API. It connects to a **MySQL** database hosted on AWS RDS and uses **Firebase Admin SDK** to verify authentication tokens.

## API Reference

The server runs on port `5050` by default.

### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | None | Returns `{ "status": "ok" }` |

### Auth Routes (`/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | None | Verify Firebase ID token, set session cookie |
| `POST` | `/auth/logout` | None | Clear session cookie |
| `GET` | `/auth/me` | Required | Return current user info |

### Donations Routes (`/api/donations`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/donations` | None | Get all donation records |
| `POST` | `/api/donations/insert` | Required | Insert a single donation entry |
| `PUT` | `/api/donations/update/:id` | Required | Update a donation entry by ID |
| `DELETE` | `/api/donations/delete/:id` | Required | Delete a donation entry by ID |
| `POST` | `/api/donations/upload` | Required | Upload CSV — replaces entire table |

### Stats Routes (`/api/stats`)

All stats routes are public (no authentication required).

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats/categories/amount` | Total donation amount per category |
| `GET` | `/api/stats/categories/count` | Number of donations per category |
| `GET` | `/api/stats/states/amount` | Total donation amount per state |
| `GET` | `/api/stats/states/count` | Number of donations per state |
| `GET` | `/api/stats/donations/total` | Grand total of all donations |

## CSV Upload

`POST /api/donations/upload` accepts a `multipart/form-data` request with a single file field named `file`.

**Expected CSV columns:**

| Column | Type | Required |
|---|---|---|
| `donated_at` | Date (YYYY-MM-DD) | No |
| `fund` | String | No |
| `amount` | Number | Yes |
| `category` | String | No |
| `city` | String | No |
| `state` | String | No |

Uploading a CSV **replaces all existing records** in a single transaction. If any row is invalid or the file is empty, the entire upload is rolled back and the existing data is preserved.

## Database Schema

```sql
CREATE TABLE donations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  donated_at  DATE,
  fund        VARCHAR(255),
  amount      DECIMAL(10, 2) NOT NULL,
  category    VARCHAR(255),
  city        VARCHAR(255),
  state       VARCHAR(255)
);
```

## CORS

The backend only accepts requests from origins listed in `FRONTEND_URL` and `FRONTEND_URL_DEV` environment variables. Requests from any other origin are rejected.
