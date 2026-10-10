import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, EmptyState, inputClass, thClass, tdClass } from '../../components/ui.jsx';

const AdminAppApproval = () => {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState('pending');
  const [applications, setApplications] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    if (!storedUser || !storedUser.token) return;
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/public/applications', config);
      if (data.success) setApplications(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, decision) => {
    setActionId(id);
    setStatusMsg('');
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      const { data } = await axios.patch(`http://localhost:5000/api/public/application/${id}`, { status: decision }, config);
      if (data.success) {
        setStatusMsg(`✔ Record safely updated to ${decision}. Alert dispatches routed.`);
        fetchApplications();
      }
    } catch (e) {
      setStatusMsg('Failed to process application state change.');
    } finally {
      setActionId(null);
    }
  };

  const pendingQueue = applications.filter(a => a.applicationStatus === 'Pending' || !a.applicationStatus);
  const rejectedQueue = applications.filter(a => a.applicationStatus === 'Rejected');
  const approvedQueue = applications.filter(a => {
    if (a.applicationStatus !== 'Approved') return false;
    if (searchId.trim() === '') return true;
    return a._id.toLowerCase().includes(searchId.toLowerCase().trim());
  });

  return (
    <div className="mx-auto max-w-7xl space-y-4 p-2 font-sans text-xs text-slate-700 sm:p-4">

      {/* Upper Navigation Card */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs sm:flex-row sm:items-center">
        <div>
          <h1 className="text-base font-black tracking-tight text-slate-900">👩‍🎓 Admission Application Oversight Desk</h1>
          <p className="mt-0.5 text-[11px] text-slate-400">Approve incoming parent forms registers, review bKash/Nagad records, and search matching student archives.</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="cursor-pointer rounded-xl border bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100">← Command HQ</button>
      </div>

      {statusMsg && <div className="animate-fade-in rounded-xl border border-sky-100 bg-sky-50 p-2.5 font-bold text-sky-800">{statusMsg}</div>}

      {/* Sub-Tabs Switch Navigation Strip */}
      <div className="flex gap-2 border-b font-bold text-slate-400">
        <button onClick={() => setSubTab('pending')} className={`cursor-pointer border-b-2 px-4 pb-2 transition-all ${subTab === 'pending' ? 'border-brand-600 font-extrabold text-brand-600' : 'border-transparent hover:text-slate-600'}`}>📥 Pending Intake ({pendingQueue.length})</button>
        <button onClick={() => setSubTab('approved')} className={`cursor-pointer border-b-2 px-4 pb-2 transition-all ${subTab === 'approved' ? 'border-brand-600 font-extrabold text-brand-600' : 'border-transparent hover:text-slate-600'}`}>📦 Approved Archives ({approvedQueue.length})</button>
        <button onClick={() => setSubTab('rejected')} className={`cursor-pointer border-b-2 px-4 pb-2 transition-all ${subTab === 'rejected' ? 'border-brand-600 font-extrabold text-brand-600' : 'border-transparent hover:text-slate-600'}`}>❌ Declined ({rejectedQueue.length})</button>
      </div>

      {/* SUBTAB VIEW PANEL 1: PENDING SECTIONS */}
      {subTab === 'pending' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-xs">
          {loading ? (
            <div className="flex justify-center py-8"><Spinner className="h-5 w-5" /></div>
          ) : pendingQueue.length === 0 ? (
            <EmptyState title="No pending forms" message="No pending admission forms awaiting evaluation inside server registries." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className={thClass}>Student Info (EN/BN)</th>
                    <th className={thClass}>Birth Details</th>
                    <th className={thClass}>Parent Identity Fields</th>
                    <th className={thClass}>Gateway Info</th>
                    <th className={`${thClass} text-center`}>Oversight Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {pendingQueue.map((app) => (
                    <tr key={app._id} className="transition-colors hover:bg-slate-50/50">
                      <td className={tdClass}>
                        <span className="block font-black leading-tight text-slate-900">{app.studentNameEn}</span>
                        <span className="mt-0.5 block text-[10px] font-medium text-slate-400">{app.studentNameBn || '—'}</span>
                        <span className="mt-1 block font-mono text-[10px] font-bold text-brand-600">Class: {app.targetClass}</span>
                      </td>
                      <td className={tdClass}>
                        <span className="font-mono font-bold text-slate-800">{app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'}</span>
                      </td>
                      <td className={`${tdClass} space-y-0.5`}>
                        <div className="leading-tight"><span className="font-bold text-slate-900">F:</span> {app.fatherNameEn}</div>
                        <div className="leading-tight"><span className="font-bold text-slate-900">M:</span> {app.motherNameEn}</div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400">💬 Phone: {app.parentPhone || app.guardianPhone}</div>
                      </td>
                      <td className={tdClass}>
                        <span className="block w-fit rounded border bg-pink-50 px-1.5 py-0.5 text-[9px] font-black uppercase text-pink-700">{app.paymentMethod || 'bKash'}</span>
                        <span className="mt-1 block font-mono text-[10px] font-black text-slate-800">TxID: {app.paymentTxnId || 'MOCK-TX'}</span>
                      </td>
                      <td className={`${tdClass} text-center`}>
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => navigate(`/admin/application/${app._id}`)} className="cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-xs transition-colors hover:bg-slate-800">👁️ View Details</button>
                          <button disabled={actionId !== null} onClick={() => handleDecision(app._id, 'Approved')} className="cursor-pointer rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:opacity-50">Approve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* APPROVED VIEW QUEUE */}
      {subTab === 'approved' && (
        <div className="space-y-3">
          <div className="flex max-w-xs items-center gap-2 rounded-xl border border-slate-200/70 bg-white p-2 shadow-xs">
            <span className="shrink-0 font-bold text-slate-400">🔍 Target ID:</span>
            <input
              type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Type or paste exact Application ID..."
              className={`${inputClass} w-full rounded-md font-mono text-xs`}
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-xs">
            {loading ? (
              <div className="flex justify-center py-8"><Spinner className="h-5 w-5" /></div>
            ) : approvedQueue.length === 0 ? (
              <EmptyState title="No matching archives" message="No matching approved admission logs found matching search tokens." />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-left">
                  <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                    <tr>
                      <th className={thClass}>Application Unique ID Reference</th>
                      <th className={thClass}>Student Name (EN)</th>
                      <th className={thClass}>Guardian Details & SMS</th>
                      <th className={thClass}>Intake Target Class</th>
                      <th className={`${thClass} text-center`}>Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                    {approvedQueue.map((app) => (
                      <tr key={app._id} className="transition-colors hover:bg-slate-50/50">
                        <td className={`${tdClass} font-mono font-bold text-slate-600`}>{app._id}</td>
                        <td className={`${tdClass} font-black text-slate-900`}>{app.studentNameEn}</td>
                        <td className={`${tdClass} font-mono text-slate-500`}>{app.parentPhone || app.guardianPhone || '—'}</td>
                        <td className={`${tdClass} font-bold text-brand-600`}>{app.targetClass}</td>
                        <td className={`${tdClass} text-center`}>
                          <button onClick={() => navigate(`/admin/application/${app._id}`)} className="cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-xs transition-colors hover:bg-slate-800">👁️ View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DECLINED VIEW QUEUE */}
      {subTab === 'rejected' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-xs">
          {loading ? (
            <div className="flex justify-center py-8"><Spinner className="h-5 w-5" /></div>
          ) : rejectedQueue.length === 0 ? (
            <EmptyState title="No declined entries" message="No declined application entries found." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className={thClass}>Application ID</th>
                    <th className={thClass}>Student Name</th>
                    <th className={thClass}>Target Class</th>
                    <th className={`${thClass} text-center`}>Action Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {rejectedQueue.map((app) => (
                    <tr key={app._id} className="transition-colors hover:bg-slate-50/50">
                      <td className={`${tdClass} font-mono font-bold text-slate-600`}>{app._id}</td>
                      <td className={`${tdClass} font-black text-slate-900`}>{app.studentNameEn}</td>
                      <td className={`${tdClass} font-bold text-slate-600`}>{app.targetClass}</td>
                      <td className={`${tdClass} text-center`}>
                        <button onClick={() => navigate(`/admin/application/${app._id}`)} className="cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-xs transition-colors hover:bg-slate-800">👁️ View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminAppApproval;