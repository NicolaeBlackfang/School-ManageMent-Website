// src/pages/StudentDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div></div>;
    if (error) return <div className="max-w-4xl mx-auto p-4"><div className="p-4 bg-rose-50 text-rose-700 rounded-2xl font-bold">⚠️ {error}</div></div>;

    const { profile, attendance } = records;
    const currentUser = JSON.parse(localStorage.getItem('schoolUser'));

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">

            {/* Upper Profile Identity Row Board */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <span className="bg-white/20 border border-white/10 px-2.5 py-0.5 rounded-lg text-xs font-black tracking-wider uppercase font-mono">Student Command Port 🎓</span>
                    <h1 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">Assalamu Alaikum, {currentUser?.name}!</h1>
                    <p className="text-xs text-blue-200 mt-1 font-medium font-sans">Classroom Section: <span className="font-bold text-white underline">{profile.gradeClass}</span> | Register Index: <span className="font-bold text-white underline">Roll #{profile.rollNumber}</span></p>
                </div>
            </div>

            {/* Analytics Matrix Summary Strip Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black uppercase text-gray-400">Yearly Attendance Rate</p><h3 className="text-3xl font-black text-gray-900 mt-1 font-mono">{attendance.percentage}%</h3></div>
                    <span className="text-2xl h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">📈</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black uppercase text-gray-400">Parent Registered</p><h3 className="text-md font-bold text-gray-800 mt-2">{profile.guardianName}</h3></div>
                    <span className="text-2xl h-11 w-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center">👪</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black uppercase text-gray-400">Total Classes Logged</p><h3 className="text-3xl font-black text-gray-900 mt-1 font-mono">{attendance.totalSessions}</h3></div>
                    <span className="text-2xl h-11 w-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">📅</span>
                </div>
            </div>

            {/* 🟢 WORKSPACE PORTS NAV GRID: Clean modular route pointers identical to other panels */}
            <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Core Academic Desks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Port 1: Bulletins Timeline */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
                        <div className="space-y-2">
                            <div className="h-10 w-10 bg-amber-50 text-xl rounded-xl flex items-center justify-center">📢</div>
                            <h3 className="text-lg font-bold text-gray-900">Official Bulletin Board</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Review incoming institutional circular boards, calendar matrices, and download published office circular PDFs.</p>
                        </div>
                        <Link to="/student/notices" className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors block">Open Bulletin Board</Link>
                    </div>

                    {/* Locate the old button inside your StudentDashboard.jsx file and swap it with this link tag parameter */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gray-200 transition-colors">
                        <div className="space-y-2">
                            <div className="h-10 w-10 bg-purple-50 text-xl rounded-xl flex items-center justify-center">📝</div>
                            <h3 className="text-lg font-bold text-gray-900">Academic Report Card</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Access finalized examination semester indices, review individual letter grade scales, and view teacher feedback marks.</p>
                        </div>
                        <Link
                            to="/student/grades"
                            className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors block"
                        >
                            View Report Card
                        </Link>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default StudentDashboard;
