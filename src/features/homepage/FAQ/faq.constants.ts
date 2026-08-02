import type { FaqItem } from './faq.types';

export const FAQ_SECTION_ID = 'faq';
export const FAQ_HEADING_ID = 'faq-heading';

export const FAQ_LABEL = 'FAQ';

export const FAQ_HEADING = 'Industry Systems — common questions';

export const FAQ_DESCRIPTION =
  'Straight answers about Complete Digital Systems, Wave 1 industries, and how Bitcraftly partners with your team.';

/** Industry Systems FAQ — used on Resources FAQ (not on frozen homepage IA). */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'what-is-industry-system',
    question: 'What is an Industry System?',
    answer:
      'An Industry System is Bitcraftly’s unit of value: a Complete Digital System for your vertical — Marketing Website, Admin Dashboard, CMS, AI Assistant, Lead Management, Analytics, Integrations, and Deployment Ready — engineered to work together.',
  },
  {
    id: 'not-just-a-website',
    question: 'Is this just a website?',
    answer:
      'No. The marketing website is one module. Every Industry System also includes operations (dashboard, CMS, leads), Intelligent Business Automation, analytics, integrations, and a deployment-ready launch path.',
  },
  {
    id: 'wave-1',
    question: 'Which industries are in Wave 1?',
    answer:
      'Wave 1 covers Healthcare, Real Estate, Restaurant, and Corporate Services — each as a full Industry System you can explore, configure, brand, and launch.',
  },
  {
    id: 'ai-workflows',
    question: 'How does AI show up in an Industry System?',
    answer:
      'As Intelligent Business Automation — business workflows such as lead qualification, booking/intake, customer answers, and operator assists — not a disconnected chatbot feature list.',
  },
  {
    id: 'go-live',
    question: 'How fast can we go live?',
    answer:
      'The path is Choose Industry → Configure System → Customize Brand → Launch. You start from a deployment-ready Industry System foundation instead of a blank brief, then brand and configure for your business.',
  },
  {
    id: 'vs-agency',
    question: 'How is this different from a traditional agency?',
    answer:
      'Agencies often deliver a website from a blank brief. Bitcraftly delivers an Industry System foundation with website, dashboard, CMS, AI, leads, analytics, and integrations — with accountability as your Digital Engineering Partner.',
  },
  {
    id: 'modules-included',
    question: 'What is included in every Industry System?',
    answer:
      'Eight modules: Marketing Website, Admin Dashboard, CMS, AI Assistant, Lead Management, Analytics, Integrations, and Deployment Ready.',
  },
  {
    id: 'next-step',
    question: 'How do we get started?',
    answer:
      'Explore Industry Systems to review Wave 1 verticals, or Book a Strategy Call to map the right system, modules, and launch plan for your business.',
  },
] as const;
