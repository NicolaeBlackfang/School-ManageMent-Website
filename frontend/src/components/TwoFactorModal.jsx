import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800">Two-Factor Authentication</h3>
        <p className="mt-2 text-sm text-gray-600">Enter the 6-digit verification code sent to your device.</p>
        
        {error && <div className="mt-3 rounded bg-red-100 p-2 text-sm text-red-600">{error}</div>}
        
        <form onSubmit={handleVerify2FA} className="mt-4 space-y-4">
          <input 
            type="text" 
            placeholder="123456" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            maxLength="6"
            required 
            className="w-full text-center tracking-widest text-lg rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none"
          />
          <div className="flex space-x-3">
            <button 
              type="submit" 
              className="flex-1 rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700"
            >
              Verify
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 rounded-lg bg-gray-200 py-2 text-gray-700 font-medium hover:bg-gray-300"
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