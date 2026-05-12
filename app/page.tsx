import type { Metadata } from "next";

import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Bitcraftly | Website & App Development Company in Jamshedpur",
  description:
    "Website & app development company in Jamshedpur and across India — business sites, ecommerce, mobile apps, AI-powered business solutions, SEO, and affordable website design.",
  keywords: [
    "Website Development Company in Jamshedpur",
    "App Development Company in Jamshedpur",
    "Ecommerce Website Development",
    "Affordable Website Design Services",
    "AI Solutions Company in Jamshedpur",
    "AI-powered Business Solutions",
  ],
};

export default function HomePage() {
  return <LandingPage />;
}
