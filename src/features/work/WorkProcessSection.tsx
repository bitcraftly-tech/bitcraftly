import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import {
  WORK_PROCESS,
  WORK_PROCESS_COPY,
  WORK_PROCESS_TRUST,
} from "./work.content";
import "./work.css";

/**
 * Delivery Process — discovery → launch timeline + trust band (Sprint 5H).
 */
export function WorkProcessSection() {
  return (
    <Section
      id="work-delivery-process"
      spacing="lg"
      aria-labelledby="work-process-heading"
      className="work-process border-b border-border/40"
    >
      <header className="work-process__intro">
        <p className="work-process__eyebrow">{WORK_PROCESS_COPY.eyebrow}</p>
        <h2 id="work-process-heading" className="work-process__title">
          {WORK_PROCESS_COPY.heading}
        </h2>
        <p className="work-process__description">
          {WORK_PROCESS_COPY.description}
        </p>
      </header>

      <ol
        className="work-process__timeline"
        aria-label={WORK_PROCESS_COPY.timelineLabel}
      >
        {WORK_PROCESS.map((step, index) => {
          const isLast = index === WORK_PROCESS.length - 1;

          return (
            <li
              key={step.id}
              className={cn(
                "work-process__step",
                `work-process__step--${step.tone}`,
              )}
            >
              <div className="work-process__rail" aria-hidden>
                <span className="work-process__number">{step.step}</span>
                {!isLast ? <span className="work-process__connector" /> : null}
              </div>

              <article className="work-process__card work-process__glass">
                <div className="work-process__card-top">
                  <span className="work-process__icon" aria-hidden>
                    <Icon
                      name={step.icon}
                      size="sm"
                      className="h-[20px] w-[20px]"
                    />
                  </span>
                  <span
                    className="work-process__done"
                    aria-label="Step complete in engagement model"
                  >
                    <Icon
                      name="check"
                      size="sm"
                      aria-hidden
                      className="h-[14px] w-[14px]"
                    />
                  </span>
                </div>

                <h3 className="work-process__step-title">{step.title}</h3>
                <p className="work-process__step-description">
                  {step.description}
                </p>

                <ul className="work-process__items">
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>

      <ul
        className="work-process__trust"
        aria-label={WORK_PROCESS_COPY.trustLabel}
      >
        {WORK_PROCESS_TRUST.map((item) => (
          <li key={item.id} className="work-process__trust-item work-process__glass">
            <span className="work-process__trust-icon" aria-hidden>
              <Icon
                name={item.icon}
                size="sm"
                className="h-[20px] w-[20px]"
              />
            </span>
            <span className="work-process__trust-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
