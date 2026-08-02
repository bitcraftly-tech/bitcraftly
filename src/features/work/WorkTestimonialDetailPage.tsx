import Link from 'next/link';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { WorkInternalHero } from './WorkInternalHero';
import { WorkPageCta } from './WorkPageCta';
import { WORK_LANDING } from './work.content';
import './work.css';

export interface WorkTestimonialDetail {
  slug: string;
  label: string;
  description: string;
  quote?: string;
  role?: string;
  industry?: string;
}

interface WorkTestimonialDetailPageProps {
  item: WorkTestimonialDetail;
}

/**
 * Work testimonial detail — Work landing design language.
 */
export function WorkTestimonialDetailPage({ item }: WorkTestimonialDetailPageProps) {
  const breadcrumbs = buildWorkBreadcrumbs([
    { label: 'Testimonials', href: ROUTES.workTestimonials },
    { label: item.label },
  ]);
  const headingId = `work-testimonial-${item.slug}-heading`;
  const contactHref = `${NAV_ACTIONS.freeConsultation.href}?intent=${encodeURIComponent(`testimonial-${item.slug}`)}&source=work-testimonial`;

  return (
    <PageShell className="work-page work-detail-page">
      <WorkInternalHero
        breadcrumbs={breadcrumbs}
        headingId={headingId}
        eyebrow="Client perspective"
        eyebrowIcon="quote"
        title={item.label}
        description={item.description}
        primaryCta={{
          label: WORK_LANDING.primaryCta.label,
          href: contactHref,
        }}
        secondaryCta={{
          label: 'Browse all work',
          href: ROUTES.work,
        }}
        chips={[item.industry, item.role].filter((value): value is string => Boolean(value))}
      />

      <Section
        spacing="lg"
        aria-labelledby={`${item.slug}-quote-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Testimonial"
          headingId={`${item.slug}-quote-heading`}
          title="What the client shared"
          description={
            item.quote
              ? 'Approved client voice from a Bitcraftly engagement.'
              : 'Detailed quote content will appear here once the client approval is published.'
          }
        />

        {item.quote ? (
          <blockquote className="work-detail-quote">
            <p>{item.quote}</p>
            <footer>
              <cite>{item.label}</cite>
              {item.role ? <span>{item.role}</span> : null}
            </footer>
          </blockquote>
        ) : (
          <div className="work-detail-quote work-detail-quote--placeholder">
            <p>
              We only publish client quotes after approval. In the meantime, explore related
              delivery work or book a consultation to hear how engagements like this run.
            </p>
            <div className="work-detail-quote__actions">
              <Link href={ROUTES.work} className="work-hero__btn work-hero__btn--outline">
                View portfolio
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link href={contactHref} className="work-hero__btn work-hero__btn--primary">
                Book consultation
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </Section>

      <WorkPageCta />
    </PageShell>
  );
}
