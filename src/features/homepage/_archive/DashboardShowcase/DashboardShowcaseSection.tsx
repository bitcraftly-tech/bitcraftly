import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { HeroDashboard } from '../Hero/HeroDashboard';
import { HomepageReveal } from '../shared/HomepageReveal';
import { bitcraftlyProductImage } from '../shared/contact-links';
import './dashboard-showcase.css';

export const DASHBOARD_SECTION_ID = 'enterprise-dashboard';
export const DASHBOARD_HEADING_ID = 'enterprise-dashboard-heading';

const DASHBOARD_FEATURES = [
  'Component patterns',
  'Dashboard-ready UI',
  'Responsive layouts',
  'Investor-ready demos',
] as const;

const ANALYTICS_TECH = ['React', 'Next.js', 'TypeScript', 'Charts', 'Realtime'] as const;

const SAAS_TECH = ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'] as const;

/**
 * Enterprise dashboard — split intro like Tech Stack / Process:
 * left copy + chips, right text-link CTA.
 */
export function DashboardShowcaseSection() {
  return (
    <section
      id={DASHBOARD_SECTION_ID}
      aria-labelledby={DASHBOARD_HEADING_ID}
      className="dashboard-section bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <HomepageReveal name="dashboard" className="min-w-0 max-w-2xl">
            <div className="homepage-section-intro text-left">
              <p
                className={cn(
                  'section-intro-eyebrow dashboard-label',
                  'font-sans text-[12px] font-[var(--font-weight-semibold)]',
                  'uppercase tracking-[0.16em]',
                )}
              >
                Product UI
              </p>

              <h2
                id={DASHBOARD_HEADING_ID}
                className={cn(
                  'section-intro-heading font-sans font-bold text-foreground',
                  'text-[28px] leading-[1.2] tracking-[-0.02em]',
                  'sm:text-[32px] lg:text-[34px]',
                )}
              >
                Enterprise Dashboard Showcase
              </h2>

              <p
                className={cn(
                  'section-intro-description max-w-2xl',
                  'font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground',
                  'sm:text-[16px]',
                )}
              >
                Startup UI patterns — React product screens, analytics dashboards, and interaction
                flows founders use for investor-ready walkthroughs.
              </p>

              <ul
                className={cn(
                  'section-intro-actions m-0 flex list-none flex-wrap items-center justify-start gap-[8px] p-0',
                )}
                aria-label="Dashboard capabilities"
              >
                {DASHBOARD_FEATURES.map((item) => (
                  <li key={item} className="dashboard-feature-chip">
                    <Icon name="check" size="sm" aria-hidden className="h-[12px] w-[12px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </HomepageReveal>

          <Link
            href={ROUTES.workPortfolio}
            className={cn(
              'group inline-flex shrink-0 items-center gap-[4px] self-end no-underline',
              'font-sans text-[13px] font-semibold text-primary',
              'rounded-sm transition-opacity duration-200 hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            )}
          >
            View product portfolio
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className={cn(
                'h-[13px] w-[13px]',
                'transition-transform duration-[var(--duration-normal)]',
                'group-hover:translate-x-[3px]',
              )}
            />
          </Link>
        </div>

        <ul
          className={cn(
            'section-content-grid section-content-grid--dashboard m-0 grid list-none p-0',
            'grid-cols-1 lg:grid-cols-2',
          )}
        >
          <li className="min-w-0">
            <HomepageReveal name="dashboard" delayMs={80} className="h-full">
              <article className="dashboard-featured-card h-full">
                <div className="dashboard-featured-media dashboard-featured-media--dashboard relative">
                  <span className="dashboard-saas-badge">Featured Project</span>
                  <div className="dashboard-panel">
                    <HeroDashboard decorative={false} showBrowserChrome />
                  </div>
                </div>
                <div className="dashboard-saas-body">
                  <h3 className="m-0 font-sans text-[18px] font-bold tracking-[-0.015em] text-foreground">
                    Revenue Analytics Dashboard
                  </h3>
                  <p className="mb-0 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                    Live revenue overview with growth trends, project pipeline, lead volume, and
                    success metrics — built for founder demos and product walkthroughs.
                  </p>
                  <ul className="m-0 flex list-none flex-wrap p-0" aria-label="Tech stack">
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
                <div className="dashboard-featured-media relative">
                  <Image
                    src={bitcraftlyProductImage('Next-Gen SaaS Platform.png')}
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
                  <p className="mb-0 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                    Full-stack startup frontend with authentication flows, billing-ready UI,
                    analytics dashboards, and scalable component architecture.
                  </p>
                  <ul className="m-0 flex list-none flex-wrap p-0" aria-label="Tech stack">
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
