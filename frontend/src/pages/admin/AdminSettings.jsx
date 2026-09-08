// src/pages/AdminSettings.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSettings = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examTerms, setExamTerms] = useState([]); // 🟢 Added state for terms

  const [newClass, setNewClass] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTerm, setNewTerm] = useState(''); // 🟢 Added input tracking state

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalConfig();
  }, []);

  const fetchGlobalConfig = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/config');
      setClasses(data.data.classes || []);
      setSubjects(data.data.subjects || []);
      setExamTerms(data.data.examTerms || []); // 🟢 Load from Atlas document
    } catch (err) {
      setMessage({ text: 'Failed to stream settings arrays out of Atlas.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      // 🟢 Bulk pushes all 3 array specifications down to Atlas
      await axios.post('http://localhost:5000/api/config/update', { classes, subjects, examTerms }, config);
      setMessage({ text: '🎉 Settings pushed globally! Dropdowns updated everywhere.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch (err) {
      setMessage({ text: 'Failed to write configurations to backend.', type: 'error' });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div></div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">⚙️ Global Institution Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Control the exact class names, active subjects, and exam terms populated inside system dropdowns.</p>
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

          {/* 1. Class Structural Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">🏫 Class Structure List</h3>
            <div className="flex gap-2">
              <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="e.g., Class 10-A" className="flex-grow border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900" />
              <button type="button" onClick={() => { if (newClass.trim()) { setClasses([...classes, newClass.trim()]); setNewClass(''); } }} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {classes.map((c, i) => (
                <span key={i} className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-100 flex items-center gap-2">
                  {c} <button type="button" onClick={() => setClasses(classes.filter((_, idx) => idx !== i))} className="text-blue-400 hover:text-blue-700 font-black cursor-pointer">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 2. Subject Structural Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">🧪 Active Subject Curricula</h3>
            <div className="flex gap-2">
              <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="e.g., Computer Science" className="flex-grow border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900" />
              <button type="button" onClick={() => { if (newSubject.trim()) { setSubjects([...subjects, newSubject.trim()]); setNewSubject(''); } }} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {subjects.map((s, i) => (
                <span key={i} className="bg-purple-50 text-purple-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-100 flex items-center gap-2">
                  {s} <button type="button" onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))} className="text-purple-400 hover:text-purple-700 font-black cursor-pointer">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 3. 🟢 NEW BLOCK: Exam Terms Customization Fields */}
          <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">🏆 Examination Terms / Semesters</h3>
            <div className="flex gap-2 max-w-md">
              <input type="text" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} placeholder="e.g., First Term, Final Examination" className="flex-grow border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900" />
              <button type="button" onClick={() => { if (newTerm.trim()) { setExamTerms([...examTerms, newTerm.trim()]); setNewTerm(''); } }} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {examTerms.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No custom exam terms initialized yet. System fallback presets will apply.</p>
              ) : examTerms.map((t, i) => (
                <span key={i} className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-100 flex items-center gap-2">
                  {t} <button type="button" onClick={() => setExamTerms(examTerms.filter((_, idx) => idx !== i))} className="text-amber-400 hover:text-amber-700 font-black cursor-pointer">×</button>
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button type="button" onClick={handleSaveSettings} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer">Save Global Matrix Layout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
