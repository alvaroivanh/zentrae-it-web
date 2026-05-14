/**
 * Single source of truth for page copy. Designed to be swappable later for
 * a headless WordPress fetch (REST or WPGraphQL) without touching components.
 * Migration path: replace each `export const` with an async loader that hits
 * `${WP_BASE}/wp-json/wp/v2/...` and returns the same shape.
 */

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "Zentrae IT · Bogotá · LATAM",
  headline: "Construimos lo que tu negocio necesita para crecer.",
  sub: "Diseñamos, desarrollamos y automatizamos producto digital con IA. Páginas web, e-commerce, integraciones y agentes conversacionales — todo con visión de producto.",
  primaryCta: { label: "Hablemos de tu proyecto", href: "#contacto" },
  secondaryCta: { label: "Ver casos de éxito", href: "#portafolio" },
};

export type Service = {
  id: string;
  number: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Desarrollo web y e-commerce",
    blurb:
      "Webs corporativas, landings de alta conversión y tiendas online construidas para escalar.",
    bullets: [
      "Next.js, React, Webflow",
      "Despliegue en Vercel y Cloudflare",
      "Performance objetivo Lighthouse 95+",
      "SEO técnico y schema desde el día uno",
    ],
  },
  {
    id: "integraciones",
    number: "02",
    title: "Integraciones a medida",
    blurb:
      "Conectamos tu sitio con los sistemas que ya usas — reservas, pagos, CRM, analítica.",
    bullets: [
      "Pasarelas: Wompi, Stripe, ePayco, Mercado Pago",
      "Booking: Calendly, Bookeala, Cal.com",
      "CRM: HubSpot, Airtable, Google Sheets",
      "WhatsApp Business API, Google Maps, GA4",
    ],
  },
  {
    id: "ia",
    number: "03",
    title: "Automatización con IA",
    blurb:
      "Agentes conversacionales y workflows que liberan a tu equipo de tareas repetitivas.",
    bullets: [
      "Bots de WhatsApp con Claude y OpenAI",
      "Workflows con n8n y agentes con OpenClaw",
      "Captura y calificación de leads 24/7",
      "Gestión de reservas y soporte automático",
    ],
  },
  {
    id: "productos",
    number: "04",
    title: "Productos Zentrae",
    blurb:
      "Soluciones empaquetadas pre-construidas, listas para implementar en tu negocio.",
    bullets: [
      "Pulse — dashboard operativo",
      "Kitchen — comandera digital",
      "Reserve — reservas anti no-show",
      "Reputation — IA para reseñas",
    ],
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  desc: string;
};

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico",
    desc: "Entendemos tu negocio antes de proponer tecnología. Una sesión, sin compromiso.",
  },
  {
    number: "02",
    title: "Diseño",
    desc: "Arquitectura, mockups interactivos y validación contigo en cada decisión clave.",
  },
  {
    number: "03",
    title: "Construcción",
    desc: "Desarrollo iterativo con entregas semanales. Ves el avance en tiempo real.",
  },
  {
    number: "04",
    title: "Operación",
    desc: "Soporte continuo, mejoras basadas en datos y mediciones de impacto.",
  },
];

export type Product = {
  id: "pulse" | "kitchen" | "reserve" | "reputation";
  name: string;
  tagline: string;
  description: string;
  metric: string;
  star?: boolean;
  details: string[];
};

export const products: Product[] = [
  {
    id: "pulse",
    name: "Pulse",
    tagline: "El pulso de tu operación, en tiempo real.",
    description:
      "Dashboard centralizado de ventas, ocupación y operación para restaurantes que viven del dato.",
    metric: "Visibilidad en vivo de la operación completa",
    details: [
      "Integración con tu POS (Square, Toast, equivalentes locales).",
      "Métricas de ocupación, ticket promedio y rotación de mesa.",
      "Alertas configurables por umbrales operativos.",
      "Vista móvil para gerencia desde cualquier lugar.",
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    tagline: "La cocina, sin papel.",
    description:
      "Comandera digital que reemplaza el ticket impreso. Menos errores, mejor coordinación entre sala y cocina.",
    metric: "Reducción de errores de comanda hasta el mínimo operativo",
    details: [
      "Pantallas KDS por estación (frío, caliente, postres).",
      "Sincronización en tiempo real con sala vía WebSockets.",
      "Histórico de tiempos por plato para mejora continua.",
      "Funciona offline ante caída de red.",
    ],
  },
  {
    id: "reserve",
    name: "Reserve",
    tagline: "Reservas que sí llegan.",
    description:
      "Sistema de reservas con confirmación inteligente vía WhatsApp y mecánicas anti no-show.",
    metric: "Decenas de no-shows evitados por mes en un restaurante mediano",
    details: [
      "Confirmación automática por WhatsApp 24h y 2h antes.",
      "Lista de espera dinámica que llena huecos automáticamente.",
      "Política de garantía opcional con cobro vía Wompi/Stripe.",
      "Vista de salón con drag-and-drop de mesas.",
    ],
  },
  {
    id: "reputation",
    name: "Reputation",
    tagline: "Tu reputación online, gestionada por IA.",
    description:
      "Monitorea y responde reseñas en Google, TripAdvisor e Instagram con un agente que aprende tu tono de marca.",
    metric: "Respuesta a reseñas en menos de 30 minutos, 24/7",
    star: true,
    details: [
      "Ingesta continua de reseñas multi-plataforma.",
      "Borrador de respuesta con tono de marca para tu aprobación.",
      "Detección automática de patrones de queja recurrentes.",
      "Reporte semanal de NPS y temas calientes.",
    ],
  },
];

export type TechItem = {
  name: string;
  category: "Frontend" | "Backend" | "IA" | "Integraciones" | "Infra" | "Datos";
};

export const techStack: TechItem[] = [
  // Frontend
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Vue", category: "Frontend" },
  { name: "Webflow", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "n8n", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  // IA
  { name: "Claude", category: "IA" },
  { name: "OpenAI", category: "IA" },
  { name: "Gemini", category: "IA" },
  { name: "OpenRouter", category: "IA" },
  { name: "OpenClaw", category: "IA" },
  { name: "Paperclip", category: "IA" },
  // Integraciones
  { name: "WhatsApp Business", category: "Integraciones" },
  { name: "Stripe", category: "Integraciones" },
  { name: "Wompi", category: "Integraciones" },
  { name: "ePayco", category: "Integraciones" },
  { name: "Mercado Pago", category: "Integraciones" },
  { name: "Google Maps", category: "Integraciones" },
  { name: "Bookeala", category: "Integraciones" },
  { name: "HubSpot", category: "Integraciones" },
  // Infra
  { name: "Vercel", category: "Infra" },
  { name: "Cloudflare", category: "Infra" },
  { name: "Supabase", category: "Infra" },
  { name: "AWS", category: "Infra" },
  // Datos
  { name: "PostgreSQL", category: "Datos" },
  { name: "MongoDB", category: "Datos" },
  { name: "Airtable", category: "Datos" },
  { name: "Google Sheets", category: "Datos" },
];

export const contact = {
  eyebrow: "Hablemos",
  headline: "Listo para construir tu siguiente proyecto.",
  sub: "Cuéntanos qué necesitas. Te respondemos en menos de 24 horas hábiles.",
  email: "hola@zentrae.com",
  whatsapp: "+57 300 000 0000",
  whatsappLink: "https://wa.me/573000000000",
  location: "Bogotá, Colombia",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/zentrae-it" },
    { label: "Instagram", href: "https://www.instagram.com/zentrae.it" },
  ],
};

export const founderQuote = {
  text: "No vendemos plantillas. Cada proyecto se construye desde el problema del cliente, con la misma stack con la que diseñamos nuestros propios productos.",
  author: "Fundador, Zentrae IT",
};
