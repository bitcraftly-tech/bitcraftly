import type { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { createAuthOptions } from "@/auth";
import DeferredMarketingScroll from "@/components/landing/DeferredMarketingScroll";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
  sectionId?: string;
  variant?: "default" | "landing";
};

export default async function MarketingPageLayout({ children, sectionId, variant = "default" }: MarketingPageLayoutProps) {
  const session = await getServerSession(createAuthOptions());
  const isLanding = variant === "landing";

  return (
    <main
      className={
        isLanding
          ? "min-h-screen bg-white text-[#1e293b]"
          : "min-h-screen bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary"
      }
    >
      <DeferredMarketingScroll sectionId={sectionId} />
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
