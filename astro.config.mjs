// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: "https://techagroa.github.io",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), vue(), svelte()]
});