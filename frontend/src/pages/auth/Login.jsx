// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import TwoFactorModal from '../../components/TwoFactorModal.jsx';
import Wordmark from '../../components/layout/Wordmark.jsx';
import { IconShield, IconCheckCircle, IconLock } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { roleHome } from '../../core/nav.js';

const bulletPoints = [
  'Session secured with an HttpOnly cookie — never stored in the browser',
  'Optional Time-based One-Time Passwords (TOTP) via any authenticator app',
  'All traffic routed through our proxy — the API surface stays hidden',
];

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

    const result = await login(email, password);
    setLoading(false);

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
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Editorial left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-900 p-12 lg:flex xl:p-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brass-500/20 blur-3xl" />
        <div className="animate-fade-up relative">
          <Wordmark dark />
        </div>
        <div className="animate-fade-up relative max-w-md">
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
            A calm, secure gateway to your school.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-100/80">
            Welcome back. Sign in to reach your notices, report cards, attendance and more.
          </p>
          <ul className="mt-8 space-y-3">
            {bulletPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-brand-50/90">
                <IconCheckCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-brand-200/60">
          Scholaris · Institution Management Suite
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-paper px-4 py-12 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 lg:hidden">
            <Wordmark />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-1.5 text-sm text-slate-500">Sign in to access your school portal.</p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(23_20_16/0.05)] sm:p-8">
            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <IconLock className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="email@school.com"
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" disabled={loading} className={`${btnPrimary} w-full py-3`}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              New here?{' '}
              <Link to="/register" className="font-semibold text-brand-600 transition hover:text-brand-700">
                Create a parent account
              </Link>
            </p>
          </div>

          <p className="mt-6 hidden items-center justify-center gap-1.5 text-center text-xs text-slate-400 sm:flex">
            <IconShield className="h-3.5 w-3.5" /> Secured session · CSRF &amp; rate-limit protected
          </p>
        </div>
      </div>

      {pending2FA && (
        <TwoFactorModal mode="login" onClose={() => setPending2FA(null)} onSuccess={on2FASuccess} />
      )}
    </div>
  );
};

export default Login;