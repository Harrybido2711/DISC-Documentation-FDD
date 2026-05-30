---
id: intro
title: RSAE Funds & Donations Dashboard
sidebar_position: 1
slug: /
---

# RSAE Fund Donation Dashboard

Welcome to the documentation for the RSAE Fund Donation Dashboard (FDD). This guide covers everything you need to understand, run, and contribute to the project.

## About the Client

The **Reparations Stakeholders Authority of Evanston (RSAE)** is a Evanston, IL-based organization working on initiatives related to reparations and community development. RSAE collaborates with donors and stakeholders to manage and distribute funds across programs such as Education, Community Support, Legal, Operations, and Special Projects.

## Project Goal

RSAE's donation data was previously scattered across multiple sources, making it difficult to quickly understand fund status and donation activity while respecting donor privacy.

The FDD provides a **centralized, accessible platform** that:

- Displays donation totals and fund breakdowns through clear charts
- Protects donor privacy on the public-facing view
- Allows RSAE staff to upload and manage donation data through an admin dashboard
- Remains simple enough for non-technical staff to maintain long-term

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| styled-components | Component styling |
| Recharts | Data visualization (bar charts, pie charts) |
| Firebase | Authentication (email/password + Google OAuth) |
| Vite | Build tool |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express v5 | Server and API |
| MySQL (AWS RDS) | Database |
| Firebase Admin SDK | Server-side auth token verification |
| multer + csv-parser | CSV file upload and parsing |

## Key Features

**Public Dashboard**
- Shows total funds raised and breakdowns by category and state
- Interactive charts powered by Recharts
- No login required

**Admin Dashboard**
- Accessible only to authenticated RSAE staff
- View, add, edit, and delete individual donation entries
- Filter entries by date
- Upload a CSV file to replace the entire donation dataset

## Team

| Role | Name |
|---|---|
| PM | Harry |
| Frontend | Aarav |
| Backend | Michael, Darian |
