import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Badge,
  Spinner,
  EmptyState,
  MessageBanner,
  inputClass,
} from '../../components/ui.jsx';
import {
  IconBack,
  IconEye,
  IconCheckCircle,
} from '../../components/icons.jsx';

const tabs = [
  { key: 'pending', label: 'Pending intake' },
  { key: 'approved', label: 'Approved archives' },
  { key: 'rejected', label: 'Declined' },
];

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
    try {
      const { data } = await api.get('/public/applications');
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
    try {
      const { data } = await api.patch(`/public/application/${id}`, { status: decision });
      if (data.success) {
        setStatusMsg(`Record safely updated to ${decision}. Alert dispatches routed.`);
        fetchApplications();
      }
    } catch {
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

  const counts = { pending: pendingQueue.length, approved: approvedQueue.length, rejected: rejectedQueue.length };
  const queueForTab = { pending: pendingQueue, approved: approvedQueue, rejected: rejectedQueue };

  const emptyCopy = {
    pending: { title: 'No pending forms', message: 'No pending admission forms awaiting evaluation inside server registries.' },
    approved: { title: 'No approved archives', message: 'No approved application archives matched your search.' },
    rejected: { title: 'No declined entries', message: 'No declined application entries found.' },
  };

  return (
    <PageContainer className="max-w-7xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Admission oversight desk"
          subtitle="Approve incoming parent forms, review mobile-wallet records, and search matching student archives."
          badge={<Badge tone="indigo">{applications.length} total</Badge>}
          actions={
            <button onClick={() => navigate('/a/dashboard')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              <IconBack className="h-4 w-4" /> Command HQ
            </button>
          }
        />

        <MessageBanner message={statusMsg ? { text: statusMsg, type: 'info' } : null} />

        <div className="scrollbar-thin flex gap-2 overflow-x-auto border-b border-slate-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setSubTab(t.key)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 px-4 pb-3 text-sm font-bold transition-all ${subTab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {t.label} <span className="font-mono text-xs">({counts[t.key]})</span>
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-8"><Spinner className="h-6 w-6" /></div>
          ) : queueForTab[subTab].length === 0 ? (
            <EmptyState title={emptyCopy[subTab].title} message={emptyCopy[subTab].message} />
          ) : subTab === 'pending' ? (
            <div className="scrollbar-thin overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Student (EN / BN)</th>
                    <th className="px-4 py-3">Birth details</th>
                    <th className="px-4 py-3">Parent identity</th>
                    <th className="px-4 py-3">Gateway info</th>
                    <th className="px-4 py-3 text-center">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {pendingQueue.map((app) => (
                    <tr key={app._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <span className="block font-bold leading-tight text-slate-900">{app.studentNameEn}</span>
                        <span className="mt-0.5 block text-xs font-medium text-slate-400">{app.studentNameBn || '—'}</span>
                        <span className="mt-1 block font-mono text-xs font-bold text-brand-600">Class: {app.targetClass}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700">
                        {app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'}
                      </td>
                      <td className="space-y-0.5 px-4 py-3 text-xs">
                        <div className="leading-tight"><span className="font-bold text-slate-900">F:</span> {app.fatherNameEn}</div>
                        <div className="leading-tight"><span className="font-bold text-slate-900">M:</span> {app.motherNameEn}</div>
                        <div className="mt-0.5 font-mono text-[11px] text-slate-400">Phone: {app.parentPhone || app.guardianPhone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone="rose">{app.paymentMethod || 'bKash'}</Badge>
                        <span className="mt-1 block font-mono text-[11px] font-bold text-slate-700">TxID: {app.paymentTxnId || 'MOCK-TX'}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => navigate(`/a/applications/${app._id}`)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-900">
                            <IconEye className="h-3.5 w-3.5" /> View
                          </button>
                          <button
                            disabled={actionId !== null}
                            onClick={() => handleDecision(app._id, 'Approved')}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                          >
                            <IconCheckCircle className="h-3.5 w-3.5" /> Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              {subTab === 'approved' && (
                <div className="border-b border-slate-100 p-4">
                  <input
                    type="text"
                    placeholder="Search approved archives by application ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className={`${inputClass} max-w-md`}
                  />
                </div>
              )}
              <div className="scrollbar-thin overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Application ID</th>
                      <th className="px-4 py-3">Student name</th>
                      {subTab === 'approved' && <th className="px-4 py-3">Parent contact</th>}
                      <th className="px-4 py-3">Target class</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {(subTab === 'approved' ? approvedQueue : rejectedQueue).map((app) => (
                      <tr key={app._id} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-slate-600">{app._id}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{app.studentNameEn}</td>
                        {subTab === 'approved' && (
                          <td className="px-4 py-3 font-mono text-xs text-slate-500">{app.parentPhone || app.guardianPhone || '—'}</td>
                        )}
                        <td className="px-4 py-3 font-bold text-brand-600">{app.targetClass}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => navigate(`/a/applications/${app._id}`)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-slate-900">
                            <IconEye className="h-3.5 w-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminAppApproval;
