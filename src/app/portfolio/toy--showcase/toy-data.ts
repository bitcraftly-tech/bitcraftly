export type ToyAgeBand = '0-2' | '3-5' | '6-8' | '9+';

export type ToyCategory = 'stem' | 'soft' | 'outdoor' | 'creative' | 'vehicles';

export interface ToyProduct {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly price: number;
  readonly listPrice: number;
  readonly age: ToyAgeBand;
  readonly category: ToyCategory;
  readonly rating: number;
  readonly reviews: number;
  readonly badge?: string;
  readonly tone: string;
  readonly emoji: string;
}

export const TOY_BRAND = {
  name: 'PlayNest',
  tagline: 'Thoughtful toys for curious kids',
  phoneDisplay: '+91 96677 10954',
} as const;

export const TOY_NAV = [
  { label: 'Shop', href: '#shop' },
  { label: 'Ages', href: '#ages' },
  { label: 'Safety', href: '#safety' },
  { label: 'Why PlayNest', href: '#why' },
] as const;

export const TOY_CATEGORIES: readonly {
  readonly id: ToyCategory | 'all';
  readonly label: string;
}[] = [
  { id: 'all', label: 'All toys' },
  { id: 'stem', label: 'STEM' },
  { id: 'soft', label: 'Soft toys' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'creative', label: 'Creative' },
  { id: 'vehicles', label: 'Vehicles' },
] as const;

export const TOY_AGES: readonly {
  readonly id: ToyAgeBand | 'all';
  readonly label: string;
  readonly hint: string;
}[] = [
  { id: 'all', label: 'All ages', hint: 'Browse the full nest' },
  { id: '0-2', label: '0–2 yrs', hint: 'Sensory & soft firsts' },
  { id: '3-5', label: '3–5 yrs', hint: 'Play, pretend, discover' },
  { id: '6-8', label: '6–8 yrs', hint: 'Build, race, invent' },
  { id: '9+', label: '9+ yrs', hint: 'Challenge & craft' },
] as const;

export const TOY_PRODUCTS: readonly ToyProduct[] = [
  {
    id: 'orbit-blocks',
    name: 'Orbit Magnetic Blocks',
    blurb: '42-piece STEM set with soft-edge magnets and build cards.',
    price: 1899,
    listPrice: 2499,
    age: '3-5',
    category: 'stem',
    rating: 4.8,
    reviews: 312,
    badge: 'Bestseller',
    tone: 'toy-tone--coral',
    emoji: '🧲',
  },
  {
    id: 'cloud-bunny',
    name: 'Cloud Bunny Plush',
    blurb: 'OEKO-TEX certified plush with weighted base for little hugs.',
    price: 999,
    listPrice: 1299,
    age: '0-2',
    category: 'soft',
    rating: 4.9,
    reviews: 528,
    badge: 'New',
    tone: 'toy-tone--mint',
    emoji: '🐰',
  },
  {
    id: 'kite-runner',
    name: 'Skyline Balance Bike',
    blurb: 'Lightweight frame, quiet tires, and adjustable seat height.',
    price: 4299,
    listPrice: 5499,
    age: '3-5',
    category: 'outdoor',
    rating: 4.7,
    reviews: 184,
    tone: 'toy-tone--sky',
    emoji: '🚲',
  },
  {
    id: 'studio-palette',
    name: 'Studio Watercolor Kit',
    blurb: 'Non-toxic paints, bamboo brush set, and tear-resistant pad.',
    price: 1499,
    listPrice: 1899,
    age: '6-8',
    category: 'creative',
    rating: 4.6,
    reviews: 241,
    tone: 'toy-tone--sun',
    emoji: '🎨',
  },
  {
    id: 'turbo-track',
    name: 'Turbo Loop Race Track',
    blurb: 'Modular track with two pull-back cars and loop challenge.',
    price: 2499,
    listPrice: 3299,
    age: '6-8',
    category: 'vehicles',
    rating: 4.5,
    reviews: 167,
    badge: 'Hot',
    tone: 'toy-tone--coral',
    emoji: '🏎️',
  },
  {
    id: 'robo-buddy',
    name: 'Robo Buddy Coding Kit',
    blurb: 'Screen-free coding tiles that teach sequences and loops.',
    price: 3499,
    listPrice: 4299,
    age: '9+',
    category: 'stem',
    rating: 4.8,
    reviews: 98,
    tone: 'toy-tone--navy',
    emoji: '🤖',
  },
  {
    id: 'forest-friends',
    name: 'Forest Friends Set',
    blurb: 'Five soft woodland animals with a cotton play mat.',
    price: 1599,
    listPrice: 1999,
    age: '0-2',
    category: 'soft',
    rating: 4.7,
    reviews: 276,
    tone: 'toy-tone--mint',
    emoji: '🦊',
  },
  {
    id: 'spark-lab',
    name: 'Spark Science Lab',
    blurb: '20 safe experiments with guided cards for home labs.',
    price: 2199,
    listPrice: 2799,
    age: '9+',
    category: 'stem',
    rating: 4.6,
    reviews: 143,
    tone: 'toy-tone--sky',
    emoji: '🔬',
  },
] as const;

export const TOY_TRUST = [
  {
    title: 'BIS & ASTM tested',
    body: 'Every SKU ships with batch safety checks and clear age labels.',
  },
  {
    title: 'Parent-first packing',
    body: 'No sharp edges in carton, QR setup guide, spare parts on request.',
  },
  {
    title: 'Easy returns',
    body: '7-day swap window for unused toys — no awkward support loops.',
  },
] as const;

export const TOY_WHY = [
  {
    title: 'Curated, not cluttered',
    body: 'Fewer SKUs, higher play value — picked with educators and parents.',
  },
  {
    title: 'Honest age guidance',
    body: 'Filters by skill stage, not just marketing age numbers.',
  },
  {
    title: 'Checkout that parents trust',
    body: 'Clear delivery, COD-ready patterns, and gift-wrap without gimmicks.',
  },
] as const;

export function formatToyInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toyDiscountPct(price: number, listPrice: number): number {
  if (listPrice <= price) {
    return 0;
  }
  return Math.round(((listPrice - price) / listPrice) * 100);
}
