'use client';

import Image from 'next/image';

import ClinicAppointmentForm from '@/app/portfolio/clinic-healthcare-showcase/ClinicAppointmentForm';
import { CLINIC_APPOINTMENT_IMAGE } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicAppointment() {
  return (
    <section id="appointment" className="cl-bg-tint" aria-labelledby="clinic-appointment-heading">
      <div className="cl-container cl-section">
        <div
          className="grid gap-8 overflow-hidden rounded-[1.75rem] lg:grid-cols-[0.8fr_1.2fr] lg:gap-0"
          style={{
            background: 'var(--cl-surface)',
            border: '1px solid var(--cl-border)',
            boxShadow: 'var(--cl-shadow-md)',
          }}
        >
          <ClinicReveal direction="left" className="relative min-h-[15rem] lg:min-h-full">
            <div className="cl-media relative h-full min-h-[15rem] w-full">
              <Image
                src={CLINIC_APPOINTMENT_IMAGE.src}
                alt={CLINIC_APPOINTMENT_IMAGE.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 32vw"
                className="object-cover object-top"
              />
            </div>
          </ClinicReveal>

          <ClinicReveal direction="right" className="p-6 sm:p-8 lg:p-10">
            <h2 id="clinic-appointment-heading" className="cl-h2">
              Book Your Appointment
            </h2>
            <span className="cl-rule mt-4" style={{ marginInline: 0 }} aria-hidden />
            <p className="cl-body mt-4 max-w-xl">
              Tell us who you need to see and we will confirm a slot within one working hour.
            </p>
            <div className="mt-7">
              <ClinicAppointmentForm />
            </div>
          </ClinicReveal>
        </div>
      </div>
    </section>
  );
}
