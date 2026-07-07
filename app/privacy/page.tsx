import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import PrivacyContent from "./PrivacyContent";

export const metadata = buildPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <PrivacyContent />
      </main>
      <SiteFooter />
    </div>
  );
}
