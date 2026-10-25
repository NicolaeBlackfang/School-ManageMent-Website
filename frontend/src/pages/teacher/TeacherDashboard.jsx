// src/pages/teacher/TeacherDashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { PageContainer, Card, Badge } from '../../components/ui.jsx';
import { IconBell, IconUsers, IconCalendar, IconChart, IconBook, IconUser, IconGraduation } from '../../components/icons.jsx';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const firstName = (user?.name || '').split(' ')[0] || 'Teacher';

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        {/* Header hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-slate-950 p-8 text-white sm:p-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-700/40 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brass-500/15 blur-2xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-300 ring-1 ring-white/15">
                <IconGraduation className="h-4 w-4" /> Faculty Workspace
              </span>
              <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome, {firstName}</h1>
              <p className="mt-2 max-w-lg text-sm text-brand-100/80">
                Central workstation for recording daily attendance, grading and tracking class metrics.
              </p>
            </div>
            <div className="self-start sm:self-center">
              <Badge tone="emerald">Faculty access level</Badge>
            </div>
          </div>
        </div>

        {/* Management tools */}
        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Core management tools</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <IconBell className="h-5 w-5" />, tint: 'bg-amber-50 text-amber-600', title: 'Official Notices', body: 'Timeline feed of school bulletins and staff circulars.', to: '/t/notices' },
              { icon: <IconUsers className="h-5 w-5" />, tint: 'bg-sky-50 text-sky-600', title: 'Roster & Profiles', body: 'Directory with parent contacts, academic records and accommodations.', to: '/t/roster' },
              { icon: <IconCalendar className="h-5 w-5" />, tint: 'bg-emerald-50 text-emerald-600', title: 'Attendance Tracker', body: 'Daily check-in interfaces with chronic absenteeism alerts.', to: '/t/attendance' },
              { icon: <IconChart className="h-5 w-5" />, tint: 'bg-amber-50 text-amber-600', title: 'Attendance Analytics', body: 'Cumulative percentage scoring computed from class logs.', to: '/t/analytics' },
              { icon: <IconBook className="h-5 w-5" />, tint: 'bg-violet-50 text-violet-600', title: 'Grading Terminal', body: 'Gradebook across class, subject and term dropdowns.', to: '/t/gradebook' },
              { icon: <IconUser className="h-5 w-5" />, tint: 'bg-brand-50 text-brand-600', title: 'Student Enrollment', body: 'Create and provision new student profiles and rolls.', to: '/t/users/create' },
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
                  Open {c.title.split(' ')[0].toLowerCase()} <span aria-hidden="true">→</span>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default TeacherDashboard;