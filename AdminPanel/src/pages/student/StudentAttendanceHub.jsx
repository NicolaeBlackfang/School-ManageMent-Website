// src/pages/student/StudentAttendanceHub.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { PageContainer, Card, Spinner, MessageBanner } from '../../components/ui.jsx';
import { IconCalendar, IconBack } from '../../components/icons.jsx';

const StudentAttendanceHub = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    personalLogs: {},
    weeklyOffDays: [],
    holidays: [],
    summary: { totalSessions: 0, presentCount: 0, lateCount: 0, absentCount: 0, percentage: 100 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCalendarFeed();
  }, [calendarDate.getFullYear(), calendarDate.getMonth()]);

  const shiftMonth = (delta) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + delta, 1));
  };

  const fetchMyCalendarFeed = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/student/my-attendance-calendar', {
        params: { year: calendarDate.getFullYear(), month: calendarDate.getMonth() + 1 },
      });
      if (data.success) setAttendanceData(data);
    } catch {
      setError('Failed to securely parse your attendance logs.');
    } finally {
      setLoading(false);
    }
  };

  const generateCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const dayNodes = [];
    for (let i = 0; i < firstDayIndex; i++) {
      dayNodes.push(<div key={`blank-${i}`} className="p-4" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const padDay = day < 10 ? `0${day}` : day;
      const padMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
      const loopDateStr = `${year}-${padMonth}-${padDay}`;

      const dayOfWeek = new Date(year, month, day).getDay();
      const isWeekend = attendanceData.weeklyOffDays.includes(dayOfWeek);
      const isHoliday = attendanceData.holidays.includes(loopDateStr);
      const logStatus = attendanceData.personalLogs[loopDateStr];

      let cellStyle = 'border-slate-100 bg-white text-slate-800';
      let statusLabel = '';

      if (isWeekend) {
        cellStyle = 'border-slate-200 bg-slate-100/80 text-slate-400 border-dashed';
        statusLabel = 'Weekly Off';
      } else if (isHoliday) {
        cellStyle = 'border-amber-200 bg-amber-50 font-bold text-amber-600';
        statusLabel = 'Holiday';
      } else if (logStatus) {
        if (logStatus === 'Present') {
          cellStyle = 'border-emerald-200 bg-emerald-50 font-bold text-emerald-800';
          statusLabel = 'Present';
        } else if (logStatus === 'Late') {
          cellStyle = 'border-amber-200 bg-amber-50 font-bold text-amber-800';
          statusLabel = 'Late';
        } else if (logStatus === 'Absent') {
          cellStyle = 'border-rose-200 bg-rose-50 font-bold text-rose-800';
          statusLabel = 'Absent';
        } else if (logStatus === 'Excused') {
          cellStyle = 'border-sky-200 bg-sky-50 font-bold text-sky-800';
          statusLabel = 'Excused';
        }
      } else {
        cellStyle = 'border-slate-100 bg-slate-50 italic text-slate-300';
        statusLabel = 'No Session';
      }

      dayNodes.push(
        <div key={day} className={`flex min-h-[70px] flex-col items-start justify-between rounded-2xl border p-3 transition-all ${cellStyle}`}>
          <span className="font-mono text-sm font-bold">{day}</span>
          {statusLabel && <span className="mt-1 text-[8px] font-bold uppercase tracking-tight">{statusLabel}</span>}
        </div>
      );
    }
    return dayNodes;
  };

  const summary = attendanceData.summary || {};

  return (
    <PageContainer className="max-w-5xl">
      <div className="animate-fade-up space-y-6">
        <Link
          to="/s/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <IconBack className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
              <IconCalendar className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Attendance Log Calendar
              </h1>
              <p className="text-sm text-slate-500">Daily status entries, monthly summaries and leave records.</p>
            </div>
          </div>

          <div className="flex items-center self-start rounded-xl bg-slate-100 p-1.5 font-mono text-xs font-bold sm:self-center">
            <button type="button" onClick={() => shiftMonth(-1)} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-sm transition hover:bg-slate-50" aria-label="Previous month">◀</button>
            <span className="min-w-[120px] px-4 text-center text-slate-700">
              {calendarDate.toLocaleString('en-BD', { month: 'long', year: 'numeric' })}
            </span>
            <button type="button" onClick={() => shiftMonth(1)} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-sm transition hover:bg-slate-50" aria-label="Next month">▶</button>
          </div>
        </div>

        {error && <MessageBanner message={{ text: error, type: 'error' }} />}

        {summary && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Tracked</span>
              <p className="font-display mt-1 text-xl font-semibold text-slate-900">{summary.totalSessions} Days</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">Present</span>
              <p className="font-display mt-1 text-xl font-semibold text-emerald-700">{summary.presentCount} Days</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-600">Late Arrivals</span>
              <p className="font-display mt-1 text-xl font-semibold text-amber-700">{summary.lateCount} Days</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-rose-600">Absences</span>
              <p className="font-display mt-1 text-xl font-semibold text-rose-700">{summary.absentCount} Days</p>
            </div>
            <div className={`col-span-2 flex flex-col justify-between rounded-2xl border p-4 shadow-sm md:col-span-1 ${
              summary.percentage >= 75 ? 'border-sky-100 bg-sky-50 text-sky-800' : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">Compliance Rate</span>
              <div className="mt-1 flex items-baseline justify-between gap-1">
                <p className="font-display text-xl font-semibold">{summary.percentage}%</p>
                <span className="text-[9px] font-bold uppercase">{summary.percentage >= 75 ? 'Regular' : 'Low'}</span>
              </div>
            </div>
          </div>
        )}

        <Card className="relative p-6">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[2px]">
              <Spinner className="h-8 w-8" />
            </div>
          )}

          <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 pt-3">{generateCalendarDays()}</div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-emerald-600 bg-emerald-500" /> Present</span>
            <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-amber-500 bg-amber-400" /> Late</span>
            <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-rose-600 bg-rose-500" /> Absent</span>
            <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-sky-600 bg-sky-500" /> Excused</span>
            <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-dashed bg-slate-100" /> Off</span>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StudentAttendanceHub;