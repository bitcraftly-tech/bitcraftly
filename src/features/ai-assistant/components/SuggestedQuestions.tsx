'use client';

import type { SuggestedQuestion } from '../types';

interface SuggestedQuestionsProps {
  questions: readonly SuggestedQuestion[];
  onSelect: (question: SuggestedQuestion) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="ai-assistant__suggestions">
      <p className="ai-assistant__suggestions-label" id="ai-suggested-questions">
        Suggested questions
      </p>
      <ul className="ai-assistant__suggestions-list" aria-labelledby="ai-suggested-questions">
        {questions.map((question) => (
          <li key={question.id}>
            <button
              type="button"
              className="ai-assistant__suggestion"
              disabled={disabled}
              onClick={() => onSelect(question)}
            >
              {question.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
