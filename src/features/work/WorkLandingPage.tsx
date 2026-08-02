import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { ROUTES } from '@/constants/navigation';
import { buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { WorkExplorerProvider } from './work-explorer-context';
import { WORK_PROJECTS } from './work.content';
import { buildWorkListingJsonLd } from './work-schema';
import { WorkFaqSection } from './WorkFaqSection';
import { WorkFeaturedSection } from './WorkFeaturedSection';
import { WorkHero } from './WorkHero';
import { WorkPageCta } from './WorkPageCta';
import { WorkPortfolioExplorer } from './WorkPortfolioExplorer';
import { WorkPortfolioGrid } from './WorkPortfolioGrid';
import { WorkProcessSection } from './WorkProcessSection';
import { WorkRelatedServicesSection } from './WorkRelatedServicesSection';
import { WorkResultsSection } from './WorkResultsSection';
import { WorkTechSection } from './WorkTechSection';
import { WorkTrustSection } from './WorkTrustSection';
import './work.css';

/**
 * Work landing — premium portfolio experience (Hero kept).
 */
export function WorkLandingPage() {
  const breadcrumbs = buildWorkBreadcrumbs();

  return (
    <PageShell className="work-page">
      <JsonLdScript data={buildWorkListingJsonLd(WORK_PROJECTS)} />
      <WorkHero breadcrumbs={breadcrumbs} />
      <WorkFeaturedSection />
      <WorkExplorerProvider>
        <WorkPortfolioExplorer />
        <WorkPortfolioGrid />
      </WorkExplorerProvider>
      <WorkResultsSection />
      <WorkTechSection />
      <WorkProcessSection />
      <WorkTrustSection />
      <WorkFaqSection />
      <WorkRelatedServicesSection />
      <WorkPageCta />
    </PageShell>
  );
}

export const WORK_LANDING_META = {
  title: 'Work',
  description:
    'Explore Bitcraftly portfolio work — live client websites, SaaS platforms, healthcare, ecommerce, AI concierge experiences, and engineered outcomes.',
  path: ROUTES.work,
  keywords: [
    'Bitcraftly portfolio',
    'agency case studies',
    'Next.js projects',
    'React websites',
    'AI automation demos',
    'ecommerce websites India',
  ],
  image: WORK_PROJECTS[0]?.coverImage,
} as const;
