export type ShopDepartment = "All" | "Electronics" | "Fashion" | "Home & Kitchen" | "Deals";

export type ShopProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  list: number;
  rating: number;
  count: number;
  delivery: string;
  department: ShopDepartment;
  keywords: string[];
};

/** Unsplash demo photos — verified IDs; optional width/height for banners */
const img = (id: string, w = 400, h = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const PINCODES = ["831001 · Jamshedpur", "110001 · New Delhi", "400001 · Mumbai", "560001 · Bengaluru"] as const;

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "echo-dot",
    title: "Smart speaker with voice assistant",
    image: img("photo-1608043152269-423dbba4e7e1"),
    price: 4999,
    list: 7999,
    rating: 4.4,
    count: 12453,
    delivery: "FREE delivery Wed",
    department: "Electronics",
    keywords: ["echo", "voice", "speaker", "smart", "wireless"],
  },
  {
    id: "galaxy-m34",
    title: "Samsung Galaxy M34 5G · 8GB RAM · 128GB",
    image: img("photo-1511707171634-5f897ff02aa9"),
    price: 15999,
    list: 24999,
    rating: 4.2,
    count: 8921,
    delivery: "FREE delivery Tomorrow",
    department: "Electronics",
    keywords: ["samsung", "phone", "mobile", "5g"],
  },
  {
    id: "mixer",
    title: "Prestige Iris 750W Mixer Grinder · 3 jars",
    image: img("photo-1556909114-f6e7ad7d3136"),
    price: 3299,
    list: 5495,
    rating: 4.3,
    count: 5620,
    delivery: "FREE delivery Thu",
    department: "Home & Kitchen",
    keywords: ["prestige", "mixer", "kitchen", "grinder"],
  },
  {
    id: "shirt",
    title: "Men's solid casual shirt · slim fit",
    image: img("photo-1596755094514-f87e34085b2c"),
    price: 699,
    list: 1999,
    rating: 4.1,
    count: 2104,
    delivery: "Delivery ₹40 · 29 May",
    department: "Fashion",
    keywords: ["shirt", "men", "casual", "fashion"],
  },
  {
    id: "flask",
    title: "Milton thermosteel flip lid flask · 1 litre",
    image: img("photo-1602143407151-7111542de6e8"),
    price: 899,
    list: 1549,
    rating: 4.5,
    count: 34102,
    delivery: "FREE delivery Wed",
    department: "Home & Kitchen",
    keywords: ["milton", "flask", "bottle", "kitchen"],
  },
  {
    id: "mattress",
    title: "Wakefit orthopedic memory foam mattress",
    image: img("photo-1631049307264-da0ec9d70304"),
    price: 8999,
    list: 14999,
    rating: 4.4,
    count: 7821,
    delivery: "FREE scheduled delivery",
    department: "Home & Kitchen",
    keywords: ["wakefit", "mattress", "bed", "sleep"],
  },
  {
    id: "cooker",
    title: "Hawkins pressure cooker · 3L",
    image: img("photo-1585515320310-259814833e62"),
    price: 2199,
    list: 3299,
    rating: 4.6,
    count: 15670,
    delivery: "FREE delivery Tomorrow",
    department: "Home & Kitchen",
    keywords: ["hawkins", "cooker", "pressure", "kitchen"],
  },
  {
    id: "bedsheet",
    title: "Microfiber bed sheet set · queen",
    image: img("photo-1489987707025-afc232f7ea0f"),
    price: 1299,
    list: 2499,
    rating: 4.2,
    count: 4521,
    delivery: "FREE delivery Thu",
    department: "Home & Kitchen",
    keywords: ["bedsheet", "bed", "home", "basics"],
  },
  {
    id: "headphones",
    title: "boAt Rockerz 450 · wireless headphones",
    image: img("photo-1505740420928-5e560c06d30e"),
    price: 1499,
    list: 3990,
    rating: 4.3,
    count: 98234,
    delivery: "FREE delivery Tomorrow",
    department: "Electronics",
    keywords: ["boat", "headphones", "wireless", "bluetooth", "audio"],
  },
  {
    id: "kurta",
    title: "Cotton block print kurta · women",
    image: img("photo-1595777216527-1c7889b28e6d"),
    price: 1899,
    list: 3499,
    rating: 4.5,
    count: 3201,
    delivery: "FREE delivery Wed",
    department: "Fashion",
    keywords: ["kurta", "women", "fabindia", "ethnic", "fashion"],
  },
];

export const CATEGORY_TILES = [
  {
    label: "Home & Kitchen",
    department: "Home & Kitchen" as ShopDepartment,
    image: img("photo-1556909114-f6e7ad7d3136"),
  },
  {
    label: "Electronics",
    department: "Electronics" as ShopDepartment,
    image: img("photo-1511707171634-5f897ff02aa9"),
  },
  {
    label: "Fashion",
    department: "Fashion" as ShopDepartment,
    image: img("photo-1490481651871-ab68de25d43d"),
  },
  {
    label: "Deals",
    department: "Deals" as ShopDepartment,
    image: img("photo-1505740420928-5e560c06d30e"),
  },
] as const;

export const HERO_BANNER_IMAGE = img("photo-1631049307264-da0ec9d70304", 1200, 560);

export type SortOption = "recommended" | "price-asc" | "price-desc" | "rating";

/** Stable SSR/client formatting (avoids locale hydration mismatches). */
export function formatIndianNumber(n: number): string {
  const str = String(Math.round(n));
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 0) {
    const chunk = remaining.length > 2 ? remaining.slice(-2) : remaining;
    result = `${chunk},${result}`;
    remaining = remaining.length > 2 ? remaining.slice(0, -2) : "";
  }
  return result;
}

export function formatInr(n: number) {
  return `₹${formatIndianNumber(n)}`;
}

export const DEAL_MIN_DISCOUNT = 35;

export function discountPct(price: number, list: number) {
  return Math.round(((list - price) / list) * 100);
}

export function isDealProduct(product: ShopProduct, minPct = DEAL_MIN_DISCOUNT) {
  return discountPct(product.price, product.list) >= minPct;
}

/** Search: full phrase or any word in title / keywords / department */
export function productMatchesSearch(product: ShopProduct, rawQuery: string) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${product.title} ${product.keywords.join(" ")} ${product.department}`.toLowerCase();
  if (haystack.includes(q)) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.some((t) => haystack.includes(t));
}

export function hasFreeDelivery(product: ShopProduct) {
  return product.delivery.toLowerCase().includes("free");
}
