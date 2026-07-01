"use client";

import { useEffect } from "react";

import { bindMobileVisualViewportSync } from "@/lib/mobileVisualViewport";

/** Keeps mobile fixed bottom bars pinned to the visible screen on iOS. */
export default function MobileVisualViewportSync() {
  useEffect(() => bindMobileVisualViewportSync(), []);
  return null;
}
