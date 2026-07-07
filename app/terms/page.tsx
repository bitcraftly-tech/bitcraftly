import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import TermsContent from "./TermsContent";

export const metadata = buildPageMetadata("terms");

export default function TermsPage() {
  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
        <TermsContent />
      </main>
      <SiteFooter />
    </div>
  );
}
