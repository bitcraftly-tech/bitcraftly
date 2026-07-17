import { expect, test } from "@playwright/test";

test.describe("Admin panel architecture", () => {
  test("overview and module routes render", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chromium",
      "Admin shell smoke covered on desktop Chromium",
    );

    await page.goto("/admin");
    await expect(
      page.getByRole("heading", { level: 1, name: "Overview" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /admin sections/i }),
    ).toBeVisible();

    await page.goto("/admin/blog");
    await expect(
      page.getByRole("heading", { level: 1, name: "Blog" }),
    ).toBeVisible();

    await page.goto("/admin/settings");
    await expect(
      page.getByRole("heading", { level: 1, name: "Settings" }),
    ).toBeVisible();
  });
});
