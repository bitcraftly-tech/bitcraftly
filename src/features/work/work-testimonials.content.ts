import type { WorkTestimonialDetail } from './WorkTestimonialDetailPage';

export const WORK_TESTIMONIAL_DETAILS: readonly WorkTestimonialDetail[] = [
  {
    slug: 'northstar-health',
    label: 'Northstar Health',
    description: 'Client perspective on Bitcraftly delivery and partnership.',
    industry: 'Healthcare',
    role: 'Operations lead',
  },
] as const;

/** Only approved quotes are indexable. Placeholder pages stay noindex. */
export function hasApprovedTestimonialQuote(item: WorkTestimonialDetail): boolean {
  return Boolean(item.quote?.trim());
}
