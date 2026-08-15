'use client';

import { ArrowRight, BadgeCheck, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';

import { TOY_HERO_FEATURES, TOY_HERO_SLIDES } from './toy-data';

const FEATURE_ICONS = {
  safe: Heart,
  quality: BadgeCheck,
  fun: Sparkles,
} as const;

const AUTO_MS = 5600;

export function ToyHeroCarousel() {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = TOY_HERO_SLIDES[index] ?? TOY_HERO_SLIDES[0];

  const goTo = useCallback((next: number) => {
    const total = TOY_HERO_SLIDES.length;
    setIndex(((next % total) + total) % total);
  }, []);

  useEffect(() => {
    if (paused) {
      return undefined;
    }
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % TOY_HERO_SLIDES.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="toy-hero__banner"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="toy-hero__waves" aria-hidden />

      <div className="toy-hero__slide" aria-live="polite" aria-atomic="true">
        <div className="toy-hero__copy">
          <h1 id={labelId} className="toy-hero__title">
            {slide.titleLead}{' '}
            <span className="toy-text-mark toy-text-mark--solid">{slide.titleAccent}</span>
            {slide.titleMiddle ? <> {slide.titleMiddle}</> : null}
            <br />
            <span className="toy-text-mark">{slide.titleGradient}</span>
          </h1>
          <p className="toy-hero__desc">{slide.description}</p>

          <ul className="toy-hero__features" aria-label="Store promises">
            {TOY_HERO_FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li key={feature.title}>
                  <span className="toy-hero__feature-icon" aria-hidden>
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className="toy-hero__feature-text">
                    <strong>{feature.title}</strong>
                    <span>{feature.desc}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="toy-hero__actions">
            <a href={slide.primaryCta.href} className="toy-btn toy-btn--primary">
              {slide.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={slide.secondaryCta.href} className="toy-btn toy-btn--ghost">
              {slide.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="toy-hero__visual">
          {TOY_HERO_SLIDES.map((item, i) => (
            <div
              key={item.id}
              className={`toy-hero__visual-frame${i === index ? ' is-active' : ''}`}
              aria-hidden={i !== index}
            >
              <Image
                src={item.image}
                alt={i === index ? item.imageAlt : ''}
                fill
                sizes="(max-width: 860px) 100vw, 560px"
                className="toy-hero__composition"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="toy-hero__badge-sale" aria-hidden>
            <span>{slide.badgeTop}</span>
            <strong>{slide.badgeMain}</strong>
            <span>{slide.badgeBottom}</span>
          </div>
        </div>
      </div>

      <div className="toy-hero__dots" role="tablist" aria-label="Hero slides">
        {TOY_HERO_SLIDES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={`toy-hero__dot${i === index ? ' is-active' : ''}`}
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}: ${item.titleAccent} ${item.titleGradient}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
