// src/pages/student/StudentDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { useAuth } from '../../hooks/useAuth.js';
import { PageContainer, Card, StatCard, Spinner, MessageBanner } from '../../components/ui.jsx';
import { IconBell, IconBook, IconCalendar, IconGraduation } from '../../components/icons.jsx';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/student/my-records');
        if (!cancelled && data.success) setRecords(data);
      } catch {
        if (!cancelled) setMsg({ text: 'Failed to pull student performance records.', type: 'error' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <PageContainer><div className="flex min-h-[40vh] items-center justify-center"><Spinner /></div></PageContainer>;

  const { profile, attendance } = records || { profile: {}, attendance: {} };
  const firstName = (user?.name || '').split(' ')[0] || 'Student';

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        {/* Identity hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-slate-950 p-8 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-700/40 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brass-500/15 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
              <IconGraduation className="h-4 w-4" /> Student Console
            </span>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome, {firstName}
            </h1>
            {profile.gradeClass && (
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="rounded-lg bg-white/10 px-3 py-1 ring-1 ring-white/15">Section: <b>{profile.gradeClass}</b></span>
                <span className="rounded-lg bg-white/10 px-3 py-1 ring-1 ring-white/15">Roll: <b>#{profile.rollNumber}</b></span>
              </div>
            )}
          </div>
        </div>

        <MessageBanner message={msg} />

        {/* Summary strip */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            label="Attendance Rate"
            value={`${attendance.percentage ?? 0}%`}
            sub={`${attendance.totalSessions ?? 0} sessions logged`}
            icon={<IconCalendar className="h-5 w-5" />}
            tone="emerald"
          />
          <StatCard
            label="Registered Guardian"
            value={profile.guardianName || '—'}
            sub="On record for this student"
            icon={<IconGraduation className="h-5 w-5" />}
            tone="sky"
          />
          <StatCard
            label="Total Sessions"
            value={attendance.totalSessions ?? 0}
            sub="Classes recorded this term"
            icon={<IconBook className="h-5 w-5" />}
            tone="amber"
          />
        </div>

        {/* Academic desks */}
        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Core academic desks</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <IconBell className="h-5 w-5" />,
                tint: 'bg-amber-50 text-amber-600',
                title: 'Official Bulletin Board',
                body: 'Institutional circulars, schedule briefs and published office PDFs.',
                to: '/s/notices',
              },
              {
                icon: <IconBook className="h-5 w-5" />,
                tint: 'bg-violet-50 text-violet-600',
                title: 'Academic Report Card',
                body: 'Finalized examination indices, letter grades and teacher feedback.',
                to: '/s/grades',
              },
              {
                icon: <IconCalendar className="h-5 w-5" />,
                tint: 'bg-emerald-50 text-emerald-600',
                title: 'Attendance Calendar',
                body: 'Daily check-in history, monthly presence grids and leave records.',
                to: '/s/attendance',
              },
            ].map((c) => (
              <Card key={c.to} className="group flex flex-col justify-between p-6 transition hover-lift">
                <div className="space-y-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.tint}`}>{c.icon}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{c.body}</p>
                </div>
                <Link
                  to={c.to}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition group-hover:bg-brand-700"
                >
                  Open desk <span aria-hidden="true">→</span>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default StudentDashboard;