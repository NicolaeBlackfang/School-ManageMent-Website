// src/pages/TeacherRoster.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';
import { Spinner, EmptyState, inputClass, labelClass, btnDanger } from '../../components/ui.jsx';

const TeacherRoster = () => {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🟢 Password Confirmation Modal States
  const [isDeleteModalOpen, setIsModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState('');
  const [targetDeleteName, setTargetDeleteName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
      setAssignedClass(data.classTeacherOf);
      setRoster(data.roster);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch directory details.');
    } finally {
      setLoading(false);
    }
  };

  const openVerificationModal = (id, name) => {
    setTargetDeleteId(id);
    setTargetDeleteName(name);
    setConfirmPassword('');
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSecureDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!confirmPassword) {
      setModalError('Please enter your login password.');
      return;
    }

    setModalSubmitting(true);
    setModalError('');
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    try {
      const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
        data: { password: confirmPassword } // Passes verification parameter within payload config body mapping
      };

      await axios.delete(`http://localhost:5000/api/teacher/users/delete/${targetDeleteId}`, config);

      setIsModalOpen(false);
      fetchClassData();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Password authentication mismatch. Action aborted.');
    } finally { // 🟢 FIXED: Swapped 'bits' out for the proper 'finally' handler keyword
      setModalSubmitting(false);
    }

  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">

      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/teacher/dashboard')} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition hover:text-slate-900">← Return to Dashboard</button>
        <Link to="/teacher/users/create" className="rounded-xl bg-brand-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-700">➕ Add New Student</Link>
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">👥 Centralized Student Directory</h1>
            <p className="mt-0.5 text-xs text-slate-400">Review profiles, parent contacts, and update roll positioning configurations.</p>
          </div>
          <span className="self-start rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 sm:self-center">Assigned Class: {assignedClass} 🏫</span>
        </div>

        {error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">⚠️ {error}</div>
        ) : roster.length === 0 ? (
          <EmptyState
            title="No students assigned"
            message="No student records found assigned to your class tier yet."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-xs">
            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Class Roll</th>
                  <th className="px-6 py-4">Identity Information</th>
                  <th className="px-6 py-4">Emergency Parent Phone</th>
                  <th className="px-6 py-4 text-center">Actions Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {roster.map((s) => (
                  <tr key={s._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-sm font-black text-brand-600">Roll #{s.rollNumber}</td>
                    <td className="flex items-center gap-3 px-6 py-4">
                      <img src={s.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full border bg-slate-50 object-cover" />
                      <div>
                        <span className="block font-semibold text-slate-900">{s.name}</span>
                        <span className="font-mono text-xs font-medium text-slate-400">{s.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.parentContact}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => navigate(`/teacher/users/edit/${s._id}`)} className="cursor-pointer rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">⚙️ Edit Profile</button>
                        <button onClick={() => openVerificationModal(s._id, s.name)} className="cursor-pointer rounded-xl border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100">🗑️ Delete Student</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🟢 THE SECURE PASSWORD CONFIRMATION MODAL OVERLAY */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-scale-in space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div>
              <h3 className="text-lg font-black tracking-tight text-slate-900">⚠️ Security Verification</h3>
              <p className="mt-1 text-xs text-slate-400">You are trying to delete <span className="font-bold text-rose-600">"{targetDeleteName}"</span> from the school registry roster. Please enter your password to authorize this action.</p>
            </div>

            {modalError && <div className="rounded-xl border border-rose-200 bg-rose-50 p-2.5 font-sans text-xs font-bold text-rose-700">{modalError}</div>}

            <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Your Login Password</label>
                <input
                  type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">Cancel</button>
                <button type="submit" disabled={modalSubmitting} className={`${btnDanger} cursor-pointer text-xs disabled:bg-rose-400`}>
                  {modalSubmitting ? 'Verifying...' : 'Confirm Purge Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherRoster;