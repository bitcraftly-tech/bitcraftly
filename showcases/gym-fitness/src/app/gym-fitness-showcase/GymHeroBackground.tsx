'use client';

import { useEffect, useState } from 'react';

import { getHeroSlidesForCity } from '@bitcraftly/showcase-gym-fitness/app/gym-fitness-showcase/gym-demo-data';

const SLIDE_MS = 4500;

type GymHeroBackgroundProps = {
  city: string;
  centerName: string;
};

/** Full-bleed city photo rotator — no pagination UI. */
export default function GymHeroBackground({ city, centerName }: GymHeroBackgroundProps) {
  const slides = getHeroSlidesForCity(city);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [city]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [city, reduceMotion, slides.length]);

  return (
    <div className="gym-hero__slides" aria-hidden>
      {slides.map((src, i) => (
        <div
          key={`${city}-${i}-${src}`}
          className={`gym-hero__slide${i === index ? ' is-active' : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="gym-hero__slide-img"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={(e) => {
              const el = e.currentTarget;
              if (el.dataset.fallback === '1') return;
              el.dataset.fallback = '1';
              el.src = `https://picsum.photos/seed/fitrally-hero-${city}-${i}/1600/1000`;
            }}
          />
        </div>
      ))}
      <span className="sr-only">
        {centerName} background · {index + 1}/{slides.length}
      </span>
    </div>
  );
}
