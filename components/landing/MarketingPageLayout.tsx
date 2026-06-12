import type { ReactNode } from "react";

import Footer from "@/components/landing/Footer";
import HashScrollOnMount from "@/components/landing/HashScrollOnMount";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
};

export default function MarketingPageLayout({ children }: MarketingPageLayoutProps) {
  return (
    <main className="min-h-screen bg-bg-primary pb-20 text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary md:pb-0">
      <HashScrollOnMount />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
