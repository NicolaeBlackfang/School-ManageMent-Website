// src/pages/PublicFounders.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 space-y-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white border px-6 py-4 rounded-2xl shadow-2xs">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">✨ Institutional Founding Board Messages</h2>
          <p className="text-xs text-slate-400 mt-0.5">Read official dispatches straight from our leadership pillars [INDEX].</p>
        </div>
        <button onClick={() => navigate('/')} className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border hover:bg-slate-100 cursor-pointer">← Home</button>
      </div>

      <main className="max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
        ) : founders.length === 0 ? (
          <p className="text-sm text-slate-400 bg-white border p-8 rounded-2xl text-center shadow-2xs italic">No board profiles have been updated by the administration yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {founders.map((f) => (
              <div key={f._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:border-slate-200 transition-colors">
                {f.image ? <img src={f.image} alt="Avatar" className="h-24 w-24 rounded-2xl object-cover shadow-xs border bg-slate-50 shrink-0" /> : <div className="h-24 w-24 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-3xl font-black shrink-0">👤</div>}
                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <div>
                    <h4 className="text-base font-black text-slate-900 leading-tight">{f.name}</h4>
                    <span className="text-[11px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md inline-block mt-1">{f.designation}</span>
                  </div>
                  <div className="relative bg-slate-50 p-3.5 rounded-xl border text-xs italic text-slate-600 leading-relaxed font-medium">
                    <span className="absolute -top-1.5 left-2 text-xl text-blue-200 font-serif">“</span>
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
