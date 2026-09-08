# Max Invitaciones

Sitio de invitaciones digitales animadas para cumpleaños infantiles: catálogo de diseños por personaje, personalización con el nombre y la edad, y entrega en video vertical listo para compartir por WhatsApp.

**Sitio en producción → [www.maxinvitaciones.cl](https://www.maxinvitaciones.cl)**

## Stack

| | |
|---|---|
| **Astro 7** | Sitio estático con islas de React |
| **React 19** | Carruseles y componentes interactivos |
| **Tailwind CSS 4** | Sistema de estilos |
| **Remotion** | Render programático de los videos de muestra |

## Qué incluye

- **Catálogo desacoplado**: los 13 diseños se definen en `src/data/invitations.json`, cada uno con su video vertical (720×1280), su póster y el color de fondo de la tarjeta. Agregar una invitación es agregar una entrada, sin tocar componentes.
- **Islas de React**: solo los carruseles y el botón de WhatsApp se hidratan; el resto del sitio se sirve como HTML estático.
- **SEO técnico**: sitemap generado con `@astrojs/sitemap`, metadatos por página y datos estructurados JSON-LD en el layout base.
- **Pagos**: flujo nacional e internacional, con integración de PayPal para compras desde el extranjero.
- **Responsivo**, diseñado primero para móvil, que es desde donde llega la mayoría del tráfico.

## Desarrollo

```bash
npm install
npm run dev
```

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio a `dist/` |
| `npm run preview` | Sirve la build de producción localmente |
| `npm run mockups` | Renderiza los mockups de muestra con Remotion |

## Estructura

```
src/
  components/   Componentes Astro e islas de React
  data/         Catálogo de invitaciones y precios
  layouts/      Layout base con SEO, metadatos y JSON-LD
  pages/        Páginas del sitio
  styles/       Estilos globales
public/         Videos, pósters e imágenes del catálogo
remotion/       Composiciones de Remotion para los videos de muestra
scripts/        Script de render de mockups
```

---

Desarrollado por **Lester Aguilar Venegas** — [LinkedIn](https://www.linkedin.com/in/lester-aguilar)
