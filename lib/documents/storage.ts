import fs from "node:fs";
import path from "node:path";

import type { BitcraftlyDocument } from "@/types/documents";

const INTERNAL_ROOT = path.join(process.cwd(), "storage", "documents", "internal");

/** Resolve absolute filesystem path — registry-only, no user-supplied paths */
export function resolveInternalAbsolutePath(doc: BitcraftlyDocument): string {
  const normalized = doc.storagePath.replace(/\\/g, "/");
  if (normalized.includes("..") || !normalized.startsWith("storage/documents/internal/")) {
    throw new Error("Invalid document storage path");
  }
  const absolute = path.join(process.cwd(), normalized);
  const resolvedRoot = path.resolve(INTERNAL_ROOT);
  const resolvedFile = path.resolve(absolute);
  if (!resolvedFile.startsWith(resolvedRoot + path.sep) && resolvedFile !== resolvedRoot) {
    throw new Error("Path traversal blocked");
  }
  return resolvedFile;
}

export function internalDocumentExists(doc: BitcraftlyDocument): boolean {
  try {
    const filePath = resolveInternalAbsolutePath(doc);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}
