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
  'Best deals under ₹5000',
  'Show electronics',
  'Delivery options',
  'Help with cart',
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

export function createWelcomeMessage(): ChatMessage {
  return createBotMessage(
    "Hi! I'm Ecommerce Store Assistant. Ask about products, deals, delivery, or departments — I answer from this demo catalog.",
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

/**
 * Lightweight demo “AI” — grounded only in Ecommerce Store showcase catalog data.
 */
export function answerEcommerceStoreQuery(raw: string, ctx: ChatEngineContext): ChatMessage {
  const query = raw.trim();
  const lower = query.toLowerCase();

  if (!query) {
    return createBotMessage('Type a product name, department, or ask about deals and delivery.');
  }

  if (/^(hi|hello|hey|namaste|hola)\b/.test(lower)) {
    return createBotMessage(
      "Hello! I can find phones, fashion, home essentials, and today's deals from the Ecommerce Store demo catalog.",
    );
  }

  if (/(help|what can you|kaise|how do)/.test(lower)) {
    return createBotMessage(
      "Try: “best deals”, “electronics”, “mixer”, “delivery”, or “cart”. I only use this page's product data — no live inventory API.",
    );
  }

  if (/(cart|checkout|razorpay|pay)/.test(lower)) {
    if (ctx.cartCount === 0) {
      return createBotMessage(
        "Your cart is empty. Add items from Today's deals or search results, then open Cart to checkout with the Razorpay demo flow.",
      );
    }
    return createBotMessage(
      `You have ${ctx.cartCount} item(s) · subtotal ${formatInr(ctx.cartSubtotal)}. Open Cart (top right) to adjust qty or pay with Razorpay demo checkout.`,
    );
  }

  if (/(deliver|shipping|pincode|eta|free delivery)/.test(lower)) {
    return createBotMessage(
      `Current delivery pin: ${ctx.pincode}. Many items show FREE delivery in the catalog — change pin from the header “Deliver to” control. Same-day is demo copy for select cities.`,
    );
  }

  if (/(return|refund|exchange)/.test(lower)) {
    return createBotMessage(
      'Easy returns are part of the demo trust strip. Use Returns & Orders in the header for the fictional returns panel.',
    );
  }

  if (/(bank|offer|hdfc|sbi|coupon|cashback)/.test(lower)) {
    return createBotMessage(
      'Demo bank offers on this page: HDFC 10% (HDFC10), SBI no-cost EMI (SBINOCOST), and Ecommerce Store Pay ₹75 cashback (PAY75). See the Bank offers section below deals.',
    );
  }

  if (
    /(department|categor|section)/.test(lower) ||
    /^(electronics|fashion|home|kitchen|deals)$/.test(lower)
  ) {
    const deptMatch = lower.includes('electronic')
      ? 'Electronics'
      : lower.includes('fashion')
        ? 'Fashion'
        : lower.includes('home') || lower.includes('kitchen')
          ? 'Home & Kitchen'
          : lower.includes('deal')
            ? 'Deals'
            : null;

    if (deptMatch === 'Deals') {
      const deals = SHOP_PRODUCTS.filter((p) => isDealProduct(p)).slice(0, 3);
      return createBotMessage(`Here are top deal picks (35%+ off) from the demo catalog:`, deals);
    }

    if (deptMatch) {
      const items = SHOP_PRODUCTS.filter((p) => p.department === deptMatch).slice(0, 3);
      return createBotMessage(`${deptMatch} picks from Ecommerce Store:`, items);
    }

    return createBotMessage(
      'Departments on this demo: Electronics, Fashion, Home & Kitchen, and Deals. Ask for any of those by name.',
    );
  }

  if (/(deal|offer|discount|sale|cheap|budget)/.test(lower)) {
    let deals = SHOP_PRODUCTS.filter((p) => isDealProduct(p));
    const budget = extractBudget(lower);
    if (budget != null) deals = underBudget(deals, budget);
    deals = [...deals].sort((a, b) => discountPct(b.price, b.list) - discountPct(a.price, a.list));
    if (deals.length === 0) {
      return createBotMessage(
        budget != null
          ? `No deals found under ${formatInr(budget)} in this demo catalog. Try a higher budget or ask for Electronics.`
          : "No strong deals matched — browse Today's deals on the page.",
      );
    }
    const top = deals.slice(0, 3);
    const lines = top
      .map((p) => `${p.title} — ${formatInr(p.price)} (${discountPct(p.price, p.list)}% off)`)
      .join('; ');
    return createBotMessage(`Hottest demo deals: ${lines}`, top);
  }

  const budget = extractBudget(lower);
  let matched = rankProducts(query);
  if (budget != null) matched = underBudget(matched.length ? matched : SHOP_PRODUCTS, budget);

  if (matched.length > 0) {
    const top = matched.slice(0, 3);
    const lead = top[0];
    return createBotMessage(
      `I found ${matched.length} match(es). Top pick: ${lead.title} at ${formatInr(lead.price)} · ${lead.delivery}.`,
      top,
    );
  }

  if (budget != null) {
    const cheap = underBudget(SHOP_PRODUCTS, budget).slice(0, 3);
    if (cheap.length) {
      return createBotMessage(`Under ${formatInr(budget)}, try these demo items:`, cheap);
    }
  }

  return createBotMessage(
    "I couldn't match that to the Ecommerce Store catalog. Try “Samsung”, “headphones”, “kitchen”, or “best deals”.",
  );
}
