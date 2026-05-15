"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ParticleField } from "./ParticleField";
import { cn } from "@/lib/utils";

type Variant =
  | "services"
  | "process"
  | "products"
  | "verticals"
  | "stack"
  | "contact";

type Preset = {
  /** Inline `background` value for the gradient layer. Tuned to stay ≤ 0.08 opacity. */
  background: string;
  /** Show a low-density "ghost" particle network behind the content. */
  ghostParticles?: boolean;
};

const PRESETS: Record<Variant, Preset> = {
  services: {
    background:
      "radial-gradient(ellipse 55% 40% at 88% 0%, color-mix(in oklab, var(--color-primary) 6%, transparent), transparent 65%)",
    ghostParticles: true,
  },
  process: {
    background:
      "radial-gradient(ellipse 60% 45% at 8% 100%, color-mix(in oklab, var(--color-accent) 5%, transparent), transparent 65%)",
  },
  products: {
    background:
      "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklab, var(--color-primary) 7%, transparent), transparent 65%)",
    ghostParticles: true,
  },
  verticals: {
    background:
      "radial-gradient(ellipse 55% 40% at 90% 50%, color-mix(in oklab, var(--color-accent) 4%, transparent), transparent 65%)",
  },
  stack: {
    background:
      "linear-gradient(135deg, color-mix(in oklab, var(--color-accent) 3%, transparent), transparent 60%)",
  },
  contact: {
    background:
      "radial-gradient(ellipse 55% 35% at 50% 30%, color-mix(in oklab, var(--color-primary) 6%, transparent), transparent 65%)",
  },
};

/**
 * Section-level depth: a parallaxing gradient layer + optional low-density
 * particle network. Sits behind content (-z-10) and is fully decorative.
 * Uses motion's IntersectionObserver-driven useScroll — no scroll listeners.
 *
 * Drop inside any `relative` section as the FIRST child.
 */
export function SectionBackdrop({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // 0.3x parallax — gradient drifts up while user scrolls down through section.
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const preset = PRESETS[variant];

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Parallax gradient layer */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[120%]"
        style={{ background: preset.background, y: reduce ? "0%" : y }}
      />

      {/* Optional ghost particles (Services / Products only by default) */}
      {preset.ghostParticles && (
        <ParticleField
          density={0.00004}
          linkDistance={110}
          className="absolute inset-0 size-full opacity-30"
        />
      )}
    </div>
  );
}
