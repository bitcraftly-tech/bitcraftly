'use client';

import { useState } from 'react';
import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { PLANS } from './local-services.content';

type Billing = 'visit' | 'care';

/** Pricing cards with an animated billing toggle. */
export default function LocalServicesPricing() {
  const reduceMotion = useReducedMotion();
  const [billing, setBilling] = useState<Billing>('visit');

  return (
    <section
      id="pricing"
      className="lsx-section lsx-pricing scroll-mt-28"
      aria-labelledby="lsx-pricing-heading"
    >
      <div className={CONTAINER}>
        <LocalServicesReveal className="lsx-head lsx-head--center">
          <p className="lsx-eyebrow">Pricing plans</p>
          <h2 id="lsx-pricing-heading" className="lsx-title">
            Transparent starting points
          </h2>
          <p className="lsx-lead">
            Illustrative slabs — the final quote arrives after scope photos or a short site visit.
          </p>
        </LocalServicesReveal>

        <div className="lsx-head--center">
          <div className="lsx-pricing__switch" role="group" aria-label="Billing cadence">
            <motion.span
              className="lsx-pricing__thumb"
              animate={{ left: billing === 'visit' ? '0.3rem' : '50%' }}
              transition={
                reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
              }
              aria-hidden
            />
            <button
              type="button"
              aria-pressed={billing === 'visit'}
              onClick={() => setBilling('visit')}
            >
              Per visit
            </button>
            <button
              type="button"
              aria-pressed={billing === 'care'}
              onClick={() => setBilling('care')}
            >
              Care plan
            </button>
          </div>
        </div>

        <div className="lsx-plans">
          {PLANS.map((plan, index) => {
            const variant = plan[billing];
            return (
              <LocalServicesReveal key={plan.id} as="article" delay={index * 0.07}>
                <div className={`lsx-plan${plan.featured ? ' lsx-plan--featured' : ''}`}>
                  {plan.featured ? <span className="lsx-plan__badge">Most booked</span> : null}
                  <h3 className="lsx-plan__name">{plan.name}</h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${plan.id}-${billing}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="lsx-plan__price">
                        {variant.price}
                        <small>{variant.unit}</small>
                      </p>
                      <p className="lsx-plan__period">{variant.period}</p>
                      <ul className="lsx-plan__list">
                        {variant.bullets.map((bullet) => (
                          <li key={bullet}>
                            <Check size={14} strokeWidth={2.5} aria-hidden />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                  <ShowcaseAnchor
                    href="#booking"
                    className={`lsx-btn ${plan.featured ? 'lsx-btn--primary' : 'lsx-btn--ghost'}`}
                  >
                    Choose plan
                  </ShowcaseAnchor>
                </div>
              </LocalServicesReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
