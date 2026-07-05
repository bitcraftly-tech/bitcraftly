"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ListOrdered, Sparkles } from "lucide-react";
import { showInfoAlert } from "@/lib/sweetAlert";

const MIN_CHARS_HINT = 40;

type AtsPremiumTextareaProps = {
  id?: string;
  label: string;
  helperText: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  showError?: boolean;
  minHeightClass?: string;
  aiAssist?: boolean;
};

function AssistButton({
  label,
  tooltip,
  onClick,
  children,
}: {
  label: string;
  tooltip: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={tooltip}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-lg border border-[#e8ecef] bg-[#fafbfc] text-[#7f8c8d] transition duration-200 hover:border-[rgba(142,68,173,0.35)] hover:bg-[#f5eef8] hover:text-[#8e44ad] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b59b6]/25"
    >
      {children}
    </button>
  );
}

export default function AtsPremiumTextarea({
  id: idProp,
  label,
  helperText,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showError = false,
  minHeightClass = "min-h-[140px]",
  aiAssist = false,
}: AtsPremiumTextareaProps) {
  const autoId = useId();
  const fieldId = idProp ?? autoId;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const [focused, setFocused] = useState(false);

  const charCount = value.length;
  const hasError = showError && Boolean(error);

  const insertStructure = () => {
    if (value.trim()) return;
    onChange(
      "I'm interested in Bitcraftly because…\n\n• What I build best:\n• A project I'm proud of:\n• How I approach problems:\n• What I'd like to learn here:",
    );
  };

  const insertStarter = () => {
    if (value.trim().length > 20) return;
    onChange(
      "I enjoy shipping polished frontend work with React and Next.js. I'm drawn to Bitcraftly's studio model — real client products, clear ownership, and room to grow with modern web and AI tooling.",
    );
  };

  return (
    <div className="w-full">
      <div className="mb-3 space-y-1.5">
        <label htmlFor={fieldId} className="block text-[15px] font-semibold leading-snug text-[#2c3e50]">
          {label}
        </label>
        <p id={helperId} className="text-[13px] leading-relaxed text-[#95a5a6]">
          {helperText}
        </p>
      </div>

      <div
        className={`relative rounded-2xl border bg-white transition-[border-color,box-shadow] duration-200 ${
          hasError
            ? "border-[#e8b4b8] shadow-[0_0_0_3px_rgba(231,76,60,0.08)]"
            : focused
              ? "border-[rgba(142,68,173,0.45)] shadow-[0_0_0_4px_rgba(155,89,182,0.12)]"
              : "border-[#e8ecef] shadow-[0_1px_2px_rgba(44,62,80,0.04)]"
        }`}
      >
        {aiAssist ? (
          <div className="flex items-center justify-between gap-2 border-b border-[#f1f5f9] px-3 py-2 sm:px-4">
            <span className="text-[11px] font-medium uppercase tracking-wide text-[#bdc3c7]">Writing assist</span>
            <div className="flex items-center gap-1.5">
              <AssistButton
                label="Insert outline"
                tooltip="Add a simple outline to structure your answer"
                onClick={insertStructure}
              >
                <ListOrdered className="size-4" aria-hidden />
              </AssistButton>
              <AssistButton
                label="Starter example"
                tooltip="Insert a short example you can edit"
                onClick={insertStarter}
              >
                <Sparkles className="size-4" aria-hidden />
              </AssistButton>
              <AssistButton
                label="Writing tips"
                tooltip="Be specific: projects, stack, and what kind of work energizes you"
                onClick={() =>
                  void showInfoAlert("Mention 1–2 real projects, your stack, and what kind of work energizes you.")
                }
              >
                <Lightbulb className="size-4" aria-hidden />
              </AssistButton>
            </div>
          </div>
        ) : null}

        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${helperId} ${errorId}` : helperId}
          className={`${minHeightClass} w-full resize-y border-0 bg-transparent px-4 py-4 text-[15px] leading-[1.65] text-[#2c3e50] outline-none placeholder:text-[#bdc3c7] sm:px-5 sm:py-5 ${aiAssist ? "" : "rounded-2xl"}`}
        />

        <div className="flex items-center justify-end border-t border-[#f8fafc] px-4 py-2 sm:px-5">
          <span
            className={`text-[11px] tabular-nums transition-colors ${
              charCount > 0 && charCount < MIN_CHARS_HINT ? "text-[#95a5a6]" : "text-[#bdc3c7]"
            }`}
          >
            {charCount} characters
          </span>
        </div>
      </div>

      {hasError ? (
        <motion.p
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[13px] leading-relaxed text-[#c0392b]"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
