# Scholaris School Management System

Scholaris is a full-stack school management platform split into three apps with a shared Express API.

## Architecture

```
school-management-system/
├── Server/       # Express 5 + MongoDB/Mongoose API (CommonJS)
├── AdminPanel/   # Vite + React admin/teacher console (runs at /admin in prod)
└── Website/      # Vite + React public site + student/parent portal
```

## Quick start (development)

1. Copy env files and fill in secrets:
   - `Server/.env` from `Server/.env.example`
2. Install all dependencies:
   ```bash
   npm run install:all
   ```
3. Run everything together (Server :5000, AdminPanel :5174, Website :5175):
   ```bash
   npm run dev
   ```
   Or run individually: `npm run server`, `npm run admin`, `npm run website`.

## Production

Build both frontends:
```bash
npm run build
```
In production the API serves:
- `Website/dist` at `/` (public site + student/parent portal)
- `AdminPanel/dist` at `/admin` (admin/teacher console)

## Key security features

- HttpOnly session cookies + CSRF double-submit tokens (axios reads the `csrf` cookie automatically)
- Optional TOTP 2FA with AES-256-GCM encrypted secrets
- Per-account login lockout after repeated failures
- Email-token password reset + authenticated password change (revokes older sessions on reset/change)
- Zod request validation + query sanitation
- Server-controlled admission fees; payments are idempotent, reject `Paid/Waived/Rejected`, and use a swappable provider adapter

## Content management

The website uses a WordPress-style CMS:
- Site identity, navigation menu (header/footer with dropdowns/reorder), pages, news/notices/announcements
- Gallery, facilities, academic sections
- Content is managed from `AdminPanel` → Content Studio (`/a/cms`); public endpoints under `/api/public/*` and `/api/public/site|menu`

## Documentation

See `docs/` for `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `MEMORY.md`, `RULES.md`, `TRACKER.md`.

## Notes

- `ui-ux-pro-max-local/` is an existing local design-system skill (nested `.git`) — referenced for UI/UX guidance.
- AdminPanel and Website contain their own `node_modules/` (untracked). Do **not** commit secrets or `.env` files.
