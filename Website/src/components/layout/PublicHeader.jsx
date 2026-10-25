// components/layout/PublicHeader.jsx
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../../core/api.js';
import Wordmark from './Wordmark.jsx';
import { IconMenu, IconX } from '../icons.jsx';

const FALLBACK_LINKS = [
  { _id: 'home', label: 'Home', url: '/' },
  { _id: 'admission', label: 'Admission', url: '/admission' },
  { _id: 'founders', label: 'Our Founders', url: '/founders' },
  { _id: 'news', label: 'News', url: '/news' },
  { _id: 'notices', label: 'Notices', url: '/notices' },
  { _id: 'gallery', label: 'Gallery', url: '/gallery' },
];

const isExternal = (item) => item.isExternal || /^https?:\/\//i.test(item.url || '');

const MenuLink = ({ item, mobile = false, onNavigate }) => {
  const className = ({ isActive } = {}) =>
    `${mobile ? 'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold' : 'rounded-lg px-3 py-2 text-sm font-medium'} transition-colors ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  if (isExternal(item)) {
    return (
      <a
        href={item.url}
        target={item.openInNewTab ? '_blank' : undefined}
        rel={item.openInNewTab ? 'noreferrer noopener' : undefined}
        onClick={onNavigate}
        className={className()}
      >
        {item.label}
      </a>
    );
  }

  return (
    <NavLink to={item.url} end={item.url === '/'} onClick={onNavigate} className={className}>
      {item.label}
    </NavLink>
  );
};

export const PublicHeader = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(FALLBACK_LINKS);
  const [site, setSite] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    api.get('/public/site')
      .then(({ data }) => {
        if (data.success) {
          if (Array.isArray(data.menu) && data.menu.length) setMenu(data.menu);
          setSite(data.site || {});
        }
      })
      .catch(() => {});

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur transition-shadow ${
        scrolled ? 'border-slate-200/90 bg-slate-50/95 shadow-sm' : 'border-slate-200/60 bg-slate-50/80'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label={`${site.schoolName || 'Scholaris'} home`} className="shrink-0">
          <Wordmark name={site.schoolName} />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {menu.slice(0, 8).map((item) => (
            <div key={item._id || item.url} className="group relative">
              <MenuLink item={item} />
              {item.children?.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 w-56 origin-top-left rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <MenuLink key={child._id || child.url} item={child} mobile />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Create account
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile slide-over drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
            <Wordmark name={site.schoolName} />
            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
              aria-label="Close menu"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            {menu.map((item) => (
              <div key={item._id || item.url}>
                <MenuLink item={item} mobile onNavigate={item.children?.length ? undefined : close} />
                {item.children?.length > 0 && (
                  <div className="ml-3 border-l border-slate-200 pl-2">
                    {item.children.map((child) => (
                      <MenuLink key={child._id || child.url} item={child} mobile onNavigate={close} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-2 border-t border-slate-200 p-4">
            <Link to="/login" onClick={close} className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">
              Sign in
            </Link>
            <Link to="/register" onClick={close} className="block rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white">
              Create account
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default PublicHeader;
