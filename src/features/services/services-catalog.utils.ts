import type { ServiceCardModel } from "./services.types";

export function buildServiceSearchIndex(card: ServiceCardModel): string {
  return [
    card.title,
    card.description,
    card.slug,
    card.bestFor ?? "",
    ...(card.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export function cardMatchesQuery(
  card: ServiceCardModel,
  query: string,
): boolean {
  if (!query) return true;
  return buildServiceSearchIndex(card).includes(query);
}

export function cardMatchesFilter(
  card: ServiceCardModel,
  filter: string | null,
): boolean {
  if (!filter) return true;
  const tags = card.tags ?? [];
  if (tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())) {
    return true;
  }
  const haystack =
    `${card.title} ${card.description} ${card.slug}`.toLowerCase();
  return haystack.includes(filter.toLowerCase());
}

export function cardMatchesSearch(
  card: ServiceCardModel,
  query: string,
  filter: string | null,
): boolean {
  return cardMatchesQuery(card, query) && cardMatchesFilter(card, filter);
}
