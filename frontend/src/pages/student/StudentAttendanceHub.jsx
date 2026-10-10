// src/pages/StudentAttendanceHub.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../../components/ui.jsx';

const StudentAttendanceHub = () => {
  const navigate = useNavigate();
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    personalLogs: {},
    weeklyOffDays: [],
    holidays: [],
    summary: { totalSessions: 0, presentCount: 0, lateCount: 0, absentCount: 0, percentage: 100 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCalendarFeed();
  }, [calendarDate]);

  const fetchMyCalendarFeed = async () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    if (!storedUser || !storedUser.token) {
      setError('Session expired. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
        params: { year: calendarDate.getFullYear(), month: calendarDate.getMonth() + 1 }
      };

      const { data } = await axios.get('http://localhost:5000/api/student/my-attendance-calendar', config);
      if (data.success) {
        setAttendanceData(data);
      }
    } catch (err) {
      setError('Failed to securely parse your analytics logs from cloud streams.');
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
      dayNodes.push(<div key={`blank-${i}`} className="p-4"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const padDay = day < 10 ? `0${day}` : day;
      const padMonth = (month + 1) < 10 ? `0${month + 1}` : month + 1;
      const loopDateStr = `${year}-${padMonth}-${padDay}`;

      const dayOfWeek = new Date(year, month, day).getDay();
      const isWeekend = attendanceData.weeklyOffDays.includes(dayOfWeek);
      const isHoliday = attendanceData.holidays.includes(loopDateStr);
      const logStatus = attendanceData.personalLogs[loopDateStr];

      let cellStyle = "border-slate-100 bg-white text-slate-800";
      let statusLabel = "";

      if (isWeekend) {
        cellStyle = "cursor-not-allowed border-slate-200 bg-slate-100/80 text-slate-400 border-dashed";
        statusLabel = "Weekly Off";
      } else if (isHoliday) {
        cellStyle = "border-amber-200 bg-amber-50 font-bold text-amber-600";
        statusLabel = "Holiday";
      } else if (logStatus) {
        if (logStatus === 'Present') {
          cellStyle = "border-emerald-200 bg-emerald-50 font-extrabold text-emerald-800 shadow-xs";
          statusLabel = "Present";
        } else if (logStatus === 'Late') {
          cellStyle = "border-amber-200 bg-amber-50 font-extrabold text-amber-800";
          statusLabel = "Late";
        } else if (logStatus === 'Absent') {
          cellStyle = "border-rose-200 bg-rose-50 font-extrabold text-rose-800";
          statusLabel = "Absent 🚨";
        } else if (logStatus === 'Excused') {
          cellStyle = "border-sky-200 bg-sky-50 font-extrabold text-sky-800";
          statusLabel = "Excused";
        }
      } else {
        cellStyle = "border-slate-100 bg-slate-50 italic text-slate-300";
        statusLabel = "No Session";
      }

      dayNodes.push(
        <div key={day} className={`flex min-h-[70px] flex-col items-start justify-between rounded-2xl border p-3 transition-all ${cellStyle}`}>
          <span className="font-mono text-sm font-black">{day}</span>
          {statusLabel && <span className="mt-1 block font-sans text-[8px] font-black uppercase tracking-tight">{statusLabel}</span>}
        </div>
      );
    }
    return dayNodes;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">

      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <button onClick={() => navigate('/student/dashboard')} className="mb-2 block cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900">← Back to Hub</button>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">📈 My Attendance Log Calendar</h1>
          <p className="mt-0.5 text-xs text-slate-400">Track your daily class status entries, monthly summaries, and leave approvals live.</p>
        </div>

        <div className="flex items-center self-start rounded-xl bg-slate-100 p-1.5 font-mono text-xs font-bold sm:self-center">
          <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() - 1)))} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-xs transition hover:bg-slate-50">◀</button>
          <span className="min-w-[100px] px-4 text-center text-slate-700">{calendarDate.toLocaleString('en-BD', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() + 1)))} className="cursor-pointer rounded-lg bg-white px-2 py-1 shadow-xs transition hover:bg-slate-50">▶</button>
        </div>
      </div>

      {error && <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 font-semibold text-rose-700">⚠️ {error}</div>}

      {/* AUTOMATED STATS SUMMARY STRIP LAYER */}
      {attendanceData.summary && (
        <div className="grid grid-cols-2 gap-3 font-medium md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Total Tracked</span>
            <h4 className="mt-0.5 font-mono text-xl font-black text-slate-900">{attendanceData.summary.totalSessions} Days</h4>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="block text-[9px] font-black uppercase tracking-wider text-emerald-600">Present</span>
            <h4 className="mt-0.5 font-mono text-xl font-black text-emerald-700">{attendanceData.summary.presentCount} Days</h4>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="block text-[9px] font-black uppercase tracking-wider text-amber-600">Late Arrivals</span>
            <h4 className="mt-0.5 font-mono text-xl font-black text-amber-700">{attendanceData.summary.lateCount} Days</h4>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs">
            <span className="block text-[9px] font-black uppercase tracking-wider text-rose-600">Absences</span>
            <h4 className="mt-0.5 font-mono text-xl font-black text-rose-700">{attendanceData.summary.absentCount} Days</h4>
          </div>

          <div className={`col-span-2 flex flex-col justify-between rounded-2xl border p-3 shadow-xs md:col-span-1 ${
            attendanceData.summary.percentage >= 75 ? 'border-sky-100 bg-sky-50 text-sky-800' : 'animate-pulse border-rose-200 bg-rose-50 text-rose-700'
          }`}>
            <span className="block text-[9px] font-black uppercase tracking-wider opacity-60">Compliance Rate</span>
            <div className="mt-0.5 flex items-baseline justify-between gap-1">
              <h4 className="font-mono text-xl font-black">{attendanceData.summary.percentage}%</h4>
              <span className="text-[8px] font-black uppercase tracking-tight">{attendanceData.summary.percentage >= 75 ? '✔ Regular' : '⚠️ Low'}</span>
            </div>
          </div>
        </div>
      )}

      {/* THE MULTI-COLOR ATTENDANCE MATRIX LAYER GRID */}
      <div className="relative space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        {loading && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[2px]"><Spinner className="h-8 w-8" /></div>}

        <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-2 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => <div key={day} className="hidden sm:block">{day}</div>)}
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day} className="sm:hidden">{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {generateCalendarDays()}
        </div>

        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-4 font-sans text-[10px] font-black uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-emerald-600 bg-emerald-500"></span> Present Day</span>
          <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-amber-500 bg-amber-400"></span> Late Arrival</span>
          <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-rose-600 bg-rose-500"></span> Absent Failure</span>
          <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-sky-600 bg-sky-500"></span> Excused Leave</span>
          <span className="flex items-center gap-1.5"><span className="block h-3 w-3 rounded-md border border-dashed bg-slate-100"></span> Weekend / Off</span>
        </div>
      </div>

    </div>
  );
};

export default StudentAttendanceHub;