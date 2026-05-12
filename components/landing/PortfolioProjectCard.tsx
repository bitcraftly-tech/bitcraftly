import type { PortfolioItem, PortfolioMockup } from "@/lib/portfolioItems";

type PortfolioProjectCardProps = {
  item: PortfolioItem;
  /** Extra bottom copy on full portfolio page */
  showDetails?: boolean;
};

function MockupInterior({ variant }: { variant: PortfolioMockup }) {
  switch (variant) {
    case "restaurant":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center justify-between gap-2 border-b border-border-primary/40 pb-1.5 dark:border-dark-border-primary/40">
            <span className="h-4 w-12 rounded bg-orange-500/35" />
            <span className="flex gap-1">
              <span className="h-3 w-8 rounded bg-border-secondary/80 dark:bg-dark-border-secondary/80" />
              <span className="h-3 w-10 rounded bg-border-secondary/60 dark:bg-dark-border-secondary/60" />
            </span>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-orange-500/25 to-amber-500/15 px-2 py-2">
            <div className="h-2 w-2/3 rounded bg-bg-secondary/90 dark:bg-dark-bg-secondary/90" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded bg-bg-secondary/70 dark:bg-dark-bg-secondary/70" />
          </div>
          <div className="space-y-1.5">
            {["Chef's specials", "Family thali", "Weekend brunch"].map((label, i) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="truncate text-text-secondary dark:text-dark-text-secondary">{label}</span>
                <span className="shrink-0 rounded bg-bg-secondary/90 px-1 text-[9px] text-text-tertiary dark:bg-dark-bg-secondary/90 dark:text-dark-text-tertiary">
                  ₹{480 + i * 120}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case "school":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center justify-between rounded-md bg-blue-600/85 px-2 py-1.5 text-white">
            <span className="font-semibold tracking-tight">Green Valley School</span>
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px]">Menu</span>
          </div>
          <div className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1.5 text-blue-900 dark:text-blue-100">
            <span className="font-semibold">Admissions open · 2026–27</span>
            <div className="mt-1 h-1 w-full rounded bg-blue-500/20" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="rounded border border-border-primary/50 bg-bg-secondary/80 p-1.5 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/80">
              <p className="text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Notices</p>
              <div className="mt-1 space-y-1">
                <div className="h-1 rounded bg-border-secondary dark:bg-dark-border-secondary" />
                <div className="h-1 w-4/5 rounded bg-border-secondary/80 dark:bg-dark-border-secondary/80" />
              </div>
            </div>
            <div className="rounded border border-border-primary/50 bg-bg-secondary/80 p-1.5 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/80">
              <p className="text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Parents</p>
              <div className="mt-2 space-y-1">
                <div className="h-3 rounded bg-indigo-500/25" />
                <div className="h-3 rounded bg-indigo-500/15" />
              </div>
            </div>
          </div>
        </div>
      );
    case "gym":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-r from-rose-600/90 to-fuchsia-700/80 px-2 py-1.5 text-white">
            <span className="font-semibold">Iron City Fitness</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px]">Join</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="col-span-2 rounded border border-border-primary/50 bg-bg-secondary/90 p-1.5 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90">
              <p className="text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Today&apos;s classes</p>
              <div className="mt-1.5 space-y-1">
                <div className="flex justify-between text-[9px] text-text-secondary dark:text-dark-text-secondary">
                  <span>HIIT</span>
                  <span>6:30 AM</span>
                </div>
                <div className="flex justify-between text-[9px] text-text-secondary dark:text-dark-text-secondary">
                  <span>Strength</span>
                  <span>7:30 PM</span>
                </div>
              </div>
            </div>
            <div className="rounded border border-rose-500/30 bg-rose-500/10 p-1.5 text-center">
              <p className="text-[9px] font-semibold text-rose-700 dark:text-rose-200">Trial</p>
              <p className="mt-1 text-[10px] font-bold text-text-primary dark:text-dark-text-primary">₹99</p>
            </div>
          </div>
          <div className="mt-auto flex gap-1">
            <span className="h-6 flex-1 rounded bg-border-secondary/70 dark:bg-dark-border-secondary/70" />
            <span className="h-6 flex-1 rounded bg-border-secondary/50 dark:bg-dark-border-secondary/50" />
            <span className="h-6 flex-1 rounded bg-border-secondary/70 dark:bg-dark-border-secondary/70" />
          </div>
        </div>
      );
    case "ecommerce":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center gap-1.5 rounded-full border border-border-primary/50 bg-bg-secondary/90 px-2 py-1 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90">
            <span className="h-2 w-2 rounded-full bg-violet-500/60" />
            <span className="h-1.5 flex-1 rounded bg-border-secondary dark:bg-dark-border-secondary" />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { tone: "from-violet-500/30 to-purple-500/15", price: "₹899" },
              { tone: "from-fuchsia-500/25 to-pink-500/15", price: "₹1,299" },
              { tone: "from-indigo-500/25 to-blue-500/15", price: "₹649" },
              { tone: "from-emerald-500/25 to-teal-500/15", price: "₹499" },
            ].map((cell, i) => (
              <div
                key={i}
                className={`rounded-md border border-border-primary/40 bg-gradient-to-br ${cell.tone} p-1.5 dark:border-dark-border-primary/40`}
              >
                <div className="aspect-[4/3] rounded bg-bg-card/80 dark:bg-dark-bg-card/80" />
                <div className="mt-1 flex items-center justify-between text-[9px]">
                  <span className="h-1 w-10 rounded bg-border-secondary/90 dark:bg-dark-border-secondary/90" />
                  <span className="font-semibold text-text-primary dark:text-dark-text-primary">{cell.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "chatbot":
      return (
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 text-[9px]">
          <div className="rounded-2xl rounded-bl-md border border-border-primary/50 bg-bg-secondary/90 px-2 py-1.5 text-text-secondary dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90 dark:text-dark-text-secondary">
            Hi — today&apos;s chef&apos;s special kya hai?
          </div>
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-indigo-600/90 px-2 py-1.5 text-white">
            Today we have tandoor platter &amp; weekend thali. Want timings?
          </div>
          <div className="rounded-2xl rounded-bl-md border border-border-primary/50 bg-bg-secondary/90 px-2 py-1.5 text-text-secondary dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90 dark:text-dark-text-secondary">
            Haan, WhatsApp pe menu bhej do.
          </div>
        </div>
      );
    case "clinic":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center justify-between rounded-md bg-teal-600/85 px-2 py-1.5 text-white">
            <span className="font-semibold">CareFirst Clinic</span>
            <span className="rounded bg-white/20 px-1.5 text-[9px]">Book</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded border border-border-primary/50 bg-bg-secondary/90 p-1.5 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90">
              <div className="mx-auto h-10 w-10 rounded-full bg-teal-500/25" />
              <p className="mt-1 text-center text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Dr. Mehta</p>
              <p className="text-center text-[8px] text-text-tertiary dark:text-dark-text-tertiary">Physician</p>
            </div>
            <div className="rounded border border-border-primary/50 bg-bg-secondary/90 p-1.5 dark:border-dark-border-primary/50 dark:bg-dark-bg-secondary/90">
              <div className="mx-auto h-10 w-10 rounded-full bg-cyan-500/25" />
              <p className="mt-1 text-center text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Dr. Khan</p>
              <p className="text-center text-[8px] text-text-tertiary dark:text-dark-text-tertiary">Pediatrics</p>
            </div>
          </div>
          <div className="mt-auto rounded-md border border-dashed border-teal-500/35 bg-teal-500/10 px-2 py-1.5 text-center text-[9px] font-medium text-teal-900 dark:text-teal-100">
            Request appointment · typical reply same day
          </div>
        </div>
      );
    case "local":
      return (
        <div className="flex min-h-0 flex-1 flex-col gap-2 text-[10px] leading-tight">
          <div className="flex items-center gap-2 rounded-md bg-amber-500/15 px-2 py-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/30 text-[11px]" aria-hidden>
              📍
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-text-primary dark:text-dark-text-primary">Sakchi · Jamshedpur</p>
              <p className="text-[9px] text-text-tertiary dark:text-dark-text-tertiary">On-site visit · same-week slots</p>
            </div>
          </div>
          <div className="space-y-1">
            {["Free inspection", "Written estimate", "WhatsApp updates"].map((line) => (
              <div key={line} className="flex items-center gap-1.5 text-[9px] text-text-secondary dark:text-dark-text-secondary">
                <span className="text-emerald-500">✔</span>
                {line}
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-md bg-bg-secondary/90 px-2 py-2 text-center dark:bg-dark-bg-secondary/90">
            <span className="text-[9px] font-semibold text-text-primary dark:text-dark-text-primary">Call or WhatsApp — we respond fast</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
          <div className="h-2 w-3/5 rounded bg-border-secondary dark:bg-dark-border-secondary" />
          <div className="h-2 w-4/5 rounded bg-border-secondary/80 dark:bg-dark-border-secondary/80" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-14 rounded border border-border-primary/70 bg-bg-secondary/80 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/80" />
            <div className="h-14 rounded border border-border-primary/70 bg-bg-secondary/80 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/80" />
          </div>
        </div>
      );
  }
}

export default function PortfolioProjectCard({ item, showDetails }: PortfolioProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} p-4`}>
        <div className="absolute inset-0 rounded-t-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="relative flex h-full min-h-0 flex-col rounded-xl border border-border-primary/60 bg-bg-card/90 p-3 shadow-sm backdrop-blur-sm dark:border-dark-border-primary/60 dark:bg-dark-bg-card/90">
          <div className="flex items-center gap-1.5 border-b border-border-primary/50 pb-2 dark:border-dark-border-primary/50">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-auto text-[10px] text-text-tertiary dark:text-dark-text-tertiary">preview</span>
          </div>
          <MockupInterior variant={item.mockup} />
          <div className="mt-3 flex items-center justify-between text-lg" aria-hidden>
            <span>{item.emoji}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border-primary p-4 dark:border-dark-border-primary">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
          <span className="rounded-full border border-border-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary dark:border-dark-border-secondary dark:text-dark-text-tertiary">
            {item.tag}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{item.hint}</p>
        {showDetails && item.details ? (
          <p className="mt-2 text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{item.details}</p>
        ) : null}
      </div>
    </article>
  );
}
