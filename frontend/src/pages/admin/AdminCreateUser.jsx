// src/pages/AdminCreateUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCreateUser = () => {
  const navigate = useNavigate();

  // Core Identity Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role parameter allocation

  // Isolated Collections Form States 
  const [rollNumber, setRollNumber] = useState('');
  const [extra1, setExtra1] = useState(''); // Grade Class for student / Department for teacher
  const [extra2, setExtra2] = useState(''); // Emergency parent contact / Qualification for teacher
  const [guardianName, setGuardianName] = useState('');
  const [classTeacherOf, setClassTeacherOf] = useState('None');

  // Live Validation & Configuration States
  const [globalClasses, setGlobalClasses] = useState([]); // Dynamic backend class arrays
  const [existingClassStudents, setExistingClassStudents] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingConfig, setFetchingConfig] = useState(true);

  // 1. FETCH GLOBAL SYSTEM CONFIGURATIONS ON MOUNT
  useEffect(() => {
    const fetchSystemConfiguration = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/config');
        if (data.success && data.data.classes.length > 0) {
          setGlobalClasses(data.data.classes);
          // Set the default selection state dynamically to the first available class
          setExtra1(data.data.classes[0]);
        }
      } catch (err) {
        console.error('Failed to stream global school dropdown configs.');
      } finally {
        setFetchingConfig(false);
      }
    };
    fetchSystemConfiguration();
  }, []);

  // 2. LIVE VALIDATION: Cross-check roster sheet whenever class values shift to prevent roll conflicts
  useEffect(() => {
    if (role !== 'student' || !extra1 || fetchingConfig) return;

    const fetchTargetClassRoster = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) return;

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/auth/users', config);

        // Isolate current student logs matching this specific selected dropdown class string
        const classStudents = data.data.filter(u => u.role === 'student' && u.extraField1 === extra1);
        setExistingClassStudents(classStudents);
      } catch (err) {
        console.error('Failed to pre-fetch class metrics.');
      }
    };

    fetchTargetClassRoster();
  }, [role, extra1, fetchingConfig]);

  // Evaluate instant collision matrices
  const isRollConflict = role === 'student' &&
    rollNumber !== '' &&
    existingClassStudents.some(student => Number(student.rollNumber) === Number(rollNumber));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRollConflict) {
      setMessage({ text: `❌ Submission blocked: Roll #${rollNumber} is already occupied in ${extra1}.`, type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

      const payload = {
        name,
        email,
        password,
        role,
        rollNumber: role === 'student' ? Number(rollNumber) : undefined,
        extraField1: extra1,
        extraField2: extra2,
        guardianName: role === 'student' ? guardianName : undefined,
        classTeacherOf: role === 'teacher' ? classTeacherOf : 'None'
      };

      await axios.post('http://localhost:5000/api/auth/users/create', payload, config);

      setMessage({ text: `✔ Fresh ${role} account successfully synchronized to Atlas cloud!`, type: 'success' });
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to instantiate new account.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <button
        onClick={() => navigate('/admin/users')}
        className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        ← Back to User Control Matrix
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">➕ Instantiate New Account</h1>
        <p className="text-sm text-gray-500 mt-1">Directly generate centralized credentials and register institutional data records.</p>

        {isRollConflict && (
          <div className="mt-4 p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold animate-pulse">
            ⚠️ Duplication Alert: Roll #{rollNumber} is already assigned to a student inside {extra1}! Please choose a different position.
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
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Portal Role Assignment</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setExtra1(e.target.value === 'student' ? (globalClasses[0] || '') : '');
                  setExtra2('');
                  setGuardianName('');
                  setClassTeacherOf('None');
                  setRollNumber('');
                }}
                className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">👨‍🎓 Student Profile</option>
                <option value="teacher">👩‍🏫 Teacher / Faculty Profile</option>
              </select>
            </div>

            {/* Render Dropdown Roll Assignment Menu strictly for Students */}
            {role === 'student' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Class Roll Position</label>
                <select
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 font-bold focus:outline-none focus:ring-2 ${isRollConflict ? 'border-rose-400 focus:ring-rose-500 text-rose-700 bg-rose-50' : 'border-gray-200 focus:ring-blue-500'}`}
                >
                  <option value="">-- Choose Roll Position --</option>
                  {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>Roll #{num}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Identity Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Johnathan Smith" className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Official Portal Gmail Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Initial Account Password</label>
            <input type="password" required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••••• (Min 6 characters)" className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {role === 'student' ? 'Assign Grade Class Room' : 'Core Subject Department'}
              </label>
              {role === 'student' ? (
                <select
                  value={extra1}
                  onChange={(e) => setExtra1(e.target.value)}
                  required
                  className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {globalClasses.map((className) => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text" required value={extra1} onChange={(e) => setExtra1(e.target.value)} placeholder="e.g., Mathematics, Physics"
                  className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {role === 'student' ? 'Emergency Parent Phone' : 'Educational Qualifications'}
              </label>
              <input
                type="text" required value={extra2} onChange={(e) => setExtra2(e.target.value)} placeholder={role === 'student' ? "e.g., +8801XXXXXXXXX" : "e.g., M.Sc in Applied Mathematics"}
                className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {role === 'student' && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Guardian / Parent Name</label>
              <input type="text" required value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="e.g., Karim Ahmed" className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
          )}

          {role === 'teacher' && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Class Teacher Role</label>
              <select
                value={classTeacherOf}
                onChange={(e) => setClassTeacherOf(e.target.value)}
                className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="None">❌ No Class Assigned (General Faculty)</option>
                {globalClasses.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || isRollConflict}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors disabled:bg-red-300 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Instantiating Profile...' : isRollConflict ? 'Fix Roll Conflict ⚠️' : 'Create Account Portfolio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateUser;