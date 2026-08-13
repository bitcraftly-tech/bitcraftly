export type ToyAgeBand = '0-12m' | '1-3' | '3-5' | '5-8' | '8-12' | '12+';

export type ToyCategory =
  | 'action'
  | 'blocks'
  | 'dolls'
  | 'educational'
  | 'rc'
  | 'arts'
  | 'baby'
  | 'outdoor'
  | 'games';

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
  readonly badgeTone?: 'sale' | 'new' | 'hot';
  readonly tone: string;
  readonly emoji: string;
  readonly image: string;
}

export const TOY_IMG = {
  heroBear: '/portfolio/toy-showcase/hero/toy-hero-bear.png',
  heroRings: '/portfolio/toy-showcase/hero/toy-hero-rings.png',
  heroTruck: '/portfolio/toy-showcase/hero/toy-hero-truck.png',
  heroComposition: '/portfolio/toy-showcase/hero/toy-hero-composition.png',
} as const;

export interface ToyHeroSlide {
  readonly id: string;
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly titleMiddle?: string;
  readonly titleGradient: string;
  readonly description: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
  readonly image: string;
  readonly imageAlt: string;
  readonly badgeTop: string;
  readonly badgeMain: string;
  readonly badgeBottom: string;
}

export const TOY_HERO_FEATURES = [
  { title: '100% Safe', desc: 'Kids Friendly', icon: 'safe' },
  { title: 'Premium Quality', desc: 'Durable & Tested', icon: 'quality' },
  { title: 'Made for Fun', desc: 'Learning through Play', icon: 'fun' },
] as const;

export const TOY_HERO_SLIDES: readonly ToyHeroSlide[] = [
  {
    id: 'play-joy',
    titleLead: 'Where',
    titleAccent: 'Play',
    titleMiddle: 'Inspires',
    titleGradient: 'Learning & Joy!',
    description: 'Explore our premium collection of toys for every age and every dream.',
    primaryCta: { label: 'Shop Now', href: '#shop' },
    secondaryCta: { label: 'Explore Collections', href: '#ages' },
    image: '/portfolio/toy-showcase/hero/toy-hero-composition.png',
    imageAlt: 'Teddy bear, rainbow stacking rings, toy truck, and building blocks',
    badgeTop: 'UP TO',
    badgeMain: '30%',
    badgeBottom: 'OFF',
  },
  {
    id: 'new-arrivals',
    titleLead: 'Discover',
    titleAccent: 'New',
    titleGradient: 'Arrivals Daily!',
    description: 'Fresh picks just landed — building sets, soft toys, and creative kits for curious kids.',
    primaryCta: { label: 'Shop New', href: '#shop' },
    secondaryCta: { label: 'Shop by Age', href: '#ages' },
    image: '/portfolio/toy-showcase/hero/toy-hero-slide-2.png',
    imageAlt: 'Building blocks castle, dolls accessories, and wooden puzzle toys',
    badgeTop: 'NEW',
    badgeMain: 'IN',
    badgeBottom: 'STORE',
  },
  {
    id: 'gifts',
    titleLead: 'Find the',
    titleAccent: 'Perfect',
    titleGradient: 'Gift Today!',
    description: 'From cuddly plush to STEM kits — thoughtful gifts that spark smiles and learning.',
    primaryCta: { label: 'Find Gifts', href: '#promos' },
    secondaryCta: { label: 'Best Sellers', href: '#shop' },
    image: '/portfolio/toy-showcase/hero/toy-hero-slide-3.png',
    imageAlt: 'Plush bunny, art kit, and STEM science kit gift set',
    badgeTop: 'GIFT',
    badgeMain: 'DEALS',
    badgeBottom: 'LIVE',
  },
  {
    id: 'active-play',
    titleLead: 'Go',
    titleAccent: 'Active',
    titleGradient: 'Play Outside!',
    description: 'RC cars, balance bikes, and outdoor fun — energy-packed toys for little adventurers.',
    primaryCta: { label: 'Shop Outdoor', href: '#shop' },
    secondaryCta: { label: 'View Deals', href: '#promos' },
    image: '/portfolio/toy-showcase/hero/toy-hero-slide-4.png',
    imageAlt: 'RC race car, balance bike, and outdoor play toys',
    badgeTop: 'UP TO',
    badgeMain: '25%',
    badgeBottom: 'OFF',
  },
] as const;

export const TOY_BRAND = {
  name: 'PlayNest',
  tagline: 'Toys that spark joy',
  phoneDisplay: '+91 96677 10954',
  phoneE164: '919667710954',
  email: 'hello@playnest.demo',
  logo: '/portfolio/toy-showcase/brand/playnest-logo.png',
} as const;

export const TOY_NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Shop', href: '#shop' },
  { label: 'New Arrivals', href: '#promos' },
  { label: 'Best Sellers', href: '#shop' },
  { label: 'Brands', href: '#brands' },
  { label: 'Age', href: '#ages' },
  { label: 'Deals', href: '#promos' },
  { label: 'Gift Finder', href: '#promos' },
] as const;

export const TOY_SIDEBAR_CATEGORIES: readonly {
  readonly id: ToyCategory;
  readonly label: string;
  readonly hint: string;
  readonly icon: 'bot' | 'blocks' | 'heart' | 'lightbulb' | 'car' | 'palette' | 'baby' | 'sun' | 'puzzle';
  readonly tone: 'violet' | 'coral' | 'rose' | 'sun' | 'sky' | 'mint' | 'peach' | 'blue' | 'lilac';
}[] = [
  {
    id: 'action',
    label: 'Action Heroes',
    hint: 'Figures & play sets',
    icon: 'bot',
    tone: 'violet',
  },
  {
    id: 'blocks',
    label: 'Build & Stack',
    hint: 'Blocks & bricks',
    icon: 'blocks',
    tone: 'coral',
  },
  {
    id: 'dolls',
    label: 'Dolls & Play',
    hint: 'Dolls & accessories',
    icon: 'heart',
    tone: 'rose',
  },
  {
    id: 'educational',
    label: 'Learn & Grow',
    hint: 'STEM & learning',
    icon: 'lightbulb',
    tone: 'sun',
  },
  {
    id: 'rc',
    label: 'RC Adventures',
    hint: 'Cars & remote toys',
    icon: 'car',
    tone: 'sky',
  },
  {
    id: 'arts',
    label: 'Arts Studio',
    hint: 'Crafts & colors',
    icon: 'palette',
    tone: 'mint',
  },
  {
    id: 'baby',
    label: 'Baby & Toddler',
    hint: 'Soft & sensory',
    icon: 'baby',
    tone: 'peach',
  },
  {
    id: 'outdoor',
    label: 'Outdoor Fun',
    hint: 'Active playtime',
    icon: 'sun',
    tone: 'blue',
  },
  {
    id: 'games',
    label: 'Games & Puzzles',
    hint: 'Family game night',
    icon: 'puzzle',
    tone: 'lilac',
  },
] as const;

export const TOY_AGES: readonly {
  readonly id: ToyAgeBand;
  readonly label: string;
  readonly emoji: string;
  readonly tone: string;
  readonly image: string;
}[] = [
  {
    id: '0-12m',
    label: '0 - 12 Months',
    emoji: '👶',
    tone: 'toy-age-tone--cream',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-0-12m.png',
  },
  {
    id: '1-3',
    label: '1 - 3 Years',
    emoji: '🧒',
    tone: 'toy-age-tone--mint',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-1-3.png',
  },
  {
    id: '3-5',
    label: '3 - 5 Years',
    emoji: '👧',
    tone: 'toy-age-tone--lavender',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-3-5.png',
  },
  {
    id: '5-8',
    label: '5 - 8 Years',
    emoji: '👦',
    tone: 'toy-age-tone--pink',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-5-8.png',
  },
  {
    id: '8-12',
    label: '8 - 12 Years',
    emoji: '🧑',
    tone: 'toy-age-tone--peach',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-8-12.png',
  },
  {
    id: '12+',
    label: '12+ Years',
    emoji: '🎓',
    tone: 'toy-age-tone--rose',
    image: '/portfolio/toy-showcase/age-groups/toy-age-v2-12plus.png',
  },
] as const;

export const TOY_SERVICES = [
  { title: 'Free Shipping', desc: 'On orders above ₹999', icon: 'truck' },
  { title: 'Easy Returns', desc: '7-day hassle-free returns', icon: 'refresh' },
  { title: 'Secure Payment', desc: '100% protected checkout', icon: 'shield' },
  { title: 'Top Brands', desc: 'Trusted global toy brands', icon: 'award' },
  { title: '24/7 Support', desc: 'Always here to help', icon: 'headset' },
] as const;

export const TOY_PROMOS = [
  {
    id: 'new',
    title: 'New Arrivals',
    desc: 'Fresh toys just for you!',
    cta: 'Explore Now',
    href: '#shop',
    tone: 'toy-promo--violet',
    image: '/portfolio/toy-showcase/promotional/toy-promo-robot.png',
    imageAlt: 'Teal toy robot',
  },
  {
    id: 'gift',
    title: 'Gift Finder',
    desc: 'Find the perfect gift for any age',
    cta: 'Find Gifts',
    href: '#ages',
    tone: 'toy-promo--pink',
    image: '/portfolio/toy-showcase/promotional/toy-promo-gift.png',
    imageAlt: 'Pink gift box with yellow bow',
  },
  {
    id: 'deal',
    title: 'Deal of the Day',
    desc: 'Up to 50% OFF on selected toys',
    cta: 'Shop Deals',
    href: '#shop',
    tone: 'toy-promo--sun',
    image: '/portfolio/toy-showcase/promotional/toy-promo-train.png',
    imageAlt: 'Colorful toy steam train',
  },
] as const;

export interface ToyBrandLogo {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly tone: 'soft' | 'mint' | 'lilac' | 'peach' | 'sky' | 'sun' | 'rose' | 'cream';
}

export const TOY_BRANDS: readonly ToyBrandLogo[] = [
  {
    id: 'lego',
    name: 'LEGO',
    logo: '/portfolio/toy-showcase/brands/brand-lego.png',
    tone: 'cream',
  },
  {
    id: 'barbie',
    name: 'Barbie',
    logo: '/portfolio/toy-showcase/brands/brand-barbie.png',
    tone: 'rose',
  },
  {
    id: 'fisher-price',
    name: 'Fisher-Price',
    logo: '/portfolio/toy-showcase/brands/brand-fisher-price.png',
    tone: 'peach',
  },
  {
    id: 'hot-wheels',
    name: 'Hot Wheels',
    logo: '/portfolio/toy-showcase/brands/brand-hot-wheels.png',
    tone: 'sun',
  },
  {
    id: 'nerf',
    name: 'NERF',
    logo: '/portfolio/toy-showcase/brands/brand-nerf.png',
    tone: 'sky',
  },
  {
    id: 'playmobil',
    name: 'playmobil',
    logo: '/portfolio/toy-showcase/brands/brand-playmobil.png',
    tone: 'mint',
  },
  {
    id: 'funskool',
    name: 'FUNSKOOL',
    logo: '/portfolio/toy-showcase/brands/brand-funskool.png',
    tone: 'lilac',
  },
  {
    id: 'hasbro',
    name: 'Hasbro',
    logo: '/portfolio/toy-showcase/brands/brand-hasbro.png',
    tone: 'soft',
  },
  {
    id: 'mattel',
    name: 'Mattel',
    logo: '/portfolio/toy-showcase/brands/brand-mattel.png',
    tone: 'peach',
  },
  {
    id: 'crayola',
    name: 'Crayola',
    logo: '/portfolio/toy-showcase/brands/brand-crayola.png',
    tone: 'sun',
  },
  {
    id: 'chicco',
    name: 'Chicco',
    logo: '/portfolio/toy-showcase/brands/brand-chicco.png',
    tone: 'sky',
  },
  {
    id: 'little-tikes',
    name: 'Little Tikes',
    logo: '/portfolio/toy-showcase/brands/brand-little-tikes.png',
    tone: 'mint',
  },
] as const;

export const TOY_PRODUCTS: readonly ToyProduct[] = [
  {
    id: 'rc-monster',
    name: 'RC Speed Monster Car',
    blurb: 'All-terrain remote control monster truck for outdoor thrills.',
    price: 1699,
    listPrice: 1999,
    age: '5-8',
    category: 'rc',
    rating: 4.8,
    reviews: 128,
    badge: '-15%',
    badgeTone: 'sale',
    tone: 'toy-tone--white',
    emoji: '🏎️',
    image: '/portfolio/toy-showcase/products/toy-bs-rc-car.png',
  },
  {
    id: 'classic-blocks',
    name: 'Classic Building Blocks',
    blurb: '80-piece wooden block set for creative builders.',
    price: 1299,
    listPrice: 1299,
    age: '3-5',
    category: 'blocks',
    rating: 4.9,
    reviews: 214,
    badge: 'NEW',
    badgeTone: 'new',
    tone: 'toy-tone--white',
    emoji: '🧱',
    image: '/portfolio/toy-showcase/products/toy-bs-blocks.png',
  },
  {
    id: 'huggable-teddy',
    name: 'Huggable Teddy Bear',
    blurb: 'Super-soft plush teddy for bedtime cuddles.',
    price: 899,
    listPrice: 1099,
    age: '0-12m',
    category: 'baby',
    rating: 4.7,
    reviews: 186,
    badge: '-20%',
    badgeTone: 'sale',
    tone: 'toy-tone--white',
    emoji: '🧸',
    image: '/portfolio/toy-showcase/products/toy-bs-teddy.png',
  },
  {
    id: 'art-craft-set',
    name: 'Art & Craft Set',
    blurb: 'Complete creative kit with paints, crayons, and brushes.',
    price: 1199,
    listPrice: 1499,
    age: '5-8',
    category: 'arts',
    rating: 4.6,
    reviews: 97,
    badge: '-18%',
    badgeTone: 'sale',
    tone: 'toy-tone--white',
    emoji: '🎨',
    image: '/portfolio/toy-showcase/products/toy-bs-art.png',
  },
  {
    id: 'science-kit',
    name: 'Science Explorer Kit',
    blurb: 'Hands-on experiments with safe tools and guided cards.',
    price: 1599,
    listPrice: 1899,
    age: '8-12',
    category: 'educational',
    rating: 4.8,
    reviews: 142,
    badge: '-15%',
    badgeTone: 'sale',
    tone: 'toy-tone--white',
    emoji: '🔬',
    image: '/portfolio/toy-showcase/products/toy-bs-science.png',
  },
  {
    id: 'cloud-bunny',
    name: 'Cloud Bunny Plush',
    blurb: 'OEKO-TEX certified plush for gentle hugs.',
    price: 999,
    listPrice: 999,
    age: '0-12m',
    category: 'baby',
    rating: 4.9,
    reviews: 86,
    badge: 'NEW',
    badgeTone: 'new',
    tone: 'toy-tone--white',
    emoji: '🐰',
    image: '/portfolio/toy-showcase/products/toy-product-bunny.png',
  },
  {
    id: 'forest-friends',
    name: 'Forest Friends Set',
    blurb: 'Soft woodland animals with cotton play mat.',
    price: 1599,
    listPrice: 1899,
    age: '1-3',
    category: 'baby',
    rating: 4.7,
    reviews: 152,
    tone: 'toy-tone--white',
    emoji: '🦊',
    image: '/portfolio/toy-showcase/products/toy-product-bunny.png',
  },
  {
    id: 'kite-runner',
    name: 'Skyline Balance Bike',
    blurb: 'Lightweight frame with quiet tires.',
    price: 4299,
    listPrice: 4999,
    age: '3-5',
    category: 'outdoor',
    rating: 4.7,
    reviews: 73,
    badge: '-14%',
    badgeTone: 'sale',
    tone: 'toy-tone--white',
    emoji: '🚲',
    image: '/portfolio/toy-showcase/hero/toy-hero-truck.png',
  },
] as const;

export const TOY_FOOTER_COLS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About Us', href: '#top' },
      { label: 'Contact Us', href: '#footer' },
      { label: 'FAQs', href: '#services' },
      { label: 'Shipping Policy', href: '#services' },
      { label: 'Return Policy', href: '#services' },
      { label: 'Terms & Conditions', href: '#footer' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Track Order', href: '#top' },
      { label: 'My Account', href: '#top' },
      { label: 'Wishlist', href: '#shop' },
      { label: 'Gift Cards', href: '#promos' },
      { label: 'Size Guide', href: '#ages' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Action Figures', href: '#shop' },
      { label: 'Building Blocks', href: '#shop' },
      { label: 'Dolls & Accessories', href: '#shop' },
      { label: 'RC Toys', href: '#shop' },
      { label: 'Educational Toys', href: '#shop' },
      { label: 'Games & Puzzles', href: '#shop' },
    ],
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
