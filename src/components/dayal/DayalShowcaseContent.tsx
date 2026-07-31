'use client';

import DayalShowcaseChrome from '@/components/dayal/DayalShowcaseChrome';
import DayalFooter from '@/components/dayal/DayalFooter';
import DayalHero from '@/components/dayal/DayalHero';
import DayalLocationGalleryRow from '@/components/dayal/DayalLocationGalleryRow';
import DayalNavbar from '@/components/dayal/DayalNavbar';
import DayalPlanAmenitiesRow from '@/components/dayal/DayalPlanAmenitiesRow';
import DayalProjects from '@/components/dayal/DayalProjects';
import DayalAboutTrust from '@/components/dayal/DayalAboutTrust';
import DayalTrustBar from '@/components/dayal/DayalTrustBar';
import DayalBlog from '@/components/dayal/DayalBlog';
import DayalVisitCta from '@/components/dayal/DayalVisitCta';
import DayalWhyTestimonialsRow from '@/components/dayal/DayalWhyTestimonialsRow';

/** Full luxury real-estate showcase — mockup-aligned single page */
export default function DayalShowcaseContent() {
  return (
    <>
      <DayalNavbar />
      <DayalHero />
      <DayalAboutTrust />
      <DayalTrustBar />
      <DayalProjects />
      <DayalPlanAmenitiesRow />
      <DayalLocationGalleryRow />
      <DayalWhyTestimonialsRow />
      <DayalBlog />
      <DayalVisitCta />
      <DayalFooter />
      <DayalShowcaseChrome />
    </>
  );
}
