// src/pages/TeacherAnalytics.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Badge } from '../../components/ui.jsx';

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  const pctTone = (p) => (p >= 85 ? 'emerald' : p >= 75 ? 'amber' : 'rose');

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
      <button onClick={() => navigate('/teacher/dashboard')} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900">
        ← Return to Dashboard
      </button>

      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">📈 Attendance Analytics Matrix</h1>
            <p className="mt-0.5 text-xs text-slate-400">Fully computed metrics and cumulative attendance rates for Academic Year: <span className="font-bold text-brand-600">{currentYear}</span></p>
          </div>
          <Badge tone="emerald" className="self-start sm:self-center">Class Group: {assignedClass || 'None'}</Badge>
        </div>

        {error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
            ⚠️ {error}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-xs">
            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
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
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {analyticsData.map(student => (
                  <tr key={student._id} className="transition-colors hover:bg-slate-50/50">
                    {/* 🟢 FIXED: Maps computed sequential roll tags directly next to identity name blocks */}
                    <td className="px-6 py-4 font-mono text-sm font-black text-brand-600">
                      Roll #{student.rollNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="block font-semibold text-slate-900">{student.name}</span>
                      <span className="font-mono text-xs text-slate-400">{student.email}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-medium">{student.totalSessions}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-emerald-600">{student.presentCount}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-amber-500">{student.lateCount}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-rose-500">{student.absentCount}</td>
                    <td className="px-6 py-4 text-right">
                      <Badge tone={pctTone(student.attendancePercentage)} className="font-mono">
                        {student.attendancePercentage}%
                      </Badge>
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