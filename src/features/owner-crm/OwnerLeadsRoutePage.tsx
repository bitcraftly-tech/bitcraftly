import { loadOwnerLeadsDashboard } from "./owner-leads.loader";
import { parseOwnerLeadsSearchParams } from "./owner-leads.utils";
import {
  OwnerLeadsDashboard,
  OwnerLeadsErrorState,
} from "./OwnerLeadsPage";

interface OwnerLeadsPageProps {
  readonly searchParams: Record<string, string | string[] | undefined>;
}

export async function OwnerLeadsPage({ searchParams }: OwnerLeadsPageProps) {
  const filters = parseOwnerLeadsSearchParams(searchParams);
  const result = await loadOwnerLeadsDashboard(filters);

  if (!result.ok) {
    return <OwnerLeadsErrorState message={result.message} />;
  }

  return <OwnerLeadsDashboard data={result} />;
}
