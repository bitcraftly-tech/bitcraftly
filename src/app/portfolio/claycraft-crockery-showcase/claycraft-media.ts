/**
 * ClayCraft editorial media library.
 * Closed set of warm ceramic / tableware photographs with shared grading.
 * Prefer these over ad-hoc Unsplash IDs so the storefront feels like one shoot.
 */

export const CLAYCRAFT_MEDIA = {
  dinnerGold: 'photo-1550851405-a82adf80b299',
  plateSpeckled: 'photo-1578749556568-bc2c40e68b61',
  bowlCream: 'photo-1610701596007-11502861dcfa',
  mugSatin: 'photo-1514228742587-6b1558fcca3d',
  serveCovered: 'photo-1603190287605-e6ade32fa852',
  dinnerSpeckled: 'photo-1518719161176-290f990bf5b7',
  teaAmber: 'photo-1571934811356-5cc061b6821f',
  plateLinen: 'photo-1565193566173-7a0ee3dbe261',
  ceramicStack: 'photo-1581783342308-f792dbdd27c5',
  vaseOlive: 'photo-1616046229478-9901c5536a45',
  tableSetting: 'photo-1414235077428-338989a2e8c0',
  kitchenWarm: 'photo-1556910103-1c02745aae4d',
  glassWarm: 'photo-1563245372-f21724e3856d',
  shelfStudio: 'photo-1604719312566-8912e9227c6a',
  platedWarm: 'photo-1467003909585-2f8a72700288',
} as const;

export type ClayCraftMediaKey = keyof typeof CLAYCRAFT_MEDIA;

/** Shared imgix grading — warm, soft, editorial */
const GRADE = 'auto=format&fit=crop&sat=-12&exp=4&con=-5&q=82';

export function claycraftMediaUrl(key: ClayCraftMediaKey, size = 960): string {
  const id = CLAYCRAFT_MEDIA[key];
  return `https://images.unsplash.com/${id}?${GRADE}&w=${size}&h=${size}`;
}

export function claycraftMediaGallery(
  primary: ClayCraftMediaKey,
  extras: readonly ClayCraftMediaKey[],
  size = 960,
): readonly string[] {
  return [primary, ...extras].map((key) => claycraftMediaUrl(key, size));
}
