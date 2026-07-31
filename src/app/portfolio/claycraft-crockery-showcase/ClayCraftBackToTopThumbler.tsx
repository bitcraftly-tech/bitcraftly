'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Right-edge back-to-top thumbler — ClayCraft showcase only.
 */
export default function ClayCraftBackToTopThumbler() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      className={`cc-back-thumbler${visible ? ' cc-back-thumbler--visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        document.getElementById('top')?.focus({ preventScroll: true });
      }}
    >
      <span className="cc-back-thumbler__icon-wrap" aria-hidden>
        <ArrowUp className="cc-back-thumbler__icon" strokeWidth={2.4} />
      </span>
      <span className="cc-back-thumbler__label">Back to top</span>
    </button>
  );
}
