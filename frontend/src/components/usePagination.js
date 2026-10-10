// src/components/usePagination.js
// Client-side pagination state shared by list/table views.
import { useState } from 'react';

// Slices `items` into pages. Resets to the first page whenever the list,
// page size, or resetKey (e.g. active tab) changes, and clamps the current
// page when the derived page count shrinks. State is adjusted during render
// so derived values stay consistent immediately.
export const usePagination = (items, initialPageSize = 10, resetKey) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [view, setView] = useState([items.length, pageSize, resetKey]);
  const total = items.length;

  if (view[0] !== total || view[1] !== pageSize || view[2] !== resetKey) {
    setView([total, pageSize, resetKey]);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  return {
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    pageItems: items.slice(start, start + pageSize),
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, total),
  };
};
