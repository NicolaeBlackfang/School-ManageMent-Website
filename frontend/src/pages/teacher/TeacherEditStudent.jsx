// src/pages/TeacherEditStudent.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';

const TeacherEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Core Identity Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  // 🟢 NEW: Global Configuration Dropdown Options State Array
  const [globalClasses, setGlobalClasses] = useState([]);

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) {
        setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        
        // 1. 🟢 Fetch dynamic school configurations out of cloud system documents
        const configRes = await axios.get('http://localhost:5000/api/config');
        if (configRes.data.success) {
          setGlobalClasses(configRes.data.data.classes);
        }

        // 2. Fetch class roster layout data streams to load current parameters
        const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
        const match = data.roster.find(s => s._id === id);

        if (match) {
          setName(match.name);
          setEmail(match.email);
          setParentContact(match.parentContact);
          setGradeClass(match.gradeClass);
          setProfileImage(match.profileImage || '');
          setRollNumber(match.rollNumber || '1');
        } else {
          setMessage({ text: 'Student matrix context out of bounds.', type: 'error' });
        }
      } catch (err) {
        setMessage({ text: 'Failed to accurately synchronize profile records.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const payload = { name, email, parentContact, gradeClass, rollNumber: Number(rollNumber) };

      await axios.put(`http://localhost:5000/api/teacher/users/edit/${id}`, payload, config);
      
      setMessage({ text: '✔ Student record synchronized cleanly on Atlas cloud!', type: 'success' });
      setTimeout(() => navigate('/teacher/roster'), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to apply structural parameters.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <button onClick={() => navigate('/teacher/roster')} className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs transition-colors cursor-pointer">
        ← Back to Directory
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
          <img src={profileImage || defaultAvatar} alt="Avatar" className="h-16 w-16 rounded-full object-cover border bg-gray-50" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">⚙️ Modify Student Parameters</h1>
            <p className="text-xs text-slate-400">Isolated Management Scope: <span className="font-bold text-blue-600">{gradeClass}</span></p>
          </div>
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl text-sm font-medium mb-6 ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdateSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Student Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Student Gmail Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-mono text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 🟢 DYNAMIC SELECTOR: Roll selection mapping dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Modify Class Roll Position</label>
              <select 
                value={rollNumber} 
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              >
                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>Roll #{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Emergency Parent Phone</label>
              <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium" />
            </div>
          </div>

          {/* 🟢 DYNAMIC SELECTOR: Class Selection Dropdown matching configurations */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Update Class Assignment</label>
            <select
              value={gradeClass}
              onChange={(e) => setGradeClass(e.target.value)}
              required
              className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            >
              {globalClasses.map((className, idx) => (
                <option key={idx} value={className}>{className}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => navigate('/teacher/roster')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors disabled:bg-blue-400 cursor-pointer">
              {saving ? 'Applying Changes...' : 'Save Configuration Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEditStudent;
