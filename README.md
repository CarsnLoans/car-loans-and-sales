# Car Loans & Sales (Full Stack)

This repository contains the **React + Tailwind** frontend (client) and **Node.js + Express** backend (server) for the Car Loans & Sales platform.

## Requirements
- **Node.js 23** (see .nvmrc / .node-version)
- MongoDB (local or Atlas)
- Postmark API key for email

## Project Structure
```
car-loans-and-sales-2023/
├── client/   # React + Tailwind frontend (Vite)
└── server/   # Node.js + Express backend
```

## Environment Setup

### Backend (server/.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/car-loans-sales
JWT_SECRET=change-this-secret
JWT_EXPIRE=1h
REFRESH_TOKEN_SECRET=change-this-refresh-secret
REFRESH_TOKEN_EXPIRE=30d
POSTMARK_API_KEY=your-postmark-key
ADMIN_EMAIL=carloansandsales123@gmail.com
FROM_EMAIL=noreply@carloansandsales.com
CLIENT_URL=http://localhost:5173
ADMIN_DEFAULT_EMAIL=carloansandsales123@gmail.com
ADMIN_DEFAULT_PASSWORD=admin123
```

### Frontend (client/.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Install & Run (Development)

### Backend
```
cd server
npm install
npm run dev
```

### Frontend
```
cd client
npm install
npm run dev
```

## Production Build

### Frontend
```
cd client
npm run build
npm run preview
```

### Backend
```
cd server
npm run start
```

## Deployment (Suggested)
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway / DigitalOcean
- **Database**: MongoDB Atlas

### Notes
- Ensure `CLIENT_URL` in server `.env` matches your deployed frontend URL.
- Set `VITE_API_URL` to your deployed backend URL.

## Admin Roles & Access

Roles supported in the admin panel:
- **super_admin**: Full access (manage users, audit logs, email templates, lead bulk actions, deletions).
- **admin**: Lead management (including bulk updates and deletions), audit logs, and email templates.
- **manager**: Lead management (including bulk updates), audit logs. Cannot delete leads or manage users.
- **agent**: Lead management (view and update individual leads). Cannot access audit logs, email templates, bulk updates, or user management.

The **default Super Admin** is created from these environment variables in `server/.env`:
- `ADMIN_DEFAULT_EMAIL`
- `ADMIN_DEFAULT_PASSWORD`

Example (defaults):
- Email: `carloansandsales123@gmail.com`
- Password: `admin123`
