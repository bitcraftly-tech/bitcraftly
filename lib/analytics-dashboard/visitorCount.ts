import { fetchGa4AllTimeUsers } from "@/lib/analytics-dashboard/ga4";
import { getFirestoreVisitorCount } from "@/lib/analytics-dashboard/firebase";

export type VisitorCountSource = "firestore" | "ga4" | "combined" | "none";

export type SiteVisitorCountResult = {
  count: number | null;
  source: VisitorCountSource;
};

/**
 * Real visitor total for the public footer badge.
 * - Firestore: increments per unique browser session (first-party, near real-time)
 * - GA4: all-time totalUsers when Data API is configured (historical baseline)
 * Returns null when neither backend is configured (no demo placeholder).
 */
export async function getSiteVisitorCountResult(): Promise<SiteVisitorCountResult> {
  const [firestoreCount, ga4Count] = await Promise.all([
    getFirestoreVisitorCount(),
    fetchGa4AllTimeUsers(),
  ]);

  if (firestoreCount !== null && ga4Count !== null) {
    return {
      count: Math.max(firestoreCount, ga4Count),
      source: "combined",
    };
  }

  if (firestoreCount !== null) {
    return { count: firestoreCount, source: "firestore" };
  }

  if (ga4Count !== null) {
    return { count: ga4Count, source: "ga4" };
  }

  return { count: null, source: "none" };
}

export async function getSiteVisitorCount(): Promise<number | null> {
  const result = await getSiteVisitorCountResult();
  return result.count;
}
