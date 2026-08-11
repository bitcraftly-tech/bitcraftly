import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { getAiStudioPath } from '@/lib/seo/ai-studio-url';

export const AI_STUDIO_LANDING_META = {
  title: 'AI Studio',
  description:
    'Bitcraftly AI Studio — generate reels, images, posts, and video content in one enterprise workspace. Open the studio or try the marketing AI assistant.',
  path: ROUTES.aiStudio,
} as const;

export const AI_STUDIO_HERO = {
  headingId: 'ai-studio-page-heading',
  eyebrow: 'AI Studio',
  title: 'Create with Bitcraftly AI Studio',
  titleHighlight: 'AI Studio',
  description:
    'An enterprise content workspace for reels, images, posts, and video — separate from the marketing site chat. Open the studio app when you are ready to generate.',
  supporting: 'Reel pipeline · Brand-safe drafts · Founder-led delivery',
  primaryCta: {
    label: 'Open AI Studio',
    href: getAiStudioPath('/studio'),
  },
  secondaryCta: {
    label: 'Try AI Assistant',
    href: ROUTES.assistant,
  },
  trustItems: ['Separate product app', 'Demo-ready modules', 'Clear handoff to Bitcraftly'],
} as const;

export const AI_STUDIO_MODULES = [
  {
    id: 'reels',
    title: 'AI Reel Generator',
    description: 'Topic → script → visuals → voice → preview — Phase 1 production path.',
    href: getAiStudioPath('/studio/reels'),
    icon: 'sparkles' as const,
  },
  {
    id: 'images',
    title: 'Images',
    description: 'Generate and review still assets for campaigns and social.',
    href: getAiStudioPath('/studio/images'),
    icon: 'layout-grid' as const,
  },
  {
    id: 'posts',
    title: 'Posts',
    description: 'Draft platform-ready copy tied to your brand voice.',
    href: getAiStudioPath('/studio/posts'),
    icon: 'quote' as const,
  },
  {
    id: 'videos',
    title: 'Videos',
    description: 'Assemble longer cuts from generated scenes and voice tracks.',
    href: getAiStudioPath('/studio/videos'),
    icon: 'zap' as const,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Track generation queue health and content throughput.',
    href: getAiStudioPath('/studio/analytics'),
    icon: 'trending-up' as const,
  },
  {
    id: 'assistant',
    title: 'Marketing AI Assistant',
    description: 'Ask pricing and Industry System questions on this site — chat demo.',
    href: ROUTES.assistant,
    icon: 'bot' as const,
  },
] as const;

export const AI_STUDIO_STEPS = [
  {
    id: '01',
    title: 'Open Studio',
    description: 'Launch the AI Studio app in a new tab — your content workspace.',
  },
  {
    id: '02',
    title: 'Pick a module',
    description: 'Start with Reels, or explore images, posts, and video tools.',
  },
  {
    id: '03',
    title: 'Generate & review',
    description: 'Run the pipeline, preview output, and download when ready.',
  },
] as const;

export const AI_STUDIO_CTA = {
  heading: 'Ready to generate content?',
  description:
    'Open Bitcraftly AI Studio for the full workspace — or book a call if you want this system for your brand.',
  primaryCta: {
    label: 'Open AI Studio',
    href: getAiStudioPath('/studio'),
  },
  tertiaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=ai-studio`,
  },
  trust: ['Separate app URL', 'No homepage changes', 'Strategy call available'],
} as const;
