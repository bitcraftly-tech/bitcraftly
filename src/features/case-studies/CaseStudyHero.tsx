import { WorkInternalHero } from '@/features/work/WorkInternalHero';
import type { CaseStudy } from '@/content/case-studies';
import { NAV_ACTIONS } from '@/constants/navigation';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/work/work.css';

interface CaseStudyHeroProps {
  study: CaseStudy;
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Case study hero — same Work aurora / work-hero shell as Work landing + internals.
 */
export async function CaseStudyHero({ study, breadcrumbs }: CaseStudyHeroProps) {
  const description = [study.subtitle, study.excerpt].filter(Boolean).join(' ');

  return (
    <WorkInternalHero
      breadcrumbs={breadcrumbs}
      headingId="case-study-heading"
      eyebrow="Case study"
      eyebrowIcon="layout-grid"
      title={study.title}
      description={description}
      primaryCta={{
        label: NAV_ACTIONS.freeConsultation.label,
        href: NAV_ACTIONS.freeConsultation.href,
      }}
      secondaryCta={{
        label: 'View results',
        href: '#results',
      }}
      chips={study.tags}
      cover={{
        src: study.coverImage,
        alt: study.coverImageAlt,
        badge: 'Case study',
      }}
    />
  );
}
