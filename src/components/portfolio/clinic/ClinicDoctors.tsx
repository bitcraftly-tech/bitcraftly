'use client';

import Image from 'next/image';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_DOCTORS } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicRailControls from './ClinicRailControls';
import ClinicSectionHeading from './ClinicSectionHeading';
import ClinicStars from './ClinicStars';
import { useClinicRail } from './useClinicRail';

export default function ClinicDoctors() {
  const { railRef, atStart, atEnd, scrollByCard, onScroll } = useClinicRail<HTMLUListElement>();

  return (
    <section
      id="doctors"
      className="cl-doctors cl-bg-surface"
      aria-labelledby="clinic-doctors-heading"
    >
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-doctors-heading"
          title="Meet Our Expert Doctors"
          subtitle="Consultants who combine deep specialisation with unhurried, patient-first care."
        />

        <ul
          ref={railRef}
          onScroll={onScroll}
          className="cl-rail cl-doctors__rail"
          aria-label="Expert doctors"
        >
          {CLINIC_DOCTORS.map((doctor, index) => (
            <li key={doctor.id} className="cl-doctors__slide">
              <article className="cl-card cl-card--lift cl-zoom cl-doctor-card">
                <div className="cl-media cl-doctor-card__media">
                  <Image
                    src={doctor.image}
                    alt={doctor.imageAlt}
                    fill
                    loading={index < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 78vw, 17.5rem"
                    className="object-cover object-top"
                  />
                </div>

                <div className="cl-doctor-card__body">
                  <div className="cl-doctor-card__meta">
                    <h3 className="cl-doctor-card__name">{doctor.name}</h3>
                    <p className="cl-doctor-card__speciality">{doctor.speciality}</p>
                    <p className="cl-doctor-card__experience">{doctor.experience}</p>
                  </div>

                  <div className="cl-doctor-card__rating">
                    <ClinicStars rating={doctor.rating} size={15} />
                    <span className="cl-doctor-card__rating-text">
                      {doctor.rating.toFixed(1)}
                      <span className="cl-doctor-card__reviews"> ({doctor.reviews})</span>
                    </span>
                  </div>

                  <ShowcaseAnchor
                    href="#appointment"
                    className="cl-btn cl-btn--primary cl-btn--sm cl-btn--block cl-doctor-card__cta"
                    aria-label={`Book an appointment with ${doctor.name}`}
                  >
                    Book Now
                  </ShowcaseAnchor>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <ClinicRailControls
          label="doctors"
          atStart={atStart}
          atEnd={atEnd}
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
          className="cl-doctors__controls"
        />
      </div>
    </section>
  );
}
