import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';

export const EVENTS_LANDING_META = {
  title: 'Events',
  description:
    'Webinars, founder talks, and community sessions from Bitcraftly — Industry Systems, AI delivery, and digital engineering.',
  path: ROUTES.events,
} as const;

export const EVENTS_HERO = {
  headingId: 'events-page-heading',
  eyebrow: 'Events',
  title: 'Learn with the team shipping Industry Systems',
  titleHighlight: 'Industry Systems',
  description:
    'Practical sessions on AI product delivery, Next.js marketing systems, and how SMBs go from brief to launch — without agency chaos.',
  supporting: 'Live webinars, founder AMAs, and partner workshops.',
  primaryCta: {
    label: 'Book a strategy call',
    href: `${NAV_ACTIONS.bookCall.href}?source=events`,
  },
  secondaryCta: {
    label: 'View resources',
    href: ROUTES.resources,
  },
  trustItems: ['Founder-led sessions', 'No slide-deck fluff', 'Actionable takeaways'],
} as const;

export type EventStatus = 'upcoming' | 'past' | 'on-demand';

export interface EventItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly format: string;
  readonly dateLabel: string;
  readonly status: EventStatus;
  readonly topics: readonly string[];
  readonly href?: string;
  readonly ctaLabel?: string;
}

export const EVENT_ITEMS: readonly EventItem[] = [
  {
    id: 'industry-systems-webinar',
    title: 'Industry Systems in 45 minutes',
    summary:
      'How Bitcraftly packages website, AI, dashboard, and analytics as one launch-ready system — with a live walkthrough of Wave 1 verticals.',
    format: 'Webinar',
    dateLabel: 'Next session · Register interest',
    status: 'upcoming',
    topics: ['Healthcare', 'Real Estate', 'Restaurant', 'Corporate'],
    href: `${ROUTES.contact}?intent=event&source=industry-systems-webinar`,
    ctaLabel: 'Reserve a seat',
  },
  {
    id: 'ai-delivery-ama',
    title: 'Founder AMA: Shipping AI without chaos',
    summary:
      'Scope, guardrails, and handoff patterns we use when AI is part of the product — not a bolt-on chatbot.',
    format: 'Live AMA',
    dateLabel: 'Monthly · Invite-only waitlist',
    status: 'upcoming',
    topics: ['AI workflows', 'Lead qualification', 'Ops assists'],
    href: `${ROUTES.contact}?intent=event&source=ai-delivery-ama`,
    ctaLabel: 'Join waitlist',
  },
  {
    id: 'nextjs-marketing-systems',
    title: 'Next.js marketing systems that convert',
    summary:
      'Architecture notes from Bitcraftly’s own platform — App Router, lead funnels, and performance budgets that survive real traffic.',
    format: 'On-demand talk',
    dateLabel: 'Recording available on request',
    status: 'on-demand',
    topics: ['Next.js', 'SEO', 'Lead capture'],
    href: `${ROUTES.contact}?intent=event&source=nextjs-marketing-systems`,
    ctaLabel: 'Request recording',
  },
  {
    id: 'smb-launch-workshop',
    title: 'From brief to go-live for SMBs',
    summary:
      'A workshop format for operators who need a written path: discovery → configure → brand → launch.',
    format: 'Workshop',
    dateLabel: 'Completed · Highlights in blog',
    status: 'past',
    topics: ['Discovery', 'Scope', 'Launch'],
    href: ROUTES.blog,
    ctaLabel: 'Read related posts',
  },
] as const;

export const EVENT_FORMATS = [
  {
    id: 'webinars',
    title: 'Webinars',
    description: '45–60 minute sessions with live demos and Q&A.',
    icon: 'globe' as const,
  },
  {
    id: 'amas',
    title: 'Founder AMAs',
    description: 'Open questions on delivery, AI scope, and pricing clarity.',
    icon: 'message' as const,
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description: 'Hands-on paths for teams ready to map an Industry System.',
    icon: 'sparkles' as const,
  },
] as const;

export const EVENTS_CTA = {
  heading: 'Want Bitcraftly at your event?',
  description:
    'Invite us for a talk, panel, or private workshop — or tell us which session you want next.',
  primaryCta: {
    label: 'Propose a session',
    href: `${ROUTES.contact}?intent=speaking&source=events`,
  },
  tertiaryCta: {
    label: NAV_ACTIONS.bookCall.label,
    href: `${NAV_ACTIONS.bookCall.href}?source=events-cta`,
  },
  trust: ['Remote or on-site', 'Industry-system demos', 'Founder available'],
} as const;
