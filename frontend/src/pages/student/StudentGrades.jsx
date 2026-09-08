// src/pages/StudentGrades.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">

            {/* Return Action Button */}
            <button
                onClick={() => navigate('/student/dashboard')}
                className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:text-gray-900 shadow-xs transition-colors cursor-pointer"
            >
                ← Return to Terminal Hub
            </button>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">📝 Official Academic Report Card</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Finalized term examination evaluations compiled, signed off, and published by class faculty instructor matrices.</p>
                </div>

                {error && <div className="p-4 bg-rose-50 text-rose-700 rounded-xl text-sm font-semibold">⚠️ {error}</div>}

                {grades.length === 0 ? ( // 🟢 FIXED: Removed the accidental 'notices' check references
                    <div className="text-center py-12 text-gray-400 text-sm italic">
                        No finalized or published grade sheets have been filed for your portal portfolio session yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-xs mt-4">
                        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Examination Term</th>
                                    <th className="px-6 py-4">Curricula Subject Matter</th>
                                    <th className="px-6 py-4 text-center">Marks Obtained</th>
                                    <th className="px-6 py-4 text-right">Assigned Letter Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-700">
                                {grades.map((g) => (
                                    <tr key={g._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{g.term}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold block text-gray-800">{g.subject}</span>
                                            <span className="text-[10px] text-gray-400 font-sans">Instructor: {g.gradedBy}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono font-bold text-gray-600">{g.marksObtained} / 100</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-block px-3 py-1 font-black font-mono border rounded-lg text-xs ${g.letterGrade === 'F'
                                                    ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
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
