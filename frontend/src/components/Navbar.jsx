// src/components/Navbar.jsx
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/react.svg';
import { IconGraduation, IconLogOut, IconUser, IconChevronDown, IconMenu, IconX } from './icons.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    setMobileOpen(false);
    logout();
    navigate('/login');
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const dashboardPath = user ? `/${user.role}/dashboard` : '/';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-sky-500 text-white shadow-sm">
            <IconGraduation className="h-5 w-5" />
          </span>
          <span className="hidden text-[15px] font-bold tracking-tight text-slate-900 sm:block">
            Nurul Alam ChudirPo
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 ring-1 ring-brand-100 md:inline-flex">
                {user.role}
              </span>

              <span className="hidden text-sm font-medium text-slate-500 lg:block">
                Welcome, <span className="font-semibold text-slate-800">{user.name}</span>
              </span>

              <Link
                to={dashboardPath}
                className="hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
              >
                Dashboard
              </Link>

              {/* Profile menu trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-full ring-2 ring-transparent transition hover:ring-brand-200 focus:outline-none"
                  aria-label="Account menu"
                >
                  <img
                    src={user?.profileImage && user.profileImage !== "" ? user.profileImage : defaultAvatar}
                    alt="User Profile"
                    className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                  />
                  <IconChevronDown className={`h-3.5 w-3.5 text-slate-400 transition ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                {menuOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default"
                      aria-label="Close menu"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-48 animate-scale-in overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">
                      <div className="border-b border-slate-100 px-4 py-2.5">
                        <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <IconUser className="h-4 w-4 text-slate-400" /> Profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                      >
                        <IconLogOut className="h-4 w-4" /> Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 sm:block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:block"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-slate-200 bg-white px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {user ? (
              <>
                <div className="mb-2 flex items-center gap-3 px-2 py-2">
                  <img
                    src={user?.profileImage && user.profileImage !== "" ? user.profileImage : defaultAvatar}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-xs capitalize text-slate-500">{user.role} account</p>
                  </div>
                </div>
                <Link to={dashboardPath} onClick={closeMenus} className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Dashboard
                </Link>
                <Link to="/profile" onClick={closeMenus} className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-2 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenus} className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Login
                </Link>
                <Link to="/register" onClick={closeMenus} className="rounded-lg px-2 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;