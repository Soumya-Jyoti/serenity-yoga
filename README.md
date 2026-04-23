# 🧘 Serenity Yoga Studio

> *Where motion meets absolute stillness.*

A modern full-stack web application for a premium yoga studio — built as a developer evaluation project. Features a beautifully crafted responsive landing page, JWT authentication, a personalized user dashboard, and a full admin panel for managing contact submissions.

**🔗 Live Demo:** [https://serenity-yoga-studio-red.vercel.app/](https://serenity-yoga-studio-red.vercel.app/)

---

## 🌿 About the Project

**Serenity Yoga Studio** is a digital sanctuary — a full-stack web app designed to embody the calm, clarity, and elegance of a real-world yoga studio, while delivering a robust, modern web experience.

The application serves three distinct user journeys:

1. **Visitors** browse the landing page, explore class offerings, and submit inquiries via a contact form.
2. **Registered users** log in to a personalized dashboard to track their yoga journey, view upcoming classes, and monitor progress.
3. **Admins** access a secure panel to manage contact submissions and oversee user activity.

Under the hood, it demonstrates production-grade practices: JWT-based authentication, role-based access control, RESTful API design, cloud MySQL integration, and a clean separation of frontend and backend concerns.

---

## 📸 Screenshots

| Landing Page | Dashboard | Admin Panel |
|:---:|:---:|:---:|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Admin](screenshots/admin.png) |

---

## 🧪 Try It Out — Test Credentials

You can test the live deployment instantly with pre-seeded admin credentials.

### 🔑 Admin Login

Visit **[https://serenity-yoga-studio-red.vercel.app/login](https://serenity-yoga-studio-red.vercel.app/login)** and use:

| Field | Value |
|-------|-------|
| 📧 **Email** | `admin@serenity.yoga` |
| 🔑 **Password** | `admin123` |

### 👤 Test as a Regular User

1. Go to [**Register**](https://serenity-yoga-studio-red.vercel.app/register)
2. Create a new account with any email + password
3. You'll be redirected to the user **Dashboard**

### 🧭 What to Explore

Once logged in, walk through these features to see everything the app offers:

- **As Admin:**
  - View the **Admin Panel** → see all contact form submissions
  - Search/filter submissions by name or email
  - Observe role-based UI changes (admin-only nav links)
- **As User:**
  - Explore the **Dashboard** with stats and upcoming classes
  - Check progress tracking and profile info
  - Log out and log back in to verify JWT persistence
- **As Visitor (logged out):**
  - Browse the **Landing Page** — hero, features, testimonials
  - Submit the **Contact Form** at the bottom
  - Try accessing `/dashboard` directly → watch it redirect to `/login` (protected route in action)

---

## 🛠️ Tech Stack

### Frontend
- **[React 18](https://react.dev/)** — UI framework with hooks
- **[Vite](https://vitejs.dev/)** — lightning-fast build tool and dev server
- **[Tailwind CSS v3](https://tailwindcss.com/)** — utility-first styling
- **[React Router v6](https://reactrouter.com/)** — client-side routing
- **[Axios](https://axios-http.com/)** — HTTP client with interceptors
- **[Onest Font](https://fonts.google.com/specimen/Onest)** — modern, warm typeface (300–800 weights)

### Backend
- **[Node.js](https://nodejs.org/)** — JavaScript runtime
- **[Express 5](https://expressjs.com/)** — web framework for REST APIs
- **[mysql2](https://www.npmjs.com/package/mysql2)** — MySQL driver with connection pooling
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** — password hashing
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** — JWT creation and verification
- **[cors](https://www.npmjs.com/package/cors)** — cross-origin resource sharing
- **[dotenv](https://www.npmjs.com/package/dotenv)** — environment variable management

### Infrastructure & Deployment
- **[Vercel](https://vercel.com/)** — frontend hosting with auto-deploy on push
- **[Railway](https://railway.app/)** — backend hosting + MySQL database
- **[GitHub](https://github.com/)** — version control and CI trigger

### Development Tools
- **[Nodemon](https://nodemon.io/)** — auto-reload for backend dev
- **[Concurrently](https://www.npmjs.com/package/concurrently)** — run frontend + backend simultaneously
- **PostCSS + Autoprefixer** — CSS processing pipeline

---

## ✨ Features

- 🎨 **Premium, modern UI** inspired by [Remote by Modula](https://remotebymodula.framer.website/)
- 🔐 **JWT-based authentication** with role-based access control (`user` / `admin`)
- 📱 **Fully responsive** design — mobile, tablet, and desktop layouts
- 🧘 **Beautiful landing page** with hero, features, testimonials, and contact form
- 📊 **User dashboard** with stats, upcoming classes, and progress tracking
- 👤 **Admin panel** with contact submission management and live search
- 🔒 **Protected routes** with loading states and auth checks
- ✅ **Client-side + server-side validation** on all forms
- ⏳ **Loading states** on every async action
- 🎭 **Smooth animations** and micro-interactions throughout
- 🛡️ **Secure password storage** via bcrypt hashing
- 🌐 **CORS-hardened backend** allowing only the Vercel frontend origin

---

## 📁 Folder Structure

```
serenity-yoga/
├── backend/
│   ├── config/db.js              # MySQL connection pool (Railway + local)
│   ├── middleware/auth.js         # JWT auth + admin middleware
│   ├── routes/auth.js             # Register, Login, Me endpoints
│   ├── routes/contact.js          # Contact form CRUD
│   ├── seed.js                    # DB initialization + admin seed
│   ├── .env.example               # Environment template
│   ├── .gitignore
│   ├── server.js                  # Express entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/axios.js           # Axios instance with interceptors
│   │   ├── context/AuthContext.jsx # Auth state management
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Floating pill navbar
│   │   │   ├── Footer.jsx         # 4-column footer
│   │   │   └── ProtectedRoute.jsx # Route guard component
│   │   ├── pages/
│   │   │   ├── Landing.jsx        # Public home page
│   │   │   ├── Login.jsx          # Login form
│   │   │   ├── Register.jsx       # Registration form
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   └── Admin.jsx          # Admin panel
│   │   ├── App.jsx                # Root component + routing
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles + Tailwind
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   └── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **MySQL** database (local or [Railway](https://railway.app))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/serenity-yoga.git
cd serenity-yoga
```

### 2. Database Setup

Connect to your MySQL instance and run:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> 💡 **Tip:** You can also run `npm run seed` inside `backend/` to create tables and an initial admin user automatically.

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and JWT secret
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different URL
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

### 5. Creating an Admin User

After registering a regular user, promote them to admin via SQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `POST` | `/api/auth/register` | Public | Create user, return JWT + user info |
| `POST` | `/api/auth/login` | Public | Verify credentials, return JWT + user |
| `GET` | `/api/auth/me` | Logged in | Return current user info |
| `POST` | `/api/contact` | Public | Save contact form submission |
| `GET` | `/api/contact` | Admin only | Return all submissions (newest first) |

---

## 🔒 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port (default: 3306) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `TOKEN_SECRET` | Secret key for JWT signing |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (default: http://localhost:5000) |

---

## 🌐 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | [Vercel](https://vercel.com) | Connect repo, set `frontend` as root directory |
| Backend | [Railway](https://railway.app) | Set root directory to `backend`, link MySQL service via `${{MySQL.MYSQLHOST}}` references |
| Database | [Railway](https://railway.app) | Provision MySQL, reference credentials in the backend service |

Remember to set environment variables on each platform.

### Architecture Overview

```
┌──────────────────────┐       ┌──────────────────────────┐       ┌──────────────────┐
│                      │       │                          │       │                  │
│   Vercel (Frontend)  │  ───▶ │   Railway (Backend API)  │  ───▶ │  Railway MySQL   │
│   React + Vite       │ HTTPS │   Node.js + Express      │ MySQL │                  │
│                      │       │                          │       │                  │
└──────────────────────┘       └──────────────────────────┘       └──────────────────┘
       ▲                                   ▲
       │                                   │
   GitHub push ──────── auto-deploy ───────┘
```

Both frontend and backend auto-deploy on every `git push origin main`.

---

## 🏔️ Deployment Challenges & Lessons Learned

This section captures the real-world friction encountered while deploying this project — and the debugging insights that came out of it. If you're a fellow developer tackling similar stacks, these notes may save you hours.

### 🔴 Challenge 1: Deploying the Backend on Vercel (Wrong Tool)

The first (and biggest) mistake was attempting to deploy the **Express backend on Vercel**. Vercel is built for static frontends and serverless functions — not long-running Express servers with `app.listen(...)`. The container crashed immediately, throwing cryptic `Cannot find module` errors even though dependencies were clearly declared.

**💡 Lesson:** *Match the platform to the workload.* Vercel = frontend / serverless. Railway, Render, or Fly.io = persistent Node servers.

### 🔴 Challenge 2: Monorepo + `npm ci` Lock File Mismatches

With a root `package.json` (using `concurrently`) plus `frontend/` and `backend/` subfolders, Railway's `npm ci` kept failing with `EUSAGE` errors — phantom entries for `@types/node` and `undici-types` in the lock file that didn't match `package.json`.

**Fix:**
- Set Railway's **Root Directory** to `backend` so it only sees the backend's `package.json`
- When `npm ci` still resisted, switched to `npm install` via a `nixpacks.toml` override — forgiving instead of strict

**💡 Lesson:** `npm ci` is ruthless about lock file sync. For monorepos on cloud hosts, either commit meticulously consistent lock files or tell the host to use `npm install`.


### 🎯 The Meta-Lesson

> *Every production deployment teaches you something the tutorials leave out.*

The real fix across all of this wasn't any single line of code — it was recognizing that **architecture decisions made on day one ripple for hours**. Picking the right platform for each piece of the stack, wiring env variables cleanly, and logging your resolved configuration at startup are force multipliers. Once the foundation was right, everything clicked into place in minutes.

---

## 🧩 Project Goals

This project was built to demonstrate proficiency across the full stack:

- ✅ **Frontend craft** — React architecture, Tailwind styling, responsive design, UX polish
- ✅ **Backend engineering** — REST API design, authentication, authorization, data persistence
- ✅ **Database modeling** — schema design, bcrypt password hashing, role-based queries
- ✅ **DevOps skills** — deploying a multi-service app across Vercel + Railway with CI/CD via GitHub
- ✅ **Debugging resilience** — working through real production errors under pressure

---

## 🙌 Contributing

This is a personal evaluation project, but feedback and suggestions are always welcome. Open an issue or drop a note!

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  <strong>Built with 🧘 by the Serenity team</strong><br>
  <em>Breathe in. Code. Breathe out. Deploy.</em>
</p>