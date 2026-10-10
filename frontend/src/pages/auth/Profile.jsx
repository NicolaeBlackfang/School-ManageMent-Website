// src/pages/auth/Profile.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import defaultAvatar from '../../assets/react.svg';
import { IconUpload, IconLogOut, IconUser } from '../../components/icons.jsx';
import { PageContainer, Card, MessageBanner, inputClass, labelClass, btnPrimary, btnDanger } from '../../components/ui.jsx';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const isParent = user?.role === 'parent';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit to save Atlas storage space
        setMessage({ text: '❌ Image must be smaller than 1MB.', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // This is the Base64 text string
      };
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      // Only send name and email if the user is a parent; others only update the profile image
      const updatePayload = isParent
        ? { name, email, profileImage: previewUrl }
        : { profileImage: previewUrl };

      // Send the data directly to your existing update endpoint
      const { data } = await axios.put('http://localhost:5000/api/auth/profile', updatePayload, config);

      const updatedSession = {
        ...user,
        name: data.name || user.name,
        email: data.email || user.email,
        profileImage: data.profileImage
      };
      localStorage.setItem('schoolUser', JSON.stringify(updatedSession));

      setMessage({ text: '✔ Profile successfully synchronized to Atlas!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to update profile.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="max-w-4xl">
      <div className="space-y-6">
        <div className="animate-fade-up space-y-6">
          <Card className="overflow-hidden">
            <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-brand-600 to-sky-500 px-6 py-5 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <IconUser className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Account Settings</h1>
                <p className="text-sm text-white/80">Manage your profile picture and personal details.</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <MessageBanner message={message} />

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
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={previewUrl || defaultAvatar}
                      alt="Profile"
                      className="h-24 w-24 rounded-2xl border-2 border-brand-200 object-cover shadow-sm"
                    />
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600">
                      <IconUpload className="h-4 w-4" />
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    {!isParent && (
                      <p className="max-w-[160px] text-center text-[11px] leading-snug text-slate-400">
                        You are only allowed to update your profile picture.
                      </p>
                    )}
                  </div>

                  {/* Fields */}
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

                    <div className="flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => { logout(); navigate('/login'); }}
                        className={`${btnDanger} sm:w-auto`}
                      >
                        <IconLogOut className="h-4 w-4" /> Logout Account
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`${btnPrimary} sm:w-auto`}
                      >
                        {loading ? 'Saving adjustments...' : 'Update Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;