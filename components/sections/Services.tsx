"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  RotateCw,
  Globe,
  Plug,
  BrainCircuit,
  Package,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { SectionDivider } from "@/components/visual/SectionDivider";
import { FlipCard } from "@/components/ui/FlipCard";
import { services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<Service["icon"], LucideIcon> = {
  globe: Globe,
  plug: Plug,
  brainCircuit: BrainCircuit,
  package: Package,
};

const CARD_MIN_HEIGHT = 360;

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="servicios"
      className="relative bg-ink py-28 sm:py-32"
      aria-label="Servicios"
    >
      <SectionDivider />
      <SectionBackdrop variant="services" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Servicios"
          headline="Lo que hacemos por tu negocio"
          sub="Cuatro frentes para construir, conectar y automatizar tu operación digital. Pueden venir solos o como un mismo proyecto end-to-end. Haz click en cada uno para ver el detalle."
          highlight={2}
        />

        <div className="mt-16 grid gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <motion.div
                key={s.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FlipCard
                  minHeight={CARD_MIN_HEIGHT}
                  label={`${s.title} — click para ver el detalle`}
                  front={<ServiceFront service={s} Icon={Icon} />}
                  back={<ServiceBack service={s} />}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceFront({
  service: s,
  Icon,
}: {
  service: Service;
  Icon: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col items-start justify-between overflow-hidden rounded-2xl border border-white/5 bg-surface p-7 ring-brand-hover sm:p-8",
      )}
    >
      {/* Hover radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Top row: number + flip hint */}
      <div className="relative flex w-full items-start justify-between gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-subtle">
          {s.number}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-subtle transition-colors group-hover/card:text-accent">
          <RotateCw size={11} className="opacity-80" /> Ver más
        </span>
      </div>

      {/* Big icon — centered, expressive */}
      <div className="relative flex flex-1 items-center justify-center py-6">
        <span className="relative flex size-24 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/25 transition-all duration-500 group-hover/card:bg-primary/15 group-hover/card:ring-primary/40">
          <Icon
            size={42}
            strokeWidth={1.4}
            className="text-primary-soft transition-colors group-hover/card:text-fg"
            aria-hidden
          />
        </span>
      </div>

      {/* Title + tagline */}
      <div className="relative w-full">
        <h3 className="text-xl font-light tracking-tight text-fg sm:text-2xl">
          {s.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
          {s.tagline}
        </p>
      </div>
    </div>
  );
}

function ServiceBack({ service: s }: { service: Service }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/30 bg-surface-2 p-7 sm:p-8">
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%)",
        }}
      />

      {/* Back header */}
      <div className="relative flex items-start justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
          {s.number} · {s.title.split(" ")[0]}
        </span>
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-subtle"
        >
          <ArrowLeft size={11} /> Volver
        </span>
      </div>

      <h3 className="relative mt-4 text-lg font-light tracking-tight text-fg sm:text-xl">
        {s.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {s.blurb}
      </p>

      <ul className="relative mt-5 space-y-2 border-t border-white/10 pt-4">
        {s.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[13px] leading-snug text-muted"
          >
            <span
              aria-hidden
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/80"
            />
            {b}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-5">
        <Link
          href="#contacto"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-fg transition-colors hover:bg-primary-dark"
        >
          Cotizar este servicio
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
