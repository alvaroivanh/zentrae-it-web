"use client";

import { useState, type ReactNode, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Accessible CSS-only flip card. Pure transform-style + backface-visibility,
 * no library. Container has `perspective`; the inner stage flips via rotateY.
 *
 * Why not a `<button>` for the wrapper?
 * The back face contains its own interactive CTAs (anchor + close button),
 * and nesting buttons is invalid HTML. So the wrapper takes role="button",
 * keyboard support, and aria-pressed instead.
 */
export function FlipCard({
  flipped: controlledFlipped,
  onFlipChange,
  front,
  back,
  minHeight,
  className,
  label,
}: {
  /** Optional controlled state. If omitted, internal state is used. */
  flipped?: boolean;
  onFlipChange?: (v: boolean) => void;
  front: ReactNode;
  back: ReactNode;
  /** Container min-height — pin so both faces share the same box. */
  minHeight?: number | string;
  className?: string;
  /** ARIA label of the whole card for screen readers. */
  label: string;
}) {
  const reduce = useReducedMotion();
  const [internal, setInternal] = useState(false);
  const flipped = controlledFlipped ?? internal;

  function setFlipped(v: boolean) {
    if (controlledFlipped === undefined) setInternal(v);
    onFlipChange?.(v);
  }

  function toggle() {
    setFlipped(!flipped);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      className={cn(
        "group/card relative w-full cursor-pointer outline-none [perspective:1200px]",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={label}
      onClick={toggle}
      onKeyDown={onKey}
      style={{ minHeight }}
    >
      <div
        className={cn(
          "relative size-full transition-transform [transform-style:preserve-3d]",
          reduce ? "duration-0" : "duration-700",
          flipped && "[transform:rotateY(180deg)]",
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          minHeight,
        }}
      >
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          {front}
        </div>

        {/* Back face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
