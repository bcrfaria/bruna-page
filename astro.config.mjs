// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://brunafaria.com.br',
  integrations: [
    sitemap({
      namespaces: {
        news: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
});
