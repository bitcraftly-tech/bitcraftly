'use client';

import { useId, useState } from 'react';
import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock3, Shield } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { SERVICES } from './local-services.content';

/** Interactive services explorer with animated tab indicator. */
export default function LocalServicesServices() {
  const reduceMotion = useReducedMotion();
  const tabId = useId();
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="lsx-section lsx-services scroll-mt-28" aria-labelledby="lsx-services-heading">
      <div className={CONTAINER}>
        <LocalServicesReveal className="lsx-head lsx-head--center">
          <p className="lsx-eyebrow">Popular services</p>
          <h2 id="lsx-services-heading" className="lsx-title">
            Book trusted crews
          </h2>
          <p className="lsx-lead">
            Pick a category to preview the work we cover — each tile deep-links into the booking
            wizard with the service already selected.
          </p>
        </LocalServicesReveal>

        <LayoutGroup id={tabId}>
          <div
            className="lsx-services__tabs"
            role="tablist"
            aria-label="Service categories"
          >
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`${tabId}-${service.id}`}
                  aria-selected={selected}
                  aria-controls={`${tabId}-panel`}
                  className="lsx-tab"
                  onClick={() => setActiveId(service.id)}
                >
                  {selected ? (
                    <motion.span
                      layoutId="lsx-tab-glow"
                      className="lsx-tab__glow"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                      aria-hidden
                    />
                  ) : null}
                  <Icon size={15} strokeWidth={1.85} aria-hidden />
                  {service.name}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="lsx-services__panel">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              id={`${tabId}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabId}-${active.id}`}
              className="lsx-services__detail"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="lsx-services__icon" aria-hidden>
                <ActiveIcon size={22} strokeWidth={1.75} />
              </span>
              <h3>{active.name}</h3>
              <p>{active.blurb}</p>
              <ul className="lsx-services__jobs">
                {active.jobs.map((job) => (
                  <li key={job}>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {job}
                  </li>
                ))}
              </ul>
              <div className="lsx-services__meta">
                <span>
                  <Shield size={12} aria-hidden />
                  {active.warranty}
                </span>
                <span>
                  <Clock3 size={12} aria-hidden />
                  {active.sla}
                </span>
                <span>From {active.startsAt}</span>
              </div>
              <ShowcaseAnchor
                href="#booking"
                className="lsx-btn lsx-btn--primary lsx-services__cta"
              >
                Request this service
                <ArrowRight size={15} aria-hidden />
              </ShowcaseAnchor>
            </motion.article>
          </AnimatePresence>

          <ul className="lsx-services__cards">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <LocalServicesReveal key={service.id} as="li" delay={index * 0.04}>
                  <button
                    type="button"
                    className="lsx-service-card"
                    data-active={service.id === activeId}
                    onClick={() => setActiveId(service.id)}
                    aria-pressed={service.id === activeId}
                  >
                    <span aria-hidden>
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span>
                      <strong>{service.name}</strong>
                      <small>{service.tagline}</small>
                    </span>
                    <ArrowRight size={14} className="lsx-service-card__arrow" aria-hidden />
                  </button>
                </LocalServicesReveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
