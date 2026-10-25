# Project Tracker

**Project:** Scholaris — School Management System
**Last updated:** 2026-10-25
**Status:** Working MVP · no automated tests or CI
**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md)

---

## 1. Status legend

| Symbol | Meaning |
|---|---|
| ✅ | Done / working end-to-end |
| 🟡 | Partial / works with known gaps |
| ⛔ | Not implemented |
| 🐞 | Known bug or defect |
| 🔒 | Security-sensitive |
| 🧹 | Technical debt |

Severity: **P0** critical · **P1** high · **P2** medium · **P3** low.

---

## 2. Module status

| Module | Status | Notes |
|---|---|---|
| Public website | ✅ | Landing, founders, editable content, Cloudinary images |
| Admissions | 🟡 | Full flow with sandbox payment; no real gateway |
| Payments | 🟡 | Sandbox adapter only; permissive verification |
| Auth & sessions | 🟡 | Login, logout, 2FA; no password reset/lockout/revocation |
| Admin users | ✅ | List/create/edit/role/credentials/delete |
| Teacher assignments | ✅ | Class-teacher + subject scope, backfill script |
| Attendance | ✅ | Teacher marking, heatmap, analytics, student calendar |
| Gradebook | ✅ | Bulk entry, publish, student report card |
| Notices | ✅ | Audience targeting, PDF upload, password-confirmed delete |
| Admin settings | ✅ | Classes, subjects, exam terms, off-days, holidays |
| Student portal | ✅ | Dashboard, grades, attendance, notices |
| Parent portal | 🟡 | Notices + profile only; no child linkage |
| Uploads | 🟡 | Cloudinary works; no magic-byte validation/cleanup on replace |
| Email | 🟡 | Admission status email; port unused; no HTML escaping |
| Docs | ✅ | PRD, architecture, design, memory, rules, tracker |
| Testing | ⛔ | No automated tests |
| CI/CD | ⛔ | None configured |
| Observability | 🟡 | Console logs only |
| Audit log | ⛔ | None |

---

## 3. Feature checklist

### 3.1 Public website

- [x] Landing page from `SchoolInfo`
- [x] Founder profiles
- [x] Admission fee displayed from server
- [x] Admin edit welcome/about/fee
- [x] Admin upload logo/banner
- [x] Admin add/remove founders
- [x] Responsive public header/footer
- [ ] Dedicated news/gallery pages
- [ ] Contact form

### 3.2 Admissions and payments

- [x] Dual-language application form
- [x] Target class from `SchoolConfig`
- [x] Server-set fee
- [x] Application persistence with `Pending` status
- [x] Sandbox payment with method + txn ID
- [x] Idempotent "already paid" guard
- [x] Printable receipt
- [x] Admin application list
- [x] Admin application dossier
- [x] Approve/reject
- [x] Waive/unpaid status
- [x] Email notification on status change (SMTP optional)
- [ ] Real payment provider
- [ ] Transaction ID uniqueness/replay protection
- [ ] Block payment for `Waived`/`Rejected` applications
- [ ] Atomic idempotency (transactions/conditional update)
- [ ] Email ownership/OTP verification for payment
- [ ] CAPTCHA and duplicate application detection
- [ ] Escape applicant name in notification HTML

### 3.3 Authentication and security

- [x] Register (parent-only)
- [x] Login with bcrypt
- [x] HttpOnly session cookie
- [x] JWT expiry (default 8h)
- [x] Logout clears session + preauth
- [x] TOTP 2FA setup/verify/disable
- [x] Preauth token separation
- [x] CSRF double-submit
- [x] NoSQL sanitization
- [x] Zod validation with allow-listing
- [x] Helmet/CSP/HSTS
- [x] CORS allow-list
- [x] Rate limits (global/auth/public writes)
- [x] Role reloaded from DB on each request
- [x] Fail-fast `JWT_SECRET`
- [ ] Self-service password reset/change
- [ ] Email verification
- [ ] Account lockout / failed-attempt counter
- [ ] Session revocation / token versioning
- [ ] Encrypt 2FA secret at rest
- [ ] 2FA recovery codes
- [ ] TOTP replay protection
- [ ] Clear `csrf` cookie on logout
- [ ] Audit log for security events

### 3.4 Admin

- [x] Dashboard stats
- [x] User directory with search/filter
- [x] Create users of any role
- [x] Role-specific profile creation
- [x] User detail with joined profile
- [x] Change role
- [x] Reset credentials
- [x] Delete user/student with password confirmation
- [x] Student roll reindex after delete
- [x] Teacher assignment CRUD
- [x] Class teacher flag
- [x] Classes/subjects/exam terms config
- [x] Weekly off-days and holidays
- [x] Create notice + PDF
- [x] Delete notice with password
- [x] Public website manager
- [x] Admission oversight

### 3.5 Teacher

- [x] Overview dashboard
- [x] Class roster (class-teacher scope)
- [x] Take/edit attendance
- [x] Attendance calendar heatmap
- [x] Attendance by date
- [x] Yearly analytics
- [x] Toggle off-days/holidays
- [x] Gradebook (assigned class+subject+term)
- [x] Bulk mark submit
- [x] Publish/unpublish (class teacher)
- [x] Add student to class
- [x] Edit student in scope
- [x] Delete student in scope (password)
- [x] Notices

### 3.6 Student

- [x] Dashboard with profile, attendance summary, grades
- [x] Published report card
- [x] Attendance calendar with weekends/holidays
- [x] Notices

### 3.7 Parent

- [x] Notices
- [x] Profile update (name/email/photo)
- [x] 2FA
- [ ] Link parent to student(s)
- [ ] View child attendance/grades/notices
- [ ] Multiple children support

### 3.8 Platform

- [x] Root `npm run dev`
- [x] Vite `/api` proxy
- [x] Production SPA serving
- [x] Admin seed script
- [x] Assignment backfill script
- [x] `.env.example`
- [x] `docs/` documentation set
- [ ] Automated tests
- [ ] CI pipeline
- [ ] Docker/deployment manifests
- [ ] Database backup/restore docs
- [ ] Structured logging/APM
- [ ] Health-check endpoint with DB status (only `GET /` text exists)

---

## 4. Known issues

| ID | Sev | Area | Issue | Status |
|---|---|---|---|---|
| K-01 | P1 | Auth | No password reset or self-service password change; only admin override | Open |
| K-02 | P1 | Payments | Sandbox accepts any transaction ID and performs no verification | Open (by design) |
| K-03 | P1 | Payments | `Waived`/`Rejected` applications can still call the payment endpoint | Open |
| K-04 | P1 | Payments | Payment idempotency is non-atomic; concurrent requests can race | Open |
| K-05 | P1 | Data | Student deletion leaves orphaned attendance/grade records | Open |
| K-06 | P1 | Security | 2FA secret stored in plaintext; no recovery codes | Open |
| K-07 | P1 | Security | No session revocation; stolen token valid until expiry | Open |
| K-08 | P1 | Parent | No parent↔student linkage; parent portal is notices-only | Open |
| K-09 | P2 | Security | 2FA setup temporarily disables an already-enabled account | Open |
| K-10 | P2 | Security | No per-account failed-login lockout; only IP rate limiting | Open |
| K-11 | P2 | Security | Login timing/registration messages enable account enumeration | Open |
| K-12 | P2 | Security | CSRF cookie not cleared on logout; static 24h token | Open |
| K-13 | P2 | Auth | Profile email change does not enforce uniqueness or re-verification | Open |
| K-14 | P2 | Payments | No transaction-reference uniqueness/replay protection | Open |
| K-15 | P2 | Payments | Application ID alone authorizes payment; no ownership proof | Open |
| K-16 | P2 | Email | Applicant name interpolated into email HTML without escaping | Open |
| K-17 | P2 | Config | `SMTP_PORT` documented but unused (hardcoded 587) | Open |
| K-18 | P2 | Config | `.env.example` omits `TRUST_PROXY`, `MONGODB_URI` alias, `VITE_API_TARGET` | Open |
| K-19 | P2 | Data | Multi-document operations are not transactional | Open |
| K-20 | P2 | Data | Roll reindex races under concurrency; manual roll edits leave gaps | Open |
| K-21 | P2 | Authz | Admin cannot publish grades (route is teacher-only) | Open (intentional?) |
| K-22 | P2 | Observability | No audit log for logins, 2FA, role/credential changes, deletes, payments | Open |
| K-23 | P2 | Testing | No automated tests | Open |
| K-24 | P3 | Uploads | Client MIME trusted; no magic-byte validation | Open |
| K-25 | P3 | Uploads | Replaced logo/banner/founder images not deleted from Cloudinary | Open |
| K-26 | P3 | Security | Cloudinary credentials not validated at startup | Open |
| K-27 | P3 | Security | Rate limiting in-memory; per process and reset on restart | Open |
| K-28 | P3 | Security | CSRF rejection happens before rate limiting | Open |
| K-29 | P3 | Security | Notice delete sends reusable admin password in a header | Open |
| K-30 | P3 | Docs | README says database is pending and omits env/2FA/payments/security | Open |
| K-31 | P3 | Data | Admissions store PII without retention policy | Open |
| K-32 | P3 | Public | If `SchoolConfig.classes` is empty, any target class is accepted | Open |
| K-33 | P3 | Scripts | `seed-admin` can promote a pre-existing default-email account without resetting its password | Open |
| K-34 | P3 | UI | `ParentHome` only lists notices; no child data | Open |

---

## 5. Technical debt

| ID | Area | Debt | Suggested action |
|---|---|---|---|
| T-01 | Backend | Large inline route handlers | Extract controllers/services per domain |
| T-02 | Backend | No test suite | Add integration tests (auth, authz, grades, admissions) |
| T-03 | Backend | No lint/format config | Add ESLint/Prettier for backend |
| T-04 | Backend | Duplicate profile creation logic | Centralize user+profile creation in a service with transactions |
| T-05 | Backend | Email/SMTP inline | Extract an email service with templates and escaping |
| T-06 | Backend | Payment only sandbox | Implement a provider adapter + webhook verification |
| T-07 | Backend | In-memory rate limits | Move to Redis/Upstash store |
| T-08 | Frontend | Client-side pagination fetches full lists | Add server-side pagination for large datasets |
| T-09 | Frontend | Some pages are long and repeat fetch/error logic | Add hooks/data layer (`useApi`, query cache) |
| T-10 | Frontend | No TypeScript | Consider progressive TS adoption |
| T-11 | Docs | README drift | Update README and link `docs/` |
| T-12 | Ops | No CI/CD or containers | Add pipelines and deployment manifests |
| T-13 | Security | No audit trail | Add append-only audit collection + admin viewer |

---

## 6. Backlog (prioritized)

### P0 — production blockers

- [ ] Integrate a real payment provider and verify server-side (amount + txn).
- [ ] Add transaction-reference uniqueness and replay protection.
- [ ] Block payments for `Waived`/`Rejected` applications.
- [ ] Make payment idempotency atomic.

### P1 — high priority

- [ ] Self-service password reset + change password.
- [ ] Parent↔student relationship and child views.
- [ ] Session revocation (token version / deny list).
- [ ] Encrypt 2FA secrets; add recovery codes.
- [ ] Account lockout and failed-login throttling.
- [ ] Automated tests for critical flows.
- [ ] Audit log for sensitive actions.
- [ ] Cascade or soft-delete academic records when a user is removed.

### P2 — medium priority

- [ ] Email verification on registration/email change.
- [ ] HTML-escape email content; use a template.
- [ ] Fix `SMTP_PORT` and `.env.example` drift.
- [ ] Transactions for user+profile creation and deletion/reindex.
- [ ] Clear CSRF cookie on logout; rotate tokens.
- [ ] Server-side pagination for large lists.
- [ ] Admin grade publishing decision (allow or keep teacher-only).
- [ ] Retention policy and PII minimization for admissions.

### P3 — nice to have

- [ ] Cloudinary cleanup on asset replacement.
- [ ] Magic-byte upload validation.
- [ ] Structured logging/APM.
- [ ] Docker + deployment docs.
- [ ] Health endpoint with DB status.
- [ ] Skeleton loaders.
- [ ] Dark mode.
- [ ] Multi-school/tenant support (large).

---

## 7. Completed log

| Date | Item |
|---|---|
| 2026-10-23 | Fixed Mongo env mismatch: code now accepts `MONGODB_URI` or `MONGO_URI` (`config/db.js`, `scripts/seed-admin.js`, `scripts/backfillAssignments.js`) |
| 2026-10-23 | Added `docs/`: PRD, ARCHITECTURE, DESIGN, MEMORY, RULES, TRACKER |
| 2026-10-25 | Shared animated Login/Signup design, signup route naming, route-level lazy loading, profile photo/detail editing, modern responsive pagination, and user-readable API errors |
| 2026-10-25 | Teacher/student self-profile locked; guardian-owned admissions with admin intake switch, application tracking, seven-day rejected-record expiry, and roster creation on approval |
| — | Public website + founders + admission flow + receipt |
| — | Sandbox payment adapter with production guard |
| — | Admin user CRUD, roles, credential reset, delete with password |
| — | Teacher assignment model + backfill script + scope middleware |
| — | Attendance marking, heatmap, analytics, student calendar |
| — | Gradebook bulk entry, auto letter grades, publish flow |
| — | Notices with audience targeting and PDF upload |
| — | TOTP 2FA, preauth cookie, profile 2FA controls |
| — | CSRF double-submit, NoSQL sanitizer, Zod validation, rate limits |
| — | SPA production serving with API-aware fallback |
| — | Legacy route redirects (`/student`, `/teacher`, `/admin`, `/public`) |

---

## 8. How to update this tracker

1. Change a checkbox when work is verified, not when it is only coded.
2. Add a row to **Known issues** with a new `K-xx` ID; include severity and area.
3. Move completed backlog items to **Completed log** with the date.
4. Keep **Module status** consistent with the checklists.
5. Reference the relevant doc if a change affects architecture or design.
6. Do not mark security items done without verifying the failure paths.
Updated on Sat Oct 24 09:50:26 PM +06 2026

| 2026-10-25 | Removed personal names from form examples, replaced unverified public-page filler with neutral school copy, and aligned README/docs and ignore rules with current backend/frontend layout and profile/admission permissions |
| 2026-10-25 | Added admin controls for public news, announcements, gallery, pages, facilities, academic information, and navigation; fixed pagination at 10 items; improved mobile drawer focus handling and public-site content controls |
