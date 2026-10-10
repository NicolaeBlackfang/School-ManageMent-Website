// src/pages/TeacherEditStudent.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';
import { Spinner, inputClass, labelClass, btnPrimary, btnSecondary } from '../../components/ui.jsx';

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
      <button onClick={() => navigate('/teacher/roster')} className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900">
        ← Back to Directory
      </button>

      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
          <img src={profileImage || defaultAvatar} alt="Avatar" className="h-16 w-16 rounded-full border bg-slate-50 object-cover" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">⚙️ Modify Student Parameters</h1>
            <p className="text-xs text-slate-400">Isolated Management Scope: <span className="font-bold text-brand-600">{gradeClass}</span></p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdateSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Student Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Student Gmail Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} font-mono text-xs`} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* 🟢 DYNAMIC SELECTOR: Roll selection mapping dropdown */}
            <div>
              <label className={labelClass}>Modify Class Roll Position</label>
              <select
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className={`${inputClass} cursor-pointer font-bold`}
              >
                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>Roll #{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Emergency Parent Phone</label>
              <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* 🟢 DYNAMIC SELECTOR: Class Selection Dropdown matching configurations */}
          <div>
            <label className={labelClass}>Update Class Assignment</label>
            <select
              value={gradeClass}
              onChange={(e) => setGradeClass(e.target.value)}
              required
              className={`${inputClass} cursor-pointer font-bold`}
            >
              {globalClasses.map((className, idx) => (
                <option key={idx} value={className}>{className}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => navigate('/teacher/roster')} className={`${btnSecondary} cursor-pointer text-xs`}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className={`${btnPrimary} cursor-pointer`}>
              {saving ? 'Applying Changes...' : 'Save Configuration Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEditStudent;