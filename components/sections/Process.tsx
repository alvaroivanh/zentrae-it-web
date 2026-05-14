"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { process } from "@/lib/content";

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="proceso"
      className="relative border-t border-white/5 bg-ink py-28 sm:py-32"
      aria-label="Proceso de trabajo"
    >
      {/* Decorative diagonal lines à la Z mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Proceso"
          headline="Cómo trabajamos contigo"
          sub="Cuatro etapas. Iteración semanal. Visibilidad total. Sin sorpresas en factura ni en entregable."
          highlight={1}
        />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line on lg+ */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[3.2rem] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
          />

          {process.map((step, i) => (
            <motion.li
              key={step.number}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="relative flex items-baseline gap-4">
                <span
                  className="display-headline text-[6.5rem] leading-none text-fg/90 sm:text-[7.5rem] lg:text-[6rem] xl:text-[7rem]"
                  style={{ fontWeight: 200 }}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden
                  className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_20px_4px_color-mix(in_oklab,var(--color-accent)_50%,transparent)]"
                />
              </div>

              <h3 className="mt-2 text-xl font-light tracking-tight text-fg sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted sm:text-base">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
