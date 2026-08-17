import { expect, type ConsoleMessage, type Page } from '@playwright/test';

/** Known benign Next.js / browser noise that should not fail E2E. */
const IGNORED_CONSOLE_PATTERNS: readonly RegExp[] = [
  /Download the React DevTools/i,
  /\[Fast Refresh\]/i,
  /third-party cookie/i,
];

export type MarketingPageSpec = {
  name: string;
  path: string;
  /** Substring or regex matched against the visible h1 */
  heading: string | RegExp;
  /** Accessible name pattern for at least one primary CTA in the hero */
  cta: string | RegExp;
};

export const MARKETING_PAGES: readonly MarketingPageSpec[] = [
  {
    name: 'Home',
    path: '/',
    heading: /Complete\s*Digital\s*Systems\s*for\s*Your\s*Industry/i,
    cta: /Explore Industry Systems|Book (a )?Strategy Call/i,
  },
  {
    name: 'Services',
    path: '/services',
    heading: /./,
    cta: /Book Free Consultation|View Our Work|Explore Services/i,
  },
  {
    name: 'Solutions',
    path: '/solutions',
    heading: /./,
    cta: /Book Free Consultation|Explore Services|Schedule Discovery/i,
  },
  {
    name: 'Industries',
    path: '/industries',
    heading: /./,
    cta: /Get Free Consultation|Browse industries/i,
  },
  {
    name: 'Work',
    path: '/work',
    heading: /./,
    cta: /View Work|Start Your Project|Book Free Consultation/i,
  },
  {
    name: 'Contact',
    path: '/contact',
    heading: /Talk to the Bitcraftly team/i,
    cta: /Jump to form|WhatsApp|Get Free Consultation|Book a Call/i,
  },
] as const;

/**
 * Attach a console-error collector. Call `assertNoConsoleErrors` after assertions.
 */
export function trackConsoleErrors(page: Page): {
  assertNoConsoleErrors: () => void;
} {
  const errors: string[] = [];

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text))) {
      return;
    }
    errors.push(text);
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return {
    assertNoConsoleErrors: () => {
      expect.soft(errors, `Unexpected console/page errors:\n${errors.join('\n')}`).toEqual([]);
    },
  };
}

export async function expectMarketingPage(page: Page, spec: MarketingPageSpec): Promise<void> {
  const { assertNoConsoleErrors } = trackConsoleErrors(page);

  const response = await page.goto(spec.path, {
    waitUntil: 'domcontentloaded',
  });
  expect(response, `${spec.name} should respond`).not.toBeNull();
  expect(response!.status(), `${spec.name} should not return a server error`).toBeLessThan(400);

  await expect(page.locator('main#main-content')).toBeVisible();

  const heading = page.locator('main h1').first();
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(spec.heading);

  const cta = page.locator('main a, main button').filter({ hasText: spec.cta }).first();
  await expect(cta).toBeVisible();

  // Primary nav landmarks should remain available on marketing layouts.
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(
    page
      .getByRole('navigation', { name: /main navigation/i })
      .or(page.getByRole('button', { name: /navigation menu/i })),
  ).toBeVisible();

  assertNoConsoleErrors();
}
