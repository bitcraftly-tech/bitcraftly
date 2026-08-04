'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { WORK_PROJECTS } from './work.content';
import { WorkCaseStudyDetails } from './WorkCaseStudyDetails';
import { WorkClientResults } from './WorkClientResults';
import { WorkFeaturedCaseStudy } from './WorkFeaturedCaseStudy';
import { WorkFinalCta } from './WorkFinalCta';
import { WorkGrid } from './WorkGrid';
import { WorkHero } from './WorkHero';
import { WorkTechStack } from './WorkTechStack';
import type { WorkFilterId, WorkProject } from './types';
import './work-page.css';

function matchesQuery(project: WorkProject, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    project.name,
    project.overview,
    project.industry,
    project.projectType,
    ...project.technology,
    ...(project.searchTags ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export interface WorkPageProps {
  readonly className?: string;
  readonly initialFilter?: WorkFilterId;
}

export function WorkPage({ className, initialFilter = 'all' }: WorkPageProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>(initialFilter);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const featuredProject = useMemo(
    () => WORK_PROJECTS.find((project) => project.featured) ?? WORK_PROJECTS[0]!,
    [],
  );

  const [activeId, setActiveId] = useState(featuredProject.id);

  const filteredProjects = useMemo(() => {
    return WORK_PROJECTS.filter((project) => {
      const matchesFilter = activeFilter === 'all' || project.industry === activeFilter;
      return matchesFilter && matchesQuery(project, deferredQuery);
    });
  }, [activeFilter, deferredQuery]);

  const activeProject = useMemo(() => {
    const fromFiltered = filteredProjects.find((project) => project.id === activeId);
    if (fromFiltered) {
      return fromFiltered;
    }

    return filteredProjects[0] ?? featuredProject;
  }, [activeId, featuredProject, filteredProjects]);

  const selectProject = (id: string) => {
    setActiveId(id);

    if (typeof window !== 'undefined') {
      const details = document.getElementById('work-details');
      if (details) {
        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleFilterChange = (filter: WorkFilterId) => {
    setActiveFilter(filter);
  };

  return (
    <div className={['work-page', className].filter(Boolean).join(' ')}>
      <WorkHero
        query={query}
        activeFilter={activeFilter}
        onQueryChange={setQuery}
        onFilterChange={handleFilterChange}
      />
      <WorkFeaturedCaseStudy
        project={featuredProject}
        onViewDetails={() => selectProject(featuredProject.id)}
      />
      <WorkGrid
        projects={filteredProjects}
        activeId={activeProject.id}
        onSelect={selectProject}
      />
      <WorkCaseStudyDetails project={activeProject} />
      <WorkTechStack />
      <WorkClientResults />
      <WorkFinalCta />
    </div>
  );
}
