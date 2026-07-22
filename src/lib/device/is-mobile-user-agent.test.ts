import { describe, expect, it } from "vitest";
import { isMobileUserAgentString } from "./is-mobile-user-agent";

describe("isMobileUserAgentString", () => {
  it("detects common mobile user agents", () => {
    expect(
      isMobileUserAgentString(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      ),
    ).toBe(true);
    expect(
      isMobileUserAgentString(
        "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36",
      ),
    ).toBe(true);
  });

  it("detects narrow viewport client hints", () => {
    expect(isMobileUserAgentString("Mozilla/5.0", "390")).toBe(true);
    expect(isMobileUserAgentString("Mozilla/5.0", "768")).toBe(false);
  });

  it("treats desktop user agents as non-mobile", () => {
    expect(
      isMobileUserAgentString(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
  });
});
