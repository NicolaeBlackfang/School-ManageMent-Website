// src/pages/AdminNoticeBoard.jsx
import { useEffect, useState } from 'react';
import api from '../../core/api.js';
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
  btnDanger,
  btnSecondary,
} from '../../components/ui.jsx';
import { IconBell, IconFile, IconTrash, IconLock } from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';

const audienceTone = (audience) =>
  audience === 'student' ? 'emerald' : audience === 'teacher' ? 'violet' : 'indigo';

const AdminNoticeBoard = () => {
  const toast = useToast();
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [pdfFile, setPdfFile] = useState(null);

  // Password verification modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [adminVerifyPassword, setAdminVerifyPassword] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices');
      setNotices(data.data);
    } catch {
      toast.error('Failed to retrieve published bulletins.');
    } finally {
      setLoading(false);
    }
  };

  const openConfirmDeleteModal = (id) => {
    setSelectedNoticeId(id);
    setAdminVerifyPassword('');
    setModalError('');
    setIsPasswordModalOpen(true);
  };

  const handleVerifiedSecureDelete = async (e) => {
    e.preventDefault();
    if (!adminVerifyPassword.trim()) return;
    setModalSubmitting(true);
    setModalError('');

    try {
      await api.post('/notices/verify-admin-password', { password: adminVerifyPassword });

      await api.delete(`/notices/${selectedNoticeId}`, {
        headers: { 'X-Admin-Password': adminVerifyPassword },
      });

      toast.success('Notice deleted after credential authorization.');
      setIsPasswordModalOpen(false);
      fetchNotices();
    } catch (err) {
      setModalError(err.response?.data?.message || 'Verification failed. Password mismatch.');
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('targetAudience', targetAudience);

      if (pdfFile) {
        formData.append('pdfFile', pdfFile);
      }

      await api.post('/notices', formData);

      toast.success('Announcement bulletin and circular PDF broadcasted live.');

      setTitle('');
      setContent('');
      setTargetAudience('all');
      setPdfFile(null);

      document.getElementById('noticePdfInput').value = '';
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish bulletin.');
    } finally {
      setSubmitting(false);
    }
  };

  const pagination = usePagination(notices, 10);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-5xl">
      <div className="animate-fade-up space-y-8">
        <PageHeader
          title="Broadcast center"
          subtitle="Publish institutional news alerts, announcements and attach official circular PDFs globally."
        />

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Notice title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Examination Schedule Update" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Target visibility scope</label>
                <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className={`${inputClass} font-semibold`}>
                  <option value="all">Broadcast to everyone (all portals)</option>
                  <option value="student">Students only (visible to teachers too)</option>
                  <option value="teacher">Faculty members only (hidden from students)</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Detailed announcement content</label>
              <textarea required rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type detailed bulletin summary parameters here..." className={`${inputClass} resize-none`} />
            </div>

            <div>
              <label className={labelClass}>Attach official circular document (PDF only)</label>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition-colors hover:border-brand-400">
                <input
                  id="noticePdfInput"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full min-w-0 flex-1 cursor-pointer text-xs text-slate-500 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-brand-700 hover:file:bg-brand-100"
                />
                {pdfFile && (
                  <Badge tone="emerald" className="font-mono">
                    <IconFile className="h-3 w-3" /> {pdfFile.name.slice(0, 20)}...
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={submitting} className={btnPrimary}>
                {submitting ? 'Broadcasting chunks...' : 'Publish official bulletin'}
              </button>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Published history logs</h2>
          {notices.length === 0 ? (
            <EmptyState
              title="No notices published"
              message="No notices logged in database cluster repositories yet."
            />
          ) : pagination.pageItems.map((n) => (
            <Card key={n._id} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-start">
              <div className="max-w-2xl space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900">
                    <IconBell className="h-4 w-4 text-brand-500" /> {n.title}
                  </h4>
                  <Badge tone={audienceTone(n.targetAudience)}>{n.targetAudience}</Badge>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{n.content}</p>

                {n.attachmentUrl && (
                  <div className="pt-1">
                    <a
                      href={n.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800"
                    >
                      <IconFile className="h-3.5 w-3.5" /> View attached PDF
                    </a>
                  </div>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 self-end sm:self-start">
                <span className="text-[11px] text-slate-400">
                  {new Date(n.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => openConfirmDeleteModal(n._id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
                >
                  <IconTrash className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </Card>
          ))}
          {notices.length > 0 && (
            <Card className="overflow-hidden">
              <Pagination {...pagination} itemLabel="notices" />
            </Card>
          )}
        </div>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-scale-in space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <IconLock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">Re-authenticate identity</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                Provide your administrator password to confirm this high-clearance deletion.
              </p>
            </div>

            {modalError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleVerifiedSecureDelete} className="space-y-4">
              <div>
                <label className={labelClass}>Admin security password</label>
                <input
                  type="password"
                  required
                  value={adminVerifyPassword}
                  onChange={(e) => setAdminVerifyPassword(e.target.value)}
                  placeholder="Enter your login password..."
                  className={`${inputClass} font-mono`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className={`${btnSecondary} text-xs`}>
                  Cancel
                </button>
                <button type="submit" disabled={modalSubmitting} className={`${btnDanger} text-xs`}>
                  {modalSubmitting ? 'Verifying...' : 'Confirm deletion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default AdminNoticeBoard;
