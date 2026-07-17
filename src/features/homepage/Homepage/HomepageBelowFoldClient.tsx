"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomepageBelowFold = dynamic(
  () =>
    import("./HomepageBelowFold").then((mod) => mod.HomepageBelowFold),
  {
    ssr: false,
    loading: () => <div className="homepage-btf-reserve" aria-hidden />,
  },
);

/**
 * ATF architecture: Hero SSR only on first HTML flush.
 * Below-ATF sections mount after idle (full client render) to cut
 * document size + style/layout work that delays LCP under Slow-4G.
 * FAQ JSON-LD remains on the server shell for SEO.
 */
export function HomepageBelowFoldClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;

    const boot = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(boot, { timeout: 600 });
    } else {
      timeoutId = window.setTimeout(boot, 1);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) {
    return <div className="homepage-btf-reserve" aria-hidden />;
  }

  return <HomepageBelowFold />;
}
