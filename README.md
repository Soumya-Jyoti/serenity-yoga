# 🧘 Serenity Yoga Studio

A modern full-stack web application for a yoga studio, built as a developer evaluation project. Features a beautiful, responsive landing page, JWT authentication, user dashboard, and admin panel.

**🔗 Live Demo:** *[Coming soon]*

---

## 📸 Screenshots

| Landing Page | Dashboard | Admin Panel |
|:---:|:---:|:---:|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Admin](screenshots/admin.png) |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS v3 + React Router v6 + Axios
- **Backend:** Node.js + Express + REST APIs
- **Database:** MySQL (via Railway cloud) using `mysql2`
- **Authentication:** JWT tokens + bcryptjs
- **Font:** [Onest](https://fonts.google.com/specimen/Onest) (300–800 weights)

---

## ✨ Features

- 🎨 Premium, modern UI inspired by [Remote by Modula](https://remotebymodula.framer.website/)
- 🔐 JWT-based authentication with role-based access control
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🧘 Beautiful landing page with hero, features, testimonials, and contact form
- 📊 User dashboard with stats, upcoming classes, and progress tracking
- 👤 Admin panel with contact submission management and search
- 🔒 Protected routes with loading states
- ✅ Client-side and server-side form validation
- ⏳ Loading states on all async actions
- 🎭 Smooth animations and micro-interactions

---

## 📁 Folder Structure

```
serenity-yoga/
├── backend/
│   ├── config/db.js              # MySQL connection pool
│   ├── middleware/auth.js         # JWT auth + admin middleware
│   ├── routes/auth.js             # Register, Login, Me endpoints
│   ├── routes/contact.js          # Contact form CRUD
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
| `JWT_SECRET` | Secret key for JWT signing |

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (default: http://localhost:5000) |

---

## 🌐 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | [Vercel](https://vercel.com) | Connect repo, set `frontend` as root directory |
| Backend | [Render](https://render.com) | Set build command to `npm install`, start: `node server.js` |
| Database | [Railway](https://railway.app) | Provision MySQL, copy connection string |

Remember to set environment variables on each platform.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with 🧘 by the Serenity team
</p>
