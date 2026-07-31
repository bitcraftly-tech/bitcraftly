export type ClayCraftTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  /** Product the reviewer bought — shown as proof of a real order. */
  product: string;
};

const avatar = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=128&h=128&q=80`;

export const CLAYCRAFT_TESTIMONIALS: readonly ClayCraftTestimonial[] = [
  {
    id: 'sarah',
    quote:
      'The quality and finish of the dinner set is absolutely stunning. It made our dining experience so much better!',
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    avatar: avatar('photo-1494790108377-be9c29b29330'),
    rating: 5,
    product: 'Royal White Dinner Set',
  },
  {
    id: 'michael',
    quote:
      'Beautiful designs and premium quality. Packaging was excellent and delivery was super fast.',
    name: 'Michael Brown',
    role: 'Verified Buyer',
    avatar: avatar('photo-1507003211169-0a1dd7228f2d'),
    rating: 4,
    product: 'Crystal Stemware Pair',
  },
  {
    id: 'priya',
    quote:
      "I ordered a tea set and it's beyond beautiful. Perfect for hosting guests and everyday use.",
    name: 'Priya Mehta',
    role: 'Verified Buyer',
    avatar: avatar('photo-1438761681033-6461ffad8d80'),
    rating: 5,
    product: 'Amber Glow Tea Set',
  },
] as const;
