/**
 * Verifies document storage providers (local + Supabase) and manifest integrity.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/verify-document-storage.ts
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { canAccessDocument } from "../lib/documents/access.ts";
import { getDocument, getDocumentMetadata } from "../lib/documents/documentStorageCore.ts";
import { BITCRAFTLY_DOCUMENTS, getDocumentById, getDocumentStats } from "../lib/documents/registry.ts";
import { getDocumentStorageProvider } from "../lib/documents/storageProvider.ts";
import type { SupabaseUploadedManifestEntry } from "../lib/documents/supabaseMigration.ts";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function sha256Buffer(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

function isPdfBuffer(buffer: Buffer): boolean {
  return buffer.length >= 5 && buffer.subarray(0, 5).toString("utf8") === "%PDF-";
}

async function verifyProvider(provider: "local" | "supabase") {
  process.env.DOCUMENT_STORAGE_PROVIDER = provider;

  const nonPublic = BITCRAFTLY_DOCUMENTS.filter((doc) => doc.visibility !== "PUBLIC");
  const failures: string[] = [];
  const tested: string[] = [];

  for (const doc of nonPublic) {
    try {
      const metadata = await getDocumentMetadata(doc);
      if (!metadata.exists) {
        failures.push(`${doc.documentId}: metadata.exists=false`);
        continue;
      }

      const content = await getDocument(doc);
      if (!isPdfBuffer(content.buffer)) {
        failures.push(`${doc.documentId}: invalid PDF signature`);
        continue;
      }

      tested.push(doc.documentId);
    } catch (error) {
      failures.push(
        `${doc.documentId}: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }

  const categories = new Set(nonPublic.map((doc) => doc.category));
  const categoryCoverage = [...categories].filter((category) =>
    nonPublic
      .filter((doc) => doc.category === category)
      .some((doc) => tested.includes(doc.documentId)),
  );

  const spotlight = ["BDS-GOV-002", "BDS-GOV-003", "BDS-TPL-008"];
  const spotlightResults = Object.fromEntries(
    spotlight.map((id) => [id, tested.includes(id)]),
  );

  return {
    provider,
    resolvedProvider: getDocumentStorageProvider(),
    expectedCount: nonPublic.length,
    successCount: tested.length,
    categoryCoverageCount: categoryCoverage.length,
    totalCategories: categories.size,
    spotlightResults,
    failures,
  };
}

async function verifySupabaseIntegrity() {
  process.env.DOCUMENT_STORAGE_PROVIDER = "supabase";

  const manifestPath = path.join(
    process.cwd(),
    "storage/documents/.supabase-migration/manifest-uploaded.json",
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
    entries: SupabaseUploadedManifestEntry[];
  };

  const mismatches: string[] = [];
  let matches = 0;

  for (const entry of manifest.entries) {
    const doc = getDocumentById(entry.registrySlug);
    if (!doc) {
      mismatches.push(`${entry.officialDocumentId}: registry entry missing`);
      continue;
    }

    const content = await getDocument(doc);
    const sha256 = sha256Buffer(content.buffer);
    if (sha256 !== entry.sha256) {
      mismatches.push(`${entry.officialDocumentId}: checksum mismatch`);
      continue;
    }
    matches += 1;
  }

  return {
    expected: manifest.entries.length,
    matches,
    mismatches,
  };
}

function verifyUnauthorizedAccess() {
  const internalDoc = BITCRAFTLY_DOCUMENTS.find((doc) => doc.visibility === "INTERNAL");
  if (!internalDoc) {
    return { ok: false, reason: "No INTERNAL document found for auth test" };
  }

  const allowedPublic = canAccessDocument(
    BITCRAFTLY_DOCUMENTS.find((doc) => doc.visibility === "PUBLIC")!,
    null,
    "view",
  );
  const blockedInternal = canAccessDocument(internalDoc, null, "view");

  return {
    ok: allowedPublic && !blockedInternal,
    publicWithoutSession: allowedPublic,
    internalWithoutSession: blockedInternal,
  };
}

function verifyPublicPdf() {
  const publicDoc = BITCRAFTLY_DOCUMENTS.find((doc) => doc.documentId === "BDS-FND-001");
  if (!publicDoc?.publicUrl) {
    return { ok: false, reason: "BDS-FND-001 publicUrl missing" };
  }

  const publicFile = path.join(process.cwd(), "public", publicDoc.publicUrl.replace(/^\//, ""));
  const internalPublicCopy = path.join(process.cwd(), publicDoc.storagePath.replace(/\\/g, "/"));

  return {
    ok: fs.existsSync(publicFile) && fs.existsSync(internalPublicCopy),
    publicUrl: publicDoc.publicUrl,
    publicFileExists: fs.existsSync(publicFile),
    onlyPublicInPublicFolder:
      fs
        .readdirSync(path.join(process.cwd(), "public/documents/public"))
        .filter((name) => name.endsWith(".pdf")).length === 1,
  };
}

async function main() {
  loadEnvLocal();

  const stats = getDocumentStats();
  const registryChecks = {
    total: stats.total === 38,
    public: stats.public === 1,
    internal: stats.internal === 30,
    futurePublic: stats.futurePublic === 7,
  };

  const localResult = await verifyProvider("local");
  const supabaseResult = await verifyProvider("supabase");
  const integrity = await verifySupabaseIntegrity();
  const unauthorized = verifyUnauthorizedAccess();
  const publicPdf = verifyPublicPdf();

  process.env.DOCUMENT_STORAGE_PROVIDER = "supabase";
  const publicDoc = BITCRAFTLY_DOCUMENTS.find((doc) => doc.documentId === "BDS-FND-001");
  let publicDocViaSupabaseProvider = false;
  if (publicDoc) {
    try {
      const content = await getDocument(publicDoc);
      publicDocViaSupabaseProvider = isPdfBuffer(content.buffer);
    } catch {
      publicDocViaSupabaseProvider = false;
    }
  }

  console.log(
    JSON.stringify(
      {
        registryChecks,
        localResult,
        supabaseResult,
        integrity,
        unauthorized,
        publicPdf,
        publicDocViaSupabaseProvider,
      },
      null,
      2,
    ),
  );

  const ok =
    registryChecks.total &&
    registryChecks.public &&
    registryChecks.internal &&
    registryChecks.futurePublic &&
    localResult.successCount === 37 &&
    localResult.failures.length === 0 &&
    supabaseResult.successCount === 37 &&
    supabaseResult.failures.length === 0 &&
    supabaseResult.spotlightResults["BDS-GOV-002"] &&
    supabaseResult.spotlightResults["BDS-GOV-003"] &&
    supabaseResult.spotlightResults["BDS-TPL-008"] &&
    supabaseResult.categoryCoverageCount === supabaseResult.totalCategories &&
    integrity.matches === 37 &&
    integrity.mismatches.length === 0 &&
    unauthorized.ok &&
    publicPdf.ok &&
    publicDocViaSupabaseProvider;

  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Verification failed");
  process.exit(1);
});
