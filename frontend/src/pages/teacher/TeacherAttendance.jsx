// src/pages/TeacherAttendance.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      let cellStyle = "bg-white text-gray-800 border-gray-100 hover:bg-blue-50/50";
      if (isWeekend) cellStyle = "bg-gray-100 text-gray-400 border-dashed cursor-not-allowed";
      if (isHoliday) cellStyle = "bg-amber-100 text-amber-800 border-amber-300 font-black";
      if (isSubmitted && !isWeekend && !isHoliday) cellStyle = "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
      if (isSelected) cellStyle += " ring-2 ring-blue-600 ring-offset-1";

      dayNodes.push(
        <button
          key={day} type="button"
          onClick={() => setSelectedDateStr(loopDateStr)}
          className={`p-2 sm:p-2.5 text-center text-xs rounded-xl border transition-all font-mono font-bold cursor-pointer ${cellStyle}`}
        >
          {day}
          {isSubmitted && !isWeekend && !isHoliday && <span className="block text-[7px] text-emerald-600 font-sans tracking-tighter">Done ✔</span>}
          {isWeekend && <span className="block text-[7px] text-gray-400 font-sans font-normal">Off</span>}
          {isHoliday && <span className="block text-[7px] text-amber-700 font-sans font-normal">Vacation</span>}
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
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
          ⚠️ Faculty Clearance Required: You do not own an assigned class management scope block.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
      
      {/* Repeating Weekly Off-Day Control Manager */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">🛠️ Institution Weekly Off-Days Manager</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Toggle generic repeating off-days column rows across your calendar framework layout.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map(day => {
            const isActive = heatmapData.weeklyOffDays.includes(day.index);
            return (
              <button 
                key={day.index} 
                type="button" 
                onClick={() => handleToggleWeeklyOffDay(day.index)} 
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border cursor-pointer ${isActive ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-500'}`}
              >
                {day.label} {isActive ? '🔒 [Closed]' : '📖 [Open]'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Calendar Column Block */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 h-fit relative">
          {fetchingHeatmap && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl z-10">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-sm font-black text-gray-900 uppercase">📅 Session Calendar</h2>
            <div className="flex gap-1 text-xs">
              <button 
                type="button" 
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} 
                className="p-1 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                ◀
              </button>
              <span className="px-2 py-1 font-bold text-gray-700 min-w-[80px] text-center font-mono">
                {currentDate.toLocaleString('en-BD', { month: 'short', year: 'numeric' })}
              </span>
              <button 
                type="button" 
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} 
                className="p-1 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-gray-400 uppercase">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="py-1">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {generateCalendarDays()}
          </div>

          <div className="pt-3 border-t border-gray-50 text-[10px] font-bold text-gray-400 flex flex-wrap gap-3">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500 border block"></span> Submitted</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-400 border block"></span> Single Holiday</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-gray-100 border block"></span> Weekly Off</span>
          </div>
        </div>

        {/* Ledger Sheet Controls Container */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={() => navigate('/teacher/dashboard')} 
              className="text-xs font-bold text-gray-500 bg-white border px-3 py-1.5 rounded-xl hover:text-gray-900 transition-colors shadow-2xs cursor-pointer"
            >
              ← Dashboard
            </button>
            <button 
              type="button" 
              onClick={handleToggleSingleDayHoliday} 
              className={`px-4 py-1.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentSelectedIsHoliday 
                  ? 'bg-amber-600 text-white border-amber-700' 
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {currentSelectedIsHoliday ? '📖 Re-open Selected Date' : '🔒 Toggle Selected Date as Holiday'}
            </button>
          </div>

          {message.text && (
            <div className={`p-3 rounded-xl text-xs font-bold border ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
              message.type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={saveAttendanceSheet} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">👥 Roster Entry Ledger ({assignedClass})</h2>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">Active Target Date: {selectedDateStr}</p>
              </div>
            </div>

            {currentSelectedIsWeekend || currentSelectedIsHoliday ? (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <p className="font-bold text-sm text-gray-600">
                  {currentSelectedIsWeekend 
                    ? '🔒 This date falls on a recurring Weekly Off-Day.' 
                    : '⛱️ This specific unique calendar date is marked as an institution holiday vacation break.'}
                </p>
                <p className="text-xs">Daily roster data entry processing is deactivated for closed sessions.</p>
              </div>
            ) : loading ? (
              <div className="py-12 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Roll</th>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3 text-center">Set Status Flags</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                      {roster.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-8 text-gray-400">
                            No active student profiles registered under section boundaries yet.
                          </td>
                        </tr>
                      ) : (
                        roster.map(s => (
                          <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 font-mono text-xs font-black text-blue-600">
                              Roll #{s.rollNumber || 'N/A'}
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900">
                              {s.name}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                {['Present', 'Absent', 'Late', 'Excused'].map(statusOption => (
                                  <button
                                    key={statusOption}
                                    type="button"
                                    onClick={() => handleStatusChange(s._id, statusOption)}
                                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                      s.status === statusOption
                                        ? statusOption === 'Present' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                          : statusOption === 'Absent' ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                          : statusOption === 'Late' ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                          : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
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
                  <div className="flex justify-end pt-4 border-t">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer disabled:bg-blue-300"
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