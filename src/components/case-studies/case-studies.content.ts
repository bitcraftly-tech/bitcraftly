import type { CaseStudyFilterOption, CaseStudyItem } from './types';

export const CASE_STUDY_FILTERS: readonly CaseStudyFilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'AI', label: 'AI' },
  { id: 'Healthcare', label: 'Healthcare' },
  { id: 'E-commerce', label: 'E-commerce' },
  { id: 'Education', label: 'Education' },
  { id: 'Real Estate', label: 'Real Estate' },
  { id: 'CRM', label: 'CRM' },
  { id: 'ERP', label: 'ERP' },
  { id: 'Marketplace', label: 'Marketplace' },
] as const;

export const CASE_STUDY_ITEMS: readonly CaseStudyItem[] = [
  {
    id: 'healthcare-platform',
    industry: 'Healthcare',
    name: 'Healthcare Platform',
    description:
      'Patient booking, doctor schedules, and clinic operations unified in one secure web platform.',
    coverImage: '/products/hero/clinic-healthcare-960.webp',
    coverImageAlt: 'Healthcare clinic platform dashboard and booking interface',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '8 Weeks',
    keyFeatures: ['Online appointments', 'Doctor schedules', 'Patient records', 'SMS reminders'],
    businessOutcome: '+42% Appointment Bookings',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'The clinic relied on phone bookings and paper schedules, causing missed appointments and overloaded front-desk staff.',
      solution:
        'We shipped a responsive booking platform with role-based access for doctors, reception, and patients — including reminders and availability sync.',
      technology:
        'Next.js App Router for the patient and staff experience, Node.js APIs for scheduling rules, and PostgreSQL for durable clinical operations data.',
      architecture:
        'Edge-rendered marketing and booking UI, authenticated staff console, API layer for slots and notifications, and a relational store for patients, doctors, and appointments.',
      features: [
        'Real-time slot availability',
        'Multi-doctor calendar',
        'Automated appointment reminders',
        'Secure patient profiles',
      ],
      timeline: 'Discovery (1 week) → Build (5 weeks) → QA & launch (2 weeks)',
      challenges: [
        'Handling overlapping doctor schedules without double-booking',
        'Keeping SMS delivery reliable during peak hours',
        'Meeting privacy expectations for patient data',
      ],
      results:
        'Appointment bookings increased 42% within the first quarter, no-shows dropped, and front-desk time shifted from intake calls to patient care.',
    },
  },
  {
    id: 'ai-ops-assistant',
    industry: 'AI',
    name: 'AI Operations Assistant',
    description:
      'Internal AI assistant that answers ops questions from SOPs, tickets, and live business metrics.',
    coverImage: '/business-solutions-ai.png',
    coverImageAlt: 'AI operations assistant interface with conversational insights',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'Vector Search'],
    timeline: '10 Weeks',
    keyFeatures: [
      'Knowledge retrieval',
      'Ticket summarization',
      'Role-based answers',
      'Audit trail',
    ],
    businessOutcome: '−35% Support Resolution Time',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Ops and support teams spent hours searching docs and tickets for answers that already existed in scattered systems.',
      solution:
        'We built a grounded AI assistant with retrieval over approved knowledge, ticket history, and metric summaries — with citations and access controls.',
      technology:
        'Next.js console, Python inference services, PostgreSQL for structured data, and vector search for document retrieval.',
      architecture:
        'Ingestion pipeline for docs and tickets, embedding index, guarded LLM orchestration, and an audited chat UI for internal teams.',
      features: [
        'Cited answers from approved sources',
        'Ticket thread summarization',
        'Metric snapshot prompts',
        'Admin knowledge controls',
      ],
      timeline: 'Discovery (2 weeks) → Retrieval + UI (6 weeks) → Hardening (2 weeks)',
      challenges: [
        'Preventing hallucinations with strict grounding',
        'Permission-aware retrieval across teams',
        'Keeping latency low for daily ops use',
      ],
      results:
        'Average support resolution time fell 35%, and new agents ramped faster using the same knowledge base as senior staff.',
    },
  },
  {
    id: 'commerce-growth-suite',
    industry: 'E-commerce',
    name: 'Commerce Growth Suite',
    description:
      'High-converting storefront with catalog, checkout, and order workflows built for scale.',
    coverImage: '/products/ecommerce-store.png',
    coverImageAlt: 'E-commerce storefront product listing and checkout experience',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '12 Weeks',
    keyFeatures: ['Product catalog', 'Secure checkout', 'Order tracking', 'Admin merchandising'],
    businessOutcome: '+58% Online Conversion',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'The brand’s legacy storefront was slow on mobile and leaked conversion at cart and checkout.',
      solution:
        'We rebuilt the storefront around performance, clearer product discovery, and a streamlined checkout with reliable order status.',
      technology:
        'Next.js storefront, Node.js commerce APIs, PostgreSQL for catalog and orders, with CDN-optimized product media.',
      architecture:
        'SSR/SSG product pages, cart session service, payment-ready checkout flow, and an admin console for catalog and fulfillment states.',
      features: [
        'Faceted catalog search',
        'Mobile-first checkout',
        'Order status timeline',
        'Merchandising controls',
      ],
      timeline: 'Discovery (2 weeks) → Catalog & cart (6 weeks) → Checkout & launch (4 weeks)',
      challenges: [
        'Migrating catalog data without downtime',
        'Preserving SEO equity during relaunch',
        'Stabilizing payment edge cases',
      ],
      results:
        'Online conversion rose 58% after launch, with faster mobile load times and fewer abandoned carts.',
    },
  },
  {
    id: 'learning-platform',
    industry: 'Education',
    name: 'Learning Platform',
    description:
      'Course delivery, enrollment, and progress tracking for institutes and training partners.',
    coverImage: '/images/school-about-campus.jpg',
    coverImageAlt: 'Education campus and digital learning platform experience',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '9 Weeks',
    keyFeatures: ['Course catalog', 'Enrollment flows', 'Progress tracking', 'Instructor tools'],
    businessOutcome: '+3.1× Course Completions',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Learners dropped off because course access, payments, and progress lived in disconnected tools.',
      solution:
        'We delivered a unified learning platform with clear enrollment, structured modules, and visible progress for students and instructors.',
      technology:
        'Next.js learner experience, Node.js services for enrollment and progress, PostgreSQL for course and completion records.',
      architecture:
        'Public course marketing pages, authenticated learner dashboard, instructor console, and progress APIs with reporting views.',
      features: [
        'Modular course player',
        'Enrollment and access control',
        'Completion tracking',
        'Instructor content tools',
      ],
      timeline: 'Discovery (1 week) → Core LMS (6 weeks) → Launch polish (2 weeks)',
      challenges: [
        'Designing a learner UX that stayed simple on mobile',
        'Handling cohort-based access rules',
        'Reporting completions accurately for partners',
      ],
      results:
        'Course completions increased 3.1×, and instructors gained a single place to manage content and learner progress.',
    },
  },
  {
    id: 'property-showcase',
    industry: 'Real Estate',
    name: 'Property Showcase Platform',
    description:
      'Project listings, inquiry capture, and sales follow-up for a growing real estate brand.',
    coverImage: '/products/hero/builder-website-960.avif',
    coverImageAlt: 'Real estate project showcase website with property listings',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '7 Weeks',
    keyFeatures: ['Project galleries', 'Lead capture', 'Inquiry routing', 'SEO landing pages'],
    businessOutcome: '+67% Qualified Inquiries',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Project interest came through scattered WhatsApp messages and static pages that were hard to update.',
      solution:
        'We built a branded showcase platform with rich project pages, structured inquiry forms, and routing into the sales follow-up process.',
      technology:
        'Next.js marketing and project pages, Node.js lead APIs, PostgreSQL for listings and inquiries.',
      architecture:
        'SEO-ready project templates, media-optimized galleries, lead capture endpoints, and a lightweight sales inbox view.',
      features: [
        'Project and floor-plan galleries',
        'Structured inquiry forms',
        'Lead assignment routing',
        'Campaign landing pages',
      ],
      timeline: 'Discovery (1 week) → Build (5 weeks) → SEO & launch (1 week)',
      challenges: [
        'Balancing heavy imagery with performance',
        'Standardizing inquiry fields for sales teams',
        'Keeping content editable without developer bottlenecks',
      ],
      results: 'Qualified inquiries rose 67%, with cleaner lead data and faster sales follow-up.',
    },
  },
  {
    id: 'crm-pipeline',
    industry: 'CRM',
    name: 'Sales CRM Pipeline',
    description:
      'Pipeline visibility, follow-ups, and team accountability for B2B sales operations.',
    coverImage: '/products/hero/local-services-lead-site-960.avif',
    coverImageAlt: 'CRM pipeline dashboard for sales follow-ups and deal stages',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '11 Weeks',
    keyFeatures: ['Deal stages', 'Task reminders', 'Team dashboards', 'Activity history'],
    businessOutcome: '+29% Pipeline Velocity',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Sales updates lived in spreadsheets, so leadership lacked reliable stage visibility and follow-up discipline slipped.',
      solution:
        'We delivered a focused CRM with stage-based pipelines, reminders, and dashboards tailored to the sales process — not a bloated suite.',
      technology:
        'Next.js CRM UI, Node.js workflow APIs, PostgreSQL for accounts, deals, and activity logs.',
      architecture:
        'Authenticated CRM shell, deal board and list views, reminder jobs, and reporting queries for team performance.',
      features: [
        'Kanban and list pipelines',
        'Follow-up reminders',
        'Owner assignment',
        'Activity timelines',
      ],
      timeline: 'Discovery (2 weeks) → CRM core (7 weeks) → Reporting (2 weeks)',
      challenges: [
        'Migrating spreadsheet history cleanly',
        'Designing stages that matched real sales behavior',
        'Keeping the UI fast for daily use',
      ],
      results: 'Pipeline velocity improved 29%, with clearer ownership and fewer stalled deals.',
    },
  },
  {
    id: 'erp-ops-core',
    industry: 'ERP',
    name: 'Operations ERP Core',
    description:
      'Inventory, procurement, and fulfillment workflows consolidated into one operations system.',
    coverImage: '/work/projects/saaspro-dashboard.png',
    coverImageAlt: 'ERP operations dashboard showing inventory and fulfillment metrics',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    timeline: '14 Weeks',
    keyFeatures: ['Inventory control', 'Purchase orders', 'Fulfillment status', 'Role permissions'],
    businessOutcome: '−41% Manual Reconciliation',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Operations teams reconciled inventory and orders across disconnected tools, creating delays and stock mismatches.',
      solution:
        'We consolidated inventory, purchasing, and fulfillment into an ERP core with permissions and operational dashboards.',
      technology:
        'Next.js ops console, Node.js domain services, PostgreSQL for transactional records, Redis for queue and cache workloads.',
      architecture:
        'Modular domain services for inventory and procurement, transactional database, background jobs for status sync, and role-gated UI.',
      features: [
        'Stock movements and alerts',
        'Purchase order workflow',
        'Fulfillment status tracking',
        'Permissioned admin roles',
      ],
      timeline: 'Discovery (2 weeks) → Domains (9 weeks) → Stabilization (3 weeks)',
      challenges: [
        'Modeling inventory edge cases accurately',
        'Rolling out without disrupting daily operations',
        'Training multi-role teams quickly',
      ],
      results:
        'Manual reconciliation effort dropped 41%, and stock accuracy improved across warehouses.',
    },
  },
  {
    id: 'local-marketplace',
    industry: 'Marketplace',
    name: 'Local Services Marketplace',
    description:
      'Two-sided marketplace connecting local service providers with customers ready to book.',
    coverImage: '/products/hero/local-services-lead-site-1280.webp',
    coverImageAlt: 'Local services marketplace connecting customers and providers',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '13 Weeks',
    keyFeatures: ['Provider profiles', 'Search & filters', 'Booking requests', 'Admin moderation'],
    businessOutcome: '+2.4× Monthly Bookings',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Providers struggled to get discovered, while customers bounced between informal channels with little trust or structure.',
      solution:
        'We launched a marketplace with searchable provider profiles, structured booking requests, and admin moderation for quality.',
      technology:
        'Next.js marketplace UI, Node.js matching and booking APIs, PostgreSQL for users, listings, and request history.',
      architecture:
        'Public discovery layer, authenticated provider and customer spaces, booking request workflow, and moderation tools.',
      features: [
        'Category search and filters',
        'Provider verification badges',
        'Booking request flow',
        'Admin listing moderation',
      ],
      timeline: 'Discovery (2 weeks) → Marketplace MVP (8 weeks) → Growth polish (3 weeks)',
      challenges: [
        'Balancing supply and demand early',
        'Building trust signals without friction',
        'Preventing spam listings',
      ],
      results:
        'Monthly bookings grew 2.4× after launch, with stronger provider retention and cleaner lead quality.',
    },
  },
  {
    id: 'kitchen-commerce',
    industry: 'E-commerce',
    name: 'Cloud Kitchen Commerce',
    description:
      'Menu, ordering, and kitchen ops experience for a multi-outlet cloud kitchen brand.',
    coverImage: '/products/hero/shrishti-cloud-kitchen-960.avif',
    coverImageAlt: 'Cloud kitchen ordering and operations commerce experience',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    timeline: '8 Weeks',
    keyFeatures: ['Digital menu', 'Order intake', 'Kitchen status', 'Outlet routing'],
    businessOutcome: '+51% Order Throughput',
    ctaLabel: 'View Case Study',
    details: {
      problem:
        'Peak-hour orders overwhelmed staff because menu, intake, and kitchen status were fragmented.',
      solution:
        'We built a commerce experience that connects customer ordering with kitchen status and outlet routing in one flow.',
      technology:
        'Next.js ordering UI, Node.js order services, PostgreSQL for menus, outlets, and order lifecycle.',
      architecture:
        'Customer ordering surface, kitchen status board, outlet routing rules, and order event history.',
      features: [
        'Outlet-aware menus',
        'Live order status',
        'Kitchen board updates',
        'Peak-hour routing rules',
      ],
      timeline: 'Discovery (1 week) → Ordering + kitchen (5 weeks) → Launch (2 weeks)',
      challenges: [
        'Keeping kitchen status accurate under load',
        'Designing menus that stayed easy on mobile',
        'Coordinating multi-outlet fulfillment',
      ],
      results:
        'Order throughput increased 51% during peak windows, with fewer missed tickets and clearer kitchen visibility.',
    },
  },
] as const;

export const CASE_STUDIES_SECTION_COPY = {
  eyebrow: 'Case studies',
  title: 'Outcomes that prove the work',
  description:
    'Real engagements across industries — measured timelines, clear technology choices, and business results that matter.',
} as const;
