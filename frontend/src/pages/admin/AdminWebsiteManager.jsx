import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { inputClass, btnPrimary, btnDark } from '../../components/ui.jsx';

const AdminWebsiteManager = () => {
  const navigate = useNavigate();
  const [welcomeTitle, setWelcomeTitle] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [info, setInfo] = useState({ founders: [] });

  // Founder Entry States
  const [founderName, setFounderName] = useState('');
  const [founderDesignation, setFounderDesignation] = useState('');
  const [founderQuote, setFounderQuote] = useState('');
  const [founderPhoto, setFounderPhoto] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchWebConfig();
  }, []);

  const fetchWebConfig = () => {
    axios.get('http://localhost:5000/api/public/info').then(({ data }) => {
      if (data.success && data.data) {
        setInfo(data.data);
        setWelcomeTitle(data.data.welcomeTitle || '');
        setAboutText(data.data.aboutText || '');
      }
    });
  };

  const handleUpdateWebsite = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg('');
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const formData = new FormData();
      formData.append('welcomeTitle', welcomeTitle);
      formData.append('aboutText', aboutText);
      if (logoFile) formData.append('logo', logoFile[0]);
      if (bannerFile) formData.append('banner', bannerFile[0]);

      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${storedUser.token}` } };
      await axios.post('http://localhost:5000/api/public/info/update', formData, config);
      setStatusMsg('🚀 Website parameters updated live successfully!');
      fetchWebConfig();
    } catch (err) {
      setStatusMsg('Failed to update web parameters.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddFounderSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg('');
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const formData = new FormData();
      formData.append('name', founderName);
      formData.append('designation', founderDesignation);
      formData.append('quote', founderQuote);
      if (founderPhoto) formData.append('founderPhoto', founderPhoto[0]);

      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${storedUser.token}` } };
      await axios.post('http://localhost:5000/api/public/founder/add', formData, config);

      setStatusMsg('✔ New leader committed to public rows successfully!');
      setFounderName('');
      setFounderDesignation('');
      setFounderQuote('');
      setFounderPhoto(null);
      document.getElementById('founderPhotoInput').value = '';
      fetchWebConfig();
    } catch (err) {
      setStatusMsg('Failed to append profile card.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFounderItem = async (founderId) => {
    if (!window.confirm("⚠️ Remove this board member card from public view?")) return;
    const storedUser = JSON.parse(localStorage.getItem('schoolUser'));
    try {
      const config = { headers: { Authorization: `Bearer ${storedUser.token}` } };
      await axios.delete(`http://localhost:5000/api/public/founder/${founderId}`, config);
      setStatusMsg('🗑️ Leadership profile removed cleanly.');
      fetchWebConfig();
    } catch (e) {
      setStatusMsg('Failed to delete member node.');
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-2 font-sans text-xs sm:p-4">

      {/* Top Banner Header Layout */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs">
        <div>
          <h1 className="text-base font-black tracking-tight text-slate-900">🌐 Public Landing Layout Editor</h1>
          <p className="text-[11px] text-slate-400">Alter public text parameters and manage leadership dispatches on the main homepage gallery.</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="cursor-pointer rounded-xl border bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">← Dashboard HQ</button>
      </div>

      {statusMsg && <div className="animate-fade-in rounded-xl border border-sky-100 bg-sky-50 p-2.5 font-bold text-sky-800">{statusMsg}</div>}

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">

        {/* ELEMENT 1: WEBSITE IDENTITY CONTENT FORM */}
        <form onSubmit={handleUpdateWebsite} className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs lg:col-span-7">
          <h2 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">🏛️ Base Branding Headers</h2>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Headline Slogan Title</label>
            <input type="text" required value={welcomeTitle} onChange={(e) => setWelcomeTitle(e.target.value)} className={`${inputClass} text-xs`} />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">About Us Institutional Description</label>
            <textarea rows="3" required value={aboutText} onChange={(e) => setAboutText(e.target.value)} className={`${inputClass} resize-none font-sans text-xs`} />
          </div>
          <div className="grid grid-cols-1 gap-3 text-[10px] sm:grid-cols-2">
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-2">
              <span className="mb-1 block font-bold uppercase text-slate-400">Branding Logo</span>
              <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files)} className="w-full text-[10px]" />
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-2">
              <span className="mb-1 block font-bold uppercase text-slate-400">Hero Graphic Banner</span>
              <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files)} className="w-full text-[10px]" />
            </div>
          </div>
          <button type="submit" disabled={submitting} className={`${btnPrimary} w-full cursor-pointer shadow-xs disabled:bg-brand-300`}>
            {submitting ? 'Processing Cloudinary Uploads...' : 'Commit Branding Updates'}
          </button>
        </form>

        {/* ELEMENT 2: BOARD CARD GENERATOR FORM */}
        <form onSubmit={handleAddFounderSubmit} className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs lg:col-span-5">
          <h2 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-900">➕ Append Leadership Card</h2>
          <div>
            <input type="text" required value={founderName} onChange={(e) => setFounderName(e.target.value)} placeholder="Full Board Member Name" className={inputClass} />
          </div>
          <div>
            <input type="text" required value={founderDesignation} onChange={(e) => setFounderDesignation(e.target.value)} placeholder="Designation (e.g. Founder Chairman)" className={`${inputClass} font-bold text-brand-600`} />
          </div>
          <div>
            <textarea rows="2" required value={founderQuote} onChange={(e) => setFounderQuote(e.target.value)} placeholder="Inspirational leadership message dispatch quote..." className={`${inputClass} resize-none font-sans`} />
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-2 text-[10px]">
            <input id="founderPhotoInput" type="file" required accept="image/*" onChange={(e) => setFounderPhoto(e.target.files)} className="w-full text-[10px]" />
          </div>
          <button type="submit" disabled={submitting} className={`${btnDark} w-full cursor-pointer shadow-xs disabled:bg-slate-400`}>
            Deploy Member Profile Live
          </button>
        </form>
      </div>

      {/* ELEMENT 3: LIVE REPLICAS LIST FOR MANAGEMENT REMOVALS */}
      <div className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-xs">
        <h2 className="border-b pb-1 text-xs font-black uppercase tracking-wider text-slate-400">📋 Active Leadership Boards Gallery</h2>
        {(!info.founders || info.founders.length === 0) ? (
          <p className="py-2 text-xs italic text-slate-400">No board members generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {info.founders.map((f) => (
              <div key={f._id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 bg-slate-50/50 p-2">
                <div className="flex items-center gap-2">
                  {f.image ? <img src={f.image} alt="Avatar" className="h-9 w-9 rounded-lg border object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200">👤</div>}
                  <div className="max-w-[120px] truncate">
                    <h4 className="truncate font-bold text-slate-900">{f.name}</h4>
                    <span className="block truncate text-[10px] text-slate-400">{f.designation}</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleDeleteFounderItem(f._id)} className="cursor-pointer rounded-md border border-rose-100 bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600 transition-all hover:bg-rose-100">
                  Retract
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminWebsiteManager;