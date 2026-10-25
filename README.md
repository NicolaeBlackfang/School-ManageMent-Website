# Scholaris School Management System

A full-stack school platform for academic administration, guardian admissions, attendance, results, and school communications.

## Project Structure

```
scholaris-school-management/
├── backend/         # Express 5 API and MongoDB models
├── frontend/        # React public site and role-based portals
└── docs/           # Project Documentation
```

## Features

### Security
- JWT Authentication with HttpOnly cookies
- Two-Factor Authentication (2FA) with AES-256 encryption
- CSRF Protection (Double-submit cookie pattern)
- Rate Limiting
- Account Lockout after failed login attempts
- Password reset with email tokens
- Input sanitization and validation with Zod

### Accounts and profiles
- Shared animated **Login** and parent/guardian **Sign up** screens with email verification
- Students and teachers can view their profiles; admins and parents can update their own display name and photo
- Administrators can add/edit teacher and student photos; teachers can edit photos for students in their assigned class
- Lazy-loaded role pages and responsive pagination for faster, clearer navigation

### Role-based portals
- Administration, teacher, student, and guardian workspaces
- User management, class assignments, and school settings
- Attendance, gradebooks, admissions review, and notices

### Public school website
- School information and published leadership profiles
- Notices, news, and photo gallery
- Guardian-only admission applications during the configured intake period
- Login and guardian account registration

## Quick Start

### Installation
```bash
# Install all dependencies
npm run install:all
```

### Development
```bash
# Run the API and React application
npm run dev
```

### Individual Services
```bash
npm run backend  # Backend API
npm run frontend # Public site and role-based portals
```

## Environment Setup

1. Copy `backend/.env.example` to `backend/.env` and configure:
   - MongoDB connection string
   - JWT secret
   - Encryption keys
   - Cloudinary credentials
   - Email settings

2. Seed admin user:
```bash
cd backend && npm run seed:admin
```

## Technology Stack

**Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs
**Frontend:** React 19, Vite, Tailwind CSS, React Router
**Security:** Helmet, CORS, express-rate-limit, crypto

## Documentation

See the `docs/` folder for detailed documentation:
- [PRD.md](docs/PRD.md) - Product Requirements
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System Architecture
- [DESIGN.md](docs/DESIGN.md) - Design Guidelines
- [RULES.md](docs/RULES.md) - Development Rules
- [TRACKER.md](docs/TRACKER.md) - Project Tracker
- [MEMORY.md](docs/MEMORY.md) - Project Memory
