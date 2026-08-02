import type { PerformanceFeatureCard } from './performance.types';

export const PERFORMANCE_SECTION_ID = 'performance-conversion';
export const PERFORMANCE_HEADING_ID = 'performance-conversion-heading';

export const PERFORMANCE_LABEL = 'What we optimize';

export const PERFORMANCE_HEADING = 'Performance & conversion — built in, not patched later';

export const PERFORMANCE_DESCRIPTION_LINE_1 =
  'We treat portfolio work like product delivery: mobile-first layouts, lean page weight, SEO-conscious structure,';

export const PERFORMANCE_DESCRIPTION_LINE_2 =
  'and enquiry funnels that survive real traffic — especially WhatsApp-first Indian buyers on phones.';

export const PERFORMANCE_DESCRIPTION = `${PERFORMANCE_DESCRIPTION_LINE_1} ${PERFORMANCE_DESCRIPTION_LINE_2}`;

/** Sourced from https://bitcraftly.com/ homepage performance section. */
export const PERFORMANCE_CARDS: readonly PerformanceFeatureCard[] = [
  {
    id: 'thumb-first',
    title: 'Thumb-first Mobile UX',
    description:
      'Layouts tested for small screens first — CTAs, click-to-call, and WhatsApp placed where thumb traffic actually converts.',
    icon: 'smartphone',
  },
  {
    id: 'whatsapp-ready',
    title: 'WhatsApp-ready Lead Paths',
    description:
      'Enquiry CTAs above scroll fatigue so high-intent visitors can reach you without digging through desktop-only menus.',
    icon: 'message',
  },
  {
    id: 'seo-structure',
    title: 'Crawlable SEO Structure',
    description:
      'Titles, hierarchy, and local discovery basics baked into the build — not bolted on after launch.',
    icon: 'search',
  },
  {
    id: 'react-next-performance',
    title: 'React & Next.js Discipline',
    description:
      'Component structure, image strategy, and route-level SEO — fewer heavy scripts than page-builder stacks.',
    icon: 'code',
  },
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals Mindset',
    description:
      'LCP, CLS, and interaction readiness considered during layout — not “we’ll optimize after launch.”',
    icon: 'zap',
  },
  {
    id: 'ai-with-purpose',
    title: 'AI That Protects Human Sales',
    description:
      'Bots answer repeat questions; high-intent leads still reach a person on WhatsApp when it matters.',
    icon: 'sparkles',
  },
] as const;
