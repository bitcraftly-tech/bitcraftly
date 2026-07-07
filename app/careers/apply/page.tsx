import type { Metadata } from "next";
import { Suspense } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import CareersApplyWizard from "@/components/careers/CareersApplyWizard";
import { CONTAINER, MARKETING_BELOW_BREADCRUMB_PT, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Apply | Careers | Bitcraftly",
  description: "Submit your resume and portfolio to Bitcraftly — founder-led studio hiring for React, Next.js, and product roles.",
};

export default function CareersApplyPage() {
  return (
    <div className={`${PAGE_SHELL} portfolio-showcase-light bg-[#fafbfc] text-[#2c3e50]`}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
            { label: "Apply" },
          ]}
        />
        <section className={`pb-8 md:pb-12 lg:pb-14 ${MARKETING_BELOW_BREADCRUMB_PT}`}>
          <div className={`${CONTAINER} w-full`}>
            <Suspense
              fallback={
                <div className="h-96 w-full animate-pulse rounded-[20px] border border-[#e8ecef] bg-white" />
              }
            >
              <CareersApplyWizard />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
