import { ROUTES } from '@/constants/navigation';
import type { ProcessCtaContent, ProcessStep } from './process.types';

export const PROCESS_SECTION_ID = 'development-process';
export const PROCESS_HEADING_ID = 'development-process-heading';

export const PROCESS_LABEL = 'How we work';

export const PROCESS_HEADING = 'A clear path from idea to launch';

export const PROCESS_DESCRIPTION =
  'Six clear steps — har stage par aapko pata hota hai kya next hai. Plain language, no process theater.';

export const PROCESS_VIEW_CTA = {
  label: 'View Our Process',
  href: ROUTES.about,
} as const;

/** Sourced from https://bitcraftly.com/about process. */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'requirement',
    number: '01',
    title: 'Requirement Discussion',
    description: 'Goals, audience, and scope — clear before design starts.',
    icon: 'search',
  },
  {
    id: 'strategy',
    number: '02',
    title: 'Strategy & Planning',
    description: 'Pages, features, timeline, and written estimate in plain language.',
    icon: 'rocket',
  },
  {
    id: 'development',
    number: '03',
    title: 'UI / Frontend Development',
    description: 'React or Next.js build — mobile-first, SEO-structured, on-brand.',
    icon: 'code',
  },
  {
    id: 'review',
    number: '04',
    title: 'Review & Revisions',
    description: 'You review real progress; revisions within agreed scope.',
    icon: 'check',
  },
  {
    id: 'testing',
    number: '05',
    title: 'Testing & Optimization',
    description: 'Forms, devices, speed, and SEO basics checked before go-live.',
    icon: 'zap',
  },
  {
    id: 'launch',
    number: '06',
    title: 'Launch & Support',
    description: 'Go live with handoff, training, and optional monthly care.',
    icon: 'headset',
  },
] as const;

export const PROCESS_SIDE_CTA: ProcessCtaContent = {
  title: 'Ready to ship a product that converts?',
  description: 'Book a short call — scope, timeline, and a written estimate in plain language.',
  buttonLabel: 'Book a Free Consultation',
  href: ROUTES.contact,
};
