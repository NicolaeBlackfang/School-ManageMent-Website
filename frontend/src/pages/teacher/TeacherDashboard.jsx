// src/pages/TeacherDashboard.jsx
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  // Stats cards to present a high-end application shell interface
  const stats = [
    { name: 'Total Assigned Students', count: '28', icon: '👨‍🎓', color: 'bg-blue-600' },
    { name: 'Today Attendance Sync', count: '100%', icon: '📅', color: 'bg-emerald-600' },
    { name: 'Flags / Chronic Alerts', count: '1', icon: '⚠️', color: 'bg-amber-600' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Hero Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">🍏 Faculty Workspace</h1>
            <p className="text-sm text-gray-500 mt-1">Central workstation for recording daily student matrices and tracking metrics.</p>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-lg border border-emerald-200 font-bold self-start sm:self-center">
            Faculty Access Level 🔑
          </span>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.name}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.count}</h3>
              </div>
              <div className={`h-12 w-12 rounded-xl text-xl flex items-center justify-center text-white ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Management Workspace Grid Grid */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Core Management Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 🟢 NEW ACTIVE MODULE CARD: Standalone Faculty Notice Board Port Access Trigger */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-amber-50 text-xl rounded-xl flex items-center justify-center">📢</div>
                <h3 className="text-lg font-bold text-gray-900">Official Notices</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Access the centralized institutional notice timeline feed to audit general school bulletins and download private staff circular PDFs.</p>
              </div>
              <Link to="/teacher/notices" className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors block">Open Bulletin Board</Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-blue-50 text-xl rounded-xl flex items-center justify-center">👥</div>
                <h3 className="text-lg font-bold text-gray-900">Roster & Profiles</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Access centralized directories with emergency contacts, academic records, and accommodation files.</p>
              </div>
              <Link to="/teacher/roster" className="text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">
                Open Directory
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-emerald-50 text-xl rounded-xl flex items-center justify-center">📊</div>
                <h3 className="text-lg font-bold text-gray-900">Attendance Tracker</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Fast daily or period-by-period check-in interfaces with automatic alerts for chronic absenteeism.</p>
              </div>
              <Link to="/teacher/attendance" className="text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">
                Launch Tracker
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-amber-50 text-xl rounded-xl flex items-center justify-center">📈</div>
                <h3 className="text-lg font-bold text-gray-900">Attendance Analytics</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Review automatic cumulative percentage scoring models computed straight out of Atlas data sets.</p>
              </div>
              <Link to="/teacher/analytics" className="text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">
                Open Percentage Sheet
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
              <div className="space-y-2">
                <div className="h-10 w-10 bg-purple-50 text-xl rounded-xl flex items-center justify-center">📐</div>
                <h3 className="text-lg font-bold text-gray-900">Grading Terminal</h3>
                <p className="text-sm text-gray-500 leading-relaxed"> Roster numbers and grades across dynamic cross-joining class criteria dropdowns.</p>
              </div>
              <Link to="/teacher/gradebook" className="text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm block">
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
