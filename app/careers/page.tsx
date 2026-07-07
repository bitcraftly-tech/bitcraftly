import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import CareersContent from "./CareersContent";

export const metadata = buildPageMetadata("careers");

export default function CareersPage() {
  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
        <CareersContent />
      </main>
      <SiteFooter />
    </div>
  );
}
