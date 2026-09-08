// src/pages/TeacherAttendance.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchAttendanceRoster = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

        // 🟢 Hits our role-isolated endpoint to grab students matching this specific class teacher assignment
        const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
        setAssignedClass(data.classTeacherOf);

        const initialRoster = data.roster.map(s => ({ ...s, status: 'Present' }));
        setRoster(initialRoster);
      } catch (err) {
        setMessage({ text: err.response?.data?.message || 'Failed to sync class rosters.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchAttendanceRoster();
  }, []);

  const handleStatusChange = (id, nextStatus) => {
    setRoster(prev => prev.map(s => s._id === id ? { ...s, status: nextStatus } : s));
  };

  const saveAttendanceSheet = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    const records = roster.map(s => ({
      studentId: s._id,
      status: s.status
    }));

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      await axios.post('http://localhost:5000/api/teacher/attendance', { date: attendanceDate, records }, config);

      setMessage({ text: '✔ Daily attendance sheet successfully saved to Atlas cloud!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch (err) {
      setMessage({ text: 'Failed to record attendance logs in database cluster.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      <button onClick={() => navigate('/teacher/dashboard')} className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs transition-colors cursor-pointer">
        ← Return to Dashboard
      </button>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
          {message.text}
        </div>
      )}

      {assignedClass ? (
        <form onSubmit={saveAttendanceSheet} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📊 Daily Check-In Roll</h1>
              <p className="text-xs text-gray-400 mt-0.5">Logging tracking parameters for your class: <span className="font-extrabold text-blue-600">{assignedClass}</span></p>
            </div>
            <input
              type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-gray-50 text-gray-900 focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Roll</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4 text-center">Set Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {/* Look inside the table <tbody> map loop inside TeacherAttendance.jsx and update the column: */}
                {roster.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50/50">
                    {/* 🟢 FIXED: Pulls dynamic sequential integers cleanly straight from backend mapping arrays */}
                    <td className="px-6 py-4 font-mono font-black text-blue-600 text-sm">
                      Roll #{s.rollNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{s.name}</td>
                    {/* ... rest of your Present/Absent toggle button structures remain exactly identical ... */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {['Present', 'Absent', 'Late'].map(mode => (
                          <button
                            key={mode} type="button" onClick={() => handleStatusChange(s._id, mode)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${s.status === mode
                                ? mode === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : mode === 'Absent' ? 'bg-rose-50 text-rose-700 border-rose-300'
                                    : 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                              }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer">
              Save Daily Attendance Sheet
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-400 text-sm">
          ⚠️ You are not assigned as a Class Teacher to any active configuration group class layout.
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
