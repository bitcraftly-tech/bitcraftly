export type DemoBootBrand = {
  readonly name: string;
  readonly monogram: string;
  readonly accent: string;
  readonly background: string;
  /** Optional showcase logo shown instead of monogram letters. */
  readonly logo?: string;
};

const FALLBACK_BRAND: DemoBootBrand = {
  name: 'Interactive Demo',
  monogram: 'ID',
  accent: '#0f766e',
  background: '#f0fdfa',
};

/** Longest-prefix wins so nested interactive-demos paths resolve correctly. */
const DEMO_BOOT_BRANDS: ReadonlyArray<readonly [string, DemoBootBrand]> = [
  [
    '/portfolio/toy-showcase',
    {
      name: 'PlayNest',
      monogram: 'PN',
      accent: '#5a31f4',
      background: '#f7f5ff',
      logo: '/portfolio/toy-showcase/brand/playnest-logo.png',
    },
  ],
  [
    '/portfolio/ecommerce-store-showcase',
    { name: 'Ecommerce Store', monogram: 'ES', accent: '#0d9488', background: '#e8f4f1' },
  ],
  [
    '/portfolio/school-website-showcase',
    {
      name: 'Elevate International School',
      monogram: 'EI',
      accent: '#e8a317',
      background: '#0f2744',
    },
  ],
  [
    '/portfolio/gym-fitness-showcase',
    { name: 'FitRally', monogram: 'FR', accent: '#ff327a', background: '#14080e' },
  ],
  [
    '/portfolio/dayal-builders-showcase',
    { name: 'Dayal Builders', monogram: 'DB', accent: '#c8a46b', background: '#0b1633' },
  ],
  [
    '/portfolio/rpytech-training-showcase',
    { name: 'RPY Tech', monogram: 'RP', accent: '#e85c0d', background: '#1a2a4a' },
  ],
  [
    '/interactive-demos/portfolio/rpytech-training-showcase',
    { name: 'RPY Tech', monogram: 'RP', accent: '#e85c0d', background: '#1a2a4a' },
  ],
  [
    '/portfolio/builder-real-estate-showcase',
    { name: 'Orion Crest Estates', monogram: 'OC', accent: '#7c3aed', background: '#0f172a' },
  ],
  [
    '/portfolio/clinic-healthcare-showcase',
    { name: 'Clinic & Healthcare', monogram: 'CH', accent: '#0f766e', background: '#f0fdfa' },
  ],
  [
    '/portfolio/society-management-showcase',
    { name: 'Harmony Heights', monogram: 'HH', accent: '#7c3aed', background: '#f5f3ff' },
  ],
  [
    '/portfolio/restaurant-website-showcase',
    { name: 'Ember & Vine', monogram: 'EV', accent: '#ea580c', background: '#1c1917' },
  ],
  [
    '/portfolio/restaurant-ai-chatbot-showcase',
    { name: 'Zaika Kitchen', monogram: 'ZK', accent: '#7c3aed', background: '#1e1b4b' },
  ],
  [
    '/portfolio/local-services-leads-showcase',
    { name: 'SnapFix Crew', monogram: 'SF', accent: '#059669', background: '#ecfdf5' },
  ],
  [
    '/portfolio/claycraft-crockery-showcase',
    { name: 'Crockery Wala', monogram: 'CW', accent: '#a67c52', background: '#f8f5f0' },
  ],
  [
    '/portfolio/react-video-demo',
    { name: 'Neon Meridian', monogram: 'NM', accent: '#7c3aed', background: '#0f172a' },
  ],
];

export function resolveDemoBootBrand(pathname: string): DemoBootBrand {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  let best: DemoBootBrand | null = null;
  let bestLen = -1;

  for (const [path, brand] of DEMO_BOOT_BRANDS) {
    if (normalized === path || normalized.startsWith(`${path}/`)) {
      if (path.length > bestLen) {
        best = brand;
        bestLen = path.length;
      }
    }
  }

  return best ?? FALLBACK_BRAND;
}

export { FALLBACK_BRAND };
