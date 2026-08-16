'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { TESTIMONIALS } from './local-services.content';

const AUTO_MS = 6500;

/** Auto-advancing testimonial stage with progress dots and keyboard controls. */
export default function LocalServicesVoices() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  const go = useCallback(
    (next: number) => {
      setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => go(index + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [go, index, paused, reduceMotion]);

  return (
    <section
      className="lsx-section lsx-voices"
      aria-labelledby="lsx-voices-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className={CONTAINER}>
        <LocalServicesReveal className="lsx-head lsx-head--center">
          <p className="lsx-eyebrow">Testimonials</p>
          <h2 id="lsx-voices-heading" className="lsx-title">
            Neighbours who booked again
          </h2>
          <p className="lsx-lead">
            Real-feeling stories from apartments and row houses across the city — the kind of proof
            that converts a hesitant enquiry.
          </p>
        </LocalServicesReveal>

        <LocalServicesReveal delay={0.1} className="lsx-voices__stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              className="lsx-voices__quote"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="lsx-voices__stars" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-current" aria-hidden />
                ))}
              </div>
              <p>&ldquo;{current.quote}&rdquo;</p>
              <footer>
                <span className="lsx-voices__avatar" aria-hidden>
                  {current.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span>
                  <strong>{current.name}</strong>
                  <span>
                    {current.role} · {current.job}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="lsx-voices__controls">
            <div className="lsx-voices__dots" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  className="lsx-voices__dot"
                  role="tab"
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-selected={itemIndex === index}
                  onClick={() => setIndex(itemIndex)}
                >
                  {itemIndex === index && !reduceMotion ? (
                    <motion.i
                      key={`${item.id}-progress`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      aria-hidden
                    />
                  ) : (
                    <i
                      aria-hidden
                      style={{ transform: `scaleX(${itemIndex === index ? 1 : 0})` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="lsx-voices__buttons">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
              >
                <ChevronLeft size={16} aria-hidden />
              </button>
              <button type="button" aria-label="Next testimonial" onClick={() => go(index + 1)}>
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </LocalServicesReveal>
      </div>
    </section>
  );
}
