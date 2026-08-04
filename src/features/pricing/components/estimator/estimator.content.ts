import { ROUTES } from '@/constants/navigation';

export const ESTIMATOR_COPY = {
  title: 'AI Project Estimator',
  liveLabel: 'Live',
  greetingHi: 'Hi!',
  greetingName: "I'm Bitcraftly AI.",
  greetingBody: "Describe the project you'd like to build.",
  placeholder: 'I need an e-commerce website with admin panel and online payments.',
  enhanceLabel: 'Enhance brief',
  generateLabel: 'Generate Estimate',
  reviseLabel: 'Update Estimate',
  emptyError: 'Please describe your project to receive an estimate.',
  analyzingLabel: 'Analyzing project...',
  resultEyebrow: 'Your AI recommendation',
  projectTypeLabel: 'Project Type',
  categoryLabel: 'Business Category',
  packageLabel: 'Recommended Package',
  timelineLabel: 'Estimated Timeline',
  investmentLabel: 'Estimated Investment',
  stackLabel: 'Technology Stack',
  addOnsLabel: 'Recommended Add-ons',
  whyTitle: 'Why This Recommendation',
  resultNote: 'Indicative only · final quote after discovery · no hidden charges',
  primaryCta: {
    label: 'Book Discovery Call',
    href: `${ROUTES.contact}?intent=discovery&source=pricing-ai-estimator`,
  },
  secondaryCta: {
    label: 'Request Proposal',
    href: `${ROUTES.contact}?intent=quote&source=pricing-ai-estimator`,
  },
  tertiaryCta: {
    label: 'Talk to an Expert',
    href: `${ROUTES.contact}?intent=strategy&source=pricing-ai-estimator`,
  },
  suggestions: [
    'I need a clinic website',
    'I need an online grocery website',
    'I need a CRM',
  ] as const,
  badges: ['Free', '2 Min', 'No commitment'] as const,
} as const;
