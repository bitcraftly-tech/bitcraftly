import type { PortfolioItem, CaseStudyHeadlineMetric } from '@/lib/portfolioItems';
import type { PortfolioProject } from '@/lib/portfolio/projectUtils';

const FOCUS_CATEGORY: Record<string, string> = {
  'React.js': 'React.js Projects',
  'Next.js': 'Next.js Projects',
  'AI-powered': 'AI Solutions',
  'Business website': 'Websites',
  'Dashboard / admin': 'Dashboards',
  'Startup frontend': 'Startup MVPs',
};

export function caseStudyCategoryLabel(project: PortfolioItem): string {
  return project.caseStudy.categoryLabel ?? FOCUS_CATEGORY[project.projectFocus] ?? 'Websites';
}

export function caseStudyOverview(project: PortfolioProject): string {
  const cs = project.caseStudy;
  return cs.overview ?? project.details ?? project.cardLine;
}

export function caseStudyClient(project: PortfolioProject): string {
  return project.caseStudy.client ?? 'Bitcraftly client (scoped after discovery)';
}

export function caseStudyTimeline(project: PortfolioProject): string {
  return project.caseStudy.timeline ?? '4–6 Weeks';
}

export function caseStudyServices(project: PortfolioProject): string[] {
  if (project.caseStudy.services?.length) return project.caseStudy.services;
  const base: string[] = [project.projectFocus];
  if (project.techStack.some((t) => /whatsapp/i.test(t))) base.push('WhatsApp Integration');
  if (project.projectFocus === 'AI-powered') base.unshift('AI Development');
  return [...new Set(base)].slice(0, 3);
}

export function caseStudyHeadlineMetrics(project: PortfolioProject): CaseStudyHeadlineMetric[] {
  if (project.caseStudy.headlineMetrics?.length) return project.caseStudy.headlineMetrics;
  const perf = project.caseStudy.performance;
  if (perf?.length) {
    return perf.slice(0, 3).map((m, i) => ({
      value: m.value,
      label: m.label,
      icon: (['zap', 'trending', 'users'] as const)[i] ?? 'target',
    }));
  }
  return [
    { value: 'Mobile', label: 'First UX', icon: 'zap' },
    { value: 'WhatsApp', label: 'Lead ready', icon: 'trending' },
    { value: 'SEO', label: 'Structured', icon: 'users' },
  ];
}

export function caseStudyKeyFeatures(project: PortfolioProject): string[] {
  return project.keyFeatures ?? project.featureBullets ?? project.caseStudy.results;
}
