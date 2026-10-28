// Usage: node scripts/shots.mjs [--routes=/,/touch/] [--widths=1440,390] [--reduced] [--out=screenshots]
// Serves dist/ via `astro preview`, scrolls each page to trigger reveals, saves full-page screenshots.
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=').slice(1).join('=');
const base = '/New-CES-Site';
const widths = arg('widths', '1440,390').split(',').map(Number);
const out = arg('out', 'screenshots');
const reduced = process.argv.includes('--reduced');
const port = 4399;

function allRoutes(dir = 'dist', prefix = '') {
  let r = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory() && !f.startsWith('_')) r = r.concat(allRoutes(p, `${prefix}/${f}`));
    else if (f === 'index.html') r.push(prefix || '/');
  }
  return r;
}
let routes = arg('routes', 'all') === 'all' ? allRoutes().map((r) => (r === '/' ? '/' : `${r}/`)) : arg('routes', '/').split(',');
if (arg('routes', 'all') === 'all') routes = routes.filter((r) => !r.startsWith('/styleguide'));

const srv = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 3500));
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const errors = [];
try {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w > 700 ? 900 : 844 }, reducedMotion: reduced ? 'reduce' : 'no-preference', deviceScaleFactor: 1 });
    for (const route of routes) {
      const page = await ctx.newPage();
      page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${w}] ${route} console: ${m.text()}`); });
      page.on('pageerror', (e) => errors.push(`[${w}] ${route} pageerror: ${e.message}`));
      page.on('requestfailed', (r) => { if (!r.url().includes('youtube')) errors.push(`[${w}] ${route} requestfailed: ${r.url()}`); });
      await page.goto(`http://localhost:${port}${base}${route === '/' ? '/' : route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(reduced ? 300 : 2200);
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(reduced ? 20 : 110); }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(reduced ? 200 : 900);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) errors.push(`[${w}] ${route} horizontal overflow ${overflow}px`);
      const name = `${route.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home'}-${w}${reduced ? '-reduced' : ''}.png`;
      await page.screenshot({ path: join(out, name), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  srv.kill();
}
console.log(errors.length ? `Issues:\n${errors.join('\n')}` : 'No console errors, failed requests or horizontal overflow.');
