import type {
  BitcraftlyDocument,
  DocumentCategory,
  DocumentClassification,
  DocumentStats,
  DocumentVisibility,
} from "@/types/documents";

import { resolveDocumentSlug } from "@/lib/documents/legacyRedirects";

type CatalogSeed = {
  id: string;
  filename: string;
  documentId?: string;
  title?: string;
  category: DocumentCategory;
  visibility: DocumentVisibility;
  classification: DocumentClassification;
  description: string;
  tags?: string[];
};

const CATEGORY_FOLDER: Record<DocumentCategory, string> = {
  Foundation: "foundation",
  Strategy: "strategy",
  Marketing: "marketing",
  Sales: "sales",
  Operations: "operations",
  Technology: "technology",
  Security: "security",
  Privacy: "privacy",
  "Business Continuity": "continuity",
  Legal: "legal",
  Finance: "finance",
  HR: "hr",
  Quality: "quality",
  Governance: "governance",
  Templates: "templates",
};

function parseFilename(filename: string): Pick<BitcraftlyDocument, "documentId" | "title" | "version"> {
  const documentId = filename.match(/^(BDS-[A-Z]+-\d+)/)?.[1] ?? filename;
  const version = filename.match(/_v(\d+\.\d+)\.pdf$/i)?.[1] ?? "1.0";
  const titleRaw =
    filename
      .replace(/^BDS-[A-Z]+-\d+_/, "")
      .replace(/^Bitcraftly_/, "")
      .replace(/_v\d+\.\d+\.pdf$/i, "") || filename;
  const title = titleRaw.replace(/_/g, " ");
  return { documentId, title, version };
}

function buildDocument(seed: CatalogSeed): BitcraftlyDocument {
  const parsed = parseFilename(seed.filename);
  const documentId = seed.documentId ?? parsed.documentId;
  const title = seed.title ?? parsed.title;
  const folder = CATEGORY_FOLDER[seed.category];
  const storagePath = `storage/documents/internal/${folder}/${seed.filename}`;
  const publicUrl =
    seed.visibility === "PUBLIC" ? `/documents/public/${seed.filename}` : undefined;

  const searchableText = [
    seed.id,
    documentId,
    title,
    seed.category,
    seed.classification,
    seed.visibility,
    seed.description,
    ...(seed.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return {
    id: seed.id,
    documentId,
    title,
    category: seed.category,
    description: seed.description,
    version: parsed.version,
    status: "Active",
    visibility: seed.visibility,
    classification: seed.classification,
    filename: seed.filename,
    storagePath,
    publicUrl,
    effectiveDate: "2026-01-01",
    owner: "Bitcraftly Governance",
    tags: seed.tags ?? [],
    searchableText,
  };
}

/** Official Bitcraftly document catalog — 38 PDFs */
const CATALOG_SEEDS: CatalogSeed[] = [
  {
    id: "bds-bcp-001",
    filename: "BDS-BCP-001_Bitcraftly_Business_Continuity_Disaster_Recovery_Standard_v1.0.pdf",
    category: "Business Continuity",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Business continuity and disaster recovery standard for Bitcraftly operations.",
    tags: ["bcp", "dr", "continuity"],
  },
  {
    id: "bds-bcp-002",
    filename: "BDS-BCP-002_Bitcraftly_Incident_Crisis_Response_Plan_v1.0.pdf",
    category: "Business Continuity",
    visibility: "INTERNAL",
    classification: "Plan",
    description: "Incident and crisis response plan for internal escalation and recovery.",
    tags: ["incident", "crisis"],
  },
  {
    id: "bds-fin-001",
    filename: "BDS-FIN-001_Bitcraftly_Financial_Commercial_Control_Standard_v1.0.pdf",
    category: "Finance",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Financial and commercial control standard.",
    tags: ["finance", "controls"],
  },
  {
    id: "bds-fin-002",
    filename: "BDS-FIN-002_Bitcraftly_Billing_Collection_Payment_Procedure_v1.0.pdf",
    category: "Finance",
    visibility: "INTERNAL",
    classification: "Procedure",
    description: "Billing, collection, and payment procedure.",
    tags: ["billing", "payments"],
  },
  {
    id: "bds-fnd-001",
    filename: "BDS-FND-001_Bitcraftly_Vision_Mission_Purpose_Values_v1.0.pdf",
    category: "Foundation",
    visibility: "PUBLIC",
    classification: "Standard",
    description: "Official vision, mission, purpose, and values statement.",
    tags: ["vision", "mission", "values"],
  },
  {
    id: "bds-gov-001",
    documentId: "BDS-GOV-001",
    title: "Documentation Governance Standard & Master Index",
    filename: "BDS-GOV-001_Bitcraftly_Documentation_Governance_Standard_Master_Index_v1.0.pdf",
    category: "Governance",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Documentation governance standard and master index.",
    tags: ["governance", "documentation", "master index"],
  },
  {
    id: "bds-gov-002",
    documentId: "BDS-GOV-002",
    title: "Corporate Governance & Decision Authority Standard",
    filename: "BDS-GOV-002_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf",
    category: "Governance",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Corporate governance and decision authority standard.",
    tags: ["governance", "authority"],
  },
  {
    id: "bds-gov-003",
    documentId: "BDS-GOV-003",
    title: "Decision, Approval & Escalation Procedure",
    filename: "BDS-GOV-003_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf",
    category: "Governance",
    visibility: "INTERNAL",
    classification: "Procedure",
    description: "Decision approval and escalation procedure.",
    tags: ["approval", "escalation"],
  },
  {
    id: "bds-hr-001",
    filename: "BDS-HR-001_Bitcraftly_People_Workforce_Governance_Standard_v1.0.pdf",
    category: "HR",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "People and workforce governance standard.",
    tags: ["hr", "workforce"],
  },
  {
    id: "bds-hr-002",
    filename: "BDS-HR-002_Bitcraftly_Recruitment_Onboarding_Offboarding_Procedure_v1.0.pdf",
    category: "HR",
    visibility: "INTERNAL",
    classification: "Procedure",
    description: "Recruitment, onboarding, and offboarding procedure.",
    tags: ["recruitment", "onboarding"],
  },
  {
    id: "bds-leg-001",
    filename: "BDS-LEG-001_Bitcraftly_Legal_Contract_Compliance_Governance_Standard_v1.0.pdf",
    category: "Legal",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Legal, contract, and compliance governance standard.",
    tags: ["legal", "contracts"],
  },
  {
    id: "bds-leg-002",
    filename: "BDS-LEG-002_Bitcraftly_Contract_Review_Approval_Procedure_v1.0.pdf",
    category: "Legal",
    visibility: "INTERNAL",
    classification: "Procedure",
    description: "Contract review and approval procedure.",
    tags: ["contracts", "approval"],
  },
  {
    id: "bds-mkt-001",
    filename: "BDS-MKT-001_Bitcraftly_Marketing_Operating_Model_v1.0.pdf",
    category: "Marketing",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Marketing operating model for Bitcraftly go-to-market execution.",
    tags: ["marketing"],
  },
  {
    id: "bds-mkt-002",
    filename: "BDS-MKT-002_Bitcraftly_Target_Market_ICP_Segmentation_Framework_v1.0.pdf",
    category: "Marketing",
    visibility: "INTERNAL",
    classification: "Framework",
    description: "Target market, ICP, and segmentation framework.",
    tags: ["icp", "segmentation"],
  },
  {
    id: "bds-ops-001",
    filename: "BDS-OPS-001_Bitcraftly_Company_Operating_Model_v1.0.pdf",
    category: "Operations",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "Company operating model — candidate for public summary on Trust Center.",
    tags: ["operating model"],
  },
  {
    id: "bds-ops-002",
    filename: "BDS-OPS-002_Bitcraftly_Project_Delivery_Lifecycle_v1.0.pdf",
    category: "Operations",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "Project delivery lifecycle — candidate for public delivery summary.",
    tags: ["delivery", "lifecycle"],
  },
  {
    id: "bds-ops-003",
    filename: "BDS-OPS-003_Bitcraftly_Quality_Assurance_Release_Standards_v1.0.pdf",
    category: "Operations",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Quality assurance and release standards for delivery teams.",
    tags: ["qa", "release"],
  },
  {
    id: "bds-ops-004",
    filename: "BDS-OPS-004_Bitcraftly_Support_Maintenance_Operating_Model_v1.0.pdf",
    category: "Operations",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "Support and maintenance operating model — candidate for public summary.",
    tags: ["support", "maintenance"],
  },
  {
    id: "bds-prv-001",
    documentId: "BDS-PRV-001",
    title: "Privacy & Data Handling Standard",
    filename: "BDS-PRV-001_Bitcraftly_Privacy_Data_Handling_Standard_v1.0.pdf",
    category: "Privacy",
    visibility: "INTERNAL",
    classification: "Standard",
    description:
      "Internal operational standard for privacy and data handling — staff controls, retention, access, and accountable processing.",
    tags: ["privacy", "data handling", "internal"],
  },
  {
    id: "bds-qms-001",
    filename: "BDS-QMS-001_Bitcraftly_Quality_Management_Continuous_Improvement_Standard_v1.0.pdf",
    category: "Quality",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "Quality management and continuous improvement standard.",
    tags: ["quality", "improvement"],
  },
  {
    id: "bds-qms-002",
    filename: "BDS-QMS-002_Bitcraftly_Nonconformity_CAPA_Improvement_Procedure_v1.0.pdf",
    category: "Quality",
    visibility: "INTERNAL",
    classification: "Procedure",
    description: "Nonconformity, CAPA, and improvement procedure.",
    tags: ["capa", "nonconformity"],
  },
  {
    id: "bds-sal-001",
    filename: "BDS-SAL-001_Bitcraftly_Demo_First_Sales_Model_v1.0.pdf",
    category: "Sales",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Demo-first sales model for Bitcraftly client acquisition.",
    tags: ["sales", "demo"],
  },
  {
    id: "bds-sal-002",
    filename: "BDS-SAL-002_Bitcraftly_Lead_Qualification_Sales_Pipeline_v1.0.pdf",
    category: "Sales",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Lead qualification and sales pipeline standard.",
    tags: ["pipeline", "leads"],
  },
  {
    id: "bds-sec-001",
    filename: "BDS-SEC-001_Bitcraftly_Information_Security_Policy_v1.0.pdf",
    category: "Security",
    visibility: "FUTURE_PUBLIC",
    classification: "Policy",
    description: "Information security policy — candidate for public security overview.",
    tags: ["security", "policy"],
  },
  {
    id: "bds-sec-002",
    filename: "BDS-SEC-002_Bitcraftly_Access_Credential_Management_Standard_v1.0.pdf",
    category: "Security",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Access and credential management standard.",
    tags: ["access", "credentials"],
  },
  {
    id: "bds-str-001",
    filename: "BDS-STR-001_Bitcraftly_Master_Business_Model_v1.0.pdf",
    category: "Strategy",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "Master business model — candidate for public business overview.",
    tags: ["business model", "strategy"],
  },
  {
    id: "bds-str-002",
    filename: "BDS-STR-002_Bitcraftly_Market_Positioning_Strategic_Identity_v1.0.pdf",
    category: "Strategy",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Market positioning and strategic identity standard.",
    tags: ["positioning", "identity"],
  },
  {
    id: "bds-tec-001",
    filename: "BDS-TEC-001_Bitcraftly_Technology_Architecture_Approved_Stack_v1.0.pdf",
    category: "Technology",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Technology architecture and approved stack standard.",
    tags: ["architecture", "stack"],
  },
  {
    id: "bds-tec-002",
    filename: "BDS-TEC-002_Bitcraftly_Engineering_Code_Quality_Standards_v1.0.pdf",
    category: "Technology",
    visibility: "INTERNAL",
    classification: "Standard",
    description: "Engineering and code quality standards.",
    tags: ["engineering", "code quality"],
  },
  {
    id: "bds-tec-003",
    filename: "BDS-TEC-003_Bitcraftly_AI_Architecture_Responsible_AI_Engineering_v1.0.pdf",
    category: "Technology",
    visibility: "FUTURE_PUBLIC",
    classification: "Standard",
    description: "AI architecture and responsible AI engineering — candidate for Trust Center.",
    tags: ["ai", "responsible ai"],
  },
  {
    id: "bds-tpl-001",
    documentId: "BDS-TPL-001",
    title: "Official Master Document Template",
    filename: "BDS-TPL-001_Bitcraftly_Official_Master_Document_Template_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Official master document template.",
    tags: ["template"],
  },
  {
    id: "bds-tpl-002",
    documentId: "BDS-TPL-002",
    title: "Business & Commercial Templates Pack",
    filename: "BDS-TPL-002_Business_and_Commercial_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Business and commercial templates pack.",
    tags: ["template", "commercial"],
  },
  {
    id: "bds-tpl-003",
    documentId: "BDS-TPL-003",
    title: "Project Delivery & Operations Templates Pack",
    filename: "BDS-TPL-003_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Project delivery and operations templates pack.",
    tags: ["template", "delivery"],
  },
  {
    id: "bds-tpl-004",
    documentId: "BDS-TPL-004",
    title: "Technology, Security & Privacy Templates Pack",
    filename: "BDS-TPL-004_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Technology, security, and privacy templates pack.",
    tags: ["template", "security"],
  },
  {
    id: "bds-tpl-005",
    documentId: "BDS-TPL-005",
    title: "Finance, Billing & Procurement Templates Pack",
    filename: "BDS-TPL-005_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Finance, billing, and procurement templates pack.",
    tags: ["template", "finance"],
  },
  {
    id: "bds-tpl-006",
    documentId: "BDS-TPL-006",
    title: "People & Workforce Templates Pack",
    filename: "BDS-TPL-006_People_and_Workforce_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "People and workforce templates pack.",
    tags: ["template", "hr"],
  },
  {
    id: "bds-tpl-007",
    documentId: "BDS-TPL-007",
    title: "Quality, CAPA & Continuity Templates Pack",
    filename: "BDS-TPL-007_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Quality, CAPA, and continuity templates pack.",
    tags: ["template", "quality"],
  },
  {
    id: "bds-tpl-008",
    documentId: "BDS-TPL-008",
    title: "Governance, Risk & Master Registers Pack",
    filename: "BDS-TPL-008_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf",
    category: "Templates",
    visibility: "INTERNAL",
    classification: "Template Pack",
    description: "Governance, risk, and master registers pack.",
    tags: ["template", "governance"],
  },
];

export const BITCRAFTLY_DOCUMENTS: BitcraftlyDocument[] = CATALOG_SEEDS.map(buildDocument);

export function getDocumentById(id: string): BitcraftlyDocument | undefined {
  const resolved = resolveDocumentSlug(id);
  return BITCRAFTLY_DOCUMENTS.find((doc) => doc.id === resolved);
}

export function getDocumentByOfficialId(documentId: string): BitcraftlyDocument[] {
  return BITCRAFTLY_DOCUMENTS.filter((doc) => doc.documentId === documentId);
}

export function getAllCategories(): DocumentCategory[] {
  return [...new Set(BITCRAFTLY_DOCUMENTS.map((d) => d.category))].sort();
}

export function getDocumentStats(): DocumentStats {
  const categories = new Set(BITCRAFTLY_DOCUMENTS.map((d) => d.category));
  return {
    total: BITCRAFTLY_DOCUMENTS.length,
    public: BITCRAFTLY_DOCUMENTS.filter((d) => d.visibility === "PUBLIC").length,
    internal: BITCRAFTLY_DOCUMENTS.filter((d) => d.visibility === "INTERNAL").length,
    futurePublic: BITCRAFTLY_DOCUMENTS.filter((d) => d.visibility === "FUTURE_PUBLIC").length,
    categories: categories.size,
  };
}

export function filterDocuments(options: {
  search?: string;
  category?: string;
  visibility?: string;
  status?: string;
}): BitcraftlyDocument[] {
  const q = options.search?.trim().toLowerCase() ?? "";
  return BITCRAFTLY_DOCUMENTS.filter((doc) => {
    if (options.category && options.category !== "all" && doc.category !== options.category) return false;
    if (options.visibility && options.visibility !== "all" && doc.visibility !== options.visibility) return false;
    if (options.status && options.status !== "all" && doc.status !== options.status) return false;
    if (q && !doc.searchableText.includes(q)) return false;
    return true;
  });
}
