import Link from 'next/link';
import { MarketingIllustratedHero } from '@/components/patterns/hero-compositions';
import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { buildBreadcrumbs } from '@/lib/seo/breadcrumbs';
import {
  EVENT_FORMATS,
  EVENT_ITEMS,
  EVENTS_CTA,
  EVENTS_HERO,
  type EventStatus,
} from './events.content';
import { EventsHeroVisual } from './EventsHeroVisual';

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

function statusLabel(status: EventStatus): string {
  if (status === 'upcoming') return 'Upcoming';
  if (status === 'on-demand') return 'On-demand';
  return 'Past';
}

/**
 * Events landing — sessions, formats, and speaking CTA.
 */
export function EventsLandingPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: 'Home', href: ROUTES.home },
    { label: 'Resources', href: ROUTES.resources },
    { label: 'Events' },
  ]);

  const upcoming = EVENT_ITEMS.filter((item) => item.status !== 'past');
  const past = EVENT_ITEMS.filter((item) => item.status === 'past');

  return (
    <PageShell className="events-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId={EVENTS_HERO.headingId}
        eyebrow={EVENTS_HERO.eyebrow}
        eyebrowIcon="calendar"
        title={EVENTS_HERO.title}
        titleHighlight={EVENTS_HERO.titleHighlight}
        description={EVENTS_HERO.description}
        supporting={EVENTS_HERO.supporting}
        primaryCta={EVENTS_HERO.primaryCta}
        secondaryCta={EVENTS_HERO.secondaryCta}
        trustItems={[...EVENTS_HERO.trustItems]}
        renderVisual={() => <EventsHeroVisual />}
      />

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby="event-formats-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Formats"
          headingId="event-formats-heading"
          title="How we show up"
          description="Short, practical sessions — demos and decisions, not hour-long decks."
        />
        <ul className="mt-[24px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-3">
          {EVENT_FORMATS.map((format) => (
            <li
              key={format.id}
              className="rounded-[16px] border border-border bg-background p-[18px]"
            >
              <span
                className="inline-flex size-[36px] items-center justify-center rounded-[10px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary"
                aria-hidden
              >
                <Icon name={format.icon} size="sm" />
              </span>
              <h3 className="m-0 mt-[12px] font-sans text-[17px] font-semibold text-foreground">
                {format.title}
              </h3>
              <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
                {format.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="upcoming-events-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Calendar"
          headingId="upcoming-events-heading"
          title="Upcoming & on-demand"
          description="Reserve a seat or request a recording — we confirm every invite by email."
        />
        <ul className="mt-[24px] m-0 grid list-none gap-[14px] p-0">
          {upcoming.map((event) => (
            <li key={event.id}>
              <article className="rounded-[16px] border border-border bg-background p-[18px] sm:p-[22px]">
                <div className="flex flex-wrap items-start justify-between gap-[12px]">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-[8px]">
                      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
                        {event.format}
                      </p>
                      <span className="rounded-full border border-border px-[8px] py-[2px] font-sans text-[11px] font-semibold text-muted-foreground">
                        {statusLabel(event.status)}
                      </span>
                    </div>
                    <h3 className="m-0 mt-[8px] font-sans text-[20px] font-semibold tracking-[-0.02em] text-foreground">
                      {event.title}
                    </h3>
                    <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.65] text-muted-foreground">
                      {event.summary}
                    </p>
                    <p className="m-0 mt-[10px] font-sans text-[13px] font-medium text-foreground">
                      {event.dateLabel}
                    </p>
                    <ul className="m-0 mt-[12px] flex list-none flex-wrap gap-[8px] p-0">
                      {event.topics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-full bg-surface px-[10px] py-[4px] font-sans text-[12px] text-muted-foreground"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {event.href ? (
                    <Link
                      href={event.href}
                      className={cn(
                        'inline-flex min-h-[44px] items-center justify-center gap-[8px] rounded-[12px] px-[16px]',
                        'bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline',
                        'hover:bg-primary/90',
                        focusRing,
                      )}
                    >
                      {event.ctaLabel ?? 'Learn more'}
                      <Icon
                        name="arrow-right"
                        size="sm"
                        aria-hidden
                        className="h-[14px] w-[14px]"
                      />
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {past.length > 0 ? (
        <Section spacing="lg" background="surface" aria-labelledby="past-events-heading">
          <MarketingSectionIntro
            eyebrow="Archive"
            headingId="past-events-heading"
            title="Recent sessions"
            description="Highlights and follow-up reading from completed events."
          />
          <ul className="mt-[24px] m-0 grid list-none gap-[12px] p-0 md:grid-cols-2">
            {past.map((event) => (
              <li key={event.id}>
                <article className="h-full rounded-[16px] border border-border bg-background p-[18px]">
                  <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
                    {event.format}
                  </p>
                  <h3 className="m-0 mt-[8px] font-sans text-[17px] font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
                    {event.summary}
                  </p>
                  {event.href ? (
                    <Link
                      href={event.href}
                      className={cn(
                        'mt-[14px] inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline',
                        'hover:opacity-80',
                        focusRing,
                      )}
                    >
                      {event.ctaLabel ?? 'View'}
                      <Icon
                        name="arrow-right"
                        size="sm"
                        aria-hidden
                        className="h-[13px] w-[13px]"
                      />
                    </Link>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <MarketingFinalCtaBand
        headingId="events-cta-heading"
        heading={EVENTS_CTA.heading}
        description={EVENTS_CTA.description}
        primaryCta={EVENTS_CTA.primaryCta}
        tertiaryCta={EVENTS_CTA.tertiaryCta}
        trust={[...EVENTS_CTA.trust]}
      />
    </PageShell>
  );
}
