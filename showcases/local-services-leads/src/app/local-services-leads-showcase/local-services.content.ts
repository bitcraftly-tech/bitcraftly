import {
  BadgeCheck,
  BadgeIndianRupee,
  Blocks,
  ClipboardCheck,
  Clock,
  Droplets,
  Hammer,
  MapPin,
  MessageSquareText,
  Paintbrush,
  PhoneCall,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceCategory {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly blurb: string;
  readonly jobs: readonly string[];
  readonly startsAt: string;
  readonly sla: string;
  readonly warranty: string;
  readonly icon: LucideIcon;
}

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly copy: string;
  readonly stat: string;
  readonly icon: LucideIcon;
}

export interface PlanVariant {
  readonly price: string;
  readonly unit: string;
  readonly period: string;
  readonly bullets: readonly string[];
}

export interface Plan {
  readonly id: string;
  readonly name: string;
  readonly featured: boolean;
  readonly visit: PlanVariant;
  readonly care: PlanVariant;
}

export interface Zone {
  readonly id: string;
  readonly name: string;
  readonly eta: string;
  readonly crews: string;
  /** Radar placement in percent, measured from the top-left of the dial. */
  readonly x: number;
  readonly y: number;
}

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Zones', href: '#zones' },
  { label: 'Book', href: '#booking' },
] as const;

export const HERO_STATS = [
  { id: 'rating', value: 4.8, suffix: '', decimals: 1, label: 'Average rating' },
  { id: 'response', value: 15, suffix: ' min', decimals: 0, label: 'Median callback' },
  { id: 'jobs', value: 260, suffix: '+', decimals: 0, label: 'Jobs delivered' },
] as const;

export const DISPATCH_FEED = [
  {
    id: 'd1',
    title: 'AC not cooling · split unit',
    meta: 'Bistupur · gas top-up + PCB check',
    eta: 'ETA 22m',
    icon: Wind,
  },
  {
    id: 'd2',
    title: 'Kitchen tap leak',
    meta: 'Sakchi · washer + cartridge swap',
    eta: 'ETA 35m',
    icon: Droplets,
  },
  {
    id: 'd3',
    title: 'MCB tripping repeatedly',
    meta: 'Kadma · load audit + earthing',
    eta: 'ETA 48m',
    icon: Zap,
  },
] as const;

export const TICKER_ITEMS = [
  { id: 't1', label: 'ID-verified crews', icon: ShieldCheck },
  { id: 't2', label: 'Written estimate before work', icon: ClipboardCheck },
  { id: 't3', label: '15-minute median callback', icon: Clock },
  { id: 't4', label: '30-day rework promise', icon: BadgeCheck },
  { id: 't5', label: 'WhatsApp ticket IDs', icon: MessageSquareText },
  { id: 't6', label: 'Nearest-crew routing', icon: Route },
  { id: 't7', label: 'Photo logs after every job', icon: Sparkles },
  { id: 't8', label: 'No surprise line items', icon: BadgeIndianRupee },
] as const;

export const SERVICES: readonly ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    tagline: 'Leaks, tanks and bathroom retrofits',
    blurb:
      'Certified plumbers arrive with pressure gauges and spare fittings, so most call-outs finish in a single visit instead of a parts run.',
    jobs: ['Leak and seepage fixes', 'Overhead tank cleaning', 'Motor and pump install', 'Bathroom retrofit'],
    startsAt: '₹299 visit',
    sla: 'Same-day slots',
    warranty: '30-day labour cover',
    icon: Droplets,
  },
  {
    id: 'electrician',
    name: 'Electrician',
    tagline: 'Safe loads, clean wiring',
    blurb:
      'Load audits before any upgrade, so the MCB you pay for actually matches the appliances running behind it.',
    jobs: ['MCB and DB upgrades', 'Earthing audit', 'Fixture and fan installs', 'Inverter wiring'],
    startsAt: '₹299 visit',
    sla: 'Emergency desk 24×7',
    warranty: '30-day labour cover',
    icon: Zap,
  },
  {
    id: 'ac',
    name: 'AC repair',
    tagline: 'Cooling restored, hygiene included',
    blurb:
      'Gauge-tested gas top-ups with before/after temperature readings shared on WhatsApp — no guesswork billing.',
    jobs: ['Gas refill with gauge log', 'PCB fault diagnosis', 'Split and window service', 'AMC hygiene visits'],
    startsAt: '₹499 service',
    sla: 'Peak-season priority',
    warranty: '90-day gas warranty',
    icon: Wind,
  },
  {
    id: 'cleaning',
    name: 'Deep cleaning',
    tagline: 'Move-out grade sparkle',
    blurb:
      'Crews carry their own machines and log deposit-proof photos, which is what saves tenants the landlord argument later.',
    jobs: ['Move-out deep clean', 'Sofa and mattress shampoo', 'Kitchen degrease', 'Sanitisation fogging'],
    startsAt: '₹1,899 half-day',
    sla: 'Weekend crews',
    warranty: 'Re-clean within 48h',
    icon: Sparkles,
  },
  {
    id: 'painting',
    name: 'Painting',
    tagline: 'Masked, primed, on schedule',
    blurb:
      'Waterproofing primer and obsessive floor masking, with a supervisor pushing daily progress pictures to your chat.',
    jobs: ['Interior and texture work', 'Waterproofing primer', 'Wood polish', 'Site masking and cleanup'],
    startsAt: '₹1,899 half-day',
    sla: 'Scheduled 48h ahead',
    warranty: 'Finish touch-ups free',
    icon: Paintbrush,
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    tagline: 'Doors, modular and fittings',
    blurb:
      'Hinge swaps and modular fixes handled with the right jig, so drawers keep aligning months after the visit.',
    jobs: ['Door alignment', 'Modular kitchen fixes', 'Furniture assembly', 'Hinge and channel swaps'],
    startsAt: '₹399 visit',
    sla: 'Next-day slots',
    warranty: '30-day labour cover',
    icon: Hammer,
  },
] as const;

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'capture',
    title: 'Every enquiry is captured',
    copy: 'Missed calls turn into SMS callbacks and CRM rows automatically. Web, WhatsApp and phone leads land in one queue instead of three inboxes.',
    stat: '0 leads lost to a busy line',
    icon: PhoneCall,
  },
  {
    id: 'route',
    title: 'Nearest verified crew is pinged',
    copy: 'Zone rules pick the closest available partner with the right skill badge, and the customer sees a real ETA rather than a vague promise.',
    stat: 'Median 15-minute callback',
    icon: Route,
  },
  {
    id: 'quote',
    title: 'Scope locks before work starts',
    copy: 'Photos and a written estimate go out on WhatsApp. Approvals are timestamped, so nobody argues about the number afterwards.',
    stat: 'Written estimate every time',
    icon: ClipboardCheck,
  },
  {
    id: 'close',
    title: 'Quality loop closes the job',
    copy: 'Happy jobs auto-request a rating; anything below four stars routes to a QA lead with the photo log already attached.',
    stat: '30-day rework promise',
    icon: BadgeCheck,
  },
] as const;

export const PROOF_STATS = [
  {
    id: 'response',
    value: 15,
    suffix: ' min',
    label: 'Median callback',
    detail: 'From enquiry to a human voice on the line.',
    icon: Clock,
  },
  {
    id: 'conversion',
    value: 38,
    suffix: '%',
    label: 'Enquiry to booking',
    detail: 'Quote-first flow beats plain contact forms.',
    icon: BadgeIndianRupee,
  },
  {
    id: 'repeat',
    value: 46,
    suffix: '%',
    label: 'Repeat customers',
    detail: 'Care plans and WhatsApp follow-ups compound.',
    icon: BadgeCheck,
  },
  {
    id: 'zones',
    value: 8,
    suffix: '',
    label: 'Dispatch rings',
    detail: 'Named pockets with published ETA bands.',
    icon: MapPin,
  },
] as const;

export const OPERATOR_NOTES = [
  'Missed calls become SMS plus CRM rows automatically — no lead left hanging.',
  'Nearest verified partner is pinged first with a transparent ETA.',
  'Scope locks before work starts — no surprise line items later.',
  'Happy jobs auto-request ratings; unhappy ones route to a QA lead.',
  'Customers stay on WhatsApp — the chat they already trust.',
] as const;

export const PLANS: readonly Plan[] = [
  {
    id: 'visit',
    name: 'Visit pass',
    featured: false,
    visit: {
      price: '₹299',
      unit: 'per visit',
      period: 'Inspection and small fixes',
      bullets: [
        '30-minute diagnostic slot',
        'Waived if you book the job same day',
        'Parts quoted separately, billed as invoiced',
      ],
    },
    care: {
      price: '₹799',
      unit: 'per quarter',
      period: 'Three diagnostic visits',
      bullets: [
        'Three inspection slots per quarter',
        'Priority weekday routing',
        'Rollover of one unused visit',
      ],
    },
  },
  {
    id: 'crew',
    name: 'Half-day crew',
    featured: true,
    visit: {
      price: '₹1,899',
      unit: 'up to 4 hrs',
      period: 'One expert with tools',
      bullets: [
        'Ideal for painting prep or a deep-clean burst',
        'Tools included with debris bag-out',
        'Add an assistant for ₹799',
      ],
    },
    care: {
      price: '₹5,399',
      unit: 'per quarter',
      period: 'Three half-day crew slots',
      bullets: [
        'Three scheduled crew days per quarter',
        'Weekend slots at no extra charge',
        'Materials sourced at partner rates',
      ],
    },
  },
  {
    id: 'comfort',
    name: 'Comfort cover',
    featured: false,
    visit: {
      price: '₹4,499',
      unit: 'per quarter',
      period: 'AC and electrical scan',
      bullets: [
        'Two preventive visits per quarter',
        'Priority weekend routing',
        '10% off every add-on job',
      ],
    },
    care: {
      price: '₹15,999',
      unit: 'per year',
      period: 'Full-home preventive cover',
      bullets: [
        'Eight preventive visits across the year',
        'Emergency desk with 4-hour response',
        '15% off add-on jobs and parts',
      ],
    },
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 'priyanka',
    quote:
      'Quoted before they climbed the ladder — AC gas and PCB sorted the same evening. The invoice matched the WhatsApp estimate to the rupee.',
    name: 'Priyanka Das',
    role: 'Apartment owner · Bistupur',
    job: 'AC repair',
  },
  {
    id: 'arif',
    quote:
      'The deep clean crew brought their own gear and the deposit photos saved us landlord drama on move-out day.',
    name: 'Arif Khan',
    role: 'Tenant · Mango',
    job: 'Deep cleaning',
  },
  {
    id: 'vikash',
    quote:
      'Painting team masked the floors obsessively and the supervisor shared daily progress pictures without me chasing anyone.',
    name: 'Vikash Singh',
    role: 'Row house · Adityapur',
    job: 'Painting',
  },
] as const;

export const ZONES: readonly Zone[] = [
  { id: 'sakchi', name: 'Sakchi', eta: '20–30 min', crews: '9 crews on shift', x: 50, y: 12 },
  { id: 'bistupur', name: 'Bistupur', eta: '18–28 min', crews: '11 crews on shift', x: 80, y: 30 },
  { id: 'mango', name: 'Mango', eta: '25–40 min', crews: '7 crews on shift', x: 86, y: 66 },
  { id: 'kadma', name: 'Kadma', eta: '22–32 min', crews: '8 crews on shift', x: 58, y: 88 },
  { id: 'sonari', name: 'Sonari', eta: '24–36 min', crews: '6 crews on shift', x: 26, y: 84 },
  { id: 'adityapur', name: 'Adityapur', eta: '30–45 min', crews: '5 crews on shift', x: 10, y: 56 },
  { id: 'gamharia', name: 'Gamharia', eta: '35–50 min', crews: '4 crews on shift', x: 16, y: 24 },
  { id: 'highway', name: 'Highway SOS', eta: '45–70 min', crews: '2 rapid vans', x: 50, y: 50 },
] as const;

export const BOOKING_ASSURANCES = [
  { id: 'b1', label: 'Written estimate on WhatsApp before any work begins.', icon: ClipboardCheck },
  { id: 'b2', label: 'Verified crew profile shared with the ETA, not after.', icon: ShieldCheck },
  { id: 'b3', label: 'One ticket ID tracks the job from quote to closure.', icon: Blocks },
  { id: 'b4', label: 'Rate the visit and unhappy jobs escalate automatically.', icon: Star },
] as const;

export const URGENCY_OPTIONS = [
  { id: 'today', label: 'Today', hint: 'Emergency desk' },
  { id: 'tomorrow', label: 'Tomorrow', hint: 'Standard slot' },
  { id: 'weekend', label: 'This weekend', hint: 'Crew day' },
  { id: 'flexible', label: 'Flexible', hint: 'Best price' },
] as const;
