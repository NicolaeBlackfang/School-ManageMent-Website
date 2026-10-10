// src/pages/StudentDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StatCard } from '../../components/ui.jsx';

const StudentDashboard = () => {
    const [records, setRecords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentSummary = async () => {
            const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
            if (!storedUser || !storedUser.token) {
                setError('Session expired. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/student/my-records', config);
                if (data.success) setRecords(data);
            } catch (err) {
                setError('Failed to pull student performance records matrix from cloud repositories.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudentSummary();
    }, []);

    if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-brand-500"></div></div>;
    if (error) return <div className="mx-auto max-w-4xl p-4"><div className="rounded-2xl bg-rose-50 p-4 font-bold text-rose-700">⚠️ {error}</div></div>;

    const { profile, attendance } = records;
    const currentUser = JSON.parse(localStorage.getItem('schoolUser'));

    return (
        <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-8">

            {/* Upper Profile Identity Row Board */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-800 p-6 text-white shadow-lg shadow-brand-600/10 sm:flex-row sm:p-8">
                <div>
                    <span className="rounded-lg border border-white/10 bg-white/20 px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-wider">Student Command Port 🎓</span>
                    <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Assalamu Alaikum, {currentUser?.name}!</h1>
                    <p className="mt-1 text-xs font-medium text-brand-100">Classroom Section: <span className="font-bold text-white underline">{profile.gradeClass}</span> | Register Index: <span className="font-bold text-white underline">Roll #{profile.rollNumber}</span></p>
                </div>
            </div>

            {/* Analytics Matrix Summary Strip Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    label="Yearly Attendance Rate"
                    value={`${attendance.percentage}%`}
                    icon={<span className="text-lg">📈</span>}
                    tone="emerald"
                />
                <StatCard
                    label="Parent Registered"
                    value={profile.guardianName}
                    icon={<span className="text-lg">👪</span>}
                    tone="sky"
                />
                <StatCard
                    label="Total Classes Logged"
                    value={attendance.totalSessions}
                    icon={<span className="text-lg">📅</span>}
                    tone="amber"
                />
            </div>

            {/* Workspace Ports Nav Grid */}
            <div>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Core Academic Desks</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl ring-1 ring-amber-100">📢</div>
                            <h3 className="text-lg font-bold text-slate-900">Official Bulletin Board</h3>
                            <p className="text-sm leading-relaxed text-slate-500">Review incoming institutional circular boards, calendar matrices, and download published office circular PDFs.</p>
                        </div>
                        <Link to="/student/notices" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">Open Bulletin Board</Link>
                    </div>

                    <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-xl ring-1 ring-violet-100">📝</div>
                            <h3 className="text-lg font-bold text-slate-900">Academic Report Card</h3>
                            <p className="text-sm leading-relaxed text-slate-500">Access finalized examination semester indices, review individual letter grade scales, and view teacher feedback marks.</p>
                        </div>
                        <Link to="/student/grades" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                            View Report Card
                        </Link>
                    </div>

                    <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                        <div className="space-y-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl ring-1 ring-emerald-100">📈</div>
                            <h3 className="text-lg font-bold text-slate-900">Attendance Calendar</h3>
                            <p className="text-sm leading-relaxed text-slate-500">Access your personalized daily check-in histories, review monthly presence analytics grids, and monitor your system leave records live.</p>
                        </div>
                        <Link to="/student/attendance" className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-brand-700">
                            Open Attendance Hub
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default StudentDashboard;