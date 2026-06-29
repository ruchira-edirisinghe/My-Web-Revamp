'use client';
import { useEffect } from 'react';
import { initScrollTop } from '@/lib/scripts/scroll-top';

/** Renders nothing — injects the shared floating "scroll to top" control. */
export default function ScrollTop() {
  useEffect(() => initScrollTop(), []);
  return null;
}
