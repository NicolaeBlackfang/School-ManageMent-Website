import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 flex flex-col items-center justify-center font-sans text-xs">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 print:border-0 print:shadow-none">

        {/* Header Ribbon Area */}
        <div className="flex justify-between items-center border-b pb-4 print:hidden">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">📝 Institutional Intake Admission Portal</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Complete dual-language profiling records arrays to request student enrollment options.</p>
          </div>
          <button onClick={() => navigate('/')} className="px-3 py-1.5 border bg-slate-50 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100 transition-all cursor-pointer">← Home Portal</button>
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl border font-bold ${message.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-800 border-blue-200'} print:hidden`}>
            {message.text}
          </div>
        )}

        {/* STEP 1: DEEP BIOGRAPHICAL FIELDS GRID LISTING ROW */}
        {step === 1 && (
          <form onSubmit={handleRegistrationSubmit} className="space-y-6">

            {/* Subsection 1: Student biographicals blocks */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-wide border-b pb-1">👨‍🎓 Student Biographical Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Student Full Name (English)</label>
                  <input type="text" required name="studentNameEn" value={formData.studentNameEn} onChange={handleFormChange} placeholder="e.g. John Doe" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">শিক্ষার্থীর পূর্ণ নাম (বাংলায়)</label>
                  <input type="text" required name="studentNameBn" value={formData.studentNameBn} onChange={handleFormChange} placeholder="যেমন: জন ডো" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Class Target</label>
                  <select name="targetClass" value={formData.targetClass} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-white text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    <option value="Grade 10-A">Grade 10-A</option>
                    <option value="Grade 10-B">Grade 10-B</option>
                    <option value="Grade 11-A">Grade 11-A</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date of Birth (DOB)</label>
                  <input type="date" required name="dateOfBirth" value={formData.dateOfBirth} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Birth Certificate Number</label>
                  <input type="text" required name="birthCertificateNo" value={formData.birthCertificateNo} onChange={handleFormChange} placeholder="17-Digit Digital Token String" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email for Communications</label>
                  <input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleFormChange} placeholder="contact@domain.com" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Subsection 2: Parents logs matrix fields columns */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-wide border-b pb-1">👪 Parents Profile Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Father's Name (English)</label>
                  <input type="text" required name="fatherNameEn" value={formData.fatherNameEn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">পিতার নাম (বাংলায়)</label>
                  <input type="text" required name="fatherNameBn" value={formData.fatherNameBn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Father's NID Number (Optional)</label>
                  <input type="text" name="fatherNid" value={formData.fatherNid} onChange={handleFormChange} placeholder="Smart Card or National ID No" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mother's Name (English)</label>
                  <input type="text" required name="motherNameEn" value={formData.motherNameEn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">মাতার নাম (বাংলায়)</label>
                  <input type="text" required name="motherNameBn" value={formData.motherNameBn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mother's NID Number (Optional)</label>
                  <input type="text" name="motherNid" value={formData.motherNid} onChange={handleFormChange} placeholder="Smart Card or National ID No" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Parent Phone Number (🔒 Stamped for Target SMS Alert logs)</label>
                <input type="tel" required name="parentPhone" value={formData.parentPhone} onChange={handleFormChange} placeholder="017XXXXXXXX" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Subsection 3: Guardian backups references indicators */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-wide border-b pb-1">🛡️ Emergency Legal Guardian Backup</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Guardian Name (English)</label>
                  <input type="text" name="guardianNameEn" value={formData.guardianNameEn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">অভিভাবকের নাম (বাংলায়)</label>
                  <input type="text" name="guardianNameBn" value={formData.guardianNameBn} onChange={handleFormChange} className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Guardian Active Contact Phone</label>
                  <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleFormChange} placeholder="018XXXXXXXX" className="w-full border rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-mono" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer">
              {submitting ? 'Encrypting Payload Logs...' : 'Submit Bio-Profile Details & Proceed to Fee Payment'}
            </button>
          </form>
        )}

        {/* STEP 2: DIGITAL INTERACTIVE WALLETS FEES CHECKOUT PORTAL OVERLAY CONTAINER */}
        {step === 2 && (
          <form onSubmit={handleVerifyFeePayment} className="max-w-md mx-auto space-y-6 animate-fade-in text-center">
            <div className="space-y-2">
              <span className="bg-amber-50 border border-amber-100 text-amber-700 font-black px-2.5 py-0.5 rounded-lg text-[10px] tracking-wider uppercase">Secure Fee Checkout</span>
              <h3 className="text-lg font-black text-slate-900">Admission Form Fee Settle Pass</h3>
              <div className="text-3xl font-black text-blue-600">৳{payableFee}.00 BDT</div>
              <p className="text-xs text-slate-500">Please select a mobile banking platform, send ৳{payableFee} to our merchant wallet, and supply the return TxnID tracking handle string below.</p>
            </div>

            <div className="flex justify-center gap-2">
              {['bKash', 'Nagad', 'Rocket'].map(mfs => (
                <button key={mfs} type="button" onClick={() => setMfsGateway(mfs)} className={`px-4 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${mfsGateway === mfs ? 'bg-slate-900 text-white font-extrabold shadow-sm' : 'bg-white text-slate-500'}`}>
                  {mfs}
                </button>
              ))}
            </div>

            <div className="space-y-2 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Input 8-10 Digit Electronic Transaction ID (TxnID)</label>
              <input type="text" required value={txnId} onChange={(e) => setTxnId(e.target.value.toUpperCase())} placeholder="e.g. BLX8903KLA" className="w-full bg-white text-gray-900 border rounded-xl px-4 py-2.5 font-mono font-black text-center tracking-widest text-sm focus:ring-2 focus:ring-blue-500 uppercase" />
            </div>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer">
              {submitting ? 'Verifying Gateway Nodes...' : 'Verify Transaction & Unlock Receipt'}
            </button>
          </form>
        )}

        {/* STEP 3: CONFIRMATION SLIP & PRINT VIEW */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="h-14 w-14 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-sm">✓</div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">Admission Fee Handshake Completed!</h3>
              <p className="text-xs text-slate-500 font-mono">APPLICATION ID: #{appId.slice(-8).toUpperCase()}</p>
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto">Your admission application and verification fee slip have been successfully logged to the server database. Print or save this official receipt for future tracking.</p>
            <div className="flex justify-center gap-3 print:hidden">
              <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm">
                🖨️ Print Itemized Admission Slip
              </button>
              <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer">
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