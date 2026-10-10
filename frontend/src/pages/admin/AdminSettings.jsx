// src/pages/AdminSettings.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, btnPrimary, btnDark, inputClass } from '../../components/ui.jsx';

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

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Spinner className="h-8 w-8" /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
      <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">⚙️ Global Institution Settings</h1>
          <p className="mt-0.5 text-xs text-slate-400">Control the exact class names, active subjects, and exam terms populated inside system dropdowns.</p>
        </div>

        {message.text && (
          <div className={`animate-fade-in rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">

          {/* 1. Class Structural Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">🏫 Class Structure List</h3>
            <div className="flex gap-2">
              <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="e.g., Class 10-A" className={`${inputClass} flex-grow text-xs font-semibold`} />
              <button type="button" onClick={() => { if (newClass.trim()) { setClasses([...classes, newClass.trim()]); setNewClass(''); } }} className={`${btnDark} cursor-pointer text-xs`}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {classes.map((c, i) => (
                <span key={i} className="flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800">
                  {c} <button type="button" onClick={() => setClasses(classes.filter((_, idx) => idx !== i))} className="cursor-pointer font-black text-brand-400 hover:text-brand-700">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 2. Subject Structural Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">🧪 Active Subject Curricula</h3>
            <div className="flex gap-2">
              <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="e.g., Computer Science" className={`${inputClass} flex-grow text-xs font-semibold`} />
              <button type="button" onClick={() => { if (newSubject.trim()) { setSubjects([...subjects, newSubject.trim()]); setNewSubject(''); } }} className={`${btnDark} cursor-pointer text-xs`}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {subjects.map((s, i) => (
                <span key={i} className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-800">
                  {s} <button type="button" onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))} className="cursor-pointer font-black text-violet-400 hover:text-violet-700">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 3. 🟢 NEW BLOCK: Exam Terms Customization Fields */}
          <div className="space-y-4 border-t border-slate-100 pt-4 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">🏆 Examination Terms / Semesters</h3>
            <div className="flex max-w-md gap-2">
              <input type="text" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} placeholder="e.g., First Term, Final Examination" className={`${inputClass} flex-grow text-xs font-semibold`} />
              <button type="button" onClick={() => { if (newTerm.trim()) { setExamTerms([...examTerms, newTerm.trim()]); setNewTerm(''); } }} className={`${btnDark} cursor-pointer text-xs`}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {examTerms.length === 0 ? (
                <p className="text-xs italic text-slate-400">No custom exam terms initialized yet. System fallback presets will apply.</p>
              ) : examTerms.map((t, i) => (
                <span key={i} className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                  {t} <button type="button" onClick={() => setExamTerms(examTerms.filter((_, idx) => idx !== i))} className="cursor-pointer font-black text-amber-400 hover:text-amber-700">×</button>
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="flex justify-end border-t border-slate-100 pt-6">
          <button type="button" onClick={handleSaveSettings} className={`${btnPrimary} cursor-pointer text-xs`}>Save Global Matrix Layout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;