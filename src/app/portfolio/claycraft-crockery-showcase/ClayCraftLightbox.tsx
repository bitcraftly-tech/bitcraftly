'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { useClayCraftDemo } from './ClayCraftDemoContext';

export default function ClayCraftLightbox() {
  const { lightboxImage, closeLightbox } = useClayCraftDemo();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightboxImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxImage, closeLightbox]);

  if (!lightboxImage) return null;

  return (
    <div className="cc-overlay cc-lightbox" role="presentation">
      <button
        type="button"
        className="cc-overlay__backdrop"
        aria-label="Close image"
        onClick={closeLightbox}
      />
      <div
        className="cc-lightbox__frame"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-lightbox-caption"
      >
        <button
          ref={closeRef}
          type="button"
          className="cc-lightbox__close"
          aria-label="Close"
          onClick={closeLightbox}
        >
          <X aria-hidden />
        </button>
        <div className="cc-lightbox__media">
          <Image
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            width={1200}
            height={800}
            sizes="(max-width: 720px) 92vw, (max-width: 1100px) 80vw, 860px"
            priority
          />
        </div>
        <p id="cc-lightbox-caption" className="cc-lightbox__caption">
          {lightboxImage.alt}
        </p>
      </div>
    </div>
  );
}
