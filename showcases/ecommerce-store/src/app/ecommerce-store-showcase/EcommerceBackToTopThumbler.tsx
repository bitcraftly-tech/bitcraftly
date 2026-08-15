'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Right-edge “thumbler” tab — slides in after scroll, jumps to page top.
 */
export default function EcommerceBackToTopThumbler() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      className={`ec-back-thumbler${visible ? ' ec-back-thumbler--visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }}
    >
      <ChevronUp className="ec-back-thumbler__icon" aria-hidden />
      <span className="ec-back-thumbler__label">Back to top</span>
    </button>
  );
}
