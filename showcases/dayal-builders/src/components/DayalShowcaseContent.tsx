'use client';

import DayalShowcaseChrome from '@bitcraftly/showcase-dayal-builders/components/DayalShowcaseChrome';
import DayalFooter from '@bitcraftly/showcase-dayal-builders/components/DayalFooter';
import DayalHero from '@bitcraftly/showcase-dayal-builders/components/DayalHero';
import DayalLocationGalleryRow from '@bitcraftly/showcase-dayal-builders/components/DayalLocationGalleryRow';
import DayalNavbar from '@bitcraftly/showcase-dayal-builders/components/DayalNavbar';
import DayalPlanAmenitiesRow from '@bitcraftly/showcase-dayal-builders/components/DayalPlanAmenitiesRow';
import DayalProjects from '@bitcraftly/showcase-dayal-builders/components/DayalProjects';
import DayalAboutTrust from '@bitcraftly/showcase-dayal-builders/components/DayalAboutTrust';
import DayalTrustBar from '@bitcraftly/showcase-dayal-builders/components/DayalTrustBar';
import DayalBlog from '@bitcraftly/showcase-dayal-builders/components/DayalBlog';
import DayalVisitCta from '@bitcraftly/showcase-dayal-builders/components/DayalVisitCta';
import DayalWhyTestimonialsRow from '@bitcraftly/showcase-dayal-builders/components/DayalWhyTestimonialsRow';

/** Full-bleed cinematic real-estate showcase */
export default function DayalShowcaseContent() {
  return (
    <>
      <DayalNavbar />
      <DayalHero />
      <DayalTrustBar />
      <DayalAboutTrust />
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
