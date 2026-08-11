'use client';

import Image from 'next/image';

import ClinicAppointmentForm from '@/app/portfolio/clinic-healthcare-showcase/ClinicAppointmentForm';
import { CLINIC_APPOINTMENT_IMAGE } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicAppointment() {
  return (
    <section
      id="appointment"
      className="cl-appointment cl-bg-tint"
      aria-labelledby="clinic-appointment-heading"
    >
      <div className="cl-container cl-section">
        <div className="cl-appointment__panel">
          <ClinicReveal direction="left" className="cl-appointment__media-wrap">
            <div className="cl-media cl-appointment__media">
              <Image
                src={CLINIC_APPOINTMENT_IMAGE.src}
                alt={CLINIC_APPOINTMENT_IMAGE.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 36vw"
                className="object-cover object-top"
              />
            </div>
          </ClinicReveal>

          <ClinicReveal direction="right" className="cl-appointment__content">
            <h2 id="clinic-appointment-heading" className="cl-h2">
              Book Your Appointment
            </h2>
            <span className="cl-rule mt-4" style={{ marginInline: 0 }} aria-hidden />
            <p className="cl-body cl-appointment__intro">
              Tell us who you need to see and we will confirm a slot within one working hour.
            </p>
            <div className="cl-appointment__form-wrap">
              <ClinicAppointmentForm />
            </div>
          </ClinicReveal>
        </div>
      </div>
    </section>
  );
}
