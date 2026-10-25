// src/pages/student/StudentGrades.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { PageContainer, Card, Spinner, EmptyState, MessageBanner } from '../../components/ui.jsx';
import { IconBook, IconBack } from '../../components/icons.jsx';

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/student/my-records');
        if (!cancelled && data.success) setGrades(data.grades || []);
      } catch {
        if (!cancelled) setMsg({ text: 'Failed to safely query your academic report card.', type: 'error' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <Link
          to="/s/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <IconBack className="h-4 w-4" /> Return to dashboard
        </Link>

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <IconBook className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Academic Report Card
            </h1>
            <p className="text-sm text-slate-500">Finalized term evaluations compiled and published by your faculty.</p>
          </div>
        </div>

        <MessageBanner message={msg} />

        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : grades.length === 0 ? (
          <EmptyState
            title="No grade sheets published"
            message="No finalized or published grade sheets have been filed for your record yet."
          />
        ) : (
          <Card className="overflow-hidden">
            <div className="scrollbar-thin overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Examination Term</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4 text-center">Marks</th>
                    <th className="px-6 py-4 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {grades.map((g) => (
                    <tr key={g._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-900">{g.term}</td>
                      <td className="px-6 py-4">
                        <span className="block font-semibold text-slate-800">{g.subject}</span>
                        <span className="text-[11px] text-slate-400">Instructor: {g.gradedBy}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono font-bold text-slate-600">{g.marksObtained} / 100</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`inline-block rounded-lg border px-3 py-1 font-mono text-xs font-bold ${
                            g.letterGrade === 'F'
                              ? 'border-rose-200 bg-rose-50 text-rose-700'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {g.letterGrade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default StudentGrades;