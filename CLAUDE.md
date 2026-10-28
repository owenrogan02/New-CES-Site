# New CES Site

Redesign of cessoftware.com: an Astro static site with GSAP motion, hosted on GitHub Pages at the custom domain cessoftware.com.

**Before doing any work, read `docs/REDESIGN_PLAN.md` and follow its phases in order.** Its §0 decisions are settled, so don't re-open them. Phase 0 (content capture) and its sitemap confirmation gate come before any page building.

- Never invent marketing copy, stats, testimonials or logos. All content comes from the live site via `docs/content-inventory.md`.
- `npm run check && npm run build` must pass before every push. Review the Playwright screenshots (`npm run shots`) before claiming a visual change works.
- The dealer login is a non-functional placeholder (plan §6). It must never submit credentials anywhere.
