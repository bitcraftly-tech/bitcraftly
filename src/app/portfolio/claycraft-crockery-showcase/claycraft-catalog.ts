import { ccCategoryPath, ccCollectionPath } from './claycraft-paths';

export type ClayCraftCategory = {
  id: string;
  title: string;
  countLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
};

const CATEGORY_IMAGE_BASE = '/claycraft/categories';
/** Bump when packshots are re-shot so Next's image cache picks up new files. */
const CATEGORY_IMAGE_VERSION = 'v4';

const categoryImage = (filename: string): string =>
  `${CATEGORY_IMAGE_BASE}/${filename.replace('.png', `-${CATEGORY_IMAGE_VERSION}.png`)}`;

export const CLAYCRAFT_CATEGORIES: readonly ClayCraftCategory[] = [
  {
    id: 'dinner-sets',
    title: 'Dinner Sets',
    countLabel: '12+ Items',
    href: ccCategoryPath('dinner-sets'),
    image: categoryImage('dinner-sets.png'),
    imageAlt: 'Stacked speckled dinner plates with a bowl and gold-rimmed cup on top',
    description: 'Complete dining ensembles for everyday and occasion.',
  },
  {
    id: 'plates',
    title: 'Plates',
    countLabel: '36+ Items',
    href: ccCategoryPath('plates'),
    image: categoryImage('plates.png'),
    imageAlt: 'Two speckled ceramic plates with gold rims',
    description: 'Dinner, salad, and dessert plates in refined finishes.',
  },
  {
    id: 'bowls',
    title: 'Bowls',
    countLabel: '24+ Items',
    href: ccCategoryPath('bowls'),
    image: categoryImage('bowls.png'),
    imageAlt: 'Two stacked speckled ceramic bowls',
    description: 'Serving and individual bowls with warm, tactile glazes.',
  },
  {
    id: 'mugs',
    title: 'Mugs',
    countLabel: '18+ Items',
    href: ccCategoryPath('mugs'),
    image: categoryImage('mugs.png'),
    imageAlt: 'Speckled ceramic mug with a rustic rim',
    description: 'Morning coffee cups and tea mugs built for daily ritual.',
  },
  {
    id: 'tea-sets',
    title: 'Tea Sets',
    countLabel: '20+ Items',
    href: ccCategoryPath('tea-sets'),
    image: categoryImage('tea-sets.png'),
    imageAlt: 'Speckled ceramic teapot with two cups on saucers',
    description: 'Teapots, cups, and trays for unhurried afternoons.',
  },
  {
    id: 'serveware',
    title: 'Serveware',
    countLabel: '28+ Items',
    href: ccCategoryPath('serveware'),
    image: categoryImage('serveware.png'),
    imageAlt: 'Covered serving tureen with gold trim on a matching platter',
    description: 'Platters, tureens, and serving pieces for the host.',
  },
  {
    id: 'glassware',
    title: 'Glassware',
    countLabel: '22+ Items',
    href: ccCategoryPath('glassware'),
    image: categoryImage('glassware.png'),
    imageAlt: 'Two cut-crystal wine glasses beside a matching tumbler',
    description: 'Stemware and tumblers with quiet, modern clarity.',
  },
  {
    id: 'table-decor',
    title: 'Table Decor',
    countLabel: '14+ Items',
    href: ccCategoryPath('table-decor'),
    image: categoryImage('table-decor.png'),
    imageAlt: 'Ceramic vase of white flowers beside a taper candle in a ceramic holder',
    description: 'Vases, candles, and accents that complete the table.',
  },
] as const;

/** @deprecated Prefer CLAYCRAFT_CATEGORIES */
export const CLAYCRAFT_HERO_CATEGORIES = CLAYCRAFT_CATEGORIES;

export function getCategoryById(id: string): ClayCraftCategory | undefined {
  return CLAYCRAFT_CATEGORIES.find((c) => c.id === id);
}

export type ClayCraftCollection = {
  id: string;
  title: string;
  tagline: string;
  href: string;
  image: string;
  imageAlt: string;
  tone: 'minimal' | 'rustic' | 'luxury' | 'glass';
  description: string;
};

export const CLAYCRAFT_COLLECTIONS: readonly ClayCraftCollection[] = [
  {
    id: 'scandinavian-minimal',
    title: 'Scandinavian Minimal Collection',
    tagline: 'Clean. Simple. Timeless.',
    href: ccCollectionPath('scandinavian-minimal'),
    image: categoryImage('plates.png'),
    imageAlt: 'Two speckled ceramic plates with gold rims',
    tone: 'minimal',
    description: 'Soft neutrals and quiet forms for contemporary tables.',
  },
  {
    id: 'rustic-stoneware',
    title: 'Rustic Stoneware Collection',
    tagline: 'Earthy textures, natural beauty.',
    href: ccCollectionPath('rustic-stoneware'),
    image: categoryImage('bowls.png'),
    imageAlt: 'Two stacked speckled ceramic bowls',
    tone: 'rustic',
    description: 'Hand-thrown character with warm, organic glazes.',
  },
  {
    id: 'luxury-bone-china',
    title: 'Luxury Bone China Collection',
    tagline: 'Finest quality for special moments.',
    href: ccCollectionPath('luxury-bone-china'),
    image: categoryImage('tea-sets.png'),
    imageAlt: 'Speckled ceramic teapot with two cups on saucers',
    tone: 'luxury',
    description: 'Refined bone china with delicate gold accents.',
  },
  {
    id: 'crystal-glassware',
    title: 'Crystal Glassware Collection',
    tagline: 'Clarity and elegance in every sip.',
    href: ccCollectionPath('crystal-glassware'),
    image: categoryImage('glassware.png'),
    imageAlt: 'Two cut-crystal wine glasses beside a matching tumbler',
    tone: 'glass',
    description: 'Stemware and tumblers with quiet, modern clarity.',
  },
] as const;

export function getCollectionById(id: string): ClayCraftCollection | undefined {
  return CLAYCRAFT_COLLECTIONS.find((c) => c.id === id);
}
