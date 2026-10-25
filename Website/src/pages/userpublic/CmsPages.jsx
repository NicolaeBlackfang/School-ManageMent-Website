// src/pages/userpublic/CmsPages.jsx
// Read-only renderers for CMS-backed content: pages, news/notices, gallery,
// facilities and academic sections. Content is rendered as plain text so an
// admin-entered payload can never inject markup/scripts into the public site.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../core/api.js';
import { Spinner, EmptyState, Badge } from '../../components/ui.jsx';

const PageShell = ({ title, subtitle, children, actions }) => (
  <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
      </div>
      {actions}
    </div>
    <div className="mt-8">{children}</div>
  </div>
);

const Prose = ({ text }) => (
  <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
    {String(text || '')
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">{paragraph}</p>
      ))}
  </div>
);

const Loading = () => <div className="flex justify-center py-16"><Spinner className="h-9 w-9" /></div>;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api.get(url)
      .then(({ data: payload }) => { if (alive) setData(payload.data ?? null); })
      .catch(() => { if (alive) setData(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [url]);
  return { data, loading };
};

export const CmsPage = () => {
  const { slug } = useParams();
  const { data, loading } = useFetch(`/public/pages/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (!data) {
    return <PageShell title="Page not found" subtitle="The page you are looking for may have moved.">
      <Link to="/" className="text-sm font-semibold text-brand-600 hover:text-brand-800">← Back to home</Link>
    </PageShell>;
  }

  return (
    <PageShell title={data.showTitle === false ? '' : data.title} subtitle={data.excerpt}>
      <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
        <Prose text={data.content || data.excerpt || 'This page has no content yet.'} />
      </article>
    </PageShell>
  );
};

export const NewsList = ({ type, title, subtitle }) => {
  const query = type ? `?type=${type}` : '';
  const { data, loading } = useFetch(`/public/news${query}`);
  const items = data || [];

  return (
    <PageShell title={title} subtitle={subtitle}>
      {loading ? <Loading /> : items.length === 0 ? (
        <EmptyState title="Nothing published yet" message="Please check back soon." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Link key={item._id} to={`/news/${item.slug}`} className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-2">
                <Badge tone={item.type === 'notice' ? 'amber' : item.type === 'announcement' ? 'violet' : 'sky'}>{item.type}</Badge>
                <span className="text-xs text-slate-400">{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
              <h2 className="font-display mt-3 text-lg font-semibold tracking-tight text-slate-900 group-hover:text-brand-700">{item.title}</h2>
              {item.excerpt && <p className="mt-2 line-clamp-3 text-sm text-slate-500">{item.excerpt}</p>}
              <span className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-600">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export const NewsArticle = () => {
  const { slug } = useParams();
  const { data, loading } = useFetch(`/public/news/${encodeURIComponent(slug)}`);

  if (loading) return <Loading />;
  if (!data) {
    return <PageShell title="Article not found" subtitle="This article may have been unpublished.">
      <Link to="/news" className="text-sm font-semibold text-brand-600 hover:text-brand-800">← All news</Link>
    </PageShell>;
  }

  return (
    <PageShell
      title={data.title}
      subtitle={new Date(data.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
      actions={<Badge tone="sky">{data.type}</Badge>}
    >
      {data.coverImage && <img src={data.coverImage} alt="" className="mb-6 max-h-96 w-full rounded-3xl object-cover" />}
      <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
        {data.excerpt && <p className="mb-5 border-l-4 border-brand-200 pl-4 text-base font-medium text-slate-700">{data.excerpt}</p>}
        <Prose text={data.content} />
      </article>
      <Link to="/news" className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:text-brand-800">← All news</Link>
    </PageShell>
  );
};

export const GalleryPage = () => {
  const { data, loading } = useFetch('/public/gallery');
  const items = data || [];

  return (
    <PageShell title="Gallery" subtitle="Moments from classrooms, campus life and school events.">
      {loading ? <Loading /> : items.length === 0 ? (
        <EmptyState title="The gallery is empty" message="Photos will appear here soon." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <figure key={item._id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={item.image} alt={item.title || item.category} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="space-y-0.5 p-3">
                <p className="truncate text-sm font-semibold text-slate-800">{item.title || item.category}</p>
                <p className="text-xs text-slate-400">{item.category}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export const FacilitiesPage = () => {
  const { data, loading } = useFetch('/public/facilities');
  const items = data || [];

  return (
    <PageShell title="Campus facilities" subtitle="Spaces and services designed to support learning and wellbeing.">
      {loading ? <Loading /> : items.length === 0 ? (
        <EmptyState title="No facilities listed" message="Facility information will appear here." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              {item.image && <img src={item.image} alt={item.title} loading="lazy" className="h-40 w-full object-cover" />}
              <div className="p-5">
                <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">{item.title}</h2>
                {item.description && <p className="mt-2 whitespace-pre-line text-sm text-slate-500">{item.description}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export const AcademicPage = () => {
  const { data, loading } = useFetch('/public/academic');
  const items = data || [];

  return (
    <PageShell title="Academics" subtitle="Curriculum, calendar, results and the academic framework.">
      {loading ? <Loading /> : items.length === 0 ? (
        <EmptyState title="No academic information yet" message="Academic sections will appear here." />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item._id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900">{item.title}</h2>
              {item.content && <div className="mt-2"><Prose text={item.content} /></div>}
              {item.items?.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {item.items.map((entry, i) => <li key={i}>{entry}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default CmsPage;
