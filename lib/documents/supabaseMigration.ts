import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { BitcraftlyDocument, DocumentVisibility } from "@/types/documents";

import { BITCRAFTLY_DOCUMENTS, getDocumentStats } from "@/lib/documents/registry";
import { resolveInternalAbsolutePath } from "@/lib/documents/storage";
import { getSupabaseServerEnv } from "@/lib/supabase/env";

export const SUPABASE_MIGRATION_MAX_BYTES = 10 * 1024 * 1024;
export const SUPABASE_MIGRATION_MANIFEST_DIR = "storage/documents/.supabase-migration";
export const SUPABASE_DRY_RUN_MANIFEST = "manifest-dry-run.json";
export const SUPABASE_UPLOADED_MANIFEST = "manifest-uploaded.json";

export type SupabaseMigrationManifestEntry = {
  officialDocumentId: string;
  registrySlug: string;
  title: string;
  visibility: DocumentVisibility;
  category: string;
  localSourcePath: string;
  targetObjectKey: string;
  fileSizeBytes: number;
  sha256: string;
};

export type SupabaseUploadedManifestEntry = SupabaseMigrationManifestEntry & {
  downloadedSha256: string;
  checksumMatch: boolean;
  uploadStatus: "success" | "failed" | "skipped-existing";
  uploadError?: string;
};

export type SupabaseMigrationDryRunResult = {
  stats: ReturnType<typeof getDocumentStats>;
  publicExcluded: BitcraftlyDocument[];
  selected: BitcraftlyDocument[];
  manifest: SupabaseMigrationManifestEntry[];
  missingSourceFiles: string[];
  duplicateOfficialIds: string[];
  duplicateObjectKeys: string[];
  invalidMimeTypes: string[];
  filesOverLimit: string[];
};

export type SupabaseMigrationUploadReport = {
  ok: boolean;
  bucketName: string;
  bucketPrivate: boolean;
  objectCountBefore: number;
  objectCountAfter: number;
  expectedUploads: number;
  successfulUploads: string[];
  skippedExisting: string[];
  failedUploads: { officialDocumentId: string; objectKey: string; error: string }[];
  expectedObjectKeysFound: string[];
  unexpectedObjectKeys: string[];
  publicDocumentsUploaded: string[];
  bdsFnd001InBucket: boolean;
  checksumMismatches: string[];
  invalidPdfSignatures: string[];
  uploadedManifestPath: string;
  failures: string[];
};

const PRIVATE_VISIBILITIES = new Set<DocumentVisibility>(["INTERNAL", "FUTURE_PUBLIC"]);
const DOCUMENTS_PREFIX = "documents/";

export function isPrivateDocument(doc: BitcraftlyDocument): boolean {
  return PRIVATE_VISIBILITIES.has(doc.visibility);
}

export function getSupabaseMigrationClient(): SupabaseClient {
  const { url, secretKey } = getSupabaseServerEnv();
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** documents/{category-slug}/{registry-slug}/{filename} */
export function buildSupabaseObjectKey(doc: BitcraftlyDocument): string {
  const normalized = doc.storagePath.replace(/\\/g, "/");
  if (normalized.includes("..") || !normalized.startsWith("storage/documents/internal/")) {
    throw new Error(`Invalid storage path for ${doc.documentId}`);
  }

  const parts = normalized.split("/");
  const categorySlug = parts[3];
  const filename = parts[4];
  if (!categorySlug || !filename || filename !== doc.filename) {
    throw new Error(`Unable to derive category slug for ${doc.documentId}`);
  }

  if (!/^[a-z0-9-]+$/.test(categorySlug) || !/^[a-z0-9-]+$/.test(doc.id)) {
    throw new Error(`Invalid slug segments for ${doc.documentId}`);
  }

  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    throw new Error(`Invalid filename for ${doc.documentId}`);
  }

  return `documents/${categorySlug}/${doc.id}/${filename}`;
}

function isPdfFile(filePath: string): boolean {
  if (!filePath.toLowerCase().endsWith(".pdf")) return false;
  const fd = fs.openSync(filePath, "r");
  try {
    const header = Buffer.alloc(5);
    fs.readSync(fd, header, 0, 5, 0);
    return header.toString("utf8") === "%PDF-";
  } finally {
    fs.closeSync(fd);
  }
}

function isPdfBuffer(buffer: Buffer): boolean {
  return buffer.length >= 5 && buffer.subarray(0, 5).toString("utf8") === "%PDF-";
}

function sha256File(filePath: string): string {
  const hash = createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function sha256Buffer(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes].sort();
}

function manifestDir(): string {
  return path.join(process.cwd(), SUPABASE_MIGRATION_MANIFEST_DIR);
}

function manifestFilePath(filename: string): string {
  return path.join(manifestDir(), filename);
}

export function loadApprovedDryRunManifest(): SupabaseMigrationManifestEntry[] {
  const manifestPath = manifestFilePath(SUPABASE_DRY_RUN_MANIFEST);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Approved dry-run manifest not found: ${SUPABASE_DRY_RUN_MANIFEST}`);
  }
  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
    entries?: SupabaseMigrationManifestEntry[];
  };
  if (!Array.isArray(parsed.entries) || parsed.entries.length !== 37) {
    throw new Error("Approved dry-run manifest must contain exactly 37 entries");
  }
  return [...parsed.entries].sort((a, b) => a.officialDocumentId.localeCompare(b.officialDocumentId));
}

export function runSupabaseMigrationDryRun(): SupabaseMigrationDryRunResult {
  const stats = getDocumentStats();
  const publicExcluded = BITCRAFTLY_DOCUMENTS.filter((doc) => doc.visibility === "PUBLIC");
  const selected = BITCRAFTLY_DOCUMENTS.filter(isPrivateDocument);

  const missingSourceFiles: string[] = [];
  const invalidMimeTypes: string[] = [];
  const filesOverLimit: string[] = [];
  const manifest: SupabaseMigrationManifestEntry[] = [];

  for (const doc of selected) {
    let absolutePath: string;
    try {
      absolutePath = resolveInternalAbsolutePath(doc);
    } catch {
      missingSourceFiles.push(doc.documentId);
      continue;
    }

    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      missingSourceFiles.push(doc.documentId);
      continue;
    }

    if (!isPdfFile(absolutePath)) {
      invalidMimeTypes.push(doc.documentId);
      continue;
    }

    const fileSizeBytes = fs.statSync(absolutePath).size;
    if (fileSizeBytes > SUPABASE_MIGRATION_MAX_BYTES) {
      filesOverLimit.push(doc.documentId);
      continue;
    }

    manifest.push({
      officialDocumentId: doc.documentId,
      registrySlug: doc.id,
      title: doc.title,
      visibility: doc.visibility,
      category: doc.category,
      localSourcePath: doc.storagePath.replace(/\\/g, "/"),
      targetObjectKey: buildSupabaseObjectKey(doc),
      fileSizeBytes,
      sha256: sha256File(absolutePath),
    });
  }

  manifest.sort((a, b) => a.officialDocumentId.localeCompare(b.officialDocumentId));

  const duplicateOfficialIds = findDuplicates(selected.map((doc) => doc.documentId));
  const duplicateObjectKeys = findDuplicates(manifest.map((entry) => entry.targetObjectKey));

  return {
    stats,
    publicExcluded,
    selected,
    manifest,
    missingSourceFiles,
    duplicateOfficialIds,
    duplicateObjectKeys,
    invalidMimeTypes,
    filesOverLimit,
  };
}

export function assertDryRunExpectations(result: SupabaseMigrationDryRunResult): string[] {
  const failures: string[] = [];
  if (result.stats.total !== 38) failures.push(`registry total expected 38, got ${result.stats.total}`);
  if (result.publicExcluded.length !== 1) {
    failures.push(`PUBLIC excluded expected 1, got ${result.publicExcluded.length}`);
  }
  if (result.selected.length !== 37) failures.push(`non-public selected expected 37, got ${result.selected.length}`);
  if (result.stats.internal !== 30) failures.push(`INTERNAL expected 30, got ${result.stats.internal}`);
  if (result.stats.futurePublic !== 7) {
    failures.push(`FUTURE_PUBLIC expected 7, got ${result.stats.futurePublic}`);
  }
  if (result.missingSourceFiles.length) failures.push(`missing source files: ${result.missingSourceFiles.join(", ")}`);
  if (result.duplicateOfficialIds.length) {
    failures.push(`duplicate official IDs: ${result.duplicateOfficialIds.join(", ")}`);
  }
  if (result.duplicateObjectKeys.length) {
    failures.push(`duplicate object keys: ${result.duplicateObjectKeys.join(", ")}`);
  }
  if (result.invalidMimeTypes.length) {
    failures.push(`invalid MIME types: ${result.invalidMimeTypes.join(", ")}`);
  }
  if (result.filesOverLimit.length) failures.push(`files over 10 MB: ${result.filesOverLimit.join(", ")}`);
  if (result.manifest.length !== 37) failures.push(`manifest entries expected 37, got ${result.manifest.length}`);
  return failures;
}

export function assertMatchesApprovedDryRunManifest(
  current: SupabaseMigrationManifestEntry[],
  approved: SupabaseMigrationManifestEntry[],
): string[] {
  const failures: string[] = [];
  if (current.length !== approved.length) {
    failures.push(`current manifest length ${current.length} != approved ${approved.length}`);
    return failures;
  }

  for (let i = 0; i < approved.length; i += 1) {
    const a = approved[i];
    const c = current[i];
    if (c.officialDocumentId !== a.officialDocumentId) {
      failures.push(`document ID changed for index ${i}: ${a.officialDocumentId}`);
    }
    if (c.targetObjectKey !== a.targetObjectKey) {
      failures.push(`object key changed for ${a.officialDocumentId}`);
    }
    if (c.sha256 !== a.sha256) {
      failures.push(`source checksum changed for ${a.officialDocumentId}`);
    }
    if (c.fileSizeBytes !== a.fileSizeBytes) {
      failures.push(`file size changed for ${a.officialDocumentId}`);
    }
  }

  return failures;
}

export function writeSupabaseMigrationManifest(
  manifest: SupabaseMigrationManifestEntry[],
  filename = SUPABASE_DRY_RUN_MANIFEST,
): string {
  const dir = manifestDir();
  fs.mkdirSync(dir, { recursive: true });
  const manifestPath = path.join(dir, filename);
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify(
      {
        mode: filename === SUPABASE_DRY_RUN_MANIFEST ? "dry-run" : "uploaded",
        generatedAt: new Date().toISOString(),
        documentCount: manifest.length,
        entries: manifest,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return manifestPath;
}

export function writeUploadedManifest(entries: SupabaseUploadedManifestEntry[]): string {
  const dir = manifestDir();
  fs.mkdirSync(dir, { recursive: true });
  const manifestPath = path.join(dir, SUPABASE_UPLOADED_MANIFEST);
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify(
      {
        mode: "uploaded",
        generatedAt: new Date().toISOString(),
        documentCount: entries.length,
        entries,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return manifestPath;
}

async function listFolderObjectKeys(
  client: SupabaseClient,
  bucket: string,
  folder: string,
): Promise<string[]> {
  const keys: string[] = [];
  const { data, error } = await client.storage.from(bucket).list(folder, {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error(`Failed to list storage folder "${folder}": ${error.message}`);

  for (const item of data ?? []) {
    const itemPath = folder ? `${folder}/${item.name}` : item.name;
    if (item.metadata) {
      keys.push(itemPath);
      continue;
    }
    keys.push(...(await listFolderObjectKeys(client, bucket, itemPath)));
  }

  return keys;
}

export async function listDocumentsObjectKeys(client: SupabaseClient, bucket: string): Promise<string[]> {
  const keys = await listFolderObjectKeys(client, bucket, "documents");
  return keys.sort();
}

async function getBucketInfo(client: SupabaseClient, bucketName: string) {
  const { data, error } = await client.storage.listBuckets();
  if (error) throw new Error(`Failed to list buckets: ${error.message}`);
  const bucket = (data ?? []).find((item) => item.name === bucketName || item.id === bucketName);
  if (!bucket) throw new Error(`Expected bucket not found: ${bucketName}`);
  return bucket;
}

async function downloadObject(client: SupabaseClient, bucket: string, objectKey: string): Promise<Buffer> {
  const { data, error } = await client.storage.from(bucket).download(objectKey);
  if (error || !data) throw new Error(`Download failed for ${objectKey}: ${error?.message ?? "empty response"}`);
  return Buffer.from(await data.arrayBuffer());
}

function resolveLocalAbsolutePath(entry: SupabaseMigrationManifestEntry): string {
  const normalized = entry.localSourcePath.replace(/\\/g, "/");
  if (normalized.includes("..") || !normalized.startsWith("storage/documents/internal/")) {
    throw new Error(`Invalid local source path for ${entry.officialDocumentId}`);
  }
  return path.join(process.cwd(), normalized);
}

export async function runSupabaseMigrationUpload(): Promise<SupabaseMigrationUploadReport> {
  const { bucket: bucketName } = getSupabaseServerEnv();
  const client = getSupabaseMigrationClient();
  const approved = loadApprovedDryRunManifest();
  const dryRun = runSupabaseMigrationDryRun();

  const report: SupabaseMigrationUploadReport = {
    ok: false,
    bucketName,
    bucketPrivate: false,
    objectCountBefore: 0,
    objectCountAfter: 0,
    expectedUploads: approved.length,
    successfulUploads: [],
    skippedExisting: [],
    failedUploads: [],
    expectedObjectKeysFound: [],
    unexpectedObjectKeys: [],
    publicDocumentsUploaded: [],
    bdsFnd001InBucket: false,
    checksumMismatches: [],
    invalidPdfSignatures: [],
    uploadedManifestPath: "",
    failures: [],
  };

  report.failures.push(...assertDryRunExpectations(dryRun));
  report.failures.push(...assertMatchesApprovedDryRunManifest(dryRun.manifest, approved));

  if (report.failures.length) return report;

  const bucket = await getBucketInfo(client, bucketName);
  report.bucketPrivate = bucket.public === false;
  if (!report.bucketPrivate) {
    report.failures.push("Bucket is not private");
    return report;
  }

  const existingKeys = await listDocumentsObjectKeys(client, bucketName);
  report.objectCountBefore = existingKeys.length;

  const approvedKeySet = new Set(approved.map((entry) => entry.targetObjectKey));
  const approvedByKey = new Map(approved.map((entry) => [entry.targetObjectKey, entry]));

  for (const key of existingKeys) {
    if (!approvedKeySet.has(key)) {
      report.unexpectedObjectKeys.push(key);
    }
  }

  if (report.unexpectedObjectKeys.length) {
    report.failures.push(`Unexpected existing object keys: ${report.unexpectedObjectKeys.join(", ")}`);
    return report;
  }

  const verifiedExisting = new Set<string>();
  for (const key of existingKeys) {
    const entry = approvedByKey.get(key);
    if (!entry) continue;
    try {
      const downloaded = await downloadObject(client, bucketName, key);
      const downloadedSha256 = sha256Buffer(downloaded);
      if (downloadedSha256 !== entry.sha256) {
        report.failures.push(`Existing object checksum mismatch for ${entry.officialDocumentId}`);
        return report;
      }
      if (!isPdfBuffer(downloaded)) {
        report.failures.push(`Existing object is not a valid PDF for ${entry.officialDocumentId}`);
        return report;
      }
      verifiedExisting.add(key);
    } catch (err) {
      report.failures.push(
        `Failed to verify existing object ${entry.officialDocumentId}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
      return report;
    }
  }

  const uploadResults: SupabaseUploadedManifestEntry[] = [];

  for (const entry of approved) {
    if (verifiedExisting.has(entry.targetObjectKey)) {
      report.skippedExisting.push(entry.officialDocumentId);
      uploadResults.push({
        ...entry,
        downloadedSha256: entry.sha256,
        checksumMatch: true,
        uploadStatus: "skipped-existing",
      });
      continue;
    }

    const absolutePath = resolveLocalAbsolutePath(entry);
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      report.failedUploads.push({
        officialDocumentId: entry.officialDocumentId,
        objectKey: entry.targetObjectKey,
        error: "Local source file missing",
      });
      break;
    }

    const currentSha256 = sha256File(absolutePath);
    if (currentSha256 !== entry.sha256) {
      report.failedUploads.push({
        officialDocumentId: entry.officialDocumentId,
        objectKey: entry.targetObjectKey,
        error: "Local source checksum changed since dry-run",
      });
      break;
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const { error } = await client.storage.from(bucketName).upload(entry.targetObjectKey, fileBuffer, {
      contentType: "application/pdf",
      cacheControl: "private, no-store",
      upsert: false,
    });

    if (error) {
      report.failedUploads.push({
        officialDocumentId: entry.officialDocumentId,
        objectKey: entry.targetObjectKey,
        error: error.message,
      });
      break;
    }

    report.successfulUploads.push(entry.officialDocumentId);
    uploadResults.push({
      ...entry,
      downloadedSha256: "",
      checksumMatch: false,
      uploadStatus: "success",
    });
  }

  if (report.failedUploads.length) {
    report.uploadedManifestPath = writeUploadedManifest(uploadResults).replace(/\\/g, "/");
    report.failures.push("Upload stopped after failure");
    return report;
  }

  const finalKeys = await listDocumentsObjectKeys(client, bucketName);
  report.objectCountAfter = finalKeys.length;
  const finalKeySet = new Set(finalKeys);

  for (const entry of approved) {
    if (finalKeySet.has(entry.targetObjectKey)) {
      report.expectedObjectKeysFound.push(entry.targetObjectKey);
    }
  }

  report.unexpectedObjectKeys = finalKeys.filter((key) => !approvedKeySet.has(key));
  report.bdsFnd001InBucket = finalKeys.some(
    (key) => key.includes("BDS-FND-001") || key.includes("bds-fnd-001"),
  );

  if (report.objectCountAfter !== 37) {
    report.failures.push(`Object count after upload expected 37, got ${report.objectCountAfter}`);
  }
  if (report.expectedObjectKeysFound.length !== 37) {
    report.failures.push(`Expected object keys found ${report.expectedObjectKeysFound.length}/37`);
  }
  if (report.unexpectedObjectKeys.length) {
    report.failures.push(`Unexpected object keys after upload: ${report.unexpectedObjectKeys.join(", ")}`);
  }
  if (report.bdsFnd001InBucket) {
    report.failures.push("BDS-FND-001 found in private bucket");
  }

  const verifiedEntries: SupabaseUploadedManifestEntry[] = [];
  for (const entry of approved) {
    try {
      const downloaded = await downloadObject(client, bucketName, entry.targetObjectKey);
      const downloadedSha256 = sha256Buffer(downloaded);
      const checksumMatch = downloadedSha256 === entry.sha256;
      const validPdf = isPdfBuffer(downloaded);

      if (!checksumMatch) report.checksumMismatches.push(entry.officialDocumentId);
      if (!validPdf) report.invalidPdfSignatures.push(entry.officialDocumentId);

      const prior = uploadResults.find((item) => item.officialDocumentId === entry.officialDocumentId);
      verifiedEntries.push({
        ...entry,
        downloadedSha256,
        checksumMatch,
        uploadStatus: prior?.uploadStatus === "skipped-existing" ? "skipped-existing" : "success",
      });
    } catch (err) {
      report.failures.push(
        `Post-upload verification failed for ${entry.officialDocumentId}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
      verifiedEntries.push({
        ...entry,
        downloadedSha256: "",
        checksumMatch: false,
        uploadStatus: "failed",
        uploadError: err instanceof Error ? err.message : "unknown error",
      });
    }
  }

  report.uploadedManifestPath = writeUploadedManifest(verifiedEntries).replace(/\\/g, "/");

  if (report.checksumMismatches.length) {
    report.failures.push(`Checksum mismatches: ${report.checksumMismatches.join(", ")}`);
  }
  if (report.invalidPdfSignatures.length) {
    report.failures.push(`Invalid PDF signatures: ${report.invalidPdfSignatures.join(", ")}`);
  }

  const bucketAfter = await getBucketInfo(client, bucketName);
  report.bucketPrivate = bucketAfter.public === false;
  if (!report.bucketPrivate) {
    report.failures.push("Bucket became public after upload");
  }

  report.publicDocumentsUploaded = [...report.successfulUploads, ...report.skippedExisting].filter((id) => {
    const doc = BITCRAFTLY_DOCUMENTS.find((item) => item.documentId === id);
    return doc?.visibility === "PUBLIC";
  });

  report.ok = report.failures.length === 0;
  return report;
}
