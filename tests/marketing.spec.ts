import { expect, test } from "@playwright/test";
import {
  expectMarketingPage,
  MARKETING_PAGES,
} from "./helpers/marketing";

/**
 * Marketing smoke suite — desktop + mobile projects from playwright.config.ts
 * cover both viewports without duplicating specs.
 */
for (const pageSpec of MARKETING_PAGES) {
  test.describe(`${pageSpec.name} page`, () => {
    test(`loads with hero, CTA, and no console errors (${pageSpec.path})`, async ({
      page,
    }) => {
      await expectMarketingPage(page, pageSpec);
    });
  });
}

test.describe("Primary navigation", () => {
  test("header mega-menu reaches key marketing routes", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chromium",
      "Desktop header links are collapsed behind the mobile menu",
    );

    await page.goto("/");

    const destinations = [
      {
        trigger: "Services",
        explore: "Explore all services",
        path: /\/services\/?$/,
      },
      {
        trigger: "Solutions",
        explore: "Explore all solutions",
        path: /\/solutions\/?$/,
      },
      {
        trigger: "Industries",
        explore: "Explore all industries",
        path: /\/industries\/?$/,
      },
      {
        trigger: "Work",
        explore: "View all work",
        path: /\/work\/?$/,
      },
    ] as const;

    for (const dest of destinations) {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: /main navigation/i });
      await nav.getByRole("button", { name: dest.trigger }).click();
      await page
        .getByRole("link", { name: dest.explore, exact: true })
        .first()
        .click();
      await expect(page).toHaveURL(dest.path);
      await expect(page.locator("main h1").first()).toBeVisible();
    }
  });
});
