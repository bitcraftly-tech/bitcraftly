'use client';

import { useId, useState } from 'react';
import { ChevronDown, Dumbbell, Flame, Timer, Zap } from 'lucide-react';

import GymReveal from '@bitcraftly/showcase-gym-fitness/components/gym/GymReveal';
import { CONTAINER } from '@/lib/constants';

import { GYM_FAQS, HEALTH_TIPS } from './gym-demo-data';

const TIP_ICONS = [Flame, Dumbbell, Timer, Zap] as const;

export default function GymHealthFaqSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(GYM_FAQS[0]?.id ?? null);

  return (
    <section
      id="tips"
      className="gym-health gym-section scroll-mt-24"
      aria-labelledby="gym-health-title"
    >
      <div className={CONTAINER}>
        <GymReveal>
          <div className="gym-health__intro">
            <p className="gym-section__eyebrow">Gym & fitness</p>
            <h2 id="gym-health-title" className="gym-section__title">
              Gym & fitness tips
            </h2>
            <p className="gym-section__subtitle">
              Floor and class habits from FitRally coaches — for training only, not medical advice.
            </p>
          </div>

          <div className="gym-health__tips">
            {HEALTH_TIPS.map((tip, i) => {
              const Icon = TIP_ICONS[i % TIP_ICONS.length];
              return (
                <GymReveal key={tip.id} as="article" className="gym-tip-card" delay={i * 0.06}>
                  <span className="gym-tip-card__icon" aria-hidden>
                    <Icon className="gym-tip-card__svg" />
                  </span>
                  <span className="gym-tip-card__tag">{tip.tag}</span>
                  <h3 className="gym-tip-card__title">{tip.title}</h3>
                  <p className="gym-tip-card__body">{tip.body}</p>
                </GymReveal>
              );
            })}
          </div>
        </GymReveal>

        <GymReveal id="faq" className="gym-faq scroll-mt-24">
          <div className="gym-faq__top">
            <div className="gym-faq__intro">
              <p className="gym-section__eyebrow">Support</p>
              <h2 id="gym-faq-title" className="gym-section__title">
                Frequently asked questions
              </h2>
              <p className="gym-section__subtitle">
                Memberships, classes, trials & wellness — quick answers for this demo.
              </p>
            </div>
            <p className="gym-faq__aside">
              Still stuck? Ask <strong>RallyAI</strong> or tap WhatsApp — we keep answers grounded
              in this FitRally demo.
            </p>
          </div>

          <div className="gym-faq__list">
            {GYM_FAQS.map((item, index) => {
              const panelId = `${baseId}-${item.id}`;
              const open = openId === item.id;
              return (
                <div key={item.id} className={`gym-faq__item${open ? ' gym-faq__item--open' : ''}`}>
                  <h3 className="gym-faq__heading">
                    <button
                      type="button"
                      className="gym-faq__trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      id={`${panelId}-btn`}
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      <span className="gym-faq__index" aria-hidden>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="gym-faq__question">{item.question}</span>
                      <span className="gym-faq__toggle" aria-hidden>
                        <ChevronDown
                          className={`gym-faq__chevron${open ? ' gym-faq__chevron--open' : ''}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`${panelId}-btn`}
                    className={`gym-faq__panel${open ? ' gym-faq__panel--open' : ''}`}
                    hidden={!open}
                  >
                    <p className="gym-faq__answer">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GymReveal>
      </div>
    </section>
  );
}
