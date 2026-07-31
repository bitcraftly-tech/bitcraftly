import { getServiceHref } from '@/constants/services';
import { ROUTES } from '@/constants/navigation';
import type { HomepageService } from './services.types';

export const SERVICES_SECTION_ID = 'services';
export const SERVICES_HEADING_ID = 'services-heading';

export const SERVICES_LABEL = 'What we build';

export const SERVICES_HEADING = 'End-to-End Digital Engineering Services';

export const SERVICES_DESCRIPTION =
  'We combine AI, design, and engineering to deliver powerful digital solutions tailored to your business goals.';

export const HOMEPAGE_SERVICES: readonly HomepageService[] = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description:
      'AI assistants, automation workflows, and LLM-powered products built for real business outcomes.',
    href: getServiceHref('ai-solutions'),
    icon: 'brain',
    ctaLabel: 'Explore AI Solutions',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'High-performance, SEO-friendly websites designed to convert visitors into customers.',
    href: getServiceHref('website-development'),
    icon: 'globe',
    ctaLabel: 'Explore Websites',
  },
  {
    id: 'web-application-development',
    title: 'Web Applications',
    description: 'SaaS platforms, dashboards, and custom web apps engineered for speed and scale.',
    href: getServiceHref('web-application-development'),
    icon: 'layout-grid',
    ctaLabel: 'Explore Web Apps',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile Apps',
    description: 'Native and cross-platform apps for Android and iOS with polished product UX.',
    href: getServiceHref('mobile-app-development'),
    icon: 'smartphone',
    ctaLabel: 'Explore Mobile',
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software',
    description: 'ERP, CRM, CMS, and bespoke tools tailored to your teams and operations.',
    href: getServiceHref('custom-software-development'),
    icon: 'code',
    ctaLabel: 'Explore Custom Software',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description:
      'Cloud infrastructure, CI/CD pipelines, and monitoring that keep products shipping.',
    href: getServiceHref('cloud-devops'),
    icon: 'cloud',
    ctaLabel: 'Explore Cloud & DevOps',
  },
] as const;

export const SERVICES_PRIMARY_CTA = {
  label: 'Explore All Services',
  href: ROUTES.services,
} as const;
