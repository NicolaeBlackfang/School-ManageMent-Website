# Project Memory

**Purpose:** persistent context for developers and AI agents working on this repository. Read this before making changes.
**Last updated:** 2026-10-23
**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)

---

## 1. Snapshot

| Item | Value |
|---|---|
| Product | Scholaris — School Management System |
| Repo root | `school-management-system/` |
| Frontend | React 19 + Vite 8 + Tailwind 4 (JavaScript/JSX, not TypeScript) |
| Backend | Node.js + Express 5 + Mongoose 9 (CommonJS) |
| Database | MongoDB Atlas (`mongodb+srv`) |
| Auth | HttpOnly JWT cookies + optional TOTP 2FA |
| Architecture | Decoupled SPA + REST API; one origin in production |
| Maturity | Working MVP; no automated tests or CI |
| Package manager | npm |

---

## 2. Quick start

```bash
# From repo root
npm install
npm install --prefix backend
npm install --prefix frontend

# Configure Server/.env (copy Server/.env.example)
# MONGODB_URI (or MONGO_URI) and JWT_SECRET are required

npm run dev            # backend (5000) + frontend (5173)
npm run backend        # backend only, node --watch
npm run frontend       # frontend only

# Production SPA build
npm run build --prefix frontend
```

**Bootstrap an admin**

```bash
cd backend
npm run seed:admin -- --email admin@school.com --password 'StrongPass123!' --name 'Super Admin'
# or reset an existing admin:
npm run seed:admin -- --email admin@school.com --reset-password
```

**Backfill teacher assignments** (dry run by default)

```bash
cd backend
node scripts/backfillAssignments.js          # report only
node scripts/backfillAssignments.js --apply  # write Assignment rows
```

---

## 3. Environment variables

Backend reads `Server/.env`. `dotenv` is loaded in `server.js` before anything uses env values.

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` **or** `MONGO_URI` | Yes | Code accepts either; `db.js` and scripts use `MONGODB_URI || MONGO_URI`. `.env.example` documents `MONGO_URI`. |
| `JWT_SECRET` | Yes | Server exits if missing; ≥32 chars required in production |
| `PORT` | No | Default 5000 |
| `NODE_ENV` | No | `production` enables secure cookies, HSTS, static SPA, sandbox payment block |
| `JWT_EXPIRY` | No | Default `8h` |
| `CLIENT_URL` | No | Comma-separated CORS origins |
| `TRUST_PROXY` | No | Set `true` behind one reverse proxy |
| `PAYMENT_PROVIDER` | No | Default `sandbox` |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | For uploads | Missing values fail at upload time |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | For admission email | Enabled only when user+pass exist |
| `SMTP_PORT` | No | Documented but **unused**; code hardcodes 587 |
| `VITE_API_TARGET` | No | Frontend dev proxy target, default `http://localhost:5000` |

**Never commit `.env`.** It is git-ignored (`**/.env`). Only `.env.example` is tracked.

---

## 4. Non-obvious facts and gotchas

### 4.1 Backend

1. **Two DB variable names.** `.env` historically used `MONGODB_URI` while code read `MONGO_URI`. Code now accepts either. If connection fails with `bad auth`, the URI is being read — verify Atlas credentials, not the env name.
2. **Route mount order matters.** `/api/teacher` is mounted before `/api` (assignments). `/api/teacher/my-assignments` and `/api/teacher/my-scope` are actually handled by `assignmentRoutes` mounted at `/api`, not `teacherRoutes`.
3. **CSRF runs before rate limiting.** Mutations need a `csrf` cookie and matching `X-CSRF-Token` header. The SPA automatically mirrors the cookie via Axios `xsrfCookieName`/`xsrfHeaderName`. Non-browser clients must do this explicitly, including login/register.
4. **Express 5 query sanitization.** `req.query` is a getter; `middleware/sanitize.js` redefines it with `Object.defineProperty`. Do not replace this with direct assignment.
5. **Auth role is reloaded from DB.** `protect` fetches the user on every request; never trust the `role` claim in the JWT alone.
6. **Session vs preauth.** Preauth token (`purpose:'2fa'`, 10 min) cannot access protected routes; `protect` rejects non-session purposes.
7. **2FA setup downgrades first.** `POST /api/auth/2fa/setup` sets `twoFactorEnabled=false` immediately; it is re-enabled only after successful verification.
8. **Logout does not clear the CSRF cookie** (despite a comment saying it does). Only `token` and `preauth` are cleared.
9. **Publishing is teacher-only.** `POST /api/grades/toggle-publish` uses `authorizeRoles('teacher')`, so admins cannot publish even though they can enter grades.
10. **Class-teacher ≠ grader.** `Assignment.subject = null` + `isClassTeacher` grants attendance/roster/publish rights, but grading requires a subject-specific assignment.
11. **Deletes are not fully cascading.** Deleting a student removes `Student` + `User` but leaves `Attendance`/`Gradebook` records. Roll reindex is sequential, not transactional.
12. **Admin cannot set `Paid`.** Application payment status via admin patch is limited to `Unpaid`/`Waived`; `Paid` only comes from the payment adapter.
13. **Sandbox payments are permissive.** Any txn ID verifies; sandbox is refused when `NODE_ENV=production`.
14. **No password reset exists.** Only an admin credential override (`PUT /api/auth/users/:id/credentials`). Do not build UI assuming a reset endpoint exists.
15. **Public registration is parent-only.** `SAFE_PUBLIC_ROLE = 'parent'` is enforced in the controller.
16. **Attendance student IDs reference `User`**, not `Student`. Queries often populate `studentId` with user name/email.
17. **Academic year** is derived as `YYYY-(YYYY+1)` from `SchoolConfig.sessionStartDate`.
18. **Notices filters:** student sees `all/student`; teacher sees `all/student/teacher`; admin and parent see everything.
19. **Uploads use memory storage**, then stream to Cloudinary. No local `uploads/` directory is used.
20. **Production serves the SPA** from `AdminPanel/ and Website/dist` with an API-aware fallback. Build the frontend before starting the backend in production.

### 4.2 Frontend

1. **Only use the shared Axios client** (`src/core/api.js`). It sets `baseURL:'/api'`, `withCredentials`, and XSRF handling. Do not add `fetch` or a second Axios instance.
2. **Vite proxies `/api`.** The frontend never references the backend origin directly.
3. **Auth bootstraps from `GET /api/auth/me`** on first paint; `loading` gates `ProtectedRoute`.
4. **Role route prefixes:** `a` = admin, `t` = teacher, `s` = student, `p` = parent. Helpers live in `src/core/nav.js`.
5. **Legacy URLs redirect** (`/student/*`, `/teacher/*`, `/admin/*`, `/public/*`) — keep them working when adding routes.
6. **Tailwind 4 tokens** are defined with `@theme` in `src/index.css`; there is no `tailwind.config.js`. Use `brand-*`, `brass-*`, `slate-*`.
7. **Fonts are self-hosted** through Fontsource imports in `main.jsx` to satisfy the backend CSP. Do not add CDN fonts/scripts.
8. **`Profile` restricts name/email edits to parents**; other roles can only change the profile image.
9. **Pagination is client-side** (`usePagination` + `Pagination`); pages fetch full lists.
10. **Toasts must be pushed via `useToast()`**, not `alert()`.
11. **`AppShell` requires a non-null user** and renders navigation from `NAV[user.role]`.
12. **Icons are inline SVGs** in `components/icons.jsx`; reuse them instead of adding an icon library.
13. **No TypeScript** — everything is `.jsx`/`.js` with plain JavaScript.

---

## 5. Authorization cheat sheet

| Need | Middleware / helper | File |
|---|---|---|
| Logged-in user | `protect` | `middleware/auth.js` |
| Optional session | `softAuth` | `middleware/auth.js` |
| Role allow-list | `authorizeRoles('admin', ...)` | `middleware/auth.js` |
| Admin only | `protect, authorizeRoles('admin')` | route files |
| Teacher class scope | `canAccessClass(user, classId)` | `middleware/assignments.js` |
| Teacher grading scope | `requireAssignment()` | `middleware/assignments.js` |
| Class-teacher-only action | `requireAssignment({ requireSubject: false })` | `middleware/assignments.js` |
| Prevent cross-class grade writes | `findOutOfClassStudents(classId, ids)` | `middleware/assignments.js` |
| Current user's scope | `getTeacherScope(userId)` | `middleware/assignments.js` |

Rules of thumb:

- Admin bypasses class/subject scope.
- Teachers need explicit assignment rows for grading.
- Students only access their own data via `req.user._id`.
- Parents have no student linkage yet.

---

## 6. API quick reference

**Public**

- `GET /api/public/info`
- `POST /api/public/apply`
- `POST /api/public/pay-admission/:appId`
- `GET /api/config`
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/2fa/verify`

**Auth / profile**

- `GET /api/auth/me`
- `POST /api/auth/logout`
- `PUT /api/auth/profile`
- `POST /api/auth/2fa/setup`, `/2fa/verify`, `/2fa/disable`

**Admin**

- `GET /api/auth/dashboard-stats`
- `GET /api/auth/users`, `GET /api/auth/users/:id`
- `POST /api/auth/users/create`
- `PATCH /api/auth/users/:id/role`
- `PUT /api/auth/users/:id/credentials`
- `DELETE /api/auth/users/teacher/:id`
- `/api/admin/assignments` (GET/POST/PATCH/DELETE)
- `POST /api/config/update`
- `POST /api/public/info/update`, `/founder/add`, `DELETE /founder/:id`
- `GET /api/public/applications`, `PATCH /api/public/application/:appId`
- `POST /api/notices`, `DELETE /api/notices/:id`

**Teacher**

- `GET /api/teacher/my-class`
- `POST /api/teacher/attendance`
- `GET /api/teacher/attendance-calendar-heatmap/:classId`
- `GET /api/teacher/attendance-by-date/:classId`
- `GET /api/teacher/attendance-analytics/:classId`
- `GET /api/teacher/my-assignments`, `GET /api/teacher/my-scope`
- `PUT /api/teacher/users/edit/:id`, `DELETE /api/teacher/users/delete/:id`
- `GET /api/grades/class/:classId/subject/:subjectName/term/:termName`
- `POST /api/grades/bulk-submit`, `POST /api/grades/toggle-publish`

**Student**

- `GET /api/student/my-records`
- `GET /api/student/my-attendance-calendar`

**Shared**

- `GET /api/attendance/:classId`
- `POST /api/attendance`
- `GET /api/notices`
- `POST /api/config/toggle-offday`, `/toggle-holiday`

---

## 7. Data model quick reference

| Model | File | One-liner |
|---|---|---|
| `User` | `models/User.js` | Auth identity; unique email; role admin/teacher/student/parent |
| `Student` | `models/Student.js` | 1:1 profile; unique `(gradeClass, rollNumber)` |
| `Teacher` | `models/Teacher.js` | 1:1 profile; unique `teacherId` |
| `Assignment` | `models/Assignment.js` | Teacher↔class↔subject authz map; unique compound |
| `Attendance` | `models/Attendance.js` | One sheet per class per day; unique `(classId, date)` |
| `Gradebook` | `models/Gradebook.js` | Marks per student/class/term/subject; auto letter grade |
| `Notice` | `models/Notice.js` | Announcement + audience + optional PDF |
| `SchoolConfig` | `models/SchoolConfig.js` | Singleton classes/subjects/terms/off-days/holidays |
| `SchoolInfo` | `models/PublicModels.js` | Singleton public content + fee + founders |
| `Application` | `models/PublicModels.js` | Admission PII + payment + status |

Grade scale: A+ ≥90, A ≥80, B ≥70, C ≥60, D ≥50, F <50.

---

## 8. File map (high value)

| Concern | File |
|---|---|
| Server bootstrap + middleware order | `Server/server.js` |
| DB connection | `Server/config/db.js` |
| Auth controller | `Server/controllers/authController.js` |
| JWT/cookies/roles | `Server/middleware/auth.js` |
| Teacher scope | `Server/middleware/assignments.js` |
| Zod schemas | `Server/middleware/validate.js` |
| CSRF | `Server/middleware/csrf.js` |
| NoSQL sanitize | `Server/middleware/sanitize.js` |
| Payments | `Server/services/payment.js` |
| Public/admissions | `Server/routes/publicRoutes.js` |
| Gradebook | `Server/routes/gradebookRoutes.js` |
| Frontend routes | `AdminPanel/ and Website/src/App.jsx` |
| API client | `AdminPanel/ and Website/src/core/api.js` |
| Auth state | `AdminPanel/ and Website/src/context/AuthContext.jsx` |
| Toasts | `AdminPanel/ and Website/src/context/ToastContext.jsx` |
| Nav config | `AdminPanel/ and Website/src/components/layout/navConfig.js` |
| Design tokens | `AdminPanel/ and Website/src/index.css` |
| UI primitives | `AdminPanel/ and Website/src/components/ui.jsx` |

---

## 9. Decision log (ADR-lite)

| # | Decision | Rationale | Consequence |
|---|---|---|---|
| D1 | Decoupled SPA + REST API | Clear separation; independent dev servers | Two installs/scripts; same origin in prod |
| D2 | HttpOnly cookie JWT, not localStorage | Mitigates XSS token theft | Needs CSRF protection; logout does not revoke token |
| D3 | Separate `Assignment` model for teacher authz | Teachers change classes/subjects per year | Backfill script needed; class-teacher vs subject semantics |
| D4 | Inline route handlers except auth | Fast iteration for small domains | Large route files; refactor to controllers later |
| D5 | Zod validation + explicit allow-lists | Prevent mass assignment and injection | Some payloads must be updated in two places |
| D6 | Client-side pagination | Simple; datasets are small | Full lists are downloaded |
| D7 | Sandbox-only payments | Safe development without gateway credentials | Not production-capable for real money |
| D8 | Self-hosted fonts + strict CSP | No third-party script/style origins | Font packages must be installed |
| D9 | Parent is the public registration role | Prevents self-assigned privileged roles | No parent↔child link yet |
| D10 | Production Express serves `AdminPanel/ and Website/dist` | One origin simplifies cookies/CORS/CSP | Must build frontend before deploy |

---

## 10. Known issues and tech debt

See [TRACKER.md](./TRACKER.md) for full detail. Highlights:

- No password reset / self-service change password.
- No parent↔student relationship.
- No automated tests, CI, or lint on backend.
- 2FA secret stored in plaintext; no recovery codes.
- No session revocation or account lockout.
- Sandbox payments accept any transaction ID; no replay uniqueness.
- In-memory rate limiting (per process).
- No audit log.
- Non-transactional multi-document operations.
- README is outdated (says database pending; omits env/2FA/payments).
- `SMTP_PORT` unused; `TRUST_PROXY`/`VITE_API_TARGET` not in `.env.example`.
- Orphaned attendance/grades after user deletion.
- No image magic-byte validation; client MIME is trusted.

---

## 11. Recent changes

| Date | Change |
|---|---|
| 2026-10-23 | Added `docs/` set: PRD, Architecture, Design, Memory, Rules, Tracker |
| 2026-10-23 | Mongo connection now accepts `MONGODB_URI` **or** `MONGO_URI` in `config/db.js`, `scripts/seed-admin.js`, `scripts/backfillAssignments.js` |
| — | Assignment-based teacher authorization, 2FA, CSRF double-submit, rate limiting, sandbox payment adapter (from codebase history) |

---

## 12. Glossary

| Term | Meaning |
|---|---|
| **Class teacher** | Teacher assigned to a class for roster/attendance/publishing; `Assignment.isClassTeacher` with `subject:null` |
| **Subject assignment** | Teacher+class+subject row required to enter grades |
| **Class scope** | Classes a teacher can access (class-teacher classes) |
| **Subject scope** | Class+subject pairs a teacher can grade |
| **Preauth** | 10-minute JWT proving password success before 2FA |
| **Published grade** | `Gradebook.isPublished = true`; visible to students |
| **Sandbox payment** | Simulated adapter that verifies without a network call |
| **Waived** | Admin-set payment status meaning the fee is not required; still not blocked from the payment endpoint |
| **Off-day** | Weekly recurring non-school weekday (`weeklyOffDays` JS day index) |
| **Holiday** | Specific `YYYY-MM-DD` non-school date |

---

## 13. How to continue (agent checklist)

1. Read this file and `RULES.md`.
2. Confirm the relevant flow in `ARCHITECTURE.md`.
3. Inspect the actual route/schema before editing; do not assume an endpoint exists.
4. Search for existing helpers (`validate`, `authorizeRoles`, `requireAssignment`, `ui.jsx`) before adding new ones.
5. Never commit secrets or `.env`.
6. Run `npm run lint --prefix frontend` and `npm run build --prefix frontend` after frontend changes.
7. Backend has no test/lint script; at minimum start the server and exercise the changed route.
8. Update `MEMORY.md` and `TRACKER.md` when behavior or status changes.
9. Do not commit unless the user explicitly asks.
