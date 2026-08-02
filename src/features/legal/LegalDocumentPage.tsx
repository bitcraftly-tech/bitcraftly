import type { ReactNode } from 'react';
import Link from 'next/link';
import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { PageShell } from '@/components/patterns/marketing-layout';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import type { LegalDocument } from './legal.content';
import { LegalDocumentHero } from './LegalDocumentHero';
import type { LegalSiteNavActive } from './LegalSiteNav';
import './legal.css';

interface LegalDocumentPageProps {
  document: LegalDocument;
  headingId: string;
  breadcrumbs: readonly BreadcrumbItem[];
  activeNav: LegalSiteNavActive;
  cta?: {
    heading: string;
    description: string;
    tertiaryCta: { label: string; href: string };
    trust: readonly string[];
  };
}

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

function SectionBody({
  sectionId,
  body,
  contactNote,
}: {
  sectionId: string;
  body: string;
  contactNote?: string;
}): ReactNode {
  if (sectionId === 'contact' && contactNote) {
    return (
      <>
        For privacy-related questions or requests, contact us at{' '}
        <Link
          href={`mailto:${contactNote}`}
          className={cn('font-semibold text-primary no-underline', focusRing)}
        >
          {contactNote}
        </Link>
        .
      </>
    );
  }
  return body;
}

/**
 * Legal document layout — Services-style hero + flat prose content.
 */
export function LegalDocumentPage({
  document,
  headingId,
  breadcrumbs,
  activeNav,
  cta,
}: LegalDocumentPageProps) {
  const resolvedCta = cta ?? {
    heading: 'Ready to start a project?',
    description:
      'Book a free consultation — clear scope, written next steps, and founder-led delivery.',
    tertiaryCta: { label: 'View services', href: ROUTES.services },
    trust: ['Free discovery session', 'Written next steps', 'Response within 24 hours'],
  };

  return (
    <PageShell className="legal-page">
      <LegalDocumentHero
        document={document}
        headingId={headingId}
        breadcrumbs={breadcrumbs}
        activeNav={activeNav}
      />

      <Section
        spacing="lg"
        aria-label={`${document.title} sections`}
        className="legal-page__content border-b border-border/40"
      >
        <Container size="xl">
          <div className="legal-page__prose">
            {document.sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="legal-page__block scroll-mt-24"
                aria-labelledby={`${headingId}-${section.id}`}
              >
                <h2 id={`${headingId}-${section.id}`} className="legal-page__heading">
                  {section.title}
                </h2>
                <p className="legal-page__body">
                  <SectionBody
                    sectionId={section.id}
                    body={section.body}
                    contactNote={document.contactNote}
                  />
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <MarketingFinalCtaBand
        headingId={`${headingId}-cta`}
        heading={resolvedCta.heading}
        description={resolvedCta.description}
        primaryCta={{
          label: NAV_ACTIONS.freeConsultation.label,
          href: `${ROUTES.contact}?source=legal`,
        }}
        tertiaryCta={resolvedCta.tertiaryCta}
        trust={resolvedCta.trust}
      />
    </PageShell>
  );
}
