import type {
  DiscoveryAnswers,
  DiscoveryRecommendation,
} from './types';

function unique(items: readonly string[]): readonly string[] {
  return [...new Set(items)];
}

export function buildDiscoveryRecommendation(
  answers: DiscoveryAnswers,
): DiscoveryRecommendation {
  const product = answers.product ?? 'website';
  const industry = answers.industry ?? 'other';
  const budget = answers.budget ?? '50k-1l';
  const timeline = answers.timeline ?? 'flexible';
  const features = answers.features;

  let packageName = 'Business Website';
  let packageSummary = 'A conversion-focused website with clear messaging and enquiry paths.';
  let estimatedInvestment = '₹35,000 – ₹60,000';
  let estimatedTimeline = '4–6 weeks';
  const techStack: string[] = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'];
  const suggestedAddOns: string[] = [];
  const why: string[] = [];

  switch (product) {
    case 'website':
      packageName = budget === 'below-50k' ? 'Starter Website' : 'Business Website';
      packageSummary =
        'Marketing site with strong SEO foundations, responsive layouts, and lead capture.';
      estimatedInvestment = budget === 'below-50k' ? '₹15,000 – ₹35,000' : '₹35,000 – ₹60,000';
      estimatedTimeline = timeline === 'urgent' ? '2–3 weeks' : '4–6 weeks';
      techStack.push('SEO');
      why.push('Website scope fits your goal of launching a credible digital presence quickly.');
      break;
    case 'web-app':
      packageName = features.includes('inventory') || features.includes('reports')
        ? 'Custom Operations App'
        : 'Custom Web Application';
      packageSummary =
        'Authenticated web application with workflows, admin tools, and scalable architecture.';
      estimatedInvestment =
        budget === '5l-plus' ? '₹5,00,000+' : budget === '1l-5l' ? '₹1,50,000 – ₹4,50,000' : '₹75,000 – ₹1,50,000';
      estimatedTimeline =
        timeline === 'urgent' || timeline === '1-month' ? '6–8 weeks' : '8–14 weeks';
      techStack.push('Node.js', 'PostgreSQL');
      why.push('Web app scope benefits from structured modules and a durable data model.');
      break;
    case 'mobile-app':
      packageName = 'Cross-Platform Mobile App';
      packageSummary =
        'React Native mobile experience with shared logic and API-backed features.';
      estimatedInvestment =
        budget === '5l-plus' ? '₹5,00,000+' : '₹1,00,000 – ₹3,50,000';
      estimatedTimeline = timeline === 'flexible' ? '10–16 weeks' : '8–12 weeks';
      techStack.push('React Native', 'Node.js', 'PostgreSQL');
      why.push('Mobile delivery pairs best with a clear MVP feature set and API foundation.');
      break;
    case 'ai-solution':
      packageName = 'AI Solution Package';
      packageSummary =
        'Practical AI product — chatbot, automation, or assistant — grounded in your workflows.';
      estimatedInvestment =
        budget === 'below-50k' ? '₹40,000 – ₹80,000' : '₹80,000 – ₹3,00,000';
      estimatedTimeline = timeline === 'urgent' ? '4–6 weeks' : '6–10 weeks';
      techStack.push('OpenAI', 'Python', 'PostgreSQL');
      why.push('AI is recommended only where it improves response time, conversion, or ops speed.');
      break;
    default:
      packageName = 'Custom Discovery Build';
      packageSummary =
        'A tailored engagement starting with discovery to define the right product shape.';
      estimatedInvestment =
        budget === '5l-plus' ? '₹5,00,000+' : '₹50,000 – ₹2,50,000';
      estimatedTimeline = 'Discovery first · 1–2 weeks scoping';
      techStack.push('Node.js', 'PostgreSQL');
      why.push('Custom scope needs a short discovery before locking package and timeline.');
  }

  if (industry === 'healthcare') {
    suggestedAddOns.push('Booking & reminders', 'Role-based staff access');
    why.push('Healthcare often needs scheduling clarity and careful access control.');
  } else if (industry === 'retail') {
    suggestedAddOns.push('Catalog management', 'Order tracking');
  } else if (industry === 'real-estate') {
    suggestedAddOns.push('Lead capture forms', 'Project showcase pages');
  } else if (industry === 'finance') {
    suggestedAddOns.push('Audit-friendly logging', 'Hardened auth flows');
  } else if (industry === 'education') {
    suggestedAddOns.push('Enrollment flows', 'Progress tracking');
  } else if (industry === 'manufacturing') {
    suggestedAddOns.push('Inventory visibility', 'Ops dashboards');
  } else if (industry === 'travel') {
    suggestedAddOns.push('Booking journeys', 'Support chatbot');
  }

  if (features.includes('authentication')) {
    suggestedAddOns.push('Secure authentication');
    if (!techStack.includes('Auth')) techStack.push('Auth');
  }
  if (features.includes('admin')) suggestedAddOns.push('Admin console');
  if (features.includes('payments')) {
    suggestedAddOns.push('Payment integration');
    estimatedInvestment = bumpInvestmentBand(estimatedInvestment);
  }
  if (features.includes('dashboard')) suggestedAddOns.push('Analytics dashboard');
  if (features.includes('ai') && product !== 'ai-solution') {
    suggestedAddOns.push('AI assistant module');
    if (!techStack.includes('OpenAI')) techStack.push('OpenAI');
  }
  if (features.includes('cms')) suggestedAddOns.push('CMS / content tools');
  if (features.includes('booking')) suggestedAddOns.push('Booking system');
  if (features.includes('inventory')) suggestedAddOns.push('Inventory module');
  if (features.includes('reports')) suggestedAddOns.push('Reporting suite');

  if (timeline === 'urgent') {
    why.push('Urgent timelines favor a tighter MVP and phased add-ons after launch.');
  } else if (timeline === 'flexible') {
    why.push('Flexible timing allows stronger architecture and polish before launch.');
  }

  if (budget === 'below-50k' && (product === 'web-app' || product === 'mobile-app')) {
    why.push('Budget suggests a focused MVP — we’ll prioritize must-have features first.');
    packageSummary += ' Scoped as an MVP to match budget while preserving a clean path to scale.';
  }

  if (features.length >= 5) {
    why.push('Feature breadth is high — expect phased delivery across milestones.');
  }

  return {
    packageName,
    packageSummary,
    estimatedTimeline,
    estimatedInvestment,
    techStack: unique(techStack),
    suggestedAddOns: unique(suggestedAddOns).slice(0, 6),
    why: why.slice(0, 4),
  };
}

function bumpInvestmentBand(current: string): string {
  if (current.includes('15,000')) return '₹25,000 – ₹45,000';
  if (current.includes('35,000 – ₹60,000')) return '₹45,000 – ₹80,000';
  if (current.includes('75,000')) return '₹1,00,000 – ₹2,00,000';
  return current;
}

export const EMPTY_DISCOVERY_ANSWERS = {
  product: null,
  industry: null,
  budget: null,
  timeline: null,
  features: [],
} as const;
