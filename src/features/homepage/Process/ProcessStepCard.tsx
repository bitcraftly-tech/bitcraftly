import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import type { ProcessStep } from "./process.types";

interface ProcessStepCardProps {
  step: ProcessStep;
  className?: string;
  showConnector?: boolean;
}

export function ProcessStepCard({
  step,
  className,
  showConnector = false,
}: ProcessStepCardProps) {
  return (
    <div className={cn("process-step relative flex flex-col", className)}>
      <div className="relative inline-flex w-fit">
        <span className="process-step-icon inline-flex">
          <IconBox
            icon={step.icon}
            variant="default"
            size="md"
            className="process-icon-box"
          />
        </span>
        <span className="process-step-number" aria-hidden>
          {step.number}
        </span>
      </div>

      <h3 className="process-step-title">{step.title}</h3>
      <p className="process-step-description">{step.description}</p>

      {showConnector ? (
        <span className="process-step-connector" aria-hidden />
      ) : null}
    </div>
  );
}
