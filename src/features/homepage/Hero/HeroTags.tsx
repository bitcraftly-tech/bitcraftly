import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HERO_CAPABILITY_TAGS } from "./hero.constants";

interface HeroTagsProps {
  className?: string;
}

export function HeroTags({ className }: HeroTagsProps) {
  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-wrap items-center gap-[10px] p-0",
        "justify-center md:justify-start",
        className,
      )}
      aria-label="Capabilities"
    >
      {HERO_CAPABILITY_TAGS.map((tag) => {
        const content = (
          <>
            <span className="hero-tag-icon" aria-hidden>
              <Icon name={tag.icon} size="sm" className="h-[14px] w-[14px]" />
            </span>
            <span className="hero-tag-label">{tag.label}</span>
          </>
        );

        return (
          <li key={tag.id}>
            {tag.href ? (
              <Link href={tag.href} className="hero-tag">
                {content}
              </Link>
            ) : (
              <span className="hero-tag">{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
