import type { TrustCenterEntry } from "@/types/documents";

/** Public Trust Center summaries — no internal PDF exposure */
export const TRUST_CENTER_ENTRIES: TrustCenterEntry[] = [
  {
    category: "Business",
    title: "Vision, mission & values",
    summary:
      "Bitcraftly is founder-led with clear purpose-driven values. Our official vision, mission, and values document is available for download.",
    documentId: "BDS-FND-001",
    documentSlug: "bds-fnd-001",
    publicDownloadUrl: "/documents/public/BDS-FND-001_Bitcraftly_Vision_Mission_Purpose_Values_v1.0.pdf",
  },
  {
    category: "Business",
    title: "How we operate",
    summary:
      "We run on a documented company operating model covering delivery ownership, client communication, and accountability. A public summary is being prepared from our internal standard.",
    documentId: "BDS-OPS-001",
    documentSlug: "bds-ops-001",
  },
  {
    category: "Delivery",
    title: "Project delivery lifecycle",
    summary:
      "Every engagement follows a structured lifecycle — discovery, scope, build, QA, launch, and handoff — documented in our delivery standard.",
    documentId: "BDS-OPS-002",
    documentSlug: "bds-ops-002",
  },
  {
    category: "Delivery",
    title: "Support & maintenance",
    summary:
      "Post-launch support, maintenance windows, and escalation paths are defined in our support operating model.",
    documentId: "BDS-OPS-004",
    documentSlug: "bds-ops-004",
  },
  {
    category: "Quality",
    title: "Quality commitment",
    summary:
      "Quality management and continuous improvement are governed by documented standards. Public summary materials are in preparation.",
    documentId: "BDS-QMS-001",
    documentSlug: "bds-qms-001",
  },
  {
    category: "Security",
    title: "Information security",
    summary:
      "We maintain an information security policy covering access control, data protection, and incident awareness. A public overview is being prepared.",
    documentId: "BDS-SEC-001",
    documentSlug: "bds-sec-001",
  },
  {
    category: "Privacy",
    title: "Privacy & data handling",
    summary:
      "Our internal privacy and data handling standard defines operational controls for collecting, storing, retaining, and deleting personal and confidential data. A separate visitor-facing privacy policy is available at /privacy.",
    documentId: "BDS-PRV-001",
    documentSlug: "bds-prv-001",
  },
  {
    category: "Responsible AI",
    title: "Responsible AI engineering",
    summary:
      "AI features are built with documented architecture standards covering transparency, human handoff, and safe deployment practices.",
    documentId: "BDS-TEC-003",
    documentSlug: "bds-tec-003",
  },
];

export const TRUST_CENTER_CATEGORIES = [
  "Business",
  "Delivery",
  "Quality",
  "Security",
  "Privacy",
  "Responsible AI",
] as const;
