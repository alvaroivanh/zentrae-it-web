"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCw,
} from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { SectionDivider } from "@/components/visual/SectionDivider";
import { FlipCard } from "@/components/ui/FlipCard";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

const CARD_MIN_HEIGHT = 420;

export function Products() {
  const reduce = useReducedMotion();

  return (
    <section
      id="portafolio"
      className="relative bg-ink py-28 sm:py-32"
      aria-label="Productos Zentrae"
    >
      <SectionDivider />
      <SectionBackdrop variant="products" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Portafolio"
          headline="Productos Zentrae en producción"
          sub="Cuatro soluciones empaquetadas construidas con el mismo stack que ofrecemos a clientes. Hoy en sector restaurantero — adaptables a consultorios, spas, talleres y comercios. Click en cada card para ver el detalle."
          highlight={2}
        />

        <div className="mt-16 grid gap-4 sm:gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
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
                label={`${p.name} — click para ver detalles`}
                front={<ProductFront product={p} />}
                back={<ProductBack product={p} />}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA closer */}
        <div className="relative mt-14 rounded-2xl border border-accent/20 bg-surface/60 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                ¿Restaurante, consultorio, spa o servicio?
              </p>
              <p className="mt-2 max-w-xl text-pretty text-base text-fg sm:text-lg">
                Hablemos de cómo aplica esto a tu negocio. Te mostramos los
                productos en vivo en una llamada de 20 minutos.
              </p>
            </div>
            <Link
              href="#contacto"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-fg shadow-[0_10px_40px_-12px_rgba(127,119,221,0.6)] transition-all hover:bg-primary-dark"
            >
              Agendar demo
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductFront({ product: p }: { product: Product }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface p-7 ring-brand-hover sm:p-8",
        p.star && "bg-surface-2",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-60 rounded-full opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 70%)",
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ZSymbol size={22} className="text-primary-soft" noDot />
          <span className="text-xs uppercase tracking-[0.32em] text-subtle">
            Zentrae · {p.name}
          </span>
        </div>
        {p.star && (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
            <Sparkles size={11} />
            Estrella
          </span>
        )}
      </div>

      {/* Big Z hero — centered, expressive */}
      <div className="relative flex flex-1 items-center justify-center py-4">
        <span className="relative flex size-28 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/25 transition-all duration-500 group-hover/card:bg-primary/15 group-hover/card:ring-primary/40 sm:size-32">
          <ZSymbol
            size={72}
            className="text-primary-soft transition-colors group-hover/card:text-fg"
          />
        </span>
      </div>

      {/* Title + tagline */}
      <div className="relative">
        <h3 className="text-2xl font-light tracking-tight text-fg sm:text-3xl">
          {p.name}
        </h3>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent/90 sm:text-[13px]">
          {p.tagline}
        </p>
      </div>

      {/* Flip hint */}
      <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-subtle">
          {p.metric}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-subtle transition-colors group-hover/card:text-accent">
          <RotateCw size={11} /> Ver detalle
        </span>
      </div>
    </div>
  );
}

function ProductBack({ product: p }: { product: Product }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/30 bg-surface-2 p-7 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ZSymbol size={18} className="text-primary-soft" noDot />
          <span className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {p.name}
          </span>
        </div>
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-subtle"
        >
          <ArrowLeft size={11} /> Volver
        </span>
      </div>

      <h3 className="relative mt-3 text-2xl font-light tracking-tight text-fg sm:text-[1.7rem]">
        {p.name}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {p.description}
      </p>

      <ul className="relative mt-4 space-y-1.5">
        {p.details.slice(0, 3).map((d) => (
          <li
            key={d}
            className="flex items-start gap-2 text-[12.5px] leading-snug text-muted"
          >
            <Check
              size={13}
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <p className="relative mt-4 rounded-md border border-white/5 bg-ink/40 p-2.5 text-[11.5px] leading-snug text-muted">
        {p.useCases}
      </p>

      <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-4">
        <Link
          href="#contacto"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-fg transition-colors hover:bg-primary-dark"
        >
          Ver caso de uso
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}
