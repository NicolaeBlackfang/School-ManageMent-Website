// src/pages/AdminEditUser.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tab View Controller (For Students only)
  const [hubTab, setHubTab] = useState('info'); // 'info', 'attendance', 'grades'

  // Profile Data Configuration States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [customId, setCustomId] = useState('');
  const [extra1, setExtra1] = useState(''); // Holds gradeClass for student or department for teacher
  const [extra2, setExtra2] = useState(''); // Holds parentContact for student or qualification for teacher
  const [newPassword, setNewPassword] = useState('');
  const [classTeacherOf, setClassTeacherOf] = useState('None');

  // Global Configuration Dropdown States
  const [globalClasses, setGlobalClasses] = useState([]);

  // Academic History Analytics States
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [academicGrades, setAcademicGrades] = useState([]);

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFullDataMatrix = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) {
        setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        
        // 1. FETCH DYNAMIC GLOBAL SCHOOL CONFIGURATIONS
        const configRes = await axios.get('http://localhost:5000/api/config');
        if (configRes.data.success) {
          setGlobalClasses(configRes.data.data.classes);
        }

        // 2. FETCH TARGETED SINGLE PROFILE DATA OBJECT
        const { data } = await axios.get(`http://localhost:5000/api/auth/users/${id}`, config);
        const profile = data.data;

        setName(profile.name);
        setEmail(profile.email);
        setRole(profile.role);
        setProfileImage(profile.profileImage || '');
        setCustomId(profile.customId || '');
        setExtra1(profile.extraField1 || '');
        setExtra2(profile.extraField2 || '');
        setClassTeacherOf(profile.classTeacherOf || 'None');

        // 3. IF IT'S A STUDENT, PULL CUMULATIVE ACCOUNT METRICS HISTORIES
        if (profile.role === 'student' && profile.extraField1) {
          try {
            // Fetch yearly attendance percentage tracking calculations
            const attnRes = await axios.get(`http://localhost:5000/api/teacher/attendance-analytics/${profile.extraField1}`, config);
            const studentAttn = attnRes.data.data.find(s => s._id === id);
            if (studentAttn) setAttendanceStats(studentAttn);

            // Fetch dynamic report cards data row sets
            const gradesRes = await axios.get(`http://localhost:5000/api/grades/class/${profile.extraField1}/subject/Science/term/Mid-Term Exam`, config);
            const studentGrades = gradesRes.data.data.filter(s => s.studentId === id);
            setAcademicGrades(studentGrades);
          } catch (e) {
            console.log("No metric rows found yet for this record.");
          }
        }

      } catch (err) {
        setMessage({ text: 'Failed to synchronize parameters with cloud servers.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchFullDataMatrix();
  }, [id]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const payload = { 
        customId, 
        extraField1: extra1, 
        extraField2: extra2, 
        classTeacherOf 
      };
      if (newPassword.trim() !== '') payload.password = newPassword;

      await axios.put(`http://localhost:5000/api/auth/users/${id}/credentials`, payload, config);
      setMessage({ text: '✔ Profile configuration successfully updated!', type: 'success' });
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err) {
      setMessage({ text: 'Failed to synchronize updates to Atlas.', type: 'error' });
    } finally { 
      setSaving(false); 
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      <button 
        onClick={() => navigate('/admin/users')} 
        className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        ← Back to Matrix
      </button>

      {/* Tab Selector Header Bar for Student Hub Viewports */}
      {role === 'student' && (
        <div className="flex bg-gray-200/60 p-1 rounded-xl max-w-md">
          {[
            ['info', '👤 Data Settings'], 
            ['attendance', '📈 Attendance Sheets'], 
            ['grades', '📝 Academic History']
          ].map(([tabKey, label]) => (
            <button 
              key={tabKey} 
              onClick={() => setHubTab(tabKey)} 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${hubTab === tabKey ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {hubTab === 'info' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 border-b pb-6 mb-6">
            <img src={profileImage || defaultAvatar} alt="Avatar" className="h-16 w-16 rounded-full object-cover border" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">⚙️ Core Parameters Setup</h1>
              <p className="text-xs text-gray-400 capitalize">
                Designation: <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{role}</span>
              </p>
            </div>
          </div>

          {message.text && (
            <div className={`p-3 rounded-xl text-sm mb-6 ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Username</label>
                <input type="text" disabled value={name} className="block w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" disabled value={email} className="block w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-100 text-gray-400 cursor-not-allowed font-mono text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {role === 'student' ? 'Modify Manual Class Roll' : 'Faculty ID Assignment'}
              </label>
              {role === 'student' ? (
                <select value={customId} onChange={(e) => setCustomId(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {Array.from({ length: 60 }, (_, i) => i + 1).map(num => <option key={num} value={num}>Roll #{num}</option>)}
                </select>
              ) : (
                <input type="text" required value={customId} onChange={(e) => setCustomId(e.target.value)} className="block w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-mono font-bold" />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {role === 'student' ? 'Grade Class Level' : 'Core Department'}
                </label>
                {role === 'student' ? (
                  <select value={extra1} onChange={(e) => setExtra1(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {globalClasses.map((className, idx) => (
                      <option key={idx} value={className}>{className}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" value={extra1} onChange={(e) => setExtra1(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium" />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {role === 'student' ? 'Emergency Parent Phone' : 'Faculty Qualifications'}
                </label>
                <input type="text" value={extra2} onChange={(e) => setExtra2(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium" />
              </div>
            </div>

            {role === 'teacher' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Class Teacher Role</label>
                <select value={classTeacherOf} onChange={(e) => setClassTeacherOf(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium">
                  <option value="None">❌ No Class Assigned</option>
                  {globalClasses.map((className, idx) => (
                    <option key={idx} value={className}>{className}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Override Portal Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave completely blank to preserve current" className="block w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50">
                {saving ? 'Saving Adjustments...' : 'Save Profile Changes'}
              </button>
              <button type="button" onClick={() => navigate('/admin/users')} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Attendance Stats Sub-Tab Viewport */}
      {hubTab === 'attendance' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">📈 Yearly Attendance Percentage Report</h2>
            <p className="text-xs text-gray-400 mt-1">Automatic mathematical breakdown compiled directly out of active checking logging layers.</p>
          </div>

          {attendanceStats ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <span className="block text-xs font-bold text-gray-400 uppercase">Total Sessions</span>
                  <span className="text-xl font-bold text-gray-900">{attendanceStats.totalSessions}</span>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="block text-xs font-bold text-emerald-600 uppercase">Days Present</span>
                  <span className="text-xl font-bold text-emerald-800">{attendanceStats.presentCount}</span>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <span className="block text-xs font-bold text-amber-600 uppercase">Days Late</span>
                  <span className="text-xl font-bold text-amber-800">{attendanceStats.lateCount}</span>
                </div>
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                  <span className="block text-xs font-bold text-rose-600 uppercase">Days Absent</span>
                  <span className="text-xl font-bold text-rose-800">{attendanceStats.absentCount}</span>
                </div>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-blue-900">Cumulative Attendance Weight</h3>
                  <p className="text-xs text-blue-600 mt-0.5">Calculated safety margin status across the entire school year.</p>
                </div>
                <span className="text-2xl font-black text-blue-700">{attendanceStats.attendancePercentage}%</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No historical attendance log files have been recorded for this student yet.
            </div>
          )}
        </div>
      )}

      {/* Academic Grades Sub-Tab Viewport */}
      {hubTab === 'grades' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">📝 Term Graded Performance Scores</h2>
            <p className="text-xs text-gray-400 mt-1">Dynamic score compilation reports recorded by active department teachers.</p>
          </div>

          {academicGrades.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No academic grade records found filed for this student portfolio yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Subject Matter</th>
                    <th className="py-3 px-4">Marks Obtained</th>
                    <th className="py-3 px-4">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {academicGrades.map((g, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4 font-medium text-gray-900">🧪 Science / Chemistry</td>
                      <td className="py-3.5 px-4 text-gray-600 font-mono">{g.marksObtained} / 100</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100 text-xs">
                          {g.letterGrade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEditUser;