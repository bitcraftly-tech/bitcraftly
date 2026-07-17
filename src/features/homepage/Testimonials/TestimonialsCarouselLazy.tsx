"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";

const loadCarousel = () =>
  import("./TestimonialsCarousel").then((mod) => mod.TestimonialsCarousel);

/** Defers testimonials carousel hydration until near viewport. */
export function TestimonialsCarouselLazy() {
  return (
    <MountWhenVisible
      load={loadCarousel}
      fallback={
        <div
          className="min-h-[22rem] w-full rounded-[var(--token-radius-lg)] bg-background/60"
          aria-hidden
        />
      }
    />
  );
}
