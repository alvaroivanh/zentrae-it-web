"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="servicios"
      className="relative bg-ink py-28 sm:py-32"
      aria-label="Servicios"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Servicios"
          headline="Lo que hacemos por tu negocio"
          sub="Cuatro frentes para construir, conectar y automatizar tu operación digital. Pueden venir solos o como un mismo proyecto end-to-end."
          highlight={2}
        />

        <div className="mt-16 grid gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface p-7 ring-brand-hover sm:p-8",
                "transition-transform duration-300 hover:-translate-y-0.5",
              )}
            >
              {/* Subtle radial accent visible on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-subtle">
                  {s.number}
                </span>
                <ArrowUpRight
                  size={20}
                  className="translate-x-0 text-subtle transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                />
              </div>

              <h3 className="relative mt-6 text-2xl text-fg font-light tracking-tight sm:text-[1.65rem]">
                {s.title}
              </h3>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {s.blurb}
              </p>

              <ul className="relative mt-7 space-y-2 border-t border-white/5 pt-5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
