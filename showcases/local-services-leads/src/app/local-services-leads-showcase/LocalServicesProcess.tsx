'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

import { CONTAINER } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { PROCESS_STEPS } from './local-services.content';

/** Scroll-linked process timeline — sticky panel tracks the active step. */
export default function LocalServicesProcess() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROCESS_STEPS[activeIndex] ?? PROCESS_STEPS[0];
  const ActiveIcon = active.icon;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 35%'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const railScale = useTransform(smooth, [0, 1], [0.08, 1]);

  useEffect(() => {
    const nodes = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>('[data-lsx-step]') ?? [],
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const index = Number(top.target.getAttribute('data-lsx-step'));
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="lsx-section lsx-process scroll-mt-28"
      aria-labelledby="lsx-process-heading"
    >
      <div className={CONTAINER}>
        <LocalServicesReveal className="lsx-head">
          <p className="lsx-eyebrow">How it works</p>
          <h2 id="lsx-process-heading" className="lsx-title">
            Built for conversion, not clutter
          </h2>
          <p className="lsx-lead">
            Scroll the flow operators actually run — CRM capture, nearest-crew routing, locked
            estimates and a QA loop that closes every job.
          </p>
        </LocalServicesReveal>

        <div className="lsx-process__layout">
          <aside className="lsx-process__aside" aria-live="polite">
            <div className="lsx-process__panel">
              <p className="lsx-process__count">
                Step <strong>0{activeIndex + 1}</strong> / 0{PROCESS_STEPS.length}
              </p>
              <span
                style={{
                  display: 'inline-grid',
                  width: '2.5rem',
                  height: '2.5rem',
                  placeItems: 'center',
                  marginTop: '0.85rem',
                  borderRadius: '0.8rem',
                  background: 'var(--lsx-accent-soft)',
                  color: 'var(--lsx-accent-ink)',
                }}
                aria-hidden
              >
                <ActiveIcon size={18} strokeWidth={1.75} />
              </span>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
              <p
                style={{
                  marginTop: '1rem',
                  color: 'var(--lsx-accent-ink)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                }}
              >
                {active.stat}
              </p>
              <div className="lsx-process__rail" aria-hidden>
                <motion.i style={{ scaleX: reduceMotion ? 1 : railScale }} />
              </div>
            </div>
          </aside>

          <ol className="lsx-process__steps">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <LocalServicesReveal key={step.id} as="li" delay={index * 0.05}>
                  <article
                    className="lsx-step"
                    data-lsx-step={index}
                    data-active={index === activeIndex}
                  >
                    <span className="lsx-step__index" aria-hidden>
                      {index === activeIndex ? (
                        <Icon size={12} strokeWidth={2.2} />
                      ) : (
                        String(index + 1).padStart(2, '0')
                      )}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </article>
                </LocalServicesReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
