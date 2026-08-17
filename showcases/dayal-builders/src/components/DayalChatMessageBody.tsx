import type { ReactNode } from 'react';

import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { DAYAL } from '@bitcraftly/showcase-dayal-builders/lib/data';

function tidyHref(raw: string) {
  return raw.replace(/[),.;\]}]+$/, '').trimEnd();
}

function linkClass(isUser: boolean) {
  return isUser
    ? 'break-all font-medium underline underline-offset-2 text-[#c8a46b]'
    : 'break-all font-medium text-[#0b1633] underline decoration-[#c8a46b]/60 underline-offset-2 hover:text-[#c8a46b]';
}

function formatLineTokens(line: string, lineIx: number, isUser: boolean): ReactNode {
  const re = /(https?:\/\/[^\s]+)|(#contact)|(\+91[\d\s-]{10,14})|(\b91\d{10}\b)|(\b\d{10}\b)/gi;
  const nodes: ReactNode[] = [];
  let lastIdx = 0;
  let partIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(line)) !== null) {
    const start = m.index;
    const full = m[0];

    if (start > lastIdx) {
      nodes.push(line.slice(lastIdx, start));
    }
    partIndex += 1;
    const key = `${lineIx}-${start}-${partIndex}`;

    if (m[1]) {
      const href = tidyHref(m[1]);
      const isWhatsApp = /wa\.me/i.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass(isUser)}
        >
          {isWhatsApp ? 'Chat on WhatsApp' : 'Open link'}
        </a>,
      );
    } else if (m[2]) {
      nodes.push(
        <DayalSectionLink key={key} href="#contact" className={linkClass(isUser)}>
          contact form
        </DayalSectionLink>,
      );
    } else if (m[3] || m[4] || m[5]) {
      const tel = full.replace(/\D/g, '');
      const href = tel.startsWith('91') ? `tel:+${tel}` : `tel:+91${tel}`;
      nodes.push(
        <a key={key} href={href} className={linkClass(isUser)}>
          {full.trim()}
        </a>,
      );
    } else {
      nodes.push(full);
    }

    lastIdx = start + full.length;
  }

  if (lastIdx < line.length) nodes.push(line.slice(lastIdx));

  return nodes.length > 1 || (nodes.length === 1 && typeof nodes[0] !== 'string') ? (
    <>{nodes}</>
  ) : (
    (nodes[0] ?? line)
  );
}

export default function DayalChatMessageBody({
  content,
  isUser = false,
}: {
  content: string;
  isUser?: boolean;
}) {
  const lines = content.split('\n');

  return (
    <div className="min-w-0 [overflow-wrap:anywhere] [word-break:break-word]">
      {lines.map((line, ix) => (
        <p key={`${content.length}_${ix}`} className={ix > 0 ? 'mt-1.5' : ''}>
          {formatLineTokens(line, ix, isUser)}
        </p>
      ))}
    </div>
  );
}

export function dayalWhatsAppUrl(message?: string) {
  const text =
    message ?? `Hi ${DAYAL.brand}, I would like to enquire about your projects in Jamshedpur.`;
  return `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(text)}`;
}
