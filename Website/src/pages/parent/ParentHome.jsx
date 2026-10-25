// src/pages/parent/ParentHome.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { PageContainer, Card, Spinner, Badge, MessageBanner } from '../../components/ui.jsx';
import { IconBell, IconShield, IconBook, IconClipboard } from '../../components/icons.jsx';

const ParentHome = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/notices');
        if (!cancelled) setNotices(data.data || []);
      } catch {
        if (!cancelled) setMsg({ text: 'Notices could not be loaded.', type: 'error' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const firstName = (user?.name || '').split(' ')[0] || 'Guest';
  const latest = notices.slice(0, 5);

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        {/* Greeting hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-700/40 blur-2xl" />
          <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-brass-500/15 blur-2xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass-300">Parent Console</p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome, {firstName}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-brand-100/80">
              The central view for your ward&apos;s school life — announcements, results and attendance at a glance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/admission"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <IconClipboard className="h-4 w-4" /> Admissions desk
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-xl bg-brass-500 px-4 py-2 text-sm font-semibold text-brand-950 transition hover:bg-brass-400"
              >
                <IconShield className="h-4 w-4" /> Account security
              </Link>
            </div>
          </div>
        </div>

        <MessageBanner message={msg} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Latest notices */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <IconBell className="h-5 w-5" />
                </div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">School Notices</h2>
              </div>
              <Badge tone="emerald">{notices.length} total</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="flex items-center justify-center py-12"><Spinner /></div>
              ) : latest.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-slate-400">No notices published yet.</p>
              ) : (
                latest.map((n) => (
                  <div key={n._id} className="flex items-start gap-3 px-5 py-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{n.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{n.content}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Published {new Date(n.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Quick reference */}
          <div className="space-y-6">
            <Card>
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">Account</h2>
              </div>
              <div className="space-y-2 p-5">
                <p className="text-sm text-slate-600">
                  Signed in as <span className="font-semibold text-slate-800">{user?.name}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Role <Badge tone="indigo">Parent</Badge>
                </p>
                <div className="flex items-center gap-2 pt-2 text-sm">
                  <IconShield className={`h-4 w-4 ${user?.twoFactorEnabled ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className={user?.twoFactorEnabled ? 'text-emerald-700' : 'text-slate-500'}>
                    {user?.twoFactorEnabled ? 'Two-factor authentication on' : 'Two-factor authentication off'}
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  <IconBook className="h-4 w-4" /> Manage settings
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ParentHome;