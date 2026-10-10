// src/pages/TeacherCreateStudent.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';

const TeacherCreateStudent = () => {
  const navigate = useNavigate();

  // Core Dynamic Configurations
  const [assignedClass, setAssignedClass] = useState('');
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  // Model Formulation Form States
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [guardianName, setGuardianName] = useState('');

  const [message, setMessage] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClassBoundary();
  }, []);

  const fetchClassBoundary = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    if (!storedUser || !storedUser.token) {
      setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

      // 🟢 Fetches the logged-in teacher's class parameters dynamically from backend
      const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
      setAssignedClass(data.classTeacherOf);
      setRoster(data.roster);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to safely synchronize class profile context.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // Instantly evaluate roll overlaps against current active roster array
    if (roster.some(s => Number(s.rollNumber) === Number(rollNumber))) {
      setMessage({ text: `❌ Conflict: Roll #${rollNumber} is already occupied in your class roster sheet.`, type: 'error' });
      return;
    }

    setSubmitting(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

      const payload = {
        name: studentName,
        email: studentEmail,
        password: studentPassword,
        role: 'student',
        rollNumber: Number(rollNumber),
        extraField1: assignedClass, // 🟢 Inherits the dynamic database-driven class assigned to the teacher
        extraField2: parentContact,
        guardianName: guardianName
      };

      await axios.post('http://localhost:5000/api/auth/users/create', payload, config);

      setMessage({ text: '🎉 Student profile successfully registered and saved to Atlas!', type: 'success' });
      setTimeout(() => navigate('/teacher/roster'), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to instantiate profile.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const isRollConflict = roster.some(s => Number(s.rollNumber) === Number(rollNumber));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
      <button
        onClick={() => navigate('/teacher/roster')}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
      >
        ← Back to Class Directory
      </button>

      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">➕ Add Class Student</h1>
        <p className="mt-1 text-sm text-slate-500">Register a fresh entry bound strictly to your assigned class: <span className="font-bold text-brand-600">{assignedClass || 'Unassigned'}</span></p>

        {isRollConflict && (
          <div className="mt-4 animate-pulse rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs font-bold text-rose-700">
            ⚠️ Conflict Warning: Roll #{rollNumber} is already occupied by an active student profile!
          </div>
        )}

        {message.text && (
          <div className={`mt-4 rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Assign Class Roll Position</label>
              <select
                required value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
                className={`${inputClass} cursor-pointer font-bold`}
              >
                <option value="">-- Choose Roll Position --</option>
                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>Roll #{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Full Student Name</label>
              <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Sajid Asim" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Student Gmail Address</label>
              <input type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="student@gmail.com" className={`${inputClass} font-mono`} />
            </div>
            <div>
              <label className={labelClass}>Initial Portal Access Password</label>
              <input type="password" required minLength="6" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Emergency Parent Contact</label>
              <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="e.g. +88017XXXXXXXX" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Guardian / Parent Name</label>
              <input type="text" required value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="e.g. Asim Ahmed" className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button
              type="submit" disabled={submitting || isRollConflict}
              className={`${btnPrimary} cursor-pointer disabled:cursor-not-allowed`}
            >
              {submitting ? 'Syncing...' : 'Register Student to Atlas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCreateStudent;