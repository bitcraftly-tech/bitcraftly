import type { Session } from "next-auth";

import type { BitcraftlyDocument, DocumentAccessAction } from "@/types/documents";

const DASHBOARD_ROLES = new Set(["admin", "staff", "manager"]);

function hasDashboardSession(session: Session | null | undefined): boolean {
  const role = `${session?.role ?? ""}`.toLowerCase();
  return Boolean(session?.user) && DASHBOARD_ROLES.has(role);
}

export function canAccessDocument(
  doc: BitcraftlyDocument,
  session: Session | null | undefined,
  action: DocumentAccessAction,
): boolean {
  void action;
  if (doc.visibility === "PUBLIC") return true;
  return hasDashboardSession(session);
}

export function canViewDocument(doc: BitcraftlyDocument, session: Session | null | undefined): boolean {
  return canAccessDocument(doc, session, "view");
}

export function canDownloadDocument(doc: BitcraftlyDocument, session: Session | null | undefined): boolean {
  return canAccessDocument(doc, session, "download");
}

export function isDashboardRole(session: Session | null | undefined): boolean {
  return hasDashboardSession(session);
}
