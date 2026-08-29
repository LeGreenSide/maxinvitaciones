// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

const SITE_URL = 'https://www.maxinvitaciones.cl';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});