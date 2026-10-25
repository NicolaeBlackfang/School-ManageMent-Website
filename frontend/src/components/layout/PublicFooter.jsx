// components/layout/PublicFooter.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../core/api.js';
import Wordmark from './Wordmark.jsx';

const FALLBACK = [
  { label: 'Home', url: '/' },
  { label: 'Admission', url: '/admission' },
  { label: 'Our Founders', url: '/founders' },
];

const isExternal = (item) => item.isExternal || /^https?:\/\//i.test(item.url || '');

const FooterLink = ({ item }) =>
  isExternal(item) ? (
    <a href={item.url} target={item.openInNewTab ? '_blank' : undefined} rel="noreferrer" className="transition-colors hover:text-brass-300">
      {item.label}
    </a>
  ) : (
    <Link to={item.url} className="transition-colors hover:text-brass-300">{item.label}</Link>
  );

export const PublicFooter = () => {
  const [site, setSite] = useState({});
  const [menu, setMenu] = useState(FALLBACK.filter((item) => item.url !== '/admission'));

  useEffect(() => {
    Promise.all([api.get('/cms/public/site'), api.get('/config')])
      .then(([{ data }, configRes]) => {
        if (data.success) {
          setSite(data.site || {});
          const links = Array.isArray(data.menu) && data.menu.length ? data.menu : FALLBACK;
          setMenu(configRes.data?.data?.admissionsOpen ? links : links.filter((item) => item.url !== '/admission'));
        }
      })
      .catch(() => setMenu((items) => items.filter((item) => item.url !== '/admission')));
  }, []);

  return (
    <footer className="mt-auto bg-gradient-to-b from-slate-900 to-brand-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark dark name={site.schoolName} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.tagline || 'A modern campus portal — admissions, attendance, results and notices in one tranquil place.'}
            </p>
            {(site.address || site.phone || site.email) && (
              <div className="mt-4 space-y-1 text-sm text-slate-400">
                {site.address && <p>{site.address}</p>}
                {site.phone && <p>{site.phone}</p>}
                {site.email && <p>{site.email}</p>}
              </div>
            )}
            {(site.facebook || site.youtube) && (
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                {site.facebook && <a href={site.facebook} target="_blank" rel="noreferrer" className="transition-colors hover:text-brass-300">Facebook</a>}
                {site.youtube && <a href={site.youtube} target="_blank" rel="noreferrer" className="transition-colors hover:text-brass-300">YouTube</a>}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {menu.slice(0, 8).map((item) => (
                <li key={item._id || item.url}><FooterLink item={item} /></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Portal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/login" className="transition-colors hover:text-brass-300">Login</Link></li>
              <li><Link to="/signup" className="transition-colors hover:text-brass-300">Sign up</Link></li>
              {menu.some((item) => item.url === '/admission' || item.children?.some((child) => child.url === '/admission')) && <li><Link to="/admission" className="transition-colors hover:text-brass-300">Apply for admission</Link></li>}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {site.schoolName || 'Scholaris'} School Management. Secure session &amp; verified records.
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
