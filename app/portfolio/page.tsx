import type { Metadata } from "next";
import ShowcaseLink from "@/components/portfolio/ShowcaseLink";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";

import PortfolioContent from "./PortfolioContent";
import PortfolioHashRedirect from "./PortfolioHashRedirect";

export const metadata: Metadata = {
  title: "Portfolio | React, Next.js & AI Web Projects | Bitcraftly",
  description:
    "Live client work and interactive demos — business websites, startups, ecommerce, and AI-powered experiences built for leads, SEO, and mobile.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PortfolioHashRedirect />
        <section className="border-b border-[#e8ecef] bg-white py-1.5">
          <div className={`${CONTAINER} text-xs text-[#95a5a6]`}>
            <ShowcaseLink href="/" className="hover:text-[#7f8c8d] hover:underline">
              Home
            </ShowcaseLink>
            <span className="px-2">/</span> Portfolio
          </div>
        </section>
        <PortfolioContent />
      </main>
      <Footer />
    </div>
  );
}
