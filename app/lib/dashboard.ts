import { headers } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type Lead = {
  id: number;
  tenant_id: string;
  name: string;
  phone: string;
  business_type: string;
  message: string;
  created_at: string;
};

export type QRContact = {
  id: number;
  tenant_id: number;
  code: string;
  destination_phone: string;
};

export type Template = {
  id: number;
  tenant_id: number;
  type: string;
  content: string;
  created_at: string;
};

async function tenantHeaders(): Promise<HeadersInit> {
  const requestHeaders = await headers();
  const tenantSubdomain = requestHeaders.get("x-tenant-subdomain");
  if (!tenantSubdomain) {
    return {};
  }
  return { "x-tenant-subdomain": tenantSubdomain };
}

export async function fetchLeads(): Promise<Lead[]> {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    headers: await tenantHeaders(),
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as Lead[];
}

export async function fetchQrContacts(): Promise<QRContact[]> {
  const response = await fetch(`${API_BASE_URL}/api/qr`, {
    headers: await tenantHeaders(),
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as QRContact[];
}

export async function fetchTemplates(): Promise<Template[]> {
  const response = await fetch(`${API_BASE_URL}/api/templates`, {
    headers: await tenantHeaders(),
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as Template[];
}
