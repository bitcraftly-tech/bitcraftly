import { expect, test } from "@playwright/test";

const MOBILE_WIDTHS = [320, 360, 375, 390, 412, 430, 640, 767] as const;

test.describe("Mobile header layout", () => {
  for (const width of MOBILE_WIDTHS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await page.waitForSelector("#header");

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          docScrollWidth: doc.scrollWidth,
          docClientWidth: doc.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          bodyClientWidth: document.body.clientWidth,
        };
      });

      expect(overflow.docScrollWidth).toBeLessThanOrEqual(overflow.docClientWidth + 1);
      expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.bodyClientWidth + 1);

      const layout = await page.evaluate(() => {
        const header = document.getElementById("header");
        const container = header?.querySelector(".mx-auto");
        const logo = header?.querySelector('a[href="/"]');
        const hero = document.getElementById("hero");
        const heroContainer = hero?.querySelector(".mx-auto");
        const hamburger = header?.querySelector(
          'button[aria-controls="header-mobile-menu"]',
        );

        if (!header || !container || !logo) {
          return null;
        }

        const containerStyle = getComputedStyle(container);
        const containerRect = container.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        const heroContainerRect = heroContainer?.getBoundingClientRect();
        const hamburgerRect = hamburger?.getBoundingClientRect();

        return {
          headerHeight: header.getBoundingClientRect().height,
          paddingLeft: Number.parseFloat(containerStyle.paddingLeft),
          paddingRight: Number.parseFloat(containerStyle.paddingRight),
          logoLeft: logoRect.left,
          containerRight: containerRect.right,
          headerScrollWidth: header.scrollWidth,
          headerClientWidth: header.clientWidth,
          heroContentLeft: heroContainerRect?.left ?? null,
          heroPaddingLeft: heroContainer
            ? Number.parseFloat(getComputedStyle(heroContainer).paddingLeft)
            : null,
          hamburgerRight: hamburgerRect?.right ?? null,
        };
      });

      expect(layout).not.toBeNull();
      if (!layout) {
        return;
      }

      expect(layout.headerHeight).toBeGreaterThanOrEqual(64);
      expect(layout.headerHeight).toBeLessThanOrEqual(72);
      expect(layout.headerScrollWidth).toBeLessThanOrEqual(
        layout.headerClientWidth + 1,
      );

      const expectedPadding = width >= 640 ? 20 : 16;
      expect(layout.paddingLeft).toBeGreaterThanOrEqual(expectedPadding - 1);
      expect(layout.paddingRight).toBeGreaterThanOrEqual(expectedPadding - 1);
      expect(layout.logoLeft).toBeGreaterThanOrEqual(expectedPadding - 1);

      if (layout.hamburgerRight !== null) {
        expect(width - layout.hamburgerRight).toBeGreaterThanOrEqual(
          expectedPadding - 1,
        );
      }

      if (layout.heroPaddingLeft !== null) {
        expect(Math.abs(layout.paddingLeft - layout.heroPaddingLeft)).toBeLessThan(
          2,
        );
      }

      const brandName = await page.locator('#header a[href="/"] span.whitespace-nowrap').textContent();
      expect(brandName?.trim()).toBe("Bitcraftly");

      const bookCallInBar = page
        .locator("#header .mx-auto")
        .first()
        .getByRole("link", { name: "Book a Call" });
      await expect(bookCallInBar).toBeHidden();

      const menuButton = page.locator(
        'button[aria-controls="header-mobile-menu"]',
      );
      await expect(menuButton).toBeEnabled();
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#header-mobile-menu")).toBeVisible();

      const menuPanel = page.locator("#header-mobile-menu");
      await expect(
        menuPanel.getByRole("link", { name: "Get Free Consultation" }),
      ).toBeVisible();
      await expect(
        menuPanel.getByRole("link", { name: "Book a Call" }),
      ).toBeVisible();

      const hamburgerBeforeClose = await menuButton.boundingBox();
      await menuButton.click();
      await page.waitForSelector("#header-mobile-menu", { state: "hidden" });
      const hamburgerAfterClose = await menuButton.boundingBox();

      if (hamburgerBeforeClose && hamburgerAfterClose) {
        expect(
          Math.abs(hamburgerBeforeClose.x - hamburgerAfterClose.x),
        ).toBeLessThan(2);
        expect(
          Math.abs(hamburgerBeforeClose.y - hamburgerAfterClose.y),
        ).toBeLessThan(2);
      }

      await page.screenshot({
        path: `test-results/mobile-header-${width}.png`,
        fullPage: false,
        clip: { x: 0, y: 0, width, height: 80 },
      });
    });
  }
});
