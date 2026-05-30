---
id: handoff-overview
title: Client Handoff
sidebar_position: 1
---

# Client Handoff

This page documents everything RSAE needs to take ownership of the Fund Donation Dashboard after the DISC team wraps up.

## What RSAE Receives

| Asset | Location |
|---|---|
| Frontend source code | GitHub repository (fdd-frontend) |
| Backend source code | GitHub repository (fdd-backend) |
| MySQL database | AWS RDS instance |
| Firebase project | Firebase console |
| Deployed frontend | Firebase Hosting |

## Access to Hand Over

Make sure RSAE has owner/admin access to the following before handoff:

- [ ] **GitHub** — transfer repository ownership or add RSAE as organization owner
- [ ] **Firebase** — add RSAE's Google account as Project Owner in Firebase console
- [ ] **AWS** — share RDS credentials or transfer the AWS account/resource
- [ ] **Domain** (if applicable) — transfer DNS settings

## How to Update Donation Data

RSAE staff do not need to touch code for day-to-day updates. They can:

1. Log in at the deployed frontend URL using their staff credentials
2. Use **New Entry** to add a single record manually
3. Use **File Upload** to upload a CSV and replace the entire dataset

**CSV format for upload:**

```
donated_at,fund,amount,category,city,state
2024-01-13,General Fund,50.00,Community Support,Evanston,IL
2024-01-14,Education Fund,125.00,Education,Chicago,IL
```

The `amount` column is required. All other columns are optional.

## How to Add a New Staff Account

1. Open the Firebase console → Authentication → Users
2. Click **Add user**
3. Enter the new staff member's email and a temporary password
4. Share the credentials — they can reset their password on first login

## Known Open Issues

- Interactive date-based chart filters are not yet implemented (stretch goal)
- More detailed analytics (stretch goal) are not yet implemented

## Future Maintenance Notes

- The backend is a standard Node.js/Express app — any developer familiar with Node can maintain it
- The frontend is a standard React/Vite app — no proprietary frameworks
- All environment variables are documented in [Getting Started](../getting-started)
- The database schema is a single `donations` table — simple to back up or migrate

## Contact

For questions about the codebase, reach out to the DISC team via the DISC Discord or open an issue in the GitHub repository.
