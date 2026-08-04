import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { WORK_DETAILS_META } from './work.content';
import type { WorkProject } from './types';

interface WorkCaseStudyDetailsProps {
  readonly project: WorkProject;
}

export function WorkCaseStudyDetails({ project }: WorkCaseStudyDetailsProps) {
  const { details } = project;

  return (
    <Section
      id="work-details"
      spacing="lg"
      aria-labelledby="work-details-heading"
      className="wp-details"
    >
      <header className="wp-section-head">
        <p className="wp-section-eyebrow">{WORK_DETAILS_META.eyebrow}</p>
        <h2 id="work-details-heading" className="wp-section-title">
          {WORK_DETAILS_META.titlePrefix}: {project.name}
        </h2>
      </header>

      <div id="work-details-panel" className="wp-details__panel" aria-live="polite">
        <h3 className="wp-details__title">{project.businessImpact}</h3>

        <div className="wp-details__grid">
          <div className="wp-details__block wp-details__block--wide">
            <h4>Problem</h4>
            <p>{details.problem}</p>
          </div>

          <div className="wp-details__block wp-details__block--wide">
            <h4>Solution</h4>
            <p>{details.solution}</p>
          </div>

          <div className="wp-details__block">
            <h4>Architecture</h4>
            <p>{details.architecture}</p>
          </div>

          <div className="wp-details__block">
            <h4>Timeline</h4>
            <p>{details.timeline}</p>
          </div>

          <div className="wp-details__block">
            <h4>Features</h4>
            <ul className="wp-details__list">
              {details.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="wp-details__block">
            <h4>Challenges</h4>
            <ul className="wp-details__list">
              {details.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className="wp-details__block">
            <h4>Tech stack</h4>
            <ul className="wp-details__chips">
              {details.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          <div className="wp-details__block">
            <h4>Outcome</h4>
            <p>{details.outcome}</p>
          </div>

          {details.screenshots.length > 0 ? (
            <div className="wp-details__block wp-details__block--wide">
              <h4>Screenshots</h4>
              <div className="wp-details__shots">
                {details.screenshots.map((shot) => (
                  <div key={shot.src} className="wp-details__shot">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, 50vw"
                      className="wp-details__shot-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
