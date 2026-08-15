import type { WizardAnswers, WizardPhase, WizardRecommendation } from './types';

function unique(items: readonly string[]): readonly string[] {
  return [...new Set(items)];
}

const DEFAULT_PHASES: readonly WizardPhase[] = [
  {
    id: 'discover',
    title: 'Discovery',
    description: 'Goals, users, constraints, and success metrics.',
    duration: '3–5 days',
  },
  {
    id: 'design',
    title: 'Solution design',
    description: 'Architecture, UX direction, and written scope.',
    duration: '1 week',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Milestone delivery with demos on real progress.',
    duration: 'Core build',
  },
  {
    id: 'launch',
    title: 'Launch & handoff',
    description: 'QA, go-live checklist, and ownership transfer.',
    duration: '1 week',
  },
] as const;

export const EMPTY_WIZARD_ANSWERS: WizardAnswers = {
  product: null,
  industry: null,
  goals: [],
  budget: null,
  timeline: null,
};

export function buildWizardRecommendation(answers: WizardAnswers): WizardRecommendation {
  const product = answers.product ?? 'not-sure';
  const industry = answers.industry ?? 'other';
  const goals = answers.goals;
  const budget = answers.budget ?? '50k-1l';
  const timeline = answers.timeline ?? '2-months';

  let solutionName = 'Custom Digital Solution';
  let solutionSummary = 'A scoped product engagement tailored to your goals and constraints.';
  let bestPackage = 'Business Package';
  let packageSummary = 'Balanced scope for quality, speed, and maintainability.';
  let estimatedCost = '₹50,000 – ₹1,50,000';
  let estimatedTimeline = '6–10 weeks';
  const suggestedTechnology: string[] = ['Next.js', 'React', 'TypeScript'];
  const aiOpportunities: string[] = [];
  const recommendedAddOns: string[] = [];
  const why: string[] = [];
  let phases: WizardPhase[] = [...DEFAULT_PHASES];

  switch (product) {
    case 'website':
      solutionName = 'Conversion-Focused Business Website';
      solutionSummary = 'A premium website engineered for trust, SEO, and enquiry conversion.';
      bestPackage = budget === 'below-50k' ? 'Starter Website' : 'Business Website';
      packageSummary =
        budget === 'below-50k'
          ? 'Focused pages, responsive design, and lead capture.'
          : 'Deeper content structure, stronger UI, and growth-ready foundations.';
      estimatedCost = budget === 'below-50k' ? '₹15,000 – ₹35,000' : '₹35,000 – ₹60,000';
      estimatedTimeline = timeline === 'asap' ? '2–3 weeks' : '4–6 weeks';
      suggestedTechnology.push('Tailwind CSS', 'SEO');
      why.push('Website scope fits a fast path to market with clear lead outcomes.');
      break;

    case 'web-application':
      solutionName = 'Custom Web Application';
      solutionSummary =
        'An authenticated application for workflows, data, and operational control.';
      bestPackage =
        goals.includes('erp') || goals.includes('crm')
          ? 'Custom Operations Platform'
          : 'Business Web Application';
      packageSummary = 'Modular product build with roles, dashboards, and API-ready architecture.';
      estimatedCost =
        budget === '5l-plus'
          ? '₹5,00,000+'
          : budget === '1l-5l'
            ? '₹1,50,000 – ₹4,50,000'
            : '₹75,000 – ₹1,50,000';
      estimatedTimeline =
        timeline === 'asap' || timeline === '1-month' ? '6–8 weeks' : '8–14 weeks';
      suggestedTechnology.push('Node.js', 'PostgreSQL', 'Auth');
      why.push('Web apps benefit from durable data models and phased module delivery.');
      phases = [
        DEFAULT_PHASES[0]!,
        DEFAULT_PHASES[1]!,
        {
          id: 'mvp',
          title: 'MVP build',
          description: 'Core workflows, auth, and primary dashboard.',
          duration: '4–8 weeks',
        },
        {
          id: 'expand',
          title: 'Module expansion',
          description: 'Secondary workflows, reporting, and integrations.',
          duration: '2–4 weeks',
        },
        DEFAULT_PHASES[3]!,
      ];
      break;

    case 'mobile-app':
      solutionName = 'Cross-Platform Mobile Product';
      solutionSummary = 'A mobile experience with shared logic and API-backed features.';
      bestPackage = 'Mobile App MVP';
      packageSummary = 'React Native foundation with core screens and backend APIs.';
      estimatedCost = budget === '5l-plus' ? '₹5,00,000+' : '₹1,00,000 – ₹3,50,000';
      estimatedTimeline = timeline === '3-plus-months' ? '12–16 weeks' : '8–12 weeks';
      suggestedTechnology.push('React Native', 'Node.js', 'PostgreSQL');
      why.push('Mobile delivery works best with a tight MVP and clear platform priorities.');
      break;

    case 'ai-product':
      solutionName = 'AI Product System';
      solutionSummary =
        'A practical AI product grounded in your data, workflows, and escalation rules.';
      bestPackage = 'AI Solution Package';
      packageSummary = 'Chatbot, automation, or agent scope with monitoring and guardrails.';
      estimatedCost = budget === 'below-50k' ? '₹40,000 – ₹80,000' : '₹80,000 – ₹3,00,000';
      estimatedTimeline = timeline === 'asap' ? '4–6 weeks' : '6–10 weeks';
      suggestedTechnology.push('OpenAI', 'Python', 'PostgreSQL', 'Vector Search');
      aiOpportunities.push(
        'Grounded assistants for FAQs and lead qualification',
        'Workflow automation with human approval points',
      );
      why.push('AI is recommended where it improves speed, conversion, or ops load.');
      break;

    case 'saas-platform':
      solutionName = 'SaaS Platform Foundation';
      solutionSummary =
        'Multi-tenant product architecture focused on activation, scale, and ownership.';
      bestPackage = 'SaaS Starter Platform';
      packageSummary = 'Auth, tenancy, dashboards, and CI/CD-ready product shell.';
      estimatedCost = budget === '5l-plus' ? '₹5,00,000+' : '₹2,00,000 – ₹5,00,000';
      estimatedTimeline = '10–18 weeks';
      suggestedTechnology.push('Node.js', 'PostgreSQL', 'Docker', 'AWS');
      why.push('SaaS needs strong foundations early — tenancy, auth, and observability.');
      phases = [
        DEFAULT_PHASES[0]!,
        DEFAULT_PHASES[1]!,
        {
          id: 'platform',
          title: 'Platform core',
          description: 'Auth, tenancy, billing-ready architecture, and base UI.',
          duration: '6–10 weeks',
        },
        {
          id: 'features',
          title: 'Feature modules',
          description: 'Priority product workflows and dashboards.',
          duration: '4–6 weeks',
        },
        DEFAULT_PHASES[3]!,
      ];
      break;

    default:
      solutionName = 'Guided Discovery Build';
      solutionSummary =
        'Start with structured discovery to choose between website, app, AI, or SaaS.';
      bestPackage = 'Discovery + Recommendation';
      packageSummary = 'Short scoping engagement that produces a clear build plan.';
      estimatedCost = '₹25,000 – ₹75,000 for discovery · build quoted after';
      estimatedTimeline = '1–2 weeks discovery';
      suggestedTechnology.push('Node.js', 'PostgreSQL');
      why.push('When the product shape is unclear, discovery prevents wasted build spend.');
  }

  // Goals
  if (goals.includes('generate-leads')) {
    recommendedAddOns.push('Lead capture forms', 'WhatsApp handoff');
    if (product === 'website') aiOpportunities.push('Lead-qualifying chatbot on key pages');
  }
  if (goals.includes('automate-business')) {
    recommendedAddOns.push('Workflow automation');
    aiOpportunities.push('Automate repetitive ops tasks with review checkpoints');
  }
  if (goals.includes('sell-products')) {
    recommendedAddOns.push('Catalog & checkout');
    suggestedTechnology.push('Payments');
  }
  if (goals.includes('internal-dashboard')) {
    recommendedAddOns.push('Analytics dashboard');
    suggestedTechnology.push('Charts');
  }
  if (goals.includes('booking')) {
    recommendedAddOns.push('Booking & reminders');
    if (industry === 'healthcare' || industry === 'restaurant' || industry === 'travel') {
      aiOpportunities.push('Booking assistant for availability and FAQs');
    }
  }
  if (goals.includes('crm')) {
    recommendedAddOns.push('CRM pipeline');
    solutionSummary += ' Includes CRM-oriented follow-up and ownership flows.';
  }
  if (goals.includes('erp')) {
    recommendedAddOns.push('Inventory / ops modules');
    suggestedTechnology.push('Redis');
  }
  if (goals.includes('marketplace')) {
    recommendedAddOns.push('Two-sided marketplace workflows');
    estimatedCost = bumpCost(estimatedCost);
  }
  if (goals.includes('ai') || product === 'ai-product') {
    aiOpportunities.push('Domain-tuned AI for support, search, or recommendations');
    recommendedAddOns.push('AI assistant module');
    if (!suggestedTechnology.includes('OpenAI')) suggestedTechnology.push('OpenAI');
  }

  // Industry
  if (industry === 'healthcare') {
    recommendedAddOns.push('Role-based staff access');
    why.push('Healthcare needs scheduling clarity and careful access control.');
  } else if (industry === 'retail') {
    recommendedAddOns.push('Merchandising controls');
  } else if (industry === 'real-estate') {
    recommendedAddOns.push('Project showcase pages');
    aiOpportunities.push('Inquiry chatbot for project FAQs');
  } else if (industry === 'finance') {
    recommendedAddOns.push('Hardened auth flows');
    why.push('Finance engagements prioritize security and audit-friendly design.');
  } else if (industry === 'restaurant') {
    recommendedAddOns.push('Menu & order status');
  } else if (industry === 'startup') {
    why.push('Startup scope favors MVP clarity and a clean path to iterate.');
  } else if (industry === 'manufacturing') {
    recommendedAddOns.push('Ops visibility dashboards');
  }

  if (timeline === 'asap') {
    why.push('ASAP timelines favor a tighter MVP with phased add-ons after launch.');
  } else if (timeline === '3-plus-months') {
    why.push('Longer runway allows stronger architecture, QA, and polish.');
  }

  if (budget === 'below-50k' && (product === 'web-application' || product === 'saas-platform')) {
    why.push('Budget suggests a focused MVP — prioritize must-have workflows first.');
    bestPackage = `${bestPackage} (MVP)`;
  }

  if (aiOpportunities.length === 0) {
    aiOpportunities.push('Optional AI later — start with strong UX and reliable workflows');
  }

  return {
    solutionName,
    solutionSummary,
    bestPackage,
    packageSummary,
    estimatedTimeline,
    estimatedCost,
    suggestedTechnology: unique(suggestedTechnology),
    aiOpportunities: unique(aiOpportunities).slice(0, 5),
    developmentPhases: phases,
    recommendedAddOns: unique(recommendedAddOns).slice(0, 7),
    why: why.slice(0, 4),
  };
}

function bumpCost(current: string): string {
  if (current.includes('75,000')) return '₹1,25,000 – ₹2,50,000';
  if (current.includes('1,50,000 – ₹4,50,000')) return '₹2,00,000 – ₹5,00,000';
  return current;
}
