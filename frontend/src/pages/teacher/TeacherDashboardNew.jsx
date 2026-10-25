import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen, BarChart3, Bell, TrendingUp } from 'lucide-react';
import api from '../../core/api';
import { errorMessage } from '../../core/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import FadeIn from '../../components/animations/FadeIn';
import ScaleIn from '../../components/animations/ScaleIn';

const TeacherDashboardNew = () => {
  const [stats, setStats] = useState({
    students: 0,
    assignments: 0,
    attendance: 0,
    notices: 0
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, assignmentsRes, noticesRes] = await Promise.all([
          api.get('/teacher/my-class'),
          api.get('/teacher/my-assignments'),
          api.get('/notices')
        ]);
        setStats({
          students: studentsRes.data.roster?.length || 0,
          assignments: assignmentsRes.data.data?.length || 0,
          attendance: 0,
          notices: noticesRes.data.data?.length || 0
        });
      } catch (error) {
        toast.error(errorMessage(error, 'Dashboard information could not be loaded. Check your connection and refresh.'));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  const statCards = [
    { title: 'My Students', value: stats.students, icon: Users, color: 'from-blue-500 to-cyan-500', delay: 0 },
    { title: 'Assignments', value: stats.assignments, icon: BookOpen, color: 'from-purple-500 to-pink-500', delay: 0.1 },
    { title: 'Attendance', value: stats.attendance, icon: Calendar, color: 'from-green-500 to-emerald-500', delay: 0.2 },
    { title: 'Notices', value: stats.notices, icon: Bell, color: 'from-orange-500 to-red-500', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your class</p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <ScaleIn key={index} delay={card.delay}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full`} />
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {loading ? '...' : card.value}
              </h3>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </motion.div>
          </ScaleIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Take Attendance', path: '/teacher/attendance', color: 'blue' },
                { name: 'Create Assignment', path: '/teacher/assignments', color: 'purple' },
                { name: 'Grade Students', path: '/teacher/gradebook', color: 'green' },
                { name: 'View Roster', path: '/teacher/roster', color: 'orange' },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  className={`w-full text-left p-3 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 transition-all border border-${action.color}-200`}
                >
                  {action.name}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Activity {item}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default TeacherDashboardNew;
