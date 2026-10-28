# New CES Site

A **design concept** for a redesigned cessoftware.com, built to show CES Software. It is **not** the live website: there is no custom domain, no DNS change, and every page is `noindex`. Published at `https://owenrogan02.github.io/New-CES-Site/`.

Astro (static) + GSAP + Lenis. All copy and images come from the live site (see `docs/content-inventory.md`).

## Commands
| | |
|---|---|
| `npm ci` | install |
| `npm run dev` | local dev server at `http://localhost:4321/New-CES-Site/` |
| `npm run check && npm run build` | type check and build to `dist/` (must pass before pushing) |
| `npm run preview` | serve the built site |
| `npm run shots` | after a build, screenshot every route at 1440px and 390px into `screenshots/` (add `-- --reduced` for reduced motion) |

## Layout
- `src/config/` site details, structured content (industries, modules, partners, news, FAQ) and the dealer-login placeholder copy
- `src/components/`, `src/layouts/`, `src/pages/` the site
- `src/scripts/motion/` animation modules, loaded only where needed (reduced-motion and touch fallbacks included)
- `docs/REDESIGN_PLAN.md` the plan, `docs/content-inventory.md` captured content and page mapping, `docs/copy-changes.md` every wording change
- `scripts/` extraction helpers and the screenshot tools

## Publishing
Pushes to `main` run `.github/workflows/deploy.yml`. In the repository, set **Settings → Pages → Source → GitHub Actions** once. Leave the custom domain empty.

## The dealer login
`/dealer-login/` is a visual placeholder. The form has no `action` and no field names, nothing is submitted, and nothing links to the real portal.
