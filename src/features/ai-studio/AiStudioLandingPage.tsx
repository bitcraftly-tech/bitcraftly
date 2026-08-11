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
  AI_STUDIO_CTA,
  AI_STUDIO_HERO,
  AI_STUDIO_MODULES,
  AI_STUDIO_STEPS,
} from './ai-studio.content';
import { AiStudioHeroVisual } from './AiStudioHeroVisual';

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

/**
 * AI Studio marketing hub — soft link to the separate Studio product app.
 */
export function AiStudioLandingPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: 'Home', href: ROUTES.home },
    { label: 'AI Studio' },
  ]);

  return (
    <PageShell className="ai-studio-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId={AI_STUDIO_HERO.headingId}
        eyebrow={AI_STUDIO_HERO.eyebrow}
        eyebrowIcon="sparkles"
        title={AI_STUDIO_HERO.title}
        titleHighlight={AI_STUDIO_HERO.titleHighlight}
        description={AI_STUDIO_HERO.description}
        supporting={AI_STUDIO_HERO.supporting}
        primaryCta={AI_STUDIO_HERO.primaryCta}
        secondaryCta={AI_STUDIO_HERO.secondaryCta}
        trustItems={[...AI_STUDIO_HERO.trustItems]}
        renderVisual={() => <AiStudioHeroVisual />}
      />

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby="ai-studio-modules-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Modules"
          headingId="ai-studio-modules-heading"
          title="What you can open in Studio"
          description="Studio is a separate app. This page routes you there — or to the on-site assistant for Q&A."
        />
        <ul className="mt-[24px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-2 xl:grid-cols-3">
          {AI_STUDIO_MODULES.map((module) => {
            const external = isExternalHref(module.href);
            return (
              <li key={module.id}>
                <article className="flex h-full flex-col rounded-[16px] border border-border bg-background p-[18px]">
                  <span
                    className="inline-flex size-[36px] items-center justify-center rounded-[10px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary"
                    aria-hidden
                  >
                    <Icon name={module.icon} size="sm" />
                  </span>
                  <h3 className="m-0 mt-[12px] font-sans text-[17px] font-semibold text-foreground">
                    {module.title}
                  </h3>
                  <p className="m-0 mt-[8px] flex-1 font-sans text-[14px] leading-[1.6] text-muted-foreground">
                    {module.description}
                  </p>
                  <Link
                    href={module.href}
                    className={cn(
                      'mt-[14px] inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline',
                      'hover:opacity-80',
                      focusRing,
                    )}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {external ? 'Open in Studio' : 'Open assistant'}
                    <Icon
                      name={external ? 'arrow-up-right' : 'arrow-right'}
                      size="sm"
                      aria-hidden
                      className="h-[13px] w-[13px]"
                    />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby="ai-studio-steps-heading"
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="How it works"
          headingId="ai-studio-steps-heading"
          title="Three steps to create"
          description="Keep the marketing site light — heavy generation stays in the Studio app."
        />
        <ol className="mt-[24px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-3">
          {AI_STUDIO_STEPS.map((step) => (
            <li
              key={step.id}
              className="rounded-[16px] border border-border bg-background p-[18px]"
            >
              <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
                Step {step.id}
              </p>
              <h3 className="m-0 mt-[8px] font-sans text-[17px] font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <MarketingFinalCtaBand
        headingId="ai-studio-cta-heading"
        heading={AI_STUDIO_CTA.heading}
        description={AI_STUDIO_CTA.description}
        primaryCta={AI_STUDIO_CTA.primaryCta}
        tertiaryCta={AI_STUDIO_CTA.tertiaryCta}
        trust={[...AI_STUDIO_CTA.trust]}
      />
    </PageShell>
  );
}
