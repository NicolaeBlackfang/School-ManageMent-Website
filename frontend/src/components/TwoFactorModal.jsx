// src/components/TwoFactorModal.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { IconShield, IconX } from './icons.jsx';
import { inputClass } from './ui.jsx';

// mode = 'login'  → completes the 2FA step of a sign-in (preauth cookie already set)
// mode = 'setup'  → confirms a freshly generated TOTP secret (QR + manual key shown)
const TwoFactorModal = ({ mode = 'login', qrCode, secret, onClose, onSuccess }) => {
  const { verify2FA } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await verify2FA(code.trim());
    setLoading(false);
    if (res.success) {
      onSuccess?.(res.user);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-scale-in rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <IconShield className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <h3 className="font-display mt-4 text-xl font-semibold tracking-tight text-slate-900">
          Two-Factor Authentication
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {mode === 'setup'
            ? 'Scan the code with your authenticator app, then confirm it with a 6-digit code.'
            : 'Enter the 6-digit code from your authenticator app to finish Login.'}
        </p>

        {mode === 'setup' && qrCode && (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <img src={qrCode} alt="QR code for authenticator setup" className="h-40 w-40 rounded-lg bg-white p-1" />
            {secret && (
              <div className="w-full">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Manual entry key
                </p>
                <code className="block w-full rounded-lg bg-white px-3 py-2 text-xs break-all text-brand-700 ring-1 ring-slate-200">
                  {secret}
                </code>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            required
            className={`${inputClass} text-center text-lg tracking-[0.5em]`}
            autoFocus
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? 'Verifying...' : mode === 'setup' ? 'Enable 2FA' : 'Verify'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorModal;
