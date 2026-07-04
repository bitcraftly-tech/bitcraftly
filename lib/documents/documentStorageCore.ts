import fs from "node:fs";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { BitcraftlyDocument } from "@/types/documents";

import { buildSupabaseObjectKey } from "@/lib/documents/supabaseMigration";
import { internalDocumentExists, resolveInternalAbsolutePath } from "@/lib/documents/storage";
import { getDocumentStorageProvider, type DocumentStorageProvider } from "@/lib/documents/storageProvider";
import { getSupabaseServerEnv } from "@/lib/supabase/env";

export type DocumentContent = {
  buffer: Buffer;
  contentType: "application/pdf";
  size: number;
};

export type DocumentMetadata = {
  exists: boolean;
  size: number;
  contentType: "application/pdf";
};

const PRIVATE_VISIBILITIES = new Set(["INTERNAL", "FUTURE_PUBLIC"]);

let cachedSupabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (cachedSupabaseClient) return cachedSupabaseClient;
  const { url, secretKey } = getSupabaseServerEnv();
  cachedSupabaseClient = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedSupabaseClient;
}

function getSupabaseBucketName(): string {
  return getSupabaseServerEnv().bucket;
}

function isNonPublicDocument(doc: BitcraftlyDocument): boolean {
  return PRIVATE_VISIBILITIES.has(doc.visibility);
}

/** PUBLIC documents always use local storage; non-public documents follow the configured provider. */
export function resolveDocumentStorageProvider(doc: BitcraftlyDocument): DocumentStorageProvider {
  if (doc.visibility === "PUBLIC") return "local";
  return getDocumentStorageProvider();
}

function assertNonPublicForSupabase(doc: BitcraftlyDocument): void {
  if (!isNonPublicDocument(doc)) {
    throw new Error("Supabase storage is not used for PUBLIC documents");
  }
}

function resolveApprovedObjectKey(doc: BitcraftlyDocument): string {
  assertNonPublicForSupabase(doc);
  return buildSupabaseObjectKey(doc);
}

async function listSupabaseObjectMetadata(
  objectKey: string,
): Promise<{ size: number } | null> {
  const parts = objectKey.split("/");
  const fileName = parts.pop();
  if (!fileName) return null;

  const folder = parts.join("/");
  const client = getSupabaseClient();
  const bucket = getSupabaseBucketName();
  const { data, error } = await client.storage.from(bucket).list(folder, {
    limit: 100,
    search: fileName,
  });

  if (error || !data?.length) return null;

  const match = data.find((item) => item.name === fileName && item.metadata);
  if (!match?.metadata) return null;

  const size = typeof match.metadata.size === "number" ? match.metadata.size : 0;
  return { size };
}

async function readLocalDocument(doc: BitcraftlyDocument): Promise<DocumentContent> {
  const filePath = resolveInternalAbsolutePath(doc);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error("Document not found");
  }

  const buffer = fs.readFileSync(filePath);
  return {
    buffer,
    contentType: "application/pdf",
    size: buffer.length,
  };
}

async function readSupabaseDocument(doc: BitcraftlyDocument): Promise<DocumentContent> {
  const objectKey = resolveApprovedObjectKey(doc);
  const client = getSupabaseClient();
  const bucket = getSupabaseBucketName();
  const { data, error } = await client.storage.from(bucket).download(objectKey);

  if (error || !data) {
    throw new Error("Document not found");
  }

  const buffer = Buffer.from(await data.arrayBuffer());
  return {
    buffer,
    contentType: "application/pdf",
    size: buffer.length,
  };
}

export async function getDocument(doc: BitcraftlyDocument): Promise<DocumentContent> {
  const provider = resolveDocumentStorageProvider(doc);
  if (provider === "supabase") {
    return readSupabaseDocument(doc);
  }
  return readLocalDocument(doc);
}

export async function getDocumentMetadata(doc: BitcraftlyDocument): Promise<DocumentMetadata> {
  const provider = resolveDocumentStorageProvider(doc);

  if (provider === "local") {
    const exists = internalDocumentExists(doc);
    if (!exists) {
      return { exists: false, size: 0, contentType: "application/pdf" };
    }

    const filePath = resolveInternalAbsolutePath(doc);
    return {
      exists: true,
      size: fs.statSync(filePath).size,
      contentType: "application/pdf",
    };
  }

  let objectKey: string;
  try {
    objectKey = resolveApprovedObjectKey(doc);
  } catch {
    return { exists: false, size: 0, contentType: "application/pdf" };
  }

  const metadata = await listSupabaseObjectMetadata(objectKey);
  if (!metadata) {
    return { exists: false, size: 0, contentType: "application/pdf" };
  }

  return {
    exists: true,
    size: metadata.size,
    contentType: "application/pdf",
  };
}

export async function documentExists(doc: BitcraftlyDocument): Promise<boolean> {
  const metadata = await getDocumentMetadata(doc);
  return metadata.exists;
}
