// src/pages/StudentNotices.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, EmptyState } from '../../components/ui.jsx';

const StudentNotices = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBulletinFeed = async () => {
      const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
      if (!storedUser || !storedUser.token) {
        setError('Session expired. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
        // ⚡ Queries the backend notice route filter layer built specifically to filter audience groups
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

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Spinner className="h-10 w-10" /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">

      {/* Return Action Trigger */}
      <button
        onClick={() => navigate('/student/dashboard')}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
      >
        ← Return to Terminal Hub
      </button>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">📢 Official School Bulletin Board</h1>
          <p className="mt-0.5 text-xs text-slate-400">Global announcements, news updates, and emergency schedule briefs dispatches.</p>
        </div>

        {error && <div className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">⚠️ {error}</div>}

        {notices.length === 0 ? (
          <EmptyState
            title="No circulars published"
            message="No circular notices published yet for your section tracking boundaries."
          />
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">{notice.title}</h3>
                    <span className="mt-0.5 block font-mono text-[10px] text-slate-400">Published On: {new Date(notice.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{notice.content}</p>

                {/* Conditional Rendering for Attached PDF circulars files mapping references */}
                {notice.attachmentUrl && (
                  <div className="pt-2">
                    {/* Fixed: backend already stores the absolute cloud URL — no localhost prefix needed */}
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

export default StudentNotices;