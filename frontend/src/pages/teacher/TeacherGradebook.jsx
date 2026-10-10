// src/pages/TeacherGradebook.jsx
import { useState, useEffect, useMemo } from 'react';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Spinner,
  EmptyState,
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
} from '../../components/ui.jsx';
import { IconBook, IconShield, IconUpload, IconClipboard } from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';

const TeacherGradebook = () => {
  const toast = useToast();

  // Teacher scope (assigned subject/class pairs + class-teacher classes)
  const [subjectPairs, setSubjectPairs] = useState([]);
  const [classTeacherClasses, setClassTeacherClasses] = useState([]);
  const [globalTerms, setGlobalTerms] = useState([]);

  // Active dropdown selections
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Mid-Term Exam');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingConfig, setFetchingConfig] = useState(true);

  const [publishing, setPublishing] = useState(false);

  const pagination = usePagination(students, 15);

  // Only classes where the teacher actually holds a subject assignment are gradable.
  const assignedClasses = useMemo(
    () => [...new Set(subjectPairs.map((p) => p.class))],
    [subjectPairs]
  );
  // Resolve the active class/subject at render time so no defaulting effect is needed.
  const activeClass = selectedClass && assignedClasses.includes(selectedClass)
    ? selectedClass
    : (assignedClasses[0] || '');
  const subjectsForClass = useMemo(
    () => subjectPairs.filter((p) => p.class === activeClass).map((p) => p.subject),
    [subjectPairs, activeClass]
  );
  const activeSubject = selectedSubject && subjectsForClass.includes(selectedSubject)
    ? selectedSubject
    : (subjectsForClass[0] || '');
  const isClassTeacher = classTeacherClasses.includes(activeClass);

  useEffect(() => {
    const loadScope = async () => {
      try {
        const [scopeRes, configRes] = await Promise.all([
          api.get('/teacher/my-scope'),
          api.get('/config'),
        ]);
        const scope = scopeRes.data.data || {};
        setSubjectPairs(scope.subjectPairs || []);
        setClassTeacherClasses(scope.classTeacherClasses || []);

        const terms = configRes.data.data?.examTerms || [];
        const resolvedTerms = terms.length ? terms : ['Mid-Term Exam', 'Final Exam'];
        setGlobalTerms(resolvedTerms);
        setSelectedTerm((prev) => prev || resolvedTerms[0]);
      } catch {
        toast.error('Failed to load your teaching assignments.');
      } finally {
        setFetchingConfig(false);
      }
    };
    loadScope();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSpreadsheet = async () => {
    if (!activeClass || !activeSubject || !selectedTerm || fetchingConfig) return;
    setLoading(true);

    try {
      const { data } = await api.get(`/grades/class/${activeClass}/subject/${activeSubject}/term/${selectedTerm}`);
      setStudents(data.data);
    } catch {
      toast.error('You are not authorised to view this grade sheet.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchSpreadsheet(); })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClass, activeSubject, selectedTerm, fetchingConfig]);

  const handleMarkChange = (studentId, value) => {
    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, marksObtained: value } : s));
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    const verifiedScores = students.filter(s => s.marksObtained !== '').map(s => ({
      studentId: s.studentId,
      marksObtained: s.marksObtained
    }));

    if (verifiedScores.length === 0) {
      toast.error('Please enter marks for at least one student before saving.');
      return;
    }

    try {
      const payload = { classId: activeClass, subject: activeSubject, term: selectedTerm, scores: verifiedScores };

      await api.post('/grades/bulk-submit', payload);
      toast.success(`${activeSubject} marks successfully saved.`);
      fetchSpreadsheet();
    } catch {
      toast.error('Failed to save subject scores.');
    }
  };

  const handleTogglePublish = async (state) => {
    setPublishing(true);
    try {
      const payload = { classId: activeClass, term: selectedTerm, publishState: state };
      await api.post('/grades/toggle-publish', payload);

      toast.success(
        state
          ? 'Results broadcast live. Students can now view their report cards.'
          : 'Results retracted to draft mode. Grades are now hidden from students.'
      );
    } catch {
      toast.error('Failed to update publication state.');
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

  if (assignedClasses.length === 0) {
    return (
      <PageContainer className="max-w-6xl">
        <div className="animate-fade-up space-y-6">
          <PageHeader
            title="Subject gradebook"
            subtitle="Record marks across class, subject and term. Class teachers can publish results live."
          />
          <EmptyState
            title="No subjects assigned"
            message="You have not been assigned any subjects to grade yet. Please contact an administrator to grant you a subject/class assignment."
          />
        </div>
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
              <select value={activeClass} onChange={(e) => setSelectedClass(e.target.value)} className={inputClass}>
                {assignedClasses.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <select value={activeSubject} onChange={(e) => setSelectedSubject(e.target.value)} className={inputClass}>
                {subjectsForClass.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Exam term</label>
              <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className={inputClass}>
                {globalTerms.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>
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
                    ) : pagination.pageItems.map(s => (
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
                <div className="overflow-hidden rounded-xl border border-slate-200/80">
                  <Pagination {...pagination} itemLabel="students" />
                </div>
              )}
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
