// src/pages/auth/Profile.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import TwoFactorModal from '../../components/TwoFactorModal.jsx';
import defaultAvatar from '../../assets/react.svg';
import { IconUpload, IconLogOut, IconUser, IconShield, IconLock } from '../../components/icons.jsx';
import { PageContainer, Card, inputClass, labelClass, btnPrimary, btnSecondary, btnDanger } from '../../components/ui.jsx';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // 2FA controls
  const [setupTicket, setSetupTicket] = useState(null);
  const [disableCode, setDisableCode] = useState('');
  const [disableBusy, setDisableBusy] = useState(false);

  const isParent = user?.role === 'parent';

  const flash = (text, type = 'info') => setMessage({ text, type });
  const messageStyle =
    message.type === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-700'
      : message.type === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : 'border-sky-200 bg-sky-50 text-sky-700';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      flash('Image must be smaller than 1MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatePayload = isParent ? { name, email, profileImage: previewUrl } : { profileImage: previewUrl };
      const { data } = await api.put('/auth/profile', updatePayload);
      updateUser(data.user);
      flash('Profile successfully synchronized.', 'success');
    } catch (err) {
      flash(err.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const beginSetup = async () => {
    try {
      const { data } = await api.post('/auth/2fa/setup');
      setSetupTicket({ secret: data.secret, otpauthUrl: data.otpauthUrl, qrCode: data.qrCode });
    } catch (err) {
      flash(err.response?.data?.message || 'Could not start 2FA setup.', 'error');
    }
  };

  const disable2FA = async () => {
    setDisableBusy(true);
    try {
      await api.post('/auth/2fa/disable', { code: disableCode });
      updateUser({ twoFactorEnabled: false });
      setDisableCode('');
      flash('Two-factor authentication disabled.', 'success');
    } catch (err) {
      flash(err.response?.data?.message || 'Invalid code.', 'error');
    } finally {
      setDisableBusy(false);
    }
  };

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-4 border-b border-slate-200 bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-5 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <IconUser className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold tracking-tight">Account Settings</h1>
              <p className="text-sm text-white/80">Manage your profile picture and personal details.</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {message.text && (
              <div className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${messageStyle}`}>
                {message.text}
              </div>
            )}

            {!isParent && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
                <span className="mt-0.5">ℹ️</span>
                <span>
                  As a {user?.role}, you can only update your profile picture. Name and email modifications are restricted.
                </span>
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={previewUrl || defaultAvatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-2xl border-2 border-brand-200 object-cover shadow-sm"
                  />
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600">
                    <IconUpload className="h-4 w-4" />
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                  </label>
                  {!isParent && (
                    <p className="max-w-[160px] text-center text-[11px] leading-snug text-slate-400">
                      You are only allowed to update your profile picture.
                    </p>
                  )}
                </div>

                <div className="w-full space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="profile-name" className={labelClass}>Full Identity Name</label>
                      <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isParent}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-email" className={labelClass}>Email Address</label>
                      <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isParent}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse items-stretch gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => { logout(); navigate('/'); }}
                      className={`${btnDanger} sm:w-auto`}
                    >
                      <IconLogOut className="h-4 w-4" /> Logout Account
                    </button>
                    <button type="submit" disabled={loading} className={`${btnPrimary} sm:w-auto`}>
                      {loading ? 'Saving...' : 'Update Details'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>

        {/* Security card: 2FA */}
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-100 text-brass-600">
              <IconShield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">Two-Factor Authentication</h2>
              <p className="text-xs text-slate-500">TOTP codes from any authenticator app (Google Authenticator, Authy…).</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {!user?.twoFactorEnabled ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-sm text-slate-600">
                  Your account is currently protected by password only. Enabling 2FA adds a time-based code that keeps
                  your session safe even if your password is ever compromised.
                </p>
                <button type="button" onClick={beginSetup} className={`${btnSecondary} shrink-0`}>
                  <IconLock className="h-4 w-4" /> Enable 2FA
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <IconShield className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Enabled</p>
                    <p className="text-xs text-emerald-700/80">Every sign-in now requires your authenticator code.</p>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <label htmlFor="disable-code" className={labelClass}>Confirm current code to disable</label>
                  <div className="flex gap-2">
                    <input
                      id="disable-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={disableCode}
                      onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
                      className={`${inputClass} text-center tracking-widest`}
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      disabled={disableBusy || disableCode.length !== 6}
                      onClick={disable2FA}
                      className={`${btnSecondary} shrink-0`}
                    >
                      {disableBusy ? '...' : 'Disable'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {setupTicket && (
        <TwoFactorModal
          mode="setup"
          qrCode={setupTicket.qrCode}
          secret={setupTicket.secret}
          otpauthUrl={setupTicket.otpauthUrl}
          onClose={() => setSetupTicket(null)}
          onSuccess={() => {
            setSetupTicket(null);
            updateUser({ twoFactorEnabled: true });
            flash('Two-factor authentication enabled.', 'success');
          }}
        />
      )}
    </PageContainer>
  );
};

export default Profile;