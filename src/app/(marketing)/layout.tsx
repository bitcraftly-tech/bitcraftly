/**
 * Marketing site chrome — every route under (marketing) inherits:
 * Header · main · Newsletter · Footer · Ask AI
 * + global page-shell.css (container rhythm / section spacing)
 *
 * New pages: wrap content in PageShell + Section (or MarketingPageShell).
 * Do not invent per-page max-width or horizontal padding.
 */
import { ClearHashOnPageNavigate } from "@/components/patterns/clear-hash-on-page-navigate";
import { AskAiTab } from "@/features/homepage/AskAi";
import { FooterSection } from "@/features/homepage/Footer";
import { HeaderSection } from "@/features/homepage/Header";
import { NewsletterSection } from "@/features/homepage/Newsletter";
import "@/lib/layout/page-shell.css";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
      <NewsletterSection />
      <FooterSection />
      <AskAiTab />
    </>
  );
}
