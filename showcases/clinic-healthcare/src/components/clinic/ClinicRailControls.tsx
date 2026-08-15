import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  label: string;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

/** Prev/next pair shared by the doctor and testimonial carousels. */
export default function ClinicRailControls({
  label,
  atStart,
  atEnd,
  onPrev,
  onNext,
  className = '',
}: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`.trim()}>
      <button
        type="button"
        className="cl-rail-btn"
        onClick={onPrev}
        disabled={atStart}
        aria-label={`Previous ${label}`}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        className="cl-rail-btn"
        onClick={onNext}
        disabled={atEnd}
        aria-label={`Next ${label}`}
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
