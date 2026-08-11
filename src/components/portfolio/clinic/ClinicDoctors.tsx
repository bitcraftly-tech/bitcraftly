'use client';

import Image from 'next/image';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_DOCTORS } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicRailControls from './ClinicRailControls';
import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';
import ClinicStars from './ClinicStars';
import { useClinicRail } from './useClinicRail';

export default function ClinicDoctors() {
  const { railRef, atStart, atEnd, scrollByCard, onScroll } = useClinicRail<HTMLUListElement>();

  return (
    <section id="doctors" className="cl-bg-surface" aria-labelledby="clinic-doctors-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-doctors-heading"
          title="Meet Our Expert Doctors"
          subtitle="Consultants who combine deep specialisation with unhurried, patient-first care."
        />

        <ul ref={railRef} onScroll={onScroll} className="cl-rail mt-10 -mx-1 px-1">
          {CLINIC_DOCTORS.map((doctor, index) => (
            <ClinicReveal
              as="li"
              key={doctor.id}
              rail
              delay={Math.min(index, 3) * 0.08}
              className="w-[min(16rem,78vw)] shrink-0 sm:w-[17rem]"
            >
              <article className="cl-card cl-card--lift cl-zoom h-full overflow-hidden">
                <div className="cl-media relative aspect-[4/3]">
                  <Image
                    src={doctor.image}
                    alt={doctor.imageAlt}
                    fill
                    loading={index < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 70vw, 17rem"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="cl-h3">{doctor.name}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: 'var(--cl-primary)' }}>
                    {doctor.speciality}
                  </p>
                  <p className="cl-small mt-1">{doctor.experience}</p>
                  <p className="mt-3 flex items-center justify-center gap-2">
                    <ClinicStars rating={doctor.rating} />
                    <span className="text-xs" style={{ color: 'var(--cl-faint)' }}>
                      {doctor.rating} ({doctor.reviews})
                    </span>
                  </p>
                  <ShowcaseAnchor
                    href="#appointment"
                    className="cl-btn cl-btn--primary cl-btn--sm cl-btn--block mt-4"
                    aria-label={`Book an appointment with ${doctor.name}`}
                  >
                    Book Now
                  </ShowcaseAnchor>
                </div>
              </article>
            </ClinicReveal>
          ))}
        </ul>

        <ClinicRailControls
          label="doctors"
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
