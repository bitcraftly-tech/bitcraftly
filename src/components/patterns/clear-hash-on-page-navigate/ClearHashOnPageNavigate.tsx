'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Clears stale `#hash` fragments when navigating to normal page URLs.
 * Keeps intentional in-page anchors (`href="#section"`) and destination hashes.
 */
export function ClearHashOnPageNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (!window.location.hash) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#')) return;
      if (
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('javascript:')
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      // Destination wants its own hash (e.g. /solutions#business-solutions).
      if (url.hash) return;

      const cleanCurrent = `${window.location.pathname}${window.location.search}`;
      const cleanTarget = `${url.pathname}${url.search}`;

      // Same path without hash (e.g. logo → / while on /#section).
      if (cleanTarget === cleanCurrent) {
        event.preventDefault();
        window.history.replaceState(null, '', cleanCurrent);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        return;
      }

      // Different page — drop the current fragment before the router navigates.
      window.history.replaceState(null, '', cleanCurrent);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    // Leftover hash from a previous page (no matching element here) → clear.
    if (!document.getElementById(id)) {
      window.history.replaceState(null, '', `${pathname}${window.location.search}`);
    }
  }, [pathname]);

  return null;
}
