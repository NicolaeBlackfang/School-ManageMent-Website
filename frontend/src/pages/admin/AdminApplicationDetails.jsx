import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Badge, btnPrimary, btnDanger } from '../../components/ui.jsx';

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

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Spinner className="h-8 w-8" /></div>;
  if (!app) return <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200/70 bg-white p-8 text-center font-bold text-slate-400">⚠️ Application document not found inside server registries.</div>;

  const statusTone = app.applicationStatus === 'Approved' ? 'emerald'
    : app.applicationStatus === 'Rejected' ? 'rose' : 'amber';

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 font-sans text-xs text-slate-700 sm:p-6">

      {/* Header Controls */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs">
        <div>
          <span className="rounded border border-sky-100 bg-sky-50 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-sky-600">Voucher REF: #{app._id.slice(-8).toUpperCase()}</span>
          <h1 className="mt-1 text-base font-black text-slate-900">Applicant Dossier: {app.studentNameEn}</h1>
        </div>
        <button onClick={() => navigate('/admin/approvals')} className="cursor-pointer rounded-xl border bg-slate-50 px-3 py-1.5 font-bold text-slate-600 transition-colors hover:bg-slate-100">← Approvals Queue</button>
      </div>

      {statusMsg && <div className="animate-fade-in rounded-xl border border-sky-100 bg-sky-50 p-2.5 font-bold text-sky-800">{statusMsg}</div>}

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">

        {/* LEFT COLUMN: ITEMIZED SUMMARY SHEET DETAILS */}
        <div className="space-y-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs md:col-span-2">

          {/* Section 1: Student Identity */}
          <div className="space-y-2">
            <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">👤 Student Identity (EN / BN)</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><span className="block font-bold text-slate-400">Name (English)</span><span className="text-sm font-bold text-slate-800">{app.studentNameEn}</span></div>
              <div><span className="block font-bold text-slate-400">Name (Bangla)</span><span className="text-sm font-bold text-slate-800">{app.studentNameBn || '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Date of Birth</span><span className="font-mono font-bold text-slate-800">{app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Birth Certificate No</span><span className="font-mono font-bold text-slate-800">{app.birthCertificateNo || '—'}</span></div>
            </div>
          </div>

          {/* Section 2: Parents Framework */}
          <div className="space-y-2 pt-2">
            <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">👥 Parents & Guardians Registry</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><span className="block font-bold text-slate-400">Father's Name (English)</span><span className="font-bold text-slate-800">{app.fatherNameEn}</span></div>
              <div><span className="block font-bold text-slate-400">Father's Name (Bangla)</span><span className="font-medium text-slate-800">{app.fatherNameBn || '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Father's NID</span><span className="font-mono text-slate-800">{app.fatherNid || '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Mother's Name (English)</span><span className="font-bold text-slate-800">{app.motherNameEn}</span></div>
              <div><span className="block font-bold text-slate-400">Mother's Name (Bangla)</span><span className="font-medium text-slate-800">{app.motherNameBn || '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Mother's NID</span><span className="font-mono text-slate-800">{app.motherNid || '—'}</span></div>
              <div><span className="block font-bold text-slate-400">Primary Email Contact</span><span className="font-mono font-bold text-slate-800">{app.emailAddress}</span></div>
            </div>
          </div>

          {/* Section 3: Emergency Contacts */}
          <div className="space-y-2 pt-2">
            <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">💬 Emergency SMS Communications</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><span className="block font-bold text-slate-400">Guardian Name (EN/BN)</span><span className="font-bold text-slate-800">{app.guardianNameEn || '—'} ({app.guardianNameBn || '—'})</span></div>
              <div><span className="block font-bold text-slate-400">SMS Mobile Phone Number</span><span className="text-sm font-mono font-black text-brand-600">{app.parentPhone || app.guardianPhone}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION & BILLING ADMISSION CHECKS */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs">
            <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">💰 MFS Settle Audit</h3>
            <div className="space-y-2 rounded-xl border bg-slate-50 p-3 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Class Intake:</span>
                <span className="font-mono font-bold text-slate-900">{app.targetClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="font-mono text-[10px] font-black uppercase text-pink-600">{app.paymentMethod || 'bKash'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paid Fees:</span>
                <span className="font-mono font-black text-slate-900">৳{app.paidAmount || '0'} BDT</span>
              </div>
              <div className="flex flex-col border-t pt-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Transaction Reference ID</span>
                <span className="mt-0.5 font-mono text-xs font-black tracking-tight text-slate-900">{app.paymentTxnId || 'MOCK-TX-CODE'}</span>
              </div>
            </div>
          </div>

          {/* Authorization Decision Pad Box */}
          <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 text-center shadow-xs">
            <h3 className="border-b pb-1 text-left text-xs font-black uppercase tracking-wider text-slate-900">⚖ Intake Assessment</h3>
            <div className="py-2">
              <span className="block font-bold text-slate-400">Current Verification Status</span>
              <span className="mt-1 inline-block">
                <Badge tone={statusTone} pulse={statusTone === 'amber'}>{app.applicationStatus || 'Pending Evaluation'}</Badge>
              </span>
            </div>

            {app.applicationStatus === 'Pending' || !app.applicationStatus ? (
              <div className="flex flex-col gap-2 border-t pt-2">
                <button onClick={() => handleAction('Approved')} className={`${btnPrimary} w-full cursor-pointer py-2 shadow-xs`}>✔ Approve & Dispatch Notifications</button>
                <button onClick={() => handleAction('Rejected')} className={`${btnDanger} w-full cursor-pointer py-2 shadow-xs`}>❌ Decline Entry Request</button>
              </div>
            ) : (
              <p className="border-t pt-2 text-[11px] font-medium italic text-slate-400">This record configuration loop has already been processed and locked.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminApplicationDetails;