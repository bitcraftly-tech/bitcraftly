import type { ReactNode } from "react";

import Footer from "@/components/landing/Footer";
import HashScrollOnMount from "@/components/landing/HashScrollOnMount";
import Navbar from "@/components/landing/Navbar";

type MarketingPageLayoutProps = {
  children: ReactNode;
};

export default function MarketingPageLayout({ children }: MarketingPageLayoutProps) {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <HashScrollOnMount />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
