// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://JaviVinnas.github.io',
  base: '/personal-site',
  build: {
    sourcemap: true,
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});