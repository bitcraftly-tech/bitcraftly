import Link from "next/link";
import type { CSSProperties } from "react";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { SERVICES_LANDING } from "./services.content";

export function ServicesComparisonSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="services-comparison-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow="Decision guide"
          headingId="services-comparison-heading"
          title="Which service is right?"
          description="Compare Website, Web App, CRM, ERP, SaaS, and AI paths — then book a call if you want a scoped recommendation."
        />
        <Link
          href={NAV_ACTIONS.bookCall.href}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get a recommendation
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
          "m-0 grid list-none gap-[24px] p-0",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {SERVICES_LANDING.comparison.map((option, index) => (
          <li
            key={option.id}
            className="mkt-stagger__item min-w-0"
            style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
          >
            <Link
              href={option.href}
              className={cn(
                "services-page-card group flex h-full flex-col rounded-[16px] card-padding no-underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-offset-background",
              )}
            >
              <span className="services-page-card-header">
                <span className="services-page-icon-box inline-flex shrink-0">
                  <IconBox icon={option.icon} variant="default" size="sm" />
                </span>
                <h3 className="services-page-card-title">{option.title}</h3>
              </span>

              <dl className="m-0 flex flex-1 flex-col gap-[var(--space-xs)]">
                <div>
                  <dt className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Best for
                  </dt>
                  <dd className="m-0 mt-[2px] font-sans text-[13px] text-foreground">
                    {option.bestFor}
                  </dd>
                </div>
                <div>
                  <dt className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Typical timeline
                  </dt>
                  <dd className="m-0 mt-[2px] font-sans text-[13px] font-semibold text-primary">
                    {option.timeline}
                  </dd>
                </div>
                <div>
                  <dt className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Outcome
                  </dt>
                  <dd className="m-0 mt-[2px] font-sans text-[13px] text-muted-foreground">
                    {option.outcome}
                  </dd>
                </div>
              </dl>

              <span className="services-card-cta inline-flex items-center gap-[5px] font-sans text-[13px] font-semibold text-primary">
                Learn more
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="services-page-card-cta-icon h-[13px] w-[13px]"
                />
              </span>
            </Link>
          </li>
        ))}
      </MarketingStagger>
    </Section>
  );
}
