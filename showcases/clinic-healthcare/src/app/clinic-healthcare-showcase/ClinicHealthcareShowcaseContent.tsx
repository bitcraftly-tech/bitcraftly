'use client';

import ClinicAiSolutions from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicAiSolutions';
import ClinicAppointment from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicAppointment';
import ClinicBlog from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicBlog';
import ClinicDoctors from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicDoctors';
import ClinicEmergency from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicEmergency';
import ClinicHero from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicHero';
import ClinicQuickServices from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicQuickServices';
import ClinicServices from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicServices';
import ClinicStats from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicStats';
import ClinicTelehealth from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicTelehealth';
import ClinicTestimonials from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicTestimonials';
import ClinicWhyChoose from '@bitcraftly/showcase-clinic-healthcare/components/clinic/ClinicWhyChoose';

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
