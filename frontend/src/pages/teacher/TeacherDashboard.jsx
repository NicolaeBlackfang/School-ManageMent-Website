// src/pages/TeacherDashboard.jsx
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/ui.jsx';

const TeacherDashboard = () => {
  // Stats cards to present a high-end application shell interface
  const stats = [
    { name: 'Total Assigned Students', count: '28', icon: '👨‍🎓', tone: 'indigo' },
    { name: 'Today Attendance Sync', count: '100%', icon: '📅', tone: 'emerald' },
    { name: 'Flags / Chronic Alerts', count: '1', icon: '⚠️', tone: 'amber' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header Hero Panel */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">🍏 Faculty Workspace</h1>
            <p className="mt-1 text-sm text-slate-500">Central workstation for recording daily student matrices and tracking metrics.</p>
          </div>
          <span className="self-start rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:self-center">
            Faculty Access Level 🔑
          </span>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.name}
              value={stat.count}
              icon={<span className="text-lg">{stat.icon}</span>}
              tone={stat.tone}
            />
          ))}
        </div>

        {/* Feature Management Workspace Grid */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Core Management Tools</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl ring-1 ring-amber-100">📢</div>
                <h3 className="text-lg font-bold text-slate-900">Official Notices</h3>
                <p className="text-sm leading-relaxed text-slate-500">Access the centralized institutional notice timeline feed to audit general school bulletins and download private staff circular PDFs.</p>
              </div>
              <Link to="/teacher/notices" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">Open Bulletin Board</Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-xl ring-1 ring-sky-100">👥</div>
                <h3 className="text-lg font-bold text-slate-900">Roster & Profiles</h3>
                <p className="text-sm leading-relaxed text-slate-500">Access centralized directories with emergency contacts, academic records, and accommodation files.</p>
              </div>
              <Link to="/teacher/roster" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                Open Directory
              </Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl ring-1 ring-emerald-100">📊</div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Tracker</h3>
                <p className="text-sm leading-relaxed text-slate-500">Fast daily or period-by-period check-in interfaces with automatic alerts for chronic absenteeism.</p>
              </div>
              <Link to="/teacher/attendance" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                Launch Tracker
              </Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl ring-1 ring-amber-100">📈</div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Analytics</h3>
                <p className="text-sm leading-relaxed text-slate-500">Review automatic cumulative percentage scoring models computed straight out of Atlas data sets.</p>
              </div>
              <Link to="/teacher/analytics" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                Open Percentage Sheet
              </Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl ring-1 ring-violet-100">📐</div>
                <h3 className="text-lg font-bold text-slate-900">Grading Terminal</h3>
                <p className="text-sm leading-relaxed text-slate-500">Roster numbers and grades across dynamic cross-joining class criteria dropdowns.</p>
              </div>
              <Link to="/teacher/gradebook" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                Open Gradebook
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;