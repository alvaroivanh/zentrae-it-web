import Link from "next/link";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { nav, contact } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-ink">
      {/* Hairline accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Link href="#hero" className="flex items-center gap-2.5" aria-label="Inicio">
            <ZSymbol size={28} className="text-fg" />
            <span className="text-sm uppercase tracking-[0.32em] font-light">
              Zentrae <span className="text-accent">IT</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Diseñamos, construimos y automatizamos producto digital con IA para
            PYMES en LATAM.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-subtle">
            Bogotá · Colombia
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-subtle">Navegación</h3>
          <ul className="mt-5 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-subtle">Contacto</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-muted">
            <li>
              <a className="hover:text-fg" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-fg"
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a
                  className="hover:text-fg"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-subtle">Legal</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/privacidad" className="hover:text-fg">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-fg">
                Términos y condiciones
              </Link>
            </li>
            <li className="text-xs text-subtle">
              Cumple Ley 1581 de 2012 (Colombia)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-between gap-3 px-4 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:px-6 lg:px-10">
          <p>© {year} Zentrae IT. Todos los derechos reservados.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Construido por Zentrae
          </p>
        </div>
      </div>
    </footer>
  );
}
