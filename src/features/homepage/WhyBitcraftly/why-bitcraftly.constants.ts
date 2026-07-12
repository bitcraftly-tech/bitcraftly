import { ROUTES } from "@/constants/navigation";
import type { WhyBitcraftlyCard, WhyBitcraftlyCta } from "./why-bitcraftly.types";

export const WHY_SECTION_ID = "why-bitcraftly";
export const WHY_HEADING_ID = "why-bitcraftly-heading";

export const WHY_LABEL = "Why choose us";

export const WHY_HEADING =
  "Built for owners & founders who want results, not jargon";

export const WHY_DESCRIPTION_LINE_1 =
  "Local business ho ya India-wide startup — communication simple, timelines realistic,";

export const WHY_DESCRIPTION_LINE_2 =
  "aur code maintainable jo aage scale kar sake. Delhi NCR se delivery, clients poore India aur remote.";

export const WHY_DESCRIPTION = `${WHY_DESCRIPTION_LINE_1} ${WHY_DESCRIPTION_LINE_2}`;

/** Sourced from https://bitcraftly.com/about “Why choose us”. */
export const WHY_CARDS: readonly WhyBitcraftlyCard[] = [
  {
    id: "years-experience",
    title: "18+ Years · Frontend Architect",
    description:
      "Battle-tested delivery for startups, SMBs, and product teams — not experiment learning on your budget.",
    icon: "rocket",
  },
  {
    id: "founder-led",
    title: "Founder-Led, One Thread",
    description:
      "Sanjay owns architecture, build quality, and communication — no sales-to-junior handoff.",
    icon: "headset",
  },
  {
    id: "react-next-core",
    title: "Modern Stack · Enterprise Ready",
    description:
      "React.js and Next.js chosen for SEO, speed, and maintainability — explained in plain language.",
    icon: "code",
  },
  {
    id: "ai-with-purpose",
    title: "AI First · With Purpose",
    description:
      "Chat and automation only when they shorten the path to a lead or sale — always human-backed.",
    icon: "sparkles",
  },
  {
    id: "written-scope",
    title: "Performance Focused",
    description:
      "Fast loads, clear CTAs, and maintainable code — built for conversion, not vanity metrics.",
    icon: "check",
  },
  {
    id: "india-remote",
    title: "200+ Projects · India & Remote",
    description:
      "Delhi NCR–based, serving clients nationwide and internationally — English or Hinglish on calls.",
    icon: "globe",
  },
] as const;

export const WHY_PRIMARY_CTA: WhyBitcraftlyCta = {
  label: "Book Free Consultation",
  href: ROUTES.contact,
};
