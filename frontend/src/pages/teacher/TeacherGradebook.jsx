// src/pages/TeacherGradebook.jsx
import { useState, useEffect } from 'react';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Spinner,
  MessageBanner,
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
} from '../../components/ui.jsx';
import { IconBook, IconShield, IconUpload, IconClipboard } from '../../components/icons.jsx';

const TeacherGradebook = () => {
  // Global configuration options
  const [globalClasses, setGlobalClasses] = useState([]);
  const [globalSubjects, setGlobalSubjects] = useState([]);
  const [globalTerms, setGlobalTerms] = useState([]);

  // Active dropdown selections
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

  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const { data } = await api.get('/config');
        if (data.success) {
          setGlobalClasses(data.data.classes || []);
          setGlobalSubjects(data.data.subjects || []);
          setGlobalTerms(data.data.examTerms || ['Mid-Term Exam', 'Final Exam']);

          if (data.data.classes.length > 0) setSelectedClass(data.data.classes[0]);
          if (data.data.subjects.length > 0) setSelectedSubject(data.data.subjects[0]);
          if (data.data.examTerms?.length > 0) setSelectedTerm(data.data.examTerms[0]);
        }
      } catch {
        console.error('Failed to stream global configurations.');
      } finally {
        setFetchingConfig(false);
      }
    };
    fetchSystemConfig();
  }, []);

  useEffect(() => {
    const checkTeacherRoleBoundaries = async () => {
      try {
        const { data } = await api.get('/teacher/my-class');
        setIsClassTeacher(data.classTeacherOf === selectedClass);
      } catch {
        console.log('Profile role check bypass.');
      }
    };
    checkTeacherRoleBoundaries();
  }, [selectedClass]);

  const fetchSpreadsheet = async () => {
    if (!selectedClass || !selectedSubject || !selectedTerm || fetchingConfig) return;
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { data } = await api.get(`/grades/class/${selectedClass}/subject/${selectedSubject}/term/${selectedTerm}`);
      setStudents(data.data);
    } catch {
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

    const verifiedScores = students.filter(s => s.marksObtained !== '').map(s => ({
      studentId: s.studentId,
      marksObtained: s.marksObtained
    }));

    if (verifiedScores.length === 0) {
      setMessage({ text: 'Please enter marks for at least one student before saving.', type: 'error' });
      return;
    }

    try {
      const payload = { classId: selectedClass, subject: selectedSubject, term: selectedTerm, scores: verifiedScores };

      await api.post('/grades/bulk-submit', payload);
      setMessage({ text: `${selectedSubject} marks successfully saved.`, type: 'success' });
      fetchSpreadsheet();
    } catch {
      setMessage({ text: 'Failed to execute database write operations.', type: 'error' });
    }
  };

  const handleTogglePublish = async (state) => {
    setPublishing(true);
    try {
      const payload = { classId: selectedClass, term: selectedTerm, publishState: state };
      await api.post('/grades/toggle-publish', payload);

      setMessage({
        text: state
          ? "Results broadcast live. Students can now view their report cards."
          : "Results retracted to draft mode. Grades are now hidden from students.",
        type: 'success'
      });
    } catch {
      setMessage({ text: 'Failed to update publication state.', type: 'error' });
    } finally {
      setPublishing(false);
    }
  };

  if (fetchingConfig) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Subject gradebook"
          subtitle="Record marks across class, subject and term. Class teachers can publish results live."
        />

        <Card className="p-6">
          {isClassTeacher && (
            <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-violet-100 bg-violet-50 p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><IconShield className="h-5 w-5" /></span>
                <div>
                  <h4 className="text-sm font-bold text-violet-900">Class teacher control center</h4>
                  <p className="mt-0.5 text-xs text-violet-700">Publishing is available because you own this class.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleTogglePublish(false)} disabled={publishing} className={`${btnSecondary} text-xs`}>
                  <IconClipboard className="h-4 w-4" /> Retract to drafts
                </button>
                <button type="button" onClick={() => handleTogglePublish(true)} disabled={publishing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-800 disabled:opacity-60">
                  <IconUpload className="h-4 w-4" /> Publish results live
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className={inputClass}>
                {globalClasses.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className={inputClass}>
                {globalSubjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Exam term</label>
              <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className={inputClass}>
                {globalTerms.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <MessageBanner message={message} />
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Spinner className="h-8 w-8" /></div>
          ) : (
            <form onSubmit={handleBulkSubmit} className="mt-4 space-y-4">
              <div className="scrollbar-thin overflow-x-auto rounded-xl border border-slate-200/80">
                <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Roll</th>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4 text-center">Marks (max 100)</th>
                      <th className="px-6 py-4 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {students.length === 0 ? (
                      <tr><td colSpan="4" className="py-8 text-center text-slate-400">No students are currently registered in {selectedClass}.</td></tr>
                    ) : students.map(s => (
                      <tr key={s.studentId} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-mono text-sm font-bold text-brand-600">
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
                          <span className={`rounded-lg border px-2 py-1 font-mono text-xs font-bold ${s.letterGrade === 'F' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>{s.letterGrade}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {students.length > 0 && (
                <div className="flex justify-end pt-2">
                  <button type="submit" className={btnPrimary}>
                    <IconBook className="h-4 w-4" /> Save subject scores
                  </button>
                </div>
              )}
            </form>
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default TeacherGradebook;
