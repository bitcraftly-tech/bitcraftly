"use client";

import dynamic from "next/dynamic";

const AnalyticsListener = dynamic(() => import("@/components/analytics/AnalyticsListener"), {
  ssr: false,
});

export default function DeferredAnalyticsListener() {
  return <AnalyticsListener />;
}
