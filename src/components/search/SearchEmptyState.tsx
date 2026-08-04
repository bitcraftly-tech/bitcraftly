const SUGGESTIONS = [
  'Services',
  'AI Chatbots',
  'Healthcare',
  'Pricing',
  'Case Studies',
  'Blog',
] as const;

interface SearchEmptyStateProps {
  readonly query: string;
  readonly onSuggestion: (value: string) => void;
}

export function SearchEmptyState({ query, onSuggestion }: SearchEmptyStateProps) {
  const trimmed = query.trim();

  if (!trimmed) {
    return (
      <div className="gs-empty">
        <p className="gs-empty__title">Jump anywhere</p>
        <p className="gs-empty__desc">
          Search pages, services, industries, AI solutions, case studies, pricing, and blog.
        </p>
        <ul className="gs-empty__hints">
          {SUGGESTIONS.map((item) => (
            <li key={item}>
              <button type="button" onClick={() => onSuggestion(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="gs-empty" role="status">
      <p className="gs-empty__title">No results for “{trimmed}”</p>
      <p className="gs-empty__desc">
        Try “AI”, “website”, “healthcare”, “pricing”, or a page name like “Contact”.
      </p>
      <ul className="gs-empty__hints">
        {SUGGESTIONS.map((item) => (
          <li key={item}>
            <button type="button" onClick={() => onSuggestion(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
