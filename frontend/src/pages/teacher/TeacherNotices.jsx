import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus } from 'lucide-react';
import api from '../../core/api';
import { errorMessage } from '../../core/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import FadeIn from '../../components/animations/FadeIn';
import ScaleIn from '../../components/animations/ScaleIn';

const TeacherNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        setNotices(res.data.data || []);
      } catch (error) {
        toast.error(errorMessage(error, 'Notices could not be loaded. Check your connection and try again.'));
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Notices
            </h1>
            <p className="text-gray-600">Manage class notices and announcements</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Notice
          </motion.button>
        </div>
      </FadeIn>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : notices.length === 0 ? (
          <ScaleIn>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notices yet</p>
            </div>
          </ScaleIn>
        ) : (
          notices.map((notice, index) => (
            <ScaleIn key={notice._id} delay={index * 0.1}>
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                <p className="text-gray-600">{notice.body}</p>
              </motion.div>
            </ScaleIn>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherNotices;
