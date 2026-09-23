// src/pages/PublicPortal.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PublicPortal = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ welcomeTitle: '', aboutText: '', schoolLogo: '', bannerImage: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/public/info')
      .then(({ data }) => { if (data.success) setInfo(data.data); })
      .catch((err) => console.error(err));
  }, []);

  return (
    // 🟢 FIXED: Removed min-h-screen to lock the entire main container layout straight into your page area without vertical spill overflows
    <div className="w-full bg-slate-50 font-sans p-2 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Compressed Showcase Hero Split Grid Area Row */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="md:col-span-7 space-y-2 pr-0 md:pr-4">
            <span className="inline-block bg-blue-50 border border-blue-100 text-blue-700 font-black px-2 py-0.5 rounded-md text-[9px] tracking-wider uppercase">
              Welcome Desk
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {info.welcomeTitle || 'Welcome to Institutional Excellence'}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-md">
              {info.aboutText ? (info.aboutText.slice(0, 140) + (info.aboutText.length > 140 ? '...' : '')) : 'Empowering future leaders with top-tier educational standard systems.'}
            </p>
          </div>
          
          <div className="md:col-span-5 w-full">
            {info.bannerImage ? (
              // 🟢 FIXED: Drastically minimized graphic height parameter properties to block page spills
              <img src={info.bannerImage} alt="Banner" className="w-full h-32 sm:h-40 object-cover rounded-xl border border-slate-100" />
            ) : (
              <div className="w-full h-32 sm:h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">No active banner image.</div>
            )}
          </div>
        </main>

        {/* Compressed Operational Call-To-Action Portal Cards Row Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs flex flex-col justify-between items-start space-y-3 hover:border-slate-200 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg bg-amber-50 h-8 w-8 border rounded-lg flex items-center justify-center shadow-3xs">
                  📝
                </span>
                <h3 className="text-sm font-bold text-slate-900">Online Admission Desk</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-normal">
                Submit electronic student registration forms to request institutional entry processing and download PDF receipts.
              </p>
            </div>
            <button onClick={() => navigate('/public/admission')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg shadow-3xs cursor-pointer transition-colors">
              Open Form →
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs flex flex-col justify-between items-start space-y-3 hover:border-slate-200 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg bg-blue-50 h-8 w-8 border rounded-lg flex items-center justify-center shadow-3xs">
                  ✨
                </span>
                <h3 className="text-sm font-bold text-slate-900">Founding Board Messages</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-normal">
                Browse quotes, profile parameters, and curated dispatches directly from our institution's leadership pillars.
              </p>
            </div>
            <button onClick={() => navigate('/public/founders')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg shadow-3xs cursor-pointer transition-colors">
              View Board →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PublicPortal;
