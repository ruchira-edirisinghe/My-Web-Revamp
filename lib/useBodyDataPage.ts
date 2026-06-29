'use client';
import { useEffect } from 'react';

/**
 * Sets `document.body[data-page="..."]` on mount and restores it on unmount.
 * The original static pages set this attribute on <body> directly; in the
 * Next.js app the <body> lives in the shared root layout, so each route applies
 * its own value here. Some CSS (e.g. projects.css `body[data-page="projects-hub"]`)
 * depends on it. First paint is hidden by the full-screen preloader, so applying
 * it in an effect is visually identical to the original.
 */
export function useBodyDataPage(page?: string) {
  useEffect(() => {
    if (!page) return;
    const prev = document.body.getAttribute('data-page');
    document.body.setAttribute('data-page', page);
    return () => {
      if (prev === null) document.body.removeAttribute('data-page');
      else document.body.setAttribute('data-page', prev);
    };
  }, [page]);
}
