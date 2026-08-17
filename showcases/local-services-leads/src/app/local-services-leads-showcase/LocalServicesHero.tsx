'use client';

import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesCounter from './LocalServicesCounter';
import LocalServicesReveal from './LocalServicesReveal';
import { DISPATCH_FEED, HERO_STATS } from './local-services.content';

const TITLE_WORDS = ['Reliable', 'local', 'services'] as const;

/** Motion-led hero with live dispatch card and animated trust metrics. */
export default function LocalServicesHero() {
  const reduceMotion = useReducedMotion();
  const [activeJob, setActiveJob] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveJob((current) => (current + 1) % DISPATCH_FEED.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section id="top" className="lsx-hero" aria-labelledby="lsx-hero-heading">
      <div className="lsx-hero__grid-lines" aria-hidden />
      <div className="lsx-hero__blob lsx-hero__blob--one" aria-hidden />
      <div className="lsx-hero__blob lsx-hero__blob--two" aria-hidden />

      <div className={`${CONTAINER} lsx-hero__inner`}>
        <div className="lsx-hero__copy">
          <LocalServicesReveal>
            <p className="lsx-hero__badge">
              <span aria-hidden>
                <Sparkles size={14} strokeWidth={2} />
              </span>
              Jamshedpur · verified home crews
            </p>
          </LocalServicesReveal>

          <h1 id="lsx-hero-heading">
            {TITLE_WORDS.map((word, index) => (
              <motion.span
                key={word}
                className="lsx-hero__word"
                style={{ marginRight: '0.28em' }}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="lsx-hero__mark"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              at your doorstep
            </motion.span>
          </h1>

          <LocalServicesReveal delay={0.18}>
            <p className="lsx-hero__lead">
              Steel City Home Pros connects you with verified plumbers, electricians, AC techs and
              cleaners — quote-first, WhatsApp-native, and zone-aware for every Jamshedpur
              neighbourhood.
            </p>
          </LocalServicesReveal>

          <LocalServicesReveal delay={0.26}>
            <div className="lsx-hero__actions">
              <ShowcaseAnchor href="#booking" className="lsx-btn lsx-btn--primary">
                Get a free quote
              </ShowcaseAnchor>
              <ShowcaseAnchor href="#services" className="lsx-btn lsx-btn--ghost">
                Browse services
              </ShowcaseAnchor>
            </div>
          </LocalServicesReveal>

          <LocalServicesReveal delay={0.34}>
            <ul className="lsx-hero__stats" aria-label="Trust metrics">
              {HERO_STATS.map((stat) => (
                <li key={stat.id}>
                  <strong>
                    <LocalServicesCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </LocalServicesReveal>
        </div>

        <LocalServicesReveal direction="right" delay={0.2} className="lsx-dispatch">
          <div className="lsx-dispatch__head">
            <span>
              <strong>Live dispatch board</strong>
              <small>Illustrative feed · refreshes every few seconds</small>
            </span>
            <span className="lsx-dispatch__live">
              <i aria-hidden />
              Live
            </span>
          </div>

          <ul className="lsx-dispatch__feed" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {DISPATCH_FEED.map((job, index) => {
                const Icon = job.icon;
                const isActive = index === activeJob;
                return (
                  <motion.li
                    key={job.id}
                    layout
                    className="lsx-dispatch__job"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{
                      opacity: isActive ? 1 : 0.55,
                      y: 0,
                      scale: isActive && !reduceMotion ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span aria-hidden>
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span className="lsx-dispatch__job-body">
                      <strong>{job.title}</strong>
                      <small>{job.meta}</small>
                    </span>
                    <span className="lsx-dispatch__eta">{job.eta}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <div className="lsx-dispatch__foot">
            <span>
              <MapPin size={12} aria-hidden style={{ display: 'inline', marginRight: 4 }} />
              Nearest crew routing · Sakchi ring
            </span>
            <span className="lsx-dispatch__meter" aria-hidden>
              <motion.i
                animate={
                  reduceMotion ? { scaleX: 0.72 } : { scaleX: [0.35, 0.82, 0.55, 0.9, 0.72] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </div>
        </LocalServicesReveal>
      </div>
    </section>
  );
}
