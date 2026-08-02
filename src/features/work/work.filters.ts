import type { WorkProject } from './work.types';

export type WorkExplorerGroupId = 'industry' | 'service' | 'technology';

export interface WorkExplorerChip {
  id: string;
  label: string;
}

export interface WorkExplorerGroup {
  id: WorkExplorerGroupId;
  label: string;
  chips: readonly WorkExplorerChip[];
}

export interface WorkExplorerState {
  industries: readonly string[];
  services: readonly string[];
  technologies: readonly string[];
  /** Single chip filter (bitcraftly.com/portfolio style). */
  portfolioFilter: string;
  query: string;
}

export const EMPTY_WORK_EXPLORER_STATE: WorkExplorerState = {
  industries: [],
  services: [],
  technologies: [],
  portfolioFilter: 'all',
  query: '',
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function includesNormalized(haystack: string, needle: string): boolean {
  return normalize(haystack).includes(normalize(needle));
}

function projectHaystack(project: WorkProject): string {
  return [
    project.title,
    project.summary,
    project.industry,
    project.businessGoal,
    project.problem,
    project.solution,
    project.result,
    project.outcome,
    ...project.services,
    ...project.techStack,
    ...project.categories,
    ...project.filterIds,
  ]
    .join(' ')
    .toLowerCase();
}

/** Industry chip id → match helpers against project.industry / industrySlug. */
const INDUSTRY_ALIASES: Record<string, readonly string[]> = {
  healthcare: ['healthcare', 'care', 'clinic'],
  finance: ['finance', 'fintech', 'lending', 'banking'],
  retail: ['retail', 'commerce', 'ecommerce'],
  education: ['education', 'campus', 'learning'],
  manufacturing: ['manufacturing', 'plant', 'factory'],
  'real-estate': ['real estate', 'property', 'broker'],
  logistics: ['logistics', 'fleet', 'fulfillment'],
  hospitality: ['hospitality', 'hotel', 'stay', 'food', 'qsr', 'restaurant', 'kitchen'],
  travel: ['travel', 'ota'],
  government: ['government', 'civic', 'community', 'society'],
  startup: ['startup', 'seed', 'fitness', 'services'],
  saas: ['saas', 'multi-tenant'],
};

const SERVICE_ALIASES: Record<string, readonly string[]> = {
  'web-development': ['web development', 'website', 'web applications', 'web application'],
  'mobile-apps': ['mobile', 'mobile apps'],
  crm: ['crm'],
  erp: ['erp'],
  'ai-automation': ['ai', 'automation', 'openai'],
  'custom-software': ['custom software'],
  cloud: ['cloud', 'aws'],
  api: ['api', 'fastapi', 'node'],
  dashboard: ['dashboard', 'dashboards', 'ops'],
};

function matchesIndustry(project: WorkProject, industryId: string): boolean {
  const aliases = INDUSTRY_ALIASES[industryId] ?? [industryId.replace(/-/g, ' ')];
  const industry = normalize(project.industry);
  const slug = normalize(project.industrySlug ?? '');
  return aliases.some(
    (alias) =>
      industry.includes(normalize(alias)) ||
      slug.includes(normalize(alias)) ||
      project.filterIds.some((id) => normalize(String(id)).includes(normalize(alias))),
  );
}

function matchesService(project: WorkProject, serviceId: string): boolean {
  const aliases = SERVICE_ALIASES[serviceId] ?? [serviceId.replace(/-/g, ' ')];
  const services = project.services.map(normalize).join(' ');
  const categories = project.categories.join(' ');
  return aliases.some(
    (alias) =>
      services.includes(normalize(alias)) ||
      categories.includes(normalize(alias)) ||
      projectHaystack(project).includes(normalize(alias)),
  );
}

function matchesTechnology(project: WorkProject, technologyId: string): boolean {
  const label = technologyId.replace(/-/g, ' ');
  return project.techStack.some(
    (tech) =>
      normalize(tech) === normalize(label) ||
      includesNormalized(tech, label) ||
      includesNormalized(label, tech),
  );
}

export function hasActiveWorkExplorerFilters(state: WorkExplorerState): boolean {
  return (
    state.industries.length > 0 ||
    state.services.length > 0 ||
    state.technologies.length > 0 ||
    (state.portfolioFilter !== 'all' && state.portfolioFilter.length > 0) ||
    state.query.trim().length > 0
  );
}

export function matchesPortfolioFilter(project: WorkProject, filterId: string): boolean {
  if (!filterId || filterId === 'all') return true;
  const haystack = projectHaystack(project);
  const tech = project.techStack.map(normalize).join(' ');
  const industry = normalize(project.industry);

  switch (filterId) {
    case 'react':
      return tech.includes('react');
    case 'next':
      return tech.includes('next');
    case 'ai':
      return (
        tech.includes('openai') ||
        industry === 'ai' ||
        project.categories.includes('ai-automation') ||
        haystack.includes('ai ')
      );
    case 'websites':
      return (
        project.categories.includes('web-applications') ||
        haystack.includes('website') ||
        industry.includes('website')
      );
    case 'dashboards':
      return (
        project.categories.includes('dashboards') ||
        haystack.includes('dashboard') ||
        haystack.includes('saas')
      );
    case 'ecommerce':
      return industry.includes('ecommerce') || haystack.includes('ecommerce');
    default:
      return haystack.includes(normalize(filterId));
  }
}

export function matchesWorkExplorer(project: WorkProject, state: WorkExplorerState): boolean {
  if (!matchesPortfolioFilter(project, state.portfolioFilter)) {
    return false;
  }

  if (state.industries.length > 0 && !state.industries.some((id) => matchesIndustry(project, id))) {
    return false;
  }

  if (state.services.length > 0 && !state.services.some((id) => matchesService(project, id))) {
    return false;
  }

  if (
    state.technologies.length > 0 &&
    !state.technologies.some((id) => matchesTechnology(project, id))
  ) {
    return false;
  }

  const query = state.query.trim().toLowerCase();
  if (query && !projectHaystack(project).includes(query)) {
    return false;
  }

  return true;
}

export function filterProjectsByExplorer(
  projects: readonly WorkProject[],
  state: WorkExplorerState,
): readonly WorkProject[] {
  return projects.filter((project) => matchesWorkExplorer(project, state));
}

/** Legacy single-filter helper (hubs / featured). */
export function matchesWorkFilter(project: WorkProject, filter: string): boolean {
  if (filter === 'all') return true;
  if (filter === 'featured') return Boolean(project.featured);
  if (project.filterIds.includes(filter as never)) return true;
  return project.categories.includes(filter as never);
}

export function filterWorkProjects(
  projects: readonly WorkProject[],
  filter: string,
): readonly WorkProject[] {
  return projects.filter((project) => matchesWorkFilter(project, filter));
}

export function toggleChipValue(values: readonly string[], chipId: string): readonly string[] {
  return values.includes(chipId) ? values.filter((value) => value !== chipId) : [...values, chipId];
}
