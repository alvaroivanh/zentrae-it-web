"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-white/5 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="#hero"
          className="group flex items-center gap-2.5"
          aria-label="Zentrae IT — Inicio"
        >
          <ZSymbol size={28} className="text-fg transition-colors group-hover:text-primary-soft" />
          <span className="text-sm tracking-[0.32em] uppercase font-light">
            Zentrae <span className="text-accent">IT</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-sm font-medium text-fg backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/25"
          >
            Hablemos
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-fg md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-white/5 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-base text-muted hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-primary/50 bg-primary/15 px-4 py-2 text-center text-sm font-medium text-fg"
          >
            Hablemos
          </Link>
        </nav>
      </div>
    </header>
  );
}
