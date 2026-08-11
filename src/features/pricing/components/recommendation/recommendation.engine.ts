/** Frontend-only project recommendation engine — no API / AI service. */

export type BusinessCategory =
  | 'Healthcare'
  | 'E-commerce'
  | 'Business Application'
  | 'Education'
  | 'Real Estate'
  | 'Hospitality'
  | 'Professional Services'
  | 'SaaS / Product'
  | 'General Business';

export type ProjectTypeLabel =
  | 'Marketing Website'
  | 'Business Website'
  | 'E-commerce Website'
  | 'Business Application'
  | 'AI Solution'
  | 'Corporate Website';

export interface ProjectRecommendation {
  readonly projectType: ProjectTypeLabel;
  readonly businessCategory: BusinessCategory;
  readonly packageName: string;
  readonly packageSummary: string;
  readonly timeline: string;
  readonly minLabel: string;
  readonly maxLabel: string;
  readonly techStack: readonly string[];
  readonly addOns: readonly string[];
  readonly whyRecommendation: string;
  readonly reply: string;
}

interface IndustryRule {
  readonly category: BusinessCategory;
  readonly pattern: RegExp;
  readonly defaultAddOns: readonly string[];
}

const INDUSTRY_RULES: readonly IndustryRule[] = [
  {
    category: 'Healthcare',
    pattern:
      /clinic|hospital|doctor|dental|dentist|pharma|medical|healthcare|patient|physio|ayurved/,
    defaultAddOns: ['Appointment Booking', 'WhatsApp', 'Google Reviews', 'Doctor Profiles'],
  },
  {
    category: 'E-commerce',
    pattern:
      /e-?commerce|ecommerce|grocery|shop|store|retail|marketplace|cart|checkout|inventory|delivery/,
    defaultAddOns: ['Inventory', 'Payment Gateway (Razorpay)', 'Admin Panel', 'Delivery'],
  },
  {
    category: 'Education',
    pattern: /school|college|course|edu|learning|tuition|coaching|lms|student/,
    defaultAddOns: ['Course Catalog', 'Enquiries', 'CMS', 'WhatsApp'],
  },
  {
    category: 'Real Estate',
    pattern: /real.?estate|property|builder|housing|listing|broker/,
    defaultAddOns: ['Property Listings', 'Lead Forms', 'WhatsApp', 'SEO'],
  },
  {
    category: 'Hospitality',
    pattern: /hotel|restaurant|cafe|resort|travel|tourism|booking/,
    defaultAddOns: ['Online Booking', 'Menu / Catalog', 'WhatsApp', 'Payments'],
  },
  {
    category: 'SaaS / Product',
    pattern: /saas|crm|erp|dashboard|portal|admin panel|subscription|b2b platform/,
    defaultAddOns: ['Auth', 'Roles & Permissions', 'Admin Panel', 'API'],
  },
  {
    category: 'Professional Services',
    pattern: /lawyer|ca\b|consultant|agency|studio|freelance|law firm|accountant/,
    defaultAddOns: ['Lead Forms', 'CMS', 'SEO', 'WhatsApp'],
  },
] as const;

function detectBusinessCategory(text: string): BusinessCategory {
  for (const rule of INDUSTRY_RULES) {
    if (rule.pattern.test(text)) {
      return rule.category;
    }
  }
  return 'General Business';
}

function industryAddOns(category: BusinessCategory): readonly string[] {
  const rule = INDUSTRY_RULES.find((item) => item.category === category);
  return rule?.defaultAddOns ?? ['SEO', 'Analytics', 'CMS', 'WhatsApp'];
}

function mergeAddOns(
  base: readonly string[],
  extras: readonly string[],
  limit = 4,
): readonly string[] {
  return [...new Set([...base, ...extras])].slice(0, limit);
}

function whyCopy(
  packageName: string,
  category: BusinessCategory,
  projectType: ProjectTypeLabel,
): string {
  if (category === 'Healthcare') {
    return `Based on your ${category.toLowerCase()} needs, the ${packageName} package balances trust-building content, appointment flows, and a practical timeline for clinics and care brands.`;
  }
  if (category === 'E-commerce') {
    return `Based on your project size and expected features, the ${packageName} package offers the best balance between scalability, timeline and investment for online retail.`;
  }
  if (category === 'Business Application' || projectType === 'Business Application') {
    return `Based on your workflow and data requirements, a ${packageName} gives the right foundation for roles, admin operations, and long-term product growth.`;
  }
  return `Based on your project size and expected features, the ${packageName} package offers the best balance between scalability, timeline and investment.`;
}

export function buildProjectRecommendation(prompt: string, priorContext = ''): ProjectRecommendation {
  const text = `${priorContext} ${prompt}`.toLowerCase();
  const category = detectBusinessCategory(text);

  const wantsCrm = /\bcrm\b|customer relationship|lead pipeline|sales pipeline/.test(text);
  const wantsFaster = /faster|urgent|asap|quick|soon/.test(text);
  const wantsAi = /ai|chat|bot|automat|assistant/.test(text);
  const wantsCorporate = /corporate|enterprise|multi-?language/.test(text);
  const wantsStarter = /starter|brochure|landing|simple|one.?page/.test(text);
  const wantsEcommerce =
    category === 'E-commerce' ||
    /e-?commerce|grocery|online store|shop|marketplace/.test(text);
  const wantsApp =
    wantsCrm ||
    category === 'SaaS / Product' ||
    /web app|dashboard|portal|saas|erp|admin system/.test(text);

  // CRM / custom application path
  if (wantsCrm || (wantsApp && !wantsEcommerce && category === 'SaaS / Product')) {
    const packageName = 'Custom Web Application';
    const projectType: ProjectTypeLabel = 'Business Application';
    return {
      projectType,
      businessCategory: wantsCrm ? 'Business Application' : category,
      packageName,
      packageSummary: 'Custom workflows, authenticated access, and operator-ready admin surfaces.',
      timeline: wantsFaster ? '6–8 weeks' : '8–12 weeks',
      minLabel: '₹1,49,999',
      maxLabel: 'Custom',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      addOns: mergeAddOns(industryAddOns('SaaS / Product'), wantsAi ? ['AI Assistant'] : []),
      whyRecommendation: whyCopy(packageName, 'Business Application', projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  // E-commerce / grocery
  if (wantsEcommerce) {
    const packageName = 'Professional Website';
    const projectType: ProjectTypeLabel = 'E-commerce Website';
    return {
      projectType,
      businessCategory: 'E-commerce',
      packageName,
      packageSummary:
        'Catalog-ready storefront with Razorpay payment gateway, admin, and growth-ready UX.',
      timeline: wantsFaster ? '4–5 weeks' : '4–6 weeks',
      minLabel: '₹60,000',
      maxLabel: '₹1,00,000',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Razorpay', 'Tailwind'],
      addOns: mergeAddOns(
        ['Payment Gateway (Razorpay)', ...industryAddOns('E-commerce')],
        wantsAi ? ['AI Chatbot'] : [],
      ),
      whyRecommendation: whyCopy(packageName, 'E-commerce', projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  // Healthcare / clinic
  if (category === 'Healthcare') {
    const packageName = 'Business Website';
    const projectType: ProjectTypeLabel = 'Business Website';
    return {
      projectType,
      businessCategory: 'Healthcare',
      packageName,
      packageSummary: 'Trust-focused clinic site with enquiry and appointment-ready foundations.',
      timeline: wantsFaster ? '2–3 weeks' : '2–3 weeks',
      minLabel: '₹35,000',
      maxLabel: '₹60,000',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      addOns: mergeAddOns(industryAddOns('Healthcare'), wantsAi ? ['AI Chatbot'] : []),
      whyRecommendation: whyCopy(packageName, 'Healthcare', projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  if (wantsCorporate) {
    const packageName = 'Corporate Website';
    const projectType: ProjectTypeLabel = 'Corporate Website';
    return {
      projectType,
      businessCategory: category,
      packageName,
      packageSummary: 'Custom design, advanced integrations, and dedicated delivery support.',
      timeline: wantsFaster ? '6–10 weeks' : '8–14 weeks',
      minLabel: '₹1,00,000',
      maxLabel: '₹1,00,000+',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      addOns: mergeAddOns(industryAddOns(category), ['Multi-language', 'CMS']),
      whyRecommendation: whyCopy(packageName, category, projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  if (wantsAi && !wantsStarter) {
    const packageName = 'Business Website';
    const projectType: ProjectTypeLabel = 'AI Solution';
    return {
      projectType,
      businessCategory: category,
      packageName,
      packageSummary: 'Conversion-ready site with AI-assisted engagement and lead capture.',
      timeline: wantsFaster ? '2–3 weeks' : '2–4 weeks',
      minLabel: '₹35,000',
      maxLabel: '₹60,000',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      addOns: mergeAddOns(industryAddOns(category), ['AI Chatbot', 'Analytics']),
      whyRecommendation: whyCopy(packageName, category, projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  if (wantsStarter) {
    const packageName = 'Starter Website';
    const projectType: ProjectTypeLabel = 'Marketing Website';
    return {
      projectType,
      businessCategory: category,
      packageName,
      packageSummary: 'Focused launch site with clear CTAs and essential integrations.',
      timeline: wantsFaster ? '5–10 days' : '1–2 weeks',
      minLabel: '₹15,000',
      maxLabel: '₹25,000',
      techStack: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
      addOns: mergeAddOns(['WhatsApp', 'Basic SEO'], industryAddOns(category)).slice(0, 4),
      whyRecommendation: whyCopy(packageName, category, projectType),
      reply: 'Here’s a personalized recommendation based on your brief.',
    };
  }

  // Default business website — still industry-aware via add-ons
  const packageName = 'Business Website';
  const projectType: ProjectTypeLabel = 'Business Website';
  return {
    projectType,
    businessCategory: category,
    packageName,
    packageSummary: 'Premium business site with lead capture and room to grow via add-ons.',
    timeline: wantsFaster ? '2–3 weeks' : '2–4 weeks',
    minLabel: '₹35,000',
    maxLabel: '₹60,000',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    addOns: mergeAddOns(industryAddOns(category), ['SEO', 'Analytics']),
    whyRecommendation: whyCopy(packageName, category, projectType),
    reply: 'Here’s a personalized recommendation based on your brief.',
  };
}
