// src/pages/teacher/TeacherEditStudent.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../core/api.js';
import defaultAvatar from '../../assets/react.svg';
import { PageContainer, Card, Spinner, MessageBanner, inputClass, labelClass, btnPrimary, btnSecondary } from '../../components/ui.jsx';
import { IconEdit, IconBack } from '../../components/icons.jsx';

const TeacherEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [globalClasses, setGlobalClasses] = useState([]);

  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const configRes = await api.get('/config');
        if (configRes.data.success) setGlobalClasses(configRes.data.data.classes || []);

        const { data } = await api.get('/teacher/my-scope');
        let match = null;
        Object.values(data.data?.studentsByClass || {}).forEach((list) => {
          const found = list.find((s) => s._id === id);
          if (found) match = found;
        });

        if (match) {
          setName(match.name);
          setEmail(match.email);
          setParentContact(match.parentContact);
          setGradeClass(match.gradeClass);
          setProfileImage(match.profileImage || '');
          setRollNumber(match.rollNumber || '1');
        } else {
          setMsg({ text: 'Student record was not found in your assigned class.', type: 'error' });
        }
      } catch {
        setMsg({ text: 'Failed to synchronize profile records.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: '', type: '' });
    try {
      const payload = { name, email, parentContact, gradeClass, rollNumber: Number(rollNumber) };
      await api.put(`/teacher/users/edit/${id}`, payload);
      setMsg({ text: 'Student record synchronized successfully.', type: 'success' });
      setTimeout(() => navigate('/t/roster'), 1200);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Failed to apply changes.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageContainer><div className="flex min-h-[40vh] items-center justify-center"><Spinner /></div></PageContainer>;
  }

  return (
    <PageContainer className="max-w-3xl">
      <div className="animate-fade-up space-y-6">
        <Link
          to="/t/roster"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <IconBack className="h-4 w-4" /> Back to directory
        </Link>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
            <img src={profileImage || defaultAvatar} alt="Avatar" className="h-16 w-16 rounded-full border bg-slate-50 object-cover" />
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">Modify Student Parameters</h1>
              <p className="text-sm text-slate-500">
                Management scope: <span className="font-semibold text-brand-700">{gradeClass}</span>
              </p>
            </div>
          </div>

          <MessageBanner message={msg} />

          <form onSubmit={handleUpdateSubmit} className="mt-2 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Student name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Student email address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} font-mono`} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Modify class roll position</label>
                <select value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required className={`${inputClass} cursor-pointer`}>
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>Roll #{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Emergency parent phone</label>
                <input type="text" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Update class assignment</label>
              <select value={gradeClass} onChange={(e) => setGradeClass(e.target.value)} required className={`${inputClass} cursor-pointer`}>
                {(globalClasses.length ? globalClasses : [gradeClass]).map((className, idx) => (
                  <option key={idx} value={className}>{className}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => navigate('/t/roster')} className={`${btnSecondary} cursor-pointer`}>
                Cancel
              </button>
              <button type="submit" disabled={saving} className={`${btnPrimary} cursor-pointer`}>
                <IconEdit className="h-4 w-4" />
                {saving ? 'Applying changes...' : 'Save changes'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default TeacherEditStudent;