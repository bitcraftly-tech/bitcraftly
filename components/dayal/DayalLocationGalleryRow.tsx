"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Plane,
  ShoppingBag,
  TrainFront,
  Route,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

export default function DayalLocationGalleryRow() {
  const [lightbox, setLightbox] = useState<(typeof GALLERY_IMAGES)[number] | null>(null);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <DayalReveal id="location">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Location
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Head Office & Site Address
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-[#5c6478]">
              <li>
                <span className="font-semibold text-[#0b1633]">Head Office — </span>
                {DAYAL.officeAddress}
              </li>
              <li>
                <span className="font-semibold text-[#0b1633]">Site Address — </span>
                {DAYAL.siteAddress}
              </li>
            </ul>
            <ul className="mt-6 space-y-3">
              {NEARBY.map((place) => {
                const Icon = NEARBY_ICONS[place.icon] ?? Route;
                return (
                  <li
                    key={place.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[#0b1633]/8 bg-[#f8f6f2] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c8a46b]/15 text-[#c8a46b]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-[#0b1633]">{place.name}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {place.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DayalReveal>

          <DayalReveal delay={0.1} id="gallery">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Gallery
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              A Glimpse into Our Crafted Spaces
            </h2>
            <p className="mt-3 text-sm text-[#5c6478]">
              Explore stunning visuals of our completed and ongoing projects that reflect our
              commitment to excellence.
            </p>
            <div className="mt-6 grid auto-rows-[120px] grid-cols-2 gap-2 sm:auto-rows-[140px]">
              {GALLERY_IMAGES.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className={`group relative overflow-hidden rounded-lg ${item.span}`}
                  onClick={() => setLightbox(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </DayalReveal>
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
              aria-label="Close"
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
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" sizes="100vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
