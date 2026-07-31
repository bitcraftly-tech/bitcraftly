/** Portfolio & case study marketing copy */

export const PORTFOLIO = {
  eyebrow: 'Portfolio & case studies',
  featuredLabel: 'Featured Work',
  showcaseHeading: 'Our Portfolio',
  showcaseDescription:
    'A showcase of modern, fast, and AI-powered digital solutions built with React.js, Next.js & cutting-edge technologies.',
  experienceBadgeTitle: '20+ Years of Experience',
  experienceBadgeBody: 'Delivering high-quality solutions that drive real business results.',
  heading: 'Real builds and production-ready demos — structured for trust',
  intro:
    'Live client websites and interactive showcases across React.js, Next.js, AI-powered experiences, business sites, and startup frontends. Each project is presented with the challenge, what we built, measurable focus areas, and tech stack — so you can judge fit before you book a call.',
  introNote:
    'Live = production URL you can open today. Interactive demo = industry-ready pattern you can click through — your build is scoped and customized after discovery.',
  structureTitle: 'How we present every project',
  structureSteps: [
    {
      step: '01',
      title: 'Project snapshot',
      body: 'Type, stack, live or demo, and the business outcome we optimized for.',
    },
    {
      step: '02',
      title: 'Challenge → build → results',
      body: 'Problem, solution, and outcome bullets — not vague “we designed a website.”',
    },
    {
      step: '03',
      title: 'Before & after',
      body: 'What changed in UX, speed, and lead paths compared to typical template sites.',
    },
    {
      step: '04',
      title: 'Performance focus',
      body: 'Mobile UX, SEO structure, Core Web Vitals mindset, and conversion paths.',
    },
  ] as const,
  projectFocusLabel: 'Build type',
  whyPerformTitle: 'Performance & conversion — built in, not patched later',
  whyPerformIntro:
    'We treat portfolio work like product delivery: mobile-first layouts, lean page weight, SEO-conscious structure, and enquiry funnels that survive real traffic — especially WhatsApp-first Indian buyers on phones.',
  whyPerformPoints: [
    {
      title: 'Mobile-first enquiry paths',
      body: 'CTAs, click-to-call, and WhatsApp placed where thumb traffic actually converts — not hidden in desktop-only menus.',
    },
    {
      title: 'React & Next.js performance discipline',
      body: 'Component structure, image strategy, and route-level SEO — fewer heavy scripts than page-builder stacks.',
    },
    {
      title: 'Core Web Vitals mindset',
      body: 'LCP, CLS, and interaction readiness considered during layout — not “we’ll optimize after launch.”',
    },
    {
      title: 'AI that protects human sales',
      body: 'Bots answer repeat questions; high-intent leads still reach a person on WhatsApp when it matters.',
    },
  ] as const,
  performanceSectionTitle: 'What we optimize on every engagement',
  performanceMetrics: [
    { label: 'Mobile UX', value: 'Thumb-first', note: 'Layouts tested for small screens first' },
    { label: 'Lead paths', value: 'WhatsApp-ready', note: 'Enquiry CTAs above scroll fatigue' },
    {
      label: 'SEO structure',
      value: 'Crawlable',
      note: 'Titles, hierarchy, local discovery basics',
    },
    { label: 'Stack', value: 'React / Next', note: 'Maintainable frontends, not locked templates' },
  ] as const,
  liveProjectTitle: 'View the live build',
  liveProjectBody:
    'Open the production site — same quality bar we bring to your project after scope is confirmed in writing.',
  demoProjectTitle: 'Interactive demo',
  demoProjectBody:
    'Click through a scoped industry pattern — we customize layout, copy, and integrations for your brand.',
  trustStoryline:
    'Founder-led delivery: Sanjay Kr. Singh (20+ yrs) architects the frontend on every engagement — you see how we think before you pay.',
  ctaTitle: 'Want a project structured like these?',
  ctaBody:
    'Tell us your industry and goal — we’ll recommend React vs Next.js, whether AI helps, timeline, and a written starting estimate. Free 15-minute consultation with the founder.',
  primaryCta: 'Book Free Consultation',
  secondaryCta: 'WhatsApp — Scope Similar Project',
  pageHeading: 'Portfolio — live work, case studies & interactive demos',
  pageIntro:
    'Filter by build type. Open any project for the full case study: problem, solution, results, tech stack, and performance focus. Live client work is labeled clearly.',
  bottomCtaTitle: 'Have a Project in Mind?',
  bottomCtaBody: "Let's build something amazing together.",
  bottomCtaPrimary: 'Start Your Project',
  bottomCtaWhatsApp: 'Chat on WhatsApp',
} as const;

/** Wide featured row — startup / SaaS highlight */
export const PORTFOLIO_FEATURED = {
  title: 'Next-Gen SaaS Platform',
  description:
    'Full-stack startup frontend with authentication flows, billing-ready UI, analytics dashboards, and scalable component architecture.',
  techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
  demoHref: '/portfolio/react-video-demo',
  slug: 'react-product-ui-demo',
} as const;

export type { PortfolioCategoryId } from '@/lib/portfolio/categories';
export { PORTFOLIO_CATEGORIES } from '@/lib/portfolio/categories';

export const PORTFOLIO_FOCUS_TYPES = [
  'React.js',
  'Next.js',
  'AI-powered',
  'Business website',
  'Dashboard / admin',
  'Startup frontend',
] as const;

export type PortfolioFocusType = (typeof PORTFOLIO_FOCUS_TYPES)[number];

/** Case study section labels — detail pages */
export const CASE_STUDY_LABELS = {
  overview: 'Case study overview',
  problem: 'The challenge',
  solution: 'What we built',
  results: 'Results & business focus',
  before: 'Before',
  after: 'After delivery',
  techStack: 'Tech stack',
  performance: 'Performance & conversion focus',
  live: 'Live project',
  trust: 'Why clients trust this approach',
} as const;
