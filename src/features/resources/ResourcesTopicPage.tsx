import Link from "next/link";
import type { CSSProperties } from "react";
import { PageShell } from "@/components/patterns/marketing-layout";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import {
  RESOURCE_GROUPS,
  RESOURCES_FEATURED,
} from "@/constants/resources";
import { ROUTES } from "@/constants/navigation";
import { buildResourcesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";
import { ResourcesHero } from "./ResourcesHero";
import { ResourcesPageCta } from "./ResourcesPageCta";
import type { ResourceTopicPageContent } from "./resources.content";
import "./resources.css";

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

interface ResourcesTopicPageProps {
  content: ResourceTopicPageContent;
}

function getRelatedResources(slug: string) {
  const learning = RESOURCE_GROUPS.find((group) => group.id === "learning");
  if (!learning) return [];
  return learning.items.filter((item) => item.slug !== slug).slice(0, 3);
}

/**
 * Resources topic page (guides / documentation) — Resources landing design language.
 */
export function ResourcesTopicPage({ content }: ResourcesTopicPageProps) {
  const breadcrumbs = buildResourcesBreadcrumbs([{ label: content.eyebrow }]);
  const related = getRelatedResources(content.slug);
  const contactHref = `${ROUTES.contact}?source=resources-${content.slug}`;

  return (
    <PageShell className="resources-page resources-detail-page">
      <ResourcesHero
        breadcrumbs={breadcrumbs}
        headingId={`resources-${content.slug}-heading`}
        eyebrow={content.eyebrow}
        eyebrowIcon={content.slug === "guides" ? "sparkles" : "code"}
        title={content.title}
        description={content.description}
        primaryCta={{
          label: content.primaryCtaLabel,
          href: contactHref,
        }}
        secondaryCta={{
          label: "All resources",
          href: ROUTES.resources,
        }}
        chips={content.sections.flatMap((section) =>
          section.items.slice(0, 1).map((item) => item.title),
        )}
      />

      {content.sections.map((section, sectionIndex) => (
        <Section
          key={section.id}
          spacing="lg"
          background={sectionIndex % 2 === 0 ? "default" : "surface"}
          aria-labelledby={`resources-${content.slug}-${section.id}-heading`}
          className="border-b border-border/40"
        >
          <MarketingSectionIntro
            className="section-intro-row"
            eyebrow={section.eyebrow}
            headingId={`resources-${content.slug}-${section.id}-heading`}
            title={section.title}
            description={section.description}
          />

          <MarketingStagger
            as="ul"
            className={cn(
              "m-0 mt-[24px] grid w-full list-none gap-[16px] p-0",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {section.items.map((item, index) => (
              <li
                key={item.id}
                className="mkt-stagger__item min-w-0"
                style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
              >
                <article className="resources-topic-card">
                  <div className="resources-topic-card__head">
                    <span className="resources-topic-card__icon" aria-hidden>
                      <Icon
                        name={item.icon}
                        size="sm"
                        className="h-[16px] w-[16px]"
                      />
                    </span>
                    <h3 className="resources-topic-card__title">{item.title}</h3>
                  </div>
                  <p className="resources-topic-card__desc">{item.description}</p>
                  {item.tags && item.tags.length > 0 ? (
                    <ul className="resources-topic-card__tags" aria-label="Tags">
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </MarketingStagger>
        </Section>
      ))}

      {related.length > 0 ? (
        <Section
          spacing="lg"
          background="surface"
          aria-labelledby={`resources-${content.slug}-related-heading`}
          className="border-b border-border/40"
        >
          <div className="resources-detail-related__head">
            <MarketingSectionIntro
              headingId={`resources-${content.slug}-related-heading`}
              title="Related resources"
              description="Keep exploring learning materials across the Bitcraftly library."
            />
            <Link
              href={RESOURCES_FEATURED.href}
              className={cn(
                "inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline",
                "transition-opacity duration-200 hover:opacity-80",
                focusRing,
              )}
            >
              {RESOURCES_FEATURED.ctaLabel}
              <Icon
                name="arrow-right"
                size="sm"
                aria-hidden
                className="h-[13px] w-[13px]"
              />
            </Link>
          </div>

          <MarketingStagger
            as="ul"
            className={cn(
              "m-0 mt-[24px] grid w-full list-none gap-[16px] p-0",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {related.map((item, index) => (
              <li
                key={item.slug}
                className="mkt-stagger__item min-w-0"
                style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
              >
                <Link href={item.href} className={cn("group resources-link-card", focusRing)}>
                  <div className="resources-link-card__head">
                    <span className="resources-link-card__icon" aria-hidden>
                      <Icon
                        name={item.icon as IconName}
                        size="sm"
                        className="h-[16px] w-[16px]"
                      />
                    </span>
                    <h3 className="resources-link-card__title">{item.label}</h3>
                  </div>
                  <p className="resources-link-card__desc">{item.description}</p>
                  <span className="resources-link-card__cta">
                    Explore
                    <Icon
                      name="arrow-right"
                      size="sm"
                      aria-hidden
                      className="h-[13px] w-[13px]"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </MarketingStagger>
        </Section>
      ) : null}

      <ResourcesPageCta source={content.slug} />
    </PageShell>
  );
}
