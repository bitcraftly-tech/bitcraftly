import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

/**
 * Lightweight, dependency-free markdown renderer for assistant messages.
 * Supports headings, lists, code fences, inline code, bold, italic, and links.
 * Escapes HTML by rendering React text nodes only.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let part = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${part}`;
    part += 1;

    if (token.startsWith("**")) {
      nodes.push(
        createElement("strong", { key }, token.slice(2, -2)),
      );
    } else if (token.startsWith("*")) {
      nodes.push(createElement("em", { key }, token.slice(1, -1)));
    } else if (token.startsWith("`")) {
      nodes.push(
        createElement("code", { key, className: "ai-md__code" }, token.slice(1, -1)),
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const href = linkMatch[2] ?? "#";
        const isInternal = href.startsWith("/");
        nodes.push(
          createElement(
            "a",
            {
              key,
              href,
              className: "ai-md__link",
              ...(isInternal
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" }),
            },
            linkMatch[1],
          ),
        );
      } else {
        nodes.push(token);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function renderAssistantMarkdown(markdown: string): ReactNode {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !(lines[i] ?? "").startsWith("```")) {
        codeLines.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      blocks.push(
        createElement(
          "pre",
          {
            key: `b-${blockKey}`,
            className: "ai-md__pre",
            "data-lang": lang || undefined,
          },
          createElement("code", null, codeLines.join("\n")),
        ),
      );
      blockKey += 1;
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      const level = (line.match(/^#+/)?.[0].length ?? 2) as 1 | 2 | 3;
      const text = line.replace(/^#{1,3}\s+/, "");
      const tag = level === 1 ? "h3" : level === 2 ? "h3" : "h4";
      blocks.push(
        createElement(
          tag,
          { key: `b-${blockKey}`, className: "ai-md__heading" },
          renderInline(text, `h-${blockKey}`),
        ),
      );
      blockKey += 1;
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i] ?? "")) {
        const itemText = (lines[i] ?? "").replace(/^[-*]\s+/, "");
        items.push(
          createElement(
            "li",
            { key: `li-${blockKey}-${items.length}` },
            renderInline(itemText, `li-${blockKey}-${items.length}`),
          ),
        );
        i += 1;
      }
      blocks.push(
        createElement(
          "ul",
          { key: `b-${blockKey}`, className: "ai-md__list" },
          items,
        ),
      );
      blockKey += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i] ?? "")) {
        const itemText = (lines[i] ?? "").replace(/^\d+\.\s+/, "");
        items.push(
          createElement(
            "li",
            { key: `li-${blockKey}-${items.length}` },
            renderInline(itemText, `li-${blockKey}-${items.length}`),
          ),
        );
        i += 1;
      }
      blocks.push(
        createElement(
          "ol",
          { key: `b-${blockKey}`, className: "ai-md__list ai-md__list--ordered" },
          items,
        ),
      );
      blockKey += 1;
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const paragraphLines: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() !== "" &&
      !/^#{1,3}\s+/.test(lines[i] ?? "") &&
      !/^[-*]\s+/.test(lines[i] ?? "") &&
      !/^\d+\.\s+/.test(lines[i] ?? "") &&
      !(lines[i] ?? "").startsWith("```")
    ) {
      paragraphLines.push(lines[i] ?? "");
      i += 1;
    }

    blocks.push(
      createElement(
        "p",
        { key: `b-${blockKey}`, className: "ai-md__p" },
        renderInline(paragraphLines.join(" "), `p-${blockKey}`),
      ),
    );
    blockKey += 1;
  }

  return createElement(Fragment, null, blocks);
}
