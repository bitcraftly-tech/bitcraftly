import type { CaseStudy } from '../types';

export const CS_EDUNEXT: CaseStudy = {
  slug: 'edunext-learning-platform',
  title: 'EduNext Learning Platform',
  subtitle: 'Course delivery and progress tracking for a training institute network',
  excerpt:
    'A learner and admin platform that made cohort progress visible and reduced manual attendance chasing.',
  description:
    'Bitcraftly built a learning platform for EduNext institutes covering cohorts, content delivery, attendance, and progress reporting for administrators and trainers.',
  coverImage: '/business-solutions-ai.webp',
  coverImageAlt: 'Learning platform dashboard for institutes',
  client: {
    name: 'EduNext Institutes',
    industry: 'Education',
    size: '12 centers',
    location: 'Delhi NCR, India',
  },
  engagement: {
    role: 'Product design & build',
    duration: '12 weeks',
    year: 2025,
  },
  problem:
    'Institutes tracked attendance and progress in scattered sheets, making it hard to coach lagging learners or report outcomes to parents.',
  challenges: [
    'Trainers needed classroom-speed tools, not heavy LMS clutter',
    'Parents expected clear progress signals without exposing internal notes',
    'Content packs varied by cohort and center',
    'Offline-ish classroom realities meant flaky connectivity',
  ],
  solution:
    'We delivered a cohort-centric platform with attendance capture, progress boards, and parent-safe summaries. Content packs are assigned per cohort, and admin reporting aggregates center performance without spreadsheet merges.',
  approach: [
    'Interviewed trainers after live batches, not only admins',
    'Optimized attendance capture for phone and tablet use',
    'Separated internal coaching notes from parent-facing summaries',
    'Cached critical classroom views for unstable campus networks',
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
  architecture: [
    {
      id: 'learner',
      title: 'Learner experience',
      description: 'Course modules and progress with resilient loading states.',
    },
    {
      id: 'trainer',
      title: 'Trainer tools',
      description: 'Attendance and coaching notes tuned for classroom tempo.',
    },
    {
      id: 'admin',
      title: 'Admin reporting',
      description: 'Center and cohort rollups for leadership reviews.',
    },
  ],
  features: [
    'Cohort and content pack management',
    'Fast attendance capture',
    'Progress boards',
    'Parent-safe summaries',
    'Center performance reports',
  ],
  screenshots: [
    {
      id: 'progress',
      src: '/business-solutions-ai.webp',
      alt: 'Learner progress board',
      caption: 'Cohort progress visibility for trainers and admins',
    },
    {
      id: 'attendance',
      src: '/hero.webp',
      alt: 'Attendance capture interface',
      caption: 'Tablet-friendly attendance during live batches',
    },
  ],
  results: {
    summary:
      'Centers reduced manual reporting effort and intervened earlier when learners fell behind cohort benchmarks.',
    metrics: [
      { id: 'reporting', value: '−50%', label: 'Manual reporting hours' },
      { id: 'intervention', value: '+24%', label: 'Early learner interventions' },
      { id: 'attendance', value: '3×', label: 'Faster attendance capture' },
    ],
  },
  testimonial: {
    quote:
      'Trainers actually use it between sessions. That alone told us Bitcraftly designed for the classroom, not a slide deck.',
    name: 'Priya Nair',
    role: 'Academic Director',
    company: 'EduNext Institutes',
  },
  relatedSlugs: [
    'medanta-care-ops-portal',
    'saaspro-analytics-platform',
    'locallead-services-engine',
  ],
  tags: ['Education', 'LMS', 'Cohorts', 'Reporting'],
  seoTitle: 'EduNext Learning Platform Case Study | Bitcraftly',
  seoDescription:
    'How Bitcraftly built a cohort learning platform with attendance, progress tracking, and admin reporting for EduNext Institutes.',
};
