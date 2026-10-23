# Architecture

**Project:** Scholaris — School Management System
**Last updated:** 2026-10-23
**Related docs:** [PRD.md](./PRD.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)

---

## 1. System context

```
┌──────────────────────────────────────────────────────────────────────┐
│                             Browser (SPA)                            │
│  React 19 · React Router 7 · Tailwind CSS 4 · Axios                  │
└───────────────┬──────────────────────────────────────────────────────┘
                │  HTTPS · HttpOnly cookie · X-CSRF-Token
                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        Express 5 API server                          │
│  Helmet · CORS · CSRF · Sanitize · Zod · Rate limit · JWT cookies    │
│                                                                      │
│  routes ──► middleware ──► models (Mongoose) ──► MongoDB Atlas       │
│                    │                                                 │
│                    ├──► Cloudinary  (images, notice PDFs)            │
│                    ├──► SMTP        (admission status email)         │
│                    └──► Payment adapter (sandbox today)              │
└──────────────────────────────────────────────────────────────────────┘
```

**Deployment model:** one school per deployment. The SPA and API share an origin in production.

---

## 2. Technology stack

| Layer | Technology | Version (declared) | Notes |
|---|---|---|---|
| UI | React | ^19.2.8 | Hooks + Context, no external state library |
| Routing | react-router-dom | ^7.18.3 | BrowserRouter, nested layouts |
| Build | Vite | ^8.2.2 | Dev server proxies `/api` |
| Styling | Tailwind CSS | ^4.3.3 | CSS-first `@theme` tokens in `index.css` |
| HTTP client | Axios | ^1.20.0 | Single instance, `withCredentials`, XSRF mirroring |
| Fonts | Fontsource | Plus Jakarta Sans, IBM Plex Mono | Self-hosted for tight CSP |
| Runtime | Node.js | 18+ recommended | CommonJS backend, ESM frontend |
| Server | Express | ^5.2.1 | Async route handlers |
| ODM | Mongoose | ^9.9.4 | Schemas, hooks, unique indexes |
| Database | MongoDB Atlas | — | `mongodb+srv` URI |
| Validation | Zod | ^4.6.5 | Route-level allow-listing |
| Auth | jsonwebtoken + bcryptjs | ^9.0.3 / ^3.0.3 | JWT cookies, bcrypt cost 12 |
| 2FA | speakeasy + qrcode | ^2.0.0 / ^1.5.4 | TOTP with ±1 window |
| Uploads | multer + cloudinary | ^2.3.0 / ^2.11.0 | Memory storage streams to Cloudinary |
| Email | nodemailer | ^10.0.10 | Optional SMTP transport |
| Security | helmet, cors, express-rate-limit, cookie-parser, mongo-sanitize | see `backend/package.json` | See §11 |

---

## 3. Repository layout

```
school-management-system/
├── package.json                 # Root scripts: dev / backend / frontend
├── README.md
├── docs/                        # This documentation set
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── MEMORY.md
│   ├── RULES.md
│   └── TRACKER.md
├── backend/
│   ├── server.js                # Bootstrap, middleware, routes, listener
│   ├── config/
│   │   ├── db.js                # Mongo connection (MONGODB_URI || MONGO_URI)
│   │   └── cloudinary.js        # Cloudinary SDK configuration
│   ├── controllers/
│   │   └── authController.js    # Register/login/2FA/logout
│   ├── middleware/
│   │   ├── auth.js              # protect, softAuth, authorizeRoles, JWT helpers
│   │   ├── assignments.js       # Teacher scope + assignment checks
│   │   ├── csrf.js              # Double-submit cookie
│   │   ├── sanitize.js          # NoSQL operator scrubbing
│   │   └── validate.js          # Zod schemas + validate()
│   ├── models/                  # User, Student, Teacher, Assignment, ...
│   ├── routes/                  # One router per domain
│   ├── services/payment.js      # Provider-agnostic payment adapter
│   ├── scripts/                 # seed-admin, backfillAssignments
│   ├── utils/rolls.js           # Roll number reindexing
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── vite.config.js           # React plugin, PostCSS, /api proxy
    ├── package.json
    └── src/
        ├── main.jsx             # Providers + render
        ├── App.jsx              # Route table
        ├── index.css            # Tailwind theme + tokens
        ├── core/                # api.js, nav.js
        ├── context/             # AuthContext, ToastContext
        ├── components/          # ui, icons, layouts, pagination, 2FA modal
        └── pages/               # Role-grouped screens
```

---

## 4. Runtime topology and request path

### 4.1 Development

```
Browser → localhost:5173 (Vite)
              │ /api/* proxied
              ▼
          localhost:5000 (Express) → MongoDB Atlas
```

- Vite proxies `/api` to `VITE_API_TARGET` (default `http://localhost:5000`).
- The browser never needs the API origin, which keeps cookies same-origin.

### 4.2 Production

```
Browser ──HTTPS──► Express (one origin)
                     ├── /api/*  → REST handlers
                     └── /*      → frontend/dist/index.html (SPA fallback)
```

- `NODE_ENV=production` enables static serving of `frontend/dist`, HSTS, and secure cookies.
- `TRUST_PROXY=true` when behind one reverse proxy (correct client IP + secure cookie handling).

### 4.3 Middleware pipeline (order matters)

`backend/server.js` applies, in order:

1. `dotenv.config({ path: backend/.env })`
2. Fail-fast checks (`JWT_SECRET` present; length in production; sandbox warning)
3. `app.disable('x-powered-by')`
4. `trust proxy` (if `TRUST_PROXY=true`)
5. `helmet(...)` with explicit CSP
6. `cors(...)` allow-list from `CLIENT_URL`
7. `express.json({ limit: '2mb' })`
8. `express.urlencoded({ limit: '2mb', extended: true })`
9. `cookieParser()`
10. `sanitize` (NoSQL operator scrubber)
11. `csrfInit` (all responses)
12. `csrfProtect` on `/api` (mutations only)
13. Global rate limiter on `/api`
14. Auth rate limiter on login/register/2FA verify
15. Public write limiter on apply/pay
16. Mongo connection listeners + `connectDB()`
17. Route mounts
18. Production static + SPA fallback
19. `GET /` text health check
20. 404 JSON handler
21. Central error handler

> Note: CSRF protection runs before rate limiting. Requests rejected for CSRF are not counted by the limiter.

---

## 5. Backend architecture

### 5.1 Layering

| Layer | Responsibility | Examples |
|---|---|---|
| Bootstrap | Env, middleware, route mounting, listener | `server.js` |
| Config | External connections | `config/db.js`, `config/cloudinary.js` |
| Middleware | Cross-cutting concerns | `auth`, `csrf`, `sanitize`, `validate`, `assignments` |
| Routes | HTTP contract + handlers (most logic inline) | `routes/*.js` |
| Controllers | Auth domain only | `controllers/authController.js` |
| Models | Schema, validation, hooks, indexes | `models/*.js` |
| Services | External/provider abstractions | `services/payment.js` |
| Utils | Pure helpers | `utils/rolls.js` |
| Scripts | One-off operational tasks | `scripts/*.js` |

Most route handlers are inline in route files; only authentication is extracted into a controller.

### 5.2 Route map

| Mount | Router | Domain |
|---|---|---|
| `/api/auth` | `authRoutes.js` | Register, login, 2FA, profile, user admin |
| `/api/attendance` | `attendanceRoutes.js` | Admin/teacher class attendance |
| `/api/notices` | `noticeRoutes.js` | Notices + PDF upload |
| `/api/teacher` | `teacherRoutes.js` | Teacher class tools |
| `/api/grades` | `gradebookRoutes.js` | Grade entry + publishing |
| `/api` | `assignmentRoutes.js` | `/api/admin/assignments`, `/api/teacher/my-*` |
| `/api/config` | `configRoutes.js` | Classes, subjects, terms, off-days |
| `/api/student` | `studentRoutes.js` | Student self-service |
| `/api/public` | `publicRoutes.js` | Public info, admissions, payments |

> Mount-order detail: `/api/teacher` is mounted before `/api` (assignments). Unmatched `/api/teacher/*` requests fall through to `assignmentRoutes`, which serves `/api/teacher/my-assignments` and `/api/teacher/my-scope`.

### 5.3 Response conventions

- Success: `{ "success": true, "data": ... }` or `{ "success": true, "message": "..." }`
- Error: `{ "success": false, "message": "..." }`
- Validation failures: generic `400 "Invalid request payload."` (no schema leakage)
- Unhandled errors: generic `500 "Internal server error."` (stack logged server-side only)
- 404: `{ "success": false, "message": "Resource not found." }`

---

## 6. Data model

### 6.1 Entity relationships

```
                ┌─────────────┐
                │    User     │  role: admin|teacher|student|parent
                │  (auth)     │  unique email · bcrypt password · 2FA
                └──────┬──────┘
        ┌──────────────┼───────────────┬──────────────────┐
        │ 1:1          │ 1:1           │ 1:N              │ 1:N
        ▼              ▼               ▼                  ▼
 ┌────────────┐  ┌────────────┐  ┌──────────────┐  ┌──────────────┐
 │  Student   │  │  Teacher   │  │  Assignment  │  │   Notice     │
 │ rollNumber │  │ teacherId  │  │ teacher      │  │ submittedBy  │
 │ gradeClass │  │ department │  │ subject|null │  │ audience     │
 └────────────┘  └────────────┘  │ class        │  └──────────────┘
                                 │ academicYear │
                                 └──────────────┘

 ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
 │  Attendance  │    │  Gradebook   │    │ SchoolConfig │
 │ classId+date │    │ student/class│    │ singleton    │
 │ records[]    │    │ term/subject │    │ classes[]    │
 │ submittedBy  │    │ marks/grade  │    │ subjects[]   │
 └──────────────┘    └──────────────┘    │ term/holiday │
                                          └──────────────┘

 ┌──────────────┐    ┌──────────────────────────────┐
 │  SchoolInfo  │    │        Application           │
 │ singleton    │    │ student/parent/guardian data │
 │ fee, images  │    │ payable/paid, status         │
 │ founders[]   │    │ payment txn/provider         │
 └──────────────┘    └──────────────────────────────┘
```

### 6.2 Collections and key constraints

| Model | Purpose | Key fields | Indexes / hooks |
|---|---|---|---|
| `User` | Auth identity for every role | `name`, `email` (unique), `password` (`select:false`), `role`, `profileImage`, `twoFactorEnabled`, `twoFactorSecret` (`select:false`) | bcrypt pre-save (cost 12); `toJSON` strips secrets; `matchPassword()` |
| `Student` | Student profile (1:1 User) | `userId` (unique), `studentId`, `rollNumber`, `gradeClass`, `parentContact`, `guardianName` | Unique `(gradeClass, rollNumber)` |
| `Teacher` | Teacher profile (1:1 User) | `userId` (unique), `teacherId` (unique), `department`, `qualification`, `classTeacherOf` | Legacy class-teacher field |
| `Assignment` | Authz mapping teacher↔class↔subject | `teacher`, `subject` (null = class teacher only), `class`, `academicYear`, `isClassTeacher`, `createdBy` | Unique `(teacher, subject, class, academicYear)` |
| `Attendance` | Daily class attendance sheet | `classId`, `date` (midnight), `records[{studentId,status}]`, `submittedBy` | Unique `(classId, date)`; status enum Present/Absent/Late |
| `Gradebook` | One mark per student/class/term/subject | `studentId`, `classId`, `term`, `subject`, `marksObtained`, `letterGrade`, `isPublished`, `submittedBy` | Unique `(studentId, classId, term, subject)`; pre-save letter grade |
| `Notice` | Announcement | `title`, `content`, `targetAudience` (all/student/teacher), `attachmentUrl`, `submittedBy` | No extra index |
| `SchoolConfig` | Singleton academic configuration | `classes[]`, `subjects[]`, `examTerms[]`, `sessionStartDate`, `weeklyOffDays[]`, `holidays[]` | Created on first read |
| `SchoolInfo` | Singleton public site content | `welcomeTitle`, `aboutText`, `schoolLogo`, `bannerImage`, `admissionFeeAmount`, `founders[]` | Fee min 0 / max 1,000,000 |
| `Application` | Public admission + payment | Student/parent/guardian fields, `payableAmount`, `paidAmount`, `paymentStatus`, `payment*`, `applicationStatus` | Status enum Pending/Approved/Rejected |

### 6.3 Grade scale

Computed in `Gradebook` pre-save:

| Marks | Grade |
|---|---|
| ≥ 90 | A+ |
| 80–89 | A |
| 70–79 | B |
| 60–69 | C |
| 50–59 | D |
| < 50 | F |

### 6.4 Referential notes

- `Attendance.records[].studentId`, `Gradebook.studentId`, `Assignment.teacher`, `Notice.submittedBy` reference **User**, not Student/Teacher profiles.
- `Student.userId` and `Teacher.userId` are unique 1:1 links.
- Deletion of a student reindexes later roll numbers in the same class (not transactional).
- Deleting a user does not cascade attendance/grade records (orphans remain).

---

## 7. Authentication and authorization

### 7.1 Session model

| Token | Purpose | Lifetime | Cookie |
|---|---|---|---|
| `token` | Full session | `JWT_EXPIRY` (default 8h) | HttpOnly, SameSite=Lax, Secure in prod, path `/` |
| `preauth` | Password accepted, 2FA pending | 10 minutes | HttpOnly, SameSite=Lax |
| `csrf` | Double-submit CSRF secret | 24 hours | **Not** HttpOnly (SPA must read it), SameSite=Lax |

JWT claims: session `{ id, role, purpose:'session' }`; preauth `{ id, purpose:'2fa' }`.

`protect` reads the cookie first, then `Authorization: Bearer`. It rejects non-session purposes, reloads the user from MongoDB, and attaches `req.user`. Roles are never trusted from the JWT alone.

### 7.2 Login sequence

```
POST /api/auth/login {email,password}
  ├─ user not found / bad password → 401 generic
  ├─ 2FA disabled → Set-Cookie token → { success, user }
  └─ 2FA enabled  → Set-Cookie preauth (10m)
                    → { success, twoFactorRequired, user:{_id,name,email} }

POST /api/auth/2fa/verify {code}
  ├─ preauth path → verify TOTP → Set-Cookie token, clear preauth → { success, user }
  └─ session path → verify TOTP → set twoFactorEnabled=true
```

### 7.3 Authorization layers

1. **Route role guards** — `authorizeRoles('admin')`, `('teacher')`, etc.
2. **Class scope** — `canAccessClass(user, classId)`: admin always; teacher only for class-teacher classes.
3. **Subject scope** — `requireAssignment()`: teacher needs an `Assignment` row for teacher+class+subject to enter grades.
4. **Data scope** — student endpoints derive records from `req.user._id`; cross-class student IDs are rejected on grade writes.

### 7.4 Role permission summary

| Capability | Admin | Teacher | Student | Parent |
|---|---|---|---|---|
| Manage users/roles/credentials | ✅ | create students in own class | — | — |
| Manage assignments | ✅ | view own | — | — |
| Manage school config | ✅ | toggle off-days/holidays | — | — |
| Attendance | ✅ all classes | ✅ class-teacher classes | view own | — |
| Gradebook | ✅ all | ✅ assigned class+subject | view published | — |
| Publish results | — (route is teacher-only) | ✅ class teacher | — | — |
| Notices | create/delete | view | view | view |
| Public website content | ✅ | — | — | — |
| Admissions | review/approve | — | — | — |
| 2FA / profile | ✅ | ✅ | ✅ | ✅ |

---

## 8. Admissions and payments

```
POST /api/public/apply
  ├─ validate payload (Zod)
  ├─ load SchoolInfo + SchoolConfig
  ├─ server sets payableAmount from SchoolInfo.admissionFeeAmount
  ├─ reject targetClass not in SchoolConfig.classes (if list non-empty)
  ├─ explicit allow-list of submitted fields
  └─ create Application (status Pending, payment Unpaid)

POST /api/public/pay-admission/:appId
  ├─ 404 if missing
  ├─ 409 if already Paid
  ├─ verifyPayment({ application, txnId, method })
  │    ├─ sandbox → verified (no network), refused when NODE_ENV=production
  │    └─ unknown provider → 503
  └─ write Paid + paidAmount + txn/method/provider/verifiedAt
```

**Adapter contract:** a real provider must perform a server-to-server lookup of the transaction ID and confirm the paid amount is at least `application.payableAmount` before returning `{ verified: true }`.

**Admin restrictions:** `PATCH /api/public/application/:appId` may set `applicationStatus` (Pending/Approved/Rejected) and `paymentStatus` only to `Unpaid` or `Waived` — never `Paid`.

---

## 9. File storage

| Upload | Route | Storage | Constraints |
|---|---|---|---|
| Logo / banner | `POST /api/public/info/update` | Cloudinary `school_branding` | Images only, 5 MB/file, ≤2 files |
| Founder photo | `POST /api/public/founder/add` | Cloudinary `school_founders` | Images only, 5 MB |
| Notice PDF | `POST /api/notices` | Cloudinary `school_notices` (raw) | PDF only, 10 MB |
| Profile image | `PUT /api/auth/profile` | Base64 data URL stored on `User` | ≤ ~2 MB validated; UI caps file at 1 MB |

Cloudinary config requires `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Missing values fail at upload time, not startup. MIME filters trust the client `Content-Type`; no magic-byte sniffing.

---

## 10. Configuration reference

All backend variables live in `backend/.env` (ignored by git). Use `backend/.env.example` as the template.

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No | API port (default 5000) |
| `NODE_ENV` | Recommended | `development` / `production` (secure cookies, HSTS, static SPA, payment guard) |
| `MONGODB_URI` or `MONGO_URI` | **Yes** | MongoDB connection string |
| `JWT_SECRET` | **Yes** | JWT signing key, ≥32 chars in production |
| `JWT_EXPIRY` | No | Session lifetime (default `8h`) |
| `CLIENT_URL` | No | Comma-separated CORS origins |
| `TRUST_PROXY` | No | `true` behind one reverse proxy |
| `PAYMENT_PROVIDER` | No | `sandbox` (default); real provider key when implemented |
| `CLOUDINARY_CLOUD_NAME` | For uploads | Cloudinary cloud |
| `CLOUDINARY_API_KEY` | For uploads | Cloudinary key |
| `CLOUDINARY_API_SECRET` | For uploads | Cloudinary secret |
| `SMTP_HOST` | For email | SMTP host (default `smtp.gmail.com`) |
| `SMTP_PORT` | No | Listed but currently unused; code hardcodes 587 |
| `SMTP_USER` | For email | SMTP username |
| `SMTP_PASS` | For email | SMTP app password |
| `VITE_API_TARGET` | Frontend | Dev proxy target (default `http://localhost:5000`) |

Never commit `.env` or real credentials. `.env.example` contains placeholders only.

---

## 11. Security architecture

| Control | Implementation |
|---|---|
| Password hashing | bcrypt, cost 12, `select:false`, stripped in `toJSON` |
| Session transport | HttpOnly cookies (no JWT in JS storage) |
| CSRF | Double-submit cookie (`csrf` + `X-CSRF-Token`) on all `/api` mutations |
| NoSQL injection | `mongo-sanitize` on body/params/query |
| Input validation | Zod schemas, unknown keys stripped, generic errors |
| Rate limiting | Global 300/15m; auth 20/15m; public writes 20/15m (in-memory) |
| Headers | Helmet with explicit CSP, `frameAncestors:'none'`, HSTS in production |
| CORS | Allow-list, credentials enabled, restricted methods/headers |
| Authorization | Server-side role + assignment + class scope checks |
| Secrets | `.env` ignored; fail-fast `JWT_SECRET`; sample env tracked |
| Payment integrity | Server-set amount; `Paid` only via adapter; sandbox blocked in production |
| Error handling | Generic 500s; no stack traces to clients |
| Uploads | MIME allow-list + size limits; memory storage |

Known gaps are tracked in [TRACKER.md](./TRACKER.md).

---

## 12. Operations

### 12.1 Commands

| Command | Location | Purpose |
|---|---|---|
| `npm install` | root | Install root/dev tooling |
| `npm install` | backend / frontend | Install each app's deps |
| `npm run dev` | root | Run backend + frontend concurrently |
| `npm run backend` | root | Backend watch mode |
| `npm run frontend` | root | Vite dev server |
| `npm start` | backend | Production server (`node server.js`) |
| `npm run build` | frontend | Build SPA to `frontend/dist` |
| `npm run lint` | frontend | ESLint |
| `npm run seed:admin` | backend | Bootstrap/promote an admin |
| `node scripts/backfillAssignments.js [--apply]` | backend | Backfill Assignment rows (dry run by default) |

### 12.2 Startup failure behavior

- Missing `JWT_SECRET` → exit 1.
- Short secret in production → exit 1; warning in dev.
- Mongo connection failure → log and exit 1 (5s selection timeout).
- Sandbox payment provider in production → warning at boot; payment requests return 503.

---

## 13. Scalability and constraints

- **Stateless API** is horizontally scalable in principle, but:
  - Rate limiting uses the default in-memory store (per process).
  - JWT sessions cannot be revoked individually.
- **Monolithic route handlers** are simple but grow large; extract controllers/services as domains expand.
- **Single-tenant** data model; adding schools would require tenant scoping across every model.
- **No background jobs/queues**; emails and uploads run inline.
- **No transactions** around multi-document operations (user + profile creation, deletion + roll reindex, payment idempotency).
- **No test suite or CI** yet; verification is manual.
