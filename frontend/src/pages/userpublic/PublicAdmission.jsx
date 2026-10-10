import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';

const PublicAdmission = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Form Entry, 2 = Fee Checkout, 3 = Confirmation Slip View
  const [appId, setAppId] = useState('');
  const [payableFee, setPayableFee] = useState(500);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // MFS Input Sub-states
  const [mfsGateway, setMfsGateway] = useState('bKash');
  const [txnId, setTxnId] = useState('');

  // Dual-Language Registration Payload Setup
  const [formData, setFormData] = useState({
    studentNameEn: '', studentNameBn: '', dateOfBirth: '', birthCertificateNo: '', targetClass: 'Grade 10-A', emailAddress: '',
    fatherNameEn: '', fatherNameBn: '', fatherNid: '', motherNameEn: '', motherNameBn: '', motherNid: '',
    parentPhone: '', guardianNameEn: '', guardianNameBn: '', guardianPhone: ''
  });

  const handleFormChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });
    try {
      const { data } = await axios.post('http://localhost:5000/api/public/apply', formData);
      if (data.success) {
        setAppId(data.applicationId);
        setPayableFee(data.payableAmount || 500);
        setStep(2); // Push forward to the digital gateway fee verification pass instantly
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
      alert("Please provide a valid MFS Transaction ID.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/public/pay-admission/${appId}`, {
        paymentMethod: mfsGateway, txnId, amount: payableFee
      });
      if (data.success) setStep(3); // Render complete itemized PDF slip desk
    } catch (err) {
      alert("Handshake verification error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-xs sm:p-6">
      <div className="w-full max-w-4xl space-y-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xl sm:p-8 print:border-0 print:shadow-none">

        {/* Header Ribbon Area */}
        <div className="flex items-center justify-between border-b pb-4 print:hidden">
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">📝 Institutional Intake Admission Portal</h2>
            <p className="mt-0.5 text-xs font-medium text-slate-400">Complete dual-language profiling records arrays to request student enrollment options.</p>
          </div>
          <button onClick={() => navigate('/')} className="cursor-pointer rounded-xl border bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-100">← Home Portal</button>
        </div>

        {message.text && (
          <div className={`rounded-xl border p-3 font-bold ${message.type === 'error' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-sky-200 bg-sky-50 text-sky-800'} print:hidden`}>
            {message.text}
          </div>
        )}

        {/* STEP 1: DEEP BIOGRAPHICAL FIELDS GRID LISTING ROW */}
        {step === 1 && (
          <form onSubmit={handleRegistrationSubmit} className="space-y-7">

            {/* Subsection 1: Student biographicals blocks */}
            <div className="space-y-3">
              <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wide text-brand-600">👨‍🎓 Student Biographical Information</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Student Full Name (English)</label>
                  <input type="text" required name="studentNameEn" value={formData.studentNameEn} onChange={handleFormChange} placeholder="e.g. John Doe" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>শিক্ষার্থীর পূর্ণ নাম (বাংলায়)</label>
                  <input type="text" required name="studentNameBn" value={formData.studentNameBn} onChange={handleFormChange} placeholder="যেমন: জন ডো" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Target Class Target</label>
                  <select name="targetClass" value={formData.targetClass} onChange={handleFormChange} className={`${inputClass} cursor-pointer font-bold`}>
                    <option value="Grade 10-A">Grade 10-A</option>
                    <option value="Grade 10-B">Grade 10-B</option>
                    <option value="Grade 11-A">Grade 11-A</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Date of Birth (DOB)</label>
                  <input type="date" required name="dateOfBirth" value={formData.dateOfBirth} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Birth Certificate Number</label>
                  <input type="text" required name="birthCertificateNo" value={formData.birthCertificateNo} onChange={handleFormChange} placeholder="17-Digit Digital Token String" className={`${inputClass} font-mono font-bold`} />
                </div>
                <div>
                  <label className={labelClass}>Email for Communications</label>
                  <input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleFormChange} placeholder="contact@domain.com" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Subsection 2: Parents logs matrix fields columns */}
            <div className="space-y-3">
              <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wide text-brand-600">👪 Parents Profile Matrix</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Father's Name (English)</label>
                  <input type="text" required name="fatherNameEn" value={formData.fatherNameEn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>পিতার নাম (বাংলায়)</label>
                  <input type="text" required name="fatherNameBn" value={formData.fatherNameBn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Father's NID Number (Optional)</label>
                  <input type="text" name="fatherNid" value={formData.fatherNid} onChange={handleFormChange} placeholder="Smart Card or National ID No" className={`${inputClass} font-mono`} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Mother's Name (English)</label>
                  <input type="text" required name="motherNameEn" value={formData.motherNameEn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>মাতার নাম (বাংলায়)</label>
                  <input type="text" required name="motherNameBn" value={formData.motherNameBn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mother's NID Number (Optional)</label>
                  <input type="text" name="motherNid" value={formData.motherNid} onChange={handleFormChange} placeholder="Smart Card or National ID No" className={`${inputClass} font-mono`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Primary Parent Phone Number (🔒 Stamped for Target SMS Alert logs)</label>
                <input type="tel" required name="parentPhone" value={formData.parentPhone} onChange={handleFormChange} placeholder="017XXXXXXXX" className={`${inputClass} font-mono font-bold`} />
              </div>
            </div>

            {/* Subsection 3: Guardian backups references indicators */}
            <div className="space-y-3">
              <h3 className="border-b pb-1 text-xs font-black uppercase tracking-wide text-brand-600">🛡️ Emergency Legal Guardian Backup</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Guardian Name (English)</label>
                  <input type="text" name="guardianNameEn" value={formData.guardianNameEn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>অভিভাবকের নাম (বাংলায়)</label>
                  <input type="text" name="guardianNameBn" value={formData.guardianNameBn} onChange={handleFormChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Guardian Active Contact Phone</label>
                  <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleFormChange} placeholder="018XXXXXXXX" className={`${inputClass} font-mono`} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting} className={`${btnPrimary} w-full py-3 uppercase tracking-wider`}>
              {submitting ? 'Encrypting Payload Logs...' : 'Submit Bio-Profile Details & Proceed to Fee Payment'}
            </button>
          </form>
        )}

        {/* STEP 2: DIGITAL INTERACTIVE WALLETS FEES CHECKOUT PORTAL OVERLAY CONTAINER */}
        {step === 2 && (
          <form onSubmit={handleVerifyFeePayment} className="mx-auto max-w-md animate-fade-in space-y-6 text-center">
            <div className="space-y-2">
              <span className="rounded-lg border border-amber-100 bg-amber-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700">Secure Fee Checkout</span>
              <h3 className="text-lg font-black text-slate-900">Admission Form Fee Settle Pass</h3>
              <div className="text-3xl font-black text-brand-600">৳{payableFee}.00 BDT</div>
              <p className="text-xs text-slate-500">Please select a mobile banking platform, send ৳{payableFee} to our merchant wallet, and supply the return TxnID tracking handle string below.</p>
            </div>

            <div className="flex justify-center gap-2">
              {['bKash', 'Nagad', 'Rocket'].map(mfs => (
                <button key={mfs} type="button" onClick={() => setMfsGateway(mfs)} className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-black transition-all ${mfsGateway === mfs ? 'bg-slate-900 font-extrabold text-white shadow-sm' : 'bg-white text-slate-500'}`}>
                  {mfs}
                </button>
              ))}
            </div>

            <div className="space-y-2 text-left">
              <label className={labelClass}>Input 8-10 Digit Electronic Transaction ID (TxnID)</label>
              <input type="text" required value={txnId} onChange={(e) => setTxnId(e.target.value.toUpperCase())} placeholder="e.g. BLX8903KLA" className={`${inputClass} text-center font-mono text-sm font-black uppercase tracking-widest`} />
            </div>

            <button type="submit" disabled={submitting} className={`${btnPrimary} w-full bg-emerald-600 py-3 uppercase tracking-wider hover:bg-emerald-700`}>
              {submitting ? 'Verifying Gateway Nodes...' : 'Verify Transaction & Unlock Receipt'}
            </button>
          </form>
        )}

        {/* STEP 3: CONFIRMATION SLIP & PRINT VIEW */}
        {step === 3 && (
          <div className="animate-fade-in space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white shadow-sm">✓</div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">Admission Fee Handshake Completed!</h3>
              <p className="font-mono text-xs text-slate-500">APPLICATION ID: #{appId.slice(-8).toUpperCase()}</p>
            </div>
            <p className="mx-auto max-w-md text-xs text-slate-600">Your admission application and verification fee slip have been successfully logged to the server database. Print or save this official receipt for future tracking.</p>
            <div className="flex justify-center gap-3 print:hidden">
              <button onClick={() => window.print()} className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800">
                🖨️ Print Itemized Admission Slip
              </button>
              <button onClick={() => navigate('/')} className="cursor-pointer rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200">
                Return to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PublicAdmission;