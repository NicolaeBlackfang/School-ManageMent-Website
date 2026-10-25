// src/pages/userpublic/PublicFounders.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { Spinner, EmptyState, Badge } from '../../components/ui.jsx';
import { IconBack, IconSparkles } from '../../components/icons.jsx';

const PublicFounders = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/public/info')
      .then(({ data }) => { if (data.success) setFounders(data.data.founders || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-brass-500/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
              <IconSparkles className="h-4 w-4" /> Institutional Founding Board
            </span>
            <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              The voices behind the institution.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-brand-100/80">
              Dispaches and commitments from the leadership pillars who guide the academy&apos;s ethos and direction.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:self-auto"
          >
            <IconBack className="h-4 w-4" /> Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : founders.length === 0 ? (
          <EmptyState
            title="No board profiles yet"
            message="Board profiles haven't been published by the administration yet. Check back soon."
          />
        ) : (
          <div className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-2">
            {founders.map((f) => (
              <article
                key={f._id}
                className="group flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover-lift sm:flex-row sm:items-start"
              >
                {f.image ? (
                  <img
                    src={f.image}
                    alt={`Portrait of ${f.name}`}
                    className="h-24 w-24 shrink-0 rounded-2xl border-2 border-brand-100 bg-slate-50 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-2xl font-bold text-white shadow-sm">
                    {f.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div>
                    <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">{f.name}</h2>
                    <div className="mt-2 flex justify-center sm:justify-start">
                      <Badge tone="indigo">{f.designation}</Badge>
                    </div>
                  </div>
                  <blockquote className="relative rounded-2xl border border-slate-200/70 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                    <span className="font-display absolute -top-1 left-3 text-3xl text-brand-300">&ldquo;</span>
                    {f.quote}
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicFounders;