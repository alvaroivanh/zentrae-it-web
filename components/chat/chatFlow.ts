/**
 * Scripted conversation tree for the Zentrae chat widget.
 * A small decision graph by id. Replace this with a Claude-powered agent
 * later — the UI doesn't care, it just renders `messages` + the current
 * node's quick replies.
 */

export type QuickReply = {
  label: string;
  /** Id of the next node to go to. */
  next: NodeId;
};

export type ChatNode = {
  id: NodeId;
  /** Bot lines emitted on entering this node. */
  bot: string[];
  /** Quick reply buttons offered after the bot lines. */
  replies?: QuickReply[];
  /** When true, this node also accepts free-text and routes via `freeTextNext`. */
  acceptsFreeText?: boolean;
  freeTextNext?: NodeId;
  /** Terminal node — UI switches to lead capture form. */
  capture?: boolean;
};

export type NodeId =
  | "root"
  | "web"
  | "whatsapp"
  | "restaurante"
  | "otro"
  | "capture";

export const chatGraph: Record<NodeId, ChatNode> = {
  root: {
    id: "root",
    bot: [
      "¡Hola! Soy el asistente de Zentrae.",
      "Cuéntame qué necesitas para tu negocio. Te puedo orientar y conectarte con el equipo.",
    ],
    replies: [
      { label: "Quiero una página web", next: "web" },
      { label: "Necesito automatizar WhatsApp", next: "whatsapp" },
      { label: "Tengo un restaurante", next: "restaurante" },
      { label: "Otra cosa", next: "otro" },
    ],
    acceptsFreeText: true,
    freeTextNext: "capture",
  },
  web: {
    id: "web",
    bot: [
      "Buen punto de partida. Construimos webs corporativas, landings de alta conversión y e-commerce con Next.js y Webflow.",
      "Para darte una propuesta concreta, dejemos tus datos y agendamos 20 min de diagnóstico.",
    ],
    capture: true,
  },
  whatsapp: {
    id: "whatsapp",
    bot: [
      "Trabajamos con WhatsApp Business API y agentes con Claude/OpenAI.",
      "Casos típicos: atención al cliente 24/7, calificación de leads, reservas y FAQs operativas.",
      "Te paso con un humano para revisar tu caso — dejemos tus datos.",
    ],
    capture: true,
  },
  restaurante: {
    id: "restaurante",
    bot: [
      "Excelente. Tenemos cuatro productos pre-construidos para restaurantes:",
      "Reserve (reservas anti no-show), Kitchen (comandera digital), Pulse (dashboard operativo) y Reputation (IA para reseñas).",
      "Lo siguiente lógico es una demo de 20 min. Dejemos contacto.",
    ],
    capture: true,
  },
  otro: {
    id: "otro",
    bot: [
      "Sin problema. Cuéntanos en una línea qué necesitas y te conectamos con la persona correcta.",
    ],
    acceptsFreeText: true,
    freeTextNext: "capture",
  },
  capture: {
    id: "capture",
    bot: [
      "Perfecto. Para hacerte seguimiento, ¿me dejas tu nombre y un WhatsApp o email?",
    ],
    capture: true,
  },
};

export const rootNode: NodeId = "root";
