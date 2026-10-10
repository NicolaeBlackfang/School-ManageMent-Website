import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Badge,
  Spinner,
  MessageBanner,
  btnPrimary,
  btnDanger,
} from '../../components/ui.jsx';
import {
  IconBack,
  IconUser,
  IconUsers,
  IconBell,
  IconMoney,
  IconClipboard,
  IconCheckCircle,
  IconX,
  IconAlert,
} from '../../components/icons.jsx';

const AdminApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchApplicationDetails = async () => {
    try {
      const { data } = await api.get('/public/applications');
      if (data.success) {
        const found = (data.data || []).find((a) => a._id === id);
        if (found) setApp(found);
      }
    } catch {
      setStatusMsg('Failed to query application registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationDetails();
  }, []);

  const handleAction = async (decision) => {
    setStatusMsg('');
    try {
      const { data } = await api.patch(`/public/application/${id}`, { status: decision });
      if (data.success) {
        setStatusMsg(`Record safely updated to ${decision}. Alert dispatches routed.`);
        fetchApplicationDetails();
      }
    } catch {
      setStatusMsg('Failed to process application state change.');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  if (!app) {
    return (
      <PageContainer className="max-w-3xl">
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <IconAlert className="h-5 w-5" />
          </div>
          <p className="mt-3 font-bold text-slate-700">Application document not found in server registries.</p>
          <button onClick={() => navigate('/a/approvals')} className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
            <IconBack className="h-4 w-4" /> Back to approvals
          </button>
        </Card>
      </PageContainer>
    );
  }

  const statusTone = app.applicationStatus === 'Approved' ? 'emerald'
    : app.applicationStatus === 'Rejected' ? 'rose' : 'amber';

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title={`Applicant dossier: ${app.studentNameEn}`}
          subtitle={`Voucher reference #${app._id.slice(-8).toUpperCase()}`}
          badge={<Badge tone={statusTone}>{app.applicationStatus || 'Pending'}</Badge>}
          actions={
            <button onClick={() => navigate('/a/approvals')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              <IconBack className="h-4 w-4" /> Approvals queue
            </button>
          }
        />

        <MessageBanner message={statusMsg ? { text: statusMsg, type: 'info' } : null} />

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
          <div className="space-y-5 md:col-span-2">
            <Card className="p-5">
              <h3 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <IconUser className="h-4 w-4" /> Student identity (EN / BN)
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name (English)" value={app.studentNameEn} />
                <Field label="Name (Bangla)" value={app.studentNameBn || '—'} />
                <Field label="Date of birth" value={app.dateOfBirth ? app.dateOfBirth.split('T')[0] : '—'} mono />
                <Field label="Birth certificate no" value={app.birthCertificateNo || '—'} mono />
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <IconUsers className="h-4 w-4" /> Parents & guardians registry
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Father's name (English)" value={app.fatherNameEn} />
                <Field label="Father's name (Bangla)" value={app.fatherNameBn || '—'} />
                <Field label="Father's NID" value={app.fatherNid || '—'} mono />
                <Field label="Mother's name (English)" value={app.motherNameEn} />
                <Field label="Mother's name (Bangla)" value={app.motherNameBn || '—'} />
                <Field label="Mother's NID" value={app.motherNid || '—'} mono />
                <Field label="Primary email contact" value={app.emailAddress} mono />
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <IconBell className="h-4 w-4" /> Emergency SMS communications
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Guardian name (EN / BN)" value={`${app.guardianNameEn || '—'} (${app.guardianNameBn || '—'})`} />
                <Field label="SMS mobile phone number" value={app.parentPhone || app.guardianPhone} mono accent />
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <IconMoney className="h-4 w-4" /> MFS settle audit
              </h3>
              <div className="mt-4 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                <Row label="Class intake" value={app.targetClass} mono />
                <Row label="Payment gateway" value={app.paymentMethod || 'bKash'} />
                <Row label="Paid fees" value={`৳${app.paidAmount || '0'} BDT`} mono />
                <div className="flex flex-col gap-0.5 border-t border-slate-200 pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Transaction reference ID</span>
                  <span className="font-mono text-xs font-bold tracking-tight text-slate-900">{app.paymentTxnId || 'MOCK-TX-CODE'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 text-center">
              <h3 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                <IconClipboard className="h-4 w-4" /> Intake assessment
              </h3>
              <div className="py-4">
                <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">Current verification status</span>
                <span className="mt-2 inline-block">
                  <Badge tone={statusTone}>{app.applicationStatus || 'Pending evaluation'}</Badge>
                </span>
              </div>

              {app.applicationStatus === 'Pending' || !app.applicationStatus ? (
                <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">
                  <button onClick={() => handleAction('Approved')} className={`${btnPrimary} w-full`}>
                    <IconCheckCircle className="h-4 w-4" /> Approve & dispatch
                  </button>
                  <button onClick={() => handleAction('Rejected')} className={`${btnDanger} w-full text-xs`}>
                    <IconX className="h-4 w-4" /> Decline entry request
                  </button>
                </div>
              ) : (
                <p className="border-t border-slate-100 pt-3 text-[11px] font-medium italic text-slate-400">
                  This record has already been processed and locked.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const Field = ({ label, value, mono, accent }) => (
  <div>
    <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</span>
    <span className={`text-sm font-semibold ${mono ? 'font-mono' : ''} ${accent ? 'text-brand-600' : 'text-slate-800'}`}>{value || '—'}</span>
  </div>
);

const Row = ({ label, value, mono }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-slate-400">{label}</span>
    <span className={`font-bold text-slate-900 ${mono ? 'font-mono' : ''}`}>{value}</span>
  </div>
);

export default AdminApplicationDetails;
