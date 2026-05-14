# Zentrae IT — Sitio web

Sitio oficial de Zentrae IT. Construido con **Next.js 16** (App Router),
**React 19**, **Tailwind v4**, **Motion** y **TypeScript** estricto.

- **Producción**: Vercel
- **CMS**: WordPress headless en segunda iteración. Los contenidos viven
  en [`lib/content.ts`](lib/content.ts) con un shape estable para
  migrar a WP REST/WPGraphQL sin tocar componentes.

---

## Tabla de contenidos

- [Correr en local](#correr-en-local)
- [Estructura](#estructura)
- [Identidad visual y tokens](#identidad-visual-y-tokens)
- [Editar contenido](#editar-contenido)
- [Endpoints](#endpoints)
- [Migración a WordPress headless](#migración-a-wordpress-headless)
- [Deploy a Vercel](#deploy-a-vercel)
- [QA y Lighthouse](#qa-y-lighthouse)
- [Accesibilidad](#accesibilidad)
- [Estado de los Hitos](#estado-de-los-hitos)

---

## Correr en local

```bash
npm install
npm run dev
# abre http://localhost:3939
```

Requisitos: Node ≥ 20.

> Usamos puerto **3939** (no el 3000 por defecto de Next) para no chocar
> con otros proyectos locales. Cambia el flag `-p` en `package.json` si
> necesitas otro puerto.

Para producción local:

```bash
npm run build && npm run start
```

---

## Estructura

```
app/
  layout.tsx                # fonts, metadata, skip-to-content, html shell
  page.tsx                  # one-page: monta Hero, Services, Process, …
  globals.css               # tokens Zentrae (@theme) + utilities + a11y
  icon.svg                  # favicon Z (auto-detectado por Next)
  apple-icon.svg            # ícono iOS home screen
  opengraph-image.tsx       # OG card auto-generada (Edge)
  sitemap.ts                # sitemap.xml dinámico
  robots.ts                 # robots.txt
  api/
    contact/route.ts        # POST /api/contact
    chat/route.ts           # POST /api/chat
  (legal)/                  # route group con su propio layout
    layout.tsx
    privacidad/page.tsx
    terminos/page.tsx
components/
  layout/                   # Navbar, Footer
  sections/                 # Hero, Services, Process, Products, TechStack, Contact
  visual/                   # ZSymbol, ParticleField, SectionReveal, SectionHeader
  chat/
    ChatWidget.tsx          # launcher + panel
    chatFlow.ts             # árbol de decisión scripted
lib/
  content.ts                # SOURCE OF TRUTH: copy + datos de secciones
  utils.ts                  # cn() helper
public/                     # estáticos (vacío de momento, los logos vienen
                            # de simple-icons CDN — sin bundle cost)
.env.example                # variables de entorno opcionales
next.config.ts              # cabeceras de seguridad + flags
```

---

## Identidad visual y tokens

Toda la paleta y tipografía vive **en un solo sitio**:
[`app/globals.css`](app/globals.css), bloque `@theme`.

```css
@theme {
  --color-ink: #0F0F14;
  --color-surface: #1A1A24;
  --color-surface-2: #242433;

  --color-primary: #7F77DD;
  --color-primary-dark: #5A52B0;
  --color-primary-soft: #AFA9EC;

  --color-accent: #5DCAA5;
  --color-accent-dark: #3DA585;
  --color-accent-soft: #9FE1CB;

  --color-fg: #FFFFFF;
  --color-muted: #B8B8C5;
  --color-subtle: #8A8A99;
  --color-border: #5A5A6A;

  --color-success: #5DCAA5;
  --color-warning: #EFB55C;
  --color-error: #E27676;
}
```

Tailwind v4 expone cada token como utilidad: `bg-ink`, `text-primary`,
`border-accent`, etc. No hay `tailwind.config.ts`.

**Fuentes**: Inter (texto) y JetBrains Mono (código), cargadas via
`next/font/google` con `display: swap` — auto-optimizadas, cero CLS.

**Motivo Z**: el símbolo aparece en navbar, hero, footer, cards de
productos, cabecera del chat y favicon — 6 lugares.

---

## Editar contenido

Todo el copy y los datos de las secciones están en
[`lib/content.ts`](lib/content.ts), tipados:

```ts
export const services: Service[] = [ … ];
export const products: Product[] = [ … ];
export const techStack: TechItem[] = [ … ];
// etc.
```

**Para agregar un servicio**, edita el array `services`.
**Para agregar una sección nueva**:
1. Crea `components/sections/<Nombre>.tsx`.
2. Importa y monta en [`app/page.tsx`](app/page.tsx).
3. Si tiene contenido configurable, exporta su data en `lib/content.ts`.

---

## Endpoints

| Endpoint            | Método | Uso                                    | Variable de entorno    |
|---------------------|--------|----------------------------------------|------------------------|
| `/api/contact`      | POST   | Submit del formulario público           | `CONTACT_WEBHOOK_URL`  |
| `/api/chat`         | POST   | Transcript + lead del chat widget       | `CHAT_WEBHOOK_URL`     |

Ambos endpoints validan con zod y responden:
- `200 { ok: true }` — éxito (con o sin webhook configurado)
- `400 { ok: false, error }` — JSON inválido
- `422 { ok: false, error, issues }` — fallo de validación con detalles por campo

Si la variable de entorno está vacía, el endpoint loguea a stdout y
responde 200 (útil para desarrollo). Si está definida, reenvía el JSON
crudo al webhook.

Ver [`.env.example`](.env.example) para la lista completa.

---

## Migración a WordPress headless

Diseñamos `lib/content.ts` con shapes estables. Cuando WP esté listo,
cada `export const` se reemplaza por un loader asíncrono:

```ts
// Antes
export const products: Product[] = [ … ];

// Después
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.WP_BASE}/wp-json/wp/v2/zentrae_product`, {
    next: { revalidate: 600 }, // ISR cada 10 min
    headers: process.env.WP_AUTH_TOKEN
      ? { Authorization: `Bearer ${process.env.WP_AUTH_TOKEN}` }
      : undefined,
  });
  return mapToProduct(await res.json());
}
```

Y en cada sección que consume el array, se cambia `import { products }`
por `const products = await getProducts()` en un Server Component.

Cero cambios en componentes visuales.

---

## Deploy a Vercel

### Paso 1 — push a GitHub
Crea un repo en GitHub y empuja el código:

```bash
git remote add origin git@github.com:tu-usuario/zentrae-it.git
git push -u origin main
```

### Paso 2 — importar en Vercel
1. Entra a [vercel.com/new](https://vercel.com/new) y conecta GitHub.
2. Selecciona el repo `zentrae-it`.
3. Framework preset: **Next.js** (auto-detectado).
4. Root directory: `./` (default).
5. Build command: `next build` (default).
6. Output: `.next` (default).

### Paso 3 — variables de entorno (opcional)
En "Environment Variables" agrega las que necesites de `.env.example`:

| Nombre                | Cuándo                                       |
|-----------------------|----------------------------------------------|
| `CONTACT_WEBHOOK_URL` | Cuando integres n8n / HubSpot / Slack        |
| `CHAT_WEBHOOK_URL`    | Cuando integres destino para el chat         |
| `ANTHROPIC_API_KEY`   | Cuando reemplaces el árbol simulado por Claude |
| `WP_BASE`             | Cuando migres contenidos a WordPress         |

### Paso 4 — dominio
En "Domains" agrega `zentrae.com` (y `www.zentrae.com` con redirect).
Vercel emite el certificado SSL automáticamente.

> El `metadataBase` en [`app/layout.tsx`](app/layout.tsx) apunta a
> `https://zentrae.com`. Ajústalo si tu dominio final es otro antes del
> primer deploy a producción.

---

## QA y Lighthouse

### Smoke test local

```bash
# Build de producción + arranque
npm run build && npm run start

# En otra terminal: pegar al sitio
curl -s -o /dev/null -w "Home: %{http_code}\n" http://localhost:3939/
curl -s -X POST http://localhost:3939/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@x.com","whatsapp":"+57 300 0000000","message":"hola probando el form","consent":true}'
```

### Lighthouse

```bash
# Necesitas Chrome instalado
npx lighthouse http://localhost:3939/ --view --preset=desktop
npx lighthouse http://localhost:3939/ --view --form-factor=mobile
```

Targets según el briefing:
- Performance > **90**
- Accessibility = **100**
- Best Practices > **95**
- SEO > **95**

### Responsive

Breakpoints (mobile-first):
- `< 640px` — todo en una columna; chat widget ocupa el ancho completo
- `640–767px` — Hero CTAs lado a lado; cards 1 col
- `768–1023px` — Services y Products en 2 columnas
- `1024–1279px` — Process en 4 columnas horizontal; chat 22rem
- `≥ 1280px` — Hero con visualización Z grande a la derecha

---

## Accesibilidad

- **Idioma**: `<html lang="es">`
- **Skip link** "Saltar al contenido principal" al inicio del body
- **Focus visible**: anillo teal en cualquier control via teclado
- **Contraste**: paleta verificada en AA — texto blanco sobre #0F0F14 = ~17:1
- **`prefers-reduced-motion`**: respetado en partículas, scroll
  smooth, fade-ins y micro-animaciones
- **Modal de productos**: cierra con ESC, click-outside, focus trap
  implícito, `role="dialog"` + `aria-modal="true"`
- **Chat widget**: aria-labels en launcher, botones de control y
  composer; transcripción navegable por teclado
- **Form**: `aria-label`, errores asociados a campos, `noValidate`
  para que zod controle, checkbox de consentimiento con texto descriptivo

---

## Estado de los Hitos

- [x] **Hito 1** — scaffolding + tokens + Hero + Navbar + Footer
- [x] **Hito 2** — Servicios + Proceso + Productos + Stack
- [x] **Hito 3** — Contacto + Chat widget + páginas legales
- [x] **Hito 4** — QA, favicon, OG, sitemap, robots, deploy docs

---

Construido por Zentrae.
