import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import type { WorkFilterOption, WorkMetric, WorkProject } from './types';

export const WORK_FILTERS: readonly WorkFilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'Healthcare', label: 'Healthcare' },
  { id: 'AI', label: 'AI' },
  { id: 'SaaS', label: 'SaaS' },
  { id: 'CRM', label: 'CRM' },
  { id: 'ERP', label: 'ERP' },
  { id: 'E-commerce', label: 'E-commerce' },
  { id: 'Education', label: 'Education' },
  { id: 'Real Estate', label: 'Real Estate' },
  { id: 'Retail', label: 'Retail' },
] as const;

export const WORK_HERO = {
  eyebrow: 'Work',
  title: 'We Build Products That Scale.',
  description:
    'Enterprise-grade product engineering — clear problem framing, modern architecture, and outcomes measured in growth, speed, and reliability.',
  primaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: NAV_ACTIONS.bookCall.href,
  },
  secondaryCta: {
    label: 'View featured work',
    href: '#work-featured',
  },
  searchPlaceholder: 'Search projects, industries, or technology…',
} as const;

export const WORK_PROJECTS: readonly WorkProject[] = [
  {
    id: 'healthcare-platform',
    name: 'Healthcare Operations Platform',
    overview:
      'A unified booking, scheduling, and care-ops platform that replaced phone-heavy workflows with reliable digital journeys.',
    industry: 'Healthcare',
    projectType: 'Web Application',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '8 Weeks',
    businessImpact: '+42% appointment bookings',
    coverImage: '/products/hero/clinic-healthcare-960.webp',
    coverImageAlt: 'Healthcare operations platform booking and schedule interface',
    featured: true,
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['clinic', 'booking', 'appointments', 'healthcare'],
    details: {
      problem:
        'The clinic relied on calls and paper schedules, causing missed appointments and overloaded front-desk teams.',
      solution:
        'We shipped a secure booking platform with doctor schedules, patient reminders, and role-based staff tools.',
      architecture:
        'Edge-rendered patient experience, authenticated staff console, scheduling APIs, and a relational store for patients, doctors, and appointments.',
      features: [
        'Real-time slot availability',
        'Multi-doctor calendars',
        'Automated reminders',
        'Secure patient profiles',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
      timeline: 'Discovery (1 week) → Build (5 weeks) → QA & launch (2 weeks)',
      challenges: [
        'Preventing double-booking across overlapping schedules',
        'Reliable reminder delivery during peak hours',
        'Privacy-minded handling of patient data',
      ],
      outcome:
        'Appointment bookings rose 42% in the first quarter, no-shows dropped, and front-desk time shifted to patient care.',
      screenshots: [
        {
          src: '/products/hero/clinic-healthcare-720.webp',
          alt: 'Healthcare platform schedule view',
        },
        {
          src: '/products/hero/clinic-healthcare-480.webp',
          alt: 'Healthcare platform booking experience',
        },
      ],
    },
  },
  {
    id: 'ai-ops-assistant',
    name: 'AI Operations Assistant',
    overview:
      'An internal AI assistant grounded in SOPs, tickets, and metrics — built for trusted answers with citations.',
    industry: 'AI',
    projectType: 'AI Product',
    technology: ['Next.js', 'Python', 'OpenAI', 'PostgreSQL'],
    timeline: '10 Weeks',
    businessImpact: '−35% support resolution time',
    coverImage: '/business-solutions-ai.png',
    coverImageAlt: 'AI operations assistant conversational interface',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['llm', 'rag', 'support', 'automation'],
    details: {
      problem:
        'Ops and support teams spent hours searching docs and tickets for answers that already existed.',
      solution:
        'We built a grounded assistant with retrieval over approved knowledge, ticket history, and metric summaries.',
      architecture:
        'Ingestion pipeline, vector index, guarded LLM orchestration, and an audited chat console for internal teams.',
      features: [
        'Cited answers from approved sources',
        'Ticket summarization',
        'Role-aware retrieval',
        'Admin knowledge controls',
      ],
      techStack: ['Next.js', 'Python', 'OpenAI', 'PostgreSQL', 'Vector Search'],
      timeline: 'Discovery (2 weeks) → Retrieval + UI (6 weeks) → Hardening (2 weeks)',
      challenges: [
        'Preventing hallucinations with strict grounding',
        'Permission-aware retrieval across teams',
        'Keeping latency low for daily ops use',
      ],
      outcome:
        'Average support resolution time fell 35%, and new agents ramped faster using the same knowledge base.',
      screenshots: [
        {
          src: '/business-solutions-ai.png',
          alt: 'AI assistant knowledge interface',
        },
      ],
    },
  },
  {
    id: 'saas-analytics',
    name: 'SaaS Analytics Platform',
    overview:
      'A multi-tenant analytics product with dashboards, alerts, and activation-focused UX for B2B teams.',
    industry: 'SaaS',
    projectType: 'SaaS Product',
    technology: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    timeline: '14 Weeks',
    businessImpact: '+2.1× activation rate',
    coverImage: '/work/projects/saaspro-dashboard.png',
    coverImageAlt: 'SaaS analytics dashboard with KPI charts',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['dashboard', 'multi-tenant', 'saas', 'analytics'],
    details: {
      problem:
        'The product’s early architecture and UX slowed activation and made tenant isolation fragile.',
      solution:
        'We rebuilt core dashboards, tenancy boundaries, and onboarding around clearer activation paths.',
      architecture:
        'Multi-tenant Next.js app, Postgres-backed metrics store, background jobs for aggregations, and CI/CD with preview environments.',
      features: [
        'Tenant-isolated dashboards',
        'KPI alerting',
        'Role-based access',
        'Activation onboarding flows',
      ],
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      timeline: 'Discovery (2 weeks) → Platform rebuild (9 weeks) → Launch polish (3 weeks)',
      challenges: [
        'Preserving historical metrics during migration',
        'Keeping query performance under tenant growth',
        'Designing activation without overwhelming new users',
      ],
      outcome:
        'Activation improved 2.1× after launch, with cleaner tenancy and faster feature delivery.',
      screenshots: [
        {
          src: '/work/projects/saaspro-dashboard.png',
          alt: 'SaaS analytics KPI dashboard',
        },
      ],
    },
  },
  {
    id: 'crm-pipeline',
    name: 'Sales CRM Pipeline',
    overview:
      'A focused CRM for pipeline visibility, follow-ups, and team accountability — without bloat.',
    industry: 'CRM',
    projectType: 'Web Application',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '11 Weeks',
    businessImpact: '+29% pipeline velocity',
    coverImage: '/products/hero/local-services-lead-site-960.avif',
    coverImageAlt: 'CRM pipeline board and deal stages',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['sales', 'pipeline', 'crm', 'leads'],
    details: {
      problem:
        'Sales updates lived in spreadsheets, so leadership lacked reliable stage visibility.',
      solution:
        'We delivered a stage-based CRM with reminders, ownership, and dashboards tailored to the sales process.',
      architecture:
        'Authenticated CRM shell, deal board/list views, reminder jobs, and reporting queries for team performance.',
      features: [
        'Kanban and list pipelines',
        'Follow-up reminders',
        'Owner assignment',
        'Activity timelines',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
      timeline: 'Discovery (2 weeks) → CRM core (7 weeks) → Reporting (2 weeks)',
      challenges: [
        'Migrating spreadsheet history cleanly',
        'Matching stages to real sales behavior',
        'Keeping the UI fast for daily use',
      ],
      outcome: 'Pipeline velocity improved 29%, with clearer ownership and fewer stalled deals.',
      screenshots: [
        {
          src: '/products/hero/local-services-lead-site-720.avif',
          alt: 'CRM lead and pipeline interface',
        },
      ],
    },
  },
  {
    id: 'erp-ops-core',
    name: 'Operations ERP Core',
    overview: 'Inventory, procurement, and fulfillment consolidated into one operations system.',
    industry: 'ERP',
    projectType: 'Enterprise System',
    technology: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    timeline: '14 Weeks',
    businessImpact: '−41% manual reconciliation',
    coverImage: '/work/projects/saaspro-dashboard.png',
    coverImageAlt: 'ERP operations dashboard for inventory and fulfillment',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['inventory', 'procurement', 'erp', 'operations'],
    details: {
      problem: 'Operations teams reconciled inventory and orders across disconnected tools.',
      solution:
        'We consolidated inventory, purchasing, and fulfillment into an ERP core with permissions and dashboards.',
      architecture:
        'Modular domain services, transactional Postgres, background jobs for status sync, and role-gated ops UI.',
      features: [
        'Stock movements and alerts',
        'Purchase order workflow',
        'Fulfillment tracking',
        'Permissioned admin roles',
      ],
      techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      timeline: 'Discovery (2 weeks) → Domains (9 weeks) → Stabilization (3 weeks)',
      challenges: [
        'Modeling inventory edge cases accurately',
        'Rolling out without disrupting daily ops',
        'Training multi-role teams quickly',
      ],
      outcome:
        'Manual reconciliation effort dropped 41%, and stock accuracy improved across warehouses.',
      screenshots: [
        {
          src: '/work/projects/saaspro-dashboard.png',
          alt: 'ERP inventory and operations view',
        },
      ],
    },
  },
  {
    id: 'commerce-growth',
    name: 'Commerce Growth Suite',
    overview:
      'A high-converting storefront with catalog, checkout, and order workflows built for scale.',
    industry: 'E-commerce',
    projectType: 'Commerce Platform',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '12 Weeks',
    businessImpact: '+58% online conversion',
    coverImage: '/products/ecommerce-store.png',
    coverImageAlt: 'E-commerce storefront product listing experience',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['storefront', 'checkout', 'commerce', 'conversion'],
    details: {
      problem:
        'The legacy storefront was slow on mobile and leaked conversion at cart and checkout.',
      solution:
        'We rebuilt around performance, clearer product discovery, and a streamlined checkout.',
      architecture:
        'SSR/SSG product pages, cart session service, payment-ready checkout, and an admin console for catalog and fulfillment.',
      features: [
        'Faceted catalog search',
        'Mobile-first checkout',
        'Order status timeline',
        'Merchandising controls',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
      timeline: 'Discovery (2 weeks) → Catalog & cart (6 weeks) → Checkout & launch (4 weeks)',
      challenges: [
        'Migrating catalog data without downtime',
        'Preserving SEO equity during relaunch',
        'Stabilizing payment edge cases',
      ],
      outcome:
        'Online conversion rose 58% after launch, with faster mobile load times and fewer abandoned carts.',
      screenshots: [
        {
          src: '/products/ecommerce-store.png',
          alt: 'Commerce storefront product grid',
        },
      ],
    },
  },
  {
    id: 'learning-platform',
    name: 'Learning Platform',
    overview:
      'Course delivery, enrollment, and progress tracking for institutes and training partners.',
    industry: 'Education',
    projectType: 'Learning Platform',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '9 Weeks',
    businessImpact: '+3.1× course completions',
    coverImage: '/images/school-about-campus.jpg',
    coverImageAlt: 'Education campus and digital learning platform',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['lms', 'courses', 'education', 'enrollment'],
    details: {
      problem:
        'Learners dropped off because course access, payments, and progress lived in disconnected tools.',
      solution:
        'We delivered a unified learning platform with enrollment, modules, and visible progress.',
      architecture:
        'Public course pages, authenticated learner dashboard, instructor console, and progress APIs with reporting.',
      features: [
        'Modular course player',
        'Enrollment and access control',
        'Completion tracking',
        'Instructor content tools',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
      timeline: 'Discovery (1 week) → Core LMS (6 weeks) → Launch polish (2 weeks)',
      challenges: [
        'Keeping learner UX simple on mobile',
        'Handling cohort-based access rules',
        'Reporting completions accurately for partners',
      ],
      outcome:
        'Course completions increased 3.1×, with a single place for instructors to manage progress.',
      screenshots: [
        {
          src: '/images/school-cta-campus.jpg',
          alt: 'Learning platform campus experience',
        },
      ],
    },
  },
  {
    id: 'property-showcase',
    name: 'Property Showcase Platform',
    overview:
      'Project listings, inquiry capture, and sales follow-up for a growing real estate brand.',
    industry: 'Real Estate',
    projectType: 'Marketing Platform',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '7 Weeks',
    businessImpact: '+67% qualified inquiries',
    coverImage: '/products/hero/builder-website-960.avif',
    coverImageAlt: 'Real estate project showcase website',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['property', 'leads', 'real estate', 'showcase'],
    details: {
      problem: 'Project interest came through scattered WhatsApp messages and static pages.',
      solution:
        'We built a branded showcase with rich project pages, structured inquiries, and sales routing.',
      architecture:
        'SEO-ready project templates, media-optimized galleries, lead capture endpoints, and a lightweight sales inbox.',
      features: [
        'Project and floor-plan galleries',
        'Structured inquiry forms',
        'Lead assignment routing',
        'Campaign landing pages',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
      timeline: 'Discovery (1 week) → Build (5 weeks) → SEO & launch (1 week)',
      challenges: [
        'Balancing heavy imagery with performance',
        'Standardizing inquiry fields for sales',
        'Keeping content editable without developer bottlenecks',
      ],
      outcome: 'Qualified inquiries rose 67%, with cleaner lead data and faster follow-up.',
      screenshots: [
        {
          src: '/products/hero/builder-website-720.avif',
          alt: 'Real estate project landing experience',
        },
      ],
    },
  },
  {
    id: 'retail-commerce',
    name: 'Retail Commerce Experience',
    overview:
      'Omnichannel retail experience spanning catalog, inventory visibility, and customer journeys.',
    industry: 'Retail',
    projectType: 'Retail Platform',
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '10 Weeks',
    businessImpact: '+44% repeat purchase rate',
    coverImage: '/products/hero/shrishti-cloud-kitchen-960.avif',
    coverImageAlt: 'Retail commerce ordering and catalog experience',
    cta: { label: 'View case study', href: '#work-details' },
    searchTags: ['retail', 'catalog', 'inventory', 'orders'],
    details: {
      problem:
        'Online and offline inventory were disconnected, and the brand experience was inconsistent.',
      solution:
        'We unified catalog, ordering, and inventory visibility into one retail commerce experience.',
      architecture:
        'Customer storefront, inventory APIs, order lifecycle services, and ops dashboards for merchandising teams.',
      features: [
        'Unified product catalog',
        'Inventory-aware ordering',
        'Order status tracking',
        'Merchandising controls',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
      timeline: 'Discovery (2 weeks) → Commerce core (6 weeks) → Launch (2 weeks)',
      challenges: [
        'Syncing inventory across channels',
        'Preserving brand consistency on mobile',
        'Handling peak-hour order volume',
      ],
      outcome:
        'Repeat purchase rate improved 44%, with clearer stock accuracy and smoother ordering.',
      screenshots: [
        {
          src: '/products/hero/shrishti-cloud-kitchen-720.avif',
          alt: 'Retail commerce catalog and ordering UI',
        },
      ],
    },
  },
] as const;

export const WORK_FEATURED_META = {
  eyebrow: 'Featured',
  title: 'Featured case study',
} as const;

export const WORK_GRID_META = {
  eyebrow: 'Selected work',
  title: 'Products engineered for business outcomes',
  description:
    'Filter by industry or search by technology. Each engagement is scoped around problem, architecture, and measurable impact.',
  empty: 'No projects match your search or filters.',
} as const;

export const WORK_DETAILS_META = {
  eyebrow: 'Case study',
  titlePrefix: 'Inside the build',
} as const;

export const WORK_TECH = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'Supabase',
  'AWS',
  'Docker',
  'OpenAI',
] as const;

export const WORK_TECH_META = {
  eyebrow: 'Stack',
  title: 'Technologies used',
  description: 'Modern engineering tools chosen for performance, maintainability, and scale.',
} as const;

export const WORK_METRICS: readonly WorkMetric[] = [
  { id: 'projects', value: '300+', label: 'Projects Delivered', icon: 'layout-grid' },
  { id: 'delivery', value: '6–12 wks', label: 'Average Delivery Time', icon: 'calendar' },
  { id: 'satisfaction', value: '100%', label: 'Client Satisfaction', icon: 'star' },
  { id: 'industries', value: '24+', label: 'Industries Served', icon: 'globe' },
] as const;

export const WORK_METRICS_META = {
  eyebrow: 'Results',
  title: 'Client results',
  description: 'Outcomes from product engagements across industries and platforms.',
} as const;

export const WORK_FINAL_CTA = {
  eyebrow: 'Next product',
  title: "Let's build your next product.",
  description:
    'Share your goals and constraints. We’ll recommend an architecture, timeline, and clear path to launch.',
  primaryCta: {
    label: 'Book Discovery Call',
    href: ROUTES.contact,
  },
  secondaryCta: {
    label: 'View Services',
    href: ROUTES.services,
  },
  trustItems: ['Written proposals', 'Founder-led scoping', 'Outcome-focused delivery'] as const,
} as const;
