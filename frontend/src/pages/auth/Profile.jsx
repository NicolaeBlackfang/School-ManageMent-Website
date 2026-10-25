// src/pages/auth/Profile.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { errorMessage } from '../../core/api.js';
import { useAuth } from '../../hooks/useAuth.js';
import TwoFactorModal from '../../components/TwoFactorModal.jsx';
import ProfilePhotoPicker from '../../components/ProfilePhotoPicker.jsx';
import { IconLogOut, IconUser, IconShield, IconLock } from '../../components/icons.jsx';
import { PageContainer, Card, inputClass, labelClass, btnPrimary, btnSecondary, btnDanger } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const canEditProfile = !['teacher', 'student'].includes(user?.role);

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
  const [loading, setLoading] = useState(false);

  // 2FA controls
  const [setupTicket, setSetupTicket] = useState(null);
  const [disableCode, setDisableCode] = useState('');
  const [disableBusy, setDisableBusy] = useState(false);

  const flash = (text, type = 'info') => toast.push(text, type);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatePayload = { name, profileImage: previewUrl };
      const { data } = await api.put('/auth/profile', updatePayload);
      updateUser(data.user);
      flash('Profile successfully synchronized.', 'success');
    } catch (err) {
      flash(errorMessage(err, 'Your profile could not be updated. Check your connection and try again.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const beginSetup = async () => {
    try {
      const { data } = await api.post('/auth/2fa/setup');
      setSetupTicket({ secret: data.secret, otpauthUrl: data.otpauthUrl, qrCode: data.qrCode });
    } catch (err) {
      flash(errorMessage(err, 'Two-factor setup could not be started. Please try again.'), 'error');
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
      flash(errorMessage(err, 'That code did not work. Check it and try again.'), 'error');
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
              <p className="text-sm text-white/80">{canEditProfile ? 'Manage your profile picture and personal details.' : 'Your profile details are view-only.'}</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
              {canEditProfile ? 'Update your display name and photo here. Email changes are managed by a school administrator.' : 'You can view your details here. Contact an administrator to request a correction.'}
            </div>

            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                {canEditProfile ? <ProfilePhotoPicker value={previewUrl} name={name} onChange={setPreviewUrl} /> : (previewUrl ? <img src={previewUrl} alt="Profile" className="h-28 w-28 rounded-2xl object-cover" /> : <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-bold text-indigo-700">{name.slice(0, 1).toUpperCase()}</div>)}

                <div className="w-full space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="profile-name" className={labelClass}>Full Identity Name</label>
                      <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!canEditProfile}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-email" className={labelClass}>Email Address</label>
                      <input
                        id="profile-email"
                        type="email"
                        value={email}
                        readOnly
                        aria-describedby="profile-email-help"
                        className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
                      />
                      <p id="profile-email-help" className="mt-1 text-xs text-slate-500">Email changes are managed by your school administrator.</p>
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
                    {canEditProfile && <button type="submit" disabled={loading} className={`${btnPrimary} sm:w-auto`}>
                      {loading ? 'Saving...' : 'Update Details'}
                    </button>}
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
