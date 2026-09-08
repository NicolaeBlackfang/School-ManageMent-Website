// src/pages/shared/noticeboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      
      {/* Dynamic Back Navigation Pointers depending on current active user role context session */}
      <button 
        onClick={() => navigate(userRole === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')}
        className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 transition-colors shadow-xs cursor-pointer"
      >
        ← Return to Dashboard Terminal
      </button>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📢 Official School Bulletin Board</h1>
          <p className="text-xs text-gray-400 mt-0.5">Global announcements, news updates, and role-specific circular briefings.</p>
        </div>

        {error && <div className="p-4 bg-rose-50 text-rose-700 rounded-xl text-sm font-semibold">⚠️ {error}</div>}

        {notices.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border text-center text-gray-400 text-sm shadow-xs">
            No circular notices have been published for your visibility scope parameters yet.
          </div>
        ) : notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-gray-200 transition-all relative overflow-hidden">
            
            {/* Visual audience filter badge indicator visible strictly for teachers auditing feeds */}
            {userRole === 'teacher' && (
              <span className={`absolute top-0 right-0 text-[8px] font-black uppercase px-2 py-0.5 rounded-bl border-l border-b tracking-wider ${
                notice.targetAudience === 'teacher' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                notice.targetAudience === 'student' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                Audience: {notice.targetAudience}
              </span>
            )}

            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">{notice.title}</h3>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">Published On: {new Date(notice.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{notice.content}</p>
            
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

export default SharedNoticeBoard;
