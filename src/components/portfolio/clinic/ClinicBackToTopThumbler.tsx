'use client';

import { ChevronUp } from 'lucide-react';
import { useSyncExternalStore } from 'react';

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true });
  window.addEventListener('resize', onStoreChange, { passive: true });
  return () => {
    window.removeEventListener('scroll', onStoreChange);
    window.removeEventListener('resize', onStoreChange);
  };
}

function subscribeNothing() {
  return () => {};
}

/**
 * Right-edge back-to-top thumbler — slides in after scroll, jumps to `#top`.
 */
export default function ClinicBackToTopThumbler() {
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
  const visible = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 360,
    () => false,
  );

  if (!mounted) return null;

  return (
    <button
      type="button"
      className={`cl-back-thumbler${visible ? ' cl-back-thumbler--visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        document.getElementById('top')?.focus({ preventScroll: true });
      }}
    >
      <ChevronUp className="cl-back-thumbler__icon" aria-hidden />
      <span className="cl-back-thumbler__label">Back to top</span>
    </button>
  );
}
