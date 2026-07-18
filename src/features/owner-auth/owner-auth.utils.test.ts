import { describe, expect, it } from "vitest";
import {
  isOwnerLoginPath,
  isOwnerProtectedPath,
  resolveOwnerNextPath,
} from "@/features/owner-auth/owner-auth.utils";

describe("owner auth utils", () => {
  it("resolves safe next paths", () => {
    expect(resolveOwnerNextPath(undefined)).toBe("/owner/leads");
    expect(resolveOwnerNextPath("/owner/leads?q=ada")).toBe("/owner/leads?q=ada");
    expect(resolveOwnerNextPath("/marketing")).toBe("/owner/leads");
    expect(resolveOwnerNextPath("/owner/login")).toBe("/owner/leads");
  });

  it("identifies login and protected owner paths", () => {
    expect(isOwnerLoginPath("/owner/login")).toBe(true);
    expect(isOwnerProtectedPath("/owner/login")).toBe(false);
    expect(isOwnerProtectedPath("/owner/leads")).toBe(true);
  });
});
