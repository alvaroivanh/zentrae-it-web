"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "motion/react";
import { Check, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { contact, founderQuote } from "@/lib/content";
import { cn } from "@/lib/utils";

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Cuéntanos tu nombre." })
    .max(120),
  email: z
    .string()
    .trim()
    .email({ message: "Necesitamos un email válido." }),
  whatsapp: z
    .string()
    .trim()
    .min(7, { message: "Incluye un WhatsApp donde contactarte." })
    .max(40),
  message: z
    .string()
    .trim()
    .min(10, { message: "Cuéntanos un poco más sobre tu proyecto (mín. 10 caracteres)." })
    .max(2000),
  consent: z.literal(true, {
    message: "Necesitamos tu autorización para contactarte (Ley 1581).",
  }),
});

type ContactInput = z.infer<typeof ContactSchema>;

export function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  async function onSubmit(values: ContactInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setSubmitError(
          body?.error
            ? "No pudimos enviar. Intenta de nuevo o escríbenos por WhatsApp."
            : "Algo falló al enviar. Intenta de nuevo en un momento.",
        );
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Sin conexión. Intenta de nuevo o escríbenos por WhatsApp.");
    }
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-white/5 bg-ink py-28 sm:py-32"
      aria-label="Contacto"
    >
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 w-[40rem] max-w-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) 25%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow={contact.eyebrow}
          headline={contact.headline}
          sub={contact.sub}
          highlight={2}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* FORM */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-success/15 ring-1 ring-success/40">
                  <Check size={22} className="text-success" />
                </span>
                <h3 className="text-2xl font-light text-fg">
                  Gracias. Vamos a estudiar tu mensaje.
                </h3>
                <p className="max-w-md text-sm text-muted sm:text-base">
                  Te respondemos en menos de 24 horas hábiles. Si es urgente,
                  escríbenos por WhatsApp:{" "}
                  <a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {contact.whatsapp}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-subtle transition-colors hover:text-fg"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="grid gap-5 sm:grid-cols-2"
                aria-label="Formulario de contacto"
              >
                <Field label="Nombre" htmlFor="name" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register("name")}
                    className={inputCls(!!errors.name)}
                    placeholder="Tu nombre"
                  />
                </Field>

                <Field label="Email" htmlFor="email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    {...register("email")}
                    className={inputCls(!!errors.email)}
                    placeholder="hola@empresa.com"
                  />
                </Field>

                <Field
                  label="WhatsApp"
                  htmlFor="whatsapp"
                  error={errors.whatsapp?.message}
                  className="sm:col-span-2"
                >
                  <input
                    id="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    {...register("whatsapp")}
                    className={inputCls(!!errors.whatsapp)}
                    placeholder="+57 300 000 0000"
                  />
                </Field>

                <Field
                  label="Cuéntanos del proyecto"
                  htmlFor="message"
                  error={errors.message?.message}
                  className="sm:col-span-2"
                >
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={cn(inputCls(!!errors.message), "resize-y")}
                    placeholder="Qué necesitas construir, plazos aproximados, presupuesto si lo tienes…"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-muted">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-0.5 size-4 shrink-0 rounded border-white/20 bg-ink text-primary focus:ring-primary"
                    />
                    <span>
                      Autorizo a Zentrae IT el tratamiento de mis datos
                      personales para contactarme sobre este proyecto, conforme
                      a la{" "}
                      <a
                        href="/privacidad"
                        className="text-accent hover:underline"
                      >
                        política de privacidad
                      </a>{" "}
                      (Ley 1581 de 2012).
                    </span>
                  </label>
                  {errors.consent?.message && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="sm:col-span-2 rounded-md border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
                    {submitError}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-fg shadow-[0_10px_40px_-12px_rgba(127,119,221,0.6)] transition-all",
                      "hover:bg-primary-dark hover:shadow-[0_18px_50px_-12px_rgba(127,119,221,0.8)]",
                      "disabled:cursor-not-allowed disabled:opacity-60",
                    )}
                  >
                    {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                    <Send
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* DIRECT CONTACT + QUOTE */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <ul className="space-y-4">
              <ContactLink
                href={`mailto:${contact.email}`}
                icon={<Mail size={16} />}
                label="Email"
                value={contact.email}
              />
              <ContactLink
                href={contact.whatsappLink}
                external
                icon={<MessageSquare size={16} />}
                label="WhatsApp"
                value={contact.whatsapp}
              />
              <ContactLink
                icon={<MapPin size={16} />}
                label="Sede"
                value={contact.location}
              />
            </ul>

            <div className="flex gap-3 pt-2">
              {contact.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <figure className="relative mt-8 overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 sm:p-8">
              <ZSymbol
                size={36}
                className="absolute right-6 top-6 text-primary/40"
              />
              <blockquote className="max-w-md text-pretty text-base leading-relaxed text-fg/90 sm:text-lg">
                <span className="display-headline text-4xl text-primary/40">
                  &ldquo;
                </span>{" "}
                {founderQuote.text}
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.25em] text-subtle">
                — {founderQuote.author}
              </figcaption>
            </figure>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-subtle"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-ink/60 px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle transition-colors focus:outline-none focus:ring-1",
    hasError
      ? "border-error/50 focus:border-error focus:ring-error/40"
      : "border-white/10 focus:border-primary focus:ring-primary/40",
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
  external,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-white/5">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-subtle">
          {label}
        </span>
        <span className="block truncate text-sm text-fg">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-3 rounded-xl border border-white/5 bg-surface/40 p-3 transition-colors hover:border-accent/30 hover:bg-surface"
        >
          {inner}
        </a>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-surface/40 p-3">
          {inner}
        </div>
      )}
    </li>
  );
}
