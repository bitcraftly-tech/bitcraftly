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
  PRESS_ANGLES,
  PRESS_ASSETS,
  PRESS_BOILERPLATE,
  PRESS_CTA,
  PRESS_FACTS,
  PRESS_HERO,
} from './press.content';
import { PressHeroVisual } from './PressHeroVisual';

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

/**
 * Press landing — boilerplate, facts, assets, and story angles.
 */
export function PressLandingPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: 'Home', href: ROUTES.home },
    { label: 'Resources', href: ROUTES.resources },
    { label: 'Press' },
  ]);

  return (
    <PageShell className="press-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId={PRESS_HERO.headingId}
        eyebrow={PRESS_HERO.eyebrow}
        eyebrowIcon="trending-up"
        title={PRESS_HERO.title}
        titleHighlight={PRESS_HERO.titleHighlight}
        description={PRESS_HERO.description}
        supporting={PRESS_HERO.supporting}
        primaryCta={PRESS_HERO.primaryCta}
        secondaryCta={PRESS_HERO.secondaryCta}
        trustItems={[...PRESS_HERO.trustItems]}
        renderVisual={() => <PressHeroVisual />}
      />

      <Section
        spacing="lg"
        aria-labelledby="press-boilerplate-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow={PRESS_BOILERPLATE.eyebrow}
          headingId="press-boilerplate-heading"
          title={PRESS_BOILERPLATE.title}
          description="Short copy you can reuse in articles and partner announcements."
        />
        <div className="mt-[24px] max-w-3xl space-y-[14px]">
          {PRESS_BOILERPLATE.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="m-0 font-sans text-[15px] leading-[1.7] text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby="press-facts-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Fact sheet"
          headingId="press-facts-heading"
          title="Company facts"
          description="Quick reference for editors and researchers."
        />
        <dl className="mt-[24px] m-0 grid list-none grid-cols-1 gap-[12px] p-0 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="rounded-[16px] border border-border bg-background p-[16px]"
            >
              <dt className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="m-0 mt-[8px] font-sans text-[15px] font-semibold text-foreground">
                {fact.value.includes('@') ? (
                  <a
                    href={`mailto:${fact.value}`}
                    className={cn('text-primary no-underline hover:underline', focusRing)}
                  >
                    {fact.value}
                  </a>
                ) : fact.value.startsWith('+') ? (
                  <a
                    href={`tel:${fact.value.replace(/\s+/g, '')}`}
                    className={cn('text-foreground no-underline hover:text-primary', focusRing)}
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="press-assets-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Assets"
          headingId="press-assets-heading"
          title="Brand & story assets"
          description="Logos, share imagery, and deep links for due diligence."
        />
        <ul className="mt-[24px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-2">
          {PRESS_ASSETS.map((asset) => (
            <li key={asset.id}>
              <article className="flex h-full flex-col rounded-[16px] border border-border bg-background p-[18px]">
                <h3 className="m-0 font-sans text-[17px] font-semibold text-foreground">
                  {asset.title}
                </h3>
                <p className="m-0 mt-[8px] flex-1 font-sans text-[14px] leading-[1.6] text-muted-foreground">
                  {asset.description}
                </p>
                <Link
                  href={asset.href}
                  className={cn(
                    'mt-[14px] inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline',
                    'hover:opacity-80',
                    focusRing,
                  )}
                  {...(asset.href.startsWith('/')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {asset.ctaLabel}
                  <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="lg" background="surface" aria-labelledby="press-angles-heading">
        <MarketingSectionIntro
          eyebrow="Story angles"
          headingId="press-angles-heading"
          title="Coverage ideas"
          description="Suggested narratives if you are writing about digital systems or AI for SMBs."
        />
        <ul className="mt-[24px] m-0 grid list-none gap-[12px] p-0 md:grid-cols-3">
          {PRESS_ANGLES.map((angle) => (
            <li
              key={angle.id}
              className="rounded-[16px] border border-border bg-background p-[18px]"
            >
              <h3 className="m-0 font-sans text-[16px] font-semibold text-foreground">
                {angle.title}
              </h3>
              <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
                {angle.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <MarketingFinalCtaBand
        headingId="press-cta-heading"
        heading={PRESS_CTA.heading}
        description={PRESS_CTA.description}
        primaryCta={PRESS_CTA.primaryCta}
        tertiaryCta={PRESS_CTA.tertiaryCta}
        trust={[...PRESS_CTA.trust]}
      />
    </PageShell>
  );
}
