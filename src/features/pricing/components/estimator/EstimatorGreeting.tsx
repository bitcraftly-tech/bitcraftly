import { Icon } from '@/components/ui/icon';
import { ESTIMATOR_COPY } from './estimator.content';

interface EstimatorGreetingProps {
  readonly showSuggestions: boolean;
  readonly onSuggestion: (value: string) => void;
}

export function EstimatorGreeting({ showSuggestions, onSuggestion }: EstimatorGreetingProps) {
  return (
    <div className="pp-msg pp-msg--ai ae-greeting">
      <span className="pp-msg__avatar" aria-hidden>
        <Icon name="sparkles" size="sm" className="h-[12px] w-[12px]" />
      </span>
      <div className="pp-msg__bubble">
        <p className="ae-greeting__hi">{ESTIMATOR_COPY.greetingHi}</p>
        <p className="ae-greeting__name">{ESTIMATOR_COPY.greetingName}</p>
        <p className="ae-greeting__body">{ESTIMATOR_COPY.greetingBody}</p>
        {showSuggestions ? (
          <div className="pp-msg__suggestions" role="group" aria-label="Quick prompts">
            {ESTIMATOR_COPY.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="pp-msg__chip"
                onClick={() => onSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
