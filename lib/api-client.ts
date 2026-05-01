import axios, { AxiosHeaders } from "axios";
import { getSession } from "next-auth/react";

import { readTenantSlugFromCookie } from "@/hooks/useTenant";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const slug = readTenantSlugFromCookie();
  const session = await getSession();
  const headers =
    config.headers instanceof AxiosHeaders ? config.headers : AxiosHeaders.from(config.headers ?? {});

  if (slug) {
    headers.set("x-tenant-subdomain", slug);
  }
  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }
  config.headers = headers;
  return config;
});

