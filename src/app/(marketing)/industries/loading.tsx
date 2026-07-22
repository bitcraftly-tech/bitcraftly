import "@/styles/route-loading.css";
import { MarketingRouteLoading } from "@/components/patterns/skeletons";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";

export default async function IndustriesLoading() {
  const compact = await isMobileUserAgent();

  return <MarketingRouteLoading variant="hub" compact={compact} />;
}
