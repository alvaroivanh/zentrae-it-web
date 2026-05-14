"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Sparkles, X } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Products() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Product | null>(null);

  // Close on ESC, lock scroll while open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section
      id="portafolio"
      className="relative border-t border-white/5 bg-ink py-28 sm:py-32"
      aria-label="Productos Zentrae"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Portafolio"
          headline="Productos Zentrae para restaurantes"
          sub="Cuatro soluciones empaquetadas que construimos con el mismo stack que ofrecemos a clientes. Casos demostrables, en producción."
          highlight={2}
        />

        <div className="mt-16 grid gap-4 sm:gap-5 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface p-7 text-left ring-brand-hover sm:p-8",
                "transition-transform duration-300 hover:-translate-y-0.5",
                p.star && "bg-surface-2",
              )}
              aria-haspopup="dialog"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-60 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 70%)",
                }}
              />

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

              <h3 className="relative mt-6 text-2xl font-light tracking-tight text-fg sm:text-3xl">
                {p.name}
              </h3>
              <p className="relative mt-2 text-sm uppercase tracking-[0.2em] text-accent/90 sm:text-[13px]">
                {p.tagline}
              </p>
              <p className="relative mt-5 text-sm leading-relaxed text-muted sm:text-base">
                {p.description}
              </p>

              <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-white/5 pt-5">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-subtle">
                    Impacto
                  </p>
                  <p className="mt-1.5 text-sm text-fg/90">{p.metric}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted transition-all group-hover:gap-2.5 group-hover:text-accent">
                  Ver detalle
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA closer */}
        <div className="mt-14 rounded-2xl border border-accent/20 bg-surface/60 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                ¿Tienes un restaurante?
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

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative m-3 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-surface-2 p-7 shadow-2xl sm:m-0 sm:p-10"
            >
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-ink/60 p-2 text-muted transition-colors hover:bg-ink hover:text-fg"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3">
                <ZSymbol size={26} className="text-primary-soft" noDot />
                <span className="text-xs uppercase tracking-[0.32em] text-subtle">
                  Zentrae · {active.name}
                </span>
                {active.star && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
                    <Sparkles size={11} />
                    Estrella
                  </span>
                )}
              </div>

              <h3
                id="product-modal-title"
                className="mt-5 text-3xl font-light tracking-tight text-fg sm:text-4xl"
              >
                {active.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent">
                {active.tagline}
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {active.description}
              </p>

              <div className="mt-7 rounded-xl border border-white/5 bg-ink/60 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-subtle">
                  Impacto
                </p>
                <p className="mt-1.5 text-base text-fg">{active.metric}</p>
              </div>

              <ul className="mt-7 space-y-3">
                {active.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-muted sm:text-base">
                    <Check
                      size={16}
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#contacto"
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-primary-dark"
                >
                  Quiero {active.name} en mi negocio
                  <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="text-sm text-subtle transition-colors hover:text-fg"
                >
                  Volver al portafolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
