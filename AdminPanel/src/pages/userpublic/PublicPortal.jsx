// src/pages/userpublic/PublicPortal.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { IconClipboard, IconGraduation, IconSparkles, IconShield, IconCheckCircle } from '../../components/icons.jsx';

const PublicPortal = () => {
  const [info, setInfo] = useState({ welcomeTitle: '', aboutText: '', admissionFeeAmount: 500, founders: [] });

  useEffect(() => {
    api.get('/public/info')
      .then(({ data }) => { if (data.success) setInfo({ ...info, ...data.data }); })
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Structured Classes', value: 'K–12', hint: 'Every grade section mapped' },
    { label: 'Founding Board', value: String(info.founders?.length || 6).padStart(1, '0'), hint: 'Guiding pillars' },
    { label: 'Admission Fee', value: `৳${Number(info.admissionFeeAmount) || 500}.00`, hint: 'One-time, transparent' },
    { label: 'Portal Security', value: 'A+', hint: 'CSRF + TOTP ready' },
  ];

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-950 to-slate-950 text-white">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-brass-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
                <IconGraduation className="h-4 w-4" /> Admissions season open
              </span>
              <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {info.welcomeTitle || 'A place where learning is a quiet, steady craft.'}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
                {info.aboutText
                  ? info.aboutText.slice(0, 220) + (info.aboutText.length > 220 ? '…' : '')
                  : 'A modern institution portal uniting admissions, attendance, results and school-wide notices in a single, elegant campus experience.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/admission"
                  className="inline-flex items-center gap-2 rounded-xl bg-brass-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-lg shadow-brass-500/20 transition hover:bg-brass-400"
                >
                  <IconClipboard className="h-5 w-5" /> Begin an application
                </Link>
                <Link
                  to="/founders"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
                >
                  <IconSparkles className="h-5 w-5" /> Meet the founders
                </Link>
              </div>
            </div>

            <div className="animate-fade-up lg:col-span-5">
              {info.bannerImage ? (
                <img
                  src={info.bannerImage}
                  alt="School banner"
                  className="aspect-[4/3] w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 text-white/40">
                  <IconGraduation className="h-14 w-14" />
                  <p className="text-sm font-semibold tracking-wide">Campus imagery coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 sm:grid-cols-4 lg:gap-6 lg:p-6">
            {stats.map((s, i) => (
              <div key={s.label} className="animate-fade-up rounded-2xl p-4" style={{ animationDelay: `${i * 60}ms` }}>
                <p className="font-display text-2xl font-semibold tracking-tight text-brand-700 sm:text-3xl">{s.value}</p>
                <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass-600">The Scholaris way</p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything a school runs on, one calm canvas.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <IconClipboard className="h-6 w-6" />,
              tint: 'bg-amber-50 text-amber-600',
              title: 'Online Admission Desk',
              body: 'Submit an electronic application and track its review cycle end-to-end — no paper, no queues, no lost forms.',
              cta: 'Start an application',
              to: '/admission',
            },
            {
              icon: <IconSparkles className="h-6 w-6" />,
              tint: 'bg-sky-50 text-sky-600',
              title: 'Founding Board',
              body: 'Read the voices of the institution’s leadership — the ideals and commitments behind the classroom.',
              cta: 'Meet the board',
              to: '/founders',
            },
            {
              icon: <IconShield className="h-6 w-6" />,
              tint: 'bg-brand-50 text-brand-600',
              title: 'A Secured Parent Portal',
              body: 'Sign in with an HttpOnly session, protect your account with TOTP two-factor auth, and see only your family’s records.',
              cta: 'Create an account',
              to: '/register',
            },
          ].map((f, i) => (
            <Link
              key={f.title}
              to={f.to}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 text-left shadow-sm transition hover-lift"
            >
              <div>
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.tint}`}>{f.icon}</span>
                <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.body}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                {f.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-center sm:p-12">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-700/30 blur-2xl" />
          <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brass-500/15 blur-2xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to begin the journey?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
              Create a parent account to follow your ward&apos;s progress, or start a new admission application right away.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register" className="rounded-xl bg-brass-500 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-brass-400">
                Create a parent account
              </Link>
              <Link to="/login" className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
                Sign in instead
              </Link>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <IconCheckCircle className="h-4 w-4 text-brass-500" /> No paper forms · Secure session · Reviewed live
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicPortal;