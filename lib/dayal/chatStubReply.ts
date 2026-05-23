import { DAYAL } from "@/lib/dayal/data";

function norm(s: string) {
  return s.trim().toLowerCase();
}

/** Showcase demo replies — real-estate focused */
export function buildDayalStubReply(latestUserRaw: string): string {
  const q = norm(latestUserRaw);
  const waPhone = DAYAL.phones[0].display;

  if (!q.length) {
    return "Please type your question — projects, site visit, or pricing enquiry.";
  }

  if (/^(hi|hello|hey|namaste|hii)\b|^good (morning|afternoon|evening)/u.test(q)) {
    return `Namaste! Welcome to ${DAYAL.brand}.\nWe build premium homes in Jamshedpur — Char Sahebzade, Dayal Galaxy, Dayal Vatika & more.\nHow can I help you today?`;
  }

  if (/(char saheb|sahebzade|sahebzaade)/i.test(q)) {
    return `${DAYAL.heroHighlight} is our flagship ongoing development — modern design with quality construction in Govindpur.\nBook a site visit: #contact\nOr WhatsApp: ${DAYAL.phones[0].display}`;
  }

  if (/(ongoing|current project|under construction)/i.test(q)) {
    return "Ongoing projects include Char Sahebzade and other premium developments in Jamshedpur.\nScroll to Ongoing Projects on this page, or share your phone at #contact for a callback.";
  }

  if (/(future|upcoming|new launch)/i.test(q)) {
    return "Our Future Projects section lists upcoming landmarks — crafted for modern living.\nFor brochures & launch alerts, leave your details at #contact.";
  }

  if (/(past|completed|legacy)/i.test(q)) {
    return "Past projects like Dayal Galaxy, Dayal Vatika & Dayal Enclave reflect our track record in Jamshedpur.\nSee Past Projects on this page for details.";
  }

  if (/(price|pricing|cost|rate|budget|payment|emi|₹)/i.test(q)) {
    return "Pricing depends on project, floor plan & payment schedule.\nOur team shares accurate quotes after understanding your requirement.\nCall " +
      DAYAL.phones[0].display +
      " or fill the form at #contact.";
  }

  if (/(visit|site tour|book|appointment|schedule)/i.test(q)) {
    return `Site address: ${DAYAL.siteAddress}\nHead office: ${DAYAL.officeAddress}\nBook a visit via #contact — we'll confirm your slot shortly.`;
  }

  if (/(location|address|where|map|jamshedpur|govindpur|bistupur)/i.test(q)) {
    return `Head office: ${DAYAL.officeAddress}\nSite: ${DAYAL.siteAddress}\n${DAYAL.location}`;
  }

  if (/(amenit|club|gym|pool|parking)/i.test(q)) {
    return "Our projects offer thoughtfully planned amenities — club house, gym, gardens, security & more.\nSee the Amenities section on this page for the full list.";
  }

  if (/(contact|call|phone|whatsapp|email|reach)/i.test(q)) {
    return `Reach ${DAYAL.brand}:\n• Call: ${DAYAL.phones[0].display}\n• Alt: ${DAYAL.phones[1].display}\n• Email: ${DAYAL.email}\n• WhatsApp: ${waPhone}\n• Enquiry form: #contact`;
  }

  if (/\b(thanks?|thank you|dhanyavad)\b/i.test(q)) {
    return "You're welcome! For anything else about our projects, just ask.";
  }

  return `Thanks for your message. Our team will assist you shortly.\nTry: ongoing projects, site visit, or pricing.\nWhatsApp / call: ${waPhone}\nOr use the #contact form on this page.`;
}
