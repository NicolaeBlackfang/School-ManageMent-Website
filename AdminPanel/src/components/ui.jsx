// src/components/ui.jsx
// Shared presentational building blocks for a consistent design system.
// These are purely visual — all data logic lives in the page components.

import { IconCheckCircle, IconAlert, IconClipboard } from "./icons.jsx";

export const Spinner = ({ className = "h-8 w-8", tone = "brand" }) => (
  <div
    className={`animate-spin rounded-full border-2 ${
      tone === "light" ? "border-white/30 border-t-white" : "border-slate-200 border-t-brand-500"
    } ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export const FullScreenLoader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
    <Spinner className="h-10 w-10" />
    <p className="text-sm font-medium text-slate-400">{label}</p>
  </div>
);

export const PageContainer = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${className}`}>
    {children}
  </div>
);

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgb(15_23_42/0.05)] ${className}`}>
    {children}
  </div>
);

const BADGE_TONES = {
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  indigo: "bg-brand-50 text-brand-700 ring-brand-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  sky: "bg-sky-50 text-sky-700 ring-sky-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  slateDark: "bg-slate-900 text-white ring-slate-800",
};

export const Badge = ({ children, tone = "slate", className = "" }) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
      BADGE_TONES[tone] || BADGE_TONES.slate
    } ${className}`}
  >
    {children}
  </span>
);

const STAT_TONES = {
  indigo: "from-brand-500 to-brand-700",
  emerald: "from-emerald-500 to-teal-600",
  teal: "from-teal-500 to-cyan-600",
  amber: "from-amber-400 to-orange-500",
  rose: "from-rose-500 to-pink-600",
  sky: "from-sky-500 to-cyan-600",
  violet: "from-violet-500 to-purple-600",
  slate: "from-slate-500 to-slate-700",
};

export const StatCard = ({ label, value, sub, icon, tone = "indigo", className = "" }) => (
  <Card className={`p-5 ${className}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="font-display mt-1.5 truncate text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        {sub && <p className="mt-1 truncate text-sm text-slate-500">{sub}</p>}
      </div>
      {icon && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${STAT_TONES[tone]} text-white shadow-sm`}
        >
          {icon}
        </div>
      )}
    </div>
  </Card>
);

export const EmptyState = ({ title = "Nothing here yet", message, children }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
      {children || <IconClipboard className="h-5 w-5" />}
    </div>
    <p className="mt-1 text-sm font-semibold text-slate-700">{title}</p>
    {message && <p className="max-w-md text-sm text-slate-500">{message}</p>}
  </div>
);

const MESSAGE_STYLES = {
  error: "border-rose-200 bg-rose-50 text-rose-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

export const MessageBanner = ({ message }) => {
  if (!message || !message.text) return null;
  const type = message.type === "error" ? "error" : message.type === "success" ? "success" : "info";
  const Icon = type === "error" ? IconAlert : IconCheckCircle;
  return (
    <div className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${MESSAGE_STYLES[type]}`}>
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span>{message.text}</span>
    </div>
  );
};

export const BackButton = ({ onClick, children = "Back" }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
    {children}
  </button>
);

export const PageHeader = ({ title, subtitle, badge, actions, className = "" }) => (
  <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}>
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2.5">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {badge}
      </div>
      {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
    </div>
    {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

// Shared input / label styles so every form in the app looks identical.
export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

export const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:cursor-not-allowed disabled:opacity-60";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60";

export const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/40 disabled:cursor-not-allowed disabled:opacity-60";

export const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500/40 disabled:cursor-not-allowed disabled:opacity-60";

export const tableWrap =
  "scrollbar-thin overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm";

export const thClass =
  "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500";

export const tdClass = "px-4 py-3 text-sm text-slate-700";