export type Tenant = {
  id: number;
  name: string;
  subdomain: string;
  created_at: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  const response = await fetch(`${API_BASE_URL}/api/tenant/${encodeURIComponent(subdomain)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as Tenant;
}
