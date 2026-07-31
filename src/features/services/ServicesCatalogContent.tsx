import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MarketingStagger } from '@/components/patterns/marketing-stagger';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { ServiceCard } from './ServiceCard';
import { ServicesFeaturedBlock } from './ServicesFeaturedBlock';
import { buildServiceSearchIndex } from './services-catalog.utils';
import type {
  FeaturedServiceBlock,
  RelatedLink,
  ServiceCardModel,
  ServiceGroupIntro,
  ServiceGroupRelatedLinks,
} from './services.types';

interface CatalogGroup {
  id: string;
  title: string;
  items: readonly ServiceCardModel[];
}

interface ServicesCatalogContentProps {
  groups: readonly CatalogGroup[];
  intros: readonly ServiceGroupIntro[];
  relatedByGroup: Record<string, ServiceGroupRelatedLinks>;
  featuredByGroup: readonly FeaturedServiceBlock[];
}

const RELATED_COLUMN_KEYS = [
  'caseStudies',
  'technologies',
  'industries',
  'blog',
] as const satisfies readonly (keyof ServiceGroupRelatedLinks)[];

const RELATED_COLUMN_META: Record<
  keyof ServiceGroupRelatedLinks,
  { title: string; fallbackIcon: IconName }
> = {
  caseStudies: { title: 'Case studies', fallbackIcon: 'quote' },
  technologies: { title: 'Technologies', fallbackIcon: 'code' },
  industries: { title: 'Industries', fallbackIcon: 'globe' },
  blog: { title: 'Guides & FAQ', fallbackIcon: 'message' },
};

const RELATED_LINKS_PER_COLUMN = 3;

function mergeRelatedLinks(
  relatedByGroup: Record<string, ServiceGroupRelatedLinks>,
): ServiceGroupRelatedLinks {
  const merged = {
    caseStudies: [] as RelatedLink[],
    technologies: [] as RelatedLink[],
    industries: [] as RelatedLink[],
    blog: [] as RelatedLink[],
  };

  for (const key of RELATED_COLUMN_KEYS) {
    const seen = new Set<string>();
    for (const groupRelated of Object.values(relatedByGroup)) {
      for (const link of groupRelated[key]) {
        if (seen.has(link.href)) continue;
        seen.add(link.href);
        merged[key].push(link);
        if (merged[key].length >= RELATED_LINKS_PER_COLUMN) break;
      }
      if (merged[key].length >= RELATED_LINKS_PER_COLUMN) break;
    }
  }

  return merged;
}

/** SSR catalog body — filter island toggles visibility via data attributes. */
export function ServicesCatalogContent({
  groups,
  intros,
  relatedByGroup,
  featuredByGroup,
}: ServicesCatalogContentProps) {
  const introById = new Map(intros.map((intro) => [intro.id, intro]));
  const featuredById = new Map(featuredByGroup.map((item) => [item.groupId, item]));
  const mergedRelated = mergeRelatedLinks(relatedByGroup);

  return (
    <>
      {groups.map((group, groupIndex) => {
        const intro = introById.get(group.id);
        const featured = featuredById.get(group.id);

        return (
          <Section
            key={group.id}
            id={group.id}
            spacing="lg"
            aria-labelledby={`${group.id}-heading`}
            className={cn(
              'scroll-mt-[130px] border-b border-border/40',
              groupIndex % 2 === 1 ? 'bg-surface' : 'bg-background',
            )}
            data-service-group={group.id}
          >
            <div className="w-full" data-group-body>
              <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
                <div className="services-section-intro min-w-0 max-w-2xl">
                  <p
                    className={cn(
                      'services-page-label services-section-intro__eyebrow',
                      'font-sans text-[12px] font-semibold uppercase tracking-[0.16em]',
                    )}
                  >
                    {intro?.label ?? 'Service group'}
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="services-page-section-heading services-section-intro__heading"
                  >
                    {intro?.title ?? group.title}
                  </h2>
                  {intro?.description ? (
                    <p
                      className={cn(
                        'services-section-intro__description max-w-2xl',
                        'font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]',
                      )}
                    >
                      {intro.description}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={NAV_ACTIONS.bookCall.href}
                  className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Book a call
                  <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
                </Link>
              </div>

              {featured ? (
                <div data-catalog-featured>
                  <ServicesFeaturedBlock featured={featured} />
                </div>
              ) : null}

              <MarketingStagger
                as="ul"
                className={cn(
                  'm-0 grid w-full list-none gap-[24px] p-0',
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {group.items.map((card, index) => (
                  <li
                    key={card.slug}
                    className="mkt-stagger__item min-w-0 h-full"
                    style={
                      {
                        '--stagger': Math.min(index, 5),
                      } as CSSProperties
                    }
                    data-service-card
                    data-service-group={group.id}
                    data-service-slug={card.slug}
                    data-search-index={buildServiceSearchIndex(card)}
                  >
                    <ServiceCard service={card} />
                  </li>
                ))}
              </MarketingStagger>
            </div>

            <div data-group-filter-empty hidden>
              <h2 className="services-page-section-heading">{intro?.title ?? group.title}</h2>
              <p className="services-section-intro__description font-sans text-[14px] text-muted-foreground">
                No services in this category match your current search.
              </p>
            </div>
          </Section>
        );
      })}

      <Section
        spacing="lg"
        aria-labelledby="services-related-heading"
        className="border-b border-border/40 bg-surface"
        data-catalog-related
      >
        <div className="services-related">
          <header className="services-related__intro">
            <p className="services-related__eyebrow">Related resources</p>
            <h2
              id="services-related-heading"
              className="services-page-section-heading services-section-intro__heading"
            >
              Explore nearby pages
            </h2>
            <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
              Jump into work, industries, case studies, and guides that pair with these service
              lines.
            </p>
          </header>
          <div className="services-related__grid">
            {RELATED_COLUMN_KEYS.map((key) => (
              <RelatedResourceColumn
                key={key}
                title={RELATED_COLUMN_META[key].title}
                fallbackIcon={RELATED_COLUMN_META[key].fallbackIcon}
                links={mergedRelated[key]}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function RelatedResourceColumn({
  title,
  links,
  fallbackIcon,
}: {
  title: string;
  links: readonly RelatedLink[];
  fallbackIcon: IconName;
}) {
  return (
    <div className="services-related__column">
      <h3 className="services-related__heading">{title}</h3>
      <ul className="services-related__list">
        {links.map((link) => (
          <li key={`${title}-${link.href}`} className="min-w-0">
            <Link href={link.href} className="services-related__card">
              <span className="services-related__icon" aria-hidden>
                <Icon name={link.icon ?? fallbackIcon} size="sm" />
              </span>
              <span className="services-related__copy">
                <span className="services-related__title-row">
                  <span className="services-related__title">{link.label}</span>
                  <Icon
                    name="arrow-up-right"
                    size="sm"
                    aria-hidden
                    className="services-related__arrow"
                  />
                </span>
                {link.description ? (
                  <span className="services-related__desc">{link.description}</span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
