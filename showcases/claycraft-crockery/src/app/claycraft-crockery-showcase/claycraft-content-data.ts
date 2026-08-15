export type ClayCraftFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const CLAYCRAFT_FAQS: readonly ClayCraftFaqItem[] = [
  {
    id: 'shipping',
    question: 'Do you offer free shipping?',
    answer:
      'Yes. Orders above ₹999 ship free across India. Below that, a flat ₹99 shipping fee applies.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer easy 30-day returns and exchanges on unused items in original packaging.',
  },
  {
    id: 'care',
    question: 'How should I care for bone china with gold rims?',
    answer:
      'Hand wash gold-rim pieces. Avoid microwave use for metallic finishes. Matte stoneware is dishwasher-safe on a gentle cycle.',
  },
  {
    id: 'coupons',
    question: 'Which demo coupon codes work?',
    answer:
      'Try CLAY10 (10% off), WELCOME50 (₹50 off), or TABLE20 (20% off) in the cart. This is a mock demo — no real payment is charged.',
  },
  {
    id: 'demo',
    question: 'Is this a real store?',
    answer:
      'Crockery Wala is a portfolio demonstration. Cart, wishlist, and checkout flows use local mock data with no backend or real payments.',
  },
] as const;

export type ClayCraftBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export const CLAYCRAFT_BLOG: readonly ClayCraftBlogPost[] = [
  {
    id: 'tablescaping-spring',
    slug: 'tablescaping-for-spring',
    title: 'Tablescaping for Spring',
    excerpt: 'Layer soft neutrals, fresh sprigs, and linen for an effortless spring table.',
    date: '2026-03-18',
  },
  {
    id: 'care-guide',
    slug: 'care-guide-stoneware',
    title: 'A Quiet Care Guide for Stoneware',
    excerpt: 'How to keep glazes luminous and surfaces lasting for years of daily use.',
    date: '2026-02-04',
  },
  {
    id: 'hosting-essentials',
    slug: 'hosting-essentials',
    title: 'Five Hosting Essentials',
    excerpt: 'The serveware pieces we reach for whenever guests are coming over.',
    date: '2026-01-12',
  },
] as const;
