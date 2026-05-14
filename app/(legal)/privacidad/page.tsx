import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de tratamiento de datos personales de Zentrae IT conforme a la Ley 1581 de 2012.",
};

const LAST_UPDATED = "2026-05-14";

export default function PrivacidadPage() {
  return (
    <div className="space-y-6 text-muted">
      <p className="display-eyebrow text-xs text-accent">Legal</p>
      <h1 className="display-headline text-balance text-4xl text-fg sm:text-5xl">
        Política de <span className="text-primary-soft">privacidad</span>
      </h1>
      <p className="text-xs text-subtle">Última actualización: {LAST_UPDATED}</p>

      <section className="mt-8 space-y-3">
        <p>
          Esta página es un <strong>borrador en construcción</strong>. La versión
          definitiva, conforme a la Ley 1581 de 2012 y al Decreto 1377 de 2013
          de Colombia, será publicada antes del lanzamiento público.
        </p>
        <p>
          En tanto, Zentrae IT no comparte ni vende los datos que recibe a
          través de este sitio. La información del formulario de contacto y del
          chat se usa exclusivamente para responder a tu solicitud.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-light text-fg">Datos que recolectamos</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nombre, email y WhatsApp ingresados en el formulario.</li>
          <li>Mensajes del chat widget cuando solicitas seguimiento.</li>
          <li>Analítica anónima de uso del sitio (sin identificación personal).</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-light text-fg">Tus derechos</h2>
        <p>
          Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos.
          Escríbenos a <a href="mailto:hola@zentrae.com" className="text-accent hover:underline">hola@zentrae.com</a>{" "}
          y respondemos en máximo 15 días hábiles.
        </p>
      </section>
    </div>
  );
}
