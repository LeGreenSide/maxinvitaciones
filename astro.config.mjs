// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// TODO: reemplazar por el dominio real de producción cuando esté disponible.
const SITE_URL = 'https://www.maxinvitaciones.cl';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});