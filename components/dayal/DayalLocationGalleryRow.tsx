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
    <section className="dayal-section bg-[color:var(--dayal-cream)]">
      <div className="dayal-container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <DayalReveal id="location">
            <p className="dayal-eyebrow">Location</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">Head Office & Site Address</h2>
            <div className="dayal-gold-line mt-5" />
            <ul className="mt-8 space-y-4 text-sm dayal-text-muted">
              <li className="rounded-xl border border-[color:var(--dayal-border)] bg-[color:var(--dayal-ivory)] p-4">
                <span className="font-semibold text-[color:var(--dayal-navy-mid)]">Head Office — </span>
                {DAYAL.officeAddress}
              </li>
              <li className="rounded-xl border border-[color:var(--dayal-border)] bg-[color:var(--dayal-ivory)] p-4">
                <span className="font-semibold text-[color:var(--dayal-navy-mid)]">Site Address — </span>
                {DAYAL.siteAddress}
              </li>
            </ul>
            <ul className="mt-6 space-y-3">
              {NEARBY.map((place) => {
                const Icon = NEARBY_ICONS[place.icon] ?? Route;
                return (
                  <li
                    key={place.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--dayal-border)] px-4 py-3.5"
                    style={{ background: "linear-gradient(90deg, var(--dayal-ivory), var(--dayal-cream))" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ background: "rgba(201, 169, 98, 0.15)", color: "var(--dayal-gold-dark)" }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{place.name}</span>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "rgba(201, 169, 98, 0.15)",
                        color: "var(--dayal-gold-dark)",
                      }}
                    >
                      {place.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DayalReveal>

          <DayalReveal delay={0.1} id="gallery">
            <p className="dayal-eyebrow">Gallery</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">A Glimpse into Our Crafted Spaces</h2>
            <p className="mt-4 text-sm dayal-text-muted">
              Explore stunning visuals of our completed and ongoing projects that reflect our
              commitment to excellence.
            </p>
            <div className="mt-8 grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[150px]">
              {GALLERY_IMAGES.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className={`dayal-image-frame group relative ${item.span}`}
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
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{ background: "rgba(6, 13, 28, 0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              className="dayal-image-frame relative aspect-video w-full max-w-4xl"
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
