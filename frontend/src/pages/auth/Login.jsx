// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import TwoFactorModal from '../../components/TwoFactorModal.jsx';
import AuthFrame from '../../components/auth/AuthFrame.jsx';
import { IconShield, IconLock } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { roleHome } from '../../core/nav.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pending2FA, setPending2FA] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    try {
      result = await login(email.trim(), password);
    } catch {
      result = { success: false, message: 'We could not connect right now. Check your internet connection and try again.' };
    } finally {
      setLoading(false);
    }

    if (result.twoFactorRequired) {
      setPending2FA(result.user); // password accepted → show authenticator step
      return;
    }
    if (result.success) {
      navigate(roleHome(result.user.role), { replace: true });
    } else {
      setError(result.message);
    }
  };

  const on2FASuccess = (authedUser) => {
    setPending2FA(null);
    navigate(roleHome(authedUser.role), { replace: true });
  };

  return (
    <>
    <AuthFrame title="Login" description="Welcome back. Login to reach your school workspace.">
      {error && <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"><IconLock className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div><label htmlFor="email" className={labelClass}>Email address</label><input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@school.com" /></div>
        <div><label htmlFor="password" className={labelClass}>Password</label><input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Enter your password" /></div>
        <button type="submit" disabled={loading} className={`${btnPrimary} w-full justify-center py-3 disabled:cursor-wait disabled:opacity-60`}>
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500"><IconShield className="h-4 w-4 text-indigo-600" />Secure school account access</div>
      <p className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">New to the portal?{' '}<Link to="/signup" className="font-semibold text-indigo-700 hover:text-indigo-900">Sign up</Link></p>
    </AuthFrame>
    {pending2FA && (
        <TwoFactorModal mode="login" onClose={() => setPending2FA(null)} onSuccess={on2FASuccess} />
      )}
    </>
  );
};

export default Login;
