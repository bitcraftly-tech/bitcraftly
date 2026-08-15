/** ClayCraft demo lives under the Bitcraftly portfolio route (root `/` is protected). */
export const CLAYCRAFT_BASE = '/portfolio/claycraft-crockery-showcase' as const;

export function ccPath(path = ''): string {
  if (!path || path === '/') return CLAYCRAFT_BASE;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CLAYCRAFT_BASE}${normalized}`;
}

export function ccProductPath(slug: string): string {
  return ccPath(`/product/${slug}`);
}

export function ccCategoryPath(categoryId: string): string {
  return ccPath(`/shop/${categoryId}`);
}

export function ccCollectionPath(collectionId: string): string {
  return ccPath(`/collections/${collectionId}`);
}
