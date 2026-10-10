// src/pages/PublicFounders.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, EmptyState } from '../../components/ui.jsx';

const PublicFounders = () => {
  const navigate = useNavigate();
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/public/info')
      .then(({ data }) => { if (data.success) setFounders(data.data.founders || []); })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200/70 bg-white px-6 py-4 shadow-sm">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">✨ Institutional Founding Board Messages</h2>
          <p className="mt-0.5 text-xs text-slate-400">Read official dispatches straight from our leadership pillars [INDEX].</p>
        </div>
        <button onClick={() => navigate('/')} className="cursor-pointer rounded-xl border bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100">← Home</button>
      </div>

      <main className="mx-auto w-full max-w-7xl">
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : founders.length === 0 ? (
          <EmptyState
            title="No board profiles yet"
            message="No board profiles have been updated by the administration yet."
          />
        ) : (
          <div className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-2">
            {founders.map((f) => (
              <div key={f._id} className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md sm:flex-row sm:items-start">
                {f.image ? <img src={f.image} alt="Avatar" className="h-24 w-24 shrink-0 rounded-2xl border bg-slate-50 object-cover shadow-xs" /> : <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl font-black text-brand-600">👤</div>}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div>
                    <h4 className="text-base font-black leading-tight text-slate-900">{f.name}</h4>
                    <span className="mt-1 inline-block rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 text-[11px] font-black uppercase text-brand-600">{f.designation}</span>
                  </div>
                  <div className="relative rounded-xl border bg-slate-50 p-3.5 text-xs font-medium italic leading-relaxed text-slate-600">
                    <span className="absolute -top-1.5 left-2 font-serif text-xl text-brand-200">“</span>
                    "{f.quote}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicFounders;