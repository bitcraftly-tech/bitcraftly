"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { TESTIMONIALS } from "./testimonials.constants";

const AUTO_PLAY_MS = 6000;

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <div
      className="testimonials-carousel w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="testimonials-stage" aria-roledescription="carousel">
        {TESTIMONIALS.map((item, slideIndex) => {
          const active = slideIndex === index;
          return (
            <figure
              key={item.id}
              className={cn(
                "testimonials-card testimonials-slide m-0 flex h-full min-h-full flex-col !p-[16px]",
                active && "is-active",
              )}
              aria-hidden={!active}
              aria-live={active ? "polite" : undefined}
              aria-atomic={active ? true : undefined}
            >
              {item.rating > 0 ? (
                <div
                  className="testimonials-card__rating flex items-center gap-[4px]"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Icon
                      key={`${item.id}-star-${starIndex}`}
                      name="star"
                      size="sm"
                      aria-hidden
                      className="h-[14px] w-[14px] text-primary"
                    />
                  ))}
                </div>
              ) : null}

              <blockquote className="m-0">
                <p
                  className={cn(
                    "m-0 font-sans text-[16px] font-medium leading-[1.65]",
                    "tracking-[-0.01em] text-foreground",
                    "sm:text-[18px]",
                  )}
                >
                  “{item.quote}”
                </p>
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-[var(--space-sm)]">
                {item.photoSrc ? (
                  <span className="relative size-[44px] shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={item.photoSrc}
                      alt={item.name}
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                    />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "testimonials-avatar grid size-[44px] place-items-center",
                      "rounded-full font-sans text-[13px] font-bold",
                    )}
                    aria-hidden
                  >
                    {item.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="m-0 font-sans text-[14px] font-bold text-foreground">
                    {item.name}
                  </p>
                  <p className="m-0 font-sans text-[13px] text-muted-foreground">
                    {item.role}, {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Controls always below the card: arrows left, progress dots right */}
      <div className="testimonials-controls">
        <div className="testimonials-controls__nav-group">
          <button
            type="button"
            className="testimonials-nav"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
          >
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px] rotate-180"
            />
          </button>
          <button
            type="button"
            className="testimonials-nav"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
          >
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px]"
            />
          </button>
        </div>

        <div
          className="testimonials-controls__dots"
          role="tablist"
          aria-label="Proof slides"
        >
          {TESTIMONIALS.map((entry, dotIndex) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Show slide ${dotIndex + 1}`}
              className={cn(
                "testimonials-dot",
                dotIndex === index && "is-active",
              )}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
