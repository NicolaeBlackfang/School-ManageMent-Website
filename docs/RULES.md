# Engineering Rules

**Project:** Scholaris — School Management System
**Last updated:** 2026-10-23
**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [MEMORY.md](./MEMORY.md) · [TRACKER.md](./TRACKER.md)

These rules are mandatory for all contributors (human or AI). When in doubt, prefer the safer, smaller, more explicit change.

---

## 1. Golden rules

1. **Never commit secrets.** No `.env`, credentials, tokens, keys, or real student/parent data in git.
2. **Never trust the client.** Validate every input and enforce authorization on the server.
3. **Reuse existing patterns** before creating new ones. Read neighboring files first.
4. **Keep changes scoped.** Do not refactor unrelated code in the same change.
5. **Do not break documented contracts** (routes, response shapes, role rules) without updating docs.
6. **No silent failures.** Handle and surface errors; never leave an empty `catch`.
7. **Do not commit unless explicitly asked.**
8. **Update the docs** (`MEMORY.md`, `TRACKER.md`) when behavior or status changes.

---

## 2. Security rules

### 2.1 Secrets and configuration

- `.env` files are git-ignored. Use `backend/.env.example` for placeholders only.
- Never log secrets, tokens, passwords, 2FA secrets, or full connection strings.
- `JWT_SECRET` must be present and ≥32 characters in production.
- Use least-privilege database users; avoid sharing production credentials.
- Rotate any credential that is accidentally exposed; do not just delete the commit.

### 2.2 Authentication

- Sessions are HttpOnly cookies. Never store JWTs in `localStorage`/`sessionStorage`.
- Protected routes must use `protect`; role restrictions must use `authorizeRoles`.
- Role must come from the DB-loaded `req.user`, not from the JWT claim.
- Preauth tokens (`purpose:'2fa'`) must not be accepted as sessions.
- Passwords are hashed by the `User` pre-save hook (bcrypt cost 12). Never hash manually or store plaintext.
- Do not add endpoints that return `password` or `twoFactorSecret`; use safe projections/serializers.

### 2.3 Authorization

- Every protected endpoint must declare its role guard.
- Teacher class-level actions must call `canAccessClass`.
- Teacher grading must call `requireAssignment`.
- Student endpoints must scope queries by `req.user._id`.
- Cross-class student IDs must be rejected on writes (`findOutOfClassStudents`).
- Admin-only actions must not be reachable by teachers or parents.
- Destructive admin/teacher actions require password confirmation.

### 2.4 Input and injection

- Every mutation must be validated with Zod via `validate(schema)`.
- Zod schemas must **allow-list** fields; never pass `req.body` straight to a model.
- Server-controlled fields (fee, payment status, role, ownership) must never be accepted from the client.
- Apply `mongo-sanitize` behavior to body/params/query; preserve the Express 5 `Object.defineProperty` fix.
- File uploads: enforce MIME allow-lists and size limits. Do not trust client MIME alone for new sensitive uploads; add magic-byte checks when possible.

### 2.5 CSRF, CORS, headers

- All `/api` mutations require the double-submit CSRF token. Do not exempt routes without a written reason.
- Frontend requests must go through the shared Axios client so `X-CSRF-Token` is sent.
- Keep CORS restricted to `CLIENT_URL`; never use `origin: '*'` with credentials.
- Do not weaken Helmet/CSP. No external CDN scripts, styles, or fonts.

### 2.6 Payments

- Amounts must be set server-side.
- Only the payment adapter may mark an application `Paid`.
- Keep sandbox refused in production.
- A real adapter must verify transaction ID and amount server-to-server.
- Do not add an admin path that sets `Paid`.

### 2.7 Errors and logging

- Return generic errors to clients (`Invalid request payload.`, `Internal server error.`).
- Log details server-side only.
- Never include stack traces, DB errors, or secrets in responses.

---

## 3. Backend rules

### 3.1 Structure

- Keep cross-cutting logic in `middleware/`, schemas in `middleware/validate.js`, provider logic in `services/`.
- New domain routes go in `backend/routes/` and are mounted in `server.js`.
- Extract a controller only when a route file becomes hard to maintain; otherwise follow the existing inline style.
- Keep the middleware order in `server.js` intact unless the change is explicitly about ordering.
- Remember route mount order: `/api/teacher` precedes `/api` (assignments).

### 3.2 Validation

- Add/extend a Zod schema for every new payload or param.
- Use `validate(schema, 'params' | 'query')` for non-body sources.
- Sanitize/trim strings; coerce numbers explicitly.
- Cap array lengths to prevent abuse (existing pattern: 2000 items).

### 3.3 Database

- Define indexes for unique business keys and frequent lookups.
- Use `select: false` for sensitive fields.
- Use `pre('save')` hooks for derived values only when they must always be correct.
- Use `.lean()` for read-only list/aggregate queries where appropriate.
- Wrap multi-document writes in transactions when consistency matters (not done today; improve when touching those flows).
- Do not expose raw Mongo error messages.
- Handle duplicate-key errors (`11000`) with friendly 400s.
- Preserve referential behavior: `Attendance`/`Gradebook` reference `User`.
- When deleting students, preserve roll uniqueness and reindex sequentially.
- Do not break the unique compound indexes in `Student`, `Assignment`, `Attendance`, `Gradebook`.

### 3.4 Responses

- Follow `{ success, data|message }` for success and `{ success:false, message }` for errors.
- Use correct status codes: 400 validation, 401 auth, 403 authorization, 404 missing, 409 conflict, 429 rate limit, 503 unavailable.
- Do not change existing response shapes without updating the frontend and docs.

### 3.5 Auth and cookies

- Use helpers in `middleware/auth.js`; do not hand-roll JWT/cookie logic.
- Keep cookie flags: `httpOnly`, `sameSite:'lax'`, `secure` in production, `path:'/'`.
- If you add logout cleanup, clear `csrf` as well (current gap).

---

## 4. Data rules

- One `User` per person; email is unique and normalized.
- `Student` and `Teacher` are 1:1 profiles keyed by `userId`.
- Public registration may only create `parent`.
- Only admins may change roles.
- Student roll numbers are unique per class; deletion reindexes later rolls.
- `Assignment.subject = null` means class-teacher-only; never grant grading for null subjects.
- Published grades are the only grades students may see.
- Attendance is one document per class per day, normalized to midnight.
- `SchoolConfig` and `SchoolInfo` are singletons; create defaults on first read.
- Do not store PII beyond what the admissions form requires.
- Never add sample real PII to seeds or fixtures.

---

## 5. Frontend rules

### 5.1 API access

- Use `src/core/api.js` only. No `fetch`, no second Axios instance.
- Use `errorMessage()` for user-facing failures.
- Keep `withCredentials` and XSRF configuration intact.
- Use relative `/api/...` paths; never hardcode the backend origin.

### 5.2 State and routing

- Use `AuthContext` for session/user; do not duplicate auth state.
- Use `ProtectedRoute` with `allowedRoles` for every authenticated screen.
- Keep role prefixes (`/a`, `/t`, `/s`, `/p`) and legacy redirects working.
- Use `useToast()` for transient feedback; do not use `alert`/`confirm`.
- Prefer local component state; add a context only for app-wide concerns.

### 5.3 UI and styling

- Reuse `components/ui.jsx` primitives and `inputClass`/`btn*` classes.
- Use design tokens (`brand-*`, `brass-*`, `slate-*`); no hardcoded hex/fonts.
- Use semantic colors only for status (emerald success, amber late/warning, rose error/absent, sky info).
- Every list must handle loading, empty, and error states.
- Use `EmptyState`, `Spinner`, `MessageBanner`, and `Card` consistently.
- Keep one primary action per screen/section.
- Ensure icon-only buttons have `aria-label`.
- Support mobile: bottom nav, horizontal table scroll, stacked forms.
- Respect `prefers-reduced-motion`.
- Do not add external fonts/scripts/styles (CSP).

### 5.4 Components

- New shared components go in `components/`; page-specific ones stay with the page.
- Keep presentational components free of data fetching.
- Do not introduce an icon/UI library; extend `icons.jsx`.
- Use `Pagination` + `usePagination` for large lists.

### 5.5 JavaScript style

- Plain JavaScript/JSX (no TypeScript).
- Match existing formatting: 2-space indentation, single quotes, semicolons.
- Use function components and hooks.
- No comments unless they explain non-obvious intent (existing files use sparse section comments).
- Avoid unused imports/variables; frontend lint must pass.

---

## 6. Naming and conventions

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase file + export | `AdminDashboard.jsx` |
| Hooks | `useX` | `usePagination` |
| Context | `XContext` + `XProvider` + `useX` | `AuthContext` |
| Backend files | camelCase | `gradebookRoutes.js` |
| Models | PascalCase | `Gradebook` |
| API paths | plural nouns, kebab-case segments | `/api/pay-admission/:appId` |
| Roles | lowercase | `admin`, `teacher`, `student`, `parent` |
| Attendance statuses | Title case | `Present`, `Absent`, `Late` |
| Payment statuses | Title case | `Unpaid`, `Paid`, `Waived` |
| Application statuses | Title case | `Pending`, `Approved`, `Rejected` |
| Env vars | SCREAMING_SNAKE_CASE | `JWT_SECRET` |

---

## 7. Git and workflow

- Do not commit unless the user explicitly asks.
- Before committing: inspect `git status`, `git diff`, and recent history.
- Stage only intended files; never stage `.env` or secrets.
- Write concise, imperative commit messages that match repo style.
- Do not amend, force-push, skip hooks, or create empty commits unless asked.
- Do not update git config.
- Keep PRs focused; describe behavior changes, security impact, and verification.
- Rebase/merge per project preference; do not rewrite shared history.

---

## 8. Verification rules

### Frontend

```bash
npm run lint --prefix frontend
npm run build --prefix frontend
```

Both must pass before considering frontend work complete.

### Backend

- There is no test or lint script today.
- Start the server (`npm run backend`) and exercise the changed endpoints.
- Confirm startup logs show a Mongo connection.
- For auth/security changes, test both success and failure paths (401/403/409/429).
- For data changes, verify indexes and duplicate handling.

### Manual smoke checklist

- Login/logout; 2FA if enabled.
- Role landing redirects.
- Create/edit/delete a user (password-confirmed).
- Attendance submit + student calendar.
- Marks submit + publish + student visibility.
- Notice create/delete with PDF.
- Admission apply → pay → admin review.
- Mobile width (≤375px) and desktop.

---

## 9. Documentation rules

- Keep `docs/` in sync with code.
- Update `TRACKER.md` when a feature moves state or a bug is found/fixed.
- Update `MEMORY.md` for non-obvious behavior, decisions, and gotchas.
- Update `ARCHITECTURE.md` when routes, models, middleware order, or integrations change.
- Update `DESIGN.md` when tokens, shared components, routes, or interaction patterns change.
- Update `PRD.md` when scope or requirements change.
- Update `.env.example` when adding a variable.
- Do not document secret values; names and purposes only.

---

## 10. Rules for AI agents

1. Read `MEMORY.md` and this file before changing code.
2. Explore the actual implementation; never assume an endpoint, model, or component exists.
3. Prefer editing existing files over creating new ones.
4. Do not add dependencies without checking they are already used and justified.
5. Do not add comments to code unless requested.
6. Do not create documentation files unless requested (this docs set was requested).
7. Do not run destructive git operations or commit without explicit permission.
8. Do not expose secrets found in `.env` or logs.
9. Verify with lint/build/start commands available in the repo.
10. If a required command is unknown, ask the user and suggest adding it to `AGENTS.md`.
11. Keep responses and diffs minimal and focused.
12. Report what changed, how it was verified, and any remaining risk.

---

## 11. Pre-merge checklist

- [ ] Change is scoped and matches existing patterns.
- [ ] Inputs validated; authorization enforced server-side.
- [ ] No secrets or PII added to the repo.
- [ ] Response shapes and status codes are correct.
- [ ] Loading/empty/error/success states handled in the UI.
- [ ] Mobile and desktop layouts verified.
- [ ] Accessibility basics checked (labels, focus, ARIA).
- [ ] Frontend lint and build pass.
- [ ] Backend starts and changed routes were exercised.
- [ ] Docs updated (`MEMORY.md`, `TRACKER.md`, and any affected doc).
- [ ] No unrelated files staged.
