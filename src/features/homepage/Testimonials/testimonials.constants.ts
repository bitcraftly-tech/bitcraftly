import { ROUTES } from "@/constants/navigation";
import { BITCRAFTLY_LEGACY_ORIGIN } from "../shared/contact-links";
import type { TestimonialItem, TestimonialsCta } from "./testimonials.types";

export const TESTIMONIALS_SECTION_ID = "testimonials";
export const TESTIMONIALS_HEADING_ID = "testimonials-heading";

export const TESTIMONIALS_LABEL = "Founder standards";

export const TESTIMONIALS_HEADING = "How Bitcraftly delivers for owners";

export const TESTIMONIALS_DESCRIPTION_LINE_1 =
  "Named client reviews publish as engagements complete. Until then,";

export const TESTIMONIALS_DESCRIPTION_LINE_2 =
  "here is the founder-led promise every Bitcraftly project starts with.";

export const TESTIMONIALS_DESCRIPTION = `${TESTIMONIALS_DESCRIPTION_LINE_1} ${TESTIMONIALS_DESCRIPTION_LINE_2}`;

/**
 * Founder-led delivery standards from https://bitcraftly.com/about.
 * Named client testimonials are added when published — not invented.
 */
export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    id: "founder-promise",
    quote:
      "Main believe karta hoon: website tabhi premium hai jab business ko result de — zyada trust, faster load, clear WhatsApp enquiries. Isliye Bitcraftly par aap seedha founder se baat karte ho, scope likha milta hai, aur delivery par junior handoff nahi.",
    name: "Sanjay Kr. Singh",
    role: "Founder · Frontend Architect",
    company: "Bitcraftly",
    rating: 0,
    initials: "SS",
    photoSrc: `${BITCRAFTLY_LEGACY_ORIGIN}/images/founder/sanjay-kr-singh.png`,
  },
  {
    id: "founder-led-delivery",
    quote:
      "I started Bitcraftly so you have one senior thread from first message to launch — the same discipline I use for scalable React and Next.js systems, applied to businesses that need trust, speed, and clarity.",
    name: "Sanjay Kr. Singh",
    role: "Tech Lead | Frontend Architect",
    company: "React.js, Next.js & AI-Powered Web Solutions",
    rating: 0,
    initials: "SS",
    photoSrc: `${BITCRAFTLY_LEGACY_ORIGIN}/images/founder/sanjay-kr-singh.png`,
  },
  {
    id: "written-scope",
    quote:
      "Written estimates and timelines before kickoff — no surprise invoices mid-project. React.js & Next.js chosen for SEO, speed, and code your next developer can extend.",
    name: "Bitcraftly Standard",
    role: "Delivery principle",
    company: "Founder-led studio · Delhi NCR",
    rating: 0,
    initials: "BC",
  },
  {
    id: "ai-with-purpose",
    quote:
      "AI-powered features only when they shorten the path to a lead — always human-backed on WhatsApp. Chat and automation where they save time — escalation to a real person when it matters.",
    name: "Bitcraftly Standard",
    role: "Responsible AI",
    company: "Practical AI · human handoff",
    rating: 0,
    initials: "AI",
  },
] as const;

export const TESTIMONIALS_CTA: TestimonialsCta = {
  label: "Meet the Founder",
  href: `${ROUTES.about}`,
};
