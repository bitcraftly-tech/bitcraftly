import Link from "next/link";
import type { CSSProperties } from "react";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { SERVICES_LANDING } from "./services.content";

export function ServicesRelatedHubs() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="services-internal-links-heading"
      className="border-b border-border/40"
    >
      <div className="w-full">
        <MarketingSectionIntro
          className="mb-[40px]"
          eyebrow="Explore more"
          headingId="services-internal-links-heading"
          title="Related hubs"
          description="Jump into portfolio, industries, case studies, and resources that connect to these services."
        />

        <MarketingStagger
          as="ul"
          className={cn(
            "m-0 grid w-full list-none gap-[24px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {SERVICES_LANDING.hubs.map((hub, index) => (
            <li
              key={hub.href}
              className="mkt-stagger__item min-w-0"
              style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
            >
              <Link
                href={hub.href}
                className={cn(
                  "services-hub-card group flex h-full flex-col",
                  "rounded-[16px] p-[24px] no-underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span className="services-page-icon-box inline-flex shrink-0">
                  <IconBox icon={hub.icon} variant="default" size="sm" />
                </span>
                <h3 className="services-page-card-title mt-[14px]">
                  {hub.title}
                </h3>
                <p className="mt-[8px] mb-0 flex-1 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                  {hub.description}
                </p>
                <span
                  className={cn(
                    "mt-[14px] inline-flex items-center gap-[5px]",
                    "font-sans text-[13px] font-semibold text-primary",
                    "sm:text-[14px]",
                  )}
                >
                  Explore
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
      </div>
    </Section>
  );
}
