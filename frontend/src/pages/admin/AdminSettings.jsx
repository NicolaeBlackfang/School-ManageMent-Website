// src/pages/AdminSettings.jsx
import { useEffect, useState } from 'react';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Spinner,
  MessageBanner,
  inputClass,
  btnPrimary,
  btnDark,
} from '../../components/ui.jsx';
import { IconUsers, IconBook, IconCalendar, IconPlus, IconX } from '../../components/icons.jsx';

const AdminSettings = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examTerms, setExamTerms] = useState([]);

  const [newClass, setNewClass] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalConfig();
  }, []);

  const fetchGlobalConfig = async () => {
    try {
      const { data } = await api.get('/config');
      setClasses(data.data.classes || []);
      setSubjects(data.data.subjects || []);
      setExamTerms(data.data.examTerms || []);
    } catch {
      setMessage({ text: 'Failed to stream global config from the server.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await api.post('/config/update', { classes, subjects, examTerms });
      setMessage({ text: 'Global settings saved. Dropdowns updated across the system.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    } catch {
      setMessage({ text: 'Failed to update global settings.', type: 'error' });
    }
  };

  const Chip = ({ value, onRemove, tone }) => {
    const tones = {
      brand: 'border-brand-100 bg-brand-50 text-brand-800',
      violet: 'border-violet-100 bg-violet-50 text-violet-800',
      amber: 'border-amber-100 bg-amber-50 text-amber-800',
    };
    const btnTones = {
      brand: 'text-brand-400 hover:text-brand-700',
      violet: 'text-violet-400 hover:text-violet-700',
      amber: 'text-amber-500 hover:text-amber-700',
    };
    return (
      <span className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold ${tones[tone]}`}>
        {value}
        <button type="button" onClick={onRemove} className={`cursor-pointer ${btnTones[tone]}`} aria-label={`Remove ${value}`}>
          <IconX className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[50vh] items-center justify-center"><Spinner className="h-10 w-10" /></div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="max-w-4xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader
          title="Global institution settings"
          subtitle="Control the class names, active subjects and exam terms populated inside system dropdowns."
        />

        <Card className="p-6 sm:p-8">
          <MessageBanner message={message} />

          <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                <IconUsers className="h-4 w-4 text-brand-500" /> Class structure
              </h3>
              <div className="flex gap-2">
                <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="e.g., Class 10-A" className={`${inputClass} flex-grow`} />
                <button type="button" onClick={() => { if (newClass.trim()) { setClasses([...classes, newClass.trim()]); setNewClass(''); } }} className={`${btnDark} text-xs`}>
                  <IconPlus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {classes.map((c, i) => (
                  <Chip key={i} value={c} tone="brand" onRemove={() => setClasses(classes.filter((_, idx) => idx !== i))} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                <IconBook className="h-4 w-4 text-violet-500" /> Active subject curricula
              </h3>
              <div className="flex gap-2">
                <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="e.g., Computer Science" className={`${inputClass} flex-grow`} />
                <button type="button" onClick={() => { if (newSubject.trim()) { setSubjects([...subjects, newSubject.trim()]); setNewSubject(''); } }} className={`${btnDark} text-xs`}>
                  <IconPlus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {subjects.map((s, i) => (
                  <Chip key={i} value={s} tone="violet" onRemove={() => setSubjects(subjects.filter((_, idx) => idx !== i))} />
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4 md:col-span-2">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                <IconCalendar className="h-4 w-4 text-amber-500" /> Examination terms / semesters
              </h3>
              <div className="flex max-w-md gap-2">
                <input type="text" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} placeholder="e.g., First Term, Final Examination" className={`${inputClass} flex-grow`} />
                <button type="button" onClick={() => { if (newTerm.trim()) { setExamTerms([...examTerms, newTerm.trim()]); setNewTerm(''); } }} className={`${btnDark} text-xs`}>
                  <IconPlus className="h-4 w-4" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {examTerms.length === 0 ? (
                  <p className="text-xs italic text-slate-400">No custom exam terms yet. System fallback presets will apply.</p>
                ) : examTerms.map((t, i) => (
                  <Chip key={i} value={t} tone="amber" onRemove={() => setExamTerms(examTerms.filter((_, idx) => idx !== i))} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-6">
            <button type="button" onClick={handleSaveSettings} className={`${btnPrimary} text-xs`}>Save global matrix layout</button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AdminSettings;
