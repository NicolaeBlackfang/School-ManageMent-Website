// src/pages/AdminUserRoster.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg';
import { Spinner, inputClass, labelClass, btnDanger } from '../../components/ui.jsx';

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
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">

            {/* Header Search and Dropdown Filter Panel Row */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">👥 User Control Matrix</h1>
                    <p className="mt-1 text-sm text-slate-500">Global administrator oversight for auditing isolated role-specific sub-collections.</p>
                </div>
                <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
                    {activeTab === 'student' && (
                        <select
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className={`${inputClass} cursor-pointer shadow-xs`}
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
                        className={`${inputClass} w-full md:w-64`}
                    />
                    <Link to="/admin/users/create" className="block w-full whitespace-nowrap rounded-xl bg-brand-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition-colors hover:bg-brand-700 sm:w-auto">➕ Add User Account</Link>
                </div>
            </div>

            {/* Navigation Sub-Tabs Switchers */}
            <div className="flex gap-2 border-b border-slate-200">
                <button
                    onClick={() => { setActiveTab('student'); setSearchTerm(''); setClassFilter('All'); }}
                    className={`cursor-pointer border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${activeTab === 'student' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    👨‍🎓 Registered Students ({allUsers.filter(u => u.role === 'student').length})
                </button>
                <button
                    onClick={() => { setActiveTab('teacher'); setSearchTerm(''); setClassFilter('All'); }}
                    className={`cursor-pointer border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${activeTab === 'teacher' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    👩‍🏫 Active Faculty Teachers ({allUsers.filter(u => u.role === 'teacher').length})
                </button>
            </div>

            {message.text && (
                <div className={`rounded-xl p-3 text-sm font-medium ${message.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Synchronized Data Grid Panel Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4">{activeTab === 'student' ? 'Class Roll' : 'Faculty ID'}</th>
                            <th className="px-6 py-4">User Identity Information</th>
                            <th className="px-6 py-4">{activeTab === 'student' ? 'Assigned Class' : 'Info Details (Dept / Class)'}</th>
                            <th className="px-6 py-4 text-center">Settings Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                        {filteredUsers.length === 0 ? (
                            <tr><td colSpan="4" className="py-8 text-center text-slate-400">No records found matching current query parameters.</td></tr>
                        ) : filteredUsers.map((item) => (
                            <tr key={item._id} className="transition-colors hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-mono text-xs font-black text-brand-600">
                                    {activeTab === 'student' ? (item.rollNumber ? `Roll #${item.rollNumber}` : '⚠️ Roll Unassigned') : (item.customId || '⚠️ Awaiting ID')}
                                </td>
                                <td className="flex items-center gap-3 px-6 py-4">
                                    <img src={item.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full border bg-slate-50 object-cover" />
                                    <div>
                                        <span className="block font-semibold text-slate-900">{item.name}</span>
                                        <span className="font-mono text-xs font-medium text-slate-400">{item.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {activeTab === 'student' ? (
                                        <span className="font-bold text-slate-700">{item.extraField1 || 'Unassigned'}</span>
                                    ) : (
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-mono text-xs font-medium text-slate-500">Dept: <span className="font-sans font-bold text-slate-700">{item.extraField1 || 'General'}</span></span>
                                            <span className="mt-0.5 self-start rounded border border-violet-100 bg-violet-50 px-1.5 py-0.5 text-[10px] font-black text-violet-600">
                                                🏫 Assigned Class: {item.classTeacherOf && item.classTeacherOf !== 'None' ? item.classTeacherOf : 'None'}
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link to={`/admin/users/edit/${item._id}`} className="cursor-pointer rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">
                                            {activeTab === 'student' ? '👁️ View Student Hub' : '⚙️ Manage Profile'}
                                        </Link>
                                        {activeTab === 'teacher' && (
                                            <button
                                                onClick={() => handleDeleteWipe(item._id, item.name)}
                                                className="cursor-pointer rounded-xl border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md animate-scale-in space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-xl font-bold text-rose-600">⚠️</div>
                            <h3 className="text-lg font-bold tracking-tight text-slate-900">Security Verification</h3>
                            <p className="text-xs leading-relaxed text-slate-500">
                                You are trying to drop &quot;{targetDeleteName}&quot; from the database. Please type your password to authorize this purge challenge action.
                            </p>
                        </div>

                        {modalError && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Your Account Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`${inputClass} font-mono`}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting || !confirmPassword}
                                    className={`${btnDanger} cursor-pointer text-xs disabled:bg-rose-300`}
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