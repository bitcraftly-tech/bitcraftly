import type { CaseStudyDetailsContent } from './types';

interface CaseStudyDetailsProps {
  readonly id: string;
  readonly open: boolean;
  readonly details: CaseStudyDetailsContent;
}

export function CaseStudyDetails({ id, open, details }: CaseStudyDetailsProps) {
  return (
    <div
      id={id}
      className="cs-details"
      data-open={open ? 'true' : 'false'}
      aria-hidden={!open}
      {...(!open ? { inert: true } : {})}
    >
      <div className="cs-details__inner">
        <div className="cs-details__content">
          <div className="cs-details__block cs-details__block--wide">
            <h4>Problem</h4>
            <p>{details.problem}</p>
          </div>

          <div className="cs-details__block cs-details__block--wide">
            <h4>Solution</h4>
            <p>{details.solution}</p>
          </div>

          <div className="cs-details__block">
            <h4>Technology</h4>
            <p>{details.technology}</p>
          </div>

          <div className="cs-details__block">
            <h4>Architecture</h4>
            <p>{details.architecture}</p>
          </div>

          <div className="cs-details__block">
            <h4>Features</h4>
            <ul className="cs-details__list">
              {details.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="cs-details__block">
            <h4>Timeline</h4>
            <p>{details.timeline}</p>
          </div>

          <div className="cs-details__block">
            <h4>Challenges</h4>
            <ul className="cs-details__list">
              {details.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className="cs-details__block cs-details__block--wide">
            <h4>Results</h4>
            <p>{details.results}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
