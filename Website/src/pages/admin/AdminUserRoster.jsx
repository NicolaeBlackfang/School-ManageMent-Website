// src/pages/AdminUserRoster.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import defaultAvatar from '../../assets/react.svg';
import {
  PageContainer,
  PageHeader,
  Card,
  Badge,
  Spinner,
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
  btnDanger,
} from '../../components/ui.jsx';
import {
  IconUsers,
  IconUser,
  IconGraduation,
  IconPlus,
  IconTrash,
  IconEdit,
  IconAlert,
} from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';

const AdminUserRoster = () => {
    const toast = useToast();
    // Master data matrix (never filtered directly)
    const [allUsers, setAllUsers] = useState([]);

    const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [globalClasses, setGlobalClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Password confirmation modal state
    const [isDeleteModalOpen, setIsModalOpen] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState('');
    const [targetDeleteName, setTargetDeleteName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalError, setModalError] = useState('');
    const [modalSubmitting, setModalSubmitting] = useState(false);

    useEffect(() => {
        const initializeRosterMatrix = async () => {
            try {
                const [configRes, usersRes] = await Promise.all([
                    api.get('/config'),
                    api.get('/auth/users'),
                ]);

                if (configRes.data.success) setGlobalClasses(configRes.data.data.classes || []);
                if (usersRes.data.success) setAllUsers(usersRes.data.data);
            } catch {
                toast.error('Failed to synchronize system rosters.');
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

        try {
            await api.delete(`/auth/users/teacher/${targetDeleteId}`, { data: { password: confirmPassword } });

            toast.success(`Profile for "${targetDeleteName}" successfully erased.`);
            setIsModalOpen(false);
            setAllUsers(allUsers.filter(u => u._id !== targetDeleteId));
        } catch (err) {
            setModalError(err.response?.data?.message || 'Password authentication mismatch.');
        } finally {
            setModalSubmitting(false);
        }
    };

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

    const pagination = usePagination(filteredUsers, 10);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    return (
        <PageContainer className="max-w-6xl">
            <div className="animate-fade-up space-y-6">
                <PageHeader
                    title="User Control Matrix"
                    subtitle="Directory of registered students and active faculty across the institution."
                    badge={<Badge tone="indigo">{allUsers.length} accounts</Badge>}
                    actions={
                        <Link to="/a/users/create" className={btnPrimary}>
                            <IconPlus className="h-4 w-4" /> Add user account
                        </Link>
                    }
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {activeTab === 'student' && (
                        <select
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className={`${inputClass} sm:max-w-xs`}
                        >
                            <option value="All">All classes</option>
                            {globalClasses.map((className, idx) => (
                                <option key={idx} value={className}>{className}</option>
                            ))}
                        </select>
                    )}

                    <input
                        type="text"
                        placeholder={activeTab === 'student' ? 'Search student name or phone...' : 'Search teacher name or email...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`${inputClass} w-full sm:max-w-sm`}
                    />
                </div>

                <div className="flex gap-2 border-b border-slate-200">
                    <button
                        onClick={() => { setActiveTab('student'); setSearchTerm(''); setClassFilter('All'); }}
                        className={`inline-flex cursor-pointer items-center gap-2 border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${activeTab === 'student' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        <IconGraduation className="h-4 w-4" /> Registered students ({allUsers.filter(u => u.role === 'student').length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('teacher'); setSearchTerm(''); setClassFilter('All'); }}
                        className={`inline-flex cursor-pointer items-center gap-2 border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${activeTab === 'teacher' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        <IconUsers className="h-4 w-4" /> Faculty teachers ({allUsers.filter(u => u.role === 'teacher').length})
                    </button>
                </div>

                <Card className="overflow-hidden">
                    <div className="scrollbar-thin overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">{activeTab === 'student' ? 'Class Roll' : 'Faculty ID'}</th>
                                    <th className="px-6 py-4">User identity</th>
                                    <th className="px-6 py-4">{activeTab === 'student' ? 'Assigned class' : 'Department / Class'}</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                                {filteredUsers.length === 0 ? (
                                    <tr><td colSpan="4" className="py-8 text-center text-slate-400">No records found matching current query parameters.</td></tr>
                                ) : pagination.pageItems.map((item) => (
                                    <tr key={item._id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-brand-600">
                                            {activeTab === 'student' ? (item.rollNumber ? `Roll #${item.rollNumber}` : 'Roll unassigned') : (item.customId || 'Awaiting ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.profileImage || defaultAvatar} alt="Avatar" className="h-9 w-9 rounded-full border bg-slate-50 object-cover" />
                                                <div>
                                                    <span className="block font-semibold text-slate-900">{item.name}</span>
                                                    <span className="font-mono text-xs font-medium text-slate-400">{item.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {activeTab === 'student' ? (
                                                <span className="font-bold text-slate-700">{item.extraField1 || 'Unassigned'}</span>
                                            ) : (
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="font-mono text-xs font-medium text-slate-500">Dept: <span className="font-sans font-bold text-slate-700">{item.extraField1 || 'General'}</span></span>
                                                    <Badge tone="violet" className="w-fit">
                                                        Class: {item.classTeacherOf && item.classTeacherOf !== 'None' ? item.classTeacherOf : 'None'}
                                                    </Badge>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link to={`/a/users/edit/${item._id}`} className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">
                                                    {activeTab === 'student' ? <><IconUser className="h-3.5 w-3.5" /> View student</> : <><IconEdit className="h-3.5 w-3.5" /> Manage</>}
                                                </Link>
                                                {activeTab === 'teacher' && (
                                                    <button
                                                        onClick={() => handleDeleteWipe(item._id, item.name)}
                                                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
                                                    >
                                                        <IconTrash className="h-3.5 w-3.5" /> Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination {...pagination} itemLabel={activeTab === 'student' ? 'students' : 'teachers'} />
                </Card>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md animate-scale-in space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                                <IconAlert className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">Security verification</h3>
                            <p className="text-xs leading-relaxed text-slate-500">
                                You are about to remove <span className="font-bold text-rose-600">{targetDeleteName}</span> from the registry. Enter your account password to authorize this action.
                            </p>
                        </div>

                        {modalError && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSecureDeleteSubmit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Your account password</label>
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
                                    className={`${btnSecondary} text-xs`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting || !confirmPassword}
                                    className={`${btnDanger} text-xs`}
                                >
                                    {modalSubmitting ? 'Verifying...' : 'Authorize deletion'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

export default AdminUserRoster;
