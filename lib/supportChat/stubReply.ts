import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_WHATSAPP_E164 } from "@/lib/constants";

import type { ChatTurnDto } from "./types";

function norm(s: string) {
  return s.trim().toLowerCase();
}

/**
 * Offline-friendly replies until AI / SUPPORT_CHAT_WEBHOOK_URL is wired.
 */
export function buildStubAssistantReply(messages: ChatTurnDto[], latestUserRaw: string): string {
  const q = norm(latestUserRaw);
  const waHref = `https://wa.me/${SUPPORT_WHATSAPP_E164}`;

  if (!q.length) {
    return "Kuch likhkar bhejo — pricing, demo, ya Smart Parking ke baare mein poochh sakte ho.";
  }

  if (/^(hi|hello|hey|namaste|नमस्ते|hii)\b|^good (morning|afternoon|evening)/u.test(q)) {
    return `Hi! Main Bitcraftly ka assistant hoon.\nAbhi live AI integrate ho rahi hai — tab tak main quick answers de sakta hoon.\nJaldi response chahiye? WhatsApp (${SUPPORT_PHONE_DISPLAY}) ya ${SUPPORT_EMAIL} par ping karo.\nShortcuts: pricing, parking demo, website.`;
  }

  if (/(price|pricing|cost|budget|packages|quote|भाव|प्राइस|\u20b9)/i.test(q)) {
    return `Pricing har project ke scope par depend karti hai (website, app, AI, Smart Parking).\nHomepage par Pricing section dekho, ya Consultation book karo: /contact\nWhatsApp: ${waHref}`;
  }

  if (/(parking|barcode|sticker|society\s*parking)/i.test(q)) {
    return `Smart Parking: barcode sticker + gate scan → owner contact tak connect.\nDemo: /contact?service=Smart%20Parking&intent=demo\nFlow: homepage par Smart Parking → how it works.${messages.length <= 4 ? "\nDetailed AI jawab baad mein isi chat se milega." : ""}`;
  }

  if (/(website|web\b|landing|seo|domain|होस्ट)/i.test(q)) {
    return `Websites: custom design + mobile fast + WhatsApp/forms + analytics.\nQuote: /contact — scope bata do, hum jaldi revert karte hain.`;
  }

  if (/(app|mobile|android|ios|react native)/i.test(q)) {
    return `Apps: React Native se iOS + Android ek codebase.\nDiscuss: /contact — apna business type (salon/clinic/restaurant etc.) mention karna.`;
  }

  if (/(ai|automation|chatbot|gpt|workflow)/i.test(q)) {
    return `AI automation: chatbots, document flows, integrations.\nProcess discuss karne ke liye /contact use karo.`;
  }

  if (/(contact|call|whatsapp|mail|support|फोन|मोबाइल)/i.test(q)) {
    return `Reach us:\n• Phone/WhatsApp: ${SUPPORT_PHONE_DISPLAY} → ${waHref}\n• Email: ${SUPPORT_EMAIL}\n• Form: /contact`;
  }

  if (/(team|office|founder|ghaziabad|who are you)/i.test(q)) {
    return `Hum Ghaziabad / NCR se SMB digital delivery karte hain. Team dekho: /team`;
  }

  if (/\b(thanks?|thank you)\b/i.test(q) || /\u0927\u0928\u094d\u092f\u0935\u093e\u0926/u.test(q)) {
    return "You're welcome 🙂 — aur koi sawaal ho to likho.";
  }

  return `Is topic par detail ke liye /contact par message chhod do (${SUPPORT_EMAIL}).\nYahi chat jald AI se connect ho jayegi — tab tak shortcuts try karo: pricing, parking demo, website, contact.`;
}
