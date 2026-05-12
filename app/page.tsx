import type { Metadata } from "next";

import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Bitcraftly | Website & App Development Company in Jamshedpur",
  description:
    "Professional website and app development in Jamshedpur and across India — business sites, ecommerce website development, mobile apps, SEO, and affordable website design services.",
  keywords: [
    "Website Development Company in Jamshedpur",
    "App Development Company in Jamshedpur",
    "Ecommerce Website Development",
    "Affordable Website Design Services",
  ],
};

export default function HomePage() {
  return <LandingPage />;
}
