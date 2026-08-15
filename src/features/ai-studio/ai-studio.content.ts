import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { getAiStudioPath } from '@/lib/seo/ai-studio-url';

export const AI_STUDIO_LANDING_META = {
  title: 'AI Studio',
  description:
    'Bitcraftly AI Studio — generate reels, images, posts, and video content in one enterprise workspace. Open the studio or try the marketing AI assistant.',
  path: ROUTES.aiStudio,
} as const;

/** Mirrors bitcraftly-ai-studio landing hero copy + dashboard preview data. */
export const AI_STUDIO_HERO = {
  headingId: 'ai-studio-page-heading',
  badge: {
    tag: 'Soon',
    label: 'AI Reel Generator — launching soon',
  },
  titleLines: ['CREATE.', 'PUBLISH.'] as const,
  titleAccent: 'SCALE',
  titleTail: 'WITH AI.',
  description:
    'Enterprise AI content studio for reels, posts, images, and video — one workspace to create, automate, and publish at scale.',
  primaryCta: {
    label: 'Try AI Assistant',
    href: ROUTES.assistant,
  },
  secondaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=ai-studio`,
  },
  features: [
    {
      id: 'ai-powered',
      title: 'AI-POWERED',
      description: 'Smart content creation',
      tone: 'cyan' as const,
      icon: 'sparkles' as const,
    },
    {
      id: 'multi-format',
      title: 'MULTI-FORMAT',
      description: 'Reels, posts, images & more',
      tone: 'violet' as const,
      icon: 'layout-grid' as const,
    },
    {
      id: 'scale-securely',
      title: 'SECURE & SCALABLE',
      description: 'Enterprise grade security',
      tone: 'emerald' as const,
      icon: 'shield' as const,
    },
  ],
  assets: {
    robot: '/ai-studio/hero/robot.png',
    /** Lightweight variant used as the mobile / tablet background layer. */
    robotCompact: '/ai-studio/hero/robot-mobile.webp',
    dashboardStrip: '/ai-studio/hero/dashboard-strip-bg.png',
    logoMark: '/ai-studio/brand/logo-mark.webp',
  },
} as const;

export const AI_STUDIO_HERO_DASHBOARD = {
  brand: 'Bitcraftly AI Studio',
  tagline: 'AI & Digital Engineering Partner',
  overview: 'OVERVIEW',
  welcome: 'Welcome back, Sanjay!',
  activityFooter: 'View all activity →',
  queueFooter: 'View full queue →',
  bannerTitle: 'Create content 10x faster with Bitcraftly AI Studio.',
  bannerSub: 'From idea to publish — all in one place.',
  sidebar: [
    { id: 'dashboard', label: 'Dashboard', active: true, icon: 'layout-grid' as const },
    { id: 'reels', label: 'AI Reels', active: false, icon: 'play' as const },
    { id: 'posts', label: 'AI Posts', active: false, icon: 'sparkles' as const },
    { id: 'images', label: 'AI Images', active: false, icon: 'layout-grid' as const },
    { id: 'videos', label: 'AI Videos', active: false, icon: 'play' as const },
    { id: 'analytics', label: 'Analytics', active: false, icon: 'zap' as const },
    { id: 'settings', label: 'Settings', active: false, icon: 'shield' as const },
  ],
  proPlan: {
    label: 'PRO PLAN',
    usagePercent: '68%',
    usageLabel: 'Credits Used',
    storage: '13.6 GB / 20 GB',
    percent: 68,
    cta: 'Upgrade Plan',
  },
  stats: [
    {
      id: 'generations',
      label: 'Total Generations',
      value: '2,486',
      tone: 'violet' as const,
      delta: '+12.5%',
    },
    {
      id: 'jobs',
      label: "Today's Jobs",
      value: '128',
      tone: 'emerald' as const,
      delta: '+8.2%',
    },
    {
      id: 'queue',
      label: 'Queue Status',
      value: '8',
      tone: 'amber' as const,
      detail: 'In progress',
    },
    {
      id: 'storage',
      label: 'Storage Used',
      value: '42.6 GB',
      tone: 'sky' as const,
      detail: 'of 100 GB',
      progress: 43,
    },
  ],
  activity: [
    {
      id: 'a1',
      title: 'AI Reel — Travel Tips',
      meta: 'Rendered successfully',
      time: '2m ago',
      status: 'success' as const,
    },
    {
      id: 'a2',
      title: 'AI Post — Product Launch',
      meta: 'Ready for review',
      time: '15m ago',
      status: 'info' as const,
    },
    {
      id: 'a3',
      title: 'AI Image — Brand Pack',
      meta: 'Queued',
      time: '28m ago',
      status: 'pending' as const,
    },
    {
      id: 'a4',
      title: 'AI Video — Launch Teaser',
      meta: 'Uploading assets',
      time: '41m ago',
      status: 'info' as const,
    },
  ],
  queue: [
    {
      id: 'q1',
      title: 'AI Reel — Fitness Tips',
      progress: 72,
      state: 'running' as const,
      stateLabel: 'Processing',
    },
    {
      id: 'q2',
      title: 'AI Post — Social Media',
      progress: 41,
      state: 'queued' as const,
      stateLabel: 'Queued',
    },
    {
      id: 'q3',
      title: 'AI Image — Ad Creative',
      progress: 0,
      state: 'queued' as const,
      stateLabel: 'Queued',
    },
  ],
} as const;

/** Modules section — mirrors the Studio landing "Modules that grow with you" grid. */
export const AI_STUDIO_MODULES_SECTION = {
  headingId: 'ai-studio-modules-heading',
  badge: 'Built for growth',
  title: 'Modules that grow with you',
  support: 'Start with reels. Expand without rebuilding.',
  ctaLaunch: 'Launch',
  ctaComingSoon: 'Coming Soon',
  items: [
    {
      id: 'reels',
      label: 'AI Reels',
      description: 'Topic to script, voice, and vertical video.',
      tone: 'blue' as const,
      live: false,
    },
    {
      id: 'posts',
      label: 'AI Posts',
      description: 'Social copy and creatives, coming next.',
      tone: 'violet' as const,
      live: false,
    },
    {
      id: 'images',
      label: 'AI Images',
      description: 'Brand-ready visuals in your studio.',
      tone: 'green' as const,
      live: false,
    },
    {
      id: 'videos',
      label: 'AI Videos',
      description: 'Long-form and short-form videos.',
      tone: 'violet' as const,
      live: false,
    },
    {
      id: 'banners',
      label: 'AI Banners',
      description: 'Stunning banners in seconds.',
      tone: 'blue' as const,
      live: false,
    },
    {
      id: 'blog',
      label: 'AI Blog Writer',
      description: 'SEO-optimized blogs with AI.',
      tone: 'green' as const,
      live: false,
    },
  ],
} as const;

export const AI_STUDIO_STATUS = {
  headingId: 'ai-studio-status-heading',
  eyebrow: 'Build status',
  title: 'This page is still being built',
  description:
    'The Bitcraftly team is engineering AI Studio right now. Until it launches you can use the on-site AI Assistant, or book a call to see an early walkthrough.',
  points: [
    'Studio modules are in development and not open yet.',
    'AI Assistant is live and answers pricing and Industry System questions.',
    'Book a strategy call for an early preview of the reel pipeline.',
  ],
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
  heading: 'Want early access to AI Studio?',
  description:
    'Studio is still in development. Book a call to get an early walkthrough, or try the AI Assistant that is already live on this site.',
  primaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=ai-studio`,
    icon: 'calendar' as const,
  },
  tertiaryCta: {
    label: 'Try AI Assistant',
    href: ROUTES.assistant,
    icon: 'bot' as const,
  },
  trust: ['In active development', 'Early preview on request', 'Assistant available today'],
} as const;
