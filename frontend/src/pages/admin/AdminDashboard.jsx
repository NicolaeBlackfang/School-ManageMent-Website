// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { useAuth } from '../../hooks/useAuth.js';
import { PageContainer, Card, StatCard, Spinner, MessageBanner, Badge } from '../../components/ui.jsx';
import { IconUsers, IconBell, IconAlert, IconUser, IconChart, IconGraduation } from '../../components/icons.jsx';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ registeredStudents: 0, activeTeachers: 0, noticesPublished: 0, pendingTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/auth/dashboard-stats');
        if (!cancelled && data.success) setStats(data.stats);
      } catch {
        if (!cancelled) setMsg({ text: 'Failed to load dashboard statistics.', type: 'error' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <PageContainer><div className="flex min-h-[40vh] items-center justify-center"><Spinner /></div></PageContainer>;
  }

  const modules = [
    { icon: <IconBell className="h-5 w-5" />, tint: 'bg-amber-50 text-amber-600', title: 'Broadcast Bulletins', body: 'Announcements, alerts and PDF circulars pushed to parent and student timelines.', to: '/a/notices', cta: 'Open notice board' },
    { icon: <IconUsers className="h-5 w-5" />, tint: 'bg-sky-50 text-sky-600', title: 'User Control Matrix', body: 'Audit faculty profiles, shift rolls, delete accounts and manage metadata.', to: '/a/users', cta: 'Configure roster' },
    { icon: <IconChart className="h-5 w-5" />, tint: 'bg-violet-50 text-violet-600', title: 'Website settings', body: 'Update the school homepage, branding, contact information and leadership profiles.', to: '/a/website', cta: 'Edit website settings' },
    { icon: <IconBell className="h-5 w-5" />, tint: 'bg-sky-50 text-sky-600', title: 'Public content', body: 'Manage public news, announcements, photo gallery, pages and school information.', to: '/a/content', cta: 'Manage public content' },
    { icon: <IconGraduation className="h-5 w-5" />, tint: 'bg-brand-50 text-brand-600', title: 'Institution Settings', body: 'Class sections and subject structures used across every dropdown matrix.', to: '/a/settings', cta: 'Configure school layout' },
    { icon: <IconUser className="h-5 w-5" />, tint: 'bg-amber-50 text-amber-600', title: 'Application Approvals', body: 'Review admission forms, authorize passes and browse the approved archive.', to: '/a/approvals', cta: 'Open approval desk' },
    { icon: <IconUser className="h-5 w-5" />, tint: 'bg-emerald-50 text-emerald-600', title: 'Create User', body: 'Provision new student, teacher or admin accounts with initial credentials.', to: '/a/users/create', cta: 'Create a user' },
  ];

  return (
    <PageContainer className="max-w-7xl">
      <div className="animate-fade-up space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-slate-950 p-8 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-700/40 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brass-500/15 blur-2xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
                <IconGraduation className="h-4 w-4" /> Administrative Terminal
              </span>
              <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome, {(user?.name || '').split(' ')[0] || 'Admin'}
              </h1>
              <p className="mt-2 max-w-lg text-sm text-brand-100/80">
                Central command hub for monitoring school statistics and managing portal systems.
              </p>
            </div>
            <div className="flex flex-col gap-3 self-start sm:items-end sm:self-center">
              <Link to="/a/users/create" className="inline-flex items-center gap-2 rounded-xl bg-brass-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-brass-400">
                <IconUser className="h-4 w-4" /> Create user
              </Link>
              <Badge tone="amber">Super admin account</Badge>
            </div>
          </div>
        </div>

        <MessageBanner message={msg} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Registered Students" value={stats.registeredStudents} icon={<IconGraduation className="h-5 w-5" />} tone="indigo" />
          <StatCard label="Active Teachers" value={stats.activeTeachers} icon={<IconUsers className="h-5 w-5" />} tone="emerald" />
          <StatCard label="Notices Published" value={stats.noticesPublished} icon={<IconBell className="h-5 w-5" />} tone="amber" />
          <StatCard label="Pending Tasks" value={stats.pendingTasks} icon={<IconAlert className="h-5 w-5" />} tone={stats.pendingTasks > 0 ? 'rose' : 'slate'} />
        </div>

        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Active management modules</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Card key={m.to} className="group flex flex-col justify-between p-6 transition hover-lift">
                <div className="space-y-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${m.tint}`}>{m.icon}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{m.body}</p>
                </div>
                <Link to={m.to} className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition group-hover:bg-brand-700">
                  {m.cta} <span aria-hidden="true">→</span>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default AdminDashboard;
