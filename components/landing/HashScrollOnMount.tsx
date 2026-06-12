"use client";

import { useEffect } from "react";

export default function HashScrollOnMount() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const element = document.getElementById(hash);
    if (!element) return;

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return null;
}
