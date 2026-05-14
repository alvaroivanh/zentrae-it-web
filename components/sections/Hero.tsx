"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { ParticleField } from "@/components/visual/ParticleField";
import { hero } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-ink"
      aria-label="Hero"
    >
      {/* Particle network background */}
      <ParticleField className="absolute inset-0 size-full opacity-70" />

      {/* Soft radial vignette + accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 30%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 35% at 80% 80%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] grid-fade-mask"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 sm:pt-36 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.p
              {...fade(0)}
              className="display-eyebrow text-xs text-muted sm:text-sm"
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...fade(0.1)}
              className="mt-6 display-headline text-balance text-4xl text-fg sm:text-5xl md:text-6xl lg:text-[5.5rem]"
            >
              {hero.headline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-primary-soft">
                {hero.headline.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              {...fade(0.2)}
              className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              {...fade(0.3)}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-fg shadow-[0_10px_40px_-12px_rgba(127,119,221,0.6)] transition-all hover:bg-primary-dark hover:shadow-[0_18px_50px_-12px_rgba(127,119,221,0.8)]"
              >
                {hero.primaryCta.label}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full border border-accent/60 bg-transparent px-6 py-3 text-sm font-medium text-fg transition-all hover:border-accent hover:bg-accent/10"
              >
                {hero.secondaryCta.label}
                <ArrowRight
                  size={16}
                  className="text-accent transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>

            {/* Stat row — credibility tiles, no fake numbers */}
            <motion.dl
              {...fade(0.45)}
              className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/5 pt-8 sm:gap-10"
            >
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-subtle">Stack</dt>
                <dd className="mt-1 text-base text-fg sm:text-lg">Next.js · IA · n8n</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-subtle">Sede</dt>
                <dd className="mt-1 text-base text-fg sm:text-lg">Bogotá, CO</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-subtle">Visión</dt>
                <dd className="mt-1 text-base text-fg sm:text-lg">LATAM</dd>
              </div>
            </motion.dl>
          </div>

          {/* Animated Z mark on the right (desktop) */}
          <motion.div
            {...fade(0.2)}
            className="relative hidden aspect-square w-full max-w-md self-center lg:block"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-accent/10 blur-2xl" />
            <div className="relative flex size-full items-center justify-center">
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -8, 0], rotate: [0, 0.6, 0] }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-primary-soft"
              >
                <ZSymbol size={280} animated className="drop-shadow-[0_30px_60px_rgba(127,119,221,0.35)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#servicios"
          aria-label="Bajar a servicios"
          {...fade(0.7)}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
