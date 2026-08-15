'use client';

import { Quote, User } from 'lucide-react';
import type { CSSProperties } from 'react';

import { RPYTECH_DIRECTOR_MESSAGE, RPYTECH_CONTAINER } from '@/lib/rpytechShowcaseData';

import { useRpytechReveal } from './useRpytechReveal';

export default function RpytechDirectorSection() {
  const { ref, visible } = useRpytechReveal();

  return (
    <section
      id="director-message"
      ref={ref}
      className={`rpytech-director-section rpytech-page-section scroll-mt-28${visible ? ' rpytech-director-section--visible' : ''}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <p
          className="rpytech-section-label rpytech-section-label--left rpytech-reveal"
          style={{ '--reveal-delay': '0ms' } as CSSProperties}
        >
          {RPYTECH_DIRECTOR_MESSAGE.label}
        </p>
        <h2
          className="rpytech-section-title rpytech-section-title--left rpytech-reveal"
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
        >
          {RPYTECH_DIRECTOR_MESSAGE.title}
        </h2>
        <div
          className="rpytech-section-divider rpytech-section-divider--left rpytech-reveal"
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
        />

        <div className="rpytech-director-inner">
          <div
            className="rpytech-director-portrait rpytech-reveal"
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
          >
            <div className="rpytech-director-portrait-icon" aria-hidden="true">
              <User className="size-16" strokeWidth={1.25} />
            </div>
            <div className="rpytech-director-portrait-meta">
              <strong>{RPYTECH_DIRECTOR_MESSAGE.name}</strong>
              <span>{RPYTECH_DIRECTOR_MESSAGE.role}</span>
            </div>
            <div className="rpytech-director-highlights">
              {RPYTECH_DIRECTOR_MESSAGE.highlights.map((item, index) => (
                <div
                  key={item.label}
                  className="rpytech-director-highlight rpytech-reveal"
                  style={{ '--reveal-delay': `${280 + index * 90}ms` } as CSSProperties}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rpytech-director-copy">
            <Quote
              className="rpytech-director-quote-icon rpytech-reveal"
              style={{ '--reveal-delay': '200ms' } as CSSProperties}
              aria-hidden="true"
            />
            {RPYTECH_DIRECTOR_MESSAGE.message.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className="rpytech-director-quote rpytech-reveal"
                style={{ '--reveal-delay': `${220 + index * 100}ms` } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
            <footer
              className="rpytech-director-signature rpytech-reveal"
              style={{ '--reveal-delay': '520ms' } as CSSProperties}
            >
              <strong>{RPYTECH_DIRECTOR_MESSAGE.name}</strong>
              <span>
                {RPYTECH_DIRECTOR_MESSAGE.role}, {RPYTECH_DIRECTOR_MESSAGE.organization}
              </span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
