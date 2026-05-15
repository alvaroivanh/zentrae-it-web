"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, Send, Check, MessageCircle } from "lucide-react";
import { ZSymbol } from "@/components/visual/ZSymbol";
import { chatGraph, rootNode, type NodeId } from "./chatFlow";
import { cn } from "@/lib/utils";

type Turn = { role: "bot" | "user"; text: string; at: string };

const APPEAR_AFTER_MS = 8_000; // ~8s grace before the launcher appears
const TOOLTIP_FIRST_DELAY_MS = 7_000; // first nudge once the launcher is up
const TOOLTIP_VISIBLE_MS = 4_000;
const SCROLL_NUDGE_THRESHOLD = 0.5; // re-nudge after passing 50% of the page

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [mountLauncher, setMountLauncher] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipTimers = useRef<{ show?: number; hide?: number }>({});
  const scrollNudgeFired = useRef(false);

  const [node, setNode] = useState<NodeId>(rootNode);
  const [transcript, setTranscript] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [phase, setPhase] = useState<"talk" | "capture" | "submitting" | "done">(
    "talk",
  );
  const [lead, setLead] = useState({ name: "", contact: "" });
  const [leadError, setLeadError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const startedAt = useRef<string>("");

  // Mount the launcher after a grace period — no surprise interrupt.
  useEffect(() => {
    const t = setTimeout(() => setMountLauncher(true), APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  // Nudge the user with a tooltip 7s after the launcher mounts, and once
  // more if they scroll past half the page without opening the chat.
  useEffect(() => {
    if (!mountLauncher || hasOpenedOnce) return;

    function showNudge(ms = TOOLTIP_VISIBLE_MS) {
      setTooltipOpen(true);
      window.clearTimeout(tooltipTimers.current.hide);
      tooltipTimers.current.hide = window.setTimeout(
        () => setTooltipOpen(false),
        ms,
      );
    }

    tooltipTimers.current.show = window.setTimeout(
      () => showNudge(),
      TOOLTIP_FIRST_DELAY_MS,
    );

    function onScroll() {
      if (scrollNudgeFired.current || hasOpenedOnce) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      if (ratio >= SCROLL_NUDGE_THRESHOLD) {
        scrollNudgeFired.current = true;
        showNudge();
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(tooltipTimers.current.show);
      window.clearTimeout(tooltipTimers.current.hide);
    };
  }, [mountLauncher, hasOpenedOnce]);

  function handleLauncherOpen() {
    setOpen(true);
    setHasOpenedOnce(true);
    setTooltipOpen(false);
    window.clearTimeout(tooltipTimers.current.show);
    window.clearTimeout(tooltipTimers.current.hide);
  }

  // First open: seed the conversation with the root bot lines.
  useEffect(() => {
    if (!open || transcript.length > 0) return;
    startedAt.current = new Date().toISOString();
    appendBot(chatGraph[rootNode].bot);
    // root node has no `capture: true`
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom on every new turn or phase change.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [transcript, phase, reduce]);

  function appendBot(lines: string[]) {
    setTranscript((prev) => [
      ...prev,
      ...lines.map((text) => ({
        role: "bot" as const,
        text,
        at: new Date().toISOString(),
      })),
    ]);
  }

  function appendUser(text: string) {
    setTranscript((prev) => [
      ...prev,
      { role: "user", text, at: new Date().toISOString() },
    ]);
  }

  function goTo(nextId: NodeId, userEcho?: string) {
    if (userEcho) appendUser(userEcho);
    const next = chatGraph[nextId];
    setNode(nextId);
    // Bot lines for the new node appear in a single tick.
    setTimeout(() => appendBot(next.bot), reduce ? 0 : 350);
    if (next.capture) {
      setTimeout(() => setPhase("capture"), reduce ? 0 : 500);
    }
  }

  function handleQuickReply(r: { label: string; next: NodeId }) {
    goTo(r.next, r.label);
  }

  function handleFreeText(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const current = chatGraph[node];
    if (!current.acceptsFreeText || !current.freeTextNext) return;
    setDraft("");
    goTo(current.freeTextNext, text);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadError(null);
    const name = lead.name.trim();
    const contact = lead.contact.trim();
    if (name.length < 2) {
      setLeadError("Cuéntanos tu nombre.");
      return;
    }
    if (contact.length < 5) {
      setLeadError("Necesitamos un WhatsApp o email para responderte.");
      return;
    }
    setPhase("submitting");
    appendUser(`${name} · ${contact}`);
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: [
            ...transcript,
            {
              role: "user" as const,
              text: `${name} · ${contact}`,
              at: new Date().toISOString(),
            },
          ],
          lead: { name, contact },
          startedAt: startedAt.current,
        }),
      });
      appendBot([
        "Listo. Te respondemos en menos de 24 horas hábiles.",
        "Gracias por escribirnos.",
      ]);
      setPhase("done");
    } catch {
      setPhase("capture");
      setLeadError("Algo falló al enviar. Intenta de nuevo en un momento.");
    }
  }

  const current = chatGraph[node];

  return (
    <AnimatePresence>
      {mountLauncher && (
        <motion.div
          key="chat-widget"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
        >
          {/* Launcher */}
          {!open && (
            <div className="relative flex items-center justify-end">
              {/* Tooltip nudge — appears on the left of the button */}
              <AnimatePresence>
                {tooltipOpen && (
                  <motion.div
                    key="chat-tooltip"
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    role="tooltip"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-accent/40 bg-[#FAF8F2] px-3.5 py-2 text-sm font-medium text-ink shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]"
                  >
                    ¿Conversamos? Te respondo al instante.
                    {/* Arrow */}
                    <span
                      aria-hidden
                      className="absolute right-[-6px] top-1/2 size-3 -translate-y-1/2 rotate-45 border-b border-r border-accent/40 bg-[#FAF8F2]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded hover label (revealed on hover only) */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-[68px] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-primary/40 bg-surface px-3.5 py-1.5 text-xs text-fg opacity-0 shadow-lg transition-all duration-300 group-hover/launcher:translate-x-0 group-hover/launcher:opacity-100 sm:block"
              >
                Hablar con Zentrae
              </span>

              <motion.button
                type="button"
                onClick={handleLauncherOpen}
                aria-label="Abrir chat con Zentrae"
                className={cn(
                  "group/launcher relative flex size-15 cursor-pointer items-center justify-center rounded-full bg-primary text-fg shadow-[0_15px_40px_-12px_rgba(127,119,221,0.7)] transition-colors hover:bg-primary-dark sm:size-[60px]",
                )}
                whileHover={reduce ? undefined : { scale: 1.08 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                animate={
                  !reduce && !hasOpenedOnce
                    ? { scale: [1, 1.05, 1] }
                    : undefined
                }
                transition={
                  !reduce && !hasOpenedOnce
                    ? {
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 7.4,
                        ease: "easeInOut",
                      }
                    : { type: "spring", stiffness: 320, damping: 22 }
                }
              >
                {/* Outer attention-ring pulse */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-full",
                    !reduce && !hasOpenedOnce && "animate-ping bg-primary/25",
                  )}
                  style={{ animationDuration: "3s" }}
                />

                {/* Main chat icon */}
                <MessageCircle
                  size={26}
                  strokeWidth={1.75}
                  className="relative text-fg"
                  aria-hidden
                />

                {/* Z brand badge — top-right corner */}
                <span
                  aria-hidden
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface-2 ring-2 ring-ink"
                >
                  <ZSymbol size={10} className="text-accent" noDot />
                </span>

                {/* Online dot — bottom-right corner */}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-ink ring-2 ring-ink"
                >
                  <span className="relative flex size-2.5">
                    <span
                      className={cn(
                        "absolute inline-flex size-full rounded-full bg-success opacity-70",
                        !reduce && "animate-ping",
                      )}
                    />
                    <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                  </span>
                </span>
              </motion.button>
            </div>
          )}

          {/* Panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="chat-panel"
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-label="Asistente Zentrae"
                className={cn(
                  "flex h-[min(78svh,32rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl",
                  "sm:w-[22rem]",
                )}
              >
                {/* Header */}
                <header className="relative flex items-center gap-3 border-b border-white/5 bg-surface-2 px-4 py-3">
                  <span className="relative flex size-9 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/40">
                    <ZSymbol size={20} className="text-primary-soft" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-fg">
                      Asistente Zentrae
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-muted">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                      </span>
                      en línea
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Cerrar chat"
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-fg"
                  >
                    <X size={16} />
                  </button>
                </header>

                {/* Transcript */}
                <div
                  ref={scrollerRef}
                  className="flex-1 space-y-2.5 overflow-y-auto bg-ink/40 px-3 py-4"
                >
                  {transcript.map((t, i) => (
                    <Bubble key={i} role={t.role} text={t.text} />
                  ))}

                  {/* Quick replies after the latest bot turn, if any */}
                  {phase === "talk" && current.replies && current.replies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {current.replies.map((r) => (
                        <button
                          key={r.label}
                          type="button"
                          onClick={() => handleQuickReply(r)}
                          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-fg transition-colors hover:border-primary hover:bg-primary/20"
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Lead capture inline form */}
                  {phase === "capture" && (
                    <form
                      onSubmit={submitLead}
                      className="mt-3 space-y-2 rounded-xl border border-white/5 bg-surface-2 p-3"
                      aria-label="Formulario de contacto del chat"
                    >
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        value={lead.name}
                        onChange={(e) =>
                          setLead((l) => ({ ...l, name: e.target.value }))
                        }
                        className="w-full rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        autoComplete="tel email"
                        placeholder="WhatsApp o email"
                        value={lead.contact}
                        onChange={(e) =>
                          setLead((l) => ({ ...l, contact: e.target.value }))
                        }
                        className="w-full rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
                      />
                      {leadError && (
                        <p className="text-xs text-error">{leadError}</p>
                      )}
                      <button
                        type="submit"
                        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-primary-dark"
                      >
                        Enviar
                        <Send size={13} />
                      </button>
                    </form>
                  )}

                  {phase === "submitting" && (
                    <p className="px-1 text-xs text-subtle">Enviando…</p>
                  )}

                  {phase === "done" && (
                    <div className="mt-2 flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-2 text-xs text-success">
                      <Check size={14} /> Conversación enviada al equipo.
                    </div>
                  )}
                </div>

                {/* Free text composer (only when current node accepts it) */}
                {phase === "talk" && current.acceptsFreeText && (
                  <form
                    onSubmit={handleFreeText}
                    className="flex items-center gap-2 border-t border-white/5 bg-surface px-3 py-3"
                  >
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Escribe un mensaje…"
                      className="flex-1 rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
                      maxLength={500}
                    />
                    <button
                      type="submit"
                      aria-label="Enviar"
                      className="rounded-md bg-primary p-2 text-fg transition-colors hover:bg-primary-dark disabled:opacity-40"
                      disabled={!draft.trim()}
                    >
                      <Send size={14} />
                    </button>
                  </form>
                )}

                {/* Compact footer with brand reassurance */}
                <p className="border-t border-white/5 bg-ink/60 px-3 py-2 text-center text-[10px] uppercase tracking-[0.25em] text-subtle">
                  Powered by Zentrae · respuesta humana ≤ 24h
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, text }: { role: "bot" | "user"; text: string }) {
  const isBot = role === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isBot
            ? "rounded-tl-sm bg-surface-2 text-fg"
            : "rounded-tr-sm bg-primary/85 text-fg",
        )}
      >
        {text}
      </div>
    </motion.div>
  );
}

