import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { getWorkProjectHref } from "./work.content";
import type { WorkProject } from "./work.types";

export type WorkProjectCardSize = "large" | "medium" | "compact";

interface WorkProjectCardProps {
  project: WorkProject;
  size?: WorkProjectCardSize;
  className?: string;
}

function caseStudyHref(project: WorkProject): string {
  if (project.caseStudySlug) {
    return `${ROUTES.workCaseStudies}/${project.caseStudySlug}`;
  }
  return getWorkProjectHref(project.slug);
}

/**
 * Portfolio catalog card — matches bitcraftly.com/portfolio rhythm:
 * image → title → summary → tags → Case Study + Live Demo.
 */
export function WorkProjectCard({
  project,
  className,
}: WorkProjectCardProps) {
  const isFuture = project.status === "future";
  const caseHref = isFuture
    ? NAV_ACTIONS.freeConsultation.href
    : caseStudyHref(project);
  const liveHref = project.liveUrl ?? caseHref;
  const liveExternal = Boolean(project.liveExternal);
  const coverAlt =
    project.coverImageAlt ?? `${project.title} product screenshot`;
  const badge = project.badge ?? (isFuture ? "Future project" : project.industry);

  return (
    <article
      className={cn(
        "work-pf-card",
        `work-pf-card--${project.accent}`,
        isFuture && "work-pf-card--future",
        className,
      )}
    >
      <div className="work-pf-card__media">
        <div className="work-pf-card__media-visual">
          <Image
            src={project.coverImage}
            alt={coverAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
        <div className="work-pf-card__media-overlay" aria-hidden />
        <div className="work-pf-card__media-badges">
          <span className="work-pf-card__chip">{project.industry}</span>
          <span className="work-pf-card__chip work-pf-card__chip--accent">
            {badge}
          </span>
        </div>
      </div>

      <h3 className="work-pf-card__title">{project.title}</h3>
      <p className="work-pf-card__summary">{project.summary}</p>

      <ul className="work-pf-card__tech" aria-label="Technologies used">
        {project.techStack.slice(0, 5).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="work-pf-card__actions">
        <Link href={caseHref} className="work-pf-card__btn work-pf-card__btn--primary">
          {isFuture ? "Discuss build" : "Case Study"}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
        {!isFuture ? (
          <Link
            href={liveHref}
            target={liveExternal ? "_blank" : undefined}
            rel={liveExternal ? "noopener noreferrer" : undefined}
            className="work-pf-card__btn work-pf-card__btn--outline"
          >
            Live Demo
            <Icon
              name="arrow-up-right"
              size="sm"
              aria-hidden
              className="h-[13px] w-[13px]"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
