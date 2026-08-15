'use client';

import { Ambulance, PhoneCall } from 'lucide-react';

import { CLINIC_BRAND } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';
import {
  clinicEmergencyWhatsAppUrl,
  WhatsAppGlyph,
} from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicEmergencyWhatsApp';

import ClinicReveal from './ClinicReveal';

export default function ClinicEmergency() {
  return (
    <section id="emergency" className="cl-emergency" aria-labelledby="clinic-emergency-heading">
      <div className="cl-container cl-section--tight">
        <ClinicReveal direction="scale">
          <div className="cl-emergency__banner">
            <div className="cl-emergency__copy">
              <span className="cl-emergency__icon" aria-hidden>
                <Ambulance className="h-6 w-6" />
              </span>
              <div>
                <h2 id="clinic-emergency-heading" className="cl-emergency__title">
                  Medical Emergency?
                </h2>
                <p className="cl-emergency__desc">Our emergency team is available 24/7 for you.</p>
              </div>
            </div>

            <div className="cl-emergency__actions">
              <a
                href={`tel:${CLINIC_BRAND.emergency.replace(/\s/g, '')}`}
                className="cl-btn cl-btn--light"
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Call Now: {CLINIC_BRAND.emergency}
              </a>
              <a
                href={clinicEmergencyWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cl-btn cl-btn--ghost cl-emergency__whatsapp"
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
