'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

import { RPYTECH, RPYTECH_ABOUT, RPYTECH_CONTAINER } from '@/lib/rpytechShowcaseData';

import { useRpytechReveal } from './useRpytechReveal';

export default function RpytechAboutSection() {
  const { ref, visible } = useRpytechReveal();
  const [expanded, setExpanded] = useState(false);

  const needsTruncate = RPYTECH_ABOUT.body.length > RPYTECH_ABOUT.previewLength;
  const previewText = needsTruncate
    ? `${RPYTECH_ABOUT.body.slice(0, RPYTECH_ABOUT.previewLength).trimEnd()}…`
    : RPYTECH_ABOUT.body;

  return (
    <section
      id="about"
      ref={ref}
      className={`rpytech-about-section rpytech-page-section scroll-mt-28${visible ? ' rpytech-about-section--visible' : ''}`}
    >
      <div className={`${RPYTECH_CONTAINER} rpytech-about-inner`}>
        <div className="rpytech-about-col rpytech-about-col--content">
          <h2 className="rpytech-about-title" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
            Welcome to <span>RPY Technical and Training Services Pvt Ltd</span>
          </h2>

          <div className="rpytech-about-credentials" aria-label="Approvals and certifications">
            {RPYTECH_ABOUT.credentials.map((item, index) => (
              <div
                key={item.label}
                className="rpytech-about-cred"
                style={{ '--reveal-delay': `${120 + index * 80}ms` } as CSSProperties}
                title={item.detail}
              >
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>

          <div className="rpytech-about-copy">
            <p
              className="rpytech-about-body"
              style={{ '--reveal-delay': '420ms' } as CSSProperties}
            >
              {expanded || !needsTruncate ? RPYTECH_ABOUT.body : previewText}
            </p>

            {needsTruncate ? (
              <button
                type="button"
                className="rpytech-about-readmore"
                style={{ '--reveal-delay': '500ms' } as CSSProperties}
                onClick={() => setExpanded((open) => !open)}
                aria-expanded={expanded}
              >
                {expanded ? RPYTECH_ABOUT.readLessLabel : RPYTECH_ABOUT.readMoreLabel}
              </button>
            ) : null}
          </div>

          <div className="rpytech-about-sectors" aria-label="Service sectors">
            {RPYTECH_ABOUT.sectors.map((sector, index) => (
              <span
                key={sector}
                className="rpytech-about-sector"
                style={{ '--reveal-delay': `${560 + index * 55}ms` } as CSSProperties}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="rpytech-about-col rpytech-about-col--visual">
          <div
            className="rpytech-about-visual rpytech-reveal"
            style={{ '--reveal-delay': '180ms' } as CSSProperties}
          >
            <Image
              src={RPYTECH.aboutImageUrl}
              alt="Insight into vocational courses in India and its benefits"
              width={960}
              height={600}
              className="rpytech-about-visual-img"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
