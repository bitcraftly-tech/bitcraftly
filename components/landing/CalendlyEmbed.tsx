import Link from "next/link";

import MarketingSectionLink from "@/components/landing/MarketingSectionLink";
import { whatsappUrl } from "@/lib/constants";
import { CALENDLY_URL } from "@/lib/leadGen";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

type CalendlyEmbedProps = {
  className?: string;
};

/** Renders Calendly inline when `NEXT_PUBLIC_CALENDLY_URL` is set */
export default function CalendlyEmbed({ className = "" }: CalendlyEmbedProps) {
  if (!CALENDLY_URL) {
    return (
      <div
        className={`w-full rounded-xl border border-border-primary bg-bg-card px-5 py-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-6 sm:py-7 ${className}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Prefer to pick a time slot?</p>
            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Book a free 15-minute consultation — or message on WhatsApp for the fastest reply.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a
              href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#25D366] px-4 text-xs font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              WhatsApp — Book slot
            </a>
            <MarketingSectionLink
              path="/contact"
              sectionId="contact-form"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border-primary bg-bg-secondary px-4 text-xs font-semibold text-text-primary transition hover:border-accent-primary/40 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
            >
              Use form instead
            </MarketingSectionLink>
          </div>
        </div>
        <p className="mt-4 border-t border-border-primary/60 pt-3 text-[10px] text-text-tertiary dark:border-dark-border-primary/60 dark:text-dark-text-tertiary">
          Team: add <code className="text-[10px]">NEXT_PUBLIC_CALENDLY_URL</code> in env to show live calendar embed here.
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
