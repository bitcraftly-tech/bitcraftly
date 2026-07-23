import { BITCRAFTLY_LEGACY_ORIGIN } from "@/features/homepage/shared/contact-links";
import { ROUTES } from "@/constants/navigation";

export const TRUST_VISION_PDF_HREF = `${BITCRAFTLY_LEGACY_ORIGIN}/documents/public/BDS-FND-001_Bitcraftly_Vision_Mission_Purpose_Values_v1.0.pdf`;

export interface TrustStandard {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly description: string;
  readonly status: "approved" | "preparation";
  readonly href?: string;
  readonly ctaLabel?: string;
}

export interface TrustArea {
  readonly id: string;
  readonly title: string;
  readonly standards: readonly TrustStandard[];
}

/** Page copy mirrored from https://bitcraftly.com/trust */
export const TRUST_LANDING = {
  eyebrow: "Trust Center",
  title: "How Bitcraftly operates with transparency",
  titleHighlight: "transparency",
  description:
    "Public summaries of our standards and policies. Internal operational documents remain available only to authorized team members through the dashboard document library.",
  primaryCta: {
    label: "View standards",
    href: "#trust-standards",
  },
  secondaryCta: {
    label: "Download vision PDF",
    href: TRUST_VISION_PDF_HREF,
  },
  standardsEyebrow: "Documented standards",
  standardsTitle: "Governed areas with public summaries where approved",
  standardsDescription:
    "Full operational library stays behind authenticated dashboard access.",
  accessTitle: "Team member access",
  accessDescription:
    "Internal BDS documents, previews, and downloads are available in the dashboard library.",
  accessCta: {
    label: "Open document library",
    href: `${ROUTES.login}?callbackUrl=${encodeURIComponent("/dashboard/documents")}`,
  },
} as const;

/** Mirrored from https://bitcraftly.com/trust */
export const TRUST_AREAS: readonly TrustArea[] = [
  {
    id: "business",
    title: "Business",
    standards: [
      {
        id: "vision",
        code: "BDS-FND-001",
        title: "Vision, mission & values",
        description:
          "Bitcraftly is founder-led with clear purpose-driven values. Our official vision, mission, and values document is available for download.",
        status: "approved",
        href: TRUST_VISION_PDF_HREF,
        ctaLabel: "Download PDF",
      },
      {
        id: "operate",
        code: "BDS-OPS-001",
        title: "How we operate",
        description:
          "We run on a documented company operating model covering delivery ownership, client communication, and accountability. A public summary is being prepared from our internal standard.",
        status: "preparation",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    standards: [
      {
        id: "lifecycle",
        code: "BDS-OPS-002",
        title: "Project delivery lifecycle",
        description:
          "Every engagement follows a structured lifecycle — discovery, scope, build, QA, launch, and handoff — documented in our delivery standard.",
        status: "preparation",
      },
      {
        id: "support",
        code: "BDS-OPS-004",
        title: "Support & maintenance",
        description:
          "Post-launch support, maintenance windows, and escalation paths are defined in our support operating model.",
        status: "preparation",
      },
    ],
  },
  {
    id: "quality",
    title: "Quality",
    standards: [
      {
        id: "qms",
        code: "BDS-QMS-001",
        title: "Quality commitment",
        description:
          "Quality management and continuous improvement are governed by documented standards. Public summary materials are in preparation.",
        status: "preparation",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    standards: [
      {
        id: "sec",
        code: "BDS-SEC-001",
        title: "Information security",
        description:
          "We maintain an information security policy covering access control, data protection, and incident awareness. A public overview is being prepared.",
        status: "preparation",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    standards: [
      {
        id: "prv",
        code: "BDS-PRV-001",
        title: "Privacy & data handling",
        description:
          "Our internal privacy and data handling standard defines operational controls for collecting, storing, retaining, and deleting personal and confidential data. A separate visitor-facing privacy policy is available at /privacy.",
        status: "preparation",
        href: ROUTES.privacy,
        ctaLabel: "View privacy policy",
      },
    ],
  },
  {
    id: "ai",
    title: "Responsible AI",
    standards: [
      {
        id: "rai",
        code: "BDS-TEC-003",
        title: "Responsible AI engineering",
        description:
          "AI features are built with documented architecture standards covering transparency, human handoff, and safe deployment practices.",
        status: "preparation",
      },
    ],
  },
] as const;

export function getTrustOverviewStats() {
  const governedAreas = TRUST_AREAS.reduce(
    (count, area) => count + area.standards.length,
    0,
  );
  const approvedPdfs = TRUST_AREAS.reduce(
    (count, area) =>
      count + area.standards.filter((item) => item.status === "approved").length,
    0,
  );

  return {
    governedAreas,
    approvedPdfs,
  } as const;
}

export const TRUST_META = {
  title: "Trust Center",
  description: TRUST_LANDING.description,
  path: ROUTES.trust,
} as const;
