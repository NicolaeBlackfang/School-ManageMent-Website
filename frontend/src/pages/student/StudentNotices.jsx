// src/pages/StudentNotices.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div></div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      
      {/* Return Action Trigger */}
      <button 
        onClick={() => navigate('/student/dashboard')}
        className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs transition-colors cursor-pointer"
      >
        ← Return to Terminal Hub
      </button>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📢 Official School Bulletin Board</h1>
          <p className="text-xs text-gray-400 mt-0.5">Global announcements, news updates, and emergency schedule briefs dispatches.</p>
        </div>

        {error && <div className="p-4 bg-rose-50 text-rose-700 rounded-xl text-sm font-semibold">⚠️ {error}</div>}

        {notices.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border text-center text-gray-400 text-sm shadow-sm">No circular notices published yet for your section tracking boundaries.</div>
        ) : notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-gray-200 transition-all">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{notice.title}</h3>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">Published On: {new Date(notice.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{notice.content}</p>
            
            {/* Conditional Rendering for Attached PDF circulars files mapping references */}
            {notice.attachmentUrl && (
              <div className="pt-2">
                <a 
                  href={`http://localhost:5000${notice.attachmentUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs transition-colors border border-blue-100"
                >
                  📄 View Attached Official PDF File
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentNotices;
