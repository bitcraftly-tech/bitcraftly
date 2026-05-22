"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  MapPin,
  Plane,
  ShoppingBag,
  TrainFront,
  Route,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { DAYAL, GALLERY_IMAGES, NEARBY } from "@/lib/dayal/data";

const NEARBY_ICONS: Record<string, LucideIcon> = {
  school: GraduationCap,
  hospital: HeartPulse,
  train: TrainFront,
  market: ShoppingBag,
  highway: Route,
  plane: Plane,
};

function galleryTileClass(index: number): string {
  if (index === 0) return "col-span-2 row-span-2 min-h-[7.5rem] sm:min-h-0";
  if (index === 9) return "col-span-2";
  return "";
}

function ColumnHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 lg:mb-7">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">{label}</p>
      <div className="dayal-gold-line mt-3" aria-hidden />
      <h2 className="dayal-serif mt-3 text-2xl font-semibold leading-tight text-[#0b1633] sm:text-[1.65rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5c6478]">{description}</p>
      ) : null}
    </header>
  );
}

function GalleryLightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = GALLERY_IMAGES[index];
  const total = GALLERY_IMAGES.length;
  const progress = ((index + 1) / total) * 100;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="dayal-on-dark fixed inset-0 z-[70] flex items-center justify-center bg-[#0b1633]/88 p-4 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery slideshow"
    >
      <motion.div
        className="flex w-[min(92vw,60rem)] max-w-full flex-col overflow-hidden rounded-xl border border-[#c8a46b]/20 bg-[#0b1633] shadow-[0_24px_80px_rgba(0,0,0,0.55)] aspect-[3/2] max-h-[min(85dvh,calc(92vw*2/3))]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c8a46b]">Gallery</p>
            <p className="dayal-serif truncate text-sm text-white sm:text-base">Crafted Spaces</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs tabular-nums text-white/75">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c8a46b] text-[#0b1633] transition hover:bg-[#d4b57d]"
              aria-label="Close gallery"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-[#06101f]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={item.src} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
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
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c8a46b] text-[#0b1633] shadow-md transition hover:bg-[#d4b57d] sm:right-3"
            aria-label="Next image"
            onClick={onNext}
          >
            <ChevronRight className="h-5 w-5" />
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

export default function DayalLocationGalleryRow() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const total = GALLERY_IMAGES.length;
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="dayal-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0 xl:gap-x-16">
          <DayalReveal id="location" className="lg:pr-2">
            <ColumnHeader label="Location" title="Head Office & Site Address" />

            <div className="space-y-3">
              <div className="flex gap-4 rounded-xl border border-[#0b1633]/8 bg-[#f8f6f2] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c8a46b]/15 text-[#c8a46b]">
                  <Building2 className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c8a46b]">
                    Head Office
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5c6478]">{DAYAL.officeAddress}</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-[#0b1633]/8 bg-[#f8f6f2] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c8a46b]/15 text-[#c8a46b]">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c8a46b]">
                    Site Address
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5c6478]">{DAYAL.siteAddress}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b1633]/55">
              Nearby & connected
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {NEARBY.map((place) => {
                const Icon = NEARBY_ICONS[place.icon] ?? Route;
                return (
                  <li
                    key={place.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-[#0b1633]/8 bg-[#fffdf9] px-3 py-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#c8a46b]/12 text-[#c8a46b]">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="truncate text-sm font-medium text-[#0b1633]">{place.name}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                      {place.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DayalReveal>

          <DayalReveal delay={0.08} id="gallery" className="min-w-0 lg:border-l lg:border-[#0b1633]/10 lg:pl-14 xl:pl-16">
            <ColumnHeader
              label="Gallery"
              title="A Glimpse into Our Crafted Spaces"
              description="Explore stunning visuals of our completed and ongoing projects that reflect our commitment to excellence."
            />

            <div
              className="grid min-w-0 grid-cols-3 grid-flow-dense gap-2 auto-rows-[4.75rem] sm:auto-rows-[5.25rem] lg:auto-rows-[5rem]"
              role="list"
            >
              {GALLERY_IMAGES.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  role="listitem"
                  className={`group relative min-h-0 overflow-hidden rounded-lg bg-[#0b1633]/5 ring-1 ring-[#0b1633]/8 transition hover:ring-[#c8a46b]/40 ${galleryTileClass(index)}`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 18vw"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[#0b1633]/0 transition group-hover:bg-[#0b1633]/10" />
                </button>
              ))}
            </div>
          </DayalReveal>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <GalleryLightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={goPrev}
            onNext={goNext}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
