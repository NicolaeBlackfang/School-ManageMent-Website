// src/components/Pagination.jsx
// Reusable client-side pagination controls for large tables/lists.
import { IconBack } from './icons.jsx';

const PAGE_SIZES = [10, 20, 50];

export const Pagination = ({ page, pageCount, setPage, pageSize, setPageSize, from, to, total, itemLabel = 'items' }) => {
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

  const navBtn =
    'inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>
          Showing <b className="text-slate-700">{from}</b>–<b className="text-slate-700">{to}</b> of{' '}
          <b className="text-slate-700">{total}</b> {itemLabel}
        </span>
        {setPageSize && (
          <label className="flex items-center gap-1.5">
            <span className="hidden sm:inline">Rows</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 focus:border-brand-500 focus:outline-none"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1} className={navBtn} aria-label="Previous page">
            <IconBack className="h-3.5 w-3.5" />
          </button>
          {numbers.map((n, i) =>
            n === '…' ? (
              <span key={`gap-${i}`} className="px-1 text-xs text-slate-400">…</span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === page ? 'page' : undefined}
                className={
                  n === page
                    ? 'inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-brand-600 px-2 text-xs font-bold text-white'
                    : navBtn
                }
              >
                {n}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === pageCount}
            className={`${navBtn} rotate-180`}
            aria-label="Next page"
          >
            <IconBack className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
