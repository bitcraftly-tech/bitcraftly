import { BarChart3, CheckCircle2, Circle, ExternalLink } from "lucide-react";

import { GA4_MEASUREMENT_ID, GSC_VERIFICATION, isGa4Configured, isGscConfigured } from "@/lib/analytics";
import { PRODUCTION_URL } from "@/lib/appEnv";

const TRACKED_EVENTS = [
  { name: "page_view", when: "Every route change on the marketing site" },
  { name: "whatsapp_click", when: "Any WhatsApp / wa.me link click (source via data-wa-source)" },
  { name: "contact_form_start", when: "First focus inside the contact enquiry form" },
  { name: "generate_lead", when: "Successful contact form submission (GA4 recommended event)" },
  { name: "contact_form_submit", when: "Duplicate lead signal with page mode, service, and source" },
] as const;

function StatusRow({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  const Icon = ok ? CheckCircle2 : Circle;
  return (
    <li className="flex gap-3 rounded-lg border border-border-primary bg-bg-secondary/40 px-4 py-3 dark:border-dark-border-primary dark:bg-dark-bg-secondary/30">
      <Icon className={`mt-0.5 size-4 shrink-0 ${ok ? "text-green-600" : "text-text-tertiary dark:text-dark-text-tertiary"}`} aria-hidden />
      <div>
        <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{detail}</p>
      </div>
    </li>
  );
}

export default function AnalyticsSetupHub() {
  const ga4Ready = isGa4Configured();
  const gscReady = isGscConfigured();
  const ga4Masked = ga4Ready ? `${GA4_MEASUREMENT_ID.slice(0, 2)}…${GA4_MEASUREMENT_ID.slice(-4)}` : "Not set";

  return (
    <div className="mt-8 space-y-8">
      <section className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-50/60 to-bg-card p-6 dark:from-indigo-950/20 dark:to-dark-bg-card">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 size-5 text-indigo-600 dark:text-indigo-400" aria-hidden />
          <div>
            <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Analytics collection is live in code</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Visitors and leads are sent to Google Analytics 4 once{" "}
              <code className="rounded bg-bg-secondary px-1 py-0.5 text-xs dark:bg-dark-bg-secondary">NEXT_PUBLIC_GA4_MEASUREMENT_ID</code> is set on
              production. Use GA4 and Search Console for reporting until the custom in-app dashboard is built.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">Setup checklist</h3>
        <ul className="mt-4 space-y-3">
          <StatusRow
            ok={ga4Ready}
            label="GA4 measurement ID"
            detail={
              ga4Ready
                ? `Configured (${ga4Masked}). Events flow on ${PRODUCTION_URL} only — not on staging.`
                : "Add NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXX to Vercel production env, then redeploy."
            }
          />
          <StatusRow
            ok={gscReady}
            label="Google Search Console verification"
            detail={
              gscReady
                ? "HTML tag verification meta is injected from NEXT_PUBLIC_GSC_VERIFICATION."
                : "In Search Console → HTML tag → copy the content value into NEXT_PUBLIC_GSC_VERIFICATION, redeploy, then click Verify."
            }
          />
          <StatusRow
            ok={ga4Ready}
            label="Link GA4 property to Search Console"
            detail="In GA4 Admin → Product links → Search Console → link bitcraftly.com property (manual step in Google UI)."
          />
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Open Google tools</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Google Analytics 4 <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Google Search Console <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={`${PRODUCTION_URL}/sitemap.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Sitemap for GSC <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </article>

        <article className="rounded-lg border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Events tracked on site</h3>
          <ul className="mt-4 space-y-3">
            {TRACKED_EVENTS.map((event) => (
              <li key={event.name} className="border-b border-border-primary pb-3 last:border-0 last:pb-0 dark:border-dark-border-primary">
                <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">{event.name}</p>
                <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{event.when}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
        Custom in-app charts (leads vs visitors, WhatsApp vs form) will use GA4 Data API or your backend lead store — this page is the setup hub until that ships.
      </p>
    </div>
  );
}
