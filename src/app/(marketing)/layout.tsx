/**
 * Marketing site chrome — every route under (marketing) inherits:
 * Header · main · Newsletter · Footer · Ask AI · Lead funnel widgets
 *
 * Non-critical client chrome is code-split / idle-deferred to protect LCP + TBT.
 * Footer + widget CSS load post-paint via MarketingDeferredCss.
 */
import { ClearHashOnPageNavigate } from "@/components/patterns/clear-hash-on-page-navigate";
import { DeferredNewsletter } from "@/components/patterns/deferred-newsletter";
import { MarketingClientChrome } from "@/components/patterns/marketing-client-chrome";
import { FooterSection } from "@/features/homepage/Footer";
import { HeaderSection } from "@/features/homepage/Header";
import { MarketingDeferredCss } from "@/lib/layout/MarketingDeferredCss";
import "@/lib/layout/marketing-chrome.css";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingDeferredCss />
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[calc(var(--z-sticky)+20)] rounded-[var(--token-radius-md)] bg-background px-[var(--space-2)] py-[var(--space-1)] font-sans text-[14px] font-semibold text-foreground shadow-[var(--token-shadow-md)] outline-none ring-primary focus:left-[var(--space-2)] focus:top-[var(--space-2)] focus:ring-2"
      >
        Skip to main content
      </a>
      <ClearHashOnPageNavigate />
      <HeaderSection />
      <main id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
        {children}
      </main>
      <DeferredNewsletter />
      <FooterSection />
      <MarketingClientChrome />
    </>
  );
}
