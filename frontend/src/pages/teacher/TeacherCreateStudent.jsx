// src/pages/TeacherCreateStudent.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <button 
        onClick={() => navigate('/teacher/roster')}
        className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 transition-colors shadow-xs cursor-pointer"
      >
        ← Back to Class Directory
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">➕ Add Class Student</h1>
        <p className="text-sm text-gray-500 mt-1">Register a fresh entry bound strictly to your assigned class: <span className="font-bold text-blue-600">{assignedClass || 'Unassigned'}</span></p>

        {isRollConflict && (
          <div className="mt-4 p-2.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold animate-pulse">
            ⚠️ Conflict Warning: Roll #{rollNumber} is already occupied by an active student profile!
          </div>
        )}

        {message.text && (
          <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Class Roll Position</label>
              <select 
                required value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Roll Position --</option>
                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>Roll #{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Student Name</label>
              <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Sajid Asim" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Student Gmail Address</label>
              <input type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="student@gmail.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Initial Portal Access Password</label>
              <input type="password" required minLength="6" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Emergency Parent Contact</label>
              <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} placeholder="e.g. +88017XXXXXXXX" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Guardian / Parent Name</label>
              <input type="text" required value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="e.g. Asim Ahmed" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              type="submit" disabled={submitting || isRollConflict} 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
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
