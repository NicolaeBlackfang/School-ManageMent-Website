import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    if (!storedUser || !storedUser.token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      // Fetches all applications and extracts the specific match
      const { data } = await axios.get('http://localhost:5000/api/public/applications', config);
      if (data.success) {
        const match = data.data.find(a => a._id === id);
        setApp(match || null);
      }
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleAction = async (decision) => {
    setStatusMsg('');
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.patch(`http://localhost:5000/api/public/application/${id}`, { status: decision }, config);
      if (data.success) {
        setStatusMsg(`✔ Record safely updated to ${decision}. Alerts dispatched.`);
        fetchApplicationDetails();
      }
    } catch (e) {
      setStatusMsg('Failed to process state change.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div></div>;
  if (!app) return <div className="p-8 text-center bg-white border rounded-xl max-w-xl mx-auto mt-12 text-slate-400 font-bold">⚠️ Application document not found inside server registries.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 text-xs text-slate-700 font-sans">
      
      {/* Header Controls */}
      <div className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-3xs">
        <div>
          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono">Voucher REF: #{app._id.slice(-8).toUpperCase()}</span>
          <h1 className="text-base font-black text-slate-900 mt-1">Applicant Dossier: {app.studentNameEn}</h1>
        </div>
        <button onClick={() => navigate('/admin/approvals')} className="px-3 py-1.5 border bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">← Approvals Queue</button>
      </div>

      {statusMsg && <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl font-bold text-blue-800 animate-fade-in">{statusMsg}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        
        {/* LEFT COLUMN: ITEMIZED SUMMARY SHEET DETAILS */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl border shadow-3xs space-y-4">
          
          {/* Section 1: Student Identity */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">👤 Student Identity (EN / BN)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><span className="text-slate-400 block font-bold">Name (English)</span><span className="text-slate-800 font-bold text-sm">{app.studentNameEn}</span></div>
              <div><span className="text-slate-400 block font-bold">Name (Bangla)</span><span className="text-slate-800 font-bold font-bn text-sm">{app.studentNameBn || '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Date of Birth</span><span className="text-slate-800 font-mono font-bold">{app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Birth Certificate No</span><span className="text-slate-800 font-mono font-bold">{app.birthCertificateNo || '—'}</span></div>
            </div>
          </div>

          {/* Section 2: Parents Framework */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">👥 Parents & Guardians Registry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><span className="text-slate-400 block font-bold">Father's Name (English)</span><span className="text-slate-800 font-bold">{app.fatherNameEn}</span></div>
              <div><span className="text-slate-400 block font-bold">Father's Name (Bangla)</span><span className="text-slate-800 font-medium font-bn">{app.fatherNameBn || '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Father's NID</span><span className="text-slate-800 font-mono">{app.fatherNid || '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Mother's Name (English)</span><span className="text-slate-800 font-bold">{app.motherNameEn}</span></div>
              <div><span className="text-slate-400 block font-bold">Mother's Name (Bangla)</span><span className="text-slate-800 font-medium font-bn">{app.motherNameBn || '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Mother's NID</span><span className="text-slate-800 font-mono">{app.motherNid || '—'}</span></div>
              <div><span className="text-slate-400 block font-bold">Primary Email Contact</span><span className="text-slate-800 font-mono font-bold">{app.emailAddress}</span></div>
            </div>
          </div>

          {/* Section 3: Emergency Contacts */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">💬 Emergency SMS Communications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><span className="text-slate-400 block font-bold">Guardian Name (EN/BN)</span><span className="text-slate-800 font-bold">{app.guardianNameEn || '—'} ({app.guardianNameBn || '—'})</span></div>
              <div><span className="text-slate-400 block font-bold">SMS Mobile Phone Number</span><span className="text-blue-600 font-mono font-black text-sm">{app.parentPhone || app.guardianPhone}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION & BILLING ADMISSION CHECKS */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">💰 MFS Settle Audit</h3>
            <div className="bg-slate-50 p-3 rounded-xl space-y-2 border font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Class Intake:</span>
                <span className="font-bold text-slate-900 font-mono">{app.targetClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="font-black text-pink-600 uppercase font-mono text-[10px]">{app.paymentMethod || 'bKash'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paid Fees:</span>
                <span className="font-black text-slate-900 font-mono">৳{app.paidAmount || '0'} BDT</span>
              </div>
              <div className="pt-1.5 border-t flex flex-col">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Transaction Reference ID</span>
                <span className="text-xs font-mono font-black text-slate-900 mt-0.5 tracking-tight">{app.paymentTxnId || 'MOCK-TX-CODE'}</span>
              </div>
            </div>
          </div>

          {/* Authorization Decision Pad Box */}
          <div className="bg-white p-4 rounded-xl border shadow-3xs space-y-3 text-center">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1 text-left">⚖ Intake Assessment</h3>
            <div className="py-2">
              <span className="text-slate-400 block font-bold">Current Verification Status</span>
              <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase mt-1 border ${
                app.applicationStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                app.applicationStatus === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
              }`}>
                {app.applicationStatus || 'Pending Evaluation'}
              </span>
            </div>
            
            {app.applicationStatus === 'Pending' || !app.applicationStatus ? (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <button onClick={() => handleAction('Approved')} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs cursor-pointer transition-colors">✔ Approve & Dispatch Notifications</button>
                <button onClick={() => handleAction('Rejected')} className="w-full py-2 bg-rose-50 text-rose-600 border border-rose-100 font-bold rounded-lg hover:bg-rose-100 cursor-pointer transition-colors">❌ Decline Entry Request</button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 font-medium pt-2 border-t italic">This record configuration loop has already been processed and locked.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminApplicationDetails;