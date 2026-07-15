import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { WORK_TECH_COPY, WORK_TECH_GROUPS } from "./work.content";
import "./work.css";

const WorkTechArchitectureVisual = dynamic(
  () =>
    import("./WorkTechArchitectureVisual").then(
      (mod) => mod.WorkTechArchitectureVisual,
    ),
  {
    ssr: true,
    loading: () => (
      <div
        className="work-tech__architecture work-tech__architecture--skeleton"
        aria-hidden
      />
    ),
  },
);

/**
 * Technology Expertise — stack groups + architecture visual (Sprint 5G).
 */
export function WorkTechSection() {
  return (
    <Section
      id="work-technology"
      spacing="lg"
      background="surface"
      aria-labelledby="work-tech-heading"
      className="work-tech border-b border-border/40"
    >
      <header className="work-tech__intro">
        <p className="work-tech__eyebrow">{WORK_TECH_COPY.eyebrow}</p>
        <h2 id="work-tech-heading" className="work-tech__title">
          {WORK_TECH_COPY.heading}
        </h2>
        <p className="work-tech__description">{WORK_TECH_COPY.description}</p>
      </header>

      <div className="work-tech__layout">
        <ul className="work-tech__groups" aria-label="Technology groups">
          {WORK_TECH_GROUPS.map((group) => (
            <li key={group.id}>
              <article
                className={cn(
                  "work-tech__card",
                  "work-tech__glass",
                  `work-tech__card--${group.tone}`,
                )}
              >
                <div className="work-tech__card-head">
                  <span className="work-tech__icon" aria-hidden>
                    <Icon
                      name={group.icon}
                      size="sm"
                      className="h-[20px] w-[20px]"
                    />
                  </span>
                  <h3 className="work-tech__card-title">{group.category}</h3>
                </div>
                <ul className="work-tech__chips" aria-label={`${group.category} technologies`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <aside
          className="work-tech__visual"
          aria-label={WORK_TECH_COPY.architectureLabel}
        >
          <WorkTechArchitectureVisual />
        </aside>
      </div>
    </Section>
  );
}
