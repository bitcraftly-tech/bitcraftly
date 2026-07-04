/**
 * Supabase private-document migration — dry-run and upload.
 *
 * Usage:
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-supabase-documents-dry-run.ts
 *   node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-supabase-documents-dry-run.ts --upload
 */
import fs from "node:fs";
import path from "node:path";

import {
  assertDryRunExpectations,
  runSupabaseMigrationDryRun,
  runSupabaseMigrationUpload,
  writeSupabaseMigrationManifest,
} from "../lib/documents/supabaseMigration.ts";

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
    if (!(key in process.env)) process.env[key] = value;
  }
}

async function main() {
  const uploadRequested = process.argv.includes("--upload");
  loadEnvLocal();

  if (uploadRequested) {
    const report = await runSupabaseMigrationUpload();
    console.log(
      JSON.stringify(
        {
          ok: report.ok,
          uploadCommand:
            "node --import ./scripts/register-path-alias.mjs --experimental-strip-types scripts/migrate-supabase-documents-dry-run.ts --upload",
          bucketName: report.bucketName,
          bucketPrivate: report.bucketPrivate,
          objectCountBefore: report.objectCountBefore,
          expectedUploads: report.expectedUploads,
          successfulUploads: report.successfulUploads.length,
          skippedExisting: report.skippedExisting.length,
          failedUploads: report.failedUploads,
          objectCountAfter: report.objectCountAfter,
          expectedObjectKeysFound: report.expectedObjectKeysFound.length,
          unexpectedObjectKeys: report.unexpectedObjectKeys,
          publicDocumentsUploaded: report.publicDocumentsUploaded,
          bdsFnd001InBucket: report.bdsFnd001InBucket,
          checksumMismatches: report.checksumMismatches,
          invalidPdfSignatures: report.invalidPdfSignatures,
          uploadedManifestPath: report.uploadedManifestPath,
          failures: report.failures,
        },
        null,
        2,
      ),
    );
    process.exit(report.ok ? 0 : 1);
    return;
  }

  const result = runSupabaseMigrationDryRun();
  const internalCount = result.selected.filter((doc) => doc.visibility === "INTERNAL").length;
  const futurePublicCount = result.selected.filter((doc) => doc.visibility === "FUTURE_PUBLIC").length;
  const failures = assertDryRunExpectations(result);
  const manifestPath = writeSupabaseMigrationManifest(result.manifest);

  console.log(
    JSON.stringify(
      {
        ok: failures.length === 0,
        registryTotal: result.stats.total,
        publicExcluded: result.publicExcluded.length,
        nonPublicSelected: result.selected.length,
        internalCount,
        futurePublicCount,
        missingSourceFiles: result.missingSourceFiles,
        duplicateOfficialIds: result.duplicateOfficialIds,
        duplicateObjectKeys: result.duplicateObjectKeys,
        invalidMimeTypes: result.invalidMimeTypes,
        filesOverLimit: result.filesOverLimit,
        manifestPath: manifestPath.replace(/\\/g, "/"),
        firstFiveObjectKeys: result.manifest.slice(0, 5).map((entry) => entry.targetObjectKey),
        failures,
      },
      null,
      2,
    ),
  );

  process.exit(failures.length === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Migration failed");
  process.exit(1);
});
