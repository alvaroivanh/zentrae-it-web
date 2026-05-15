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
  { label: "Verticales", href: "#verticales" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "Zentrae IT · Bogotá · LATAM",
  headline: "Construimos lo que tu negocio necesita para crecer.",
  sub: "Automatización con IA para negocios que atienden clientes — restaurantes, consultorios, servicios profesionales y más. Diseñamos, desarrollamos y conectamos producto digital end-to-end.",
  primaryCta: { label: "Hablemos de tu proyecto", href: "#contacto" },
  secondaryCta: { label: "Ver casos de éxito", href: "#portafolio" },
};

export type Service = {
  id: string;
  number: string;
  title: string;
  /** Short, punchy line shown on the FRONT of the flip card. */
  tagline: string;
  /** Full description shown on the BACK. */
  blurb: string;
  bullets: string[];
  /** Lucide icon name — resolved in the Services section. */
  icon: "globe" | "plug" | "brainCircuit" | "package";
};

export const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Desarrollo web y e-commerce",
    tagline: "Webs que convierten. Construidas para escalar.",
    icon: "globe",
    blurb:
      "Webs corporativas, landings de alta conversión y tiendas online construidas para escalar. Sin plantillas — cada una a medida con visión de producto.",
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
    tagline: "Conectamos lo que ya usas, sin doble trabajo.",
    icon: "plug",
    blurb:
      "Conectamos tu sitio con los sistemas que ya usas — reservas, pagos, CRM, analítica. Tu operación deja de vivir en pestañas separadas.",
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
    tagline: "Tu equipo, libre de tareas repetitivas.",
    icon: "brainCircuit",
    blurb:
      "Agentes conversacionales y workflows que liberan a tu equipo de tareas repetitivas. Atención al cliente 24/7, captura de leads y gestión de reservas.",
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
    tagline: "Soluciones empaquetadas, listas para implementar.",
    icon: "package",
    blurb:
      "Soluciones empaquetadas para negocios que reciben pedidos, reservas y reseñas. Hoy en sector restaurantero, próximamente en consultorios, spas y servicios profesionales.",
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
  /** "Útil para" — sectores donde aplica el producto. */
  useCases: string;
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
    useCases:
      "Útil para: restaurantes, consultorios, talleres y cualquier negocio que recibe solicitudes por WhatsApp y necesita ver su operación en un solo tablero.",
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
    useCases:
      "Aunque nace para cocinas, se adapta a flujos de cualquier equipo operativo que ejecuta órdenes por estados — laboratorios, talleres, áreas de producción.",
  },
  {
    id: "reserve",
    name: "Reserve",
    tagline: "Reservas que sí llegan.",
    description:
      "Sistema de reservas con confirmación inteligente vía WhatsApp y mecánicas anti no-show.",
    metric: "Decenas de no-shows evitados por mes en un negocio mediano",
    details: [
      "Confirmación automática por WhatsApp 24h y 2h antes.",
      "Lista de espera dinámica que llena huecos automáticamente.",
      "Política de garantía opcional con cobro vía Wompi/Stripe.",
      "Vista de agenda con drag-and-drop.",
    ],
    useCases:
      "Para restaurantes, consultorios médicos, spas, salones de belleza y cualquier negocio con agenda de citas.",
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
    useCases:
      "Universal. Cualquier negocio con presencia en Google Maps, TripAdvisor o redes sociales que reciba reseñas de clientes.",
  },
];

export type Vertical = {
  id: string;
  /** Lucide icon name — resolved in the Verticals section. */
  icon:
    | "utensils"
    | "stethoscope"
    | "sparkles"
    | "briefcase"
    | "store"
    | "truck";
  name: string;
  desc: string;
};

export const verticals: Vertical[] = [
  {
    id: "restaurantes",
    icon: "utensils",
    name: "Restaurantes",
    desc: "Pedidos, reservas y reseñas — el sector donde nacieron Reserve, Kitchen, Pulse y Reputation.",
  },
  {
    id: "salud",
    icon: "stethoscope",
    name: "Consultorios y clínicas",
    desc: "Citas, recordatorios anti no-show y seguimiento post-consulta vía WhatsApp.",
  },
  {
    id: "belleza",
    icon: "sparkles",
    name: "Spas y belleza",
    desc: "Reservas, fidelización por puntos y gestión activa de reseñas.",
  },
  {
    id: "servicios",
    icon: "briefcase",
    name: "Servicios profesionales",
    desc: "Captura y calificación de leads, cotizaciones automatizadas, agendamiento de reuniones.",
  },
  {
    id: "comercio",
    icon: "store",
    name: "Comercio local",
    desc: "Atención por WhatsApp, catálogo digital, pedidos y pagos con pasarela local.",
  },
  {
    id: "domicilio",
    icon: "truck",
    name: "Servicios a domicilio",
    desc: "Agendamiento de visitas, optimización de ruta y confirmación con el cliente.",
  },
];

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "IA"
  | "Integraciones"
  | "Infra"
  | "Datos";

export type TechItem = {
  name: string;
  category: TechCategory;
  /** simple-icons slug, used to render the logo via CDN. Optional. */
  slug?: string;
};

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "IA",
  "Integraciones",
  "Infra",
  "Datos",
];

export const techStack: TechItem[] = [
  // Frontend
  { name: "Next.js", category: "Frontend", slug: "nextdotjs" },
  { name: "React", category: "Frontend", slug: "react" },
  { name: "Vue", category: "Frontend", slug: "vuedotjs" },
  { name: "Webflow", category: "Frontend", slug: "webflow" },
  { name: "Tailwind CSS", category: "Frontend", slug: "tailwindcss" },
  { name: "Framer Motion", category: "Frontend", slug: "framer" },
  // Backend
  { name: "Node.js", category: "Backend", slug: "nodedotjs" },
  { name: "Python", category: "Backend", slug: "python" },
  { name: "n8n", category: "Backend", slug: "n8n" },
  { name: "Express", category: "Backend", slug: "express" },
  { name: "FastAPI", category: "Backend", slug: "fastapi" },
  // IA
  { name: "Claude", category: "IA", slug: "anthropic" },
  { name: "OpenAI", category: "IA", slug: "openai" },
  { name: "Gemini", category: "IA", slug: "googlegemini" },
  { name: "OpenRouter", category: "IA" },
  { name: "OpenClaw", category: "IA" },
  { name: "Paperclip", category: "IA" },
  // Integraciones
  { name: "WhatsApp Business", category: "Integraciones", slug: "whatsapp" },
  { name: "Stripe", category: "Integraciones", slug: "stripe" },
  { name: "Wompi", category: "Integraciones" },
  { name: "ePayco", category: "Integraciones" },
  { name: "Mercado Pago", category: "Integraciones", slug: "mercadopago" },
  { name: "Google Maps", category: "Integraciones", slug: "googlemaps" },
  { name: "Bookeala", category: "Integraciones" },
  { name: "HubSpot", category: "Integraciones", slug: "hubspot" },
  // Infra
  { name: "Vercel", category: "Infra", slug: "vercel" },
  { name: "Cloudflare", category: "Infra", slug: "cloudflare" },
  { name: "Supabase", category: "Infra", slug: "supabase" },
  { name: "AWS", category: "Infra", slug: "amazonwebservices" },
  // Datos
  { name: "PostgreSQL", category: "Datos", slug: "postgresql" },
  { name: "MongoDB", category: "Datos", slug: "mongodb" },
  { name: "Airtable", category: "Datos", slug: "airtable" },
  { name: "Google Sheets", category: "Datos", slug: "googlesheets" },
];

export const contact = {
  eyebrow: "Hablemos",
  headline: "Listo para construir tu siguiente proyecto.",
  sub: "Cuéntanos qué necesitas. Te respondemos en menos de 24 horas hábiles. ¿Tienes un negocio distinto a los que mostramos? Cuéntanos — casi seguro también lo podemos automatizar.",
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
