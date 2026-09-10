// src/pages/StudentAttendanceHub.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      let cellStyle = "bg-white border-gray-100 text-gray-800";
      let statusLabel = "";

      if (isWeekend) {
        cellStyle = "bg-gray-100/80 border-gray-200 text-gray-400 border-dashed cursor-not-allowed";
        statusLabel = "Weekly Off";
      } else if (isHoliday) {
        cellStyle = "bg-amber-50 text-amber-600 border-amber-200 font-bold";
        statusLabel = "Holiday";
      } else if (logStatus) {
        if (logStatus === 'Present') {
          cellStyle = "bg-emerald-50 border-emerald-200 text-emerald-800 font-extrabold shadow-2xs";
          statusLabel = "Present";
        } else if (logStatus === 'Late') {
          cellStyle = "bg-amber-50 border-amber-200 text-amber-800 font-extrabold";
          statusLabel = "Late";
        } else if (logStatus === 'Absent') {
          cellStyle = "bg-rose-50 border-rose-200 text-rose-800 font-extrabold";
          statusLabel = "Absent 🚨";
        } else if (logStatus === 'Excused') {
          cellStyle = "bg-sky-50 border-blue-200 text-blue-800 font-extrabold";
          statusLabel = "Excused";
        }
      } else {
        cellStyle = "bg-slate-50 border-gray-100 text-gray-300 italic";
        statusLabel = "No Session";
      }

      dayNodes.push(
        <div key={day} className={`p-3 min-h-[70px] rounded-2xl border transition-all flex flex-col justify-between items-start ${cellStyle}`}>
          <span className="font-mono font-black text-sm">{day}</span>
          {statusLabel && <span className="text-[8px] font-sans font-black uppercase tracking-tight block mt-1">{statusLabel}</span>}
        </div>
      );
    }
    return dayNodes;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <button onClick={() => navigate('/student/dashboard')} className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 transition-colors block mb-2 cursor-pointer">← Back to Hub</button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📈 My Attendance Log Calendar</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track your daily class status entries, monthly summaries, and leave approvals live.</p>
        </div>

        <div className="flex items-center bg-gray-100 p-1.5 rounded-xl self-start sm:self-center font-mono font-bold text-xs">
          <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() - 1)))} className="px-2 py-1 bg-white rounded-lg shadow-2xs hover:bg-gray-50 cursor-pointer">◀</button>
          <span className="px-4 text-gray-700 min-w-[100px] text-center">{calendarDate.toLocaleString('en-BD', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() + 1)))} className="px-2 py-1 bg-white rounded-lg shadow-2xs hover:bg-gray-50 cursor-pointer">▶</button>
        </div>
      </div>

      {error && <div className="p-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-2xl font-semibold">⚠️ {error}</div>}

      {/* AUTOMATED STATS SUMMARY STRIP LAYER */}
      {attendanceData.summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-medium">
          <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-2xs">
            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider">Total Tracked</span>
            <h4 className="text-xl font-black text-gray-900 font-mono mt-0.5">{attendanceData.summary.totalSessions} Days</h4>
          </div>
          <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-2xs">
            <span className="block text-[9px] font-black text-emerald-600 uppercase tracking-wider">Present</span>
            <h4 className="text-xl font-black text-emerald-700 font-mono mt-0.5">{attendanceData.summary.presentCount} Days</h4>
          </div>
          <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-2xs">
            <span className="block text-[9px] font-black text-amber-600 uppercase tracking-wider">Late Arrivals</span>
            <h4 className="text-xl font-black text-amber-700 font-mono mt-0.5">{attendanceData.summary.lateCount} Days</h4>
          </div>
          <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-2xs">
            <span className="block text-[9px] font-black text-rose-600 uppercase tracking-wider">Absences</span>
            <h4 className="text-xl font-black text-rose-700 font-mono mt-0.5">{attendanceData.summary.absentCount} Days</h4>
          </div>
          
          <div className={`col-span-2 md:col-span-1 p-3 rounded-2xl border flex flex-col justify-between shadow-2xs ${
            attendanceData.summary.percentage >= 75 ? 'bg-blue-50 border-blue-100 text-blue-800' : 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
          }`}>
            <span className="block text-[9px] font-black uppercase tracking-wider opacity-60">Compliance Rate</span>
            <div className="flex items-baseline justify-between gap-1 mt-0.5">
              <h4 className="text-xl font-black font-mono">{attendanceData.summary.percentage}%</h4>
              <span className="text-[8px] font-black uppercase tracking-tight">{attendanceData.summary.percentage >= 75 ? '✔ Regular' : '⚠️ Low'}</span>
            </div>
          </div>
        </div>
      )}

      {/* THE MULTI-COLOR ATTENDANCE MATRIX LAYER GRID */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 relative">
        {loading && <div className="absolute inset-0 bg-white/60 backdrop-blur-3xs rounded-2xl flex items-center justify-center z-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}

        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-50">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => <div key={day} className="hidden sm:block">{day}</div>)}
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day} className="sm:hidden">{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {generateCalendarDays()}
        </div>

        <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-wider text-gray-400 font-sans">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-md bg-emerald-500 block border border-emerald-600"></span> Present Day</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-md bg-amber-400 block border border-amber-500"></span> Late Arrival</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-md bg-rose-500 block border border-rose-600"></span> Absent Failure</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-md bg-blue-500 block border border-blue-600"></span> Excused Leave</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-md bg-gray-100 block border border-dashed"></span> Weekend / Off</span>
        </div>
      </div>

    </div>
  );
};

export default StudentAttendanceHub;