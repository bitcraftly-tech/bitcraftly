import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import {
  ServicesCategoryNav,
  ServicesFinalCta,
  ServicesIndustries,
  ServicesLandingFaq,
  ServicesOfferings,
  ServicesPageHero,
  ServicesProcess,
  ServicesTechStack,
  ServicesWhyChoose,
} from './landing';
import { buildServicesListingJsonLd } from './services-schema';
import './landing/services-landing.css';

export function ServicesLandingPage() {
  return (
    <PageShell className="services-page">
      <JsonLdScript data={buildServicesListingJsonLd()} />
      <ServicesPageHero />
      <ServicesCategoryNav />
      <ServicesOfferings />
      <ServicesWhyChoose />
      <ServicesProcess />
      <ServicesTechStack />
      <ServicesIndustries />
      <ServicesLandingFaq />
      <ServicesFinalCta />
    </PageShell>
  );
}
