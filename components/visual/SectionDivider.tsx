import { cn } from "@/lib/utils";

/**
 * Horizontal hairline between sections. Goes transparent → primary/20 →
 * transparent across the page width. Replaces the flat `border-t white/5`
 * pattern we had so the seams between sections never look dead.
 *
 * Render inside the parent section with `relative` — it positions absolutely
 * to the top edge.
 */
export function SectionDivider({
  className,
  tone = "primary",
}: {
  className?: string;
  tone?: "primary" | "accent" | "mixed";
}) {
  const gradient =
    tone === "accent"
      ? "from-transparent via-accent/25 to-transparent"
      : tone === "mixed"
        ? "from-transparent via-primary/20 via-50% to-transparent"
        : "from-transparent via-primary/25 to-transparent";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r",
        gradient,
        className,
      )}
    />
  );
}
