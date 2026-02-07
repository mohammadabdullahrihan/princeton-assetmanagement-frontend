# Asset Management System

A fully-featured, production-ready Asset Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **Asset Management**: Full CRUD operations for full asset lifecycle.
- **Maintenance Tracking**: Schedule and track maintenance history.
- **Depreciation Calculation**: Automatic calculation of asset value over time.
- **QR Code Tracking**: Generate and display QR codes for all assets.
- **Analytics Dashboard**: Real-time statistics and visual reports.
- **Role-Based Access**: Owner, Admin, and Viewer roles with specific permissions.
- **Financial Reports**: Depreciation, asset value, and maintenance cost analysis.

## 🛠 Tech Stack

- **Frontend**: React 19, Tailwind CSS, React Router, Recharts, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## 📦 Project Structure

```
/princeton-assetmanagement
  /backend           # Node.js + Express API
    /src
      /controllers   # Request handlers
      /models        # Mongoose schemas
      /routes        # API routes
      /middlewares   # Auth & Validation
      /utils         # Helpers (QR, Depreciation)
  /frontend          # React + Vite App
    /src
      /components    # Reusable components
      /pages         # Main views
      /context       # Auth state
      /services      # API calls
```

## ⚡️ Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start MongoDB locally or update MONGO_URI in .env

# Seed the database with sample data (creates default users)
npm run seed

# Run the server
npm run dev
```

**Default Credentials:**
- Owner: `owner@example.com` / `password123`
- Admin: `admin@example.com` / `password123`
- Viewer: `viewer@example.com` / `password123`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Access the application at `http://localhost:3000`

## 📝 API Documentation

The backend runs on `http://localhost:5000`.

- `GET /api/assets`: List assets
- `POST /api/assets`: Create asset
- `GET /api/reports/dashboard`: Get dashboard stats
- `POST /api/auth/login`: Authenticate user

## 🛡 Security

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control (RBAC)
- Helmet & CORS security headers
- Input validation with express-validator

## 📄 License

MIT
# princeton-assetmanagement-frontend
