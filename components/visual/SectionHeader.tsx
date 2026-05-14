import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

/**
 * Standard top of a section: eyebrow + display headline + optional sub.
 * Keeps spacing and typography consistent across the page.
 */
export function SectionHeader({
  eyebrow,
  headline,
  sub,
  align = "left",
  className,
  highlight,
}: {
  eyebrow: string;
  headline: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
  /** Words at the end of the headline to color in primary-soft */
  highlight?: number;
}) {
  const words = headline.split(" ");
  const head = highlight ? words.slice(0, words.length - highlight).join(" ") : headline;
  const tail = highlight ? words.slice(words.length - highlight).join(" ") : "";

  return (
    <SectionReveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="display-eyebrow text-xs text-accent">{eyebrow}</p>
      <h2 className="mt-5 display-headline text-balance text-3xl text-fg sm:text-4xl md:text-5xl">
        {head}
        {tail && <span className="text-primary-soft"> {tail}</span>}
      </h2>
      {sub && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {sub}
        </p>
      )}
    </SectionReveal>
  );
}
