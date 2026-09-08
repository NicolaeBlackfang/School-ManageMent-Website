// src/pages/TeacherAnalytics.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherAnalytics = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComputedAnalytics = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

        // 1. Fetch teacher parameters to discover class name dynamically
        const classRes = await axios.get('http://localhost:5000/api/teacher/my-class', config);
        const targetClass = classRes.data.classTeacherOf;
        setAssignedClass(targetClass);

        // 2. Fetch fully computed analytics records using our high-performance pipeline
        const { data } = await axios.get(`http://localhost:5000/api/teacher/attendance-analytics/${targetClass}`, config);
        setAnalyticsData(data.data);
        setCurrentYear(data.year);
      } catch (err) {
        setError(err.response?.data?.message || 'No active tracking entries found for your assigned class yet.');
      } finally {
        setLoading(false);
      }
    };
    fetchComputedAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
      <button onClick={() => navigate('/teacher/dashboard')} className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs transition-colors cursor-pointer">
        ← Return to Dashboard
      </button>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">📈 Attendance Analytics Matrix</h1>
            <p className="text-xs text-gray-400 mt-0.5">Fully computed metrics and cumulative attendance rates for Academic Year: <span className="font-bold text-blue-600">{currentYear}</span></p>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-lg border border-emerald-200 font-bold self-start">
            Class Group: {assignedClass || 'None'}
          </span>
        </div>

        {error ? (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-200 font-medium">
            ⚠️ {error}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Class Roll</th>
                  <th className="px-6 py-4">Student Identity</th>
                  <th className="px-6 py-4 text-center">Total Sheets</th>
                  <th className="px-6 py-4 text-center text-emerald-600">Present</th>
                  <th className="px-6 py-4 text-center text-amber-600">Late</th>
                  <th className="px-6 py-4 text-center text-rose-600">Absent</th>
                  <th className="px-6 py-4 text-right">Yearly Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                {analyticsData.map(student => (
                  <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                    {/* 🟢 FIXED: Maps computed sequential roll tags directly next to identity name blocks */}
                    <td className="px-6 py-4 font-mono font-black text-blue-600 text-sm">
                      Roll #{student.rollNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900 block">{student.name}</span>
                      <span className="text-xs text-gray-400 font-mono">{student.email}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-medium">{student.totalSessions}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">{student.presentCount}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">{student.lateCount}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-rose-500">{student.absentCount}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black font-mono border ${student.attendancePercentage >= 85 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        student.attendancePercentage >= 75 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-rose-50 text-rose-700 border-rose-200 text-center'
                        }`}>
                        {student.attendancePercentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAnalytics;
