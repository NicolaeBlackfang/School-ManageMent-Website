// src/pages/AdminNoticeBoard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, EmptyState, inputClass, labelClass, btnPrimary, btnDanger, btnSecondary } from '../../components/ui.jsx';

const AdminNoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [pdfFile, setPdfFile] = useState(null);

  // 🟢 Password Verification Modal Overlay Hooks
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [adminVerifyPassword, setAdminVerifyPassword] = useState('');
  const [modalError, setModalError] = useState('');

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/notices', config);
      setNotices(data.data);
    } catch (err) {
      setMessage({ text: 'Failed to retrieve published bulletins.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Triggers password input overlay instead of running standard prompts
  const openConfirmDeleteModal = (id) => {
    setSelectedNoticeId(id);
    setAdminVerifyPassword('');
    setModalError('');
    setIsPasswordModalOpen(true);
  };

  const handleVerifiedSecureDelete = async (e) => {
    e.preventDefault();
    if (!adminVerifyPassword.trim()) return;

    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          'X-Admin-Password': adminVerifyPassword // Pass secure validation string natively inside customized headers
        }
      };

      await axios.delete(`http://localhost:5000/api/notices/${selectedNoticeId}`, config);

      setMessage({ text: '🗑️ Notice wiped cleanly from system layers after credentials authorization pass.', type: 'success' });
      setIsPasswordModalOpen(false);
      fetchNotices();
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Verification failed. Password mismatch.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('targetAudience', targetAudience);

      if (pdfFile) {
        formData.append('pdfFile', pdfFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${storedUser.token}`
        }
      };

      await axios.post('http://localhost:5000/api/notices', formData, config);

      setMessage({ text: '🚀 Announcement bulletin and official circular PDF broadcasted live!', type: 'success' });

      setTitle('');
      setContent('');
      setTargetAudience('all');
      setPdfFile(null);

      document.getElementById('noticePdfInput').value = '';
      fetchNotices();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to publish bulletin.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-8">

      {/* Creation form workspace control panel */}
      <div className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">📢 Broadcast Center Terminal</h1>
          <p className="mt-0.5 text-xs text-slate-400">Publish institutional news alerts, announcements, and attach official circular PDFs globally.</p>
        </div>

        {message.text && (
          <div className={`animate-fade-in rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Notice Title Heading</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Examination Schedule Update" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Target Visibility Scope Audience</label>
              <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className={`${inputClass} cursor-pointer font-semibold`}>
                <option value="all">🌍 Broadcast to Everyone (All Portals)</option>
                <option value="student">👨‍🎓 Students Only (Visible to Teachers Too)</option>
                <option value="teacher">👩‍🏫 Faculty Members Only (Hidden from Students)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Detailed Announcement Content</label>
            <textarea required rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type detailed bulletin summary parameters here..." className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className={labelClass}>Attach Official Circular Document (PDF Only)</label>
            <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition-colors hover:border-brand-400">
              <input
                id="noticePdfInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="cursor-pointer text-xs text-slate-500 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-brand-700 hover:file:bg-brand-100"
              />
              {pdfFile && (
                <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-xs font-bold text-emerald-800">
                  📎 Selected: {pdfFile.name.slice(0, 20)}...
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={submitting} className={`${btnPrimary} cursor-pointer disabled:bg-brand-300`}>
              {submitting ? 'Broadcasting Chunks...' : 'Publish Official Bulletin'}
            </button>
          </div>
        </form>
      </div>

      {/* Published Feed History list */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">📋 Published History Logs</h2>
        {notices.length === 0 ? (
          <EmptyState
            title="No notices published"
            message="No notices logged in database cluster repositories yet."
          />
        ) : notices.map((n) => (
          <div key={n._id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs sm:flex-row sm:items-start">
            <div className="max-w-2xl space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold tracking-tight text-slate-900">{n.title}</h4>
                <span className={`rounded border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${n.targetAudience === 'all' ? 'bg-brand-50 text-brand-700 border-brand-100' :
                    n.targetAudience === 'student' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      'bg-violet-50 text-violet-700 border-violet-100'
                  }`}>{n.targetAudience}</span>
              </div>
              <p className="whitespace-pre-wrap text-xs font-medium leading-relaxed text-slate-500">{n.content}</p>

              {/* 🟢 FIXED: Points directly to your secure Cloudinary absolute URL link channel */}
              {n.attachmentUrl && (
                <div className="pt-1.5">
                  <a href={n.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline">
                    📄 View Uploaded Circular PDF File
                  </a>
                </div>
              )}

            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 self-end sm:self-start">
              <span className="font-mono text-[10px] font-medium text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
              <button
                onClick={() => openConfirmDeleteModal(n._id)}
                className="cursor-pointer rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600 transition-colors hover:bg-rose-100"
              >
                🗑️ Wipe Notice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 THE SECURITY CREDENTIALS PASSWORD VERIFICATION OVERLAY MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md animate-scale-in space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-xl font-bold text-rose-600">🔒</div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">Re-authenticate Identity</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                Please provide your Administrator access password string to confirm this high-clearance cascading deletion pass.
              </p>
            </div>

            {modalError && (
              <div className="animate-fade-in rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                {modalError}
              </div>
            )}

            <form onSubmit={handleVerifiedSecureDelete} className="space-y-4">
              <div>
                <label className={labelClass}>Admin Security Password</label>
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
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className={`${btnSecondary} cursor-pointer text-xs`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${btnDanger} cursor-pointer text-xs`}
                >
                  Confirm Eviction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminNoticeBoard;