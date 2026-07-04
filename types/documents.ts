export type DocumentVisibility = "PUBLIC" | "INTERNAL" | "FUTURE_PUBLIC";

export type DocumentCategory =
  | "Foundation"
  | "Strategy"
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Technology"
  | "Security"
  | "Privacy"
  | "Business Continuity"
  | "Legal"
  | "Finance"
  | "HR"
  | "Quality"
  | "Governance"
  | "Templates";

export type DocumentStatus = "Active" | "Draft" | "Archived";

export type DocumentClassification = "Standard" | "Procedure" | "Policy" | "Plan" | "Template Pack" | "Framework";

export type BitcraftlyDocument = {
  /** Unique registry slug — used in routes */
  id: string;
  /** Official BDS document ID (may repeat across files — see duplicateIds note) */
  documentId: string;
  title: string;
  category: DocumentCategory;
  description: string;
  version: string;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  classification: DocumentClassification;
  filename: string;
  /** Relative path from project root — internal storage only */
  storagePath: string;
  /** Static public URL when visibility is PUBLIC */
  publicUrl?: string;
  effectiveDate?: string;
  owner: string;
  tags: string[];
  searchableText: string;
};

export type DocumentAccessAction = "view" | "download";

export type DocumentStats = {
  total: number;
  public: number;
  internal: number;
  futurePublic: number;
  categories: number;
};

export type TrustCenterCategory =
  | "Business"
  | "Delivery"
  | "Quality"
  | "Security"
  | "Privacy"
  | "Responsible AI";

export type TrustCenterEntry = {
  category: TrustCenterCategory;
  title: string;
  summary: string;
  documentId?: string;
  documentSlug?: string;
  publicDownloadUrl?: string;
};
