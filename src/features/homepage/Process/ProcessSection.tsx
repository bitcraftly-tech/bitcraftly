import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ProcessIntroCta } from "./ProcessIntroCta";
import { ProcessReveal } from "./ProcessReveal";
import { ProcessSideCta } from "./ProcessSideCta";
import { ProcessStepCard } from "./ProcessStepCard";
import {
  PROCESS_DESCRIPTION,
  PROCESS_HEADING,
  PROCESS_HEADING_ID,
  PROCESS_LABEL,
  PROCESS_SECTION_ID,
  PROCESS_SIDE_CTA,
  PROCESS_STEPS,
} from "./process.constants";
import "./process.css";

export function ProcessSection() {
  return (
    <section
      id={PROCESS_SECTION_ID}
      aria-labelledby={PROCESS_HEADING_ID}
      className="scroll-mt-[80px] bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <ProcessReveal className="mx-auto max-w-[640px] text-center">
          <p
            className={cn(
              "process-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {PROCESS_LABEL}
          </p>

          <h2
            id={PROCESS_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
              "md:whitespace-nowrap",
            )}
          >
            {PROCESS_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[520px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {PROCESS_DESCRIPTION}
          </p>

          <div className="mt-[var(--space-4)] flex justify-center">
            <ProcessIntroCta />
          </div>
        </ProcessReveal>

        <ol
          className={cn(
            "m-0 mt-[var(--space-6)] flex list-none flex-col gap-[28px] p-0",
            "sm:flex-row sm:flex-wrap sm:gap-x-[20px] sm:gap-y-[28px]",
            "lg:flex-nowrap lg:items-start lg:justify-between lg:gap-[16px]",
          )}
        >
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.id}
              className={cn(
                "min-w-0 sm:w-[calc(50%-10px)] lg:w-auto lg:flex-1",
              )}
            >
              <ProcessReveal delayMs={index * 70} className="h-full">
                <ProcessStepCard
                  step={step}
                  showConnector={index < PROCESS_STEPS.length - 1}
                />
              </ProcessReveal>
            </li>
          ))}
        </ol>

        <ProcessReveal delayMs={200} className="mt-[var(--space-6)] w-full">
          <ProcessSideCta content={PROCESS_SIDE_CTA} />
        </ProcessReveal>
      </Container>
    </section>
  );
}
