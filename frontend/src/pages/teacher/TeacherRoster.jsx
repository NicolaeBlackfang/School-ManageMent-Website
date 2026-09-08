// src/pages/TeacherRoster.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">

      <div className="flex justify-between items-center">
        <button onClick={() => navigate('/teacher/dashboard')} className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs cursor-pointer">← Return to Dashboard</button>
        <Link to="/teacher/users/create" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors text-center">➕ Add New Student</Link>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">👥 Centralized Student Directory</h1>
            <p className="text-xs text-gray-400 mt-0.5">Review profiles, parent contacts, and update roll positioning configurations.</p>
          </div>
          <span className="bg-blue-50 text-blue-800 text-xs px-3 py-1.5 rounded-lg border border-blue-200 font-bold self-start">Assigned Class: {assignedClass} 🏫</span>
        </div>

        {error ? (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-200 font-medium">⚠️ {error}</div>
        ) : roster.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No student records found assigned to your class tier yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-xs">
            <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Class Roll</th>
                  <th className="px-6 py-4">Identity Information</th>
                  <th className="px-6 py-4">Emergency Parent Phone</th>
                  <th className="px-6 py-4 text-center">Actions Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {roster.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-black text-blue-600 font-mono text-sm">Roll #{s.rollNumber}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={s.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full object-cover border bg-gray-50" />
                      <div>
                        <span className="font-semibold text-gray-900 block">{s.name}</span>
                        <span className="text-xs text-gray-400 font-mono font-medium">{s.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{s.parentContact}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => navigate(`/teacher/users/edit/${s._id}`)} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-colors cursor-pointer">⚙️ Edit Profile</button>
                        <button onClick={() => openVerificationModal(s._id, s.name)} className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 text-xs font-bold rounded-xl transition-colors cursor-pointer">🗑️ Delete Student</button>
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">⚠️ Security Verification</h3>
              <p className="text-xs text-gray-400 mt-1">You are trying to delete <span className="font-bold text-rose-600">"{targetDeleteName}"</span> from the school registry roster. Please enter your password to authorize this action.</p>
            </div>

            {modalError && <div className="p-2.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold font-sans">{modalError}</div>}

            <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Your Login Password</label>
                <input
                  type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                  className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" disabled={modalSubmitting} className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer disabled:bg-rose-400">
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