import type { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { createAuthOptions } from "@/auth";
import MarketingBreadcrumb, { type MarketingBreadcrumbItem } from "@/components/landing/MarketingBreadcrumb";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { resolvedNextAuthSecret } from "@/lib/googleAuthEnv";
import SiteFooter from "@/components/layout/SiteFooter";
import "@/components/landing/marketing-hero.css";
import DeferredMarketingScroll from "@/components/landing/DeferredMarketingScroll";
import MarketingScrollMain from "@/components/landing/MarketingScrollMain";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
  sectionId?: string;
  breadcrumb?: readonly MarketingBreadcrumbItem[];
  /** Hide footer CTA when the page already ends with a dedicated conversion section (e.g. homepage FinalCTA). */
  showFooterCta?: boolean;
};

export default async function MarketingPageLayout({
  children,
  sectionId,
  breadcrumb,
  showFooterCta = true,
}: MarketingPageLayoutProps) {
  // Only call getServerSession when a secret is configured — calling it with secret:undefined
  // throws MissingSecretError in next-auth and crashes the entire page (even the homepage).
  const session = resolvedNextAuthSecret() ? await getServerSession(createAuthOptions()) : null;

  return (
    <div className={PAGE_SHELL}>
      <DeferredMarketingScroll sectionId={sectionId} />
      <Navbar session={session} />
      <main className={PAGE_MAIN}>
        {breadcrumb?.length ? <MarketingBreadcrumb items={breadcrumb} /> : null}
        <MarketingScrollMain>{children}</MarketingScrollMain>
      </main>
      <SiteFooter showCta={showFooterCta} />
    </div>
  );
}
