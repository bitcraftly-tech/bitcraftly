export type DocumentStorageProvider = "local" | "supabase";

const VALID_PROVIDERS = new Set<DocumentStorageProvider>(["local", "supabase"]);

/**
 * Resolves the active document storage provider from environment.
 * Development defaults to local when unset; production requires an explicit value.
 */
export function getDocumentStorageProvider(): DocumentStorageProvider {
  const raw = `${process.env.DOCUMENT_STORAGE_PROVIDER ?? ""}`.trim().toLowerCase();

  if (raw && VALID_PROVIDERS.has(raw as DocumentStorageProvider)) {
    return raw as DocumentStorageProvider;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DOCUMENT_STORAGE_PROVIDER must be set explicitly in production (local or supabase)",
    );
  }

  return "local";
}
