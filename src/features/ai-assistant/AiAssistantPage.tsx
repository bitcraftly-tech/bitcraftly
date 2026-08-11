import { MarketingIllustratedHero } from '@/components/patterns/hero-compositions';
import { MarketingFinalCtaBand } from '@/components/patterns/marketing-final-cta-band';
import { PageShell } from '@/components/patterns/marketing-layout';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { buildBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { ASSISTANT_CTA, ASSISTANT_HERO, ASSISTANT_META } from './assistant.config';
import { AssistantHeroVisual } from './AssistantHeroVisual';
import { AssistantChat } from './components/AssistantChat';
import './ai-assistant.css';

/**
 * AI Assistant marketing page — hero + premium chat + conversion CTA.
 */
export function AiAssistantPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: 'Home', href: ROUTES.home },
    { label: 'AI Assistant' },
  ]);

  return (
    <PageShell className="ai-assistant-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="ai-assistant-heading"
        eyebrow={ASSISTANT_HERO.eyebrow}
        eyebrowIcon="bot"
        title={ASSISTANT_HERO.title}
        titleHighlight={ASSISTANT_HERO.titleHighlight}
        description={ASSISTANT_HERO.description}
        supporting={ASSISTANT_HERO.supporting}
        primaryCta={ASSISTANT_HERO.primaryCta}
        secondaryCta={ASSISTANT_HERO.secondaryCta}
        trustItems={[...ASSISTANT_HERO.trustItems]}
        renderVisual={() => <AssistantHeroVisual />}
      />

      <Section
        id="assistant-chat"
        spacing="lg"
        aria-labelledby="assistant-chat-heading"
        className="ai-assistant-page__chat-section border-b border-border/40 scroll-mt-[100px]"
      >
        <div className="ai-assistant-page__chat-inner">
          <header className="ai-assistant-page__chat-header">
            <p className="ai-assistant-page__chat-eyebrow">Live demo</p>
            <h2 id="assistant-chat-heading" className="ai-assistant-page__chat-title">
              Ask a question — get a clear next step
            </h2>
            <p className="ai-assistant-page__chat-desc">
              Get answers for common pricing and service questions, or book a call when you want a
              scoped plan from the team.
            </p>
          </header>

          <AssistantChat />
        </div>
      </Section>

      <MarketingFinalCtaBand
        headingId="assistant-cta-heading"
        heading={ASSISTANT_CTA.heading}
        description={ASSISTANT_CTA.description}
        primaryCta={ASSISTANT_CTA.primaryCta}
        tertiaryCta={ASSISTANT_CTA.tertiaryCta}
        trust={[...ASSISTANT_CTA.trust]}
      />
    </PageShell>
  );
}

export const AI_ASSISTANT_PAGE_META = {
  title: ASSISTANT_META.title,
  description: ASSISTANT_META.description,
  path: ROUTES.assistant,
} as const;
