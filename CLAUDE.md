# New CES Site

A **design concept** for a redesigned cessoftware.com, built to show CES Software. It is **not** the live website: no custom domain, no DNS changes, and it is published only at `https://owenrogan02.github.io/New-CES-Site/`. It is an Astro static site with GSAP motion.

**Before doing any work, read `docs/REDESIGN_PLAN.md` and follow its phases in order.** Its §0 decisions are settled, so don't re-open them. Phase 0 (content capture) and its sitemap confirmation gate come before any page building.

- Never invent marketing copy, stats, testimonials or logos. All content comes from the live site via `docs/content-inventory.md`. The crawl is read-only.
- Never add a `CNAME` file or configure a custom domain. All internal URLs go through the base-path `url()` helper (the site lives under `/New-CES-Site/`).
- Every page is `noindex`. Do not add a sitemap or analytics.
- The dealer login is a visual placeholder only (plan §6). It never links to the real portal and never submits anything.
- `npm run check && npm run build` must pass before every push. Review the Playwright screenshots (`npm run shots`) before claiming a visual change works.
