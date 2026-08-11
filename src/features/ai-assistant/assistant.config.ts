import type { AiProviderId, SuggestedQuestion } from './types';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';

/** Active provider — OpenAI via `/api/assistant/chat` (demo fallback if no key). */
export const DEFAULT_AI_PROVIDER_ID: AiProviderId = 'openai';

export const ASSISTANT_META = {
  title: 'AI Assistant',
  description:
    'Ask Bitcraftly AI about Industry Systems, pricing, services, and how to get started — then book a strategy call when you are ready.',
  path: '/assistant',
  name: 'Bitcraftly AI',
  version: 'Demo',
} as const;

export const ASSISTANT_HERO = {
  eyebrow: 'AI Assistant',
  title: 'Answers for your next Industry System',
  titleHighlight: 'Industry System',
  description:
    'Ask about pricing, services, AI workflows, and go-live paths. This demo helps you frame the right questions before a strategy call.',
  supporting: 'Clear answers · Written next steps · Founder-led follow-up',
  primaryCta: {
    label: 'Start chatting',
    href: '#assistant-chat',
  },
  secondaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=assistant`,
  },
  trustItems: ['Pricing clarity', 'Service fit', 'Launch path'],
} as const;

export const ASSISTANT_CTA = {
  heading: 'Ready for a scoped plan?',
  description:
    'When the demo answers enough to move forward, book a strategy call — we map your Industry System with written next steps.',
  primaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=assistant-cta`,
  },
  tertiaryCta: {
    label: 'View pricing',
    href: ROUTES.pricing,
  },
  trust: ['Response within 24 hours', 'No obligation', 'Clear scope'],
} as const;

export const SUGGESTED_QUESTIONS: readonly SuggestedQuestion[] = [
  {
    id: 'pricing',
    label: 'What does a typical project cost?',
    prompt: 'What does typical Bitcraftly pricing look like for a website or AI project?',
  },
  {
    id: 'services',
    label: 'Which services do you offer?',
    prompt: 'What services does Bitcraftly offer for growing businesses?',
  },
  {
    id: 'ai',
    label: 'How do your AI assistants work?',
    prompt: 'How do Bitcraftly AI assistants and chatbots work for support teams?',
  },
  {
    id: 'start',
    label: 'How do we get started?',
    prompt: 'How do we get started with a Bitcraftly engagement?',
  },
] as const;

export const WELCOME_MESSAGE = [
  "Hello! 👋 I'm **Bitcraftly AI**.",
  '',
  'Pick a suggested question below, or type your own — pricing, services, AI workflows, or how we launch.',
].join('\n');
