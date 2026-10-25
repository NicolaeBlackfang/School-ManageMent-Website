// src/pages/admin/AdminCmsManager.jsx
// WordPress-style content studio: site identity, menu tree, pages, news,
// gallery, facilities and academic sections — all backed by /api/admin/cms.
import { useCallback, useEffect, useState } from 'react';
import api from '../../core/api.js';
import {
  PageContainer,
  PageHeader,
  Card,
  Badge,
  Spinner,
  EmptyState,
  inputClass,
  labelClass,
  btnPrimary,
} from '../../components/ui.jsx';
import { IconPlus, IconTrash, IconSparkles } from '../../components/icons.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const TABS = [
  { id: 'site', label: 'Site identity' },
  { id: 'menu', label: 'Navigation' },
  { id: 'pages', label: 'Pages' },
  { id: 'news', label: 'News & notices' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'academic', label: 'Academics' },
];

const ENDPOINTS = {
  menu: '/admin/cms/menu',
  pages: '/admin/cms/pages',
  news: '/admin/cms/news',
  gallery: '/admin/cms/gallery',
  facilities: '/admin/cms/facilities',
  academic: '/admin/cms/academic',
};

const blankForms = {
  menu: { label: '', url: '/', location: 'header', order: 0, isActive: true, openInNewTab: false },
  pages: { title: '', slug: '', excerpt: '', content: '', isPublished: true, showTitle: true, order: 0 },
  news: { title: '', slug: '', type: 'news', excerpt: '', content: '', isPublished: true, publishedAt: '' },
  gallery: { title: '', image: '', category: 'Campus', order: 0, isPublished: true },
  facilities: { title: '', description: '', icon: '', image: '', order: 0, isPublished: true },
  academic: { key: '', title: '', content: '', items: '', order: 0, isPublished: true },
};

const Field = ({ label, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const toForm = (type, item) => {
  const base = blankForms[type];
  const next = { ...base };
  Object.keys(base).forEach((key) => {
    if (item[key] !== undefined && item[key] !== null) {
      next[key] = type === 'academic' && key === 'items' ? item.items.join('\n') : item[key];
    }
  });
  if (type === 'news' && item.publishedAt) next.publishedAt = item.publishedAt.slice(0, 10);
  return next;
};

const AdminCmsManager = () => {
  const toast = useToast();
  const [tab, setTab] = useState('site');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [site, setSite] = useState({});
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blankForms.pages);
  const [editingId, setEditingId] = useState(null);

  const load = useCallback(async (which) => {
    setLoading(true);
    try {
      if (which === 'site') {
        const { data } = await api.get('/public/info');
        setSite(data.data || {});
      } else {
        const { data } = await api.get(ENDPOINTS[which]);
        setItems(data.data || []);
      }
    } catch {
      toast.error('Unable to load content.');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { load(tab); }, [tab, load]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setEditingId(null);
    setForm(blankForms[tab] ? { ...blankForms[tab] } : {});
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm(toForm(tab, item));
  };

  const saveSite = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/cms/site', site);
      toast.success('Site identity updated.');
    } catch {
      toast.error('Site settings could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const saveItem = async (e) => {
    e.preventDefault();
    if (!ENDPOINTS[tab]) return;
    setSaving(true);
    try {
      const payload = { ...form };
      if (tab === 'academic') {
        payload.items = String(payload.items || '').split('\n').map((s) => s.trim()).filter(Boolean);
      }
      if (tab === 'news' && !payload.publishedAt) delete payload.publishedAt;
      if (editingId) await api.put(`${ENDPOINTS[tab]}/${editingId}`, payload);
      else await api.post(ENDPOINTS[tab], payload);
      toast.success('Content saved.');
      resetForm();
      load(tab);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Content could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm('Delete this content permanently?')) return;
    try {
      await api.delete(`${ENDPOINTS[tab]}/${id}`);
      toast.success('Content deleted.');
      if (editingId === id) resetForm();
      load(tab);
    } catch {
      toast.error('Content could not be deleted.');
    }
  };

  const renderForm = () => {
    if (!blankForms[tab]) return null;
    return (
      <form onSubmit={saveItem} className="space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <IconPlus className="h-4 w-4" /> {editingId ? 'Edit item' : 'Create item'}
          </h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              Cancel
            </button>
          )}
        </div>

        {tab === 'menu' && (
          <>
            <Field label="Label"><input required className={inputClass} value={form.label} onChange={(e) => update('label', e.target.value)} /></Field>
            <Field label="URL"><input required className={inputClass} value={form.url} onChange={(e) => update('url', e.target.value)} placeholder="/admission or https://..." /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Location">
                <select className={inputClass} value={form.location} onChange={(e) => update('location', e.target.value)}>
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                </select>
              </Field>
              <Field label="Order"><input type="number" className={inputClass} value={form.order} onChange={(e) => update('order', Number(e.target.value))} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} /> Visible
            </label>
          </>
        )}

        {tab === 'pages' && (
          <>
            <Field label="Title"><input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
            <Field label="Slug (optional)"><input className={inputClass} value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="auto-generated from title" /></Field>
            <Field label="Excerpt"><textarea rows="2" className={inputClass} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} /></Field>
            <Field label="Content"><textarea rows="10" className={inputClass} value={form.content} onChange={(e) => update('content', e.target.value)} placeholder="Plain text / simple paragraphs" /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Published
            </label>
          </>
        )}

        {tab === 'news' && (
          <>
            <Field label="Title"><input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type">
                <select className={inputClass} value={form.type} onChange={(e) => update('type', e.target.value)}>
                  <option value="news">News</option>
                  <option value="notice">Notice</option>
                  <option value="announcement">Announcement</option>
                </select>
              </Field>
              <Field label="Publish date"><input type="date" className={inputClass} value={form.publishedAt} onChange={(e) => update('publishedAt', e.target.value)} /></Field>
            </div>
            <Field label="Slug (optional)"><input className={inputClass} value={form.slug} onChange={(e) => update('slug', e.target.value)} /></Field>
            <Field label="Excerpt"><textarea rows="2" className={inputClass} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} /></Field>
            <Field label="Content"><textarea rows="8" className={inputClass} value={form.content} onChange={(e) => update('content', e.target.value)} /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Published
            </label>
          </>
        )}

        {tab === 'gallery' && (
          <>
            <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
            <Field label="Image URL"><input required className={inputClass} value={form.image} onChange={(e) => update('image', e.target.value)} placeholder="https://..." /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category"><input className={inputClass} value={form.category} onChange={(e) => update('category', e.target.value)} /></Field>
              <Field label="Order"><input type="number" className={inputClass} value={form.order} onChange={(e) => update('order', Number(e.target.value))} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Visible
            </label>
          </>
        )}

        {tab === 'facilities' && (
          <>
            <Field label="Title"><input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
            <Field label="Description"><textarea rows="4" className={inputClass} value={form.description} onChange={(e) => update('description', e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Icon"><input className={inputClass} value={form.icon} onChange={(e) => update('icon', e.target.value)} placeholder="e.g. lab, library" /></Field>
              <Field label="Order"><input type="number" className={inputClass} value={form.order} onChange={(e) => update('order', Number(e.target.value))} /></Field>
            </div>
            <Field label="Image URL"><input className={inputClass} value={form.image} onChange={(e) => update('image', e.target.value)} /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Visible
            </label>
          </>
        )}

        {tab === 'academic' && (
          <>
            <Field label="Key"><input required className={inputClass} value={form.key} onChange={(e) => update('key', e.target.value)} placeholder="curriculum, calendar, results..." /></Field>
            <Field label="Title"><input required className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
            <Field label="Content"><textarea rows="6" className={inputClass} value={form.content} onChange={(e) => update('content', e.target.value)} /></Field>
            <Field label="Bullet items (one per line)"><textarea rows="4" className={inputClass} value={form.items} onChange={(e) => update('items', e.target.value)} /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} /> Visible
            </label>
          </>
        )}

        <button type="submit" disabled={saving} className={`${btnPrimary} w-full`}>
          {saving ? 'Saving...' : editingId ? 'Save changes' : 'Create'}
        </button>
      </form>
    );
  };

  const renderList = () => {
    if (tab === 'site' || loading) return null;
    if (!items.length) return <EmptyState title="No content yet" message="Use the form to create your first item." />;
    return (
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{item.label || item.title}</p>
              <p className="truncate text-xs text-slate-500">{item.url || item.slug || item.key || item.category || item.type}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge tone={item.isPublished === false || item.isActive === false ? 'slate' : 'emerald'}>
                {item.isPublished === false || item.isActive === false ? 'Hidden' : 'Live'}
              </Badge>
              <button onClick={() => startEdit(item)} className="text-xs font-semibold text-brand-600 hover:text-brand-800">Edit</button>
              <button onClick={() => removeItem(item._id)} className="text-rose-500 hover:text-rose-700" aria-label="Delete">
                <IconTrash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PageContainer className="max-w-6xl">
      <div className="animate-fade-up space-y-5">
        <PageHeader
          title="Content studio"
          subtitle="Control navigation, pages, news, gallery and academic content without touching code."
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); resetForm(); }}
              className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                tab === t.id ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'site' ? (
          <Card className="p-5">
            <form onSubmit={saveSite} className="space-y-4">
              <h2 className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <IconSparkles className="h-4 w-4" /> Site identity
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="School name"><input className={inputClass} value={site.schoolName || ''} onChange={(e) => setSite({ ...site, schoolName: e.target.value })} /></Field>
                <Field label="Tagline"><input className={inputClass} value={site.tagline || ''} onChange={(e) => setSite({ ...site, tagline: e.target.value })} /></Field>
                <Field label="Phone"><input className={inputClass} value={site.phone || ''} onChange={(e) => setSite({ ...site, phone: e.target.value })} /></Field>
                <Field label="Email"><input className={inputClass} value={site.email || ''} onChange={(e) => setSite({ ...site, email: e.target.value })} /></Field>
              </div>
              <Field label="Address"><input className={inputClass} value={site.address || ''} onChange={(e) => setSite({ ...site, address: e.target.value })} /></Field>
              <Field label="Welcome title"><input className={inputClass} value={site.welcomeTitle || ''} onChange={(e) => setSite({ ...site, welcomeTitle: e.target.value })} /></Field>
              <Field label="About text"><textarea rows="4" className={inputClass} value={site.aboutText || ''} onChange={(e) => setSite({ ...site, aboutText: e.target.value })} /></Field>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Mission"><textarea rows="3" className={inputClass} value={site.mission || ''} onChange={(e) => setSite({ ...site, mission: e.target.value })} /></Field>
                <Field label="Vision"><textarea rows="3" className={inputClass} value={site.vision || ''} onChange={(e) => setSite({ ...site, vision: e.target.value })} /></Field>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Facebook URL"><input className={inputClass} value={site.facebook || ''} onChange={(e) => setSite({ ...site, facebook: e.target.value })} /></Field>
                <Field label="YouTube URL"><input className={inputClass} value={site.youtube || ''} onChange={(e) => setSite({ ...site, youtube: e.target.value })} /></Field>
              </div>
              <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving...' : 'Save site identity'}</button>
            </form>
          </Card>
        ) : (
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
            <Card className="p-5 lg:col-span-7">
              {loading ? <div className="flex justify-center py-10"><Spinner /></div> : renderList()}
            </Card>
            <Card className="p-5 lg:col-span-5">{renderForm()}</Card>
          </div>
        )}

        {tab === 'pages' && (
          <p className="text-xs text-slate-500">Published pages are available at <code>/pages/&lt;slug&gt;</code>. Link them from Navigation.</p>
        )}
        {tab === 'news' && (
          <p className="text-xs text-slate-500">Published items appear at <code>/news</code> and <code>/notices</code>. Link them from Navigation.</p>
        )}
      </div>
    </PageContainer>
  );
};

export default AdminCmsManager;
