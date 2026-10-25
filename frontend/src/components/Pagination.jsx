// src/components/Pagination.jsx
// Reusable client-side pagination controls for large tables/lists.
import { IconBack } from './icons.jsx';

export const Pagination = ({ page, pageCount, setPage, from, to, total, itemLabel = 'items' }) => {
  if (total === 0) return null;

  const numbers = [];
  const start = Math.max(1, page - 1);
  const end = Math.min(pageCount, page + 1);
  if (start > 1) {
    numbers.push(1);
    if (start > 2) numbers.push('…');
  }
  for (let i = start; i <= end; i += 1) numbers.push(i);
  if (end < pageCount) {
    if (end < pageCount - 1) numbers.push('…');
    numbers.push(pageCount);
  }

  const navBtn = 'inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40';
  const pageBtn = 'inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';

  return (
    <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-white/80 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:justify-start">
        <span aria-live="polite">Showing <b className="text-slate-800">{from}–{to}</b> of <b className="text-slate-800">{total}</b> {itemLabel}</span>
      </div>

      {pageCount > 1 && (
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button type="button" onClick={() => setPage(1)} disabled={page === 1} className={`${navBtn} hidden sm:inline-flex`} aria-label="First page" title="First page">
            <IconBack className="h-4 w-4" /><IconBack className="-ml-2 h-4 w-4" />
          </button>
          <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1} className={navBtn} aria-label="Previous page" title="Previous page">
            <IconBack className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-medium text-slate-500 sm:hidden">Page {page} of {pageCount}</span>
          <div className="hidden items-center gap-1 sm:flex">
          {numbers.map((n, index) =>
            n === '…' ? (
              <span key={`gap-${index}`} aria-hidden="true" className="px-1.5 text-sm text-slate-400">…</span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === page ? 'page' : undefined}
                aria-label={`Page ${n}`}
                className={
                  n === page
                    ? `${pageBtn} bg-indigo-600 text-white shadow-sm shadow-indigo-600/20`
                    : `${pageBtn} text-slate-600 hover:bg-slate-100`
                }
              >
                {n}
              </button>
            )
          )}
          </div>
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === pageCount}
            className={navBtn}
            aria-label="Next page"
            title="Next page"
          >
            <IconBack className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => setPage(pageCount)} disabled={page === pageCount} className={`${navBtn} hidden sm:inline-flex`} aria-label="Last page" title="Last page">
            <IconBack className="h-4 w-4 rotate-180" /><IconBack className="-ml-2 h-4 w-4 rotate-180" />
          </button>
        </nav>
      )}
    </div>
  );
};
