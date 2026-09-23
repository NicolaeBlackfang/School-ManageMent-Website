import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-4 text-xs text-slate-700 font-sans">
      
      {/* Upper Navigation Card */}
      <div className="bg-white p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3xs">
        <div>
          <h1 className="text-base font-black text-slate-900 tracking-tight">👩‍🎓 Admission Application Oversight Desk</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Approve incoming parent forms registers, review bKash/Nagad records, and search matching student archives.</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="px-3 py-1.5 border bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 cursor-pointer text-xs transition-colors">← Command HQ</button>
      </div>

      {statusMsg && <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl font-bold text-blue-800 animate-fade-in">{statusMsg}</div>}

      {/* Sub-Tabs Switch Navigation Strip */}
      <div className="flex gap-2 border-b font-bold text-slate-400">
        <button onClick={() => setSubTab('pending')} className={`pb-2 px-4 transition-all border-b-2 cursor-pointer ${subTab === 'pending' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent hover:text-slate-600'}`}>📥 Pending Intake ({pendingQueue.length})</button>
        <button onClick={() => setSubTab('approved')} className={`pb-2 px-4 transition-all border-b-2 cursor-pointer ${subTab === 'approved' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent hover:text-slate-600'}`}>📦 Approved Archives ({approvedQueue.length})</button>
        <button onClick={() => setSubTab('rejected')} className={`pb-2 px-4 transition-all border-b-2 cursor-pointer ${subTab === 'rejected' ? 'border-blue-600 text-blue-600 font-extrabold' : 'border-transparent hover:text-slate-600'}`}>❌ Declined ({rejectedQueue.length})</button>
      </div>

      {/* SUBTAB VIEW PANEL 1: PENDING SECTIONS */}
      {subTab === 'pending' && (
        <div className="bg-white rounded-xl border shadow-3xs overflow-hidden">
          {loading ? (
            <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div></div>
          ) : pendingQueue.length === 0 ? (
            <p className="p-6 text-center text-slate-400 italic">No pending admission forms awaiting evaluation inside server registries.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-2.5">Student Info (EN/BN)</th>
                    <th className="px-4 py-2.5">Birth Details</th>
                    <th className="px-4 py-2.5">Parent Identity Fields</th>
                    <th className="px-4 py-2.5">Gateway Info</th>
                    <th className="px-4 py-2.5 text-center">Oversight Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {pendingQueue.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-black text-slate-900 block leading-tight">{app.studentNameEn}</span>
                        <span className="font-medium text-slate-400 block text-[10px] mt-0.5">{app.studentNameBn || '—'}</span>
                        <span className="text-[10px] text-blue-600 font-bold font-mono block mt-1">Class: {app.targetClass}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-slate-800">{app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'}</span>
                      </td>
                      <td className="px-4 py-3 space-y-0.5">
                        <div className="leading-tight"><span className="text-slate-900 font-bold">F:</span> {app.fatherNameEn}</div>
                        <div className="leading-tight"><span className="text-slate-900 font-bold">M:</span> {app.motherNameEn}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">💬 Phone: {app.parentPhone || app.guardianPhone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-1.5 py-0.5 bg-pink-50 border text-pink-700 text-[9px] font-black uppercase rounded block w-fit">{app.paymentMethod || 'bKash'}</span>
                        <span className="text-[10px] text-slate-800 font-mono font-black block mt-1">TxID: {app.paymentTxnId || 'MOCK-TX'}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => navigate(`/admin/application/${app._id}`)} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md text-[10px] shadow-3xs cursor-pointer transition-colors">👁️ View Details</button>
                          <button disabled={actionId !== null} onClick={() => handleDecision(app._id, 'Approved')} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-3xs cursor-pointer transition-colors">Approve</button>
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
          <div className="max-w-xs bg-white border p-2 rounded-xl shadow-3xs flex items-center gap-2">
            <span className="text-slate-400 font-bold shrink-0">🔍 Target ID:</span>
            <input 
              type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Type or paste exact Application ID..."
              className="w-full bg-slate-50 border rounded-md px-2.5 py-1 font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl border shadow-3xs overflow-hidden">
            {loading ? (
              <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div></div>
            ) : approvedQueue.length === 0 ? (
              <p className="p-6 text-center text-slate-400 italic">No matching approved admission logs found matching search tokens.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-left">
                  <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Application Unique ID Reference</th>
                      <th className="px-4 py-2.5">Student Name (EN)</th>
                      <th className="px-4 py-2.5">Guardian Details & SMS</th>
                      <th className="px-4 py-2.5">Intake Target Class</th>
                      <th className="px-4 py-2.5 text-center">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                    {approvedQueue.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-600">{app._id}</td>
                        <td className="px-4 py-3 font-black text-slate-900">{app.studentNameEn}</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">{app.parentPhone || app.guardianPhone || '—'}</td>
                        <td className="px-4 py-3 font-bold text-blue-600">{app.targetClass}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => navigate(`/admin/application/${app._id}`)} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md text-[10px] shadow-3xs cursor-pointer transition-colors">👁️ View Details</button>
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
        <div className="bg-white rounded-xl border shadow-3xs overflow-hidden">
          {loading ? (
            <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div></div>
          ) : rejectedQueue.length === 0 ? (
            <p className="p-6 text-center text-slate-400 italic">No declined application entries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-2.5">Application ID</th>
                    <th className="px-4 py-2.5">Student Name</th>
                    <th className="px-4 py-2.5">Target Class</th>
                    <th className="px-4 py-2.5 text-center">Action Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                  {rejectedQueue.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-600">{app._id}</td>
                      <td className="px-4 py-3 font-black text-slate-900">{app.studentNameEn}</td>
                      <td className="px-4 py-3 font-bold text-slate-600">{app.targetClass}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => navigate(`/admin/application/${app._id}`)} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md text-[10px] shadow-3xs cursor-pointer transition-colors">👁️ View Details</button>
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