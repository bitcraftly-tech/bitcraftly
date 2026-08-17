import {
  FUTURE_PROJECTS,
  ONGOING_PROJECTS,
  PAST_PROJECTS,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

/**
 * Property-portal layer for the Dayal showcase.
 *
 * Pricing, carpet areas, possession dates and inventory counts are indicative
 * demo figures used to demonstrate the listing UI — never quote them as real.
 */
export const ESTATE_DISCLAIMER =
  'Prices, carpet areas, possession timelines and inventory shown here are indicative and for showcase purposes only. Share your requirement for the current price sheet.';

export type EstateStatus = 'Future' | 'Ongoing' | 'Completed';

export type EstateSpec = {
  readonly configs: readonly string[];
  /** Carpet area range in sq ft */
  readonly area: readonly [number, number];
  /** All-inclusive indicative price range in ₹ lakh */
  readonly price: readonly [number, number];
  readonly possession: string;
  readonly rera: string;
  readonly units: { readonly total: number; readonly available: number };
  readonly highlights: readonly string[];
};

export type EstateListing = {
  readonly id: string;
  readonly name: string;
  readonly status: EstateStatus;
  readonly location: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
} & EstateSpec;

const SPECS: Record<string, EstateSpec> = {
  'dayal-skyline': {
    configs: ['3 BHK', '4 BHK', 'Duplex'],
    area: [1180, 1960],
    price: [62, 108],
    possession: 'Dec 2028',
    rera: 'Registration in process',
    units: { total: 96, available: 96 },
    highlights: ['Panoramic deck', 'Sky lounge', 'Twin lifts'],
  },
  'char-sahib-zaade': {
    configs: ['2 BHK', '3 BHK'],
    area: [860, 1340],
    price: [38, 64],
    possession: 'Jun 2028',
    rera: 'Registration in process',
    units: { total: 72, available: 72 },
    highlights: ['Heritage facade', 'Temple courtyard', 'Landscaped podium'],
  },
  'teg-bahadur-block': {
    configs: ['2 BHK', '3 BHK'],
    area: [780, 1290],
    price: [34, 58],
    possession: 'Mar 2027',
    rera: 'On request',
    units: { total: 64, available: 21 },
    highlights: ['Community hall', 'Covered parking', 'Power backup'],
  },
  'dayal-vatika': {
    configs: ['2 BHK', '3 BHK', 'Plot'],
    area: [720, 1450],
    price: [29, 62],
    possession: 'Sep 2027',
    rera: 'On request',
    units: { total: 58, available: 17 },
    highlights: ['Garden courtyard', 'Jogging track', 'Kids play zone'],
  },
  'dayal-galaxy': {
    configs: ['3 BHK', 'Duplex', 'Shop'],
    area: [1120, 1780],
    price: [56, 94],
    possession: 'Dec 2026',
    rera: 'On request',
    units: { total: 48, available: 9 },
    highlights: ['Clubhouse', 'Retail frontage', 'CCTV security'],
  },
  'dayal-enclave': {
    configs: ['2 BHK', '3 BHK'],
    area: [740, 1210],
    price: [31, 54],
    possession: 'Jun 2027',
    rera: 'On request',
    units: { total: 40, available: 13 },
    highlights: ['Gated entry', 'Wide internal roads', 'Visitor parking'],
  },
  'dayal-tower': {
    configs: ['2 BHK', '3 BHK'],
    area: [810, 1260],
    price: [33, 57],
    possession: 'Handed over 2019',
    rera: 'Completed',
    units: { total: 44, available: 0 },
    highlights: ['Fully occupied', 'Lift & backup', 'Maintained facade'],
  },
  'dayal-residency': {
    configs: ['3 BHK', 'Duplex'],
    area: [1150, 1720],
    price: [52, 88],
    possession: 'Handed over 2016',
    rera: 'Completed',
    units: { total: 32, available: 0 },
    highlights: ['Serene locale', 'Private terraces', 'Resale ready'],
  },
};

function toListing(
  project: {
    readonly id: string;
    readonly name: string;
    readonly status: EstateStatus;
    readonly location: string;
    readonly tagline: string;
    readonly description: string;
    readonly image: string;
  },
  spec: EstateSpec,
): EstateListing {
  return { ...project, ...spec };
}

function buildGroup(
  projects: readonly {
    readonly id: string;
    readonly name: string;
    readonly status: EstateStatus;
    readonly location: string;
    readonly tagline: string;
    readonly description: string;
    readonly image: string;
  }[],
): readonly EstateListing[] {
  return projects.flatMap((project) => {
    const spec = SPECS[project.id];
    return spec ? [toListing(project, spec)] : [];
  });
}

export const ESTATE_FUTURE = buildGroup(FUTURE_PROJECTS);
export const ESTATE_ONGOING = buildGroup(ONGOING_PROJECTS);
export const ESTATE_COMPLETED = buildGroup(PAST_PROJECTS);

export type EstateGroup = {
  readonly id: string;
  readonly status: EstateStatus;
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly listings: readonly EstateListing[];
};

/** Anchor ids match the navbar / footer links and must stay stable. */
export const ESTATE_GROUPS: readonly EstateGroup[] = [
  {
    id: 'future-projects',
    status: 'Future',
    label: 'Launching soon',
    title: 'New launches',
    subtitle: 'Pre-launch inventory with early-buyer pricing and preferred floor choice.',
    listings: ESTATE_FUTURE,
  },
  {
    id: 'ongoing-projects',
    status: 'Ongoing',
    label: 'Under construction',
    title: 'Ready to book',
    subtitle: 'Active sites in Jamshedpur with construction-linked payment plans.',
    listings: ESTATE_ONGOING,
  },
  {
    id: 'past-projects',
    status: 'Completed',
    label: 'Delivered',
    title: 'Handed over',
    subtitle: 'Completed addresses that back every promise we make on a new site.',
    listings: ESTATE_COMPLETED,
  },
];

export const ESTATE_LISTINGS: readonly EstateListing[] = ESTATE_GROUPS.flatMap(
  (group) => group.listings,
);

export const CONFIG_OPTIONS = ['2 BHK', '3 BHK', '4 BHK', 'Duplex', 'Plot', 'Shop'] as const;

export type BudgetOption = {
  readonly id: string;
  readonly label: string;
  /** Inclusive ₹ lakh bounds */
  readonly min: number;
  readonly max: number;
};

export const BUDGET_OPTIONS: readonly BudgetOption[] = [
  { id: 'any', label: 'Any budget', min: 0, max: Number.POSITIVE_INFINITY },
  { id: 'under-40', label: 'Under ₹40 L', min: 0, max: 40 },
  { id: '40-60', label: '₹40 L – ₹60 L', min: 40, max: 60 },
  { id: '60-85', label: '₹60 L – ₹85 L', min: 60, max: 85 },
  { id: 'above-85', label: '₹85 L +', min: 85, max: Number.POSITIVE_INFINITY },
];

export const LOCALITY_OPTIONS = [
  'Any locality',
  'Kharbani',
  'Chhota Govindpur',
  'Parsudih',
  'Karandih',
  'Jamshedpur',
] as const;

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'area-desc';

export const SORT_OPTIONS: readonly { readonly id: SortOption; readonly label: string }[] = [
  { id: 'relevance', label: 'Recommended' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'area-desc', label: 'Largest carpet area' },
];

export type FloorPlan = {
  readonly id: string;
  readonly config: string;
  readonly project: string;
  readonly carpet: number;
  readonly builtUp: number;
  readonly price: number;
  readonly facing: string;
  readonly bath: number;
  readonly balcony: number;
  /** Schematic rooms on a 12 × 10 grid — column / row start and span */
  readonly rooms: readonly {
    readonly name: string;
    readonly col: number;
    readonly row: number;
    readonly colSpan: number;
    readonly rowSpan: number;
  }[];
};

export const FLOOR_PLANS: readonly FloorPlan[] = [
  {
    id: 'plan-2bhk',
    config: '2 BHK',
    project: 'Dayal Enclave',
    carpet: 780,
    builtUp: 985,
    price: 34,
    facing: 'East',
    bath: 2,
    balcony: 1,
    rooms: [
      { name: 'Living / Dining', col: 1, row: 1, colSpan: 7, rowSpan: 5 },
      { name: 'Kitchen', col: 8, row: 1, colSpan: 5, rowSpan: 3 },
      { name: 'Bath', col: 8, row: 4, colSpan: 5, rowSpan: 2 },
      { name: 'Master Bed', col: 1, row: 6, colSpan: 6, rowSpan: 5 },
      { name: 'Bedroom 2', col: 7, row: 6, colSpan: 4, rowSpan: 5 },
      { name: 'Balcony', col: 11, row: 6, colSpan: 2, rowSpan: 5 },
    ],
  },
  {
    id: 'plan-3bhk',
    config: '3 BHK',
    project: 'Dayal Galaxy',
    carpet: 1120,
    builtUp: 1385,
    price: 56,
    facing: 'North-East',
    bath: 3,
    balcony: 2,
    rooms: [
      { name: 'Living / Dining', col: 1, row: 1, colSpan: 6, rowSpan: 6 },
      { name: 'Kitchen', col: 7, row: 1, colSpan: 4, rowSpan: 3 },
      { name: 'Utility', col: 11, row: 1, colSpan: 2, rowSpan: 3 },
      { name: 'Bedroom 3', col: 7, row: 4, colSpan: 6, rowSpan: 3 },
      { name: 'Master Bed', col: 1, row: 7, colSpan: 5, rowSpan: 4 },
      { name: 'Bedroom 2', col: 6, row: 7, colSpan: 4, rowSpan: 4 },
      { name: 'Balcony', col: 10, row: 7, colSpan: 3, rowSpan: 4 },
    ],
  },
  {
    id: 'plan-duplex',
    config: 'Duplex',
    project: 'Dayal Skyline',
    carpet: 1780,
    builtUp: 2160,
    price: 94,
    facing: 'South-East',
    bath: 4,
    balcony: 3,
    rooms: [
      { name: 'Foyer', col: 1, row: 1, colSpan: 3, rowSpan: 3 },
      { name: 'Living', col: 4, row: 1, colSpan: 6, rowSpan: 5 },
      { name: 'Sky Deck', col: 10, row: 1, colSpan: 3, rowSpan: 5 },
      { name: 'Kitchen', col: 1, row: 4, colSpan: 3, rowSpan: 3 },
      { name: 'Dining', col: 4, row: 6, colSpan: 6, rowSpan: 2 },
      { name: 'Master Suite', col: 1, row: 7, colSpan: 5, rowSpan: 4 },
      { name: 'Bedroom 2', col: 6, row: 8, colSpan: 4, rowSpan: 3 },
      { name: 'Study', col: 10, row: 6, colSpan: 3, rowSpan: 5 },
    ],
  },
  {
    id: 'plan-plot',
    config: 'Plot',
    project: 'Dayal Vatika',
    carpet: 1450,
    builtUp: 1450,
    price: 29,
    facing: 'North',
    bath: 0,
    balcony: 0,
    rooms: [
      { name: 'Front Setback', col: 1, row: 1, colSpan: 12, rowSpan: 2 },
      { name: 'Buildable Envelope', col: 2, row: 3, colSpan: 10, rowSpan: 6 },
      { name: 'Rear Open', col: 1, row: 9, colSpan: 12, rowSpan: 2 },
    ],
  },
];

export type ConnectivityPoint = {
  readonly name: string;
  readonly distance: string;
  readonly minutes: number;
  readonly icon: 'train' | 'school' | 'hospital' | 'market' | 'highway' | 'city';
};

export const CONNECTIVITY: readonly ConnectivityPoint[] = [
  { name: 'Govindpur Railway Station', distance: '3.2 km', minutes: 9, icon: 'train' },
  { name: 'Schools & Colleges', distance: '1.6 km', minutes: 5, icon: 'school' },
  { name: 'Multi-speciality Hospital', distance: '2.4 km', minutes: 7, icon: 'hospital' },
  { name: 'Local Market', distance: '0.9 km', minutes: 3, icon: 'market' },
  { name: 'NH-33 Highway', distance: '2.1 km', minutes: 6, icon: 'highway' },
  { name: 'Bistupur City Centre', distance: '8.5 km', minutes: 22, icon: 'city' },
];

export type LocalityScore = {
  readonly label: string;
  /** 0 – 100 */
  readonly value: number;
};

export const LOCALITY_SCORES: readonly LocalityScore[] = [
  { label: 'Connectivity', value: 88 },
  { label: 'Daily needs', value: 82 },
  { label: 'Schools & healthcare', value: 76 },
  { label: 'Growth potential', value: 91 },
];

export const EMI_DEFAULTS = {
  price: 5600000,
  minPrice: 2000000,
  maxPrice: 15000000,
  priceStep: 100000,
  downPaymentPct: 20,
  rate: 8.6,
  minRate: 6,
  maxRate: 12,
  rateStep: 0.1,
  tenure: 20,
  minTenure: 5,
  maxTenure: 30,
} as const;

export const VISIT_SLOTS = ['10:00 AM', '12:00 PM', '3:00 PM', '5:30 PM'] as const;

export const VISIT_MODES = ['Site visit', 'Video walkthrough', 'Office meeting'] as const;

export function formatPriceRange(listing: EstateListing): string {
  const [from, to] = listing.price;
  return from === to ? `₹${from} L` : `₹${from} L – ₹${to} L`;
}

export function formatAreaRange(listing: EstateListing): string {
  const [from, to] = listing.area;
  return from === to ? `${from} sq ft` : `${from} – ${to} sq ft`;
}

export function formatRupees(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function formatLakh(value: number): string {
  const lakh = value / 100000;
  return lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh.toFixed(1)} L`;
}

/** Standard reducing-balance EMI */
export function calculateEmi(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * growth) / (growth - 1);
}
