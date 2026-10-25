import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  inputClass,
  labelClass,
  btnPrimary,
  btnDark,
} from '../../components/ui.jsx';
import { IconBack, IconPlus, IconTrash, IconUser, IconUsers } from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const AdminWebsiteManager = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [welcomeTitle, setWelcomeTitle] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [info, setInfo] = useState({ founders: [] });

  // Founder entry state
  const [founderName, setFounderName] = useState('');
  const [founderDesignation, setFounderDesignation] = useState('');
  const [founderQuote, setFounderQuote] = useState('');
  const [founderPhoto, setFounderPhoto] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchWebConfig();
  }, []);

  const fetchWebConfig = () => {
    api.get('/public/info').then(({ data }) => {
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
    try {
      const formData = new FormData();
      formData.append('welcomeTitle', welcomeTitle);
      formData.append('aboutText', aboutText);
      if (logoFile) formData.append('logo', logoFile[0]);
      if (bannerFile) formData.append('banner', bannerFile[0]);

      await api.post('/public/info/update', formData);
      toast.success('Website parameters updated live successfully!');
      fetchWebConfig();
    } catch {
      toast.error('Failed to update web parameters.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddFounderSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', founderName);
      formData.append('designation', founderDesignation);
      formData.append('quote', founderQuote);
      if (founderPhoto) formData.append('founderPhoto', founderPhoto[0]);

      await api.post('/public/founder/add', formData);

      toast.success('New leader committed to public rows successfully!');
      setFounderName('');
      setFounderDesignation('');
      setFounderQuote('');
      setFounderPhoto(null);
      document.getElementById('founderPhotoInput').value = '';
      fetchWebConfig();
    } catch {
      toast.error('Failed to append profile card.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFounderItem = async (founderId) => {
    if (!window.confirm("Remove this board member card from public view?")) return;
    try {
      await api.delete(`/public/founder/${founderId}`);
      toast.success('Leadership profile removed cleanly.');
      fetchWebConfig();
    } catch {
      toast.error('Failed to delete member node.');
    }
  };

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Public landing layout editor"
          subtitle="Alter public text parameters and manage leadership cards on the main homepage gallery."
          actions={
            <button onClick={() => navigate('/a/dashboard')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              <IconBack className="h-4 w-4" /> Dashboard HQ
            </button>
          }
        />

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
          <Card className="p-5 lg:col-span-7">
            <form onSubmit={handleUpdateWebsite} className="space-y-4">
              <h2 className="border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Base branding headers</h2>
              <div>
                <label className={labelClass}>Headline slogan title</label>
                <input type="text" required value={welcomeTitle} onChange={(e) => setWelcomeTitle(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>About us institutional description</label>
                <textarea rows="3" required value={aboutText} onChange={(e) => setAboutText(e.target.value)} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-3">
                  <span className={labelClass}>Branding logo</span>
                  <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files)} className="w-full text-xs" />
                </div>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-2">
                  <span className={labelClass}>Hero graphic banner</span>
                  <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files)} className="w-full text-xs" />
                </div>
              </div>
              <button type="submit" disabled={submitting} className={`${btnPrimary} w-full`}>
                {submitting ? 'Processing uploads...' : 'Commit branding updates'}
              </button>
            </form>
          </Card>

          <Card className="p-5 lg:col-span-5">
            <form onSubmit={handleAddFounderSubmit} className="space-y-3">
              <h2 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <IconPlus className="h-4 w-4" /> Append leadership card
              </h2>
              <input type="text" required value={founderName} onChange={(e) => setFounderName(e.target.value)} placeholder="Full board member name" className={inputClass} />
              <input type="text" required value={founderDesignation} onChange={(e) => setFounderDesignation(e.target.value)} placeholder="Designation (e.g. Founder Chairman)" className={`${inputClass} font-bold text-brand-600`} />
              <textarea rows="2" required value={founderQuote} onChange={(e) => setFounderQuote(e.target.value)} placeholder="Inspirational leadership message..." className={`${inputClass} resize-none`} />
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-2">
                <input id="founderPhotoInput" type="file" required accept="image/*" onChange={(e) => setFounderPhoto(e.target.files)} className="w-full text-xs" />
              </div>
              <button type="submit" disabled={submitting} className={`${btnDark} w-full`}>
                Deploy member profile live
              </button>
            </form>
          </Card>
        </div>

        <Card className="p-5">
          <h2 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <IconUsers className="h-4 w-4" /> Active leadership board gallery
          </h2>
          {(!info.founders || info.founders.length === 0) ? (
            <p className="py-3 text-sm italic text-slate-400">No board members generated yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {info.founders.map((f) => (
                <div key={f._id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 bg-slate-50/50 p-2.5">
                  <div className="flex items-center gap-2">
                    {f.image ? (
                      <img src={f.image} alt="Avatar" className="h-9 w-9 rounded-lg border object-cover" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 text-slate-500"><IconUser className="h-4 w-4" /></div>
                    )}
                    <div className="max-w-[120px] truncate">
                      <h4 className="truncate font-bold text-slate-900">{f.name}</h4>
                      <span className="text-xs text-slate-400">{f.designation}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFounderItem(f._id)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-rose-100 bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
                  >
                    <IconTrash className="h-3 w-3" /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminWebsiteManager;
