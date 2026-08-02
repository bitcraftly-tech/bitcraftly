'use client';

import { CLINIC_STATS } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicCounter from './ClinicCounter';
import ClinicReveal from './ClinicReveal';

export default function ClinicStats() {
  return (
    <section className="cl-stats" aria-labelledby="clinic-stats-heading">
      <div className="cl-container">
        <h2 id="clinic-stats-heading" className="sr-only">
          Clinic & Healthcare by the numbers
        </h2>
        <ul className="cl-stats-grid">
          {CLINIC_STATS.map(({ icon: Icon, value, suffix, label, display }, index) => (
            <ClinicReveal as="li" key={label} delay={index * 0.08} className="cl-stats-item">
              <span className="cl-stats-item__icon" aria-hidden>
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <p className="cl-stats-item__value">
                <ClinicCounter value={value} suffix={suffix} display={display} />
              </p>
              <p className="cl-stats-item__label">{label}</p>
            </ClinicReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
