import Image from 'next/image';
import { Icon } from '@/components/ui/icon';
import type { WorkProject } from './types';

interface WorkProjectCardProps {
  readonly project: WorkProject;
  readonly active: boolean;
  readonly onSelect: () => void;
}

export function WorkProjectCard({ project, active, onSelect }: WorkProjectCardProps) {
  return (
    <article
      className={['wp-card', active ? 'is-active' : ''].filter(Boolean).join(' ')}
      aria-labelledby={`${project.id}-card-title`}
    >
      <div className="wp-card__media">
        <p className="wp-card__industry">{project.industry}</p>
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="wp-card__img"
        />
      </div>

      <div className="wp-card__body">
        <h3 id={`${project.id}-card-title`} className="wp-card__title">
          {project.name}
        </h3>

        <div className="wp-card__meta">
          <div>
            <p className="wp-card__label">Technology</p>
            <ul className="wp-card__tech" aria-label={`${project.name} technology`}>
              {project.technology.slice(0, 4).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="wp-card__label">Project type</p>
            <p className="wp-card__value">{project.projectType}</p>
          </div>
          <div>
            <p className="wp-card__label">Timeline</p>
            <p className="wp-card__value">{project.timeline}</p>
          </div>
        </div>

        <button
          type="button"
          className="wp-card__cta"
          aria-pressed={active}
          aria-controls="work-details-panel"
          onClick={onSelect}
        >
          {project.cta.label}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </button>
      </div>
    </article>
  );
}
