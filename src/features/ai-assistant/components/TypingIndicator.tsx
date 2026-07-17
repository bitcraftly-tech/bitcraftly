"use client";

interface TypingIndicatorProps {
  label?: string;
}

export function TypingIndicator({
  label = "Bitcraftly AI is typing",
}: TypingIndicatorProps) {
  return (
    <div
      className="ai-assistant__typing"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="ai-assistant__typing-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="ai-assistant__typing-label">{label}</span>
    </div>
  );
}
