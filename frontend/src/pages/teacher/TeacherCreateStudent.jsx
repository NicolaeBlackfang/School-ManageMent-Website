// src/pages/teacher/TeacherCreateStudent.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../core/api.js';
import ProfilePhotoPicker from '../../components/ProfilePhotoPicker.jsx';
import { PageContainer, Card, Spinner, MessageBanner, inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { IconUser, IconBack } from '../../components/icons.jsx';

const TeacherCreateStudent = () => {
  const navigate = useNavigate();

  const [assignedClass, setAssignedClass] = useState('');
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [msg, setMsg] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.get('/teacher/my-class').then(({ data }) => {
      if (cancelled) return;
      setAssignedClass(data.classTeacherOf);
      setRoster(data.roster || []);
    }).catch((err) => {
      if (!cancelled) setMsg({ text: err.response?.data?.message || 'Could not load your class roster. Refresh and try again.', type: 'error' });
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (roster.some((s) => Number(s.rollNumber) === Number(rollNumber))) {
      setMsg({ text: `Conflict: Roll #${rollNumber} is already occupied in your class roster.`, type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: studentName,
        email: studentEmail,
        password: studentPassword,
        role: 'student',
        rollNumber: Number(rollNumber),
        extraField1: assignedClass,
        extraField2: parentContact,
        guardianName: guardianName,
        profileImage,
      };

      await api.post('/auth/users/create', payload);
      setMsg({ text: 'Student profile successfully registered and saved.', type: 'success' });
      setTimeout(() => navigate('/t/roster'), 1200);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to create profile.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const isRollConflict = roster.some((s) => Number(s.rollNumber) === Number(rollNumber));

  if (loading) {
    return <PageContainer><div className="flex min-h-[40vh] items-center justify-center"><Spinner /></div></PageContainer>;
  }

  return (
    <PageContainer className="max-w-3xl">
      <div className="animate-fade-up space-y-6">
        <Link
          to="/t/roster"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <IconBack className="h-4 w-4" /> Back to class directory
        </Link>

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <IconUser className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Add Class Student</h1>
            <p className="text-sm text-slate-500">
              Bounded to your assigned class:{' '}
              <span className="font-semibold text-brand-700">{assignedClass || 'Unassigned'}</span>
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <MessageBanner message={msg} />

          {isRollConflict && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700">
              Warning: Roll #{rollNumber} is already occupied by an active student profile.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <p className={`${labelClass} mb-3`}>Student photo <span className="font-normal normal-case text-slate-400">(optional)</span></p>
              <ProfilePhotoPicker value={profileImage} name={studentName} onChange={setProfileImage} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Assign class roll position</label>
                <select required value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className={`${inputClass} cursor-pointer`}>
                  <option value="">-- Choose roll position --</option>
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>Roll #{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Full student name</label>
                <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Full student name" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Student email address</label>
                <input type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="student@school.edu" className={`${inputClass} font-mono`} />
              </div>
              <div>
                <label className={labelClass}>Initial portal password</label>
                <input type="password" required minLength="8" maxLength="128" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} placeholder="At least 8 characters" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Emergency parent contact</label>
                <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="e.g. +88017XXXXXXXX" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Guardian / parent name</label>
                <input type="text" required value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="Guardian full name" className={inputClass} />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button type="submit" disabled={submitting || isRollConflict} className={`${btnPrimary} cursor-pointer`}>
                {submitting ? 'Syncing...' : 'Register student'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default TeacherCreateStudent;
