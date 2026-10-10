// src/pages/userpublic/PublicAdmission.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import { IconClipboard, IconCheckCircle, IconPrinter, IconBack, IconMoney } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary, btnSecondary, MessageBanner } from '../../components/ui.jsx';

const steps = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'Fee' },
  { id: 3, label: 'Receipt' },
];

const PublicAdmission = () => {
  const [step, setStep] = useState(1);
  const [appId, setAppId] = useState('');
  const [payableFee, setPayableFee] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [mfsGateway, setMfsGateway] = useState('bKash');
  const [txnId, setTxnId] = useState('');

  const [formData, setFormData] = useState({
    studentNameEn: '', studentNameBn: '', dateOfBirth: '', birthCertificateNo: '', targetClass: '', emailAddress: '',
    fatherNameEn: '', fatherNameBn: '', fatherNid: '', motherNameEn: '', motherNameBn: '', motherNid: '',
    parentPhone: '', guardianNameEn: '', guardianNameBn: '', guardianPhone: '',
  });

  const [classOptions, setClassOptions] = useState([]);
  const [fee, setFee] = useState({ collected: '', verified: '' });

  // The target-class list is managed by the admin in Settings (SchoolConfig),
  // not hardcoded, so the admission form always mirrors the live database.
  useEffect(() => {
    api
      .get('/config')
      .then(({ data }) => {
        const classes = Array.isArray(data?.data?.classes) ? data.data.classes : [];
        if (classes.length) {
          setClassOptions(classes);
          setFormData((prev) => ({ ...prev, targetClass: classes[0] }));
        }
      })
      .catch(() => {});
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      const { data } = await api.post('/public/apply', formData);
      if (data.success) {
        setAppId(data.applicationId);
        setPayableFee(data.payableAmount || 500);
        setStep(2);
      }
    } catch (err) {
      setMessage({ text: 'Validation Error: Check your values and retry.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyFeePayment = async (e) => {
    e.preventDefault();
    if (txnId.trim().length < 6) {
      setMessage({ text: 'Please provide a valid MFS Transaction ID (min 6 characters).', type: 'error' });
      return;
    }
    setSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      const { data } = await api.post(`/public/pay-admission/${appId}`, {
        paymentMethod: mfsGateway, txnId, amount: payableFee,
      });
      if (data.success) {
        setFee({ collected: payableFee, verified: new Date().toLocaleString() });
        setStep(3);
      }
    } catch (err) {
      setMessage({ text: 'Handshake verification error. Please re-check the transaction ID.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
              <IconClipboard className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Institutional Intake Portal
              </h1>
              <p className="text-sm text-slate-500">Dual-language registration, fee verification and a printable receipt.</p>
            </div>
          </div>
          <Link to="/" className={`${btnSecondary} self-start`}>
            <IconBack className="h-4 w-4" /> Back home
          </Link>
        </div>

        {/* Stepper */}
        <ol className="mt-8 flex items-center gap-2 print:hidden">
          {steps.map((s, i) => (
            <li key={s.id} className={`flex items-center gap-2 ${i > 0 ? 'flex-1' : ''}`}>
              {i > 0 && <span className={`h-px flex-1 ${step > i ? 'bg-brand-500' : 'bg-slate-200'}`} />}
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-2 ${
                  step >= s.id ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-slate-400 ring-slate-200'
                }`}
              >
                {step > s.id ? <IconCheckCircle className="h-4 w-4" /> : s.id}
              </span>
              <span className={`text-xs font-semibold ${step >= s.id ? 'text-slate-800' : 'text-slate-400'}`}>{s.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 print:border-0 print:shadow-none">
          <MessageBanner message={message} />

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleRegistrationSubmit} className="space-y-8">
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-brand-700">
                  Student Biographical Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Student Full Name (English)</label>
                    <input type="text" required name="studentNameEn" value={formData.studentNameEn} onChange={handleFormChange} placeholder="e.g. John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>শিক্ষার্থীর পূর্ণ নাম (বাংলায়)</label>
                    <input type="text" required name="studentNameBn" value={formData.studentNameBn} onChange={handleFormChange} placeholder="যেমন: জন ডো" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Target Class</label>
                    <select name="targetClass" value={formData.targetClass} onChange={handleFormChange} required className={`${inputClass} cursor-pointer`}>
                      {classOptions.length === 0 && <option value="">Loading classes…</option>}
                      {classOptions.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="date" required name="dateOfBirth" value={formData.dateOfBirth} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Birth Certificate Number</label>
                    <input type="text" required name="birthCertificateNo" value={formData.birthCertificateNo} onChange={handleFormChange} placeholder="17-digit digital token" className={`${inputClass} font-mono`} />
                  </div>
                  <div>
                    <label className={labelClass}>Email for Communications</label>
                    <input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleFormChange} placeholder="contact@domain.com" className={inputClass} />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-brand-700">
                  Parents Profile Matrix
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Father&apos;s Name (English)</label>
                    <input type="text" required name="fatherNameEn" value={formData.fatherNameEn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>পিতার নাম (বাংলায়)</label>
                    <input type="text" required name="fatherNameBn" value={formData.fatherNameBn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Father&apos;s NID (Optional)</label>
                    <input type="text" name="fatherNid" value={formData.fatherNid} onChange={handleFormChange} placeholder="Smart card / NID no" className={`${inputClass} font-mono`} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Mother&apos;s Name (English)</label>
                    <input type="text" required name="motherNameEn" value={formData.motherNameEn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>মাতার নাম (বাংলায়)</label>
                    <input type="text" required name="motherNameBn" value={formData.motherNameBn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Mother&apos;s NID (Optional)</label>
                    <input type="text" name="motherNid" value={formData.motherNid} onChange={handleFormChange} placeholder="Smart card / NID no" className={`${inputClass} font-mono`} />
                  </div>
                </div>
                <div className="sm:max-w-sm">
                  <label className={labelClass}>Primary Parent Phone</label>
                  <input type="tel" required name="parentPhone" value={formData.parentPhone} onChange={handleFormChange} placeholder="017XXXXXXXX" className={`${inputClass} font-mono`} />
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-brand-700">
                  Emergency Legal Guardian Backup
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Guardian Name (English)</label>
                    <input type="text" name="guardianNameEn" value={formData.guardianNameEn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>অভিভাবকের নাম (বাংলায়)</label>
                    <input type="text" name="guardianNameBn" value={formData.guardianNameBn} onChange={handleFormChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Guardian Contact Phone</label>
                    <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleFormChange} placeholder="018XXXXXXXX" className={`${inputClass} font-mono`} />
                  </div>
                </div>
              </section>

              <button type="submit" disabled={submitting} className={`${btnPrimary} w-full py-3.5`}>
                <IconClipboard className="h-4 w-4" />
                {submitting ? 'Submitting profile...' : 'Submit details & proceed to fee payment'}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyFeePayment} className="mx-auto max-w-md space-y-6 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-100">
                  <IconMoney className="h-3.5 w-3.5" /> Secure Fee Checkout
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Admission Form Fee Settle</h2>
                <p className="font-display text-4xl font-semibold text-brand-700">{`\u09F3${payableFee}.00`} BDT</p>
                <p className="mx-auto max-w-sm text-sm text-slate-500">
                  Choose a mobile banking platform, transfer{' '}
                  {`\u09F3${payableFee}.00`} to the school merchant wallet, then enter the return TxnID below.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {['bKash', 'Nagad', 'Rocket'].map((mfs) => (
                  <button
                    key={mfs}
                    type="button"
                    onClick={() => setMfsGateway(mfs)}
                    className={`rounded-xl border px-5 py-2 text-sm font-bold transition ${
                      mfsGateway === mfs ? 'border-brand-600 bg-brand-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:border-brand-300'
                    }`}
                  >
                    {mfs}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-left">
                <label className={labelClass}>Electronic Transaction ID (TxnID)</label>
                <input
                  type="text"
                  required
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value.toUpperCase())}
                  placeholder="e.g. BLX8903KLA"
                  className={`${inputClass} text-center font-mono font-semibold uppercase tracking-widest`}
                />
              </div>

              <button type="submit" disabled={submitting} className={`${btnPrimary} w-full py-3.5`}>
                {submitting ? 'Verifying gateway...' : 'Verify transaction & unlock receipt'}
              </button>
            </form>
          )}

          {/* STEP 3 — printable receipt */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                  <IconCheckCircle className="h-8 w-8" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Admission Fee Verified</h2>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Application ID: #{appId.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Official Payment Receipt</p>
                <dl className="mt-4 divide-y divide-slate-200 text-sm">
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-500">Gateway</dt>
                    <dd className="font-semibold text-slate-800">{mfsGateway}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-500">Transaction ID</dt>
                    <dd className="font-mono font-semibold text-slate-800">{txnId}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-500">Amount Paid</dt>
                    <dd className="font-display font-semibold text-brand-700">{`\u09F3${fee.collected}.00`}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-slate-500">Verified At</dt>
                    <dd className="font-semibold text-slate-800">{fee.verified}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-center text-[10px] text-slate-400">
                  Generated by Scholaris · Keep this slip for office records
                </p>
              </div>

              <div className="flex justify-center gap-3 print:hidden">
                <button type="button" onClick={() => window.print()} className={`${btnPrimary}`}>
                  <IconPrinter className="h-4 w-4" /> Print admission slip
                </button>
                <Link to="/" className={btnSecondary}>
                  <IconBack className="h-4 w-4" /> Return home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicAdmission;