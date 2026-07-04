/**
 * One-time / repeatable sync: copy official BDS PDFs from local source into project storage.
 * Does NOT modify source files.
 *
 * Usage: node scripts/sync-bitcraftly-documents.mjs [sourceDir]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DEFAULT_SOURCE =
  "C:\\Users\\uidev\\Downloads\\Bitcraftly_Official_38_Documents_Complete\\Bitcraftly_Official_38_Documents";

/** @type {Record<string, string>} prefix -> storage subfolder */
const PREFIX_FOLDER = {
  "BDS-FND": "foundation",
  "BDS-STR": "strategy",
  "BDS-MKT": "marketing",
  "BDS-SAL": "sales",
  "BDS-OPS": "operations",
  "BDS-TEC": "technology",
  "BDS-SEC": "security",
  "BDS-PRV": "privacy",
  "BDS-BCP": "continuity",
  "BDS-LEG": "legal",
  "BDS-FIN": "finance",
  "BDS-HR": "hr",
  "BDS-QMS": "quality",
  "BDS-GOV": "governance",
  "BDS-TPL": "templates",
};

/** Maps source Downloads filenames → canonical project-storage filenames */
const SOURCE_TO_STORAGE_FILENAME = {
  "BDS-GOV-001_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf":
    "BDS-GOV-002_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf",
  "BDS-GOV-002_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf":
    "BDS-GOV-003_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf",
  "BDS-TPL-001_Business_and_Commercial_Templates_Pack_v1.0.pdf":
    "BDS-TPL-002_Business_and_Commercial_Templates_Pack_v1.0.pdf",
  "BDS-TPL-002_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf":
    "BDS-TPL-003_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf",
  "BDS-TPL-003_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf":
    "BDS-TPL-004_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf",
  "BDS-TPL-004_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf":
    "BDS-TPL-005_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf",
  "BDS-TPL-005_People_and_Workforce_Templates_Pack_v1.0.pdf":
    "BDS-TPL-006_People_and_Workforce_Templates_Pack_v1.0.pdf",
  "BDS-TPL-006_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf":
    "BDS-TPL-007_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf",
  "BDS-TPL-007_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf":
    "BDS-TPL-008_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf",
};

/** Canonical storage filenames approved for public static copy */
const PUBLIC_STORAGE_FILENAMES = new Set([
  "BDS-FND-001_Bitcraftly_Vision_Mission_Purpose_Values_v1.0.pdf",
]);

function storageFilename(sourceFilename) {
  return SOURCE_TO_STORAGE_FILENAME[sourceFilename] ?? sourceFilename;
}

function extractDocId(filename) {
  const m = filename.match(/^(BDS-[A-Z]+-\d+)/);
  return m ? m[1] : null;
}

function folderForStorageFilename(storageName) {
  const docId = extractDocId(storageName);
  if (!docId) return null;
  const key = Object.keys(PREFIX_FOLDER).find((p) => docId.startsWith(p));
  return key ? PREFIX_FOLDER[key] : null;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  if (fs.existsSync(dest)) {
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);
    if (srcStat.size === destStat.size && srcStat.mtimeMs <= destStat.mtimeMs + 1000) {
      return { status: "skipped-existing", src, dest };
    }
    throw new Error(`Refusing to overwrite existing file: ${dest}`);
  }
  fs.copyFileSync(src, dest);
  return { status: "copied", src, dest };
}

function main() {
  const sourceDir = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SOURCE;

  if (!fs.existsSync(sourceDir)) {
    console.error(`Source folder not found: ${sourceDir}`);
    process.exit(1);
  }

  const pdfs = fs
    .readdirSync(sourceDir)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort();

  console.log(`Source: ${sourceDir}`);
  console.log(`PDF count: ${pdfs.length}`);

  if (pdfs.length !== 38) {
    console.error(`Expected 38 PDFs, found ${pdfs.length}`);
    process.exit(1);
  }

  const docIds = pdfs.map((f) => extractDocId(storageFilename(f)));
  const dupes = docIds.filter((id, i) => docIds.indexOf(id) !== i);
  const uniqueDupes = [...new Set(dupes.filter(Boolean))];
  if (uniqueDupes.length) {
    console.error(`Duplicate canonical document IDs after normalization: ${uniqueDupes.join(", ")}`);
    process.exit(1);
  }

  const internalRoot = path.join(ROOT, "storage", "documents", "internal");
  const publicRoot = path.join(ROOT, "public", "documents", "public");
  ensureDir(internalRoot);
  ensureDir(publicRoot);

  const results = { copied: 0, skipped: 0, public: 0, failed: [] };

  for (const sourceFilename of pdfs) {
    const storageName = storageFilename(sourceFilename);
    const folder = folderForStorageFilename(storageName);
    if (!folder) {
      results.failed.push({ filename: sourceFilename, reason: "unknown prefix" });
      continue;
    }

    const src = path.join(sourceDir, sourceFilename);
    const internalDest = path.join(internalRoot, folder, storageName);

    try {
      ensureDir(path.dirname(internalDest));
      const r = copyFile(src, internalDest);
      if (r.status === "copied") results.copied += 1;
      else results.skipped += 1;

      if (PUBLIC_STORAGE_FILENAMES.has(storageName)) {
        const publicDest = path.join(publicRoot, storageName);
        const pr = copyFile(src, publicDest);
        if (pr.status === "copied") results.public += 1;
      }
    } catch (err) {
      results.failed.push({ filename: sourceFilename, reason: err instanceof Error ? err.message : String(err) });
    }
  }

  const internalCount = fs
    .readdirSync(internalRoot, { recursive: true })
    .filter((f) => String(f).toLowerCase().endsWith(".pdf")).length;

  console.log(JSON.stringify({ ...results, internalStored: internalCount }, null, 2));

  if (results.failed.length) {
    process.exit(1);
  }
  if (internalCount !== 38) {
    console.error(`Internal storage count mismatch: ${internalCount} !== 38`);
    process.exit(1);
  }
}

main();
