# Zentrae IT — Sitio web

Sitio oficial de Zentrae IT. Construido con Next.js 16 (App Router),
React 19, Tailwind v4, Motion (Framer) y TypeScript estricto.

Producción objetivo: **Vercel**, con WordPress headless como CMS opcional
en una segunda iteración (los contenidos viven en `lib/content.ts` con
shape estable para migrar a WP REST/WPGraphQL sin tocar componentes).

---

## Correr en local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

Requisitos: Node ≥ 20.

## Build y producción local

```bash
npm run build
npm run start
```

## Deploy a Vercel

1. Push del repo a GitHub.
2. En vercel.com → "New Project" → importar el repo.
3. Framework preset: Next.js (auto-detectado). Sin configuración extra.
4. Variables de entorno (cuando existan): ver sección "Endpoints".

---

## Identidad visual

Toda la paleta y tipografía vive en **un solo sitio**:
[`app/globals.css`](app/globals.css) → bloque `@theme`.

Sobreescribir los tokens ahí los propaga a todo Tailwind:

```css
@theme {
  --color-ink: #0F0F14;        /* fondo principal */
  --color-surface: #1A1A24;     /* cards */
  --color-primary: #7F77DD;     /* púrpura Zentrae */
  --color-accent: #5DCAA5;      /* teal Zentrae */
  /* … */
}
```

Tailwind v4 expone cada token como utilidad: `bg-ink`, `text-primary`,
`border-accent`, etc. No hay `tailwind.config.ts`.

Fuentes: Inter (texto) y JetBrains Mono (código), cargadas via
`next/font/google` en `app/layout.tsx` — auto-optimizadas y con
`display: swap`.

---

## Estructura

```
app/
  layout.tsx          # fonts, metadata, html shell
  page.tsx            # ensambla las secciones one-page
  globals.css         # tokens Zentrae (@theme) + utilities
  api/                # endpoints (Hito 3)
    contact/route.ts
    chat/route.ts
components/
  layout/             # Navbar, Footer
  sections/           # Hero, Services, Process, Products, TechStack, Contact
  visual/             # ZSymbol, ParticleField, SectionReveal
  chat/               # ChatWidget, ChatPanel, chatFlow (Hito 3)
lib/
  content.ts          # SOURCE OF TRUTH: copy + datos de secciones
  utils.ts            # cn() helper
public/
  logos/              # logos de stack (Hito 2)
```

### Agregar o editar una sección

1. Edita el contenido en [`lib/content.ts`](lib/content.ts).
2. Si necesitas un nuevo bloque visual, crea
   `components/sections/<Nombre>.tsx`.
3. Importa y monta el componente en
   [`app/page.tsx`](app/page.tsx).

### Migración a WordPress headless (cuando aplique)

Cada `export const` en `lib/content.ts` se reemplaza por un fetch
asíncrono a la WP REST API que devuelva el mismo shape:

```ts
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.WP_BASE}/wp-json/wp/v2/zentrae_product`, {
    next: { revalidate: 600 },
  });
  return mapToProduct(await res.json());
}
```

Variables de entorno previstas: `WP_BASE`, `WP_AUTH_TOKEN`.

---

## Endpoints (placeholders por ahora)

| Endpoint            | Uso                          | Estado |
|---------------------|------------------------------|--------|
| `POST /api/contact` | envío del formulario         | Hito 3 |
| `POST /api/chat`    | log del chat widget          | Hito 3 |

Cuando integremos email/Slack/HubSpot real, los webhooks viven en
variables de entorno:

```env
CONTACT_WEBHOOK_URL=        # n8n, HubSpot, Slack, etc.
CHAT_WEBHOOK_URL=
ANTHROPIC_API_KEY=          # cuando el chat use Claude real
```

---

## Estado

- [x] Hito 1 — scaffolding, tokens, Hero, Navbar, Footer
- [ ] Hito 2 — Servicios, Proceso, Productos, Stack
- [ ] Hito 3 — Contacto + chat widget
- [ ] Hito 4 — QA, Lighthouse, deploy a Vercel

---

Construido por Zentrae.
