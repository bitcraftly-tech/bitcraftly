import {
  AMENITIES,
  DAYAL,
  FUTURE_PROJECTS,
  ONGOING_PROJECTS,
  PAST_PROJECTS,
} from '@/lib/dayal/data';

function norm(s: string) {
  return s.trim().toLowerCase();
}

function projectSummary(
  projects: readonly { name: string; location: string; tagline: string }[],
): string {
  return projects
    .map((project) => `• ${project.name} — ${project.location}; ${project.tagline}`)
    .join('\n');
}

/** Showcase demo replies — real-estate focused */
export function buildDayalStubReply(latestUserRaw: string): string {
  const q = norm(latestUserRaw);
  const waPhone = DAYAL.phones[0].display;

  if (!q.length) {
    return 'Please type your question — projects, site visit, or pricing enquiry.';
  }

  if (/^(hi|hello|hey|namaste|hii)\b|^good (morning|afternoon|evening)/u.test(q)) {
    return `Namaste! Welcome to ${DAYAL.brand}.\nWe build premium homes in Jamshedpur — Char Sahebzade, Dayal Galaxy, Dayal Vatika & more.\nHow can I help you today?`;
  }

  if (/(char saheb|sahebzade|sahebzaade)/i.test(q)) {
    const project = FUTURE_PROJECTS.find((item) => item.id === 'char-sahib-zaade');
    return `${DAYAL.heroHighlight} is a future project in ${project?.location ?? 'Chhota Govindpur, Jamshedpur'} — ${project?.description ?? 'heritage-inspired architecture with contemporary comforts.'}\nFor availability, floor plans, or a site visit, use the contact form or call ${DAYAL.phones[0].display}.`;
  }

  if (/(ongoing|current project|under construction)/i.test(q)) {
    return `Current ongoing projects:\n${projectSummary(ONGOING_PROJECTS)}\nFor availability or pricing, use the contact form or call ${waPhone}.`;
  }

  if (/(future|upcoming|new launch)/i.test(q)) {
    return `Upcoming projects:\n${projectSummary(FUTURE_PROJECTS)}\nFor brochures and launch updates, use the contact form on this page.`;
  }

  if (/(past|completed|legacy)/i.test(q)) {
    return `Completed projects:\n${projectSummary(PAST_PROJECTS)}\nYou can explore their details in the Past Projects section.`;
  }

  if (/(price|pricing|cost|rate|budget|payment|emi|₹)/i.test(q)) {
    return (
      'Pricing depends on project, floor plan & payment schedule.\nOur team shares accurate quotes after understanding your requirement.\nCall ' +
      DAYAL.phones[0].display +
      ' or fill the form at #contact.'
    );
  }

  if (/(visit|site tour|book|appointment|schedule)/i.test(q)) {
    return `Site address: ${DAYAL.siteAddress}\nHead office: ${DAYAL.officeAddress}\nBook a visit via #contact — we'll confirm your slot shortly.`;
  }

  if (/(location|address|where|map|jamshedpur|govindpur|bistupur)/i.test(q)) {
    return `Head office: ${DAYAL.officeAddress}\nSite: ${DAYAL.siteAddress}\n${DAYAL.location}`;
  }

  if (/(amenit|club|gym|pool|parking)/i.test(q)) {
    return `Typical amenities include ${AMENITIES.map((item) => item.name).join(', ')}.\nAmenities can vary by project, so please confirm the final list with our team.`;
  }

  if (/(contact|call|phone|whatsapp|email|reach)/i.test(q)) {
    return `Reach ${DAYAL.brand}:\n• Call: ${DAYAL.phones[0].display}\n• Alt: ${DAYAL.phones[1].display}\n• Email: ${DAYAL.email}\n• WhatsApp: ${waPhone}\n• Enquiry form: #contact`;
  }

  if (/\b(thanks?|thank you|dhanyavad)\b/i.test(q)) {
    return "You're welcome! For anything else about our projects, just ask.";
  }

  return `Thanks for your message. Our team will assist you shortly.\nTry: ongoing projects, site visit, or pricing.\nWhatsApp / call: ${waPhone}\nOr use the #contact form on this page.`;
}
