# Design System and UX Guide

**Product:** Scholaris — School Management System
**Last updated:** 2026-10-23
**Related docs:** [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [MEMORY.md](./MEMORY.md) · [RULES.md](./RULES.md) · [TRACKER.md](./TRACKER.md)

---

## 1. Design principles

1. **Calm authority** — deep indigo and slate surfaces communicate trust without feeling corporate or cold.
2. **Clarity over decoration** — every screen leads with a title, a short subtitle, and one primary action.
3. **Consistent primitives** — spacing, radius, typography, and states come from shared tokens and `ui.jsx`, not per-page styles.
4. **Role-aware focus** — each workspace only shows navigation relevant to that role.
5. **Safe actions** — destructive actions require confirmation; destructive admin/teacher actions require password re-entry.
6. **Responsive by default** — mobile bottom navigation + slide-over drawer; tables scroll horizontally.
7. **Accessible motion** — short, purposeful transitions that respect `prefers-reduced-motion`.

---

## 2. Brand identity

| Element | Specification |
|---|---|
| Product name | **Scholaris** |
| Descriptor | “School Management” |
| Wordmark | Graduation-cap icon in a rounded square + stacked wordmark (`Wordmark.jsx`) |
| Light wordmark | Indigo gradient tile, dark text |
| Dark wordmark | Brass gradient tile, white text |
| Iconography | Custom inline SVG set in `components/icons.jsx` (stroke-based, 1.5–2px) |
| Voice | Professional, reassuring, lightly editorial (“quiet, steady craft”) |
| Emoji | Avoid in product UI; used sparingly in docs only |

---

## 3. Design tokens

Defined in `frontend/src/index.css` via Tailwind 4 `@theme`.

### 3.1 Color

| Token | Hex | Usage |
|---|---|---|
| `brand-50` | `#eef2ff` | Tinted backgrounds, active nav |
| `brand-100` | `#e0e7ff` | Selection, subtle fills |
| `brand-200` | `#c7d2fe` | Borders, avatars |
| `brand-300` | `#a5b4fc` | Icons on dark |
| `brand-400` | `#818cf8` | Accents |
| `brand-500` | `#6366f1` | Focus ring, primary accents |
| `brand-600` | `#4f46e5` | Primary buttons |
| `brand-700` | `#4338ca` | Hover, headings |
| `brand-800` | `#3730a3` | Gradients |
| `brand-900` | `#312e81` | Hero gradients |
| `brand-950` | `#1e1b4b` | Sidebar/footer depth |
| `brass-300` | `#fcd34d` | Active nav accent |
| `brass-400` | `#fbbf24` | Active indicator |
| `brass-500` | `#f59e0b` | CTA on dark hero, rules |
| `brass-600` | `#d97706` | Brass gradient end |
| `slate-50` | `#f8fafc` | App background |
| `slate-100`–`slate-300` | Tailwind slate | Borders, dividers, muted fills |
| `slate-400`–`slate-600` | Tailwind slate | Secondary/tertiary text |
| `slate-700`–`slate-900` | Tailwind slate | Body/heading text |
| `slate-950` | `#020617` | Deep surfaces |
| `emerald-*` | Tailwind | Success, present |
| `amber-*` | Tailwind | Late, holidays, warnings |
| `rose-*` | Tailwind | Errors, absent, destructive |
| `sky-*` | Tailwind | Info, excused |
| `violet-*` | Tailwind | Secondary tags |

**Rule:** brand colors are for structure and primary actions; semantic colors (emerald/amber/rose/sky) are for status only.

### 3.2 Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Sans / display | Plus Jakarta Sans | 400, 500, 600, 700, 800 | Self-hosted via Fontsource |
| Mono | IBM Plex Mono | 400, 500, 600 | Dates, codes, keys, numerals |
| Display utility | `.font-display` | — | `letter-spacing: -0.02em` |

Scale used in the app:

| Element | Classes |
|---|---|
| Page hero H1 | `text-3xl sm:text-4xl` / public hero `text-4xl sm:text-5xl lg:text-6xl` |
| Page header H1 | `text-2xl sm:text-3xl` |
| Section title | `text-lg`–`text-xl` |
| Body | `text-sm` / `text-base` |
| Meta / labels | `text-xs` or `text-[11px] font-bold uppercase tracking-wider` |
| Numerals / codes | `font-mono` |

### 3.3 Spacing, radius, elevation

| Token | Value / classes |
|---|---|
| Page container | `mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8` |
| Card radius | `rounded-2xl` (large panels `rounded-3xl`) |
| Control radius | `rounded-xl` (buttons, inputs) |
| Pill radius | `rounded-full` |
| Card border | `border-slate-200/80` |
| Card shadow | `shadow-[0_1px_3px_rgb(15_23_42/0.05)]` |
| Elevated modal | `shadow-2xl` |
| Hover lift | `.hover-lift` (`-2px` translate + soft shadow) |

### 3.4 Motion

| Token | Value |
|---|---|
| `--motion-fast` | 120ms |
| `--motion-base` | 200ms |
| `--motion-slow` | 320ms |
| `--ease-accent` | `cubic-bezier(0.2, 0, 0, 1)` |
| `animate-fade-in` | opacity |
| `animate-fade-up` | opacity + 10px rise |
| `animate-scale-in` | 0.96 → 1 scale |
| `animate-slide-in-right` | 24px slide |
| `animate-shimmer` | loading shimmer |

All animations collapse to ~0.01ms under `prefers-reduced-motion: reduce`.

---

## 4. Layout patterns

### 4.1 Public layout

```
┌─────────────────────────────────────────────┐
│ PublicHeader (sticky, blurred)              │
│  Wordmark · Home/Admission/Founders · auth  │
├─────────────────────────────────────────────┤
│ <Outlet />                                  │
│  Landing / Admission / Founders / Auth      │
├─────────────────────────────────────────────┤
│ PublicFooter (dark gradient, link columns)  │
└─────────────────────────────────────────────┘
```

- Header sticky at `top-0`, translucent `bg-slate-50/85` with backdrop blur.
- Mobile menu expands below header.
- Footer uses slate-900 → brand-950 gradient.

### 4.2 Authenticated app shell

```
Desktop                                  Mobile
┌──────────┬──────────────────────┐      ┌──────────────────────┐
│ Rail     │ Header (sticky)      │      │ Header + menu button │
│ 256px    │  page title · avatar │      ├──────────────────────┤
│ dark     │  · sign out          │      │ Content              │
│ gradient ├──────────────────────┤      │                      │
│ nav      │ <Outlet />           │      ├──────────────────────┤
│ + user   │                      │      │ Bottom nav (3 + More)│
└──────────┴──────────────────────┘      └──────────────────────┘
```

- Rail: fixed left, `w-64`, hidden below `lg`.
- Mobile: slide-over drawer (`w-72`, max `85vw`) with backdrop.
- Bottom nav: first 3 items; “More” opens the drawer when there are >4 items.
- Header title derives from the active nav item.

### 4.3 Page shell

Standard content pages use:

```jsx
<PageContainer>
  <div className="animate-fade-up space-y-6">
    <PageHeader title="..." subtitle="..." actions={...} />
    {/* Cards / tables / forms */}
  </div>
</PageContainer>
```

---

## 5. Component inventory

### 5.1 Shared UI (`components/ui.jsx`)

| Component | Purpose | Notes |
|---|---|---|
| `Spinner` | Inline loading indicator | `tone="brand"` or `"light"` |
| `FullScreenLoader` | Page-level loading | Centered, labeled |
| `PageContainer` | Max-width + responsive padding | Default `max-w-7xl` |
| `Card` | White rounded panel with hairline border | Base surface |
| `Badge` | Status pill | Tones: slate, indigo, emerald, teal, amber, rose, sky, violet, slateDark |
| `StatCard` | Dashboard metric | Gradient icon tile, label/value/sub |
| `EmptyState` | No-data state | Dashed border, icon, title, message |
| `MessageBanner` | Inline error/success/info | `{ text, type }` |
| `BackButton` | Navigational back | Chevron + label |
| `PageHeader` | Title + subtitle + badge + actions | Standard page intro |
| `inputClass` | Input/select/textarea styling | Focus ring brand |
| `labelClass` | Form label styling | Uppercase micro-label |
| `btnPrimary` | Main action | Brand-600 |
| `btnSecondary` | Secondary action | White/border |
| `btnDanger` | Destructive action | Rose-600 |
| `btnDark` | Tertiary action | Slate-800 |
| `tableWrap` / `thClass` / `tdClass` | Table styling | Thin scrollbars |

### 5.2 Other shared components

| Component | Purpose |
|---|---|
| `ProtectedRoute` | Session + role guard; redirects to login or role home |
| `Pagination` | Client-side page controls with page-size select (10/20/50) |
| `usePagination` | Pagination state; resets on list/size/reset key change |
| `TwoFactorModal` | 2FA login (`mode="login"`) or setup (`mode="setup"`) |
| `Wordmark` | Brand mark (light/dark, optional compact) |
| `PublicHeader` / `PublicFooter` / `PublicLayout` | Public chrome |
| `AppShell` | Authenticated chrome |
| `icons.jsx` | Inline SVG icon set |
| `ToastContext` | Portal-based transient notifications |

### 5.3 Toast system

- Tones: success (4s), info (4.5s), error (6.5s).
- Stack is bounded to the last 4 toasts.
- Rendered in a portal at bottom-center (mobile) / bottom-right (desktop).
- `role="alert"` + `aria-live="assertive"` for errors; `status`/`polite` otherwise.
- `useToast()` returns a safe no-op outside a provider.

---

## 6. Page inventory

### 6.1 Public / auth

| Route | Page | Purpose / key elements |
|---|---|---|
| `/` | `PublicPortal` | Hero from `SchoolInfo`, stats band, CTA to admission/founders |
| `/admission` | `PublicAdmission` | 3-step stepper (Details → Fee → Receipt), dual-language form, class select, MFS method + txn ID, printable receipt |
| `/founders` | `PublicFounders` | Board cards with photo, designation, quote |
| `/login` | `Login` | Split layout: brand panel + form; 2FA modal when required |
| `/register` | `Register` | Parent self-registration |
| `/profile` | `Profile` | Avatar upload, name/email (parents only), 2FA setup/disable, sign out |

### 6.2 Parent

| Route | Page | Purpose |
|---|---|---|
| `/p/home` | `ParentHome` | Welcome + school notices |

### 6.3 Student

| Route | Page | Purpose |
|---|---|---|
| `/s/dashboard` | `StudentDashboard` | Profile summary, attendance %, published grades snapshot |
| `/s/notices` | `StudentNotices` | Audience-filtered notices |
| `/s/grades` | `StudentGrades` | Published report card by term/subject |
| `/s/attendance` | `StudentAttendanceHub` | Month calendar (Present/Late/Absent/Excused/Off/Holiday) + yearly summary |

### 6.4 Teacher

| Route | Page | Purpose |
|---|---|---|
| `/t/dashboard` | `TeacherDashboard` | Welcome + teaching overview |
| `/t/roster` | `TeacherRoster` | Class roster, add/edit/delete students |
| `/t/attendance` | `TeacherAttendance` | Date picker, roster marking, off-day/holiday toggles |
| `/t/analytics` | `TeacherAnalytics` | Per-student attendance aggregation |
| `/t/gradebook` | `TeacherGradebook` | Class/subject/term mark entry + publish |
| `/t/notices` | `SharedNoticeBoard` | Teacher notices |
| `/t/users/create` | `TeacherCreateStudent` | Add student to class-teacher class |
| `/t/users/edit/:id` | `TeacherEditStudent` | Edit student within scope |

### 6.5 Admin

| Route | Page | Purpose |
|---|---|---|
| `/a/dashboard` | `AdminDashboard` | Students/teachers/notices/pending tasks |
| `/a/users` | `AdminUserRoster` | Searchable/filterable user directory |
| `/a/users/create` | `AdminCreateUser` | Create any role with profile fields |
| `/a/users/edit/:id` | `AdminEditUser` | Role, credentials, profile, attendance/grades view |
| `/a/assignments` | `AdminAssignments` | Map teacher ↔ class ↔ subject, flag class teacher |
| `/a/notices` | `AdminNoticeBoard` | Create/delete notices, PDF upload, password confirm |
| `/a/approvals` | `AdminAppApproval` | Application tabs + decision actions |
| `/a/applications/:id` | `AdminApplicationDetails` | Applicant dossier + decision |
| `/a/website` | `AdminWebsiteManager` | Public text, logo/banner, founder cards |
| `/a/settings` | `AdminSettings` | Classes, subjects, exam terms chips |

**Legacy redirects:** old `/student/*`, `/teacher/*`, `/admin/*`, `/public/*` URLs redirect to the current `/s`, `/t`, `/a`, and public paths.

---

## 7. Navigation map

| Role | Items (sidebar order) |
|---|---|
| Student | Overview · Notices · Report Card · Attendance |
| Teacher | Overview · My Roster · Attendance · Analytics · Gradebook · Notices · Add Student |
| Admin | Overview · All Users · Create User · Assignments · Notices · Admissions · Public Website · Settings |
| Parent | Overview |

Role landings: `/a/dashboard`, `/t/dashboard`, `/s/dashboard`, `/p/home`. Unauthorized role access redirects to the user's own landing.

---

## 8. Interaction patterns

### 8.1 Forms

- Labels are micro-caps (`labelClass`), inputs use `inputClass`.
- Required fields rely on native `required` plus server-side Zod validation.
- Inline `MessageBanner` for form-level errors; toasts for async results.
- Buttons show disabled/loading states and prevent double-submit via `submitting`/`loading`.
- File inputs accept images; profile photo is capped at 1 MB client-side and converted to a data URL.

### 8.2 Tables and lists

- Use `tableWrap`, `thClass`, `tdClass`.
- Client-side pagination via `usePagination` + `Pagination`.
- Horizontal scroll on narrow screens; thin custom scrollbars.
- Empty data always renders `EmptyState`.

### 8.3 Destructive actions

- Deleting a user/student or notice opens a confirmation modal.
- Admin/teacher deletes require the actor's password; notice delete sends it via `x-admin-password`.
- Destructive buttons use `btnDanger` and are never the default focus.

### 8.4 Loading and errors

- Page-level: `FullScreenLoader` or centered `Spinner`.
- Section-level: spinner inside the card.
- Errors: inline `MessageBanner` for page context; toast for background failures.
- Network failures use the shared `errorMessage()` fallback, never raw server internals.

### 8.5 2FA

- Login: `TwoFactorModal mode="login"` after `twoFactorRequired`.
- Setup: profile fetches QR + manual key, then `TwoFactorModal mode="setup"`.
- Input is numeric, max 6 digits, auto-focused, monospaced with wide tracking.

### 8.6 Admissions

- Three-step stepper with completed check marks.
- Fee step accepts method (bKash default) and transaction ID (min 6 chars).
- Receipt step is print-friendly (`print:*` utilities hide chrome).
- Success/error feedback uses banners, not alerts.

---

## 9. State design

| State | Pattern |
|---|---|
| Initial load | Centered spinner; skeleton/shimmer available but used sparingly |
| Empty | `EmptyState` with a relevant icon and next-step message |
| Error | `MessageBanner` inline; toast for actions |
| Success | Toast + optimistic UI where safe; refetch for authoritative data |
| Disabled | Reduced opacity + `cursor-not-allowed` |
| Destructive hover | Rose background/border transition |

---

## 10. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| `< sm` | Single-column grids, bottom navigation, full-width controls, stacked headers |
| `sm` | Two-column forms, horizontal header actions |
| `md` | Header name visible, more inline nav |
| `lg` | Persistent sidebar rail, no bottom nav, wider tables |
| `xl+` | Max-width containers keep line lengths readable |

Rules:
- Touch targets ≥ 40px on mobile.
- Never rely on hover for essential actions.
- Tables must scroll, not overflow the viewport.
- Modals use `max-w-*`, padding, and backdrop blur.

---

## 11. Accessibility

- All icon-only buttons have `aria-label` (menu, close, sign out, pagination).
- Navigation landmarks use `<nav aria-label="...">`.
- Focus is always visible via `:focus-visible` ring (brand-500, 2px offset).
- Form controls have associated `<label htmlFor>` where practical.
- Toasts use live regions; errors are assertive.
- Color is not the only status signal — labels accompany calendar/status colors.
- `prefers-reduced-motion` disables animations.
- Semantic headings (`h1` → `h3`) and lists are used.

---

## 12. Content and voice

- Tone: confident, calm, concise; avoid jargon and exclamation marks.
- Prefer sentence case for body; micro-labels are uppercase.
- Buttons are verbs (“Create User”, “Publish”, “Save settings”).
- Empty states explain what will appear and how to create it.
- Error copy is actionable and never exposes internals.
- Currency in the UI is Bangladeshi Taka (`৳`); dates use `en-BD` formatting.

---

## 13. Design rules and anti-patterns

### Do

- Reuse `ui.jsx` primitives and design tokens.
- Keep one primary action per screen/section.
- Use semantic status colors consistently.
- Show loading, empty, error, and success states.
- Use `Card` sections and `space-y-6` rhythm.
- Keep forms in a single column on mobile.

### Don’t

- Hardcode hex colors or font families in components.
- Introduce new button/input styles outside `ui.jsx`.
- Use brand color for errors or success.
- Use alerts/confirms for routine feedback; use toasts/banners.
- Add external CDN scripts/fonts (breaks CSP).
- Use color alone to communicate attendance/grade status.
- Hide destructive actions behind hover-only affordances.

---

## 14. Future design work

- Password reset and change-password screens.
- Parent ↔ child dashboard once the data model exists.
- Real payment provider UI (redirect/webhook states).
- Dark mode tokens (currently light-first).
- Skeleton loaders for table-heavy pages.
- Audit/history timeline components for admin actions.
- Empty-state illustrations to replace icon placeholders.
