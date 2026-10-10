// src/pages/AdminEditUser.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';
import { Spinner, EmptyState, Badge, inputClass, labelClass, btnPrimary, btnSecondary } from '../../components/ui.jsx';

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner className="h-10 w-10" />
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
      <button
        onClick={() => navigate('/admin/users')}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
      >
        ← Back to Matrix
      </button>

      {/* Tab Selector Header Bar for Student Hub Viewports */}
      {role === 'student' && (
        <div className="flex max-w-md rounded-xl bg-slate-200/60 p-1">
          {[
            ['info', '👤 Data Settings'],
            ['attendance', '📈 Attendance Sheets'],
            ['grades', '📝 Academic History']
          ].map(([tabKey, label]) => (
            <button
              key={tabKey}
              onClick={() => setHubTab(tabKey)}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-bold transition-all ${hubTab === tabKey ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {hubTab === 'info' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-4 border-b pb-6">
            <img src={profileImage || defaultAvatar} alt="Avatar" className="h-16 w-16 rounded-full border object-cover" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">⚙️ Core Parameters Setup</h1>
              <p className="text-xs capitalize text-slate-400">
                Designation: <Badge tone="brand">{role}</Badge>
              </p>
            </div>
          </div>

          {message.text && (
            <div className={`mb-6 rounded-xl p-3 text-sm ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Display Username</label>
                <input type="text" disabled value={name} className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-400`} />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" disabled value={email} className={`${inputClass} cursor-not-allowed bg-slate-100 font-mono text-xs text-slate-400`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                {role === 'student' ? 'Modify Manual Class Roll' : 'Faculty ID Assignment'}
              </label>
              {role === 'student' ? (
                <select value={customId} onChange={(e) => setCustomId(e.target.value)} className={`${inputClass} cursor-pointer font-bold`}>
                  {Array.from({ length: 60 }, (_, i) => i + 1).map(num => <option key={num} value={num}>Roll #{num}</option>)}
                </select>
              ) : (
                <input type="text" required value={customId} onChange={(e) => setCustomId(e.target.value)} className={`${inputClass} font-mono font-bold`} />
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  {role === 'student' ? 'Grade Class Level' : 'Core Department'}
                </label>
                {role === 'student' ? (
                  <select value={extra1} onChange={(e) => setExtra1(e.target.value)} className={`${inputClass} cursor-pointer`}>
                    {globalClasses.map((className, idx) => (
                      <option key={idx} value={className}>{className}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" value={extra1} onChange={(e) => setExtra1(e.target.value)} className={inputClass} />
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {role === 'student' ? 'Emergency Parent Phone' : 'Faculty Qualifications'}
                </label>
                <input type="text" value={extra2} onChange={(e) => setExtra2(e.target.value)} className={inputClass} />
              </div>
            </div>

            {role === 'teacher' && (
              <div>
                <label className={labelClass}>Assign Class Teacher Role</label>
                <select value={classTeacherOf} onChange={(e) => setClassTeacherOf(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  <option value="None">❌ No Class Assigned</option>
                  {globalClasses.map((className, idx) => (
                    <option key={idx} value={className}>{className}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className={labelClass}>Override Portal Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave completely blank to preserve current" className={inputClass} />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={saving} className={`${btnPrimary} cursor-pointer disabled:opacity-50`}>
                {saving ? 'Saving Adjustments...' : 'Save Profile Changes'}
              </button>
              <button type="button" onClick={() => navigate('/admin/users')} className={`${btnSecondary} cursor-pointer text-xs`}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Attendance Stats Sub-Tab Viewport */}
      {hubTab === 'attendance' && (
        <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">📈 Yearly Attendance Percentage Report</h2>
            <p className="mt-1 text-xs text-slate-400">Automatic mathematical breakdown compiled directly out of active checking logging layers.</p>
          </div>

          {attendanceStats ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="block text-xs font-bold uppercase text-slate-400">Total Sessions</span>
                  <span className="text-xl font-bold text-slate-900">{attendanceStats.totalSessions}</span>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <span className="block text-xs font-bold uppercase text-emerald-600">Days Present</span>
                  <span className="text-xl font-bold text-emerald-800">{attendanceStats.presentCount}</span>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <span className="block text-xs font-bold uppercase text-amber-600">Days Late</span>
                  <span className="text-xl font-bold text-amber-800">{attendanceStats.lateCount}</span>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                  <span className="block text-xs font-bold uppercase text-rose-600">Days Absent</span>
                  <span className="text-xl font-bold text-rose-800">{attendanceStats.absentCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50 p-6">
                <div>
                  <h3 className="text-sm font-bold text-sky-900">Cumulative Attendance Weight</h3>
                  <p className="mt-0.5 text-xs text-sky-600">Calculated safety margin status across the entire school year.</p>
                </div>
                <span className="text-2xl font-black text-sky-700">{attendanceStats.attendancePercentage}%</span>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No attendance history"
              message="No historical attendance log files have been recorded for this student yet."
            />
          )}
        </div>
      )}

      {/* Academic Grades Sub-Tab Viewport */}
      {hubTab === 'grades' && (
        <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">📝 Term Graded Performance Scores</h2>
            <p className="mt-1 text-xs text-slate-400">Dynamic score compilation reports recorded by active department teachers.</p>
          </div>

          {academicGrades.length === 0 ? (
            <EmptyState
              title="No grade records yet"
              message="No academic grade records found filed for this student portfolio yet."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-4 py-3">Subject Matter</th>
                    <th className="px-4 py-3">Marks Obtained</th>
                    <th className="px-4 py-3">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {academicGrades.map((g, index) => (
                    <tr key={index} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3.5 font-medium text-slate-900">🧪 Science / Chemistry</td>
                      <td className="px-4 py-3.5 font-mono text-slate-600">{g.marksObtained} / 100</td>
                      <td className="px-4 py-3.5">
                        <Badge tone="indigo">{g.letterGrade}</Badge>
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