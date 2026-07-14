import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { HeroDashboard } from "../Hero/HeroDashboard";
import "../Hero/hero.css";
import { HomepageReveal } from "../shared/HomepageReveal";
import { bitcraftlyProductImage } from "../shared/contact-links";
import "./dashboard-showcase.css";

export const DASHBOARD_SECTION_ID = "enterprise-dashboard";
export const DASHBOARD_HEADING_ID = "enterprise-dashboard-heading";

const DASHBOARD_FEATURES = [
  "Component patterns",
  "Dashboard-ready UI",
  "Responsive layouts",
  "Investor-ready demos",
] as const;

const ANALYTICS_TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "Charts",
  "Realtime",
] as const;

const SAAS_TECH = [
  "Next.js",
  "TypeScript",
  "Stripe",
  "PostgreSQL",
  "Prisma",
] as const;

/**
 * Enterprise dashboard / product UI showcase — Featured Project cards.
 */
export function DashboardShowcaseSection() {
  return (
    <section
      id={DASHBOARD_SECTION_ID}
      aria-labelledby={DASHBOARD_HEADING_ID}
      className="dashboard-section bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal
          name="dashboard"
          className="mx-auto max-w-[720px] text-center"
        >
          <p
            className={cn(
              "dashboard-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            Product UI
          </p>

          <h2
            id={DASHBOARD_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            Enterprise Dashboard Showcase
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[560px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            Startup UI patterns — React product screens, analytics dashboards, and
            interaction flows founders use for investor-ready walkthroughs.
          </p>

          <ul
            className={cn(
              "m-0 mt-[20px] flex list-none flex-wrap items-center justify-center gap-[8px] p-0",
            )}
            aria-label="Dashboard capabilities"
          >
            {DASHBOARD_FEATURES.map((item) => (
              <li key={item} className="dashboard-feature-chip">
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="h-[12px] w-[12px]"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-[20px] flex justify-center">
            <Link
              href={ROUTES.workPortfolio}
              className={cn(
                "dashboard-cta inline-flex min-h-[44px] items-center justify-center gap-[8px]",
                "rounded-[12px] border-0 px-[18px] no-underline",
                "font-sans text-[14px] font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              View product portfolio
              <Icon
                name="arrow-up-right"
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px]"
              />
            </Link>
          </div>
        </HomepageReveal>

        <ul
          className={cn(
            "m-0 mt-[var(--space-6)] grid list-none gap-[24px] p-0",
            "grid-cols-1 lg:grid-cols-2",
          )}
        >
          <li className="min-w-0">
            <HomepageReveal name="dashboard" delayMs={80} className="h-full">
              <article className="dashboard-featured-card h-full">
                <div className="dashboard-featured-media dashboard-featured-media--dashboard">
                  <span className="dashboard-saas-badge">Featured Project</span>
                  <div className="dashboard-panel">
                    <HeroDashboard decorative={false} showBrowserChrome />
                  </div>
                </div>
                <div className="dashboard-saas-body">
                  <h3 className="m-0 font-sans text-[18px] font-bold tracking-[-0.015em] text-foreground">
                    Revenue Analytics Dashboard
                  </h3>
                  <p className="mt-[8px] mb-0 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                    Live revenue overview with growth trends, project pipeline,
                    lead volume, and success metrics — built for founder demos
                    and product walkthroughs.
                  </p>
                  <ul
                    className="m-0 mt-[14px] flex list-none flex-wrap gap-[6px] p-0"
                    aria-label="Tech stack"
                  >
                    {ANALYTICS_TECH.map((tech) => (
                      <li key={tech} className="dashboard-tech-chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </HomepageReveal>
          </li>

          <li className="min-w-0">
            <HomepageReveal name="dashboard" delayMs={140} className="h-full">
              <article className="dashboard-featured-card h-full">
                <div className="dashboard-featured-media">
                  <Image
                    src={bitcraftlyProductImage("Next-Gen SaaS Platform.png")}
                    alt="Multi-tenant SaaS product UI preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                  <span className="dashboard-saas-badge">Featured Project</span>
                </div>
                <div className="dashboard-saas-body">
                  <h3 className="m-0 font-sans text-[18px] font-bold tracking-[-0.015em] text-foreground">
                    Multi-tenant SaaS Shell
                  </h3>
                  <p className="mt-[8px] mb-0 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                    Full-stack startup frontend with authentication flows,
                    billing-ready UI, analytics dashboards, and scalable
                    component architecture.
                  </p>
                  <ul
                    className="m-0 mt-[14px] flex list-none flex-wrap gap-[6px] p-0"
                    aria-label="Tech stack"
                  >
                    {SAAS_TECH.map((tech) => (
                      <li key={tech} className="dashboard-tech-chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </HomepageReveal>
          </li>
        </ul>
      </Container>
    </section>
  );
}
