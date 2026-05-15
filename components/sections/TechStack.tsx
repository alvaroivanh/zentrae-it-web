"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { SectionDivider } from "@/components/visual/SectionDivider";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { techStack, techCategories, type TechCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = "Todo" | TechCategory;

const filters: Filter[] = ["Todo", ...techCategories];

export function TechStack() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("Todo");

  const items = useMemo(
    () =>
      active === "Todo" ? techStack : techStack.filter((t) => t.category === active),
    [active],
  );

  return (
    <section
      id="stack"
      className="relative bg-ink py-28 sm:py-32"
      aria-label="Stack técnico"
    >
      <SectionDivider />
      <SectionBackdrop variant="stack" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Stack técnico"
          headline="La caja de herramientas con la que construimos"
          sub="Tecnologías que usamos día a día en producción. Filtra por categoría para ver lo relevante a tu proyecto."
          highlight={2}
        />

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filtrar por categoría"
          className="mt-12 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-sm transition-all",
                  isActive
                    ? "border-primary/60 bg-primary/15 text-fg"
                    : "border-white/10 bg-transparent text-muted hover:border-white/25 hover:text-fg",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul
          layout
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.li
                key={`${item.category}-${item.name}`}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border border-white/5 bg-surface/60 px-4 py-3.5 backdrop-blur-sm",
                  "transition-colors duration-300 hover:border-accent/40 hover:bg-surface",
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center">
                  {item.slug ? (
                    // simple-icons CDN — color tuned to the muted text
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.simpleicons.org/${item.slug}/B8B8C5`}
                      alt=""
                      aria-hidden
                      width={20}
                      height={20}
                      loading="lazy"
                      className="size-5 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  ) : (
                    <ZSymbol
                      size={18}
                      className="text-muted transition-colors group-hover:text-accent"
                      noDot
                    />
                  )}
                </span>
                <span className="truncate text-sm text-muted transition-colors group-hover:text-fg">
                  {item.name}
                </span>
                <span className="ml-auto hidden text-[10px] uppercase tracking-[0.2em] text-subtle sm:inline">
                  {item.category[0]}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
