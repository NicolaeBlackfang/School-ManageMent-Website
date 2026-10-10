// src/pages/TeacherAttendance.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../../components/ui.jsx';

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchingHeatmap, setFetchingHeatmap] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Custom Calendar Layout States
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [heatmapData, setHeatmapData] = useState({ submittedDates: [], weeklyOffDays: [], holidays: [] });

  const WEEKDAYS = [
    { label: 'Sun', index: 0 }, { label: 'Mon', index: 1 }, { label: 'Tue', index: 2 },
    { label: 'Wed', index: 3 }, { label: 'Thu', index: 4 }, { label: 'Fri', index: 5 }, { label: 'Sat', index: 6 }
  ];

  useEffect(() => {
    fetchInitialClassContext();
  }, []);

  useEffect(() => {
    if (assignedClass) fetchMonthHeatmap();
  }, [assignedClass, currentDate]);

  useEffect(() => {
    if (assignedClass && selectedDateStr) checkAndFetchDailyRoll();
  }, [assignedClass, selectedDateStr]);

  const fetchInitialClassContext = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    if (!storedUser || !storedUser.token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
      setAssignedClass(data.classTeacherOf);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMonthHeatmap = async () => {
    setFetchingHeatmap(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
        params: { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 }
      };
      const { data } = await axios.get(`http://localhost:5000/api/teacher/attendance-calendar-heatmap/${assignedClass}`, config);
      if (data.success) {
        setHeatmapData({
          submittedDates: data.submittedDates || [],
          weeklyOffDays: data.weeklyOffDays || [],
          holidays: data.holidays || []
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetchingHeatmap(false);
    }
  };

  const checkAndFetchDailyRoll = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    const dateObj = new Date(selectedDateStr);
    const isWeekend = heatmapData.weeklyOffDays.includes(dateObj.getDay());
    const isHoliday = heatmapData.holidays.includes(selectedDateStr);

    if (isWeekend || isHoliday) {
      setRoster([]);
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
        params: { date: selectedDateStr }
      };
      const classRes = await axios.get('http://localhost:5000/api/teacher/my-class', config);
      const standardRoster = classRes.data.roster || [];

      const { data } = await axios.get(`http://localhost:5000/api/teacher/attendance-by-date/${assignedClass}`, config);

      if (data.success && data.exists) {
        setRoster(standardRoster.map(student => {
          const matchingRecord = data.records.find(r => r.studentId === student._id);
          return { ...student, status: matchingRecord ? matchingRecord.status : 'Present' };
        }));
        setMessage({ text: `ℹ️ Notice: Attendance records for ${selectedDateStr} are already submitted. Re-saving will overwrite entries.`, type: 'info' });
      } else {
        setRoster(standardRoster.map(s => ({ ...s, status: 'Present' })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWeeklyOffDay = async (dayIndex) => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/config/toggle-offday', { dayIndex }, config);
      if (data.success) {
        setHeatmapData(prev => ({ ...prev, weeklyOffDays: data.weeklyOffDays }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSingleDayHoliday = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/config/toggle-holiday', { dateStr: selectedDateStr }, config);
      if (data.success) {
        setHeatmapData(prev => ({ ...prev, holidays: data.holidays }));
        setMessage({ text: '✔ Holiday parameters adjusted successfully.', type: 'success' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = (id, nextStatus) => {
    setRoster(prev => prev.map(s => s._id === id ? { ...s, status: nextStatus } : s));
  };

  const saveAttendanceSheet = async (e) => {
    e.preventDefault();
    setSaving(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    const records = roster.map(s => ({ studentId: s._id, status: s.status }));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      await axios.post('http://localhost:5000/api/teacher/attendance', { date: selectedDateStr, records }, config);
      setMessage({ text: '🎉 Attendance synchronized successfully!', type: 'success' });
      await fetchMonthHeatmap();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const dayNodes = [];
    for (let i = 0; i < firstDayIndex; i++) {
      dayNodes.push(<div key={`blank-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const padDay = day < 10 ? `0${day}` : day;
      const padMonth = (month + 1) < 10 ? `0${month + 1}` : month + 1;
      const loopDateStr = `${year}-${padMonth}-${padDay}`;

      const dayOfWeek = new Date(year, month, day).getDay();
      const isWeekend = heatmapData.weeklyOffDays.includes(dayOfWeek);
      const isHoliday = heatmapData.holidays.includes(loopDateStr);
      const isSubmitted = heatmapData.submittedDates.includes(loopDateStr);
      const isSelected = selectedDateStr === loopDateStr;

      let cellStyle = "border-slate-200 bg-white text-slate-800 hover:bg-brand-50/50";
      if (isWeekend) cellStyle = "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 border-dashed";
      if (isHoliday) cellStyle = "border-amber-300 bg-amber-100 font-black text-amber-800";
      if (isSubmitted && !isWeekend && !isHoliday) cellStyle = "border-emerald-200 bg-emerald-50 font-bold text-emerald-800";
      if (isSelected) cellStyle += " ring-2 ring-brand-600 ring-offset-1";

      dayNodes.push(
        <button
          key={day} type="button"
          onClick={() => setSelectedDateStr(loopDateStr)}
          className={`cursor-pointer rounded-xl border p-2 text-center font-mono text-xs font-bold transition-all sm:p-2.5 ${cellStyle}`}
        >
          {day}
          {isSubmitted && !isWeekend && !isHoliday && <span className="block font-sans text-[7px] tracking-tighter text-emerald-600">Done ✔</span>}
          {isWeekend && <span className="block font-sans text-[7px] font-normal text-slate-400">Off</span>}
          {isHoliday && <span className="block font-sans text-[7px] font-normal text-amber-700">Vacation</span>}
        </button>
      );
    }
    return dayNodes;
  };

  const currentDayObj = new Date(selectedDateStr);
  const currentSelectedIsWeekend = heatmapData.weeklyOffDays.includes(currentDayObj.getDay());
  const currentSelectedIsHoliday = heatmapData.holidays.includes(selectedDateStr);

  if (!assignedClass) {
    return (
      <div className="mx-auto max-w-4xl p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-400">
          ⚠️ Faculty Clearance Required: You do not own an assigned class management scope block.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">

      {/* Repeating Weekly Off-Day Control Manager */}
      <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">🛠️ Institution Weekly Off-Days Manager</h3>
          <p className="mt-0.5 text-[11px] text-slate-400">Toggle generic repeating off-days column rows across your calendar framework layout.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map(day => {
            const isActive = heatmapData.weeklyOffDays.includes(day.index);
            return (
              <button
                key={day.index}
                type="button"
                onClick={() => handleToggleWeeklyOffDay(day.index)}
                className={`cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}
              >
                {day.label} {isActive ? '🔒 [Closed]' : '📖 [Open]'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

        {/* Calendar Column Block */}
        <div className="relative h-fit space-y-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
          {fetchingHeatmap && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[1px]">
              <Spinner className="h-6 w-6" />
            </div>
          )}

          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm font-black uppercase text-slate-900">📅 Session Calendar</h2>
            <div className="flex gap-1 text-xs">
              <button
                type="button"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="cursor-pointer rounded-lg border p-1 transition hover:bg-slate-50"
              >
                ◀
              </button>
              <span className="min-w-[80px] px-2 py-1 text-center font-mono font-bold text-slate-700">
                {currentDate.toLocaleString('en-BD', { month: 'short', year: 'numeric' })}
              </span>
              <button
                type="button"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="cursor-pointer rounded-lg border p-1 transition hover:bg-slate-50"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-slate-400">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="py-1">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {generateCalendarDays()}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1"><span className="block h-2.5 w-2.5 rounded border bg-emerald-500"></span> Submitted</span>
            <span className="flex items-center gap-1"><span className="block h-2.5 w-2.5 rounded border bg-amber-400"></span> Single Holiday</span>
            <span className="flex items-center gap-1"><span className="block h-2.5 w-2.5 rounded border bg-slate-100"></span> Weekly Off</span>
          </div>
        </div>

        {/* Ledger Sheet Controls Container */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => navigate('/teacher/dashboard')}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
            >
              ← Dashboard
            </button>
            <button
              type="button"
              onClick={handleToggleSingleDayHoliday}
              className={`cursor-pointer rounded-xl border px-4 py-1.5 text-xs font-bold transition-all ${
                currentSelectedIsHoliday
                  ? 'border-amber-700 bg-amber-600 text-white'
                  : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {currentSelectedIsHoliday ? '📖 Re-open Selected Date' : '🔒 Toggle Selected Date as Holiday'}
            </button>
          </div>

          {message.text && (
            <div className={`rounded-xl border p-3 text-xs font-bold ${
              message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' :
              message.type === 'info' ? 'border-sky-200 bg-sky-50 text-sky-800' : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={saveAttendanceSheet} className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">👥 Roster Entry Ledger ({assignedClass})</h2>
                <p className="mt-0.5 font-mono text-xs text-slate-500">Active Target Date: {selectedDateStr}</p>
              </div>
            </div>

            {currentSelectedIsWeekend || currentSelectedIsHoliday ? (
              <div className="space-y-2 py-12 text-center text-slate-400">
                <p className="text-sm font-bold text-slate-600">
                  {currentSelectedIsWeekend
                    ? '🔒 This date falls on a recurring Weekly Off-Day.'
                    : '⛱️ This specific unique calendar date is marked as an institution holiday vacation break.'}
                </p>
                <p className="text-xs">Daily roster data entry processing is deactivated for closed sessions.</p>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner className="h-8 w-8" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Roll</th>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3 text-center">Set Status Flags</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                      {roster.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center text-slate-400">
                            No active student profiles registered under section boundaries yet.
                          </td>
                        </tr>
                      ) : (
                        roster.map(s => (
                          <tr key={s._id} className="transition-colors hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-mono text-xs font-black text-brand-600">
                              Roll #{s.rollNumber || 'N/A'}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-900">
                              {s.name}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                {['Present', 'Absent', 'Late', 'Excused'].map(statusOption => (
                                  <button
                                    key={statusOption}
                                    type="button"
                                    onClick={() => handleStatusChange(s._id, statusOption)}
                                    className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-bold transition-all ${
                                      s.status === statusOption
                                        ? statusOption === 'Present' ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                                          : statusOption === 'Absent' ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                                          : statusOption === 'Late' ? 'border-amber-500 bg-amber-500 text-white shadow-sm'
                                          : 'border-brand-600 bg-brand-600 text-white shadow-sm'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                  >
                                    {statusOption}
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {roster.length > 0 && !loading && !currentSelectedIsWeekend && !currentSelectedIsHoliday && (
                  <div className="flex justify-end border-t pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-brand-700 disabled:bg-brand-300"
                    >
                      {saving ? 'Syncing...' : 'Commit Daily Sheet Entries'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;