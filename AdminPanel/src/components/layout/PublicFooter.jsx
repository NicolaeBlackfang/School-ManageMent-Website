// components/layout/PublicFooter.jsx
import { Link } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';

export const PublicFooter = () => (
  <footer className="mt-auto bg-gradient-to-b from-slate-900 to-brand-950 text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <Wordmark dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            A modern campus portal — admissions, attendance, results and notices in one tranquil place.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="transition-colors hover:text-brass-300">Home</Link></li>
            <li><Link to="/admission" className="transition-colors hover:text-brass-300">Admission</Link></li>
            <li><Link to="/founders" className="transition-colors hover:text-brass-300">Our Founders</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Portal</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/login" className="transition-colors hover:text-brass-300">Sign in</Link></li>
            <li><Link to="/register" className="transition-colors hover:text-brass-300">Create account</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Scholaris School Management. Secure session &amp; verified records.
      </div>
    </div>
  </footer>
);

export default PublicFooter;