import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../../core/api.js';
import { Badge, Card, EmptyState, inputClass, labelClass, PageContainer, PageHeader, Spinner, btnDanger, btnPrimary, btnSecondary } from '../../components/ui.jsx';
import { IconEdit, IconTrash } from '../../components/icons.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { usePagination } from '../../components/usePagination.js';
import { useToast } from '../../context/ToastContext.jsx';

const sections = {
  news: { title: 'News & announcements', endpoint: 'news', status: 'isPublished', defaults: { title: '', type: 'news', excerpt: '', content: '', coverImage: '', isPublished: false }, fields: [
    ['title', 'Title', 'text', true], ['type', 'Type', 'select', true, ['news', 'notice', 'announcement']], ['excerpt', 'Summary', 'textarea'], ['content', 'Article content', 'textarea', true], ['coverImage', 'Cover image URL', 'url'],
  ] },
  gallery: { title: 'Photo gallery', endpoint: 'gallery', status: 'isPublished', defaults: { title: '', image: '', category: 'Campus', order: 0, isPublished: true }, fields: [
    ['title', 'Image title', 'text'], ['image', 'Image URL', 'url', true], ['category', 'Category', 'text'], ['order', 'Display order', 'number'],
  ] },
  pages: { title: 'Public pages', endpoint: 'pages', status: 'isPublished', defaults: { title: '', slug: '', excerpt: '', content: '', coverImage: '', order: 0, showTitle: true, isPublished: false }, fields: [
    ['title', 'Page title', 'text', true], ['slug', 'URL slug (optional)', 'text'], ['excerpt', 'Summary', 'textarea'], ['content', 'Page content', 'textarea'], ['coverImage', 'Cover image URL', 'url'], ['order', 'Display order', 'number'], ['showTitle', 'Show page title', 'checkbox'],
  ] },
  facilities: { title: 'Facilities', endpoint: 'facilities', status: 'isPublished', defaults: { title: '', description: '', icon: '', image: '', order: 0, isPublished: true }, fields: [
    ['title', 'Facility title', 'text', true], ['description', 'Description', 'textarea'], ['icon', 'Icon name (optional)', 'text'], ['image', 'Image URL', 'url'], ['order', 'Display order', 'number'],
  ] },
  academic: { title: 'Academic information', endpoint: 'academic', status: 'isPublished', defaults: { key: '', title: '', content: '', itemsText: '', order: 0, isPublished: true }, fields: [
    ['key', 'Section key', 'text', true], ['title', 'Section title', 'text', true], ['content', 'Section content', 'textarea'], ['itemsText', 'List items (one per line)', 'textarea'], ['order', 'Display order', 'number'],
  ] },
  menu: { title: 'Public navigation', endpoint: 'menu', status: 'isActive', defaults: { label: '', url: '', location: 'header', order: 0, isExternal: false, openInNewTab: false, isActive: true }, fields: [
    ['label', 'Link label', 'text', true], ['url', 'Link URL', 'text', true], ['location', 'Menu location', 'select', true, ['header', 'footer']], ['order', 'Display order', 'number'], ['isExternal', 'External link', 'checkbox'], ['openInNewTab', 'Open in a new tab', 'checkbox'],
  ] },
};

const AdminContentManager = () => {
  const toast = useToast();
  const [section, setSection] = useState('news');
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(sections.news.defaults);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const definition = sections[section];
  const pagination = usePagination(records, section);
  const publishedCount = useMemo(() => records.filter((item) => item[definition.status]).length, [records, definition.status]);

  const loadSection = async (key = section) => {
    const { data } = await api.get(`/cms/admin/cms/${sections[key].endpoint}`);
    setRecords(Array.isArray(data.data) ? data.data : []);
  };

  useEffect(() => {
    let active = true;
    api.get(`/cms/admin/cms/${definition.endpoint}`).then(({ data }) => {
      if (active) setRecords(Array.isArray(data.data) ? data.data : []);
    }).catch((err) => {
      if (active) toast.error(errorMessage(err, `Could not load ${definition.title.toLowerCase()}. Refresh and try again.`));
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [definition.endpoint, definition.title, toast]);

  const resetForm = () => { setEditingId(''); setForm({ ...sections[section].defaults }); };
  const changeSection = (key) => { setLoading(true); setEditingId(''); setForm({ ...sections[key].defaults }); setSection(key); };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (section === 'academic') payload.items = String(form.itemsText || '').split('\n').map((value) => value.trim()).filter(Boolean);
    delete payload.itemsText;
    try {
      const url = `/cms/admin/cms/${definition.endpoint}${editingId ? `/${editingId}` : ''}`;
      if (editingId) await api.put(url, payload);
      else await api.post(url, payload);
      toast.success(editingId ? 'Public content updated.' : 'Public content created.');
      resetForm();
      await loadSection();
    } catch (err) {
      toast.error(errorMessage(err, 'Content could not be saved. Check the required fields and try again.'));
    } finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    const next = { ...definition.defaults, ...item };
    if (section === 'academic') next.itemsText = (item.items || []).join('\n');
    setEditingId(item._id);
    setForm(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${definition.title.toLowerCase()} item? This cannot be undone.`)) return;
    try {
      await api.delete(`/cms/admin/cms/${definition.endpoint}/${id}`);
      setRecords((items) => items.filter((item) => item._id !== id));
      if (editingId === id) resetForm();
      toast.success('Public content deleted.');
    } catch (err) { toast.error(errorMessage(err, 'Content could not be deleted. Please try again.')); }
  };

  const getImage = (item) => section === 'gallery' ? item.image : item.coverImage || item.image;
  const getTitle = (item) => item.title || item.label || item.category || item.key || 'Untitled content';
  const getSummary = (item) => item.excerpt || item.description || item.url || item.slug || item.type || item.category || item.key || '';

  return (
    <PageContainer className="max-w-7xl">
      <div className="animate-fade-up space-y-6">
        <PageHeader title="Public content studio" subtitle="Manage homepage settings, leadership profiles, public articles, photos, pages, school information, and navigation." actions={<Link className={`${btnSecondary} py-2.5`} to="/a/website">Homepage and branding</Link>} />

        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Public content collections">
          {Object.entries(sections).map(([key, item]) => <button key={key} type="button" role="tab" aria-selected={section === key} onClick={() => changeSection(key)} className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${section === key ? 'bg-brand-700 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{item.title}</button>)}
        </div>

        <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Card className="min-w-0 p-5 sm:p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold text-slate-900">{editingId ? 'Edit' : 'Add'} {definition.title.toLowerCase()}</h2>{editingId && <button type="button" onClick={resetForm} className={`${btnSecondary} py-2`}>Cancel</button>}</div>
              {definition.fields.map(([name, label, type, required, options]) => {
                const id = `content-${name}`;
                if (type === 'checkbox') return <label key={name} htmlFor={id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700"><input id={id} type="checkbox" checked={Boolean(form[name])} onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-indigo-600" /><span>{label}</span></label>;
                return <div key={name}><label className={labelClass} htmlFor={id}>{label}</label>{type === 'textarea' ? <textarea id={id} required={required} rows={name === 'content' ? 7 : 3} value={form[name] || ''} onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))} className={`${inputClass} resize-y`} /> : type === 'select' ? <select id={id} required={required} value={form[name]} onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))} className={inputClass}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input id={id} type={type} required={required} maxLength={type === 'number' ? undefined : 200} value={form[name] ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(e.target.value) : e.target.value }))} className={inputClass} placeholder={type === 'url' ? 'https://…' : undefined} />}</div>;
              })}
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700"><input type="checkbox" checked={Boolean(form[definition.status])} onChange={(e) => setForm((prev) => ({ ...prev, [definition.status]: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-indigo-600" /><span><span className="block font-semibold">{section === 'menu' ? 'Show this link in public navigation' : 'Publish on public website'}</span><span className="mt-0.5 block text-xs text-slate-500">{section === 'menu' ? 'Hidden links remain available here for editing.' : 'Drafts remain available here for editing.'}</span></span></label>
              <button type="submit" disabled={saving} className={`${btnPrimary} w-full`}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Create content'}</button>
            </form>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5"><div><h2 className="font-semibold text-slate-900">{definition.title}</h2><p className="mt-1 text-xs text-slate-500">{publishedCount} visible · {records.length} total</p></div><Badge tone="indigo">Public website</Badge></div>
            {loading ? <div className="flex justify-center py-12"><Spinner /></div> : records.length === 0 ? <EmptyState title={`No ${definition.title.toLowerCase()} yet`} message="Add content to make it available on the public website." /> : <>
              <div className="divide-y divide-slate-100">{pagination.pageItems.map((item) => <article key={item._id} className="flex min-w-0 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-3">{getImage(item) && <img src={getImage(item)} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-lg bg-slate-100 object-cover" />}<div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="break-words font-semibold text-slate-800">{getTitle(item)}</h3><Badge tone={item[definition.status] ? 'emerald' : 'slate'}>{item[definition.status] ? 'Published' : 'Draft'}</Badge></div><p className="mt-1 break-words text-sm text-slate-500">{getSummary(item)}</p></div></div>
                <div className="flex shrink-0 gap-2 self-end sm:self-center"><button type="button" onClick={() => handleEdit(item)} className={`${btnSecondary} px-3 py-2`} aria-label={`Edit ${getTitle(item)}`}><IconEdit className="h-4 w-4" /> Edit</button><button type="button" onClick={() => handleDelete(item._id)} className={`${btnDanger} px-3 py-2`} aria-label={`Delete ${getTitle(item)}`}><IconTrash className="h-4 w-4" /></button></div>
              </article>)}</div>
              <Pagination {...pagination} itemLabel="items" />
            </>}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminContentManager;
