// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    { label: 'Total Registered Students', count: stats.registeredStudents, color: 'bg-blue-600', text: 'text-gray-900', icon: '👨‍🎓' },
    { label: 'Active Teachers', count: stats.activeTeachers, color: 'bg-emerald-600', text: 'text-gray-900', icon: '👩‍🏫' },
    { label: 'Active Notices Published', count: stats.noticesPublished, color: 'bg-amber-600', text: 'text-gray-900', icon: '📢' },
    { label: 'Pending System Tasks', count: stats.pendingTasks, color: stats.pendingTasks > 0 ? 'bg-rose-600 animate-pulse' : 'bg-gray-400', text: stats.pendingTasks > 0 ? 'text-rose-700' : 'text-gray-900', icon: '⚠️' }
  ];

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 1. Header Hero Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">🎛️ Administrative Terminal</h1>
            <p className="text-sm text-gray-500 mt-1">Central command hub for monitoring school statistics and managing portal systems synchronized natively across MongoDB Atlas cloud clusters.</p>
          </div>
          <span className="bg-amber-50 text-amber-800 text-xs px-3 py-1.5 rounded-lg border border-amber-200 font-bold self-start sm:self-center">
            Super Admin Account 🔑
          </span>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold">
            {error}
          </div>
        )}

        {/* 2. Overview Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricsGrid.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <h3 className={`text-3xl font-black mt-1 font-mono ${stat.text}`}>{stat.count}</h3>
              </div>
              <div className={`h-12 w-12 rounded-xl text-xl flex items-center justify-center text-white ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Core Feature Management Workspace Dashboard */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Active Management Modules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Module 1: Notice Board Operations */}
            {/* 🟢 FIXED ACTIVE MODULE: Upgraded Notice Board Card Module with PDF upload description context */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-amber-50 text-xl rounded-xl flex items-center justify-center">📢</div>
                <h3 className="text-lg font-bold text-gray-900">Broadcast Bulletins</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Broadcast announcements, news alerts, or urgent warnings straight onto parent and student timeline panels instantly with support for official PDF circular attachments.
                </p>
              </div>
              <Link to="/admin/notices" className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">Open Notice Board</Link>
            </div>

            {/* Module 2: User Control Roster Matrix */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-blue-50 text-xl rounded-xl flex items-center justify-center">👥</div>
                <h3 className="text-lg font-bold text-gray-900">User Control Matrix</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Audit faculty profiles, perform roll shifts, delete accounts, or re-route metadata across dynamic collection parameters.</p>
              </div>
              <Link to="/admin/users" className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">
                Configure Roster Settings
              </Link>
            </div>

            {/* Module 3: Finance & Fee Portal (Placeholder) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 opacity-75 border-dashed border-2">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-slate-50 text-xl rounded-xl flex items-center justify-center">💳</div>
                <h3 className="text-lg font-bold text-gray-700">Finance & Fee Portal</h3>
                <p className="text-sm text-gray-400 leading-relaxed">System terminal placeholder ready to integrate invoice generation mechanics or stripe verification tools.</p>
              </div>
              <button disabled className="w-full py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-xl cursor-not-allowed">
                Module Deactivated
              </button>
            </div>

            {/* Module 4: Global School Configurations Control Panel */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-purple-50 text-xl rounded-xl flex items-center justify-center">⚙️</div>
                <h3 className="text-lg font-bold text-gray-900">Institution Settings</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Dynamically manage active class section names and course subject structures globally across all portal dropdown matrices.
                </p>
              </div>
              <Link
                to="/admin/settings"
                className="w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block"
              >
                Configure School Layout
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;