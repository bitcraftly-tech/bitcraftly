'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';

import { CLINIC_TESTIMONIALS } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicRailControls from './ClinicRailControls';
import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';
import ClinicStars from './ClinicStars';
import { useClinicRail } from './useClinicRail';

export default function ClinicTestimonials() {
  const { railRef, atStart, atEnd, scrollByCard, onScroll } = useClinicRail<HTMLUListElement>();

  return (
    <section className="cl-bg-tint" aria-labelledby="clinic-testimonials-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-testimonials-heading"
          title="What Our Patients Say"
          subtitle="Verified reviews from patients treated across our departments."
        />

        <ul
          ref={railRef}
          onScroll={onScroll}
          className="cl-rail mt-10 -mx-1 px-1"
          aria-label="Patient testimonials"
        >
          {CLINIC_TESTIMONIALS.map((item, index) => (
            <ClinicReveal
              as="li"
              key={item.id}
              rail
              delay={Math.min(index, 3) * 0.08}
              className="w-[min(21rem,82vw)] shrink-0"
            >
              <figure className="cl-card cl-card--lift flex h-full flex-col p-6">
                <Quote
                  className="h-7 w-7 shrink-0"
                  style={{ color: 'var(--cl-accent)' }}
                  aria-hidden
                />
                <blockquote className="cl-small mt-3 flex-1">{item.quote}</blockquote>
                <figcaption
                  className="mt-5 flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: 'var(--cl-border)' }}
                >
                  <span className="cl-media relative h-11 w-11 shrink-0 rounded-full">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{item.name}</span>
                    <span className="block truncate text-xs" style={{ color: 'var(--cl-faint)' }}>
                      {item.context}
                    </span>
                  </span>
                  <ClinicStars rating={item.rating} className="ml-auto shrink-0" />
                </figcaption>
              </figure>
            </ClinicReveal>
          ))}
        </ul>

        <ClinicRailControls
          label="testimonials"
          atStart={atStart}
          atEnd={atEnd}
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
          className="mt-6"
        />
      </div>
    </section>
  );
}
