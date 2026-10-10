// src/pages/TeacherAnalytics.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { PageContainer, Card, Badge, Spinner, MessageBanner } from '../../components/ui.jsx';
import { IconBack, IconChart, IconCalendar } from '../../components/icons.jsx';

const TeacherAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComputedAnalytics = async () => {
      try {
        const classRes = await api.get('/teacher/my-class');
        const targetClass = classRes.data.classTeacherOf;
        setAssignedClass(targetClass);

        const { data } = await api.get(`/teacher/attendance-analytics/${targetClass}`);
        setAnalyticsData(data.data);
        setCurrentYear(data.year);

        // Raw daily sheets for the same class (best-effort; table still renders without it)
        try {
          const historyRes = await api.get(`/attendance/${encodeURIComponent(targetClass)}`);
          if (historyRes.data.success) setAttendanceHistory(historyRes.data.data || []);
        } catch {
          console.log('No raw attendance history available.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'No active tracking entries found for your assigned class yet.');
      } finally {
        setLoading(false);
      }
    };
    fetchComputedAnalytics();
  }, []);

  const countStatus = (records, status) => (records || []).filter((r) => r.status === status).length;

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  const pctTone = (p) => (p >= 85 ? 'emerald' : p >= 75 ? 'amber' : 'rose');

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        <div>
          <Link to="/t/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
            <IconBack className="h-4 w-4" /> Return to dashboard
          </Link>
        </div>

        <Card className="p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-display flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900">
                <IconChart className="h-6 w-6 text-brand-500" /> Attendance analytics
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Computed metrics and cumulative attendance rates for academic year{' '}
                <span className="font-bold text-brand-600">{currentYear}</span>.
              </p>
            </div>
            <Badge tone="emerald" className="self-start sm:self-center">Class group: {assignedClass || 'None'}</Badge>
          </div>

          <MessageBanner message={error ? { text: error, type: 'error' } : null} />

          {!error && (
            <div className="scrollbar-thin overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Roll</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4 text-center">Sessions</th>
                    <th className="px-6 py-4 text-center text-emerald-600">Present</th>
                    <th className="px-6 py-4 text-center text-amber-600">Late</th>
                    <th className="px-6 py-4 text-center text-rose-600">Absent</th>
                    <th className="px-6 py-4 text-right">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {analyticsData.map((student) => (
                    <tr key={student._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-brand-600">
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
        </Card>

        <Card className="p-6">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <IconCalendar className="h-5 w-5 text-brand-500" /> Daily attendance sheets
            </h2>
            <p className="mt-1 text-sm text-slate-500">Historical daily submission logs recorded for this class section.</p>
          </div>

          {attendanceHistory.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-500">
              No daily attendance sheets have been submitted for this class yet.
            </div>
          ) : (
            <div className="scrollbar-thin overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-center text-emerald-600">Present</th>
                    <th className="px-6 py-3 text-center text-amber-600">Late</th>
                    <th className="px-6 py-3 text-center text-rose-600">Absent</th>
                    <th className="px-6 py-3 text-right">Total logged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {attendanceHistory.map((sheet) => (
                    <tr key={sheet._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-3 font-mono text-xs font-bold text-slate-700">
                        {sheet.date ? new Date(sheet.date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-3 text-center font-mono font-bold text-emerald-600">{countStatus(sheet.records, 'Present')}</td>
                      <td className="px-6 py-3 text-center font-mono font-bold text-amber-500">{countStatus(sheet.records, 'Late')}</td>
                      <td className="px-6 py-3 text-center font-mono font-bold text-rose-500">{countStatus(sheet.records, 'Absent')}</td>
                      <td className="px-6 py-3 text-right font-mono text-slate-500">{(sheet.records || []).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default TeacherAnalytics;
