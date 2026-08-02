import type { Metadata } from 'next';

import ClinicHealthcareShowcaseContent from './ClinicHealthcareShowcaseContent';

export const metadata: Metadata = {
  title: 'Clinic & Healthcare — AI Experience Platform | Bitcraftly',
  description:
    'Premium Clinic & Healthcare showcase with AI symptom checker, report analyzer, doctor matching, chat assistant, dashboard and diet planner — plus doctors, departments and appointments.',
  openGraph: {
    title: 'Clinic & Healthcare — AI Experience Platform | Bitcraftly',
    description:
      'Production-ready AI healthcare demos for clinics — symptom guidance, reports, matching, chat, vitals and nutrition.',
    type: 'website',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Clinic & Healthcare',
  description:
    'Fictional Bitcraftly portfolio showcase — AI-powered healthcare experience platform with appointments and specialty care.',
  url: 'https://bitcraftly.com/portfolio/clinic-healthcare-showcase',
  medicalSpecialty: ['Cardiology', 'Orthopedics', 'Pediatrics', 'GeneralPractice', 'Diagnostic'],
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://bitcraftly.com/portfolio/clinic-healthcare-showcase#appointment',
    },
  },
} as const;

export default function ClinicHealthcareShowcasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <ClinicHealthcareShowcaseContent />
    </>
  );
}
