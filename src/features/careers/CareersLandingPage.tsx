import Link from "next/link";
import type { CSSProperties } from "react";
import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { PageShell } from "@/components/patterns/marketing-layout";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import {
  CAREER_BENEFITS,
  CAREER_CULTURE,
  CAREER_PROCESS_STEPS,
  CAREER_ROLES,
  getCareersApplyHref,
} from "./careers.content";
import { CareersHero } from "./CareersHero";
import { CareersRolesBoard } from "./CareersRolesBoard";
import "./careers.css";

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const CULTURE_ICONS: readonly IconName[] = [
  "shield",
  "rocket",
  "globe",
  "code",
];

const BENEFIT_ICONS: readonly IconName[] = [
  "calendar",
  "sparkles",
  "layout-grid",
  "star",
  "check",
  "trending-up",
];

const PROCESS_ICONS: readonly IconName[] = [
  "mail",
  "search",
  "message",
  "code",
  "zap",
  "check",
];

/**
 * Careers landing — Services-style layout + bitcraftly.com/careers content.
 */
export function CareersLandingPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Careers" },
  ]);
  const hasOpenings = CAREER_ROLES.length > 0;

  return (
    <PageShell className="careers-page">
      <CareersHero breadcrumbs={breadcrumbs} />

      <Section
        id="open-roles"
        spacing="lg"
        background="surface"
        aria-labelledby="open-roles-heading"
        className="scroll-mt-[100px] border-b border-border/40"
      >
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <MarketingSectionIntro
            eyebrow="Open positions"
            headingId="open-roles-heading"
            title={
              hasOpenings ? "Roles we are hiring for" : "Current openings"
            }
            description={
              hasOpenings
                ? "Engineering, design, and product — filter by team, search skills, and apply in minutes."
                : "There are no open roles at the moment. Leave a general application and we will reach out when hiring resumes."
            }
          />
          <Link
            href={getCareersApplyHref("general")}
            className={cn(
              "inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline",
              "transition-opacity duration-200 hover:opacity-80",
              focusRing,
            )}
          >
            General application
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="h-[13px] w-[13px]"
            />
          </Link>
        </div>
        <CareersRolesBoard />
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="careers-culture-heading"
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Culture"
          headingId="careers-culture-heading"
          title="How we work at Bitcraftly"
          description="A premium studio rhythm — async delivery, founder accountability, and craft over chaos."
        />

        <div className="careers-remote-banner">
          <div className="careers-remote-banner__head">
            <span className="careers-remote-banner__icon" aria-hidden>
              <Icon name="globe" size="sm" className="h-[16px] w-[16px]" />
            </span>
            <p className="careers-remote-banner__title">Remote-first</p>
          </div>
          <p>
            Work from anywhere · Ghaziabad / NCR overlap for sync when clients
            need it
          </p>
        </div>

        <MarketingStagger
          as="ul"
          className={cn(
            "m-0 grid w-full list-none gap-[16px] p-0",
            "grid-cols-1 sm:grid-cols-2",
          )}
        >
          {CAREER_CULTURE.map((item, index) => (
            <li
              key={item.title}
              className="mkt-stagger__item min-w-0"
              style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
            >
              <article className="careers-page-card">
                <div className="careers-page-card__head">
                  <span className="careers-page-card__icon" aria-hidden>
                    <Icon
                      name={CULTURE_ICONS[index] ?? "sparkles"}
                      size="sm"
                      className="h-[16px] w-[16px]"
                    />
                  </span>
                  <h3 className="careers-page-card__title">{item.title}</h3>
                </div>
                <p className="careers-page-card__body">{item.body}</p>
              </article>
            </li>
          ))}
        </MarketingStagger>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby="careers-benefits-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Benefits & perks"
          headingId="careers-benefits-heading"
          title="What you get"
          description="Clear expectations, real ownership, and respect for your craft and time."
        />

        <MarketingStagger
          as="ul"
          className={cn(
            "m-0 grid w-full list-none gap-[16px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {CAREER_BENEFITS.map((item, index) => (
            <li
              key={item.title}
              className="mkt-stagger__item min-w-0"
              style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
            >
              <article className="careers-page-card">
                <div className="careers-page-card__head">
                  <span className="careers-page-card__icon" aria-hidden>
                    <Icon
                      name={BENEFIT_ICONS[index] ?? "check"}
                      size="sm"
                      className="h-[16px] w-[16px]"
                    />
                  </span>
                  <h3 className="careers-page-card__title">{item.title}</h3>
                </div>
                <p className="careers-page-card__body">{item.body}</p>
              </article>
            </li>
          ))}
        </MarketingStagger>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="careers-process-heading"
        className="border-b border-border/40 bg-background"
      >
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <MarketingSectionIntro
            eyebrow="Hiring process"
            headingId="careers-process-heading"
            title="Transparent, founder-led pipeline"
            description="From application to offer — clear stages, respectful timelines, and optional paid trial work."
          />
          <a
            href="mailto:hello@bitcraftly.com"
            className={cn(
              "inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline",
              "transition-opacity duration-200 hover:opacity-80",
              focusRing,
            )}
          >
            hello@bitcraftly.com
            <Icon
              name="arrow-up-right"
              size="sm"
              aria-hidden
              className="h-[13px] w-[13px]"
            />
          </a>
        </div>

        <MarketingStagger
          as="ol"
          className={cn(
            "m-0 grid w-full list-none gap-[16px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {CAREER_PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="mkt-stagger__item min-w-0"
              style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
            >
              <article className="careers-page-card careers-page-card--step">
                <div className="careers-page-card__step-meta">
                  <span className="careers-page-card__step-index">
                    Step {index + 1}
                  </span>
                  {"optional" in step && step.optional ? (
                    <span className="careers-page-card__optional">Optional</span>
                  ) : null}
                </div>
                <div className="careers-page-card__head">
                  <span className="careers-page-card__icon" aria-hidden>
                    <Icon
                      name={PROCESS_ICONS[index] ?? "check"}
                      size="sm"
                      className="h-[16px] w-[16px]"
                    />
                  </span>
                  <h3 className="careers-page-card__title">{step.title}</h3>
                </div>
                <p className="careers-page-card__body">{step.body}</p>
              </article>
            </li>
          ))}
        </MarketingStagger>
      </Section>

      <MarketingFinalCtaBand
        headingId="careers-cta-heading"
        heading="Ready to build with us?"
        description="Apply in under five minutes — resume, links, and role fit. Founder reviews every profile personally."
        reassurance="Prefer email? hello@bitcraftly.com"
        primaryCta={{
          label: hasOpenings ? "Apply now" : "Send general application",
          href: getCareersApplyHref("general"),
        }}
        tertiaryCta={{
          label: hasOpenings ? "View open roles" : "See hiring process",
          href: hasOpenings ? "#open-roles" : "#careers-process-heading",
        }}
        trust={[
          "Founder-led review",
          "Clear salary bands",
          "Remote-first · India",
        ]}
      />
    </PageShell>
  );
}
