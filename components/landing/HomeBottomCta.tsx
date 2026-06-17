import PortfolioShowcaseCta from "@/components/portfolio/showcase/PortfolioShowcaseCta";
import { CONTAINER } from "@/lib/constants";

export default function HomeBottomCta() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 border-t border-[#e8ecef] bg-[#fafbfc] py-8 md:py-10`}>
      <PortfolioShowcaseCta source="home-bottom" />
    </section>
  );
}
