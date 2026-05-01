import axios from "axios";
import { getSession } from "next-auth/react";

import { readTenantSlugFromCookie } from "@/hooks/useTenant";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const slug = readTenantSlugFromCookie();
  const session = await getSession();
  if (slug) {
    config.headers = config.headers ?? {};
    config.headers["x-tenant-subdomain"] = slug;
  }
  if (session?.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

