// src/components/usePagination.js
// Client-side pagination state shared by list/table views.
import { useState } from 'react';

// Slices `items` into pages. Resets to the first page whenever the list,
// page size, or resetKey (e.g. active tab) changes, and clamps the current
// page when the derived page count shrinks. State is adjusted during render
// so derived values stay consistent immediately.
const PAGE_SIZE = 10;

// The second argument is retained for existing reset-key call sites; page size
// is intentionally fixed so all lists follow the same 10-item layout.
export const usePagination = (items, legacyPageSizeOrResetKey, resetKey) => {
  const [page, setPage] = useState(1);
  const effectiveResetKey = resetKey ?? (typeof legacyPageSizeOrResetKey === 'string' ? legacyPageSizeOrResetKey : undefined);
  const [view, setView] = useState([items.length, effectiveResetKey]);
  const total = items.length;

  if (view[0] !== total || view[1] !== effectiveResetKey) {
    setView([total, effectiveResetKey]);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  return {
    page: safePage,
    setPage,
    pageCount,
    pageItems: items.slice(start, start + PAGE_SIZE),
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + PAGE_SIZE, total),
  };
};
