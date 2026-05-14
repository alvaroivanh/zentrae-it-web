import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos de uso del sitio web de Zentrae IT.",
};

const LAST_UPDATED = "2026-05-14";

export default function TerminosPage() {
  return (
    <div className="space-y-6 text-muted">
      <p className="display-eyebrow text-xs text-accent">Legal</p>
      <h1 className="display-headline text-balance text-4xl text-fg sm:text-5xl">
        Términos y <span className="text-primary-soft">condiciones</span>
      </h1>
      <p className="text-xs text-subtle">Última actualización: {LAST_UPDATED}</p>

      <section className="mt-8 space-y-3">
        <p>
          Esta página es un <strong>borrador en construcción</strong>. La versión
          definitiva será publicada antes del lanzamiento público del sitio.
        </p>
        <p>
          El uso de este sitio implica la aceptación de los siguientes términos
          básicos:
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-light text-fg">Contenido</h2>
        <p>
          Todo el contenido publicado en zentrae.com — incluyendo textos,
          gráficos, código y marca — es propiedad de Zentrae IT salvo cuando
          se indique lo contrario.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-light text-fg">Limitación de responsabilidad</h2>
        <p>
          La información de este sitio se ofrece tal cual, sin garantías
          implícitas. Las propuestas y presupuestos formales se entregan en
          documento separado y prevalecen sobre lo aquí publicado.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-light text-fg">Contacto legal</h2>
        <p>
          Para consultas sobre estos términos:{" "}
          <a href="mailto:hola@zentrae.com" className="text-accent hover:underline">
            hola@zentrae.com
          </a>.
        </p>
      </section>
    </div>
  );
}
