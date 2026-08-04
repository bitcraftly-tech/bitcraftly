import { ROUTES } from '@/constants/navigation';
import type {
  AiFaqItem,
  AiIndustryItem,
  AiProcessStep,
  AiSolutionItem,
  AiWhyItem,
} from './types';

const consultCta = (label = 'Discuss This Solution') =>
  ({
    label,
    href: ROUTES.contact,
  }) as const;

export const AI_SOLUTIONS_HERO = {
  eyebrow: 'AI Engineering',
  title: 'AI Solutions That Solve Real Business Problems',
  subtitle:
    'From AI chatbots to autonomous AI agents, we build intelligent solutions that help businesses automate, optimize and grow.',
  primaryCta: {
    label: 'Book AI Consultation',
    href: ROUTES.contact,
  },
  secondaryCta: {
    label: 'Explore AI Solutions',
    href: '#ai-solutions-categories',
  },
  trustItems: ['Practical AI only', 'Secure by design', 'Measurable outcomes'] as const,
} as const;

export const AI_SOLUTION_ITEMS: readonly AiSolutionItem[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description:
      'Conversational assistants for websites and messaging that qualify leads and answer with grounded knowledge.',
    benefits: ['24/7 first response', 'Higher-quality handoffs', 'Fewer repetitive tickets'],
    icon: 'bot',
    cta: consultCta('Build a Chatbot'),
  },
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    description:
      'Voice experiences that handle intake, FAQs, and routing with clear escalation to humans.',
    benefits: ['Faster call handling', 'Consistent scripts', 'Lower support load'],
    icon: 'phone',
    cta: consultCta(),
  },
  {
    id: 'ai-business-automation',
    title: 'AI Business Automation',
    description:
      'Automate repetitive workflows across leads, documents, and internal tools with human oversight.',
    benefits: ['Less manual work', 'Fewer handoff errors', 'Faster cycle times'],
    icon: 'zap',
    cta: consultCta('Automate Operations'),
  },
  {
    id: 'ai-customer-support',
    title: 'AI Customer Support',
    description:
      'Support systems that resolve common issues, summarize tickets, and escalate high-intent cases.',
    benefits: ['Shorter resolution time', 'Better agent focus', 'Clear audit trails'],
    icon: 'headset',
    cta: consultCta(),
  },
  {
    id: 'ai-knowledge-base',
    title: 'AI Knowledge Base',
    description:
      'Searchable knowledge systems with semantic retrieval and cited answers from approved sources.',
    benefits: ['Faster internal answers', 'Reduced tribal knowledge risk', 'Trusted citations'],
    icon: 'search',
    cta: consultCta(),
  },
  {
    id: 'ai-recommendation',
    title: 'AI Recommendation Systems',
    description:
      'Personalization engines that recommend products, content, or next actions with measurable lift.',
    benefits: ['Higher conversion', 'Better relevance', 'Stronger retention signals'],
    icon: 'trending-up',
    cta: consultCta(),
  },
  {
    id: 'ai-document-processing',
    title: 'AI Document Processing',
    description:
      'Extract, classify, and route documents so teams spend less time on paperwork and more on decisions.',
    benefits: ['Faster intake', 'Cleaner structured data', 'Fewer manual reviews'],
    icon: 'quote',
    cta: consultCta('Process Documents'),
  },
  {
    id: 'ai-workflow-automation',
    title: 'AI Workflow Automation',
    description:
      'Multi-step workflows that draft, check, and execute tasks across your existing tools.',
    benefits: ['End-to-end automation', 'Role-aware approvals', 'Operational consistency'],
    icon: 'workflow',
    cta: consultCta(),
  },
  {
    id: 'ai-analytics',
    title: 'AI Analytics',
    description:
      'Insight layers that summarize metrics, surface anomalies, and turn raw data into action.',
    benefits: ['Faster decisions', 'Narrative insights', 'Early risk detection'],
    icon: 'brain',
    cta: consultCta(),
  },
  {
    id: 'custom-ai-apps',
    title: 'Custom AI Applications',
    description:
      'Purpose-built AI products tailored to your domain, data, and operating model.',
    benefits: ['Fit-for-purpose design', 'Owned IP path', 'Scalable architecture'],
    icon: 'sparkles',
    cta: consultCta('Scope Custom AI'),
  },
] as const;

export const AI_CATEGORIES_META = {
  eyebrow: 'Capabilities',
  title: 'AI solutions built for business outcomes',
  description:
    'Each offering is scoped around automation, customer experience, and growth — not demos that never ship.',
} as const;

export const AI_INDUSTRIES: readonly AiIndustryItem[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Booking assistants, triage support, and care-ops automation.',
    icon: 'calendar',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learner support, enrollment help, and knowledge retrieval.',
    icon: 'sparkles',
  },
  {
    id: 'retail',
    title: 'Retail',
    description: 'Recommendations, support bots, and catalog intelligence.',
    icon: 'layout-grid',
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Secure assistants, document intake, and ops analytics.',
    icon: 'shield',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Lead qualification, FAQ bots, and project inquiry routing.',
    icon: 'map-pin',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Document processing, inventory insights, and workflow agents.',
    icon: 'database',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Status assistants, partner support, and ops summarization.',
    icon: 'workflow',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Guest support, booking help, and service automation.',
    icon: 'message',
  },
] as const;

export const AI_INDUSTRIES_META = {
  eyebrow: 'Industries',
  title: 'Industries using AI with Bitcraftly',
  description: 'Domain-aware AI delivery where workflows, trust, and outcomes matter.',
} as const;

export const AI_PROCESS: readonly AiProcessStep[] = [
  {
    id: 'discovery',
    step: '01',
    title: 'Discovery',
    description: 'Goals, data sources, constraints, and success metrics — written before build.',
  },
  {
    id: 'strategy',
    step: '02',
    title: 'AI Strategy',
    description: 'Decide where AI creates leverage versus where strong UX is enough.',
  },
  {
    id: 'prototype',
    step: '03',
    title: 'Prototype',
    description: 'Validate prompts, retrieval, and workflows with a focused proof path.',
  },
  {
    id: 'development',
    step: '04',
    title: 'Development',
    description: 'Production UI, APIs, guardrails, and integrations built for ownership.',
  },
  {
    id: 'testing',
    step: '05',
    title: 'Testing',
    description: 'Evaluate quality, edge cases, latency, and escalation behavior.',
  },
  {
    id: 'deployment',
    step: '06',
    title: 'Deployment',
    description: 'Secure launch with monitoring, access control, and handoff documentation.',
  },
  {
    id: 'optimization',
    step: '07',
    title: 'Optimization',
    description: 'Improve accuracy, cost, and conversion based on real usage signals.',
  },
] as const;

export const AI_PROCESS_META = {
  eyebrow: 'Process',
  title: 'AI development process',
  description: 'A disciplined path from idea to production — designed for trust and iteration.',
} as const;

export const AI_TECH_STACK = [
  'OpenAI',
  'Claude',
  'Gemini',
  'Next.js',
  'React',
  'TypeScript',
  'FastAPI',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'AWS',
] as const;

export const AI_TECH_META = {
  eyebrow: 'Stack',
  title: 'Technology stack',
  description: 'Modern AI and product tooling chosen for reliability, speed, and maintainability.',
} as const;

export const AI_WHY: readonly AiWhyItem[] = [
  {
    id: 'ai-first',
    title: 'AI-first mindset',
    description: 'We recommend AI only when it improves conversion, support, or operations.',
    icon: 'brain',
  },
  {
    id: 'scalable',
    title: 'Scalable architecture',
    description: 'Grounded systems designed to grow with usage, data, and product complexity.',
    icon: 'trending-up',
  },
  {
    id: 'secure',
    title: 'Secure development',
    description: 'Access control, audit-friendly design, and production-minded defaults.',
    icon: 'shield',
  },
  {
    id: 'enterprise',
    title: 'Enterprise ready',
    description: 'Clear scope, milestones, and delivery quality suited to serious businesses.',
    icon: 'rocket',
  },
  {
    id: 'team',
    title: 'Dedicated team',
    description: 'Founder-led engagement with ownership from discovery through optimization.',
    icon: 'headset',
  },
] as const;

export const AI_WHY_META = {
  eyebrow: 'Why Bitcraftly',
  title: 'Your AI engineering partner',
  description:
    'Not a demo studio — a partner that ships practical AI into real business workflows.',
} as const;

export const AI_FAQ: readonly AiFaqItem[] = [
  {
    id: 'fit',
    question: 'Do we need AI for every project?',
    answer:
      'No. We recommend AI only when it shortens response time, reduces repetitive work, or improves decision quality. Otherwise we ship strong UX and reliable workflows first.',
  },
  {
    id: 'data',
    question: 'Can you work with our existing tools and data?',
    answer:
      'Yes. We commonly integrate CRMs, WhatsApp, docs, internal APIs, and databases — carefully grounding AI in approved sources.',
  },
  {
    id: 'timeline',
    question: 'How long does an AI solution usually take?',
    answer:
      'Focused chatbots and automation pilots often ship in weeks. Custom agents, knowledge systems, and deeper integrations follow milestone plans after discovery.',
  },
  {
    id: 'accuracy',
    question: 'How do you keep AI answers reliable?',
    answer:
      'We use grounding, citations, evaluation checks, and human escalation paths so the system stays useful without over-promising autonomy.',
  },
  {
    id: 'ownership',
    question: 'Who owns the solution after launch?',
    answer:
      'You own the delivered product assets. We provide handoff documentation and optional ongoing optimization support.',
  },
  {
    id: 'security',
    question: 'How do you approach security and privacy?',
    answer:
      'We design with access control, least-privilege integrations, and clear data boundaries — especially for customer and operational data.',
  },
] as const;

export const AI_FAQ_META = {
  eyebrow: 'FAQ',
  title: 'AI-specific questions',
  description: 'Straight answers on fit, timelines, reliability, ownership, and security.',
  viewAllLabel: 'View all FAQs',
  viewAllHref: ROUTES.resourcesFaq,
} as const;

export const AI_FINAL_CTA = {
  eyebrow: 'Next step',
  title: "Let's Build Your AI Solution",
  description:
    'Tell us the workflow you want to improve. We’ll recommend a practical AI path with clear scope and investment.',
  primaryCta: {
    label: 'Book Free Consultation',
    href: ROUTES.contact,
  },
  secondaryCta: {
    label: 'View Services',
    href: ROUTES.services,
  },
  trustItems: ['No-obligation consultation', 'Written AI scope', 'Founder-led discovery'] as const,
} as const;
