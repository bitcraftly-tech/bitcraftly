/**
 * Marketing site chrome — every route under (marketing) inherits:
 * Header · main · Newsletter · Footer · Ask AI · Lead funnel widgets
 *
 * Client chrome is loaded via thin loader components so Ask AI, lead funnel,
 * newsletter, and deferred CSS are not in the synchronous layout bundle.
 */
import {
  MarketingLayoutClientHeadLoader,
  MarketingLayoutClientMidLoader,
  MarketingLayoutClientTailLoader,
} from '@/lib/layout/MarketingLayoutClientLoaders';
import { FooterSection } from '@/features/homepage/Footer';
import { HeaderSection } from '@/features/homepage/Header';
import '@/lib/layout/marketing-chrome.css';
import '@/features/homepage/Footer/footer.css';
import '@/features/homepage/Newsletter/newsletter.css';
import '@/features/homepage/Homepage/homepage-polish.css';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingLayoutClientHeadLoader />
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[calc(var(--z-sticky)+20)] rounded-[var(--token-radius-md)] bg-background px-[var(--space-2)] py-[var(--space-1)] font-sans text-[14px] font-semibold text-foreground shadow-[var(--token-shadow-md)] outline-none ring-primary focus:left-[var(--space-2)] focus:top-[var(--space-2)] focus:ring-2"
      >
        Skip to main content
      </a>
      <HeaderSection />
      <main id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
        {children}
      </main>
      {/* Stay Ahead with AI — between page content and footer */}
      <MarketingLayoutClientMidLoader />
      <FooterSection />
      <MarketingLayoutClientTailLoader />
    </>
  );
}
