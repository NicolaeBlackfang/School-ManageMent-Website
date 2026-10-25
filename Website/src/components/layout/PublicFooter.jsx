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
  const [menu, setMenu] = useState(FALLBACK);

  useEffect(() => {
    api.get('/public/site')
      .then(({ data }) => {
        if (data.success) {
          setSite(data.site || {});
          if (Array.isArray(data.menu) && data.menu.length) setMenu(data.menu);
        }
      })
      .catch(() => {});
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
              <li><Link to="/login" className="transition-colors hover:text-brass-300">Sign in</Link></li>
              <li><Link to="/register" className="transition-colors hover:text-brass-300">Create account</Link></li>
              <li><Link to="/admission" className="transition-colors hover:text-brass-300">Apply for admission</Link></li>
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
