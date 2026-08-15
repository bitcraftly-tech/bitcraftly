import {
  SHOP_PRODUCTS,
  discountPct,
  formatInr,
  isDealProduct,
  productMatchesSearch,
  type ShopProduct,
} from './ecommerce-demo-data';

export type ChatRole = 'bot' | 'user';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
  products?: ShopProduct[];
};

export const CHAT_QUICK_PROMPTS = [
  "Today's top deals",
  'Samsung & headphones',
  'Home & Kitchen picks',
  "What's in my cart?",
] as const;

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function msgId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createBotMessage(text: string, products?: ShopProduct[]): ChatMessage {
  return {
    id: msgId(),
    role: 'bot',
    text,
    time: nowTime(),
    products: products?.length ? products.slice(0, 3) : undefined,
  };
}

export function createUserMessage(text: string): ChatMessage {
  return {
    id: msgId(),
    role: 'user',
    text,
    time: nowTime(),
  };
}

function shortTitle(product: ShopProduct) {
  return product.title.split('·')[0]?.trim() || product.title;
}

function topDeals(limit = 3) {
  return [...SHOP_PRODUCTS]
    .filter((p) => isDealProduct(p))
    .sort((a, b) => discountPct(b.price, b.list) - discountPct(a.price, a.list))
    .slice(0, limit);
}

function byDepartment(department: ShopProduct['department'], limit = 3) {
  return SHOP_PRODUCTS.filter((p) => p.department === department).slice(0, limit);
}

function catalogHint() {
  const names = SHOP_PRODUCTS.slice(0, 4)
    .map((p) => shortTitle(p))
    .join(', ');
  return `This demo catalog has ${SHOP_PRODUCTS.length} items across Electronics, Fashion, and Home & Kitchen — including ${names}.`;
}

export function createWelcomeMessage(): ChatMessage {
  const deals = topDeals(3);
  return createBotMessage(
    `Hi — I'm the Ecommerce Store assistant. ${catalogHint()} Ask for a product, a department, or today's deals.`,
    deals,
  );
}

const WHATSAPP_TRANSCRIPT_MAX = 1400;

/** Build a support-ready WhatsApp message from the live chat transcript. */
export function formatChatTranscriptForWhatsApp(
  messages: readonly ChatMessage[],
  reason: 'close' | 'reset',
  meta: { pincode: string; cartCount: number },
): string {
  const lines = messages.map((m) => {
    const who = m.role === 'user' ? 'Visitor' : 'Bot';
    const products =
      m.products?.length && m.role === 'bot'
        ? ` [shown: ${m.products.map((p) => p.title).join(' · ')}]`
        : '';
    return `[${m.time}] ${who}: ${m.text}${products}`;
  });

  let body = lines.join('\n');
  if (body.length > WHATSAPP_TRANSCRIPT_MAX) {
    body = `${body.slice(0, WHATSAPP_TRANSCRIPT_MAX)}\n…(truncated)`;
  }

  return [
    `Ecommerce Store AI chat record (${reason})`,
    `Pin: ${meta.pincode} · Cart items: ${meta.cartCount}`,
    '---',
    body,
  ].join('\n');
}

export function chatHasVisitorMessages(messages: readonly ChatMessage[]): boolean {
  return messages.some((m) => m.role === 'user');
}

function rankProducts(query: string): ShopProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = SHOP_PRODUCTS.map((p) => {
    let score = 0;
    if (productMatchesSearch(p, q)) score += 4;
    if (p.department.toLowerCase().includes(q)) score += 3;
    for (const kw of p.keywords) {
      if (q.includes(kw) || kw.includes(q)) score += 2;
    }
    if (p.title.toLowerCase().includes(q)) score += 3;
    if (isDealProduct(p) && /(deal|offer|discount|sale)/.test(q)) score += 2;
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.price - b.p.price);

  return scored.map((x) => x.p);
}

function underBudget(products: ShopProduct[], max: number) {
  return products.filter((p) => p.price <= max);
}

function extractBudget(query: string): number | null {
  const under = query.match(/(?:under|below|upto|up to|max)\s*₹?\s*([\d,]+)/i);
  if (under?.[1]) return Number(under[1].replace(/,/g, ''));
  const bare = query.match(/₹\s*([\d,]+)/);
  if (bare?.[1] && /(under|below|budget|less)/i.test(query)) {
    return Number(bare[1].replace(/,/g, ''));
  }
  return null;
}

export type ChatEngineContext = {
  cartCount: number;
  cartSubtotal: number;
  pincode: string;
};

function detectDepartment(lower: string): ShopProduct['department'] | 'Deals' | null {
  if (/\belectronics?\b/.test(lower)) return 'Electronics';
  if (/\bfashion\b/.test(lower)) return 'Fashion';
  if (/\bhome\b|\bkitchen\b/.test(lower)) return 'Home & Kitchen';
  if (/\btoday'?s?\s+(top\s+)?deals\b|\btop deals\b/.test(lower)) return 'Deals';
  return null;
}

/**
 * Lightweight demo “AI” — grounded only in Ecommerce Store showcase catalog data.
 */
export function answerEcommerceStoreQuery(raw: string, ctx: ChatEngineContext): ChatMessage {
  const query = raw.trim();
  const lower = query.toLowerCase();
  const headphones = SHOP_PRODUCTS.find((p) => p.id === 'headphones') ?? SHOP_PRODUCTS[0];
  const phone = SHOP_PRODUCTS.find((p) => p.id === 'galaxy-m34') ?? SHOP_PRODUCTS[1];

  if (!query) {
    return createBotMessage(
      `Ask for something in this catalog — ${shortTitle(phone)}, ${shortTitle(headphones)}, or today's deals.`,
      topDeals(3),
    );
  }

  if (/^(hi|hello|hey|namaste|hola)\b/.test(lower)) {
    return createBotMessage(`Hello! ${catalogHint()}`, topDeals(3));
  }

  if (/(cart|checkout|razorpay|\bpay\b)/.test(lower)) {
    const suggestions = topDeals(3);
    if (ctx.cartCount === 0) {
      return createBotMessage(
        `Your cart is empty. Add a catalog item such as ${suggestions
          .map((p) => `${shortTitle(p)} (${formatInr(p.price)})`)
          .join(', ')}, then open Cart in the header for Razorpay demo checkout.`,
        suggestions,
      );
    }
    return createBotMessage(
      `You have ${ctx.cartCount} item${ctx.cartCount === 1 ? '' : 's'} · subtotal ${formatInr(ctx.cartSubtotal)}. Open Cart (top right) to change qty or pay with the Razorpay demo.`,
    );
  }

  if (/(deliver|shipping|pincode|eta|free delivery)/.test(lower)) {
    const free = SHOP_PRODUCTS.filter((p) => p.delivery.toLowerCase().includes('free')).slice(0, 3);
    return createBotMessage(
      `Delivering to ${ctx.pincode}. These catalog picks include free delivery — change pin from “Deliver to” in the header.`,
      free,
    );
  }

  if (/(return|refund|exchange)/.test(lower)) {
    return createBotMessage(
      'Returns are a demo flow on this store: use Returns & Orders in the header. Fashion and home items follow the same 30-day demo returns copy.',
    );
  }

  if (/(bank|hdfc|sbi|coupon|cashback)/.test(lower)) {
    return createBotMessage(
      'Bank offers on this page: HDFC 10% (HDFC10), SBI no-cost EMI (SBINOCOST), and Ecommerce Store Pay ₹75 (PAY75). Apply them under Bank offers, then checkout from Cart.',
    );
  }

  if (/(help|what can you|kaise|how do you)/.test(lower)) {
    return createBotMessage(
      `${catalogHint()} Try “${shortTitle(phone)}”, “${shortTitle(headphones)}”, “Home & Kitchen”, or “today's deals”.`,
      topDeals(3),
    );
  }

  const dept = detectDepartment(lower);
  if (dept || /(department|categor|section)/.test(lower)) {
    if (dept === 'Deals') {
      const deals = topDeals(3);
      return createBotMessage(
        `Top deals from this catalog (35%+ off): ${deals
          .map((p) => `${shortTitle(p)} ${formatInr(p.price)}`)
          .join(' · ')}.`,
        deals,
      );
    }

    if (dept && dept !== 'All') {
      const items = byDepartment(dept, 3);
      return createBotMessage(
        `${dept} in this catalog: ${items
          .map((p) => `${shortTitle(p)} — ${formatInr(p.price)}`)
          .join('; ')}.`,
        items,
      );
    }

    return createBotMessage(
      'Departments in this catalog: Electronics, Fashion, Home & Kitchen, and Deals. Ask for any of those by name.',
      topDeals(3),
    );
  }

  if (/(deal|discount|sale|cheap|budget|under|below)/.test(lower) || extractBudget(lower) != null) {
    let deals = SHOP_PRODUCTS.filter((p) => isDealProduct(p));
    const dealBudget = extractBudget(lower);
    if (dealBudget != null) deals = underBudget(deals, dealBudget);
    deals = [...deals].sort((a, b) => discountPct(b.price, b.list) - discountPct(a.price, a.list));
    if (deals.length === 0) {
      const fallback =
        dealBudget != null ? underBudget(SHOP_PRODUCTS, dealBudget).slice(0, 3) : topDeals(3);
      return createBotMessage(
        dealBudget != null
          ? `No 35%+ deals under ${formatInr(dealBudget)}. Here are catalog items in that budget:`
          : 'Here are the strongest discounts on this page:',
        fallback,
      );
    }
    const top = deals.slice(0, 3);
    const lines = top
      .map((p) => `${shortTitle(p)} — ${formatInr(p.price)} (${discountPct(p.price, p.list)}% off)`)
      .join('; ');
    return createBotMessage(`Hottest catalog deals: ${lines}`, top);
  }

  const budget = extractBudget(lower);
  let matched = rankProducts(query);
  if (budget != null) matched = underBudget(matched.length ? matched : SHOP_PRODUCTS, budget);

  if (matched.length > 0) {
    const top = matched.slice(0, 3);
    const lead = top[0];
    return createBotMessage(
      `Found ${matched.length} catalog match${matched.length === 1 ? '' : 'es'}. Top pick: ${lead.title} at ${formatInr(lead.price)} · ${lead.delivery}.`,
      top,
    );
  }

  if (budget != null) {
    const cheap = underBudget(SHOP_PRODUCTS, budget).slice(0, 3);
    if (cheap.length) {
      return createBotMessage(`Under ${formatInr(budget)} in this catalog:`, cheap);
    }
  }

  return createBotMessage(
    `I couldn't match that to this catalog. Try “${shortTitle(phone)}”, “${shortTitle(headphones)}”, or “${shortTitle(SHOP_PRODUCTS[2])}”.`,
    topDeals(3),
  );
}
