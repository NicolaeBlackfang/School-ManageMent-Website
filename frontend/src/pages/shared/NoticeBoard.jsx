// src/pages/shared/NoticeBoard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { roleHome } from '../../core/nav.js';
import { PageContainer, Card, Spinner, EmptyState, MessageBanner, Badge } from '../../components/ui.jsx';
import { IconBell, IconBack, IconFile } from '../../components/icons.jsx';

const SharedNoticeBoard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const userRole = user?.role || 'student';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/notices');
        if (!cancelled) setNotices(data.data);
      } catch {
        if (!cancelled) setMsg({ text: 'Failed to synchronize with institutional circular data.', type: 'error' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const audienceTone = (audience) =>
    audience === 'teacher' ? 'violet' : audience === 'student' ? 'emerald' : 'sky';

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <Link
          to={roleHome(userRole)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <IconBack className="h-4 w-4" /> Return to dashboard
        </Link>

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <IconBell className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Official School Bulletin Board
            </h1>
            <p className="text-sm text-slate-500">Global announcements and role-specific circular briefings.</p>
          </div>
        </div>

        <MessageBanner message={msg} />

        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : notices.length === 0 ? (
          <EmptyState
            title="No circulars in your scope"
            message="No notices have been published for your visibility parameters yet."
          />
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <Card key={notice._id} className="p-6 transition hover-lift">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">{notice.title}</h3>
                    <span className="mt-1 block text-[11px] text-slate-400">
                      Published {new Date(notice.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  {userRole === 'teacher' && notice.targetAudience && (
                    <Badge tone={audienceTone(notice.targetAudience)}>Audience: {notice.targetAudience}</Badge>
                  )}
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{notice.content}</p>

                {notice.attachmentUrl && (
                  <div className="mt-4">
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                      <IconFile className="h-4 w-4" /> View attached PDF
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SharedNoticeBoard;