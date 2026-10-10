// src/pages/TeacherGradebook.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';

const TeacherGradebook = () => {
  // Global configuration options fetched from Atlas
  const [globalClasses, setGlobalClasses] = useState([]);
  const [globalSubjects, setGlobalSubjects] = useState([]);
  const [globalTerms, setGlobalTerms] = useState([]);

  // Active Selected Dropdown States
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Mid-Term Exam');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingConfig, setFetchingConfig] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Publication state tracker for class teachers
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // 1. Fetch live system-wide configuration dropdown fields on mount
  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/config');
        if (data.success) {
          setGlobalClasses(data.data.classes || []);
          setGlobalSubjects(data.data.subjects || []);
          setGlobalTerms(data.data.examTerms || ['Mid-Term Exam', 'Final Exam']);

          // Dynamically pre-initialize first selections to prevent blank state bugs
          if (data.data.classes.length > 0) setSelectedClass(data.data.classes[0]);
          if (data.data.subjects.length > 0) setSelectedSubject(data.data.subjects[0]);
          if (data.data.examTerms?.length > 0) setSelectedTerm(data.data.examTerms[0]);
        }
      } catch (err) {
        console.error('Failed to stream global configurations.');
      } finally {
        setFetchingConfig(false);
      }
    };
    fetchSystemConfig();
  }, []);

  // 2. Check teacher role boundaries when selected class changes
  useEffect(() => {
    const checkTeacherRoleBoundaries = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) return;
      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/teacher/my-class', config);
        // If the selected dropdown class matches their assignment, grant publishing controls
        if (data.classTeacherOf === selectedClass) {
          setIsClassTeacher(true);
        } else {
          setIsClassTeacher(false);
        }
      } catch (e) {
        console.log("Profile role check bypass.");
      }
    };
    checkTeacherRoleBoundaries();
  }, [selectedClass]);

  // 3. Fetch student spreadsheet layout whenever dropdown selections shift
  const fetchSpreadsheet = async () => {
    if (!selectedClass || !selectedSubject || !selectedTerm || fetchingConfig) return;
    setLoading(true);
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.get(`http://localhost:5000/api/grades/class/${selectedClass}/subject/${selectedSubject}/term/${selectedTerm}`, config);
      setStudents(data.data);
    } catch (err) {
      setMessage({ text: 'Failed to safely query class grade sheets.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpreadsheet();
  }, [selectedClass, selectedSubject, selectedTerm, fetchingConfig]);

  const handleMarkChange = (studentId, value) => {
    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, marksObtained: value } : s));
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

    const verifiedScores = students.filter(s => s.marksObtained !== '').map(s => ({
      studentId: s.studentId,
      marksObtained: s.marksObtained
    }));

    if (verifiedScores.length === 0) {
      setMessage({ text: '⚠️ Please enter marks for at least one student before saving.', type: 'error' });
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const payload = { classId: selectedClass, subject: selectedSubject, term: selectedTerm, scores: verifiedScores };

      await axios.post('http://localhost:5000/api/grades/bulk-submit', payload, config);
      setMessage({ text: `✔ ${selectedSubject} marks successfully broadcasted to Atlas!`, type: 'success' });
      fetchSpreadsheet();
    } catch (err) {
      setMessage({ text: 'Failed to execute database write operations.', type: 'error' });
    }
  };

  // 🟢 FIXED: Clear, professional messaging for your school portal workspace
  const handleTogglePublish = async (state) => {
    setPublishing(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const payload = { classId: selectedClass, term: selectedTerm, publishState: state };
      await axios.post('http://localhost:5000/api/grades/toggle-publish', payload, config);

      // Cleaned up the message text strings here:
      setMessage({
        text: state
          ? "🚀 Results broadcasted live! Students can now view their report cards."
          : "🔒 Results retracted to Draft mode. Grades are now hidden from students.",
        type: 'success'
      });

    } catch (err) {
      setMessage({ text: 'Unauthorized profile authorization boundaries.', type: 'error' });
    } finally {
      setPublishing(false);
    }
  };


  if (fetchingConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">
      <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">📝 Subject Grading Terminal</h1>
          <p className="mt-0.5 text-xs text-slate-400">Select class architecture, subject matter, and fill out students marks sheets.</p>
        </div>

        {/* Class Teacher Control Center Panel */}
        {isClassTeacher && (
          <div className="mt-2 flex animate-fade-in flex-col gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-violet-950">🔑 Class Teacher Control Center</h4>
              <p className="mt-0.5 text-[11px] text-violet-700">You own management privileges over this section. Release sheets live globally or pull them back to drafts.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleTogglePublish(false)} disabled={publishing} className="cursor-pointer rounded-lg border bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">📁 Retract to Drafts</button>
              <button type="button" onClick={() => handleTogglePublish(true)} disabled={publishing} className="cursor-pointer rounded-lg bg-violet-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-violet-800">🚀 Broadcast Results Live</button>
            </div>
          </div>
        )}

        {/* Dynamic Multi-Dropdown Selection Tool row */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200/70 bg-slate-50 p-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Target Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className={`${inputClass} cursor-pointer text-xs font-semibold`}>
              {globalClasses.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Curricula Subject</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className={`${inputClass} cursor-pointer text-xs font-semibold`}>
              {globalSubjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Exam Term Tier</label>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className={`${inputClass} cursor-pointer text-xs font-semibold`}>
              {globalTerms.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {message.text && (
          <div className={`rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12"><Spinner className="h-8 w-8" /></div>
        ) : (
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-xs">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Roll ID</th>
                    <th className="px-6 py-4">Student Identity Details</th>
                    <th className="px-6 py-4 text-center">Marks Obtained (Max 100)</th>
                    <th className="px-6 py-4 text-right">Computed Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="py-8 text-center text-slate-400">No students are currently registered in {selectedClass}.</td></tr>
                  ) : students.map(s => (
                    <tr key={s.studentId} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono text-sm font-black text-brand-600">
                        Roll #{s.studentRollId || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="block font-semibold text-slate-900">{s.name}</span>
                        <span className="block font-mono text-xs text-slate-400">{s.email}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number" min="0" max="100" value={s.marksObtained} onChange={(e) => handleMarkChange(s.studentId, e.target.value)} placeholder="Enter score..."
                          className="w-24 rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-1.5 text-center font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`rounded border px-2 py-1 font-mono font-black ${s.letterGrade === 'F' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>{s.letterGrade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {students.length > 0 && (
              <div className="flex justify-end pt-2">
                <button type="submit" className={`${btnPrimary} cursor-pointer text-xs`}>Sync Subject Scores to Atlas</button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherGradebook;