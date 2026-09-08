// src/pages/Profile.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import defaultAvatar from '../../assets/react.svg'; // Default avatar image for users without a profile picture

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [previewUrl, setPreviewUrl] = useState(user?.profileImage || '');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    // 🟢 Convert file binary to Base64 Text String
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

            // Send the data directly to your existing update endpoint
            const { data } = await axios.put('http://localhost:5000/api/auth/profile', {
                name,
                email,
                profileImage: previewUrl // Saves directly into MongoDB Atlas
            }, config);

            const updatedSession = { ...user, name: data.name, email: data.email, profileImage: data.profileImage };
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
        <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">👤 Account Settings (Atlas Cloud)</h1>

                {message.text && (
                    <div className={`mt-4 p-3 rounded-xl text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="mt-6 space-y-6">
                    <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
                        <img
                            src={previewUrl && previewUrl !== "" ? previewUrl : defaultAvatar}
                            alt="Avatar Preview"
                            className="h-20 w-20 rounded-full object-cover border-2 border-blue-500 p-0.5 shadow-sm"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm">Profile Avatar Image</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-2 text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Identity Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button type="button" onClick={() => { logout(); navigate('/login'); }} className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl font-semibold text-sm transition-colors cursor-pointer">
                            Logout Account
                        </button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-colors disabled:bg-blue-400 cursor-pointer">
                            {loading ? 'Saving adjustments...' : 'Update Details'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
