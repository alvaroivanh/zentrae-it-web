"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Utensils,
  Stethoscope,
  Sparkles,
  Briefcase,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { SectionDivider } from "@/components/visual/SectionDivider";
import { verticals, type Vertical } from "@/lib/content";

const ICONS: Record<Vertical["icon"], LucideIcon> = {
  utensils: Utensils,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  briefcase: Briefcase,
  store: Store,
  truck: Truck,
};

export function Verticals() {
  const reduce = useReducedMotion();

  return (
    <section
      id="verticales"
      className="relative bg-ink py-28 sm:py-32"
      aria-label="Verticales donde aplicamos"
    >
      <SectionDivider tone="accent" />
      <SectionBackdrop variant="verticals" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Donde aplicamos"
          headline="Para cualquier negocio que atiende clientes"
          sub="No solo restaurantes. Esto es para tu negocio también: el patrón se repite — agenda, mensajes, pagos, reseñas. Lo automatizamos para que tú atiendas a quien sí compra."
          highlight={3}
        />

        <ul className="mt-16 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => {
            const Icon = ICONS[v.icon];
            return (
              <motion.li
                key={v.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/5 bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-surface sm:p-6"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-primary/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-soft ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-accent group-hover:ring-accent/30">
                  <Icon size={20} aria-hidden />
                </span>
                <div className="relative min-w-0">
                  <h3 className="text-base font-medium tracking-tight text-fg sm:text-lg">
                    {v.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {v.desc}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
