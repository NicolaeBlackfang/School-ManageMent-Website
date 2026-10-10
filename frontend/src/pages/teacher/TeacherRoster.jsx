// src/pages/teacher/TeacherRoster.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../core/api.js';
import defaultAvatar from '../../assets/react.svg';
import { PageContainer, Card, Spinner, EmptyState, MessageBanner, inputClass, labelClass, btnDanger } from '../../components/ui.jsx';
import { IconUsers, IconPlus, IconBack } from '../../components/icons.jsx';

const TeacherRoster = () => {
  const navigate = useNavigate();
  const [roster, setRoster] = useState([]);
  const [assignedClass, setAssignedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

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
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const { data } = await api.get('/teacher/my-class');
      setAssignedClass(data.classTeacherOf);
      setRoster(data.roster);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to fetch directory details.', type: 'error' });
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
    try {
      await api.delete(`/teacher/users/delete/${targetDeleteId}`, { data: { password: confirmPassword } });
      setIsModalOpen(false);
      fetchClassData();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Password authentication mismatch. Action aborted.');
    } finally {
      setModalSubmitting(false);
    }
  };

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/t/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <IconBack className="h-4 w-4" /> Return to dashboard
          </Link>
          <Link to="/t/users/create" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-700">
            <IconPlus className="h-4 w-4" /> Add new student
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <IconUsers className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Centralized Student Directory
            </h1>
            <p className="text-sm text-slate-500">
              Assigned class: <span className="font-semibold text-brand-700">{assignedClass || '—'}</span>
            </p>
          </div>
        </div>

        <MessageBanner message={msg} />

        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : roster.length === 0 ? (
          <EmptyState
            title="No students assigned"
            message="No student records are assigned to your class tier yet."
          />
        ) : (
          <Card className="overflow-hidden">
            <div className="scrollbar-thin overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Class Roll</th>
                    <th className="px-6 py-4">Identity Information</th>
                    <th className="px-6 py-4">Parent Phone</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {roster.map((s) => (
                    <tr key={s._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-brand-600">Roll #{s.rollNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={s.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full border bg-slate-50 object-cover" />
                          <div>
                            <span className="block font-semibold text-slate-900">{s.name}</span>
                            <span className="font-mono text-xs text-slate-400">{s.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.parentContact}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/t/users/edit/${s._id}`)}
                            className="cursor-pointer rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                          >
                            Edit profile
                          </button>
                          <button
                            type="button"
                            onClick={() => openVerificationModal(s._id, s.name)}
                            className="cursor-pointer rounded-xl border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                          >
                            Delete student
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-scale-in space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">Security Verification</h3>
              <p className="mt-1 text-sm text-slate-500">
                You are about to delete <span className="font-bold text-rose-600">{targetDeleteName}</span> from the school
                registry. Enter your login password to authorize this action.
              </p>
            </div>

            {modalError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Your login password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
                  Cancel
                </button>
                <button type="submit" disabled={modalSubmitting} className={`${btnDanger} cursor-pointer text-xs`}>
                  {modalSubmitting ? 'Verifying...' : 'Confirm delete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default TeacherRoster;