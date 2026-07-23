import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { WORK_WHATSAPP_HREF } from "./work-images";
import type { WorkProject } from "./work.types";

interface WorkFeaturedShowcaseProps {
  project: WorkProject;
}

/**
 * Future / featured project band — media + dense product panel.
 */
export function WorkFeaturedShowcase({ project }: WorkFeaturedShowcaseProps) {
  const isFuture = project.status === "future";
  const caseHref = isFuture
    ? NAV_ACTIONS.freeConsultation.href
    : `${ROUTES.workProjects}/${project.slug}`;
  const coverAlt =
    project.coverImageAlt ?? `${project.title} product screenshot`;
  const liveHref = project.liveUrl ?? WORK_WHATSAPP_HREF;
  const liveExternal = Boolean(project.liveExternal) || isFuture;

  return (
    <section
      className="work-pf-showcase"
      aria-labelledby="work-featured-showcase-heading"
    >
      <div className="work-pf-showcase__panel">
        <div className="work-pf-showcase__media">
          <Image
            src={project.coverImage}
            alt={coverAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover object-top"
          />
          <div className="work-pf-showcase__media-fade" aria-hidden />
          <span className="work-pf-showcase__media-badge">
            {isFuture ? "Future project" : "Featured project"}
          </span>
        </div>

        <div className="work-pf-showcase__body">
          <p className="work-pf-showcase__eyebrow">
            {isFuture ? "Coming soon" : project.industry}
            {project.duration ? ` · ${project.duration}` : null}
          </p>
          <h3
            id="work-featured-showcase-heading"
            className="work-pf-showcase__title"
          >
            {project.title}
          </h3>
          <p className="work-pf-showcase__text">{project.summary}</p>

          <ul className="work-pf-showcase__tech" aria-label="Technology stack">
            {project.techStack.slice(0, 5).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="work-pf-showcase__actions">
            <Link
              href={caseHref}
              className="work-pf-card__btn work-pf-card__btn--primary"
            >
              {isFuture ? "Discuss this build" : "View Case Study"}
              <Icon
                name="arrow-up-right"
                size="sm"
                aria-hidden
                className="h-[13px] w-[13px]"
              />
            </Link>
            <Link
              href={liveHref}
              {...(liveExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="work-pf-card__btn work-pf-card__btn--outline"
            >
              {isFuture ? "WhatsApp us" : "Live Demo"}
              <Icon
                name="arrow-up-right"
                size="sm"
                aria-hidden
                className="h-[13px] w-[13px]"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="work-pf-showcase__cta">
        <div className="work-pf-showcase__cta-copy">
          <p className="work-pf-showcase__cta-title">Have a project in mind?</p>
          <p className="work-pf-showcase__cta-text">
            Scope a build like SaaSPro — discovery first, then a clear delivery plan.
          </p>
        </div>
        <div className="work-pf-showcase__cta-actions">
          <Link
            href={NAV_ACTIONS.freeConsultation.href}
            className="work-pf-card__btn work-pf-card__btn--primary"
          >
            Start Your Project
          </Link>
          <Link
            href={WORK_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="work-pf-card__btn work-pf-card__btn--outline"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
