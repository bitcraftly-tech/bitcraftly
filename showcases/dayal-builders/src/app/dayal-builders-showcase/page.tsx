import type { Metadata } from 'next';

import DayalShowcaseContent from '@bitcraftly/showcase-dayal-builders/components/DayalShowcaseContent';
import { DAYAL, HERO_DESCRIPTION } from '@bitcraftly/showcase-dayal-builders/lib/data';

import DayalShowcaseLayout from './DayalShowcaseLayout';

export const metadata: Metadata = {
  title: `${DAYAL.brand} · Real Estate Showcase | Bitcraftly Portfolio`,
  description:
    'Real-estate showcase for Dayal Builders — Jamshedpur. Ongoing projects, legacy builds, testimonials, and enquiry forms aligned with dayalbuilder.com.',
  keywords: [
    'Dayal Builders',
    'Dayal Galaxy',
    'Dayal Vatika',
    'real estate Jamshedpur',
    'Govindpur',
    'Teg Bahadur Block',
  ],
  openGraph: {
    title: `${DAYAL.brand} — ${DAYAL.tagline}`,
    description: HERO_DESCRIPTION,
    type: 'website',
  },
};

export default function DayalBuildersShowcasePage() {
  return (
    <DayalShowcaseLayout>
      <main>
        <DayalShowcaseContent />
      </main>
    </DayalShowcaseLayout>
  );
}
