import { CALENDLY_URL } from "@/lib/leadGen";

type CalendlyEmbedProps = {
  className?: string;
};

/** Renders Calendly inline when `NEXT_PUBLIC_CALENDLY_URL` is set */
export default function CalendlyEmbed({ className = "" }: CalendlyEmbedProps) {
  if (!CALENDLY_URL) {
    return (
      <div
        className={`rounded-xl border border-dashed border-border-primary bg-bg-secondary/30 px-4 py-6 text-center dark:border-dark-border-primary dark:bg-dark-bg-secondary/20 ${className}`}
      >
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Prefer to pick a time slot?</p>
        <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Add your Calendly link in <code className="text-[11px]">NEXT_PUBLIC_CALENDLY_URL</code> — embed appears here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-border-primary dark:border-dark-border-primary ${className}`}>
      <iframe
        title="Book a consultation with Bitcraftly"
        src={CALENDLY_URL}
        className="h-[520px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
