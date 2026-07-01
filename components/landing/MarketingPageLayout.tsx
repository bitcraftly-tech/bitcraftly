import type { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { createAuthOptions } from "@/auth";
import { resolvedNextAuthSecret } from "@/lib/googleAuthEnv";
import DeferredMarketingScroll from "@/components/landing/DeferredMarketingScroll";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
  sectionId?: string;
};

export default async function MarketingPageLayout({ children, sectionId }: MarketingPageLayoutProps) {
  // Only call getServerSession when a secret is configured — calling it with secret:undefined
  // throws MissingSecretError in next-auth and crashes the entire page (even the homepage).
  const session = resolvedNextAuthSecret() ? await getServerSession(createAuthOptions()) : null;

  return (
    <main className="overflow-x-clip bg-bg-primary text-text-primary md:min-h-screen dark:bg-dark-bg-primary dark:text-dark-text-primary">
      {/* <DeferredMarketingScroll sectionId={sectionId} /> */}
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
