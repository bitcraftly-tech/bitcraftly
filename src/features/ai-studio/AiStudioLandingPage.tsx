import { PageShell } from '@/components/patterns/marketing-layout';
import { studioDisplayFont } from './ai-studio.fonts';
import { AiStudioHero } from './AiStudioHero';
import { AiStudioModules } from './AiStudioModules';

/**
 * AI Studio marketing hub — mirrors the standalone Studio landing (hero + modules).
 * Site header and footer stay the shared marketing ones.
 */
export function AiStudioLandingPage() {
  return (
    <PageShell className={`ai-studio-page ${studioDisplayFont.variable}`}>
      <AiStudioHero />
      <AiStudioModules />
    </PageShell>
  );
}
