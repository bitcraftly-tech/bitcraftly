import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";import { buildPageMetadata } from "@/lib/seoMetadata";

import ContactContent from "./ContactContent";

export const metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <div className={`${PAGE_SHELL} bg-bg-primary`}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />        <ContactContent />
      </main>
      <SiteFooter />
    </div>
  );
}
