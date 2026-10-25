// components/layout/Wordmark.jsx
import { IconGraduation } from '../icons.jsx';

export const Wordmark = ({ dark = false, compact = false, name = 'Scholaris' }) => (
  <div className="flex items-center gap-2.5">
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${
        dark ? 'bg-gradient-to-br from-brass-300 to-brass-600 text-slate-950' : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
      }`}
    >
      <IconGraduation className="h-5 w-5" />
    </span>
    {!compact && (
      <span className="leading-tight">
        <span
          className={`font-display block text-lg font-semibold tracking-tight ${
            dark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {name || 'Scholaris'}
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          School Management
        </span>
      </span>
    )}
  </div>
);

export default Wordmark;