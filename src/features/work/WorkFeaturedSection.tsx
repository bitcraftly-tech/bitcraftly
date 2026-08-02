import Link from 'next/link';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { WORK_LANDING_SECTIONS } from './work.content';
import './work.css';

const FEATURED_META = WORK_LANDING_SECTIONS.find((item) => item.id === 'featured-projects');

const OPTIMIZE_ITEMS = [
  {
    id: '01',
    title: 'Thumb-first',
    label: 'Mobile UX',
    description: 'Layouts tested for small screens first.',
    icon: 'smartphone' as const,
  },
  {
    id: '02',
    title: 'WhatsApp-ready',
    label: 'Lead paths',
    description: 'Enquiry CTAs above scroll fatigue.',
    icon: 'message' as const,
  },
  {
    id: '03',
    title: 'Crawlable',
    label: 'SEO structure',
    description: 'Titles, hierarchy, local discovery basics.',
    icon: 'search' as const,
  },
  {
    id: '04',
    title: 'React / Next',
    label: 'Stack',
    description: 'Maintainable frontends, not locked templates.',
    icon: 'code' as const,
  },
] as const;

/**
 * Portfolio catalog intro — Services-style left intro + right CTA.
 */
export function WorkFeaturedSection() {
  return (
    <Section
      id="featured-projects"
      spacing="lg"
      background="surface"
      aria-labelledby="work-featured-heading"
      className="work-featured border-b border-border/40"
    >
      <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow="Featured Work"
          headingId="work-featured-heading"
          title={FEATURED_META?.title ?? 'Our Portfolio'}
          description={
            FEATURED_META?.description ??
            'A showcase of modern, fast, and AI-powered digital solutions built with React.js, Next.js & cutting-edge technologies.'
          }
        />
        <Link
          href={ROUTES.services}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Explore services
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>

      <div className="work-pf-proof">
        <div className="work-pf-proof__panel">
          <aside className="work-pf-proof__stat" aria-label="Delivery experience">
            <p className="work-pf-proof__stat-value">20+</p>
            <div className="work-pf-proof__stat-copy">
              <h3 className="work-pf-proof__title">Years of Experience</h3>
              <p className="work-pf-proof__text">
                High-quality solutions that drive real business results.
              </p>
            </div>
          </aside>

          <div className="work-pf-proof__optimize">
            <p className="work-pf-proof__optimize-label">What we optimize</p>
            <ul className="work-pf-proof__grid" aria-label="Delivery principles">
              {OPTIMIZE_ITEMS.map((item) => (
                <li key={item.id} className="work-pf-proof__item">
                  <div className="work-pf-proof__item-head">
                    <span className="work-pf-proof__item-icon" aria-hidden>
                      <Icon name={item.icon} size="sm" className="h-[16px] w-[16px]" />
                    </span>
                    <h3 className="work-pf-proof__item-title">{item.title}</h3>
                  </div>
                  <p className="work-pf-proof__item-kicker">{item.label}</p>
                  <p className="work-pf-proof__item-text">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
