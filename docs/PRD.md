# Product Requirements Document (PRD)

**Product:** Scholaris — School Management System
**Status:** Active development (working MVP)
**Last updated:** 2026-10-23
**Related docs:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)

---

## 1. Overview

Scholaris is a full-stack school management platform that unifies public-facing admissions, staff and student administration, attendance, gradebooks, notices, and a lightweight parent portal.

It is delivered as a decoupled application:

- **Frontend:** React 19 + Vite 8 single-page application (SPA), styled with Tailwind CSS 4.
- **Backend:** Node.js + Express 5 REST API with Mongoose 9 / MongoDB.
- **Integrations:** Cloudinary (image and PDF storage), SMTP (admission status email), pluggable payment adapter (sandbox only today).

The product is intended for a single school/institution per deployment. There is no multi-tenant model.

---

## 2. Problem and opportunity

Schools commonly manage admissions, attendance, results, and announcements across paper forms, spreadsheets, and chat groups. This creates:

- Duplicate and inconsistent student data.
- Slow admission intake and unclear fee status.
- Manual attendance and grade calculation.
- Poor visibility for students and parents.
- Weak control over who can view or change records.

Scholaris addresses this with one role-aware system of record, a public admission funnel, live dashboards, and server-enforced authorization.

---

## 3. Goals and success metrics

| Goal | Success metric |
|---|---|
| Centralize school records | One User account + one role profile per person; no duplicate email records |
| Digitize admissions | Applicant completes form → pays → receives printable receipt in one flow |
| Make attendance reliable | One attendance sheet per class per day; analytics available year-to-date |
| Protect grades | Marks stored per student/class/term/subject; only published grades visible to students |
| Role-appropriate access | Every protected endpoint enforces role + class/subject scope server-side |
| Responsive access | Full functionality on desktop, tablet, and mobile |
| Secure by default | HttpOnly sessions, CSRF, 2FA, rate limiting, input validation, secret hygiene |

There is currently no analytics/telemetry pipeline; success is measured qualitatively and through manual testing.

---

## 4. Personas and roles

| Role | Primary needs | Current capabilities |
|---|---|---|
| **Admin** | Run the institution | Dashboard stats, user CRUD, role changes, credential resets, teacher assignments, global class/subject/term config, notices, public website content, admission review, payments overview |
| **Teacher** | Manage assigned classes | Roster, attendance (class-teacher classes), attendance analytics, gradebook (assigned class+subject), publish results (class teacher), add/edit/delete students in class-teacher scope, notices |
| **Student** | Track own progress | Dashboard, published grades, personal attendance calendar, notices |
| **Parent** | Follow their child and school news | Notices, profile management (name/email/photo), 2FA. No child linkage yet |
| **Public visitor** | Learn about and apply to the school | Landing page, founder profiles, admission application, sandbox fee payment, printable receipt |

> Public self-registration always creates a **parent** account. Admin and teacher accounts can only be created by an admin. Students are created by admins or by their class teacher.

---

## 5. Scope

### 5.1 In scope (implemented)

1. **Public website** with editable welcome text, about text, banner, logo, admission fee, and founder profiles.
2. **Admissions funnel** with dual-language student/parent details, server-priced fee, MFS-style payment capture, and printable receipt.
3. **Authentication and sessions** using HttpOnly cookies, bcrypt passwords, optional TOTP 2FA, and CSRF protection.
4. **Admin console** for users, roles, credentials, assignments, school config, notices, website content, and applications.
5. **Teacher workspace** for class roster, attendance, analytics, gradebook, publishing, and student management within assigned scope.
6. **Student workspace** for dashboard, grades, attendance calendar, and notices.
7. **Parent workspace** for notices and account settings (profile + 2FA).
8. **Notice board** with audience targeting and optional PDF circulars.
9. **Cloudinary uploads** for profile/website/founder images and notice PDFs.
10. **Bootstrap and migration scripts** for admin seeding and assignment backfill.

### 5.2 Out of scope (currently)

- Multi-school / multi-tenant support.
- Parent↔student linkage and parent dashboards per child.
- Real payment gateway integration (bKash/Nagad/SSLCommerz/etc.).
- Password reset / forgot-password / self-service password change.
- Email verification and transactional email beyond admission status notification.
- Messaging, chat, SMS, push notifications.
- Timetable, exams scheduling, fee ledger, payroll, library, transport, hostel.
- Automated test suite and CI pipeline.
- Audit log and analytics/reporting suite.
- Native mobile apps (responsive web only).

### 5.3 Assumptions and constraints

- One school per deployment; all users share one database.
- Internet access is required for Cloudinary and Atlas-hosted MongoDB.
- The deployment is served over HTTPS in production (secure cookies, HSTS).
- The default payment provider is a **sandbox** and is intentionally rejected in production.
- Class names, subjects, exam terms, and academic year are configured by admins, not hardcoded.
- Academic year is derived from `SchoolConfig.sessionStartDate` as `YYYY-(YYYY+1)`.

---

## 6. Functional requirements

Status legend: **Done** = implemented end-to-end · **Partial** = implemented with gaps · **Planned** = not implemented.

### 6.1 Public website

| ID | Requirement | Status |
|---|---|---|
| FR-PUB-01 | Visitors can view a landing page with editable title, about text, banner, and school stats. | Done |
| FR-PUB-02 | Visitors can view founder/board profiles with names, designations, quotes, and images. | Done |
| FR-PUB-03 | Public pages show the current admission fee from server configuration. | Done |
| FR-PUB-04 | Admin can edit welcome/about/fee, upload logo/banner, add/remove founders. | Done |
| FR-PUB-05 | Public pages are responsive and CSP-compatible (no external CDN assets). | Done |

### 6.2 Admissions and payments

| ID | Requirement | Status |
|---|---|---|
| FR-ADM-01 | Applicant submits student, parent, guardian, and contact details (English + Bangla names). | Done |
| FR-ADM-02 | Target class is selectable from admin-managed classes. | Done |
| FR-ADM-03 | Fee amount is set by the server, never trusted from the client. | Done |
| FR-ADM-04 | Applicant pays via an MFS-style flow using method + transaction ID. | Done (sandbox) |
| FR-ADM-05 | Payment is idempotent and already-paid applications are rejected. | Done |
| FR-ADM-06 | Applicant sees a printable receipt after payment. | Done |
| FR-ADM-07 | Admin can list applications, inspect a dossier, approve/reject, and waive/mark unpaid. | Done |
| FR-ADM-08 | Admin cannot directly mark an application paid; only the payment adapter can. | Done |
| FR-ADM-09 | Applicant receives an email on status change when SMTP is configured. | Done |
| FR-ADM-10 | Real payment gateway verification. | Planned |
| FR-ADM-11 | Duplicate application/captcha/email-ownership verification. | Planned |
| FR-ADM-12 | Transaction-reference uniqueness and replay protection. | Planned |

### 6.3 Authentication and account security

| ID | Requirement | Status |
|---|---|---|
| FR-AUTH-01 | Users log in with email + password; session is an HttpOnly cookie. | Done |
| FR-AUTH-02 | Public registration creates a parent account only. | Done |
| FR-AUTH-03 | Optional TOTP 2FA can be set up, verified, and disabled from the profile. | Done |
| FR-AUTH-04 | 2FA login uses a short-lived pre-auth token before issuing a session. | Done |
| FR-AUTH-05 | Sessions expire (default 8h) and logout clears session cookies. | Done |
| FR-AUTH-06 | Admin can reset a user's password and edit role/profile. | Done |
| FR-AUTH-07 | Users can update their profile; only parents may change name/email. | Done |
| FR-AUTH-08 | Self-service password reset / change. | Planned |
| FR-AUTH-09 | Email verification on registration or email change. | Planned |
| FR-AUTH-10 | Per-account lockout, session revocation, 2FA recovery codes. | Planned |

### 6.4 Admin

| ID | Requirement | Status |
|---|---|---|
| FR-ADMIN-01 | Dashboard shows counts of students, teachers, notices, and pending student tasks. | Done |
| FR-ADMIN-02 | List, search, and filter all users by role. | Done |
| FR-ADMIN-03 | Create users of any role with role-specific profile fields. | Done |
| FR-ADMIN-04 | View a single user with joined teacher/student profile and activity. | Done |
| FR-ADMIN-05 | Change a user's role. | Done |
| FR-ADMIN-06 | Reset credentials and edit profile fields. | Done |
| FR-ADMIN-07 | Delete users with password confirmation; reindex rolls for students. | Done |
| FR-ADMIN-08 | Assign teachers to class+subject pairs and flag class teachers. | Done |
| FR-ADMIN-09 | Manage classes, subjects, exam terms, weekly off-days, and holidays. | Done |
| FR-ADMIN-10 | Publish notices with optional PDF circular. | Done |
| FR-ADMIN-11 | Manage public website content and founders. | Done |
| FR-ADMIN-12 | Review and update admission applications. | Done |

### 6.5 Teacher

| ID | Requirement | Status |
|---|---|---|
| FR-TCH-01 | View class roster for classes where the teacher is class teacher. | Done |
| FR-TCH-02 | Take/edit daily attendance for class-teacher classes. | Done |
| FR-TCH-03 | View attendance heatmap, by-date records, and yearly analytics. | Done |
| FR-TCH-04 | Toggle off-days and holidays. | Done |
| FR-TCH-05 | Enter marks for assigned class+subject+term. | Done |
| FR-TCH-06 | Publish/unpublish results for a class+term as class teacher. | Done |
| FR-TCH-07 | Add a student to a class-teacher class. | Done |
| FR-TCH-08 | Edit/delete a student within class-teacher scope with password confirmation for delete. | Done |
| FR-TCH-09 | View notices targeted to teachers/all. | Done |

### 6.6 Student

| ID | Requirement | Status |
|---|---|---|
| FR-STU-01 | View profile, attendance summary, and published grades on a dashboard. | Done |
| FR-STU-02 | View published report card per term/subject. | Done |
| FR-STU-03 | View a monthly attendance calendar with weekends, holidays, and personal status. | Done |
| FR-STU-04 | View notices targeted to students/all. | Done |

### 6.7 Parent

| ID | Requirement | Status |
|---|---|---|
| FR-PAR-01 | View school notices. | Done |
| FR-PAR-02 | Update own name, email, and profile photo. | Done |
| FR-PAR-03 | Enable/disable 2FA. | Done |
| FR-PAR-04 | Link to a child and view child records. | Planned |

### 6.8 Notices

| ID | Requirement | Status |
|---|---|---|
| FR-NOT-01 | Admin creates notices with audience (all/student/teacher) and optional PDF. | Done |
| FR-NOT-02 | Authenticated users see notices filtered by audience. | Done |
| FR-NOT-03 | Admin deletes notices with password confirmation; Cloudinary cleanup attempted. | Done |

---

## 7. Key user flows

### 7.1 Admission → payment → receipt

1. Visitor opens `/admission`.
2. Classes are loaded from `GET /api/config`.
3. Visitor submits the form → `POST /api/public/apply`.
4. Server applies the configured fee and validates the target class.
5. Server returns `applicationId` + `payableAmount`.
6. Visitor enters payment method and transaction ID → `POST /api/public/pay-admission/:appId`.
7. Server verifies through the payment adapter and marks the application paid.
8. Visitor sees a printable receipt (`window.print` friendly layout).
9. Admin reviews in `/a/approvals` and can approve/reject.

### 7.2 Teacher attendance

1. Teacher opens `/t/attendance`.
2. App loads their class-teacher class and calendar state.
3. Teacher selects a date and marks each student Present/Late/Absent.
4. Submit → `POST /api/teacher/attendance` (upsert per class+date).
5. Student's calendar and analytics reflect the entry.

### 7.3 Grade entry → publish

1. Admin assigns teacher to class+subject in `/a/assignments`.
2. Teacher opens `/t/gradebook`, selects class/subject/term.
3. Enter marks → `POST /api/grades/bulk-submit`.
4. Class teacher publishes → `POST /api/grades/toggle-publish`.
5. Student sees the marks only when published.

### 7.4 Login with 2FA

1. User submits email/password.
2. If 2FA is enabled, server sets a 10-minute `preauth` cookie and returns `twoFactorRequired`.
3. UI opens the 2FA modal.
4. User submits TOTP → `POST /api/auth/2fa/verify`.
5. Server swaps preauth for a full session cookie and returns the user.

---

## 8. Non-functional requirements

| Area | Requirement |
|---|---|
| Security | HttpOnly cookies, CSRF double-submit, bcrypt (cost 12), Zod validation, Mongo sanitization, rate limits, Helmet/CSP, generic errors |
| Authorization | Enforced server-side on every protected route; role reloaded from DB, not trusted from JWT |
| Performance | Client-side pagination; indexed unique constraints; 5s DB selection timeout; 25s API timeout |
| Availability | Fails fast on missing `JWT_SECRET` or DB connection errors |
| Responsiveness | Mobile-first layouts; sidebar collapses to drawer + bottom navigation |
| Accessibility | Semantic labels, focus-visible rings, ARIA labels on icon buttons, `prefers-reduced-motion` support |
| Usability | Consistent design system, toasts, inline banners, empty states, loading spinners |
| Maintainability | Clear backend layering, shared UI primitives, centralized API client, documented conventions |
| Portability | Environment-driven config; SPA served by Express in production |
| Observability | Console logging for DB lifecycle and server startup; no structured logging/APM yet |

---

## 9. Release milestones

| Milestone | Content | Status |
|---|---|---|
| M1 — Foundation | Repo, Express server, Mongo connection, React/Vite shell, auth | Done |
| M2 — Core operations | Admin user management, attendance, notices, grades | Done |
| M3 — Public presence | Landing, founders, admissions, payment sandbox, receipts | Done |
| M4 — Authorization hardening | Teacher assignments, class/subject scope, 2FA, CSRF, rate limits | Done |
| M5 — Production readiness | Password reset, real payments, tests/CI, audit logs, docs | In progress |

---

## 10. Risks and open questions

| Risk | Impact | Mitigation |
|---|---|---|
| Sandbox payments accept any transaction ID | Accidental "paid" records if enabled in production | Sandbox is refused in production; real adapter required |
| No password reset | Users locked out rely on admin | Build reset flow |
| No parent↔student link | Parent portal is limited to notices | Define relationship model |
| No automated tests | Regressions likely | Add integration tests around auth, grades, admissions |
| Plaintext 2FA secret | DB compromise exposes TOTP seeds | Encrypt at rest |
| In-memory rate limits | Limits reset on restart and don't span instances | Use shared store (Redis) |
| Destructive actions lack audit trail | Hard to investigate incidents | Add audit log |

**Open questions**

1. Which payment provider(s) should be integrated first, and in which country/currency?
2. Should parents be linked to students by email, phone, or an admin-issued code?
3. Are multiple school branches/tenants expected later?
4. What is the required data-retention policy for admission PII (DOB, NID)?
5. Should students be able to self-register with a school-issued code?

---

## 11. Definition of done (per feature)

A feature is complete when:

- Backend route validates input with Zod and enforces the correct role/scope.
- Frontend uses the shared API client and design-system primitives.
- Loading, empty, error, and success states are handled.
- Mobile and desktop layouts are usable.
- Security impact is reviewed (auth, CSRF, secrets, authorization).
- Relevant docs (`MEMORY.md`, `TRACKER.md`) are updated.
- No secrets are committed and no console errors remain.
