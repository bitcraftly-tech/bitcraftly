'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';

import { CLINIC_TESTIMONIALS } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';

import ClinicRailControls from './ClinicRailControls';
import ClinicSectionHeading from './ClinicSectionHeading';
import ClinicStars from './ClinicStars';
import { useClinicRail } from './useClinicRail';

export default function ClinicTestimonials() {
  const { railRef, atStart, atEnd, scrollByCard, onScroll } = useClinicRail<HTMLUListElement>();

  return (
    <section className="cl-testimonials cl-bg-tint" aria-labelledby="clinic-testimonials-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-testimonials-heading"
          title="What Our Patients Say"
          subtitle="Verified reviews from patients treated across our departments."
        />

        <ul
          ref={railRef}
          onScroll={onScroll}
          className="cl-rail cl-testimonials__rail"
          aria-label="Patient testimonials"
        >
          {CLINIC_TESTIMONIALS.map((item) => (
            <li key={item.id} className="cl-testimonials__slide">
              <figure className="cl-card cl-card--lift cl-testimonial-card">
                <Quote className="cl-testimonial-card__quote" aria-hidden />
                <blockquote className="cl-testimonial-card__quote-text">{item.quote}</blockquote>
                <figcaption className="cl-testimonial-card__footer">
                  <span className="cl-media cl-testimonial-card__avatar">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span className="cl-testimonial-card__person">
                    <span className="cl-testimonial-card__name">{item.name}</span>
                    <span className="cl-testimonial-card__context">{item.context}</span>
                  </span>
                  <ClinicStars
                    rating={item.rating}
                    size={14}
                    className="cl-testimonial-card__stars"
                  />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ClinicRailControls
          label="testimonials"
          atStart={atStart}
          atEnd={atEnd}
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
          className="cl-testimonials__controls"
        />
      </div>
    </section>
  );
}
