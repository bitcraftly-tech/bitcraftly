import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import CareersContent from "./CareersContent";

export const metadata = buildPageMetadata("careers");

export default function CareersPage() {
  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </Link>
            <span className="px-2">/</span> Careers
          </div>
        </section>
        <CareersContent />
      </main>
      <SiteFooter />
    </div>
  );
}
