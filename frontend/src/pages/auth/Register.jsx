// src/pages/auth/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Wordmark from '../../components/layout/Wordmark.jsx';
import { IconShield, IconLock } from '../../components/icons.jsx';
import { inputClass, labelClass, btnPrimary } from '../../components/ui.jsx';
import { roleHome } from '../../core/nav.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate(roleHome(result.user.role), { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-paper px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 flex flex-col items-center gap-4 text-center lg:hidden">
          <Wordmark />
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <IconShield className="h-7 w-7" />
          </div>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            Create a Parent Account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">Join the school portal in under a minute.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(23_20_16/0.05)] sm:p-8">
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              <IconLock className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm" className={labelClass}>Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={inputClass}
                placeholder="Repeat your password"
              />
            </div>

            <button type="submit" disabled={loading} className={`${btnPrimary} w-full py-3`}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <IconShield className="h-3.5 w-3.5" /> Your details are encrypted and never shared
        </p>
      </div>
    </div>
  );
};

export default Register;