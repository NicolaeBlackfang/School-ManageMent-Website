// src/pages/TeacherGradebook.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📝 Subject Grading Terminal</h1>
          <p className="text-xs text-gray-400 mt-0.5">Select class architecture, subject matter, and fill out students marks sheets.</p>
        </div>

        {/* Class Teacher Control Center Panel */}
        {isClassTeacher && (
          <div className="flex items-center justify-between bg-purple-50 border border-purple-100 p-4 rounded-xl mt-2 animate-fade-in">
            <div>
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1">🔑 Class Teacher Control Center</h4>
              <p className="text-[11px] text-purple-700 mt-0.5">You own management privileges over this section. Release sheets live globally or pull them back to drafts.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleTogglePublish(false)} disabled={publishing} className="px-3 py-1.5 bg-white border text-gray-700 text-xs font-bold rounded-lg cursor-pointer hover:bg-gray-50">📁 Retract to Drafts</button>
              <button type="button" onClick={() => handleTogglePublish(true)} disabled={publishing} className="px-3 py-1.5 bg-purple-700 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-purple-800 shadow-xs">🚀 Broadcast Results Live</button>
            </div>
          </div>
        )}

        {/* Dynamic Multi-Dropdown Selection Tool row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Target Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none">
              {globalClasses.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Curricula Subject</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none">
              {globalSubjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Exam Term Tier</label>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none">
              {globalTerms.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
        ) : (
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-left text-xs sm:text-sm">
                <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Roll ID</th>
                    <th className="px-6 py-4">Student Identity Details</th>
                    <th className="px-6 py-4 text-center">Marks Obtained (Max 100)</th>
                    <th className="px-6 py-4 text-right">Computed Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-400">No students are currently registered in {selectedClass}.</td></tr>
                  ) : students.map(s => (
                    <tr key={s.studentId} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-mono font-black text-blue-600 text-sm">
                        Roll #{s.studentRollId || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900 block">{s.name}</span>
                        <span className="text-xs text-gray-400 font-mono block">{s.email}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number" min="0" max="100" value={s.marksObtained} onChange={(e) => handleMarkChange(s.studentId, e.target.value)} placeholder="Enter score..."
                          className="w-24 text-center border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold bg-gray-50/50"
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-1 rounded font-black font-mono border ${s.letterGrade === 'F' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{s.letterGrade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {students.length > 0 && (
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer">Sync Subject Scores to Atlas</button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherGradebook;