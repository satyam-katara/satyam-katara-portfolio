"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrapper so `ssr: false` dynamic import of the heavy
 * Recharts-based showcase is legal (page.tsx is a Server Component).
 */
const AnalyticsShowcaseInner = dynamic(
  () =>
    import("./AnalyticsShowcase").then((m) => m.AnalyticsShowcase),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto max-w-[1200px] px-5 py-24 md:px-8"
        aria-hidden="true"
      >
        <div className="glass h-[480px] animate-pulse rounded-2xl" />
      </div>
    ),
  },
);

export function AnalyticsShowcaseLazy() {
  return <AnalyticsShowcaseInner />;
}
