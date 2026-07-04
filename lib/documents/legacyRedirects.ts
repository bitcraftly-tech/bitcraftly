/** Legacy slugs from pre-normalization registry — redirect to canonical slugs */
export const LEGACY_DOCUMENT_SLUG_REDIRECTS: Record<string, string> = {
  "bds-gov-001-corporate-governance": "bds-gov-002",
  "bds-gov-001-documentation-governance": "bds-gov-001",
  "bds-tpl-001-official-master": "bds-tpl-001",
  "bds-tpl-001-business-commercial": "bds-tpl-002",
};

export function resolveDocumentSlug(slug: string): string {
  let current = slug;
  const seen = new Set<string>();
  while (LEGACY_DOCUMENT_SLUG_REDIRECTS[current] && !seen.has(current)) {
    seen.add(current);
    current = LEGACY_DOCUMENT_SLUG_REDIRECTS[current];
  }
  return current;
}
