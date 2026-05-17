"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy `/portfolio#school-website` → `/school-website` */
export default function PortfolioHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw || !/^[a-z0-9-]+$/.test(raw)) return;
    router.replace(`/${raw}`);
  }, [router]);

  return null;
}
