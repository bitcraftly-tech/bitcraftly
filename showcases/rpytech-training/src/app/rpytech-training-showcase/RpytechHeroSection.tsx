import { Award, BadgeCheck, Landmark, Shield } from 'lucide-react';

import { RPYTECH, RPYTECH_CONTAINER, RPYTECH_TRUST_BADGES } from '@/lib/rpytechShowcaseData';

import RpytechHeroPortrait from './RpytechHeroPortrait';

const TRUST_ICONS = { certificate: Award, landmark: Landmark, check: BadgeCheck } as const;

export default function RpytechHeroSection() {
  return (
    <section className="rpytech-hero">
      <div className={`${RPYTECH_CONTAINER} rpytech-hero-inner`}>
        <div className="rpytech-hero-left">
          <p className="rpytech-hero-label">{RPYTECH.heroEyebrow}</p>
          <h1>
            Empowering Skills.
            <br />
            <span>Building Careers.</span>
          </h1>
          <p>
            {RPYTECH.heroSubtextLead}
            <br />
            <strong>{RPYTECH.heroSubtextStrong}</strong> {RPYTECH.heroSubtextTail}
          </p>
          <div className="rpytech-hero-btns">
            <button type="button" className="rpytech-btn-primary">
              APPLY NOW
            </button>
            <button type="button" className="rpytech-btn-outline">
              <Shield className="size-4" />
              VERIFY CERTIFICATE
            </button>
          </div>
          <div className="rpytech-hero-badges">
            {RPYTECH_TRUST_BADGES.map((b) => {
              const Icon = TRUST_ICONS[b.icon];
              return (
                <div key={b.title} className="rpytech-badge">
                  <div className="rpytech-badge-icon">
                    <Icon className="size-4 text-[var(--rpytech-orange)]" />
                  </div>
                  <span>
                    <strong>{b.title}</strong>
                    {b.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rpytech-hero-right">
          <RpytechHeroPortrait />
        </div>
      </div>
    </section>
  );
}
