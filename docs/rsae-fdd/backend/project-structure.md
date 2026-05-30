---
id: backend-project-structure
title: Project Structure
sidebar_position: 2
---

# Backend Project Structure

```
fdd-backend/
├── src/
│   ├── config/
│   │   ├── database.js         # Re-exports db client functions
│   │   └── firebase.js         # Firebase Admin SDK initialization
│   ├── controllers/
│   │   ├── authController.js   # login, logout, getMe
│   │   ├── donationsController.js  # CRUD + CSV upload logic
│   │   └── statsController.js  # Aggregated stats queries
│   ├── db/
│   │   └── client.js           # MySQL connection pool + query helpers
│   ├── middleware/
│   │   ├── authMiddleware.js   # requireAuth — verifies session token
│   │   └── uploadMiddleware.js # multer config for CSV file uploads
│   ├── providers/
│   │   ├── mysqlProvider.js    # MySQL driver implementation
│   │   └── postgresProvider.js # Postgres driver (not currently used)
│   ├── repositories/
│   │   └── userRepository.js   # User DB queries
│   ├── routes/
│   │   ├── authRoutes.js       # /auth/* routes
│   │   ├── donationsRoutes.js  # /api/donations/* routes
│   │   └── statsRoutes.js      # /api/stats/* routes
│   ├── handler.js              # Serverless handler wrapper
│   └── server.js               # Express app setup and entry point
├── .env                        # Environment variables (not committed)
└── package.json
```

## Key Files

### `src/server.js`
Sets up the Express app: applies CORS, cookie-parser, and JSON body parsing middleware, mounts all route files, and starts the HTTP server on `PORT` (default `5050`).

### `src/db/client.js`
Manages the MySQL connection pool. Exports:
- `initDb()` — initializes the pool on first call
- `dbQuery(sql, params)` — runs a parameterized query
- `withTransaction(fn)` — wraps multiple queries in a MySQL transaction
- `clearDonations()` — truncates the donations table

### `src/middleware/authMiddleware.js`
The `requireAuth` middleware reads the session token from the `session` cookie or the `Authorization: Bearer` header, verifies it with Firebase Admin, and attaches the decoded user to `req.user`. Returns `401` if the token is missing or invalid.

### `src/controllers/donationsController.js`
Handles all donation CRUD operations. The `uploadFile` handler:
1. Parses the incoming CSV using `csv-parser`
2. Opens a database transaction
3. Truncates the donations table
4. Inserts each valid row
5. Rolls back and returns an error if no valid rows are found

### `src/config/firebase.js`
Initializes the Firebase Admin SDK using `FIREBASE_SERVICE_ACCOUNT_KEY` from the environment. Exports `isFirebaseReady()` so routes can gracefully handle missing config.
