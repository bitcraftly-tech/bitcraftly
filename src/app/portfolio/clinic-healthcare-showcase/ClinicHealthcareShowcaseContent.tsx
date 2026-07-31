'use client';

import ClinicAiSolutions from '@/components/portfolio/clinic/ClinicAiSolutions';
import ClinicAppointment from '@/components/portfolio/clinic/ClinicAppointment';
import ClinicBlog from '@/components/portfolio/clinic/ClinicBlog';
import ClinicDoctors from '@/components/portfolio/clinic/ClinicDoctors';
import ClinicEmergency from '@/components/portfolio/clinic/ClinicEmergency';
import ClinicHero from '@/components/portfolio/clinic/ClinicHero';
import ClinicQuickServices from '@/components/portfolio/clinic/ClinicQuickServices';
import ClinicServices from '@/components/portfolio/clinic/ClinicServices';
import ClinicStats from '@/components/portfolio/clinic/ClinicStats';
import ClinicTelehealth from '@/components/portfolio/clinic/ClinicTelehealth';
import ClinicTestimonials from '@/components/portfolio/clinic/ClinicTestimonials';
import ClinicWhyChoose from '@/components/portfolio/clinic/ClinicWhyChoose';

export default function ClinicHealthcareShowcaseContent() {
  return (
    <>
      <ClinicHero />
      <ClinicQuickServices />
      <ClinicStats />
      <ClinicDoctors />
      <ClinicServices />
      <ClinicAiSolutions />
      <ClinicWhyChoose />
      <ClinicEmergency />
      <ClinicTestimonials />
      <ClinicTelehealth />
      <ClinicBlog />
      <ClinicAppointment />
    </>
  );
}
