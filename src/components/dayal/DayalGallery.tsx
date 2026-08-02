'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import DayalReveal from '@/components/dayal/DayalReveal';

const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    alt: 'Luxury villa exterior',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    alt: 'Modern living room',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa5a6c3?w=600&q=80',
    alt: 'Township landscape',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
    alt: 'Pool and amenities',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f86d690ca?w=900&q=80',
    alt: 'Aerial drone view',
    span: 'lg:col-span-2',
  },
] as const;

export default function DayalGallery() {
  const [lightbox, setLightbox] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <section id="gallery" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Gallery
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
            Cinematic Visual Experience
          </h2>
        </DayalReveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:grid-cols-4 lg:gap-4">
          {GALLERY.map((item, i) => (
            <DayalReveal key={item.src} delay={i * 0.05} className={item.span}>
              <button
                type="button"
                className={`group relative h-full w-full overflow-hidden rounded-xl ${item.span}`}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {i === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-[#0b1633]/30 opacity-0 transition group-hover:opacity-100">
                    <Play className="h-12 w-12 text-white" />
                  </span>
                )}
              </button>
            </DayalReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b1633]/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Close preview"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
