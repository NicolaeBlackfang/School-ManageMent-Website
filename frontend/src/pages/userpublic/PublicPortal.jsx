// src/pages/PublicPortal.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconClipboard, IconSparkles } from '../../components/icons.jsx';

const PublicPortal = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ welcomeTitle: '', aboutText: '', schoolLogo: '', bannerImage: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/public/info')
      .then(({ data }) => { if (data.success) setInfo(data.data); })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full bg-slate-50 p-2 sm:p-4">
      <div className="mx-auto max-w-6xl space-y-4">

        {/* Hero split grid */}
        <main className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm md:grid-cols-12">
          <div className="space-y-2 pr-0 md:col-span-7 md:pr-4">
            <span className="inline-block rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-brand-700 ring-1 ring-brand-100">
              Welcome Desk
            </span>
            <h1 className="text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {info.welcomeTitle || 'Welcome to Institutional Excellence'}
            </h1>
            <p className="max-w-md text-sm font-medium leading-relaxed text-slate-500">
              {info.aboutText ? (info.aboutText.slice(0, 140) + (info.aboutText.length > 140 ? '...' : '')) : 'Empowering future leaders with top-tier educational standard systems.'}
            </p>
          </div>

          <div className="w-full md:col-span-5">
            {info.bannerImage ? (
              <img src={info.bannerImage} alt="Banner" className="h-32 w-full rounded-xl border border-slate-100 object-cover sm:h-40" />
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-400 sm:h-40">
                No active banner image.
              </div>
            )}
          </div>
        </main>

        {/* Portal CTA cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group flex flex-col items-start justify-between space-y-3 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg ring-1 ring-amber-100">
                  <IconClipboard className="h-5 w-5 text-amber-500" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Online Admission Desk</h3>
              </div>
              <p className="text-xs font-medium leading-normal text-slate-400">
                Submit electronic student registration forms to request institutional entry processing and download PDF receipts.
              </p>
            </div>
            <button onClick={() => navigate('/public/admission')} className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-slate-800 group-hover:bg-brand-600">
              Open Form →
            </button>
          </div>

          <div className="group flex flex-col items-start justify-between space-y-3 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-lg ring-1 ring-sky-100">
                  <IconSparkles className="h-5 w-5 text-sky-500" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Founding Board Messages</h3>
              </div>
              <p className="text-xs font-medium leading-normal text-slate-400">
                Browse quotes, profile parameters, and curated dispatches directly from our institution's leadership pillars.
              </p>
            </div>
            <button onClick={() => navigate('/public/founders')} className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-slate-800 group-hover:bg-brand-600">
              View Board →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PublicPortal;