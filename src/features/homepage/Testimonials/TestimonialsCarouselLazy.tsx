'use client';

import dynamic from 'next/dynamic';

const TestimonialsCarousel = dynamic(
  () => import('./TestimonialsCarousel').then((mod) => mod.TestimonialsCarousel),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[12rem] w-full rounded-[var(--token-radius-lg)] bg-background/60"
        aria-hidden="true"
      />
    ),
  },
);

/** Client carousel — SSR shell keeps section height stable (no blank IO gate). */
export function TestimonialsCarouselLazy() {
  return <TestimonialsCarousel />;
}
