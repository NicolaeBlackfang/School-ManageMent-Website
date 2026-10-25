// src/pages/AdminEditUser.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import { errorMessage } from '../../core/api.js';
import ProfilePhotoPicker from '../../components/ProfilePhotoPicker.jsx';
import {
  PageContainer,
  PageHeader,
  Card,
  EmptyState,
  Badge,
  Spinner,
  MessageBanner,
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
} from '../../components/ui.jsx';
import { IconBack, IconUser, IconChart, IconBook } from '../../components/icons.jsx';

const HUB_TABS = [
  { key: 'info', label: 'Data settings', icon: IconUser },
  { key: 'attendance', label: 'Attendance', icon: IconChart },
  { key: 'grades', label: 'Academic history', icon: IconBook },
];

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tab view controller (students only)
  const [hubTab, setHubTab] = useState('info'); // 'info', 'attendance', 'grades'

  // Profile data state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [customId, setCustomId] = useState('');
  const [extra1, setExtra1] = useState(''); // Grade class for student or department for teacher
  const [extra2, setExtra2] = useState(''); // Parent contact for student or qualification for teacher
  const [newPassword, setNewPassword] = useState('');
  const [classTeacherOf, setClassTeacherOf] = useState('None');

  // Global config dropdown state
  const [globalClasses, setGlobalClasses] = useState([]);

  // Academic history analytics state
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [academicGrades, setAcademicGrades] = useState([]);

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Role privilege changer
  const [roleDraft, setRoleDraft] = useState('');
  const [roleSaving, setRoleSaving] = useState(false);

  useEffect(() => {
    const fetchFullDataMatrix = async () => {
      try {
        const configRes = await api.get('/config');
        if (configRes.data.success) {
          setGlobalClasses(configRes.data.data.classes);
        }

        const { data } = await api.get(`/auth/users/${id}`);
        const profile = data.data;

        setName(profile.name);
        setEmail(profile.email);
        setRole(profile.role);
        setRoleDraft(profile.role);
        setProfileImage(profile.profileImage || '');
        setCustomId(profile.customId || '');
        setExtra1(profile.extraField1 || '');
        setExtra2(profile.extraField2 || '');
        setClassTeacherOf(profile.classTeacherOf || 'None');

        if (profile.role === 'student' && profile.extraField1) {
          try {
            const attnRes = await api.get(`/teacher/attendance-analytics/${profile.extraField1}`);
            const studentAttn = attnRes.data.data.find(s => s._id === id);
            if (studentAttn) setAttendanceStats(studentAttn);

            const gradesRes = await api.get(`/grades/class/${profile.extraField1}/subject/Science/term/Mid-Term Exam`);
            const studentGrades = gradesRes.data.data.filter(s => s.studentId === id);
            setAcademicGrades(studentGrades);
          } catch {
            // Academic history is optional for a newly created student.
          }
        }
      } catch (error) {
        setMessage({ text: errorMessage(error, 'Student details could not be loaded. Check your connection and try again.'), type: 'error' });
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

    try {
      const payload = {
        customId,
        extraField1: extra1,
        extraField2: extra2,
        classTeacherOf,
        profileImage,
      };
      if (newPassword.trim() !== '') payload.password = newPassword;

      await api.put(`/auth/users/${id}/credentials`, payload);
      setMessage({ text: 'Profile configuration successfully updated!', type: 'success' });
      setTimeout(() => navigate('/a/users'), 1200);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to synchronize updates.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async () => {
    if (!roleDraft || roleDraft === role) return;
    if (!window.confirm(`Change this account's role from "${role}" to "${roleDraft}"? Portal access changes immediately.`)) return;
    setRoleSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await api.patch(`/auth/users/${id}/role`, { role: roleDraft });
      setRole(roleDraft);
      setMessage({ text: `Role updated to ${roleDraft}. Access rights apply on the next request.`, type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to update role.', type: 'error' });
    } finally {
      setRoleSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Manage user profile"
          subtitle="Update institutional parameters, academic records and portal access."
          actions={
            <button onClick={() => navigate('/a/users')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              <IconBack className="h-4 w-4" /> User control matrix
            </button>
          }
        />

        {role === 'student' && (
          <div className="inline-flex max-w-md rounded-xl bg-slate-200/60 p-1">
            {HUB_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setHubTab(key)}
                className={`inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${hubTab === key ? 'bg-white text-brand-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        )}

        {hubTab === 'info' && (
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight text-slate-900">{name}</h1>
                <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  Designation: <Badge tone="indigo" className="capitalize">{role}</Badge>
                </p>
              </div>
            </div>

            <MessageBanner message={message} />

            <form onSubmit={handleProfileSave} className="mt-6 space-y-5">
              {(role === 'student' || role === 'teacher') && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <p className={`${labelClass} mb-3`}>Profile photo</p>
                  <ProfilePhotoPicker value={profileImage} name={name} onChange={setProfileImage} size="small" />
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Display username</label>
                  <input type="text" disabled value={name} className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-400`} />
                </div>
                <div>
                  <label className={labelClass}>Email address</label>
                  <input type="email" disabled value={email} className={`${inputClass} cursor-not-allowed bg-slate-100 font-mono text-xs text-slate-400`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  {role === 'student' ? 'Modify manual class roll' : 'Faculty ID assignment'}
                </label>
                {role === 'student' ? (
                  <select value={customId} onChange={(e) => setCustomId(e.target.value)} className={`${inputClass} font-bold`}>
                    {Array.from({ length: 60 }, (_, i) => i + 1).map(num => <option key={num} value={num}>Roll #{num}</option>)}
                  </select>
                ) : (
                  <input type="text" required value={customId} onChange={(e) => setCustomId(e.target.value)} className={`${inputClass} font-mono font-bold`} />
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    {role === 'student' ? 'Grade class level' : 'Core department'}
                  </label>
                  {role === 'student' ? (
                    <select value={extra1} onChange={(e) => setExtra1(e.target.value)} className={inputClass}>
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
                    {role === 'student' ? 'Emergency parent phone' : 'Faculty qualifications'}
                  </label>
                  <input type="text" value={extra2} onChange={(e) => setExtra2(e.target.value)} className={inputClass} />
                </div>
              </div>

              {role === 'teacher' && (
                <div>
                  <label className={labelClass}>Assign class teacher role</label>
                  <select value={classTeacherOf} onChange={(e) => setClassTeacherOf(e.target.value)} className={inputClass}>
                    <option value="None">No class assigned</option>
                    {globalClasses.map((className, idx) => (
                      <option key={idx} value={className}>{className}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className={labelClass}>Override portal password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave blank to preserve current" className={inputClass} />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button type="submit" disabled={saving} className={btnPrimary}>
                  {saving ? 'Saving adjustments...' : 'Save profile changes'}
                </button>
                <button type="button" onClick={() => navigate('/a/users')} className={`${btnSecondary} text-xs`}>
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Role & privileges</h2>
                <p className="mt-1 text-xs text-slate-400">Reassign this account to a different portal. Access rights update on the user&apos;s next request.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="sm:w-64">
                  <label className={labelClass}>Account role</label>
                  <select value={roleDraft} onChange={(e) => setRoleDraft(e.target.value)} className={`${inputClass} font-bold capitalize`}>
                    {['student', 'teacher', 'admin', 'parent'].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleRoleChange}
                  disabled={roleSaving || roleDraft === role}
                  className={`${btnSecondary} text-xs`}
                >
                  {roleSaving ? 'Updating role...' : 'Update role'}
                </button>
              </div>
            </div>
          </Card>
        )}

        {hubTab === 'attendance' && (
          <Card className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                <IconChart className="h-5 w-5 text-brand-600" /> Yearly attendance report
              </h2>
              <p className="mt-1 text-xs text-slate-400">Automatic breakdown compiled from active check-in logging layers.</p>
            </div>

            {attendanceStats ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span className="block text-xs font-bold uppercase text-slate-400">Total sessions</span>
                    <span className="font-display text-2xl font-semibold text-slate-900">{attendanceStats.totalSessions}</span>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <span className="block text-xs font-bold uppercase text-emerald-600">Days present</span>
                    <span className="font-display text-2xl font-semibold text-emerald-800">{attendanceStats.presentCount}</span>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <span className="block text-xs font-bold uppercase text-amber-600">Days late</span>
                    <span className="font-display text-2xl font-semibold text-amber-800">{attendanceStats.lateCount}</span>
                  </div>
                  <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                    <span className="block text-xs font-bold uppercase text-rose-600">Days absent</span>
                    <span className="font-display text-2xl font-semibold text-rose-800">{attendanceStats.absentCount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-sky-100 bg-sky-50 p-6">
                  <div>
                    <h3 className="text-sm font-bold text-sky-900">Cumulative attendance weight</h3>
                    <p className="mt-0.5 text-xs text-sky-600">Calculated safety margin across the entire school year.</p>
                  </div>
                  <span className="font-display text-2xl font-bold text-sky-700">{attendanceStats.attendancePercentage}%</span>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No attendance history"
                message="No historical attendance log files have been recorded for this student yet."
              />
            )}
          </Card>
        )}

        {hubTab === 'grades' && (
          <Card className="p-6 sm:p-8">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900">
                <IconBook className="h-5 w-5 text-brand-600" /> Term graded performance
              </h2>
              <p className="mt-1 text-xs text-slate-400">Score reports recorded by active department teachers.</p>
            </div>

            {academicGrades.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  title="No grade records yet"
                  message="No academic grade records found filed for this student portfolio yet."
                />
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-3">Subject matter</th>
                      <th className="px-4 py-3">Marks obtained</th>
                      <th className="px-4 py-3">Letter grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {academicGrades.map((g, index) => (
                      <tr key={index} className="transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-medium text-slate-900">Science / Chemistry</td>
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
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default AdminEditUser;
