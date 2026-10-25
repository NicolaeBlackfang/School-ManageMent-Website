// src/pages/admin/AdminAssignments.jsx
// Admin console for the Teacher ↔ Subject ↔ Class assignment matrix.
import { useEffect, useMemo, useState } from 'react';
import api, { errorMessage } from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Badge,
  Spinner,
  EmptyState,
  inputClass,
  labelClass,
  btnPrimary,
  tableWrap,
  thClass,
  tdClass,
} from '../../components/ui.jsx';
import { IconPlus, IconTrash, IconCheckCircle, IconBook } from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';

const emptyForm = { teacher: '', class: '', subject: '', academicYear: '', isClassTeacher: false };

const AdminAssignments = () => {
  const toast = useToast();
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [filters, setFilters] = useState({ teacher: '', class: '', subject: '' });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const fetchAll = async () => {
    try {
      const [assignRes, teacherRes, configRes] = await Promise.all([
        api.get('/admin/assignments'),
        api.get('/auth/users', { params: { role: 'teacher' } }),
        api.get('/config'),
      ]);
      setAssignments(assignRes.data.data || []);
      setTeachers(teacherRes.data.data || []);
      setClasses(configRes.data.data?.classes || []);
      setSubjects(configRes.data.data?.subjects || []);
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to load assignment matrix.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchAll(); })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const teacherId = a.teacher?._id || a.teacher;
      if (filters.teacher && String(teacherId) !== filters.teacher) return false;
      if (filters.class && a.class !== filters.class) return false;
      if (filters.subject && (a.subject || '') !== filters.subject) return false;
      return true;
    });
  }, [assignments, filters]);

  const pagination = usePagination(filtered, 10, `${filters.teacher}|${filters.class}|${filters.subject}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.teacher || !form.class) {
      toast.error('A teacher and a class are required.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/admin/assignments', {
        teacher: form.teacher,
        class: form.class,
        subject: form.subject || '',
        academicYear: form.academicYear || '',
        isClassTeacher: form.isClassTeacher,
      });
      toast.success('Assignment created.');
      setForm(emptyForm);
      fetchAll();
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to create assignment.'));
    } finally {
      setSubmitting(false);
    }
  };

  const toggleClassTeacher = async (assignment) => {
    setBusyId(assignment._id);
    try {
      await api.patch(`/admin/assignments/${assignment._id}`, { isClassTeacher: !assignment.isClassTeacher });
      toast.success(assignment.isClassTeacher ? 'Class-teacher role revoked.' : 'Class-teacher role granted.');
      fetchAll();
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to update assignment.'));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (assignment) => {
    const teacherName = assignment.teacher?.name || 'this teacher';
    if (!window.confirm(`Remove ${teacherName}'s assignment for ${assignment.subject || 'Class Teacher'} — ${assignment.class}?`)) return;
    setBusyId(assignment._id);
    try {
      await api.delete(`/admin/assignments/${assignment._id}`);
      toast.success('Assignment removed.');
      fetchAll();
    } catch (err) {
      toast.error(errorMessage(err, 'Failed to delete assignment.'));
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-8">
        <PageHeader
          title="Teaching assignments"
          subtitle="Map each teacher to the subjects and classes they are authorised to grade, and flag class teachers."
        />

        <Card className="p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            <IconPlus className="h-4 w-4" /> New assignment
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelClass}>Teacher</label>
                <select value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} className={`${inputClass} font-semibold`} required>
                  <option value="">Select teacher…</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>{t.name} — {t.email}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Class</label>
                <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className={`${inputClass} font-semibold`} required>
                  <option value="">Select class…</option>
                  {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={`${inputClass} font-semibold`}>
                  <option value="">Class Teacher (no subject)</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Academic year</label>
                <input type="text" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} placeholder="Auto (e.g. 2026-2027)" className={inputClass} />
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input type="checkbox" checked={form.isClassTeacher} onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <span className="text-sm font-semibold text-slate-700">Designate as Class Teacher (grants roster, attendance, analytics &amp; publishing)</span>
            </label>

            <div className="flex justify-end">
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? 'Saving…' : 'Create assignment'}
              </button>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <select value={filters.teacher} onChange={(e) => setFilters({ ...filters, teacher: e.target.value })} className={`${inputClass} font-semibold`}>
              <option value="">All teachers</option>
              {teachers.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <select value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })} className={`${inputClass} font-semibold`}>
              <option value="">All classes</option>
              {classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} className={`${inputClass} font-semibold`}>
              <option value="">All subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No assignments found" message="Create an assignment above or clear the active filters." />
          ) : (
            <Card className="overflow-hidden">
              <div className={tableWrap}>
                <table className="w-full min-w-[720px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className={thClass}>Teacher</th>
                      <th className={thClass}>Class</th>
                      <th className={thClass}>Subject</th>
                      <th className={thClass}>Year</th>
                      <th className={thClass}>Class Teacher</th>
                      <th className={thClass}></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pagination.pageItems.map((a) => (
                      <tr key={a._id} className="hover:bg-slate-50/60">
                        <td className={tdClass}>
                          <div className="font-semibold text-slate-900">{a.teacher?.name || 'Unknown'}</div>
                          <div className="text-xs text-slate-400">{a.teacher?.email || ''}</div>
                        </td>
                        <td className={tdClass}><Badge tone="indigo">{a.class}</Badge></td>
                        <td className={tdClass}>
                          {a.subject ? <Badge tone="violet"><IconBook className="h-3 w-3" /> {a.subject}</Badge> : <span className="text-xs italic text-slate-400">Class teacher</span>}
                        </td>
                        <td className={`${tdClass} font-mono text-xs`}>{a.academicYear || '—'}</td>
                        <td className={tdClass}>
                          <button
                            type="button"
                            disabled={busyId === a._id}
                            onClick={() => toggleClassTeacher(a)}
                            className="cursor-pointer disabled:opacity-50"
                          >
                            {a.isClassTeacher ? <Badge tone="emerald"><IconCheckCircle className="h-3 w-3" /> Yes</Badge> : <Badge tone="slate">No</Badge>}
                          </button>
                        </td>
                        <td className={`${tdClass} text-right`}>
                          <button type="button" disabled={busyId === a._id} onClick={() => handleDelete(a)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-50">
                            <IconTrash className="h-3.5 w-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination {...pagination} itemLabel="assignments" />
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminAssignments;
