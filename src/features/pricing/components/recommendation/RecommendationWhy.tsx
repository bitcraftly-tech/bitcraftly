interface RecommendationWhyProps {
  readonly title: string;
  readonly body: string;
}

export function RecommendationWhy({ title, body }: RecommendationWhyProps) {
  return (
    <div className="ae-result-card__why">
      <p className="ae-result-card__why-title">{title}</p>
      <p className="ae-result-card__why-body">{body}</p>
    </div>
  );
}
