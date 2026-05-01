import type { Metadata } from "next";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";

import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Bitcraftly",
  description: "Talk to Bitcraftly for demos, onboarding help, and growth-focused digital systems for local businesses.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border-primary bg-bg-card py-3 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            Home <span className="px-2">/</span> Contact
          </div>
        </section>
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
