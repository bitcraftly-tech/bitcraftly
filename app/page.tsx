import type { Metadata } from "next";

import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Bitcraftly | React & Next.js Website Development | Ghaziabad & India",
  description:
    "Founder-led AI-powered frontend studio — React.js, Next.js websites, redesigns, and business solutions for startups, clinics, gyms, and local brands. Based in Ghaziabad, serving India & remote clients.",
  keywords: [
    "React.js Development India",
    "Next.js Website Development",
    "Website Development Ghaziabad",
    "Frontend Architect India",
    "AI-Powered Website Solutions",
    "Business Website Development",
    "Website Redesign Services",
  ],
};

export default function HomePage() {
  return <LandingPage />;
}
