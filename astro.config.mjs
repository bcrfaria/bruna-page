// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://julia-script.github.io',
  // Site servido em /bruna-page. Ao apontar o domínio próprio, apagar a linha
  // abaixo e trocar `site` pelo domínio, senão os caminhos ficam errados.
  base: '/bruna-page',
});
