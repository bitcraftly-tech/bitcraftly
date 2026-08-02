import Link from 'next/link';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { WORK_TECH_COPY, WORK_TECH_GROUPS } from './work.content';
import './work.css';

const DELIVERY_LAYERS: readonly {
  id: string;
  label: string;
  detail: string;
  icon: IconName;
}[] = [
  { id: 'edge', label: 'Edge', detail: 'CDN · TLS', icon: 'globe' },
  { id: 'app', label: 'App', detail: 'Next.js', icon: 'layout-grid' },
  { id: 'api', label: 'API', detail: 'REST · GraphQL', icon: 'code' },
  { id: 'data', label: 'Data', detail: 'PostgreSQL', icon: 'database' },
  { id: 'ai', label: 'AI', detail: 'Assist layer', icon: 'brain' },
] as const;

const PIPELINE_STEPS = ['Build', 'Test', 'Deploy', 'Observe'] as const;

/**
 * Technology Expertise — dense stack grid + compact delivery path.
 */
export function WorkTechSection() {
  return (
    <Section
      id="work-technology"
      spacing="lg"
      background="surface"
      aria-labelledby="work-tech-heading"
      className="work-tech border-b border-border/40"
    >
      <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow={WORK_TECH_COPY.eyebrow}
          headingId="work-tech-heading"
          title={WORK_TECH_COPY.heading}
          description={WORK_TECH_COPY.description}
        />
        <Link
          href={ROUTES.services}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Full Tech Stack
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>

      <div className="work-tech__layout">
        <ul className="work-tech__groups" aria-label="Technology groups">
          {WORK_TECH_GROUPS.map((group) => (
            <li key={group.id}>
              <article
                className={cn(
                  'work-tech__card',
                  'work-tech__glass',
                  `work-tech__card--${group.tone}`,
                )}
              >
                <div className="work-tech__card-head">
                  <span className="work-tech__icon" aria-hidden>
                    <Icon name={group.icon} size="sm" className="h-[16px] w-[16px]" />
                  </span>
                  <h3 className="work-tech__card-title">{group.category}</h3>
                </div>
                <ul className="work-tech__chips" aria-label={`${group.category} technologies`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <aside className="work-tech__rail" aria-label={WORK_TECH_COPY.architectureLabel}>
          <div className="work-tech__rail-head">
            <div className="work-tech__rail-copy">
              <p className="work-tech__rail-eyebrow">Delivery architecture</p>
              <p className="work-tech__rail-title">Edge to data — one resilient path</p>
            </div>
            <ol className="work-tech__pipeline" aria-label="Delivery pipeline">
              {PIPELINE_STEPS.map((step, index) => (
                <li key={step}>
                  <span className="work-tech__pipeline-index" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <ol className="work-tech__layers">
            {DELIVERY_LAYERS.map((layer, index) => (
              <li key={layer.id} className="work-tech__layer">
                <div className="work-tech__layer-top">
                  <div className="work-tech__layer-head">
                    <span className="work-tech__layer-icon" aria-hidden>
                      <Icon name={layer.icon} size="sm" className="h-[15px] w-[15px]" />
                    </span>
                    <span className="work-tech__layer-label">{layer.label}</span>
                  </div>
                  <span className="work-tech__layer-step" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="work-tech__layer-detail">{layer.detail}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </Section>
  );
}
