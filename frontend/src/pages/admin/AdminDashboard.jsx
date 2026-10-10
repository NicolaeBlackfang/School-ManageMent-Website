// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StatCard, Spinner } from '../../components/ui.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    registeredStudents: 0,
    activeTeachers: 0,
    noticesPublished: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) {
        setError('Unauthorized context session drop.');
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        // Query real-time aggregator count endpoint
        const { data } = await axios.get('http://localhost:5000/api/auth/dashboard-stats', config);
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to parse database indicators stream.');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMetrics();
  }, []);

  // Structural cards mapping list for dynamic metrics with color-coded styles
  const metricsGrid = [
    { label: 'Total Registered Students', count: stats.registeredStudents, tone: 'indigo', icon: '👨‍🎓' },
    { label: 'Active Teachers', count: stats.activeTeachers, tone: 'emerald', icon: '👩‍🏫' },
    { label: 'Active Notices Published', count: stats.noticesPublished, tone: 'amber', icon: '📢' },
    { label: 'Pending System Tasks', count: stats.pendingTasks, tone: stats.pendingTasks > 0 ? 'rose' : 'slate', icon: '⚠️' }
  ];

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* 1. Header Hero Panel */}
<div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">🎛️ Administrative Terminal</h1>
              <p className="mt-1 text-sm text-slate-500">Central command hub for monitoring school statistics and managing portal systems synchronized natively across MongoDB Atlas cloud clusters.</p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-center">
              <Link to="/admin/users/create" className="rounded-xl bg-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-700">
                ➕ Create User
              </Link>
              <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                Super Admin Account 🔑
              </span>
            </div>
          </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        {/* 2. Overview Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricsGrid.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.count}
              icon={<span className="text-lg">{stat.icon}</span>}
              tone={stat.tone}
            />
          ))}
        </div>

        {/* 3. Core Feature Management Workspace Dashboard */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Active Management Modules</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl ring-1 ring-amber-100">📢</div>
                <h3 className="text-lg font-bold text-slate-900">Broadcast Bulletins</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Broadcast announcements, news alerts, or urgent warnings straight onto parent and student timeline panels instantly with support for official PDF circular attachments.
                </p>
              </div>
              <Link to="/admin/notices" className="block w-full rounded-xl bg-brand-600 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">Open Notice Board</Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-xl ring-1 ring-sky-100">👥</div>
                <h3 className="text-lg font-bold text-slate-900">User Control Matrix</h3>
                <p className="text-sm leading-relaxed text-slate-500">Audit faculty profiles, perform roll shifts, delete accounts, or re-route metadata across dynamic collection parameters.</p>
              </div>
              <Link to="/admin/users" className="block w-full rounded-xl bg-brand-600 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                Configure Roster Settings
              </Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl ring-1 ring-violet-100">🌐</div>
                <h3 className="text-lg font-bold text-slate-900">Manage Website landing</h3>
                <p className="text-sm leading-relaxed text-slate-500">Modify welcome text headers, update school logo branding properties, or change showcase hero gallery banners live on Cloudinary.</p>
              </div>
              <Link to="/admin/website" className="block w-full rounded-xl bg-brand-600 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">Open Layout Manager</Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl ring-1 ring-violet-100">⚙️</div>
                <h3 className="text-lg font-bold text-slate-900">Institution Settings</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Dynamically manage active class section names and course subject structures globally across all portal dropdown matrices.
                </p>
              </div>
              <Link
                to="/admin/settings"
                className="block w-full rounded-xl bg-brand-600 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700"
              >
                Configure School Layout
              </Link>
            </div>

            <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl ring-1 ring-amber-100">👩‍🎓</div>
                <h3 className="text-lg font-bold text-slate-900">Application Approvals</h3>
                <p className="text-sm leading-relaxed text-slate-500">Audit pending online admission forms registers, execute authorization passes, trigger email notifications, and explore the approved archive registries.</p>
              </div>
              <Link to="/admin/approvals" className="block w-full rounded-xl bg-brand-600 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">Open Approval Desk</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;