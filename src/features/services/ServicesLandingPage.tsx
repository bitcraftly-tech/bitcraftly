import dynamic from 'next/dynamic';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { SERVICE_GROUPS } from '@/constants/services';
import { buildServicesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { ServicesCatalog } from './ServicesCatalog';
import { ServicesCategoryNav } from './ServicesCategoryNav';
import { ServicesComparisonSection } from './ServicesComparisonSection';
import { ServicesFaqSection } from './ServicesFaqSection';
import { ServicesHero } from './ServicesHero';
import { ServicesPageCta } from './ServicesPageCta';
import { ServicesRelatedHubs } from './ServicesRelatedHubs';
import { ServicesWorkPreview } from './ServicesWorkPreview';
import { SERVICES_LANDING, getServiceCardModels } from './services.content';
import { buildServicesListingJsonLd } from './services-schema';
import type { ServiceCardModel } from './services.types';
import './services.css';

const ProcessSection = dynamic(
  () => import('@/features/homepage/Process').then((mod) => mod.ProcessSection),
  { ssr: true },
);

const WhyBitcraftlySection = dynamic(
  () => import('@/features/homepage/WhyBitcraftly').then((mod) => mod.WhyBitcraftlySection),
  { ssr: true },
);

const TestimonialsSection = dynamic(
  () => import('@/features/homepage/Testimonials').then((mod) => mod.TestimonialsSection),
  { ssr: true },
);

export function ServicesLandingPage() {
  const breadcrumbs = buildServicesBreadcrumbs();
  const cards = getServiceCardModels();
  const cardBySlug = new Map(cards.map((card) => [card.slug, card]));

  const groups = SERVICE_GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    items: group.items.map((item) => {
      const existing = cardBySlug.get(item.slug);
      if (existing) return existing;
      return {
        slug: item.slug,
        title: item.label,
        description: item.description,
        href: `/services/${item.slug}`,
        icon: item.icon,
        ctaLabel: 'Learn More',
        badge: 'Recommended',
        tags: [],
      } satisfies ServiceCardModel;
    }),
  }));

  return (
    <PageShell className="services-page">
      <JsonLdScript data={buildServicesListingJsonLd()} />

      <ServicesHero breadcrumbs={breadcrumbs} />
      <ServicesCategoryNav />
      <ServicesCatalog
        groups={groups}
        intros={[...SERVICES_LANDING.groupIntros]}
        relatedByGroup={{ ...SERVICES_LANDING.groupRelated }}
        featuredByGroup={[...SERVICES_LANDING.featuredByGroup]}
      />
      <ServicesComparisonSection />
      <ProcessSection />
      <WhyBitcraftlySection />
      <ServicesWorkPreview />
      <TestimonialsSection />
      <ServicesFaqSection />
      <ServicesRelatedHubs />
      <ServicesPageCta />
    </PageShell>
  );
}
