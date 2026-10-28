import { defineConfig } from 'astro/config';

// Design concept: published at the GitHub Pages project URL only (no custom domain).
const base = process.env.BASE_PATH ?? '/New-CES-Site/';

export default defineConfig({
  site: 'https://owenrogan02.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: false,
});
