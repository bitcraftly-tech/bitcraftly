import { ROUTES } from '@/constants/navigation';
import { bitcraftlyProductImage } from '../shared/contact-links';
import type { PortfolioCta, PortfolioFilter, PortfolioProject } from './portfolio.types';

export const PORTFOLIO_SECTION_ID = 'featured-portfolio';
export const PORTFOLIO_HEADING_ID = 'featured-portfolio-heading';

export const PORTFOLIO_LABEL = 'Featured Work';

export const PORTFOLIO_HEADING = 'Our Portfolio';

export const PORTFOLIO_DESCRIPTION =
  'Live client websites and interactive showcases across React.js, Next.js, AI-powered experiences, business sites, and startup frontends.';

export const PORTFOLIO_FILTERS: readonly PortfolioFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'retail', label: 'Retail' },
  { id: 'websites', label: 'Websites' },
  { id: 'ecommerce', label: 'Ecommerce' },
] as const;

function workProjectHref(slug: string): string {
  return `${ROUTES.workProjects}/${slug}`;
}

/**
 * Featured homepage projects — case study links stay on-platform (/work/projects).
 * Live preview may still open the client’s production site when available.
 */
export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: 'shrishti-cloud-kitchen',
    title: 'Shrishti Cloud Kitchen',
    description: 'Live cloud kitchen — menu discovery built for WhatsApp orders.',
    industry: 'Website',
    badge: 'Live client',
    filterIds: ['websites', 'retail'],
    technologies: ['Next.js', 'React', 'Mobile UX', 'SEO', 'WhatsApp'],
    imageSrc: bitcraftlyProductImage('Shrishti Cloud Kitchen.png'),
    imageAlt: 'Shrishti Cloud Kitchen website preview',
    caseStudyHref: workProjectHref('shrishti-cloud-kitchen'),
    livePreviewHref: 'https://www.shrishticloud.kitchen/',
    livePreviewExternal: true,
  },
  {
    id: 'swastik-makhana',
    title: 'Swastik Makhana',
    description: 'Live D2C brand — premium makhana store with cart, packs & NCR delivery.',
    industry: 'Ecommerce',
    badge: 'Live client',
    filterIds: ['ecommerce', 'retail'],
    technologies: ['Next.js', 'React', 'Ecommerce UX', 'Mobile-first', 'SEO'],
    imageSrc: bitcraftlyProductImage('Swastik Makhana.png'),
    imageAlt: 'Swastik Makhana ecommerce storefront preview',
    caseStudyHref: workProjectHref('swastik-makhana'),
    livePreviewHref: 'https://www.swastikmakhana.co/',
    livePreviewExternal: true,
  },
  {
    id: 'kunwar-dairy',
    title: 'Kunwar Dairy',
    description: 'Live dairy brand — farm-fresh milk, ghee & subscription delivery across Bihar.',
    industry: 'Ecommerce',
    badge: 'Live client',
    filterIds: ['ecommerce', 'retail'],
    technologies: ['Next.js', 'React', 'Subscription UX', 'Razorpay-ready', 'Mobile-first'],
    imageSrc: bitcraftlyProductImage('dairy farm.png'),
    imageAlt: 'Kunwar Dairy website preview',
    caseStudyHref: workProjectHref('kunwar-dairy'),
    livePreviewHref: 'https://kunwardairy.com/',
    livePreviewExternal: true,
  },
  {
    id: 'school-website',
    title: 'Admissions-Ready School Site',
    description: 'Education showcase with a clear admissions path parents can complete on mobile.',
    industry: 'Education',
    badge: 'Interactive demo',
    filterIds: ['education', 'websites'],
    technologies: ['Next.js', 'Forms', 'Content structure', 'Mobile UX'],
    imageSrc: bitcraftlyProductImage('School Website.png'),
    imageAlt: 'School website admissions showcase preview',
    caseStudyHref: workProjectHref('school-website'),
    livePreviewHref: workProjectHref('school-website'),
    livePreviewExternal: false,
  },
  {
    id: 'clinic-healthcare',
    title: 'Clinic Care Website',
    description: 'Healthcare showcase built for trust, clarity, and appointment enquiries.',
    industry: 'Healthcare',
    badge: 'Interactive demo',
    filterIds: ['healthcare', 'websites'],
    technologies: ['React', 'Forms', 'Trust UX', 'SEO'],
    imageSrc: bitcraftlyProductImage('Clinic & Healthcare.png'),
    imageAlt: 'Clinic and healthcare website showcase preview',
    caseStudyHref: workProjectHref('clinic-healthcare'),
    livePreviewHref: workProjectHref('clinic-healthcare'),
    livePreviewExternal: false,
  },
  {
    id: 'ai-chatbot-restaurant',
    title: 'Restaurant AI Concierge',
    description: 'AI menu answers with seamless human handoff on WhatsApp.',
    industry: 'AI',
    badge: 'Interactive demo',
    filterIds: ['ai', 'websites'],
    technologies: ['OpenAI', 'Next.js', 'React', 'WhatsApp API'],
    imageSrc: bitcraftlyProductImage('AI Chatbot for Restaurant.png'),
    imageAlt: 'Restaurant AI chatbot showcase preview',
    caseStudyHref: workProjectHref('restaurant-ai-chatbot'),
    livePreviewHref: workProjectHref('restaurant-ai-chatbot'),
    livePreviewExternal: false,
  },
] as const;

export const PORTFOLIO_PRIMARY_CTA: PortfolioCta = {
  label: 'View Full Portfolio',
  href: ROUTES.work,
};
