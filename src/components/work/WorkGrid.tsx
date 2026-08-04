import { Section } from '@/components/ui/section';
import { WORK_GRID_META } from './work.content';
import { WorkProjectCard } from './WorkProjectCard';
import type { WorkProject } from './types';

interface WorkGridProps {
  readonly projects: readonly WorkProject[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}

export function WorkGrid({ projects, activeId, onSelect }: WorkGridProps) {
  return (
    <Section
      id="work-grid"
      spacing="lg"
      aria-labelledby="work-grid-heading"
      className="wp-section--muted"
    >
      <header className="wp-section-head">
        <p className="wp-section-eyebrow">{WORK_GRID_META.eyebrow}</p>
        <h2 id="work-grid-heading" className="wp-section-title">
          {WORK_GRID_META.title}
        </h2>
        <p className="wp-section-desc">{WORK_GRID_META.description}</p>
      </header>

      {projects.length === 0 ? (
        <p className="wp-empty" role="status">
          {WORK_GRID_META.empty}
        </p>
      ) : (
        <div className="wp-grid">
          {projects.map((project) => (
            <WorkProjectCard
              key={project.id}
              project={project}
              active={activeId === project.id}
              onSelect={() => onSelect(project.id)}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
