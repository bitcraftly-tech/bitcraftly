import type { ReactNode } from "react";

import EcommerceShowcaseLayout from "@/app/portfolio/ecommerce-store-showcase/EcommerceShowcaseLayout";
import GymShowcaseLayout from "@/app/portfolio/gym-fitness-showcase/GymShowcaseLayout";
import SchoolShowcaseLayout from "@/app/portfolio/school-website-showcase/SchoolShowcaseLayout";
import { ShowcaseScopedThemeProvider } from "@/components/providers/ShowcaseScopedThemeProvider";
import { getPortfolioShowcaseTheme, type ShowcaseThemeId } from "@/lib/portfolioShowcaseThemes";

import PortfolioShowcaseFooter from "./PortfolioShowcaseFooter";
import PortfolioShowcaseNavbar from "./PortfolioShowcaseNavbar";

type Props = {
  themeId: ShowcaseThemeId;
  children: ReactNode;
};

/** Full-page client website mock — light theme, branded header/footer per vertical */
export default function PortfolioShowcaseLayout({ themeId, children }: Props) {
  if (themeId === "ecommerce") {
    return <EcommerceShowcaseLayout>{children}</EcommerceShowcaseLayout>;
  }

  if (themeId === "gym") {
    return <GymShowcaseLayout>{children}</GymShowcaseLayout>;
  }

  if (themeId === "school") {
    return <SchoolShowcaseLayout>{children}</SchoolShowcaseLayout>;
  }

  const theme = getPortfolioShowcaseTheme(themeId);

  return (
    <ShowcaseScopedThemeProvider showcaseId={themeId} className={theme.shell}>
      <PortfolioShowcaseNavbar theme={theme} />
      <main className={theme.mainBg}>{children}</main>
      <PortfolioShowcaseFooter theme={theme} />
    </ShowcaseScopedThemeProvider>
  );
}
