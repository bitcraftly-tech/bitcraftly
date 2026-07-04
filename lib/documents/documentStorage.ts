import "server-only";

export {
  documentExists,
  getDocument,
  getDocumentMetadata,
  resolveDocumentStorageProvider,
  type DocumentContent,
  type DocumentMetadata,
} from "@/lib/documents/documentStorageCore";
