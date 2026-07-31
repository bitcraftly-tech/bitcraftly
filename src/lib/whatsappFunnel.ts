/**
 * WhatsApp lead conversion funnel — prefills, qualification, templates.
 * Used site-wide; founder reply templates are for CRM/WhatsApp ops reference.
 */

export type WhatsAppMessageKey =
  | 'default'
  | 'consultation'
  | 'audit'
  | 'portfolio'
  | 'pricing'
  | 'fastPackage'
  | 'services'
  | 'founder'
  | 'caseStudy'
  | 'landing48h'
  | 'business5day'
  | 'clinic'
  | 'gym'
  | 'coaching'
  | 'startupMvp'
  | 'aiChatbot'
  | 'urgent';

/** Pre-filled visitor messages — edit blanks before sending */
export const WHATSAPP_MESSAGES: Record<WhatsAppMessageKey, string> = {
  default:
    'Hi Sanjay — enquiry from bitcraftly.com. I need a website/project quote.\n\nBusiness: \nCity: \nWhat I need: \nBudget (approx): \nTimeline: ',
  consultation:
    "Hi Sanjay — I'd like a FREE 15-minute consultation about my website/project.\n\nService: \n\nBusiness: \nWhat I need: \nPreferred timeline: ",
  audit:
    'Hi Sanjay — I want the FREE website audit (speed, mobile UX & lead checklist).\n\nMy website URL: \nBusiness type: \nMain problem: ',
  portfolio:
    'Hi Sanjay — I saw your portfolio on Bitcraftly and want something similar.\n\nMy industry: \nReference project I liked: \nBudget (approx): \nTimeline: ',
  pricing:
    'Hi Sanjay — I checked Bitcraftly pricing and want a written estimate.\n\nPackage interested in: \nBusiness: \nPages/features needed: \nTimeline: ',
  fastPackage:
    'Hi Sanjay — I want to book a FAST-LAUNCH package from Bitcraftly.\n\nPackage: \nBusiness name: \nCity: \nContent ready (yes/no): \nPreferred start date: ',
  services:
    'Hi Sanjay — I need help with a React/Next.js frontend project.\n\nService: \nBusiness/startup: \nBrief: \nTimeline: ',
  founder:
    "Hi Sanjay — I'd prefer to speak with the founder directly about my project.\n\nBusiness: \nWhat I'm building: \nBudget: \nTimeline: ",
  caseStudy:
    'Hi Sanjay — I read a case study on Bitcraftly and want a similar build.\n\nProject type: \nMy business: \nBudget: ',
  landing48h:
    "Hi Sanjay — I'm interested in Landing Page in 48 Hours (₹8,999).\n\nOffer/campaign: \nBusiness: \nDeadline: ",
  business5day:
    "Hi Sanjay — I'm interested in Business Website in 5 Days (₹12,999).\n\nBusiness: \nPages needed: \nContent ready: yes/no",
  clinic:
    'Hi Sanjay — Clinic Website Package enquiry.\n\nClinic name: \nDoctors/specialties: \nCity: \nNeed appointments on WhatsApp: yes/no',
  gym: 'Hi Sanjay — Gym Website Package enquiry.\n\nGym/studio name: \nCity: \nPlans to show: \nTrial offer: ',
  coaching:
    'Hi Sanjay — Coaching Website Package enquiry.\n\nCoach/consultant name: \nOffer: \nCity/online: ',
  startupMvp:
    'Hi Sanjay — Startup MVP Frontend enquiry.\n\nStartup name: \nProduct type (SaaS/app): \nScreens/flows needed: \nTimeline: ',
  aiChatbot:
    'Hi Sanjay — AI Chatbot Integration for my website.\n\nBusiness: \nWebsite URL: \nMain FAQs to automate: ',
  urgent:
    'Hi Sanjay — URGENT timeline for website/project.\n\nBusiness: \nDeadline: \nScope: \nBudget: ',
};

export const FLOATING_WHATSAPP = {
  ariaLabel: 'WhatsApp Sanjay — free consultation, usually same-day reply',
  title: 'Message Sanjay on WhatsApp',
  headline: 'Chat with the founder',
  subline: 'Same-day reply · 10 AM – 9 PM IST · English or Hinglish',
  defaultCta: 'Quick enquiry',
  panelHint: 'Pick a message — edit before you send',
  closeLabel: 'Close',
} as const;

/** One-tap options on floating button panel */
export const INSTANT_INQUIRY_OPTIONS: {
  id: WhatsAppMessageKey;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'consultation',
    label: 'Free 15-min consultation',
    shortLabel: 'Free consult',
    description: 'Scope, stack & written estimate',
  },
  {
    id: 'fastPackage',
    label: 'Fast-launch package',
    shortLabel: 'Fast package',
    description: '5-day site, 48h landing, industry packs',
  },
  {
    id: 'audit',
    label: 'Free website audit',
    shortLabel: 'Free audit',
    description: 'Speed, mobile UX & lead checklist',
  },
  {
    id: 'pricing',
    label: 'Written price estimate',
    shortLabel: 'Get quote',
    description: 'Package or custom scope',
  },
];

export const INSTANT_INQUIRY_FLOW = {
  title: 'Instant WhatsApp inquiry',
  subtitle:
    'Tap → WhatsApp opens with a pre-filled message. Add your business name and send — Sanjay replies personally.',
  steps: [
    'Choose enquiry type (consultation, package, audit, or quote)',
    'WhatsApp opens — fill the blank lines (30 seconds)',
    'Founder replies same day with next steps or a call slot',
    'Written scope & starting price before payment',
  ],
  responsePromise: 'Usually replies within 2 hours · Founder-led — not a bot',
} as const;

/** What visitors should include — qualifies leads faster */
export const QUALIFICATION_QUESTIONS = [
  { id: 'business', question: 'Business name & industry', example: 'e.g. FitZone Gym, Ghaziabad' },
  {
    id: 'goal',
    question: 'Main goal',
    example: 'New site / redesign / landing page / MVP / AI chat',
  },
  { id: 'website', question: 'Current website (if any)', example: 'URL or “no website yet”' },
  { id: 'budget', question: 'Budget range (approx)', example: '₹8k–15k / ₹15k–30k / ₹30k+' },
  { id: 'timeline', question: 'Timeline', example: '48h / 1 week / 2–4 weeks / flexible' },
  {
    id: 'content',
    question: 'Content ready?',
    example: 'Logo, photos, copy — yes / partial / need help',
  },
] as const;

export const TRUST_WHATSAPP_COPY = {
  headline: 'Why WhatsApp works with Bitcraftly',
  body: 'You message Sanjay Kr. Singh directly — Tech Lead & founder (20+ yrs). No call-centre, no junior surprise after you pay.',
  points: [
    'Written scope & starting price before advance',
    'English or Hinglish — voice notes welcome',
    'India-wide & remote clients',
  ],
  founderLine:
    '“Main personally padhta hoon — scope clear likh ke bhejta hoon, phir hi payment.” — Sanjay, Bitcraftly',
} as const;

export const CONSULTATION_WHATSAPP_CTA = {
  headline: 'Book free consultation on WhatsApp',
  body: '15 minutes · video or phone · clear React/Next.js recommendation + written ballpark',
  button: 'WhatsApp — Book Free Consult',
  microcopy: 'Fastest for mobile — tap, fill 4 lines, send',
} as const;

export const FOUNDER_RESPONSE_COPY = {
  headline: 'What you get after you message',
  items: [
    'Acknowledgement same day (usually within 2 hours, 10 AM – 9 PM IST)',
    '2–3 clarifying questions if needed — not a generic brochure dump',
    'Written scope summary + starting price before any advance',
    'Optional 15-min call to align — your choice',
  ],
  hinglishNote: 'Reply Hindi, English, ya mix — bilkul theek hai.',
} as const;

export const MOBILE_WHATSAPP_UX = {
  stickyPrimary: 'Free consult',
  stickyWhatsApp: 'WhatsApp Sanjay',
  stickyHint: 'Thumb-friendly · opens WhatsApp with message ready',
  floatingPosition: 'Sits above mobile sticky bar — always one tap away',
  tip: 'Voice notes OK for explaining scope',
} as const;

/** Sanjay's quick replies (paste in WhatsApp Business) */
export const QUICK_REPLY_TEMPLATES = {
  ack: 'Namaste! Sanjay from Bitcraftly — thanks for reaching out. Main aapki details padh kar reply kar raha hoon. 1–2 ghante mein clear next step bhejunga.',
  askQualification:
    'Quick 4 lines bhej denge to scope fast ho jayega:\n1) Business name & city\n2) New site / redesign / landing / MVP?\n3) Budget range (approx)\n4) Timeline (urgent / 1–2 weeks / flexible)',
  consultOffer:
    'Free 15-min consultation offer kar sakta hoon — scope, React vs Next.js, aur written starting estimate. Kal/is week ka slot bata dena (10 AM – 9 PM IST).',
  auditOffer:
    'Free website audit kar sakte hain — URL bhej dena. Mobile speed, lead CTAs, aur 3 quick wins likh kar bhejunga (no obligation).',
  quoteSent:
    'Written scope + starting price bhej diya hai — dekh ke bata dena. Questions ho to seedha likh dena ya short call kar lenge.',
  followUp24h:
    'Hi — kal ki enquiry par follow-up. Koi sawal ho scope/price par to bata dena, warna main slot hold kar dunga?',
} as const;

/** Follow-up sequence (founder CRM — day 0 / 1 / 3) */
export const FOLLOW_UP_TEMPLATES = {
  day0AfterQuote:
    'Thanks again — scope sheet bhej di thi. Confirm kar dena jab ready ho, taaki timeline lock kar saken.',
  day1NoReply:
    'Hi — Bitcraftly se Sanjay. Aapki website enquiry par short follow-up — kya 15-min call useful hogi ya pehle written sawal?',
  day3LastTouch:
    'Last quick check — project abhi active hai? Agar pause hai to bata dena; slot kisi aur client ko de dunga. Future mein help chahiye ho to message karna.',
  postCall:
    'Call ke baad — summary:\n• Scope: \n• Stack: \n• Timeline: \n• Starting price: \nAdvance confirm hone par kickoff date share karunga.',
} as const;

export type WhatsAppInquiryParams = {
  source?: string | null;
  service?: string | null;
  intent?: string | null;
};

function buildConsultationMessage(service?: string): string {
  const template = WHATSAPP_MESSAGES.consultation;
  const trimmed = service?.trim();
  if (!trimmed) return template;
  return template.replace('Service: \n', `Service: ${trimmed}\n`);
}

/** Map URL params → best prefill message */
export function resolveWhatsAppMessage(params: WhatsAppInquiryParams): string {
  const intent = (params.intent || '').toLowerCase();
  const source = (params.source || '').toLowerCase();
  const service = (params.service || '').trim();

  if (intent === 'audit') return WHATSAPP_MESSAGES.audit;

  if (intent === 'consultation' || source.includes('consultation') || source.includes('founder')) {
    return buildConsultationMessage(service);
  }

  if (service) {
    const s = service.toLowerCase();
    if (s.includes('48') || s.includes('landing page in 48')) return WHATSAPP_MESSAGES.landing48h;
    if (s.includes('5 day') || s.includes('business website in 5'))
      return WHATSAPP_MESSAGES.business5day;
    if (s.includes('clinic')) return WHATSAPP_MESSAGES.clinic;
    if (s.includes('gym')) return WHATSAPP_MESSAGES.gym;
    if (s.includes('coach')) return WHATSAPP_MESSAGES.coaching;
    if (s.includes('mvp') || s.includes('startup')) return WHATSAPP_MESSAGES.startupMvp;
    if (s.includes('chatbot') || s.includes('ai')) return WHATSAPP_MESSAGES.aiChatbot;
    if (s.includes('fast') || source.includes('fast-package')) {
      return `${WHATSAPP_MESSAGES.fastPackage.replace('Package: ', `Package: ${service}`)}`;
    }
    return `${WHATSAPP_MESSAGES.pricing.replace('Package interested in: ', `Package interested in: ${service}`)}`;
  }

  if (source.includes('audit')) return WHATSAPP_MESSAGES.audit;
  if (source.includes('portfolio') || source.includes('case-study'))
    return WHATSAPP_MESSAGES.caseStudy;
  if (source.includes('pricing') || source.includes('fast-package'))
    return WHATSAPP_MESSAGES.fastPackage;
  if (source.includes('services')) return WHATSAPP_MESSAGES.services;

  return WHATSAPP_MESSAGES.default;
}

export function appendServiceToMessage(base: string, service: string): string {
  if (!service.trim()) return base;
  if (base.includes(service)) return base;
  return base.replace(/\n\n$/, '') + `\n\nPackage/Service: ${service.trim()}`;
}
