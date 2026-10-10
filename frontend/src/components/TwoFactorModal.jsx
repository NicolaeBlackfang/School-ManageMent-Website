// src/components/TwoFactorModal.jsx
// NOTE: This component is currently not wired into any route/flow (as of the redesign).
// Purely a restyle; logic, state, props and API contract are unchanged.
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconShield, IconX } from './icons.jsx';
import { inputClass } from './ui.jsx';

const TwoFactorModal = ({ userId, onClose }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/verify-2fa', { userId, code });
      login(res.data.user, res.data.token);
      onClose();
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid 2FA code');
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

        <h3 className="mt-4 text-lg font-bold text-slate-900">Two-Factor Authentication</h3>
        <p className="mt-1 text-sm text-slate-500">Enter the 6-digit verification code sent to your device.</p>

        {error && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify2FA} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
            className={`${inputClass} text-center text-lg tracking-[0.5em]`}
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Verify
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