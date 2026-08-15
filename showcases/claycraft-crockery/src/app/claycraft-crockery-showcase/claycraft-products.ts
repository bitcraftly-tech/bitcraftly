import { formatClayCraftPrice } from './claycraft-commerce';

export type ClayCraftBadge = {
  label: string;
  tone: 'sale' | 'new';
};

export type ClayCraftColorOption = {
  id: string;
  name: string;
  hex: string;
};

export type ClayCraftReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export type ClayCraftProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  collectionIds: readonly string[];
  image: string;
  imageAlt: string;
  images: readonly string[];
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  badge?: ClayCraftBadge;
  inStock: boolean;
  stockLabel: string;
  colors: readonly ClayCraftColorOption[];
  sizes: readonly string[];
  specs: readonly { label: string; value: string }[];
  reviews: readonly ClayCraftReview[];
  shippingNote: string;
};

/** Local packshots under `/public/claycraft/categories`. */
const CATEGORY_IMAGE_BASE = '/claycraft/categories';

export type ClayCraftCategoryImageId =
  | 'dinner-sets'
  | 'plates'
  | 'bowls'
  | 'mugs'
  | 'tea-sets'
  | 'serveware'
  | 'glassware'
  | 'table-decor';

/** Bump when packshots are re-shot so Next's image cache picks up new files. */
const CATEGORY_IMAGE_VERSION = 'v4';

const categoryImage = (id: ClayCraftCategoryImageId): string =>
  `${CATEGORY_IMAGE_BASE}/${id}-${CATEGORY_IMAGE_VERSION}.png`;

/** Primary + related packshots for PDP / quick-view galleries. */
const RELATED_CATEGORY_IMAGES: Record<
  ClayCraftCategoryImageId,
  readonly ClayCraftCategoryImageId[]
> = {
  'dinner-sets': ['dinner-sets', 'plates', 'bowls'],
  plates: ['plates', 'dinner-sets', 'bowls'],
  bowls: ['bowls', 'plates', 'serveware'],
  mugs: ['mugs', 'tea-sets', 'bowls'],
  'tea-sets': ['tea-sets', 'mugs', 'dinner-sets'],
  serveware: ['serveware', 'dinner-sets', 'bowls'],
  glassware: ['glassware', 'dinner-sets', 'table-decor'],
  'table-decor': ['table-decor', 'dinner-sets', 'plates'],
};

const gallery = (primary: ClayCraftCategoryImageId): readonly string[] =>
  RELATED_CATEGORY_IMAGES[primary].map(categoryImage);

const COLORS = {
  ivory: { id: 'ivory', name: 'Ivory', hex: '#F5F0E8' },
  sand: { id: 'sand', name: 'Sand', hex: '#D4C4A8' },
  stone: { id: 'stone', name: 'Stone', hex: '#A89888' },
  charcoal: { id: 'charcoal', name: 'Charcoal', hex: '#4A433C' },
  sage: { id: 'sage', name: 'Sage', hex: '#9AAB95' },
  gold: { id: 'gold', name: 'Gold Rim', hex: '#B88A44' },
} as const;

function product(
  partial: Omit<
    ClayCraftProduct,
    'images' | 'reviews' | 'shippingNote' | 'inStock' | 'stockLabel'
  > &
    Partial<
      Pick<ClayCraftProduct, 'images' | 'reviews' | 'shippingNote' | 'inStock' | 'stockLabel'>
    >,
): ClayCraftProduct {
  const images = partial.images ?? [partial.image, partial.image, partial.image];
  return {
    inStock: true,
    stockLabel: 'In stock — ships in 2–4 days',
    shippingNote: 'Free shipping on orders above ₹999. Easy 30-day returns.',
    reviews: partial.reviews ?? [
      {
        id: `${partial.id}-r1`,
        name: 'Ananya S.',
        rating: 5,
        text: 'Beautiful quality and packaging. Looks even better in person.',
        date: '2026-05-12',
      },
      {
        id: `${partial.id}-r2`,
        name: 'Rohit M.',
        rating: 4,
        text: 'Elegant finish. Feels premium for everyday dining.',
        date: '2026-04-02',
      },
    ],
    ...partial,
    images,
  };
}

export const CLAYCRAFT_PRODUCTS: readonly ClayCraftProduct[] = [
  product({
    id: 'royal-white-dinner-set',
    slug: 'royal-white-dinner-set',
    title: 'Royal White Dinner Set (24 Pieces)',
    description:
      'A complete 24-piece bone china dinner set with soft ivory glaze and delicate gold rim detailing. Designed for both weekday dinners and formal entertaining.',
    categoryId: 'dinner-sets',
    collectionIds: ['luxury-bone-china'],
    image: categoryImage('dinner-sets'),
    imageAlt: 'White ceramic dinnerware set on a table',
    images: gallery('dinner-sets'),
    price: 10499,
    compareAt: 12999,
    rating: 4.5,
    reviewCount: 245,
    badge: { label: '-20%', tone: 'sale' },
    colors: [COLORS.ivory, COLORS.gold],
    sizes: ['24-piece'],
    specs: [
      { label: 'Material', value: 'Bone china' },
      { label: 'Pieces', value: '24' },
      { label: 'Microwave', value: 'Safe (no gold rim pieces)' },
      { label: 'Dishwasher', value: 'Gentle cycle' },
    ],
  }),
  product({
    id: 'handmade-ceramic-plate',
    slug: 'handmade-ceramic-plate',
    title: 'Handmade Ceramic Dinner Plate',
    description: 'Artisan-thrown dinner plate with a soft speckled glaze and gently irregular rim.',
    categoryId: 'plates',
    collectionIds: ['scandinavian-minimal', 'rustic-stoneware'],
    image: categoryImage('plates'),
    imageAlt: 'Handmade ceramic dinner plate',
    images: gallery('plates'),
    price: 1999,
    compareAt: 2499,
    rating: 4.5,
    reviewCount: 189,
    badge: { label: '-15%', tone: 'sale' },
    colors: [COLORS.ivory, COLORS.sand, COLORS.sage],
    sizes: ['Dinner 27cm', 'Salad 22cm'],
    specs: [
      { label: 'Material', value: 'Stoneware' },
      { label: 'Diameter', value: '27 cm' },
      { label: 'Origin', value: 'Handcrafted India' },
    ],
  }),
  product({
    id: 'minimal-stoneware-bowl',
    slug: 'minimal-stoneware-bowl',
    title: 'Minimal Stoneware Bowl',
    description:
      'Deep serving bowl with a matte cream glaze — ideal for salads, pasta, and sharing plates.',
    categoryId: 'bowls',
    collectionIds: ['scandinavian-minimal', 'rustic-stoneware'],
    image: categoryImage('bowls'),
    imageAlt: 'Minimal cream stoneware bowl',
    images: gallery('bowls'),
    price: 1499,
    rating: 4.5,
    reviewCount: 112,
    colors: [COLORS.ivory, COLORS.stone],
    sizes: ['Medium', 'Large'],
    specs: [
      { label: 'Material', value: 'Stoneware' },
      { label: 'Capacity', value: '1.2 L' },
    ],
  }),
  product({
    id: 'elegant-ceramic-mug',
    slug: 'elegant-ceramic-mug',
    title: 'Elegant Ceramic Mug (Set of 2)',
    description:
      'Pair of comfortably weighted mugs with a soft satin glaze and tapered silhouette.',
    categoryId: 'mugs',
    collectionIds: ['scandinavian-minimal'],
    image: categoryImage('mugs'),
    imageAlt: 'Elegant ceramic mug',
    images: gallery('mugs'),
    price: 1799,
    compareAt: 2299,
    rating: 4.5,
    reviewCount: 98,
    colors: [COLORS.ivory, COLORS.charcoal, COLORS.sage],
    sizes: ['350 ml'],
    specs: [
      { label: 'Material', value: 'Ceramic' },
      { label: 'Set', value: '2 mugs' },
      { label: 'Capacity', value: '350 ml' },
    ],
  }),
  product({
    id: 'luxury-serveware-set',
    slug: 'luxury-serveware-set',
    title: 'Luxury Serveware Set (5 Pieces)',
    description:
      'Five-piece host set including covered dish, platter, and serving bowls in warm white.',
    categoryId: 'serveware',
    collectionIds: ['luxury-bone-china'],
    image: categoryImage('serveware'),
    imageAlt: 'Luxury ceramic serveware set',
    images: gallery('serveware'),
    price: 7499,
    rating: 4,
    reviewCount: 76,
    badge: { label: 'NEW', tone: 'new' },
    colors: [COLORS.ivory, COLORS.gold],
    sizes: ['5-piece'],
    specs: [
      { label: 'Material', value: 'Fine ceramic' },
      { label: 'Pieces', value: '5' },
    ],
  }),
  product({
    id: 'speckled-dinner-set',
    slug: 'speckled-dinner-set',
    title: 'Speckled Ceramic Dinner Set (16 Pcs)',
    description: 'Sixteen-piece speckled set with a lived-in, gallery-inspired glaze.',
    categoryId: 'dinner-sets',
    collectionIds: ['rustic-stoneware'],
    image: categoryImage('dinner-sets'),
    imageAlt: 'Speckled ceramic dinner set',
    images: gallery('dinner-sets'),
    price: 12499,
    compareAt: 14999,
    rating: 4.5,
    reviewCount: 63,
    badge: { label: '-10%', tone: 'sale' },
    colors: [COLORS.sand, COLORS.stone],
    sizes: ['16-piece'],
    specs: [
      { label: 'Material', value: 'Stoneware' },
      { label: 'Pieces', value: '16' },
    ],
  }),
  product({
    id: 'linen-white-salad-plate',
    slug: 'linen-white-salad-plate',
    title: 'Linen White Salad Plate',
    description: 'Lightweight salad plate with a linen-soft matte finish.',
    categoryId: 'plates',
    collectionIds: ['scandinavian-minimal'],
    image: categoryImage('plates'),
    imageAlt: 'White salad plate',
    images: gallery('plates'),
    price: 1299,
    rating: 4.3,
    reviewCount: 54,
    colors: [COLORS.ivory],
    sizes: ['22 cm'],
    specs: [
      { label: 'Material', value: 'Porcelain' },
      { label: 'Diameter', value: '22 cm' },
    ],
  }),
  product({
    id: 'amber-tea-set',
    slug: 'amber-tea-set',
    title: 'Amber Glow Tea Set',
    description: 'Teapot with four cups in a warm amber glaze — designed for slow Sunday rituals.',
    categoryId: 'tea-sets',
    collectionIds: ['rustic-stoneware'],
    image: categoryImage('tea-sets'),
    imageAlt: 'Tea set with teapot and cups',
    images: gallery('tea-sets'),
    price: 4599,
    compareAt: 5299,
    rating: 4.7,
    reviewCount: 88,
    badge: { label: '-13%', tone: 'sale' },
    colors: [COLORS.sand, COLORS.gold],
    sizes: ['5-piece'],
    specs: [
      { label: 'Material', value: 'Ceramic' },
      { label: 'Includes', value: 'Teapot + 4 cups' },
    ],
  }),
  product({
    id: 'crystal-stemware-pair',
    slug: 'crystal-stemware-pair',
    title: 'Crystal Stemware Pair',
    description: 'Two slender wine glasses with a clear, weightless feel.',
    categoryId: 'glassware',
    collectionIds: ['crystal-glassware', 'scandinavian-minimal'],
    image: categoryImage('glassware'),
    imageAlt: 'Two cut-crystal wine glasses beside a matching tumbler',
    images: gallery('glassware'),
    price: 2499,
    rating: 4.6,
    reviewCount: 71,
    colors: [{ id: 'clear', name: 'Clear', hex: '#E8EEF2' }],
    sizes: ['350 ml'],
    specs: [
      { label: 'Material', value: 'Crystal glass' },
      { label: 'Set', value: '2 glasses' },
    ],
  }),
  product({
    id: 'olive-branch-vase',
    slug: 'olive-branch-vase',
    title: 'Olive Branch Ceramic Vase',
    description: 'Sculptural white vase sized for sprigs, dried blooms, or a single stem.',
    categoryId: 'table-decor',
    collectionIds: ['scandinavian-minimal', 'luxury-bone-china'],
    image: categoryImage('table-decor'),
    imageAlt: 'Speckled ceramic vase holding white flowers and greenery',
    images: gallery('table-decor'),
    price: 2199,
    rating: 4.4,
    reviewCount: 41,
    badge: { label: 'NEW', tone: 'new' },
    colors: [COLORS.ivory, COLORS.sage],
    sizes: ['Tall 28cm'],
    specs: [
      { label: 'Material', value: 'Ceramic' },
      { label: 'Height', value: '28 cm' },
    ],
  }),
  product({
    id: 'nesting-bowl-trio',
    slug: 'nesting-bowl-trio',
    title: 'Nesting Bowl Trio',
    description: 'Three nesting bowls for prep, serving, and everyday use.',
    categoryId: 'bowls',
    collectionIds: ['scandinavian-minimal'],
    image: categoryImage('bowls'),
    imageAlt: 'Set of nesting ceramic bowls',
    images: gallery('bowls'),
    price: 3299,
    rating: 4.5,
    reviewCount: 59,
    colors: [COLORS.ivory, COLORS.sand],
    sizes: ['S / M / L'],
    specs: [
      { label: 'Material', value: 'Stoneware' },
      { label: 'Pieces', value: '3' },
    ],
  }),
  product({
    id: 'gold-rim-charger',
    slug: 'gold-rim-charger',
    title: 'Gold Rim Charger Plate',
    description: 'Statement charger with a brushed gold rim for layered place settings.',
    categoryId: 'plates',
    collectionIds: ['luxury-bone-china'],
    image: categoryImage('plates'),
    imageAlt: 'Gold rim charger plate',
    images: gallery('plates'),
    price: 2799,
    compareAt: 3199,
    rating: 4.8,
    reviewCount: 37,
    colors: [COLORS.ivory, COLORS.gold],
    sizes: ['33 cm'],
    specs: [
      { label: 'Material', value: 'Bone china' },
      { label: 'Hand wash', value: 'Recommended' },
    ],
  }),
  product({
    id: 'matte-black-mug',
    slug: 'matte-black-mug',
    title: 'Matte Charcoal Mug',
    description: 'Minimal charcoal mug with a soft matte exterior and glossy interior.',
    categoryId: 'mugs',
    collectionIds: ['scandinavian-minimal'],
    image: categoryImage('mugs'),
    imageAlt: 'Speckled ceramic mug with a gold rim in warm light',
    images: gallery('mugs'),
    price: 999,
    rating: 4.2,
    reviewCount: 120,
    colors: [COLORS.charcoal],
    sizes: ['320 ml'],
    specs: [
      { label: 'Material', value: 'Ceramic' },
      { label: 'Capacity', value: '320 ml' },
    ],
    inStock: true,
    stockLabel: 'Low stock — only 4 left',
  }),
  product({
    id: 'covered-serving-dish',
    slug: 'covered-serving-dish',
    title: 'Covered Ceramic Serving Dish',
    description: 'Covered serving dish that moves from oven to table with quiet elegance.',
    categoryId: 'serveware',
    collectionIds: ['rustic-stoneware'],
    image: categoryImage('serveware'),
    imageAlt: 'Covered ceramic serving dish',
    images: gallery('serveware'),
    price: 3899,
    rating: 4.4,
    reviewCount: 45,
    colors: [COLORS.sand, COLORS.stone],
    sizes: ['2.5 L'],
    specs: [
      { label: 'Material', value: 'Stoneware' },
      { label: 'Oven safe', value: 'Up to 220°C' },
    ],
  }),
  product({
    id: 'tumbler-set-four',
    slug: 'tumbler-set-four',
    title: 'Everyday Tumbler Set (4)',
    description: 'Stackable tumblers with a soft smoked tint for water and juice.',
    categoryId: 'glassware',
    collectionIds: ['crystal-glassware', 'scandinavian-minimal'],
    image: categoryImage('glassware'),
    imageAlt: 'Cut-crystal tumbler beside two wine glasses',
    images: gallery('glassware'),
    price: 1899,
    rating: 4.3,
    reviewCount: 66,
    colors: [{ id: 'smoke', name: 'Smoke', hex: '#C5C8CC' }],
    sizes: ['300 ml'],
    specs: [
      { label: 'Material', value: 'Glass' },
      { label: 'Set', value: '4 tumblers' },
    ],
  }),
  product({
    id: 'linen-candle-set',
    slug: 'linen-candle-set',
    title: 'Linen & Cedar Candle Duo',
    description: 'Two ceramic vessels with linen and cedar soy wax — made for long dinners.',
    categoryId: 'table-decor',
    collectionIds: ['luxury-bone-china'],
    image: categoryImage('table-decor'),
    imageAlt: 'Taper candle in a ceramic holder beside a vase of white flowers',
    images: gallery('table-decor'),
    price: 1699,
    rating: 4.6,
    reviewCount: 92,
    colors: [COLORS.ivory, COLORS.sand],
    sizes: ['Duo'],
    specs: [
      { label: 'Wax', value: 'Soy' },
      { label: 'Burn time', value: '35 hrs each' },
    ],
    inStock: false,
    stockLabel: 'Currently out of stock',
  }),
  product({
    id: 'porcelain-espresso-cups',
    slug: 'porcelain-espresso-cups',
    title: 'Porcelain Espresso Cups (Set of 4)',
    description: 'Petite porcelain espresso cups with matching saucers.',
    categoryId: 'tea-sets',
    collectionIds: ['luxury-bone-china', 'scandinavian-minimal'],
    image: categoryImage('tea-sets'),
    imageAlt: 'Ceramic cups on saucers beside a matching teapot',
    images: gallery('tea-sets'),
    price: 2899,
    rating: 4.5,
    reviewCount: 48,
    colors: [COLORS.ivory, COLORS.gold],
    sizes: ['80 ml'],
    specs: [
      { label: 'Material', value: 'Porcelain' },
      { label: 'Set', value: '4 cups + saucers' },
    ],
  }),
  product({
    id: 'family-dinner-set',
    slug: 'family-dinner-set',
    title: 'Family Gathering Dinner Set (32 Pcs)',
    description: 'Our largest dining set — plates, bowls, and mugs for eight.',
    categoryId: 'dinner-sets',
    collectionIds: ['luxury-bone-china'],
    image: categoryImage('dinner-sets'),
    imageAlt: 'Large family dinner set',
    images: gallery('dinner-sets'),
    price: 18999,
    compareAt: 22999,
    rating: 4.7,
    reviewCount: 29,
    badge: { label: '-17%', tone: 'sale' },
    colors: [COLORS.ivory],
    sizes: ['32-piece'],
    specs: [
      { label: 'Material', value: 'Bone china' },
      { label: 'Serves', value: '8 people' },
    ],
  }),
] as const;

/** Homepage best sellers — curated six across dinnerware + glassware */
const BEST_SELLER_IDS = [
  'royal-white-dinner-set',
  'handmade-ceramic-plate',
  'minimal-stoneware-bowl',
  'elegant-ceramic-mug',
  'luxury-serveware-set',
  'crystal-stemware-pair',
] as const;

export const CLAYCRAFT_BEST_SELLERS: readonly ClayCraftProduct[] = BEST_SELLER_IDS.map((id) => {
  const found = CLAYCRAFT_PRODUCTS.find((p) => p.id === id);
  if (!found) {
    throw new Error(`Missing best-seller product: ${id}`);
  }
  return found;
});

export function getProductBySlug(slug: string): ClayCraftProduct | undefined {
  return CLAYCRAFT_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductById(id: string): ClayCraftProduct | undefined {
  return CLAYCRAFT_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): ClayCraftProduct[] {
  return CLAYCRAFT_PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function getProductsByCollection(collectionId: string): ClayCraftProduct[] {
  return CLAYCRAFT_PRODUCTS.filter((p) => p.collectionIds.includes(collectionId));
}

export function searchProducts(query: string): ClayCraftProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...CLAYCRAFT_PRODUCTS];
  return CLAYCRAFT_PRODUCTS.filter((p) => {
    const hay =
      `${p.title} ${p.description} ${p.categoryId} ${p.collectionIds.join(' ')}`.toLowerCase();
    return hay.includes(q);
  });
}

export { formatClayCraftPrice };
