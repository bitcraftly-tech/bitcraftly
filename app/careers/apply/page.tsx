import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import CareersApplyWizard from "@/components/careers/CareersApplyWizard";
import { CONTAINER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Apply | Careers | Bitcraftly",
  description: "Submit your resume and portfolio to Bitcraftly — founder-led studio hiring for React, Next.js, and product roles.",
};

export default function CareersApplyPage() {
  return (
    <div className="portfolio-showcase-light flex min-h-screen flex-col bg-[#fafbfc] text-[#2c3e50]">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-[#E5E7EB] bg-white py-2 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-[#9CA3AF]`}>
            <Link href="/" className="hover:text-[#6B7280] hover:underline">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/careers" className="hover:text-[#6B7280] hover:underline">
              Careers
            </Link>
            <span className="px-2">/</span> Apply
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-14">
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
      <Footer />
    </div>
  );
}
