import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import { ServicesHeroVisual } from "./ServicesHeroVisual";
import type { ServicePageContent } from "./services.types";
import "./services.css";

interface ServiceDetailHeroProps {
  content: ServicePageContent;
  breadcrumbs: readonly BreadcrumbItem[];
  contactHref: string;
}

const FEATURE_TONES = ["violet", "sky", "emerald", "amber"] as const;
const FEATURE_ICONS: readonly IconName[] = [
  "check",
  "zap",
  "shield",
  "layout-grid",
];

/**
 * Service detail hero — same shell language as Services landing hero.
 */
export async function ServiceDetailHero({
  content,
  breadcrumbs,
  contactHref,
}: ServiceDetailHeroProps) {
  const isMobile = await isMobileUserAgent();
  const headingId = `${content.slug}-page-heading`;
  const featureItems = content.highlights.slice(0, 4).map((title, index) => ({
    id: `feature-${index}`,
    title,
    icon: FEATURE_ICONS[index] ?? "check",
    tone: FEATURE_TONES[index] ?? "violet",
  }));

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        "services-hero relative overflow-hidden hero-surface",
        "border-b border-border/60",
        isMobile && "marketing-hero--compact",
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-55 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[12%] size-[680px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[14%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl hero-aurora-blend"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="services-hero__container">
        <div className="services-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="services-hero__grid">
          <div className="services-hero__content">
            <p className="services-hero__eyebrow">
              <Icon
                name={content.icon}
                size="sm"
                aria-hidden
                className="services-hero__eyebrow-icon"
              />
              <span>{content.eyebrow}</span>
            </p>

            <p className="service-detail-hero__group">{content.groupTitle}</p>

            <h1 id={headingId} className="services-hero__title">
              {content.headline}
            </h1>

            <p className="services-hero__description">{content.intro}</p>

            <div className="services-hero__cta-row">
              <Link
                href={contactHref}
                className="services-hero__btn services-hero__btn--primary"
              >
                {content.ctaPrimaryLabel}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={ROUTES.services}
                className="services-hero__btn services-hero__btn--outline"
              >
                {content.ctaSecondaryLabel}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile ? (
              <div className="service-detail-hero__outcomes">
                <p className="service-detail-hero__outcomes-label">
                  What you get
                </p>
                <ul className="service-detail-hero__outcomes-list">
                  {content.outcomes.map((outcome) => (
                    <li key={outcome} className="service-detail-hero__outcome">
                      <span className="services-page-check" aria-hidden>
                        <Icon
                          name="check"
                          size="sm"
                          className="h-[14px] w-[14px]"
                        />
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="services-hero__visual">
              <ServicesHeroVisual />
            </div>
          ) : null}

          {!isMobile && featureItems.length > 0 ? (
            <ul
              className="services-hero-features"
              aria-label="Service capabilities preview"
            >
              {featureItems.map((item) => (
                <li key={item.id} className="services-hero-features__item">
                  <span className="services-hero-features__head">
                    <span
                      className={`services-hero-features__icon services-hero-features__icon--${item.tone}`}
                      aria-hidden
                    >
                      <Icon name={item.icon} size="sm" />
                    </span>
                    <span className="services-hero-features__title">
                      {item.title}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
