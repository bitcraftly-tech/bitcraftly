"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState, type CSSProperties } from "react";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { ServiceCard } from "./ServiceCard";
import { ServicesFeaturedBlock } from "./ServicesFeaturedBlock";
import { SERVICES_LANDING } from "./services.content";
import type {
  FeaturedServiceBlock,
  RelatedLink,
  ServiceCardModel,
  ServiceGroupIntro,
  ServiceGroupRelatedLinks,
} from "./services.types";

interface CatalogGroup {
  id: string;
  title: string;
  items: readonly ServiceCardModel[];
}

interface ServicesCatalogProps {
  groups: readonly CatalogGroup[];
  intros: readonly ServiceGroupIntro[];
  relatedByGroup: Record<string, ServiceGroupRelatedLinks>;
  featuredByGroup: readonly FeaturedServiceBlock[];
}

function matchesQuery(card: ServiceCardModel, query: string): boolean {
  if (!query) return true;
  const haystack = [
    card.title,
    card.description,
    card.slug,
    card.bestFor ?? "",
    ...(card.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchesFilter(card: ServiceCardModel, filter: string | null): boolean {
  if (!filter) return true;
  const tags = card.tags ?? [];
  if (tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())) {
    return true;
  }
  const haystack = `${card.title} ${card.description} ${card.slug}`.toLowerCase();
  return haystack.includes(filter.toLowerCase());
}

const RELATED_COLUMN_KEYS = [
  "caseStudies",
  "technologies",
  "industries",
  "blog",
] as const satisfies readonly (keyof ServiceGroupRelatedLinks)[];

const RELATED_COLUMN_META: Record<
  keyof ServiceGroupRelatedLinks,
  { title: string; fallbackIcon: IconName }
> = {
  caseStudies: { title: "Case studies", fallbackIcon: "quote" },
  technologies: { title: "Technologies", fallbackIcon: "code" },
  industries: { title: "Industries", fallbackIcon: "globe" },
  blog: { title: "Guides & FAQ", fallbackIcon: "message" },
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

export function ServicesCatalog({
  groups,
  intros,
  relatedByGroup,
  featuredByGroup,
}: ServicesCatalogProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredGroups = useMemo(() => {
    return groups.map((group) => ({
      ...group,
      items: group.items.filter(
        (card) =>
          matchesQuery(card, deferredQuery) &&
          matchesFilter(card, activeFilter),
      ),
    }));
  }, [groups, deferredQuery, activeFilter]);

  const groupsWithMatches = useMemo(
    () => filteredGroups.filter((group) => group.items.length > 0),
    [filteredGroups],
  );

  const introById = useMemo(() => {
    return new Map(intros.map((intro) => [intro.id, intro]));
  }, [intros]);

  const featuredById = useMemo(() => {
    return new Map(featuredByGroup.map((item) => [item.groupId, item]));
  }, [featuredByGroup]);

  const mergedRelated = useMemo(
    () => mergeRelatedLinks(relatedByGroup),
    [relatedByGroup],
  );

  const totalVisible = groupsWithMatches.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  const isFiltering = Boolean(deferredQuery || activeFilter);

  function applySearchTerm(term: string) {
    setQuery(term);
    setActiveFilter(null);
  }

  return (
    <div id="services-catalog">
      <Section
        spacing="lg"
        aria-labelledby="services-search-heading"
        className="services-search-section border-b border-border/40"
      >
        <div className="services-search-panel">
          <div className="services-search-panel__header">
            <div className="services-search-panel__intro">
              <h2
                id="services-search-heading"
                className="services-search-panel__title"
              >
                Search Services
              </h2>
              <p className="services-search-panel__subtitle">
                Find the right capability by keyword, popular search, or trend.
              </p>
            </div>
            <p
              className="services-search-panel__count"
              aria-live="polite"
            >
              <span className="services-search-panel__count-value">
                {totalVisible}
              </span>
              service{totalVisible === 1 ? "" : "s"} shown
            </p>
          </div>

          <label className="services-search-field">
            <span className="sr-only">Search services</span>
            <Icon
              name="search"
              size="sm"
              aria-hidden
              className="services-search-field__icon"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI, website, CRM, SaaS, cloud…"
              autoComplete="off"
              className="services-search-field__input"
            />
          </label>

          <div className="services-search-guides">
            <div className="services-search-guide">
              <p className="services-search-guide__label">Popular searches</p>
              <div className="services-search-guide__chips">
                {SERVICES_LANDING.popularSearches.map((term) => {
                  const pressed = query.toLowerCase() === term.toLowerCase();
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => applySearchTerm(term)}
                      aria-pressed={pressed}
                      className={cn(
                        "services-search-chip",
                        pressed && "services-search-chip--active",
                      )}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="services-search-guide">
              <p className="services-search-guide__label">Trending services</p>
              <div className="services-search-guide__chips">
                {SERVICES_LANDING.trendingServices.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="services-search-chip services-search-chip--trend"
                  >
                    <span className="services-search-chip__icon" aria-hidden>
                      <Icon name={item.icon} size="sm" />
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="services-search-filters"
            role="group"
            aria-label="Filter by capability"
          >
            <p className="services-search-guide__label">Browse by capability</p>
            <div className="services-search-filters__row">
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                aria-pressed={activeFilter === null}
                className={cn(
                  "services-search-chip services-search-chip--filter",
                  activeFilter === null && "services-search-chip--active",
                )}
              >
                All
              </button>
              {SERVICES_LANDING.filterChips.map((chip) => {
                const pressed = activeFilter === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() =>
                      setActiveFilter((current) =>
                        current === chip ? null : chip,
                      )
                    }
                    aria-pressed={pressed}
                    className={cn(
                      "services-search-chip services-search-chip--filter",
                      pressed && "services-search-chip--active",
                    )}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {groupsWithMatches.length === 0 ? (
        <Section spacing="lg" className="bg-background" aria-live="polite">
          <p className="m-0 font-sans text-[15px] text-muted-foreground">
            No services match your search. Try a popular search or clear
            filters.
          </p>
          <button
            type="button"
            className="mt-[12px] font-sans text-[14px] font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => {
              setQuery("");
              setActiveFilter(null);
            }}
          >
            Clear search & filters
          </button>
        </Section>
      ) : null}

      {filteredGroups.map((group, groupIndex) => {
          const intro = introById.get(group.id);
          const featured = featuredById.get(group.id);
          const hasMatches = group.items.length > 0;

          if (!hasMatches && isFiltering) {
            return (
              <Section
                key={group.id}
                id={group.id}
                spacing="lg"
                aria-labelledby={`${group.id}-heading`}
                className={cn(
                  "scroll-mt-[130px] border-b border-border/40",
                  groupIndex % 2 === 1 ? "bg-surface" : "bg-background",
                )}
              >
                <div className="w-full">
                  <h2
                    id={`${group.id}-heading`}
                    className="services-page-section-heading"
                  >
                    {intro?.title ?? group.title}
                  </h2>
                  <p className="services-section-intro__description font-sans text-[14px] text-muted-foreground">
                    No services in this category match your current search.
                  </p>
                </div>
              </Section>
            );
          }

          if (!hasMatches) return null;

          return (
            <Section
              key={group.id}
              id={group.id}
              spacing="lg"
              aria-labelledby={`${group.id}-heading`}
              className={cn(
                "scroll-mt-[130px] border-b border-border/40",
                groupIndex % 2 === 1 ? "bg-surface" : "bg-background",
              )}
            >
              <div className="w-full">
                <div className="mb-[40px] flex w-full flex-wrap items-end justify-between gap-[16px]">
                  <div className="services-section-intro min-w-0 max-w-2xl">
                    <p
                      className={cn(
                        "services-page-label services-section-intro__eyebrow",
                        "font-sans text-[12px] font-semibold uppercase tracking-[0.16em]",
                      )}
                    >
                      {intro?.label ?? "Service group"}
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
                          "services-section-intro__description max-w-2xl",
                          "font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]",
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
                    <Icon
                      name="arrow-right"
                      size="sm"
                      aria-hidden
                      className="h-[13px] w-[13px]"
                    />
                  </Link>
                </div>

                {featured && !isFiltering ? (
                  <ServicesFeaturedBlock featured={featured} />
                ) : null}

                <MarketingStagger
                  as="ul"
                  className={cn(
                    "m-0 grid w-full list-none gap-[24px] p-0",
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {group.items.map((card, index) => (
                    <li
                      key={card.slug}
                      className="mkt-stagger__item min-w-0 h-full"
                      style={
                        {
                          "--stagger": Math.min(index, 5),
                        } as CSSProperties
                      }
                    >
                      <ServiceCard service={card} />
                    </li>
                  ))}
                </MarketingStagger>
              </div>
            </Section>
          );
        })}

      {!isFiltering ? (
        <Section
          spacing="lg"
          aria-labelledby="services-related-heading"
          className="border-b border-border/40 bg-surface"
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
                Jump into work, industries, case studies, and guides that pair
                with these service lines.
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
      ) : null}
    </div>
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
            <Link
              href={link.href}
              className="services-related__card"
            >
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
                  <span className="services-related__desc">
                    {link.description}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
