import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import PrivacyContent from "./PrivacyContent";

export const metadata = buildPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </Link>
            <span className="px-2">/</span> Privacy Policy
          </div>
        </section>
        <PrivacyContent />
      </main>
      <Footer />
    </div>
  );
}
