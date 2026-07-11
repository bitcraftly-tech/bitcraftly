import type { Metadata } from "next";
import { HomepageShell } from "@/features/homepage";

export const metadata: Metadata = {
  title: "Bitcraftly | AI & Digital Engineering Partner",
  description:
    "Build scalable websites, AI solutions, SaaS products, dashboards, automation, and enterprise software.",
};

export default function HomePage() {
  return <HomepageShell />;
}
