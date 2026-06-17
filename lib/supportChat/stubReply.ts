import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_WHATSAPP_E164 } from "@/lib/constants";
import type { ChatTurnDto } from "./types";

const WA = `https://wa.me/${SUPPORT_WHATSAPP_E164}`;

function norm(s: string) {
  return s.trim().toLowerCase();
}

type Reply = { text: string; quick?: string[] };

function r(text: string, quick?: string[]): Reply {
  return { text, quick };
}

/**
 * Comprehensive Bitcraftly assistant — Hinglish, friendly, conversion-focused.
 */
export function buildStubAssistantReply(
  messages: ChatTurnDto[],
  latestUserRaw: string
): { text: string; quick?: string[] } {
  const q = norm(latestUserRaw);
  const history = messages.map((m) => norm(m.content)).join(" ");
  return match(q, history);
}

function match(q: string, history: string): Reply {
  if (!q.length) {
    return r("Kuch toh poochho! 😊 Pricing, services, demos — sab ke liye ready hun.");
  }

  /* ── Greeting ── */
  if (/^(hi|hello|hey|namaste|hii|helo|hy|good\s*(morning|evening|afternoon))\b/.test(q)) {
    return r(
      `Namaste! 🙏 Main Bitcraftly ka AI Assistant hun.\n\nHum React & Next.js websites, mobile apps, aur AI-powered solutions banate hain — Ghaziabad se, India & remote clients ke liye.\n\nKya poochna chahte hain?`,
      ["💰 Pricing", "🌐 Services", "🖼️ Portfolio", "📞 Contact"]
    );
  }

  /* ── Pricing / Cost ── */
  if (/(price|pricing|cost|budget|kitna|lagega|paisa|rupee|₹|quote|package|plan)\b/.test(q)) {
    return r(
      `Bitcraftly ke packages:\n\n🚀 Landing Page (48 hrs) — ₹8,999\n🏢 Business Website (5 days) — ₹12,999\n🏥 Clinic/Gym/Coaching — ₹13,999\n⭐ Professional Website — ₹14,999\n💎 Premium React/Next.js — ₹29,999+\n🤖 AI-Powered Website — ₹19,999+\n🔧 Maintenance — ₹2,999/month\n\nPayment sirf written quote approve karne ke baad hota hai. Free estimate ke liye:\n📊 /pricing (calculator)\n💬 WhatsApp: ${WA}`,
      ["📊 Full pricing", "🧮 Cost calculator", "📞 Free consult", "⚡ Fast launch"]
    );
  }

  /* ── Fast Launch ── */
  if (/(fast|quick|urgent|jaldi|asap|48.?hour|5.?day|speed)/.test(q)) {
    return r(
      `Hamare Fast Launch packages:\n\n⚡ Landing Page — 48 ghante mein, ₹8,999\n🏢 Business Website — 5 din mein, ₹12,999\n🏥 Clinic/Gym Pack — 5 din, ₹13,999\n\nYe packages include karte hain:\n✅ Mobile-first design\n✅ WhatsApp CTA integration\n✅ SEO-ready structure\n✅ 1 revision round\n\nAbhi book karein: ${WA}`,
      ["💰 All packages", "📞 Book now", "🌐 Services"]
    );
  }

  /* ── Services ── */
  if (/(service|kya karte|kya banate|work|build|develop|what do you|specializ)/.test(q)) {
    return r(
      `Bitcraftly ki services:\n\n🌐 React.js & Next.js Websites\n📱 Mobile Apps (React Native)\n🤖 AI-Powered Solutions\n🏗️ Frontend Architecture\n🎨 Website Redesign\n📄 Landing Pages\n🏢 Business Websites\n⚡ Performance Optimization\n\nHar project me: Mobile-first design, WhatsApp CTAs, SEO, fast loading.\n\nKaunsi service aapko chahiye?`,
      ["💰 Pricing", "🖼️ Portfolio", "📞 Consult"]
    );
  }

  /* ── Website ── */
  if (/(website|web\b|landing page|seo|domain|portfolio site|business site)/.test(q)) {
    return r(
      `Hum custom React & Next.js websites banate hain — templates nahi! 🚫📋\n\nHar website me:\n✅ Mobile-first responsive design\n✅ WhatsApp + contact form integration\n✅ SEO-ready page structure\n✅ Fast loading (Core Web Vitals optimized)\n✅ Written scope before work starts\n\nStarting from ₹7,999. Timeline: 2–10 days depending on scope.\n\nFree consultation: /contact ya WhatsApp ${WA}`,
      ["💰 Pricing", "🖼️ See portfolio", "📞 Free consult"]
    );
  }

  /* ── Mobile App ── */
  if (/(app|mobile|android|ios|react native|apk)/.test(q)) {
    return r(
      `Hum React Native apps banate hain — ek codebase se iOS + Android dono! 📱\n\nIdeal for:\n• Salon / clinic booking apps\n• Restaurant / cloud kitchen orders\n• D2C product apps\n• Society management\n• Custom business apps\n\nScope discuss karne ke liye:\n💬 WhatsApp: ${WA}\n📝 /contact — mention your business type`,
      ["💰 Pricing", "📞 Discuss project"]
    );
  }

  /* ── AI Solutions ── */
  if (/(ai|artificial intelligence|automation|chatbot|gpt|llm|bot|workflow|ml)/.test(q)) {
    return r(
      `Bitcraftly AI-powered solutions:\n\n🤖 Smart chatbots (24/7 customer support)\n📋 Document automation workflows\n🔗 API & third-party integrations\n📊 Analytics dashboards\n💬 WhatsApp bot integration\n\nAI sirf wahan use karte hain jahan it actually helps — enquiries badhaane ke liye, not just as a gimmick.\n\nStarting ₹19,999+. Discuss: ${WA}`,
      ["💰 AI pricing", "🌐 All services", "📞 Consult"]
    );
  }

  /* ── Portfolio / Work ── */
  if (/(portfolio|work|project|demo|example|client|case study|previous|past)/.test(q)) {
    return r(
      `Hamara portfolio dekhein: /portfolio 🖼️\n\nRecent projects:\n🍽️ Shrishti Cloud Kitchen — Live\n🥜 Swastik Makhana D2C Store — Live\n💪 Gym Website Demo\n🏫 School Admissions Demo\n🛒 Ecommerce Store Demo\n\nSabhi demos /portfolio pe click-through hain — apni industry jaisi site dekhke feel ho jayegi!\n\nAapki industry kya hai?`,
      ["🖼️ Full portfolio", "📞 Start project"]
    );
  }

  /* ── Contact / WhatsApp ── */
  if (/(contact|call|whatsapp|mail|email|phone|number|reach|baat|connect)/.test(q)) {
    return r(
      `Bitcraftly se contact karein:\n\n📞 Phone/WhatsApp: ${SUPPORT_PHONE_DISPLAY}\n✉️ Email: ${SUPPORT_EMAIL}\n💬 WhatsApp chat: ${WA}\n📝 Contact form: /contact\n\n⏰ Available: 10:00 AM – 9:00 PM IST\n🗓️ Free 15-min consultation available\n\nSame-day reply guaranteed! 🚀`,
      ["💬 WhatsApp now", "📝 Contact form", "🗓️ Book consult"]
    );
  }

  /* ── About / Team / Founder ── */
  if (/(about|team|founder|who|sanjay|ghaziabad|ncr|company|studio)/.test(q)) {
    return r(
      `Bitcraftly ke baare mein:\n\n👨‍💻 Founder: Sanjay Kr. Singh\n📅 Experience: 18+ years Frontend Architecture\n📍 Location: Ghaziabad, Delhi NCR\n🌍 Clients: India & remote\n\nHum ek founder-led studio hain — koi middleman nahi, seedha founder se baat hoti hai. React & Next.js me specialization, AI-ready builds, SEO-focused delivery.\n\n/about pe full story padh sakte hain.`,
      ["🌐 Services", "💰 Pricing", "📞 Talk to founder"]
    );
  }

  /* ── Timeline / Process ── */
  if (/(timeline|kitne din|how long|process|steps|kaise|how does|deliver)/.test(q)) {
    return r(
      `Bitcraftly ka delivery process:\n\n1️⃣ Free consultation (15 min)\n2️⃣ Written scope (before payment)\n3️⃣ Design mockup approval\n4️⃣ Development\n5️⃣ Testing & revisions\n6️⃣ Launch! 🚀\n\nTimelines:\n⚡ Landing page — 48 hours\n🏢 Business website — 5–10 days\n💎 Premium build — 2–4 weeks\n\nPayment hamesha written scope approve karne ke baad.`,
      ["💰 Pricing", "📞 Start now"]
    );
  }

  /* ── Maintenance / Support ── */
  if (/(maintain|support|update|change|fix|bug|help after|post launch)/.test(q)) {
    return r(
      `Haan, hum post-launch support dete hain! 🛠️\n\nMaintenance plan:\n🔧 Monthly plan — ₹2,999/month\n✅ Content updates\n✅ Bug fixes\n✅ Security updates\n✅ Performance monitoring\n\nEk baar ka kaam bhi hota hai — changes ke liye hourly rate available.\n\nDetails: ${SUPPORT_EMAIL} ya WhatsApp ${WA}`,
      ["💰 All pricing", "📞 Contact"]
    );
  }

  /* ── SEO ── */
  if (/(seo|search|google|rank|traffic|organic)/.test(q)) {
    return r(
      `SEO hamare har project ka part hai — extra charge nahi! 🔍\n\nHar website me included:\n✅ SEO-ready page structure\n✅ Meta titles & descriptions\n✅ Semantic HTML\n✅ Fast loading (Core Web Vitals)\n✅ Schema markup (where relevant)\n✅ Local SEO setup (for Ghaziabad/NCR businesses)\n\nDedicated SEO campaign ke liye alag consultation available hai.`,
      ["🌐 Services", "💰 Pricing", "📞 Consult"]
    );
  }

  /* ── Thanks / Bye ── */
  if (/\b(thanks?|thank you|shukriya|dhanyavad|theek|ok done|bye|goodbye)\b/.test(q)) {
    return r(
      `Bahut shukriya! 😊 Bitcraftly se baat karke khushi hui.\n\nKoi bhi sawaal ho — website, app, pricing — toh kabhi bhi WhatsApp karo: ${WA}\n\nAapke project ke liye shubhkamnaayen! 🌟`,
      ["🖼️ Portfolio", "📞 Contact"]
    );
  }

  /* ── Default ── */
  return r(
    `Samajh nahi aaya, sorry! 😅 Main inn topics pe help kar sakta hun:\n\n• 💰 Pricing & packages\n• 🌐 Services (website, app, AI)\n• 🖼️ Portfolio & demos\n• ⏱️ Timeline & process\n• 📞 Contact & consultation\n\nKya poochna chahte hain?`,
    ["💰 Pricing", "🌐 Services", "🖼️ Portfolio", "📞 Contact"]
  );
}
