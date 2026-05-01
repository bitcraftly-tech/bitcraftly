"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export type Tenant = {
  id: number;
  name: string;
  subdomain: string;
  business_phone?: string | null;
  created_at: string;
};

type UseTenantState = {
  tenant: Tenant | null;
  slug: string | null;
  isLoading: boolean;
  error: string | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export function readTenantSlugFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith("tenant_slug="))
    ?.split("=")[1];
  return value ? decodeURIComponent(value).trim().toLowerCase() : null;
}

export function useTenant(): UseTenantState {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tenantSlug = readTenantSlugFromCookie();
    setSlug(tenantSlug);

    if (!tenantSlug) {
      setTenant(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadTenant() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<Tenant>(
          `${API_BASE_URL}/api/tenant/${encodeURIComponent(tenantSlug)}`,
          { signal: controller.signal },
        );
        setTenant(response.data);
      } catch (requestError) {
        if (axios.isAxiosError(requestError) && requestError.code === "ERR_CANCELED") {
          return;
        }
        setTenant(null);
        setError("Invalid tenant");
      } finally {
        setIsLoading(false);
      }
    }

    void loadTenant();

    return () => controller.abort();
  }, []);

  return { tenant, slug, isLoading, error };
}
