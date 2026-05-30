---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# Getting Started

This guide walks you through setting up the RSAE-FDD project locally for development.

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **Git**
- A **Firebase** project with Authentication enabled
- An **AWS RDS** MySQL database instance

## Installation

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/DISC-NU/rsae-fdd-frontend.git
cd rsae-fdd-frontend
npm install

# Backend
git clone https://github.com/DISC-NU/rsae-fdd-backend.git
cd rsae-fdd-backend
npm install
```

### 2. Set up environment variables

**Frontend** — create a `.env` file in `fdd-frontend/`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_BACKEND_URL=
```

In development, leave `VITE_BACKEND_URL` empty. Vite will proxy API requests to `localhost:5050` automatically.

**Backend** — create a `.env` file in `fdd-backend/`:

```env
PORT=5050
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_DEV=http://localhost:5173
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=3306
FIREBASE_SERVICE_ACCOUNT_KEY=
```

For `FIREBASE_SERVICE_ACCOUNT_KEY`, go to your Firebase project → Project Settings → Service Accounts → Generate new private key. Copy the entire JSON content and paste it as the value (wrap it in single quotes if needed).

### 3. Set up the database

Connect to your MySQL instance and run:

```sql
CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donated_at DATE,
  fund VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255)
);
```

## Running Locally

Start both servers in separate terminals:

```bash
# Terminal 1 — Backend (runs on port 5050)
cd fdd-backend
npm run dev

# Terminal 2 — Frontend (runs on port 5173)
cd fdd-frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Verify the Setup

- The **public dashboard** should load immediately with charts (or empty state if the database has no data).
- Click **Staff Log In** to test the login flow.
- Visit `http://localhost:5050/health` — it should return `{ "status": "ok" }`.

## Development Tools

**Recommended VS Code extensions:**
- ESLint
- Prettier

**Available scripts:**

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Format code with Prettier |
| `npm test` | Run tests (frontend only) |
