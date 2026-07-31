import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import type {
  AboutCultureItem,
  AboutFaqItem,
  AboutFeaturedCaseStudy,
  AboutLeader,
  AboutProcessStep,
  AboutTechItem,
  AboutTestimonialPlaceholder,
  AboutTrustedLogo,
  AboutTrustStat,
  AboutValue,
} from './about.types';

export const ABOUT_LANDING_META = {
  title: 'About Bitcraftly — AI & Product Engineering Partner',
  description:
    'Meet Bitcraftly: a founder-led AI and product engineering partner for startups and product teams. 20+ years of craft, written scope, and production systems built to perform.',
  path: ROUTES.about,
  keywords: [
    'about Bitcraftly',
    'AI product engineering partner',
    'founder-led software agency India',
    'Next.js React TypeScript agency',
    'enterprise product engineering',
  ],
} as const;

export const ABOUT_HERO = {
  headingId: 'about-page-heading',
  eyebrow: 'About Bitcraftly',
  title: 'AI and product engineering with founder-level accountability',
  titleHighlight: 'founder-level accountability',
  description:
    'We help startups and product teams ship websites, SaaS, and AI features that stay fast and maintainable — with written scope and one owner from architecture to launch.',
  supporting: 'Delhi NCR–based. Serving founders, CTOs, and operators across India and remote.',
  primaryCta: {
    label: NAV_ACTIONS.consultation.label,
    href: NAV_ACTIONS.consultation.href,
  },
  secondaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: NAV_ACTIONS.bookCall.href,
  },
  trustItems: ['20+ years experience', 'Founder-led delivery', 'Written proposals'] as const,
  stats: [
    { label: 'Years of craft', value: '20+' },
    { label: 'Enterprise projects', value: '20+' },
    { label: 'Code review gate', value: '100%' },
    { label: 'Accessibility', value: 'WCAG' },
  ] as const,
} as const;

export const ABOUT_STORY = {
  id: 'about-story',
  headingId: 'about-story-heading',
  eyebrow: 'Our story',
  heading: 'Built from delivery work — not a pitch deck',
  paragraphs: [
    'Bitcraftly began with a practical belief: founders deserve an engineering partner who explains trade-offs plainly, owns outcomes, and ships systems their teams can maintain.',
    'We grew through client work — marketing sites that convert, SaaS platforms that stay fast, and AI features that remove real friction instead of adding novelty.',
    'Every engagement is scoped in writing, staffed intentionally, and reviewed for performance and accessibility before it reaches production.',
    'We stay founder-led on purpose. Architecture, quality, and communication remain in one thread — so you are never stranded between sales and delivery.',
  ] as const,
} as const;

export const ABOUT_MISSION = {
  id: 'about-mission',
  headingId: 'about-mission-heading',
  eyebrow: 'Mission',
  heading: 'Help teams launch products that hold up under real use',
  body: 'We design and engineer digital systems that load fast, convert clearly, and stay maintainable — so product and marketing teams can move with confidence after launch, not only on demo day.',
} as const;

export const ABOUT_VISION = {
  id: 'about-vision',
  headingId: 'about-vision-heading',
  eyebrow: 'Vision',
  heading: 'Make production-grade engineering reachable for ambitious builders',
  body: 'Performance, accessibility, and purposeful AI should not require enterprise bureaucracy. We bring that standard to founders and operators who need leverage and clear ownership.',
} as const;

export const ABOUT_VALUES: readonly AboutValue[] = [
  {
    id: 'clarity',
    title: 'Clarity over jargon',
    description:
      'You get scope, timelines, and trade-offs in plain language — so business decisions stay yours, not locked inside technical fog.',
    icon: 'message',
  },
  {
    id: 'craft',
    title: 'Craft that shows up in metrics',
    description:
      'Typography, spacing, performance, and accessibility are treated as product requirements — not polish deferred until after launch.',
    icon: 'sparkles',
  },
  {
    id: 'ownership',
    title: 'Founder-level ownership',
    description:
      'One accountable thread from architecture to delivery. You always know who is responsible for quality and next steps.',
    icon: 'headset',
  },
  {
    id: 'evidence',
    title: 'Evidence over vanity',
    description:
      'We optimize for Core Web Vitals, conversion paths, and maintainable code — signals that still matter months after launch week.',
    icon: 'trending-up',
  },
  {
    id: 'purpose-ai',
    title: 'AI with a job to do',
    description:
      'We add automation and assistants only when they shorten a path to a lead, decision, or completed workflow — always with human oversight.',
    icon: 'brain',
  },
  {
    id: 'longevity',
    title: 'Built for the next team',
    description:
      'Clean architecture, documented decisions, and stacks chosen so your engineers can extend the product without rewriting from scratch.',
    icon: 'shield',
  },
] as const;

export const ABOUT_LEADERSHIP: readonly AboutLeader[] = [
  {
    id: 'sanjay',
    name: 'Sanjay',
    role: 'Founder & Lead Engineer',
    bio: 'Frontend architect and engineering leader with 20+ years shipping interfaces and systems for startups, SMBs, and enterprise product teams. Sanjay owns product architecture, AI adoption decisions, delivery quality, and client communication end to end.',
    photoSrc: '/about/sanjay-kr-singh.png',
    photoAlt: 'Portrait of Sanjay, Founder and Lead Engineer at Bitcraftly',
    badges: [
      '20+ Years Experience',
      'Product Architecture',
      'Enterprise Systems',
      'AI Engineering',
    ],
    focus: [
      'Product & Next.js architecture',
      'Performance & accessibility',
      'AI feature adoption',
      'Engineering leadership',
    ],
  },
] as const;

export const ABOUT_CULTURE: readonly AboutCultureItem[] = [
  {
    id: 'review',
    title: 'Review before release',
    description:
      'Meaningful changes are checked for regressions, accessibility, and performance impact before they reach production.',
    icon: 'check',
  },
  {
    id: 'systems',
    title: 'Systems over heroics',
    description:
      'Reusable patterns, design tokens, and documented decisions keep quality high without depending on late-night firefighting.',
    icon: 'layout-grid',
  },
  {
    id: 'honest',
    title: 'Honest timelines',
    description:
      'We commit to what we can defend. If scope expands, you hear it early — with options, not surprises on the delivery date.',
    icon: 'calendar',
  },
  {
    id: 'partner',
    title: 'Partner posture',
    description:
      'You get a working engineering counterpart, not a ticket queue. Strategy and implementation stay connected throughout the engagement.',
    icon: 'rocket',
  },
] as const;

export const ABOUT_TECH_GROUPS = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & data' },
  { id: 'ai-delivery', label: 'AI & delivery' },
] as const;

export const ABOUT_TECH: readonly AboutTechItem[] = [
  {
    id: 'next',
    label: 'Next.js',
    detail: 'App Router, SSR/SSG, SEO-first routing',
    icon: 'zap',
    group: 'frontend',
    featured: true,
  },
  {
    id: 'react',
    label: 'React',
    detail: 'Composable UI with strict TypeScript',
    icon: 'code',
    group: 'frontend',
    featured: true,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    detail: 'Strict typing across product surfaces',
    icon: 'code',
    group: 'frontend',
    featured: true,
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    detail: 'Token-driven design system utilities',
    icon: 'layout-grid',
    group: 'frontend',
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    detail: 'APIs and server-side services',
    icon: 'workflow',
    group: 'backend',
  },
  {
    id: 'express',
    label: 'Express',
    detail: 'Lightweight REST APIs and middleware',
    icon: 'rocket',
    group: 'backend',
  },
  {
    id: 'python',
    label: 'Python',
    detail: 'FastAPI services, data workflows, AI backends',
    icon: 'brain',
    group: 'backend',
  },
  {
    id: 'data',
    label: 'APIs & data',
    detail: 'PostgreSQL, secure auth, production API patterns',
    icon: 'database',
    group: 'backend',
  },
  {
    id: 'ai',
    label: 'AI Engineering',
    detail: 'Assistants, automation, and retrieval when they earn their place',
    icon: 'sparkles',
    group: 'ai-delivery',
    featured: true,
  },
  {
    id: 'cloud',
    label: 'Cloud delivery',
    detail: 'Production deploys with observability in mind',
    icon: 'cloud',
    group: 'ai-delivery',
  },
] as const;

export const ABOUT_FEATURED_CASE: AboutFeaturedCaseStudy = {
  id: 'about-featured-case',
  eyebrow: 'Featured case study',
  heading: 'From mobile friction to WhatsApp-ready orders',
  project: 'Shrishti Cloud Kitchen',
  challenge:
    'Cloud kitchen demand lived on phones — desktop-heavy layouts lost order intent and forced guests into awkward handoffs.',
  solution:
    'A thumb-first Next.js storefront with clear menu discovery and a one-tap WhatsApp order path, scoped for mobile conversion.',
  results: [
    '90%+ mobile session share on the live experience',
    '1-tap WhatsApp order handoff from the menu path',
    'Production delivery with SEO-ready routing',
  ],
  ctaLabel: 'Read the Shrishti case study',
  ctaHref: `${ROUTES.workProjects}/shrishti-cloud-kitchen`,
};

export const ABOUT_PROCESS: readonly AboutProcessStep[] = [
  {
    id: 'discover',
    step: '01',
    title: 'Discovery',
    description:
      'Goals, constraints, users, and success metrics — agreed before design or code begins.',
  },
  {
    id: 'architect',
    step: '02',
    title: 'Architecture',
    description:
      'Information architecture, stack choices, risks, and a written plan with milestones.',
  },
  {
    id: 'design',
    step: '03',
    title: 'Design',
    description:
      'Flows, UI structure, and conversion-critical screens shaped for clarity and accessibility.',
  },
  {
    id: 'develop',
    step: '04',
    title: 'Development',
    description:
      'Iterative implementation with previews, so stakeholders review working product — not slides.',
  },
  {
    id: 'test',
    step: '05',
    title: 'Testing',
    description:
      'Regression, accessibility, and performance checks on the paths that matter to users and SEO.',
  },
  {
    id: 'deploy',
    step: '06',
    title: 'Deployment',
    description:
      'Hardened release to production with environment, monitoring, and rollback awareness.',
  },
  {
    id: 'support',
    step: '07',
    title: 'Support',
    description:
      'Handoff documentation and optional ongoing improvement measured against outcomes, not activity.',
  },
] as const;

export const ABOUT_TRUST_STATS: readonly AboutTrustStat[] = [
  { id: 'projects', value: '20+', label: 'Enterprise Projects Delivered' },
  { id: 'features', value: '200+', label: 'Production Features' },
  { id: 'reviews', value: '100%', label: 'Code Reviews' },
  { id: 'a11y', value: 'WCAG', label: 'Accessibility Focus' },
] as const;

export const ABOUT_TRUST_POINTS = [
  'Written proposals and milestone billing',
  'Performance and accessibility reviewed before launch',
  'Clear ownership — architecture to delivery',
  'India & remote collaboration in English or Hinglish',
] as const;

/** Grayscale logo placeholders — swap `mark`/`label` when real client marks are approved. */
export const ABOUT_TRUSTED_LOGOS: readonly AboutTrustedLogo[] = [
  { id: 'logo-a', label: 'Client logo placeholder A', mark: 'Logo' },
  { id: 'logo-b', label: 'Client logo placeholder B', mark: 'Brand' },
  { id: 'logo-c', label: 'Client logo placeholder C', mark: 'Studio' },
  { id: 'logo-d', label: 'Client logo placeholder D', mark: 'Labs' },
  { id: 'logo-e', label: 'Client logo placeholder E', mark: 'Co.' },
  { id: 'logo-f', label: 'Client logo placeholder F', mark: 'Group' },
] as const;

export const ABOUT_TRUSTED_BY_COPY = {
  id: 'about-trusted-by',
  headingId: 'about-trusted-by-heading',
  eyebrow: 'Trusted by teams',
  heading: 'Built for operators who need leverage',
  lede: 'Client marks appear here once approved for public use. Placeholders keep the layout production-ready without inventing logos.',
} as const;

/** Structure-only placeholders — no invented client names. */
export const ABOUT_TESTIMONIALS: readonly AboutTestimonialPlaceholder[] = [
  {
    id: 't1',
    quote: 'Testimonial placeholder — replace with an approved client quote after permission.',
    attribution: 'Client name',
    role: 'Role · Company',
  },
  {
    id: 't2',
    quote: 'Testimonial placeholder — replace with an approved client quote after permission.',
    attribution: 'Client name',
    role: 'Role · Company',
  },
] as const;

export const ABOUT_TESTIMONIALS_COPY = {
  id: 'about-testimonials',
  headingId: 'about-testimonials-heading',
  eyebrow: 'Testimonials',
  heading: 'What partners say when work ships',
  lede: 'Quotes publish only with explicit client approval.',
} as const;

export const ABOUT_FAQ_SECTION_ID = 'about-faq';
export const ABOUT_FAQ_HEADING_ID = 'about-faq-heading';
export const ABOUT_FAQ_LABEL = 'FAQ';
export const ABOUT_FAQ_HEADING = 'Questions teams ask before partnering';
export const ABOUT_FAQ_DESCRIPTION =
  'Straight answers on who we serve, how we engage, ownership, and how we work.';

export const ABOUT_FAQS: readonly AboutFaqItem[] = [
  {
    id: 'who',
    question: 'Who is Bitcraftly for?',
    answer:
      'Founders, CTOs, and product teams who need a senior engineering partner for websites, SaaS, and AI-assisted workflows — without large-agency overhead or junior handoffs.',
  },
  {
    id: 'engage',
    question: 'How do engagements typically start?',
    answer:
      'With a consultation to clarify goals and constraints, then a written proposal covering scope, timeline, and milestones. Build work starts only after mutual alignment.',
  },
  {
    id: 'ai',
    question: 'Do you always recommend AI features?',
    answer:
      'No. We recommend AI when it measurably shortens a workflow or improves conversion. If a simpler approach is better, we say so before you invest.',
  },
  {
    id: 'stack',
    question: 'What technologies do you specialize in?',
    answer:
      'Frontend: Next.js, React, TypeScript, and Tailwind. Backend: Node.js, Express, and Python (FastAPI), with PostgreSQL and secure auth. We choose tools for maintainability, SEO, and performance.',
  },
  {
    id: 'ownership',
    question: 'Who owns the code and IP after delivery?',
    answer:
      'You own the deliverables defined in the written agreement. We provide handoff documentation so your team — or a future partner — can maintain and extend the product.',
  },
  {
    id: 'scope',
    question: 'What happens if scope changes mid-project?',
    answer:
      'We flag impact early and present options: adjust milestones, sequence work differently, or expand the agreement. You decide before we bill for out-of-scope work.',
  },
  {
    id: 'location',
    question: 'Where is Bitcraftly based?',
    answer:
      'We are Delhi NCR–based and work with clients across India and internationally. Collaboration is remote-friendly with clear async updates in English or Hinglish.',
  },
] as const;

export const ABOUT_CTA = {
  headingId: 'about-final-cta-heading',
  heading: 'Ready to build with a partner who owns the outcome?',
  description:
    'Book a free consultation. We’ll discuss your goals, recommend a practical path, and follow with a written estimate — no pressure, no fluff.',
  reassurance: "No obligation. We'll respond within one business day.",
  primaryCta: {
    label: NAV_ACTIONS.consultation.label,
    href: NAV_ACTIONS.consultation.href,
    icon: 'arrow-up-right' as const,
  },
  tertiaryCta: {
    label: 'View our work',
    href: ROUTES.work,
    icon: 'arrow-up-right' as const,
  },
  trust: ['Free consultation', 'Written estimates', 'Founder-led delivery'] as const,
} as const;
