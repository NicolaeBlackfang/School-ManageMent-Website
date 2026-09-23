import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-4 font-sans text-xs">
      
      {/* Top Banner Header Layout */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-3xs">
        <div>
          <h1 className="text-base font-black text-slate-900 tracking-tight">🌐 Public Landing Layout Editor</h1>
          <p className="text-[11px] text-gray-400">Alter public text parameters and manage leadership dispatches on the main homepage gallery.</p>
        </div>
        <button onClick={() => navigate('/admin/dashboard')} className="text-xs font-bold text-gray-500 bg-slate-50 border px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">← Dashboard HQ</button>
      </div>

      {statusMsg && <div className="p-2.5 bg-blue-50 text-blue-800 font-bold rounded-xl border border-blue-100 animate-fade-in">{statusMsg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ELEMENT 1: WEBSITE IDENTITY CONTENT FORM */}
        <form onSubmit={handleUpdateWebsite} className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs space-y-3 lg:col-span-7">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">🏛️ Base Branding Headers</h2>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Headline Slogan Title</label>
            <input type="text" required value={welcomeTitle} onChange={(e) => setWelcomeTitle(e.target.value)} className="w-full border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-900 font-medium text-xs" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">About Us Institutional Description</label>
            <textarea rows="3" required value={aboutText} onChange={(e) => setAboutText(e.target.value)} className="w-full border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-900 font-medium text-xs resize-none font-sans" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
            <div className="border border-dashed p-2 rounded-xl bg-slate-50/50">
              <span className="block text-gray-400 font-bold mb-1 uppercase">Branding Logo</span>
              <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files)} className="w-full text-[10px]" />
            </div>
            <div className="border border-dashed p-2 rounded-xl bg-slate-50/50">
              <span className="block text-gray-400 font-bold mb-1 uppercase">Hero Graphic Banner</span>
              <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files)} className="w-full text-[10px]" />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-3xs">
            {submitting ? 'Processing Cloudinary Uploads...' : 'Commit Branding Updates'}
          </button>
        </form>

        {/* ELEMENT 2: BOARD CARD GENERATOR FORM */}
        <form onSubmit={handleAddFounderSubmit} className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs space-y-3 lg:col-span-5">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1">➕ Append Leadership Card</h2>
          <div>
            <input type="text" required value={founderName} onChange={(e) => setFounderName(e.target.value)} placeholder="Full Board Member Name" className="w-full border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-900 font-medium" />
          </div>
          <div>
            <input type="text" required value={founderDesignation} onChange={(e) => setFounderDesignation(e.target.value)} placeholder="Designation (e.g. Founder Chairman)" className="w-full border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-900 font-bold text-blue-600" />
          </div>
          <div>
            <textarea rows="2" required value={founderQuote} onChange={(e) => setFounderQuote(e.target.value)} placeholder="Inspirational leadership message dispatch quote..." className="w-full border rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-900 font-medium resize-none font-sans" />
          </div>
          <div className="border border-dashed p-2 rounded-xl bg-slate-50/50 text-[10px]">
            <input id="founderPhotoInput" type="file" required accept="image/*" onChange={(e) => setFounderPhoto(e.target.files)} className="w-full text-[10px]" />
          </div>
          <button type="submit" disabled={submitting} className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer shadow-3xs">
            Deploy Member Profile Live
          </button>
        </form>
      </div>

      {/* ELEMENT 3: LIVE REPLICAS LIST FOR MANAGEMENT REMOVALS */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs space-y-3">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b pb-1">📋 Active Leadership Boards Gallery</h2>
        {(!info.founders || info.founders.length === 0) ? (
          <p className="text-xs text-gray-400 italic py-2">No board members generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {info.founders.map((f) => (
              <div key={f._id} className="bg-slate-50/50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {f.image ? <img src={f.image} alt="Avatar" className="h-9 w-9 rounded-lg object-cover border" /> : <div className="h-9 w-9 bg-gray-200 rounded-lg flex items-center justify-center">👤</div>}
                  <div className="truncate max-w-[120px]">
                    <h4 className="font-bold text-slate-900 truncate">{f.name}</h4>
                    <span className="text-[10px] text-slate-400 truncate block">{f.designation}</span>
                  </div>
                </div>
                <button type="button" onClick={() => handleDeleteFounderItem(f._id)} className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 font-bold rounded-md hover:bg-rose-100 transition-all text-[10px] cursor-pointer">
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