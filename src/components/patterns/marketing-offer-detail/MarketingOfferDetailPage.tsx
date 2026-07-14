import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Icon, type IconName } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Section } from "@/components/ui/section";
import { FinalCTASection } from "@/features/homepage/FinalCTA";
import { ServiceFaqAccordion } from "@/features/services/ServiceFaqAccordion";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import "@/features/services/services.css";

export interface MarketingOfferFaq {
  id: string;
  question: string;
  answer: string;
}

export interface MarketingOfferProcessStep {
  title: string;
  description: string;
}

export interface MarketingOfferRelatedLink {
  label: string;
  href: string;
}

interface MarketingOfferDetailPageProps {
  pageClassName: string;
  jsonLd: unknown;
  breadcrumbs: readonly BreadcrumbItem[];
  slug: string;
  eyebrow: string;
  icon: IconName;
  groupTitle: string;
  headline: string;
  intro: string;
  contactHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  outcomes: readonly string[];
  outcomesAriaLabel: string;
  highlights: readonly string[];
  process: readonly MarketingOfferProcessStep[];
  faqs: readonly MarketingOfferFaq[];
  relatedHeading: string;
  relatedAllHref: string;
  relatedAllLabel: string;
  relatedCards: ReactNode;
  relatedLinksHeading: string;
  relatedLinks: readonly MarketingOfferRelatedLink[];
}

/**
 * Shared Service / Solution detail page shell.
 */
export function MarketingOfferDetailPage({
  pageClassName,
  jsonLd,
  breadcrumbs,
  slug,
  eyebrow,
  icon,
  groupTitle,
  headline,
  intro,
  contactHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  outcomes,
  outcomesAriaLabel,
  highlights,
  process,
  faqs,
  relatedHeading,
  relatedAllHref,
  relatedAllLabel,
  relatedCards,
  relatedLinksHeading,
  relatedLinks,
}: MarketingOfferDetailPageProps) {
  const headingId = `${slug}-page-heading`;

  return (
    <PageShell className={pageClassName}>
      <JsonLdScript data={jsonLd} />

      <Section
        spacing="lg"
        aria-labelledby={headingId}
        className="border-b border-border/60 bg-background"
      >
        <MarketingBreadcrumbs
          items={breadcrumbs}
          className="mb-[var(--space-4)]"
        />

        <div className="flex w-full flex-col gap-[28px] lg:flex-row lg:items-start lg:justify-between lg:gap-[48px]">
          <div className="min-w-0 w-full max-w-3xl">
            <p
              className={cn(
                "services-page-label m-0 mb-[12px]",
                "font-sans text-[12px] font-semibold uppercase tracking-[0.16em]",
              )}
            >
              {eyebrow}
            </p>

            <div className="mb-[16px] flex items-center gap-[12px]">
              <span className="services-page-icon-box inline-flex shrink-0">
                <IconBox icon={icon} variant="default" size="sm" />
              </span>
              <p className="m-0 font-sans text-[13px] font-semibold text-muted-foreground">
                {groupTitle}
              </p>
            </div>

            <h1
              id={headingId}
              className={cn(
                "hero-heading m-0 max-w-3xl font-sans font-extrabold text-foreground text-balance",
                "leading-[1.1] tracking-[-0.04em]",
              )}
            >
              {headline}
            </h1>

            <p className="hero-description m-0 mt-[14px] max-w-2xl font-sans text-muted-foreground">
              {intro}
            </p>

            <div className="mt-[28px] flex w-full flex-col gap-[var(--space-2)] sm:flex-row sm:flex-wrap">
              <Link href={contactHref} className="hero-cta hero-cta-primary">
                {primaryCtaLabel}
                <Icon name="arrow-right" size="sm" aria-hidden />
              </Link>
              <Link href={secondaryCtaHref} className="hero-cta hero-cta-outline">
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <aside
            className={cn(
              "w-full shrink-0 rounded-[16px] border border-[var(--hp-card-border,#eef2ff)] bg-surface p-[24px]",
              "lg:max-w-[320px]",
            )}
            aria-label={outcomesAriaLabel}
          >
            <p className="m-0 font-sans text-[13px] font-bold text-foreground">
              What you get
            </p>
            <ul className="mt-[14px] m-0 flex list-none flex-col gap-[10px] p-0">
              {outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-[10px] font-sans text-[13px] leading-[1.5] text-muted-foreground"
                >
                  <span className="services-page-check" aria-hidden>
                    <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby={`${slug}-highlights-heading`}
        className="border-b border-border/40 bg-background"
      >
        <h2
          id={`${slug}-highlights-heading`}
          className="services-page-section-heading"
        >
          Capabilities
        </h2>
        <ul
          className={cn(
            "m-0 mt-[24px] grid list-none gap-[16px] p-0",
            "grid-cols-1 sm:grid-cols-2",
          )}
        >
          {highlights.map((item) => (
            <li
              key={item}
              className={cn(
                "flex items-start gap-[12px] rounded-[16px] border border-[var(--hp-card-border,#eef2ff)]",
                "bg-background p-[20px]",
              )}
            >
              <span className="services-page-check" aria-hidden>
                <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
              </span>
              <span className="font-sans text-[14px] leading-[1.55] text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby={`${slug}-process-heading`}
        className="border-b border-border/40 bg-surface"
      >
        <h2
          id={`${slug}-process-heading`}
          className="services-page-section-heading"
        >
          How we deliver
        </h2>
        <ol
          className={cn(
            "m-0 mt-[24px] grid list-none gap-[16px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {process.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[16px] border border-[var(--hp-card-border,#eef2ff)] bg-background p-[20px]"
            >
              <p className="services-page-label m-0 mb-[10px] font-sans text-[12px] font-semibold tracking-[0.08em]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="m-0 font-sans text-[16px] font-bold tracking-[-0.015em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-[8px] mb-0 font-sans text-[13px] leading-[1.55] text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {faqs.length > 0 ? (
        <Section
          spacing="lg"
          aria-labelledby={`${slug}-faq-heading`}
          className="border-b border-border/40 bg-background"
        >
          <h2
            id={`${slug}-faq-heading`}
            className="services-page-section-heading mb-[24px]"
          >
            Frequently asked questions
          </h2>
          <ServiceFaqAccordion items={[...faqs]} />
        </Section>
      ) : null}

      <Section
        spacing="lg"
        aria-labelledby={`${slug}-related-heading`}
        className="border-b border-border/40 bg-surface"
      >
        <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[12px]">
          <h2
            id={`${slug}-related-heading`}
            className="services-page-section-heading"
          >
            {relatedHeading}
          </h2>
          <Link
            href={relatedAllHref}
            className="font-sans text-[13px] font-semibold text-primary no-underline hover:underline"
          >
            {relatedAllLabel}
          </Link>
        </div>

        {relatedCards}

        {relatedLinks.length > 0 ? (
          <div className="mt-[36px]">
            <h3 className="m-0 font-sans text-[16px] font-bold text-foreground">
              {relatedLinksHeading}
            </h3>
            <ul className="mt-[12px] m-0 flex list-none flex-wrap gap-[10px] p-0">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex min-h-[36px] items-center rounded-[10px] border border-[var(--hp-card-border,#eef2ff)]",
                      "bg-background px-[14px] font-sans text-[13px] font-semibold text-foreground no-underline",
                      "hover:border-primary/40 hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <FinalCTASection />
    </PageShell>
  );
}
