import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { createAuthOptions } from "@/auth";
import { canAccessDocument } from "@/lib/documents/access";
import { getDocument } from "@/lib/documents/documentStorage";
import { getDocumentById } from "@/lib/documents/registry";

type RouteContext = {
  params: Promise<{ documentId: string }>;
};

function safePdfFilename(filename: string): string {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return sanitized.toLowerCase().endsWith(".pdf") ? sanitized : `${sanitized}.pdf`;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { documentId } = await context.params;
  const doc = getDocumentById(documentId);

  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const session = await getServerSession(createAuthOptions());
  if (!canAccessDocument(doc, session, "view")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let buffer: Buffer;
  try {
    ({ buffer } = await getDocument(doc));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("DOCUMENT_STORAGE_PROVIDER must be set explicitly in production")
    ) {
      console.error("[documents] Storage provider is not configured for production");
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
    }

    return NextResponse.json({ error: "Document not available" }, { status: 404 });
  }

  const inline = request.nextUrl.searchParams.get("inline") === "1";
  const download = request.nextUrl.searchParams.get("download") === "1";
  const filename = safePdfFilename(doc.filename);

  const disposition = download
    ? `attachment; filename="${filename}"`
    : `inline; filename="${filename}"`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": disposition,
      "Content-Length": String(buffer.length),
      "X-Document-Id": doc.documentId,
      "Cache-Control":
        doc.visibility === "PUBLIC" && inline
          ? "public, max-age=3600, must-revalidate"
          : "private, no-store, max-age=0",
    },
  });
}
