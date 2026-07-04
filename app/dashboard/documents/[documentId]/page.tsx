import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import DocumentDetailClient from "@/components/documents/DocumentDetailClient";
import { canDownloadDocument } from "@/lib/documents/access";
import { resolveDocumentSlug } from "@/lib/documents/legacyRedirects";
import { getDocumentById } from "@/lib/documents/registry";

type PageProps = {
  params: Promise<{ documentId: string }>;
};

export default async function DashboardDocumentDetailPage({ params }: PageProps) {
  const { documentId } = await params;
  const resolvedId = resolveDocumentSlug(documentId);
  if (resolvedId !== documentId) {
    redirect(`/dashboard/documents/${resolvedId}`);
  }
  const document = getDocumentById(resolvedId);
  if (!document) notFound();

  const session = await getServerSession(createAuthOptions());
  const canDownload = canDownloadDocument(document, session);
  const viewUrl = `/api/documents/${document.id}/view`;

  return <DocumentDetailClient document={document} canDownload={canDownload} viewUrl={viewUrl} />;
}
