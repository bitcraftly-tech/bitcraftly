import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seoMetadata";

import ContactContent from "./ContactContent";

export const metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-[#E5E7EB] bg-white py-2">
          <div className={`${CONTAINER} text-xs text-[#9CA3AF]`}>
            <Link href="/" className="hover:text-[#6B7280] hover:underline">
              Home
            </Link>
            <span className="px-2">/</span> Contact
          </div>
        </section>
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
