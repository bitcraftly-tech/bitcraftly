'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export type GalleryItem = {
  readonly src: string;
  readonly alt: string;
};

type Props = {
  items: readonly GalleryItem[];
  index: number;
  titleId: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Shared gallery lightbox — arrow keys, Escape, focus capture and scroll lock. */
export default function DayalGalleryLightbox({
  items,
  index,
  titleId,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const item = items[index];
  const total = items.length;
  const progress = ((index + 1) / total) * 100;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!item) return null;

  return (
    <motion.div
      className="dayal-on-dark fixed inset-0 z-[70] flex items-center justify-center bg-[#0b1633]/88 p-4 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.div
        className="flex aspect-3/2 max-h-[min(85dvh,calc(92vw*2/3))] w-[min(92vw,60rem)] max-w-full flex-col overflow-hidden rounded-xl border border-[#c8a46b]/20 bg-[#0b1633] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c8a46b]">
              Gallery
            </p>
            <p id={titleId} className="dayal-serif truncate text-sm text-white sm:text-base">
              {item.alt}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs tabular-nums text-white/75">
              {index + 1} / {total}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c8a46b] text-[#0b1633] transition hover:bg-[#d4b57d]"
              aria-label="Close gallery"
              onClick={onClose}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-[#06101f]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 960px) 92vw, 960px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c8a46b] text-[#0b1633] shadow-md transition hover:bg-[#d4b57d] sm:left-3"
            aria-label="Previous image"
            onClick={onPrev}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c8a46b] text-[#0b1633] shadow-md transition hover:bg-[#d4b57d] sm:right-3"
            aria-label="Next image"
            onClick={onNext}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="shrink-0 border-t border-white/10 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="h-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-[#c8a46b]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
