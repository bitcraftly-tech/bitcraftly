'use client';

import { Ambulance, PhoneCall } from 'lucide-react';

import { CLINIC_BRAND } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';
import {
  clinicEmergencyWhatsAppUrl,
  WhatsAppGlyph,
} from '@/components/portfolio/clinic/ClinicEmergencyWhatsApp';

import ClinicReveal from './ClinicReveal';

export default function ClinicEmergency() {
  return (
    <section id="emergency" aria-labelledby="clinic-emergency-heading">
      <div className="cl-container cl-section--tight">
        <ClinicReveal direction="scale">
          <div
            className="flex flex-col items-start gap-6 rounded-[1.75rem] px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9"
            style={{
              background:
                'linear-gradient(120deg, var(--cl-primary-strong) 0%, var(--cl-primary) 45%, var(--cl-accent) 100%)',
              boxShadow: 'var(--cl-shadow-md)',
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/18"
                aria-hidden
              >
                <Ambulance className="h-6 w-6" />
              </span>
              <div>
                <h2 id="clinic-emergency-heading" className="cl-h3">
                  Medical Emergency?
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  Our emergency team is available 24/7 for you.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={`tel:${CLINIC_BRAND.emergency.replace(/\s/g, '')}`}
                className="cl-btn cl-btn--light w-full sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Call Now: {CLINIC_BRAND.emergency}
              </a>
              <a
                href={clinicEmergencyWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cl-btn cl-btn--ghost w-full sm:w-auto"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </ClinicReveal>
      </div>
    </section>
  );
}
