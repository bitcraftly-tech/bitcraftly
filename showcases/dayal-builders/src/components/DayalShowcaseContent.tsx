'use client';

import DayalShowcaseChrome from '@bitcraftly/showcase-dayal-builders/components/DayalShowcaseChrome';
import DayalFooter from '@bitcraftly/showcase-dayal-builders/components/DayalFooter';
import DayalNavbar from '@bitcraftly/showcase-dayal-builders/components/DayalNavbar';
import DayalAboutTrust from '@bitcraftly/showcase-dayal-builders/components/DayalAboutTrust';
import DayalBlog from '@bitcraftly/showcase-dayal-builders/components/DayalBlog';
import DayalWhyTestimonialsRow from '@bitcraftly/showcase-dayal-builders/components/DayalWhyTestimonialsRow';
import { DayalEstateFilterProvider } from '@bitcraftly/showcase-dayal-builders/components/DayalEstateFilters';
import DayalEstateCalculator from '@bitcraftly/showcase-dayal-builders/components/DayalEstateCalculator';
import DayalEstateGallery from '@bitcraftly/showcase-dayal-builders/components/DayalEstateGallery';
import DayalEstateHero from '@bitcraftly/showcase-dayal-builders/components/DayalEstateHero';
import DayalEstateListings from '@bitcraftly/showcase-dayal-builders/components/DayalEstateListings';
import DayalEstateLocality from '@bitcraftly/showcase-dayal-builders/components/DayalEstateLocality';
import DayalEstatePlans from '@bitcraftly/showcase-dayal-builders/components/DayalEstatePlans';
import DayalEstateStats from '@bitcraftly/showcase-dayal-builders/components/DayalEstateStats';
import DayalEstateVisit from '@bitcraftly/showcase-dayal-builders/components/DayalEstateVisit';

/** Property-portal showcase — searchable inventory, plans, EMI and site visits */
export default function DayalShowcaseContent() {
  return (
    <DayalEstateFilterProvider>
      <DayalNavbar />
      <DayalEstateHero />
      <DayalEstateStats />
      <DayalAboutTrust />
      <DayalEstateListings />
      <DayalEstatePlans />
      <DayalEstateCalculator />
      <DayalEstateLocality />
      <DayalEstateGallery />
      <DayalWhyTestimonialsRow />
      <DayalBlog />
      <DayalEstateVisit />
      <DayalFooter />
      <DayalShowcaseChrome />
    </DayalEstateFilterProvider>
  );
}
