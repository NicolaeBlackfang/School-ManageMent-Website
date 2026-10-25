// src/pages/AdminCreateUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import { errorMessage } from '../../core/api.js';
import ProfilePhotoPicker from '../../components/ProfilePhotoPicker.jsx';
import {
  PageContainer,
  PageHeader,
  Card,
  Spinner,
  MessageBanner,
  inputClass,
  labelClass,
  btnPrimary,
} from '../../components/ui.jsx';
import { IconBack, IconAlert } from '../../components/icons.jsx';

const AdminCreateUser = () => {
  const navigate = useNavigate();

  // Core identity form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role allocation

  // Isolated collection form state
  const [rollNumber, setRollNumber] = useState('');
  const [extra1, setExtra1] = useState(''); // Grade class for student / department for teacher
  const [extra2, setExtra2] = useState(''); // Parent contact / qualification
  const [guardianName, setGuardianName] = useState('');
  const [classTeacherOf, setClassTeacherOf] = useState('None');
  const [profileImage, setProfileImage] = useState('');

  // Live validation + config state
  const [globalClasses, setGlobalClasses] = useState([]);
  const [existingClassStudents, setExistingClassStudents] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingConfig, setFetchingConfig] = useState(true);

  useEffect(() => {
    const fetchSystemConfiguration = async () => {
      try {
        const { data } = await api.get('/config');
        if (data.success && data.data.classes.length > 0) {
          setGlobalClasses(data.data.classes);
          setExtra1(data.data.classes[0]);
        }
      } catch (error) {
        setMessage({ text: errorMessage(error, 'Class and subject options could not be loaded. Refresh and try again.'), type: 'error' });
      } finally {
        setFetchingConfig(false);
      }
    };
    fetchSystemConfiguration();
  }, []);

  useEffect(() => {
    if (role !== 'student' || !extra1 || fetchingConfig) return;

    const fetchTargetClassRoster = async () => {
      try {
        const { data } = await api.get('/auth/users');
        const classStudents = data.data.filter(u => u.role === 'student' && u.extraField1 === extra1);
        setExistingClassStudents(classStudents);
      } catch (error) {
        setMessage({ text: errorMessage(error, 'We could not check class roll numbers. Refresh before creating a student.'), type: 'error' });
      }
    };

    fetchTargetClassRoster();
  }, [role, extra1, fetchingConfig]);

  const isRollConflict = role === 'student' &&
    rollNumber !== '' &&
    existingClassStudents.some(student => Number(student.rollNumber) === Number(rollNumber));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRollConflict) {
      setMessage({ text: `Submission blocked: Roll #${rollNumber} is already occupied in ${extra1}.`, type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const payload = {
        name,
        email,
        password,
        role,
        rollNumber: role === 'student' ? Number(rollNumber) : undefined,
        extraField1: extra1,
        extraField2: extra2,
        guardianName: role === 'student' ? guardianName : undefined,
        classTeacherOf: role === 'teacher' ? classTeacherOf : 'None',
        profileImage,
      };

      await api.post('/auth/users/create', payload);

      setMessage({ text: `New ${role} account successfully created.`, type: 'success' });
      setTimeout(() => navigate('/a/users'), 1200);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to create new account.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingConfig) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-3xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Create new account"
          subtitle="Generate centralized credentials and register institutional data records."
          actions={
            <button onClick={() => navigate('/a/users')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              <IconBack className="h-4 w-4" /> User control matrix
            </button>
          }
        />

        {isRollConflict && (
          <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            <IconAlert className="h-4.5 w-4.5 shrink-0" />
            <span>Duplication alert: Roll #{rollNumber} is already assigned inside {extra1}. Please choose a different position.</span>
          </div>
        )}

        <MessageBanner message={message} />

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Select portal role assignment</label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setExtra1(e.target.value === 'student' ? (globalClasses[0] || '') : '');
                    setExtra2('');
                    setGuardianName('');
                    setClassTeacherOf('None');
                    setRollNumber('');
                  }}
                  className={inputClass}
                >
                  <option value="student">Student profile</option>
                  <option value="teacher">Teacher / faculty profile</option>
                  <option value="admin">Admin / super operator profile</option>
                  <option value="parent">Parent / guardian profile</option>
                </select>
              </div>

              {role === 'student' && (
                <div>
                  <label className={labelClass}>Assign class roll position</label>
                  <select
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className={`${inputClass} font-bold ${isRollConflict ? 'border-rose-400 bg-rose-50 text-rose-700 focus:ring-rose-500' : ''}`}
                  >
                    <option value="">-- Choose roll position --</option>
                    {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>Roll #{num}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {(role === 'student' || role === 'teacher') && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <p className={`${labelClass} mb-3`}>Profile photo <span className="font-normal normal-case text-slate-400">(optional)</span></p>
                <ProfilePhotoPicker value={profileImage} name={name} onChange={setProfileImage} />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Full identity name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Johnathan Smith" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Official portal email address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" className={`${inputClass} font-mono text-xs`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Initial account password</label>
              <input type="password" required minLength="8" maxLength="128" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  {role === 'student' ? 'Assign grade class room' : role === 'teacher' ? 'Core subject department' : role === 'parent' ? 'Guardian contact phone' : 'Access level'}
                </label>
                {role === 'student' ? (
                  <select value={extra1} onChange={(e) => setExtra1(e.target.value)} required className={inputClass}>
                    {globalClasses.map((className) => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                ) : role === 'teacher' ? (
                  <input type="text" required value={extra1} onChange={(e) => setExtra1(e.target.value)} placeholder="e.g., Mathematics, Physics" className={inputClass} />
                ) : role === 'parent' ? (
                  <input type="text" required value={extra2} onChange={(e) => setExtra2(e.target.value)} placeholder="e.g., +8801XXXXXXXXX" className={inputClass} />
                ) : (
                  <input type="text" disabled value="Full administrator privileges" className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-400`} />
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {role === 'student' ? 'Emergency parent phone' : role === 'teacher' ? 'Educational qualifications' : 'Portal access notes'}
                </label>
                {role === 'student' || role === 'teacher' ? (
                  <input type="text" required value={extra2} onChange={(e) => setExtra2(e.target.value)} placeholder={role === 'student' ? 'e.g., +8801XXXXXXXXX' : 'e.g., M.Sc in Applied Mathematics'} className={inputClass} />
                ) : (
                  <input type="text" disabled value={role === 'parent' ? 'Login → school notices, admission updates' : 'Unrestricted access to every management module'} className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-400`} />
                )}
              </div>
            </div>

            {role === 'student' && (
              <div>
                <label className={labelClass}>Full guardian / parent name</label>
                <input type="text" required value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="e.g., Karim Ahmed" className={inputClass} />
              </div>
            )}

            {role === 'teacher' && (
              <div>
                <label className={labelClass}>Assign class teacher role</label>
                <select value={classTeacherOf} onChange={(e) => setClassTeacherOf(e.target.value)} className={inputClass}>
                  <option value="None">No class assigned (general faculty)</option>
                  {globalClasses.map((className) => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || isRollConflict}
                className={`${btnPrimary} w-full py-3 ${isRollConflict ? 'disabled:bg-rose-300' : ''}`}
              >
                {loading ? 'Instantiating profile...' : isRollConflict ? 'Fix roll conflict' : 'Create account portfolio'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminCreateUser;
