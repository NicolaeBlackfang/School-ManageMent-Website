// src/pages/AdminNoticeBoard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8">

      {/* Creation form workspace control panel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📢 Broadcast Center Terminal</h1>
          <p className="text-xs text-gray-400 mt-0.5">Publish institutional news alerts, announcements, and attach official circular PDFs globally.</p>
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notice Title Heading</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Examination Schedule Update" className="w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Visibility Scope Audience</label>
              <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold">
                <option value="all">🌍 Broadcast to Everyone (All Portals)</option>
                <option value="student">👨‍🎓 Students Only (Visible to Teachers Too)</option>
                <option value="teacher">👩‍🏫 Faculty Members Only (Hidden from Students)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Detailed Announcement Content</label>
            <textarea required rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type detailed bulletin summary parameters here..." className="w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Attach Official Circular Document (PDF Only)</label>
            <div className="border-2 border-dashed border-gray-200 hover:border-blue-500 transition-colors rounded-xl p-4 bg-gray-50 flex items-center justify-between gap-4">
              <input
                id="noticePdfInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {pdfFile && (
                <span className="text-xs bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-1 rounded border border-emerald-200">
                  📎 Selected: {pdfFile.name.slice(0, 20)}...
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors disabled:bg-blue-400 cursor-pointer">
              {submitting ? 'Broadcasting Chunks...' : 'Publish Official Bulletin'}
            </button>
          </div>
        </form>
      </div>

      {/* Published Feed History list */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">📋 Published History Logs</h2>
        {notices.length === 0 ? (
          <p className="text-sm text-gray-400 italic bg-white p-6 rounded-xl border text-center">No notices logged in database cluster repositories yet.</p>
        ) : notices.map((n) => (
          <div key={n._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-2xs flex flex-col justify-between sm:flex-row sm:items-start gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-gray-900 tracking-tight">{n.title}</h4>
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${n.targetAudience === 'all' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    n.targetAudience === 'student' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>{n.targetAudience}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium whitespace-pre-wrap">{n.content}</p>

              {/* Look inside the n.attachmentUrl condition block inside AdminNoticeBoard.jsx and update it to this: */}
              {n.attachmentUrl && (
                <div className="pt-1.5">
                  {/* 🟢 FIXED: Points directly to your secure Cloudinary absolute URL link channel */}
                  <a href={n.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-bold hover:underline">
                    📄 View Uploaded Circular PDF File
                  </a>
                </div>
              )}

            </div>

            <div className="flex flex-col items-end gap-2 shrink-0 self-end sm:self-start">
              <span className="text-[10px] font-mono text-gray-400 font-medium">{new Date(n.createdAt).toLocaleDateString()}</span>
              <button
                onClick={() => openConfirmDeleteModal(n._id)}
                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
              >
                🗑️ Wipe Notice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 THE SECURITY CREDENTIALS PASSWORD VERIFICATION OVERLAY MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl font-bold">🔒</div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Re-authenticate Identity</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Please provide your Administrator access password string to confirm this high-clearance cascading deletion pass.
              </p>
            </div>

            {modalError && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleVerifiedSecureDelete} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Security Password</label>
                <input
                  type="password"
                  required
                  value={adminVerifyPassword}
                  onChange={(e) => setAdminVerifyPassword(e.target.value)}
                  placeholder="Enter your login password..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
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