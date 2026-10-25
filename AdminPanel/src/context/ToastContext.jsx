// src/context/ToastContext.jsx
// Unified, app-wide transient notification system. Success/error/info notices
// are pushed here and rendered through a portal so they float above any layout.
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconAlert, IconBell, IconCheckCircle, IconX } from '../components/icons.jsx';

const ToastContext = createContext(null);

const TONES = {
  success: { wrap: 'border-emerald-200 bg-emerald-50', text: 'text-emerald-900', icon: 'text-emerald-600', Icon: IconCheckCircle },
  error: { wrap: 'border-rose-200 bg-rose-50', text: 'text-rose-900', icon: 'text-rose-600', Icon: IconAlert },
  info: { wrap: 'border-sky-200 bg-sky-50', text: 'text-sky-900', icon: 'text-sky-600', Icon: IconBell },
};

const DEFAULT_DURATION = { success: 4000, info: 4500, error: 6500 };

// Fallback so components can call useToast() even outside a provider (no crash).
const noopToast = {
  push: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
  dismiss: () => {},
};

export const useToast = () => useContext(ToastContext) || noopToast;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (text, type = 'info', duration) => {
      if (!text) return null;
      const id = (counter.current += 1);
      const tone = TONES[type] ? type : 'info';
      // Keep the stack bounded so a burst of events never fills the viewport.
      setToasts((prev) => [...prev.slice(-3), { id, text, type: tone }]);
      const ms = duration ?? DEFAULT_DURATION[tone];
      if (ms) setTimeout(() => dismiss(id), ms);
      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      push,
      dismiss,
      success: (text, duration) => push(text, 'success', duration),
      error: (text, duration) => push(text, 'error', duration),
      info: (text, duration) => push(text, 'info', duration),
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:items-end"
          role="region"
          aria-label="Notifications"
        >
          {toasts.map((t) => {
            const tone = TONES[t.type] || TONES.info;
            const { Icon } = tone;
            return (
              <div
                key={t.id}
                role={t.type === 'error' ? 'alert' : 'status'}
                aria-live={t.type === 'error' ? 'assertive' : 'polite'}
                className={`animate-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg shadow-slate-900/5 ${tone.wrap}`}
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone.icon}`} />
                <p className={`flex-1 text-sm font-medium ${tone.text}`}>{t.text}</p>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className={`-mr-1 rounded-lg p-1 transition hover:bg-black/5 ${tone.icon}`}
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
