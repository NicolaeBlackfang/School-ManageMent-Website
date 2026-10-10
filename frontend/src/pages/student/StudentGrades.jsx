// src/pages/StudentGrades.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Badge } from '../../components/ui.jsx';

const StudentGrades = () => {
    const navigate = useNavigate();
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyReportCard = async () => {
            const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
            if (!storedUser || !storedUser.token) {
                setError('Session expired. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
                // ⚡ Queries your protected backend student records endpoint securely
                const { data } = await axios.get('http://localhost:5000/api/student/my-records', config);
                if (data.success) {
                    setGrades(data.grades || []);
                }
            } catch (err) {
                setError('Failed to safely query your academic report card matrix.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyReportCard();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">

            {/* Return Action Button */}
            <button
                onClick={() => navigate('/student/dashboard')}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-xs transition-colors hover:text-slate-900"
            >
                ← Return to Terminal Hub
            </button>

            <div className="space-y-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">📝 Official Academic Report Card</h1>
                    <p className="mt-0.5 text-xs text-slate-400">Finalized term examination evaluations compiled, signed off, and published by class faculty instructor matrices.</p>
                </div>

                {error && <div className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">⚠️ {error}</div>}

                {grades.length === 0 ? ( // 🟢 FIXED: Removed the accidental 'notices' check references
                    <div className="py-12 text-center text-sm italic text-slate-400">
                        No finalized or published grade sheets have been filed for your portal portfolio session yet.
                    </div>
                ) : (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Examination Term</th>
                                    <th className="px-6 py-4">Curricula Subject Matter</th>
                                    <th className="px-6 py-4 text-center">Marks Obtained</th>
                                    <th className="px-6 py-4 text-right">Assigned Letter Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                                {grades.map((g) => (
                                    <tr key={g._id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-bold text-slate-900">{g.term}</td>
                                        <td className="px-6 py-4">
                                            <span className="block font-semibold text-slate-800">{g.subject}</span>
                                            <span className="font-sans text-[10px] text-slate-400">Instructor: {g.gradedBy}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono font-bold text-slate-600">{g.marksObtained} / 100</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-block rounded-lg border px-3 py-1 font-mono text-xs font-black ${g.letterGrade === 'F'
                                                    ? 'animate-pulse border-rose-200 bg-rose-50 text-rose-700'
                                                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                }`}>
                                                {g.letterGrade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentGrades;