import Link from "next/link";

import { IS_STAGING, PRODUCTION_URL } from "@/lib/appEnv";

export default function StagingEnvironmentBanner() {
  if (!IS_STAGING) return null;

  return (
    <div
      className="sticky top-0 z-[100] border-b border-amber-500/40 bg-amber-400 px-3 py-2 text-center text-xs font-semibold text-amber-950 sm:text-sm"
      role="status"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span>Staging environment — not production</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <Link href={PRODUCTION_URL} className="underline underline-offset-2 hover:text-amber-900">
          Go to live site
        </Link>
      </span>
    </div>
  );
}
