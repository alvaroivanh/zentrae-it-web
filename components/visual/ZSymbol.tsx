import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Visible-square size in px. Defaults to 32. */
  size?: number;
  /** When true, the accent dot pulses softly. */
  animated?: boolean;
  /** Hide the accent dot — useful in monochrome contexts (e.g. footer). */
  noDot?: boolean;
  title?: string;
};

/**
 * The Zentrae mark: a stylised Z built from two horizontal rails and a
 * diagonal, with a teal dot anchored to the top-right corner. Designed to
 * render crisp at any size by leaning on viewBox and stroke geometry only.
 */
export function ZSymbol({
  className,
  size = 32,
  animated = false,
  noDot = false,
  title = "Zentrae",
}: Props) {
  const stroke = 8; // tuned to read at 16px and scale up cleanly
  return (
    <svg
      className={cn("inline-block shrink-0", className)}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      fill="none"
    >
      <title>{title}</title>
      {/* Top rail */}
      <line
        x1="10"
        y1="18"
        x2="54"
        y2="18"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="square"
      />
      {/* Diagonal */}
      <line
        x1="54"
        y1="18"
        x2="10"
        y2="46"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="square"
      />
      {/* Bottom rail */}
      <line
        x1="10"
        y1="46"
        x2="54"
        y2="46"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="square"
      />
      {/* Accent dot */}
      {!noDot && (
        <circle
          cx="56"
          cy="10"
          r="5"
          fill="var(--color-accent)"
          className={animated ? "animate-pulse" : undefined}
        />
      )}
    </svg>
  );
}
