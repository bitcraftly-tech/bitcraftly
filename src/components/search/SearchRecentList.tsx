interface SearchRecentListProps {
  readonly items: readonly string[];
  readonly onSelect: (value: string) => void;
  readonly onClear: () => void;
}

export function SearchRecentList({ items, onSelect, onClear }: SearchRecentListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="gs-recent">
      <div className="gs-recent__head">
        <p className="gs-recent__title">Recent searches</p>
        <button type="button" className="gs-recent__clear" onClick={onClear}>
          Clear
        </button>
      </div>
      <ul className="gs-recent__list">
        {items.map((item) => (
          <li key={item}>
            <button type="button" onClick={() => onSelect(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
