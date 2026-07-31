import type { CaseStudy } from '../types';

export const CS_MEDANTA: CaseStudy = {
  slug: 'medanta-care-ops-portal',
  title: 'Medanta Care Ops Portal',
  subtitle: 'Care coordination workspace for outpatient operations',
  excerpt:
    'A secure ops portal that helped coordinators track appointments, follow-ups, and escalation queues in one place.',
  description:
    'Bitcraftly partnered on a care operations portal focused on appointment clarity, follow-up discipline, and audit-friendly activity history for a healthcare operator.',
  coverImage: '/industries-hero.webp',
  coverImageAlt: 'Healthcare operations portal interface',
  client: {
    name: 'Medanta Care Network',
    industry: 'Healthcare',
    size: '200+ staff across clinics',
    location: 'Gurugram, India',
  },
  engagement: {
    role: 'Platform design & engineering',
    duration: '18 weeks',
    year: 2025,
  },
  problem:
    'Care coordinators juggled spreadsheets and inbox threads, creating missed follow-ups and weak visibility for supervisors.',
  challenges: [
    'Clinical-adjacent workflows required careful permissioning',
    'Staff needed low-training UI for busy desk environments',
    'Audit trail was mandatory for escalation reviews',
    'Integrations with existing appointment sources were incomplete',
  ],
  solution:
    'We delivered a role-aware portal with queue boards, patient-safe summaries, and supervisor dashboards. Sensitive fields stay behind explicit access checks, while day-to-day actions remain keyboard-friendly and fast.',
  approach: [
    'Shadowed coordinators during morning appointment triage',
    'Defined escalation states before visual design',
    'Built accessibility-first tables for dense operational data',
    'Phased integrations behind adapters to avoid big-bang cutovers',
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'FastAPI', 'JWT Auth'],
  architecture: [
    {
      id: 'portal',
      title: 'Ops portal',
      description: 'Server-rendered boards with client islands for filters.',
    },
    {
      id: 'api',
      title: 'API boundary',
      description: 'FastAPI services with JWT-scoped endpoints per role.',
    },
    {
      id: 'audit',
      title: 'Audit trail',
      description: 'Append-only activity events for escalations and overrides.',
    },
  ],
  features: [
    'Appointment and follow-up queues',
    'Escalation workflows',
    'Supervisor visibility dashboards',
    'Role-based access controls',
    'Exportable activity history',
  ],
  screenshots: [
    {
      id: 'queue',
      src: '/industries-hero.webp',
      alt: 'Care coordination queue board',
      caption: 'Queue-first layout for desk-side throughput',
    },
    {
      id: 'supervisor',
      src: '/business-solutions-crm.webp',
      alt: 'Supervisor dashboard',
      caption: 'Escalation and SLA visibility for leads',
    },
  ],
  results: {
    summary:
      'Follow-up completion improved and supervisors gained a single source of truth for escalations without adding headcount.',
    metrics: [
      { id: 'followups', value: '+27%', label: 'Follow-up completion' },
      { id: 'escalations', value: '−22%', label: 'Missed escalations' },
      { id: 'training', value: '1 day', label: 'Avg. staff ramp time' },
    ],
  },
  testimonial: {
    quote:
      'The portal respects how our desks actually work. Bitcraftly balanced speed with the controls healthcare operations require.',
    name: 'Dr. Neha Kapoor',
    role: 'Operations Lead',
    company: 'Medanta Care Network',
  },
  relatedSlugs: [
    'saaspro-analytics-platform',
    'edunext-learning-platform',
    'shrishti-cloud-kitchen',
  ],
  tags: ['Healthcare', 'Operations', 'Portal', 'Security'],
  seoTitle: 'Medanta Care Ops Portal Case Study | Bitcraftly',
  seoDescription:
    'How Bitcraftly built a care operations portal with queues, escalations, and audit-friendly workflows for Medanta Care Network.',
};
