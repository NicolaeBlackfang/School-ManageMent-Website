// src/pages/TeacherAnalytics.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { PageContainer, Card, Badge, Spinner, MessageBanner, StatCard, inputClass, labelClass } from '../../components/ui.jsx';
import { IconBack, IconChart, IconCalendar, IconCheckCircle, IconAlert, IconUsers } from '../../components/icons.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';

const countStatus = (records, status) => (records || []).filter((r) => r.status === status).length;
const pctTone = (p) => (p >= 85 ? 'emerald' : p >= 75 ? 'amber' : 'rose');
const barTone = (p) => (p >= 85 ? 'bg-emerald-500' : p >= 75 ? 'bg-amber-500' : 'bg-rose-500');

const TeacherAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [classTeacherClasses, setClassTeacherClasses] = useState([]);
  const [currentYear, setCurrentYear] = useState('');
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const studentPagination = usePagination(analyticsData, 10);
  const historyPagination = usePagination(attendanceHistory, 10);

  const fetchForClass = async (targetClass) => {
    setLoading(true);
    setError('');
    setAssignedClass(targetClass);

    try {
      const { data } = await api.get(`/teacher/attendance-analytics/${targetClass}`);
      setAnalyticsData(data.data);
      setCurrentYear(data.year);

      // Raw daily sheets for the same class (best-effort; table still renders without it)
      try {
        const historyRes = await api.get(`/attendance/${encodeURIComponent(targetClass)}`);
        if (historyRes.data.success) setAttendanceHistory(historyRes.data.data || []);
      } catch {
        setAttendanceHistory([]);
      }
    } catch (err) {
      setAnalyticsData([]);
      setAttendanceHistory([]);
      setError(err.response?.data?.message || 'No active tracking entries found for your assigned class yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const classRes = await api.get('/teacher/my-class');
        setClassTeacherClasses(classRes.data.classTeacherClasses || []);
        await fetchForClass(classRes.data.classTeacherOf);
      } catch (err) {
        setError(err.response?.data?.message || 'No active tracking entries found for your assigned class yet.');
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  // Rolled-up class metrics for the summary cards and distribution bar.
  const totalPresent = analyticsData.reduce((n, s) => n + (s.presentCount || 0), 0);
  const totalLate = analyticsData.reduce((n, s) => n + (s.lateCount || 0), 0);
  const totalAbsent = analyticsData.reduce((n, s) => n + (s.absentCount || 0), 0);
  const totalMarks = totalPresent + totalLate + totalAbsent || 1;
  const classAverage = analyticsData.length
    ? Math.round(analyticsData.reduce((n, s) => n + (Number(s.attendancePercentage) || 0), 0) / analyticsData.length)
    : 0;
  const sessionsLogged = analyticsData.reduce((m, s) => Math.max(m, s.totalSessions || 0), 0);
  const presentPct = Math.round((totalPresent / totalMarks) * 100);
  const latePct = Math.round((totalLate / totalMarks) * 100);
  const absentPct = Math.max(0, 100 - presentPct - latePct);

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        <div>
          <Link to="/t/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
            <IconBack className="h-4 w-4" /> Return to dashboard
          </Link>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900">
              <IconChart className="h-6 w-6 text-brand-500" /> Attendance analytics
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Computed metrics and cumulative attendance rates for academic year{' '}
              <span className="font-bold text-brand-600">{currentYear || '—'}</span>.
            </p>
          </div>
          {classTeacherClasses.length > 1 ? (
            <div className="w-full max-w-xs self-start sm:self-center">
              <label className={labelClass}>Active class</label>
              <select value={assignedClass} onChange={(e) => fetchForClass(e.target.value)} className={`${inputClass} font-semibold`}>
                {classTeacherClasses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          ) : (
            <Badge tone="emerald" className="self-start sm:self-center">Class group: {assignedClass || 'None'}</Badge>
          )}
        </div>

        <MessageBanner message={error ? { text: error, type: 'error' } : null} />

        {!error && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Class average" value={`${classAverage}%`} sub="Mean attendance rate" tone="indigo" icon={<IconChart className="h-5 w-5" />} />
              <StatCard label="Sessions logged" value={sessionsLogged} sub="Attendance sheets recorded" tone="sky" icon={<IconCalendar className="h-5 w-5" />} />
              <StatCard label="Total present" value={totalPresent} sub={`${presentPct}% of all marks`} tone="emerald" icon={<IconCheckCircle className="h-5 w-5" />} />
              <StatCard label="Total absent" value={totalAbsent} sub={`${absentPct}% of all marks`} tone="rose" icon={<IconAlert className="h-5 w-5" />} />
            </div>

            {/* Distribution bar */}
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                  <IconUsers className="h-4 w-4" /> Overall status distribution
                </h2>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Present {presentPct}%</span>
                  <span className="flex items-center gap-1.5 text-amber-600"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Late {latePct}%</span>
                  <span className="flex items-center gap-1.5 text-rose-600"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Absent {absentPct}%</span>
                </div>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="bg-emerald-500 transition-all" style={{ width: `${presentPct}%` }} />
                <div className="bg-amber-500 transition-all" style={{ width: `${latePct}%` }} />
                <div className="bg-rose-500 transition-all" style={{ width: `${absentPct}%` }} />
              </div>
            </Card>

            {/* Student metrics */}
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Per-student attendance</h2>
              </div>
              {analyticsData.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">No attendance records have been computed for this class yet.</div>
              ) : (
                <>
                  <div className="scrollbar-thin overflow-x-auto">
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
                        {studentPagination.pageItems.map((student) => (
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
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-slate-100 sm:block">
                                  <div className={`h-full ${barTone(student.attendancePercentage)}`} style={{ width: `${Math.min(100, Number(student.attendancePercentage) || 0)}%` }} />
                                </div>
                                <Badge tone={pctTone(student.attendancePercentage)} className="font-mono">
                                  {student.attendancePercentage}%
                                </Badge>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination {...studentPagination} itemLabel="students" />
                </>
              )}
            </Card>

            {/* Daily sheets */}
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                  <IconCalendar className="h-4 w-4" /> Daily attendance sheets
                </h2>
              </div>
              {attendanceHistory.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">No daily attendance sheets have been submitted for this class yet.</div>
              ) : (
                <>
                  <div className="scrollbar-thin overflow-x-auto">
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
                        {historyPagination.pageItems.map((sheet) => (
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
                  <Pagination {...historyPagination} itemLabel="sheets" />
                </>
              )}
            </Card>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default TeacherAnalytics;
