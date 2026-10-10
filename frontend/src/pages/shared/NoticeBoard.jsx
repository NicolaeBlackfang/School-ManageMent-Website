// src/pages/shared/noticeboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, EmptyState } from '../../components/ui.jsx';

const SharedNoticeBoard = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    const fetchBulletinFeed = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) {
        setError('Session expired. Please log in again.');
        setLoading(false);
        return;
      }

      setUserRole(storedUser.role || 'student');

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        // Backend filters visibility rules securely (Students see 'all'/'student', Teachers see everything)
        const { data } = await axios.get('http://localhost:5000/api/notices', config);
        setNotices(data.data);
      } catch (err) {
        setError('Failed to safely synchronize with institutional circular data logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBulletinFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">

      {/* Dynamic Back Navigation Pointers depending on current active user role context session */}
      <button
        onClick={() => navigate(userRole === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
      >
        ← Return to Dashboard Terminal
      </button>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">📢 Official School Bulletin Board</h1>
          <p className="mt-0.5 text-xs text-slate-400">Global announcements, news updates, and role-specific circular briefings.</p>
        </div>

        {error && <div className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">⚠️ {error}</div>}

        {notices.length === 0 ? (
          <EmptyState
            title="No circulars in your scope"
            message="No circular notices have been published for your visibility scope parameters yet."
          />
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="relative space-y-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">

                {/* Visual audience filter badge indicator visible strictly for teachers auditing feeds */}
                {userRole === 'teacher' && (
                  <span className={`absolute right-0 top-0 border-b border-l px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-bl-lg ${
                    notice.targetAudience === 'teacher' ? 'border-violet-100 bg-violet-50 text-violet-700' :
                      notice.targetAudience === 'student' ? 'border-emerald-100 bg-emerald-50 text-emerald-700' :
                        'border-sky-100 bg-sky-50 text-sky-700'
                  }`}>
                    Audience: {notice.targetAudience}
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">{notice.title}</h3>
                    <span className="mt-0.5 block font-mono text-[10px] text-slate-400">Published On: {new Date(notice.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{notice.content}</p>

                {notice.attachmentUrl && (
                  <div className="pt-2">
                    {/* Bypasses localhost entirely, routing students and teachers to the absolute cloud bucket target */}
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                      📄 View Attached Official PDF File
                    </a>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedNoticeBoard;