// src/pages/AdminUserRoster.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';

const AdminUserRoster = () => {
    // Master Master Data Matrix (Never filtered directly)
    const [allUsers, setAllUsers] = useState([]);

    const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [globalClasses, setGlobalClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Password Confirmation Modal States
    const [isDeleteModalOpen, setIsModalOpen] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState('');
    const [targetDeleteName, setTargetDeleteName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalError, setModalError] = useState('');
    const [modalSubmitting, setModalSubmitting] = useState(false);

    // 1. 🟢 FETCH DYNAMIC CONFIGS AND USERS ONCE ON MOUNT
    useEffect(() => {
        const initializeRosterMatrix = async () => {
            const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
            if (!storedUser || !storedUser.token) {
                setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
                setLoading(false);
                return;
            }

            try {
                const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };

                // Parallel fetching pass to cut loading times in half
                const [configRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/config'),
                    axios.get('http://localhost:5000/api/auth/users', config)
                ]);

                if (configRes.data.success) setGlobalClasses(configRes.data.data.classes || []);
                if (usersRes.data.success) setAllUsers(usersRes.data.data);

            } catch (err) {
                setMessage({ text: 'Failed to synchronize system rosters from Atlas.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        initializeRosterMatrix();
    }, []);

    const handleDeleteWipe = (id, name) => {
        setTargetDeleteId(id);
        setTargetDeleteName(name);
        setConfirmPassword('');
        setModalError('');
        setIsModalOpen(true);
    };

    const handleSecureDeleteSubmit = async (e) => {
        e.preventDefault();
        setModalSubmitting(true);
        setModalError('');
        const storedUser = JSON.parse(localStorage.getItem('schoolUser'));

        try {
            const config = {
                headers: { Authorization: `Bearer ${storedUser.token}` },
                data: { password: confirmPassword }
            };
            await axios.delete(`http://localhost:5000/api/auth/users/teacher/${targetDeleteId}`, config);

            setMessage({ text: `✔ Profile for "${targetDeleteName}" successfully erased.`, type: 'success' });
            setIsModalOpen(false);

            // Dynamic local array filtering pass to prevent a hard reload pass
            setAllUsers(allUsers.filter(u => u._id !== targetDeleteId));
            setTimeout(() => setMessage({ text: '', type: '' }), 4000);
        } catch (err) {
            setModalError(err.response?.data?.message || 'Password authentication mismatch.');
        } finally {
            setModalSubmitting(false);
        }
    };

    // 2. 🟢 INSTANT LOCAL FILTERING WORKFLOW (Zero Lag, Zero Spinners)
    const filteredUsers = allUsers.filter(user => {
        const matchesTab = user.role === activeTab;

        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'student' && classFilter !== 'All') {
            return matchesTab && matchesSearch && user.extraField1 === classFilter;
        }
        return matchesTab && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">

            {/* Header Search and Dropdown Filter Panel Row */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">👥 User Control Matrix</h1>
                    <p className="text-sm text-gray-500 mt-1">Global administrator oversight for auditing isolated role-specific sub-collections.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {activeTab === 'student' && (
                        <select
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold cursor-pointer shadow-xs"
                        >
                            <option value="All">🏫 All Classes</option>
                            {globalClasses.map((className, idx) => (
                                <option key={idx} value={className}>{className}</option>
                            ))}
                        </select>
                    )}

                    <input
                        type="text"
                        placeholder={activeTab === 'student' ? "Search student name or phone..." : "Search teacher name or email..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 text-gray-900 font-medium"
                    />
                    <Link to="/admin/users/create" className="w-full sm:w-auto text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors block whitespace-nowrap">➕ Add User Account</Link>
                </div>
            </div>

            {/* Navigation Sub-Tabs Switchers */}
            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => { setActiveTab('student'); setSearchTerm(''); setClassFilter('All'); }}
                    className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === 'student' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    👨‍🎓 Registered Students ({allUsers.filter(u => u.role === 'student').length})
                </button>
                <button
                    onClick={() => { setActiveTab('teacher'); setSearchTerm(''); setClassFilter('All'); }}
                    className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === 'teacher' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    👩‍🏫 Active Faculty Teachers ({allUsers.filter(u => u.role === 'teacher').length})
                </button>
            </div>

            {message.text && (
                <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Synchronized Data Grid Panel Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <tr>
                            <th className="px-6 py-4">{activeTab === 'student' ? 'Class Roll' : 'Faculty ID'}</th>
                            <th className="px-6 py-4">User Identity Information</th>
                            <th className="px-6 py-4">{activeTab === 'student' ? 'Assigned Class' : 'Info Details (Dept / Class)'}</th>
                            <th className="px-6 py-4 text-center">Settings Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                        {filteredUsers.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-8 text-gray-400">No records found matching current query parameters.</td></tr>
                        ) : filteredUsers.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-black text-blue-600">
                                    {activeTab === 'student' ? (item.rollNumber ? `Roll #${item.rollNumber}` : '⚠️ Roll Unassigned') : (item.customId || '⚠️ Awaiting ID')}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={item.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full object-cover border bg-gray-50" />
                                    <div>
                                        <span className="font-semibold text-gray-900 block">{item.name}</span>
                                        <span className="text-xs text-gray-400 font-mono font-medium">{item.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {activeTab === 'student' ? (
                                        <span className="font-bold text-gray-700">{item.extraField1 || 'Unassigned'}</span>
                                    ) : (
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs font-medium text-gray-500 font-mono">Dept: <span className="font-bold text-gray-700 font-sans">{item.extraField1 || 'General'}</span></span>
                                            <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100 self-start mt-0.5">
                                                🏫 Assigned Class: {item.classTeacherOf && item.classTeacherOf !== 'None' ? item.classTeacherOf : 'None'}
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link to={`/admin/users/edit/${item._id}`} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-colors cursor-pointer">
                                            {activeTab === 'student' ? '👁️ View Student Hub' : '⚙️ Manage Profile'}
                                        </Link>
                                        {activeTab === 'teacher' && (
                                            <button
                                                onClick={() => handleDeleteWipe(item._id, item.name)}
                                                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Secure Deletion Challenge Verification Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl font-bold">⚠️</div>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Security Verification</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                You are trying to drop &quot;{targetDeleteName}&quot; from the database. Please type your password to authorize this purge challenge action.
                            </p>
                        </div>

                        {modalError && (
                            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-bold">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Account Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium font-mono"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting || !confirmPassword}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer disabled:bg-rose-300"
                                >
                                    {modalSubmitting ? 'Verifying...' : 'Authorize Drop Pass'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminUserRoster;