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
    return "Send something — you can ask about pricing, demos, or Smart Parking.";
  }

  if (/^(hi|hello|hey|namaste|नमस्ते|hii)\b|^good (morning|afternoon|evening)/u.test(q)) {
    return `Hi / Namaste! I'm Bitcraftly's assistant — English ya Hinglish, dono theek.\nLive AI is being integrated — until then I can share quick answers.\nNeed a fast reply? WhatsApp (${SUPPORT_PHONE_DISPLAY}) ya email ${SUPPORT_EMAIL} fastest.\nShortcuts: pricing, parking demo, website.`;
  }

  if (/(price|pricing|cost|budget|packages|quote|भाव|प्राइस|\u20b9)/i.test(q)) {
    return `Pricing depends on scope (website, app, AI, Smart Parking).\nSee the Pricing section on the homepage, or book a consultation: /contact\nWhatsApp: ${waHref}`;
  }

  if (/(parking|barcode|sticker|society\s*parking)/i.test(q)) {
    return `Smart Parking: barcode sticker + gate scan → connect to the owner.\nDemo: /contact?service=Smart%20Parking&intent=demo\nFlow: homepage → Smart Parking → how it works.${messages.length <= 4 ? "\nMore detailed AI answers will land in this chat soon." : ""}`;
  }

  if (/(website|web\b|landing|seo|domain|होस्ट)/i.test(q)) {
    return `Websites: custom design, fast on mobile, WhatsApp/forms, analytics.\nQuote: /contact — share your scope and we'll respond quickly.`;
  }

  if (/(app|mobile|android|ios|react native)/i.test(q)) {
    return `Apps: React Native for iOS + Android from one codebase.\nDiscuss: /contact — mention your business type (salon, clinic, restaurant, etc.).`;
  }

  if (/(ai|automation|chatbot|gpt|workflow)/i.test(q)) {
    return `AI automation: chatbots, document flows, integrations.\nTo walk through the process, use /contact.`;
  }

  if (/(contact|call|whatsapp|mail|support|फोन|मोबाइल)/i.test(q)) {
    return `Reach us:\n• Phone/WhatsApp: ${SUPPORT_PHONE_DISPLAY} → ${waHref}\n• Email: ${SUPPORT_EMAIL}\n• Form: /contact`;
  }

  if (/(team|office|founder|ghaziabad|who are you)/i.test(q)) {
    return `We're a Ghaziabad / NCR team shipping digital projects for SMBs. See /team`;
  }

  if (/\b(thanks?|thank you)\b/i.test(q) || /\u0927\u0928\u094d\u092f\u0935\u093e\u0926/u.test(q)) {
    return "You're welcome 🙂 — aur koi sawaal ho to likh dena!";
  }

  return `For more detail on that topic, leave a message at /contact (${SUPPORT_EMAIL}).\nThis chat will connect to AI soon — meanwhile try shortcuts: pricing, parking demo, website, contact.`;
}
