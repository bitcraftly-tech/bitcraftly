import type { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { createAuthOptions } from "@/auth";
import DeferredMarketingScroll from "@/components/landing/DeferredMarketingScroll";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
  sectionId?: string;
};

export default async function MarketingPageLayout({ children, sectionId }: MarketingPageLayoutProps) {
  const session = await getServerSession(createAuthOptions());

  return (
    <main className="min-h-screen overflow-x-clip bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <DeferredMarketingScroll sectionId={sectionId} />
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
