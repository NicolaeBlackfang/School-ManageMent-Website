// components/layout/AppShell.jsx
import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { NAV } from './navConfig.js';
import Wordmark from './Wordmark.jsx';
import { roleLabel } from '../../core/nav.js';
import { IconLogOut, IconMenu, IconX } from '../icons.jsx';

const initials = (name) =>
  (name || '?')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const Avatar = ({ name, image, className = 'h-9 w-9 text-xs' }) => (
  image ? (
    <img src={image} alt="" className={`rounded-full object-cover ring-2 ring-white/20 ${className}`} />
  ) : (
    <span className={`flex items-center justify-center rounded-full bg-brand-500 font-bold text-white ring-2 ring-white/20 ${className}`}>
      {initials(name)}
    </span>
  )
);

const RailNav = ({ items, onNavigate }) => (
  <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Workspace">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        end={item.to === '/p/home'}
        className={({ isActive }) =>
          `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
            isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brass-400" />}
            <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-brass-300' : ''}`} />
            {item.label}
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

const RailBody = ({ items, user, onNavigate }) => (
  <>
    <div className="flex h-16 items-center border-b border-white/10 px-5">
      <Link to="/" aria-label="Home" onClick={onNavigate}><Wordmark dark /></Link>
    </div>
    <RailNav items={items} onNavigate={onNavigate} />
    <div className="border-t border-white/10 p-3">
      <Link to="/profile" onClick={onNavigate} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5">
        <Avatar name={user.name} image={user.profileImage} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-slate-400">{roleLabel(user.role)}</p>
        </div>
      </Link>
    </div>
  </>
);

export const AppShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const { pathname } = useLocation();

  if (!user) return null;

  const items = NAV[user.role] || NAV.student;
  const hasMore = items.length > 4;
  const bottomItems = hasMore ? items.slice(0, 3) : items;
  const current = items.find((i) => pathname.startsWith(i.to));
  const title = current ? current.label : 'Workspace';

  const onLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-brand-950 lg:flex">
        <RailBody items={items} user={user} />
      </aside>

      {/* Mobile slide-over drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setDrawer(false)}
          />
          <div className="animate-fade-in absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-brand-950 shadow-2xl">
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <IconX className="h-5 w-5" />
            </button>
            <RailBody items={items} user={user} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/85 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
              aria-label="Open menu"
            >
              <IconMenu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="font-display truncate text-lg font-bold tracking-tight text-slate-900">{title}</p>
              <p className="hidden text-xs text-slate-500 sm:block">{roleLabel(user.role)} workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 sm:text-sm">Public site</Link>
            <Link
              to="/profile"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 transition hover:border-slate-300"
            >
              <Avatar name={user.name} image={user.profileImage} className="h-8 w-8 text-xs" />
              <span className="hidden max-w-[10rem] truncate text-sm font-semibold text-slate-700 md:block">
                {user.name}
              </span>
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Sign out"
              title="Sign out"
            >
              <IconLogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Primary">
        <div className="mx-auto flex max-w-lg items-stretch">
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/p/home'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                  isActive ? 'text-brand-600' : 'text-slate-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-brand-600' : ''}`} />
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          {hasMore && (
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-slate-400"
              aria-label="More navigation"
            >
              <IconMenu className="h-5 w-5" />
              <span>More</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;
