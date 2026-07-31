/** Shared contact outbound links — sourced from bitcraftly.com */
export const WHATSAPP_NUMBER = '919667710954';

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_CONSULTATION_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Sanjay — I'd like a FREE 15-minute consultation about my website/project.\n\nService: \n\nBusiness: \nWhat I need: \nPreferred timeline: ",
)}`;

export const WHATSAPP_AUDIT_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi Sanjay — I want the FREE website audit (speed, mobile UX & lead checklist).\n\nMy website URL: \nBusiness type: \nMain problem: ',
)}`;

export const WHATSAPP_PORTFOLIO_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi Sanjay — I saw your portfolio on Bitcraftly and want something similar.\n\nMy industry: \nReference project I liked: \nBudget (approx): \nTimeline: ',
)}`;

export const BITCRAFTLY_LEGACY_ORIGIN = 'https://bitcraftly.com';

/** Portfolio screenshot from `public/products` (same-origin static asset). */
export function bitcraftlyProductImage(fileName: string): string {
  return `/products/${encodeURIComponent(fileName)}`;
}
