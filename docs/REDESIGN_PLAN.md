# CES Software: website redesign concept plan

Status: **all decisions made, build autonomously**. Written for the build session to execute every phase end to end **without stopping for further decisions** (see §0 and §12). The only valid reason to stop is if cessoftware.com can't be reached (§1).

> ## ⚠️ This is a concept, not the live website
> This project is a **standalone design concept** of what a redesigned cessoftware.com *could* look like, built to be **shown to CES Software as an idea**.
> - It does **not** replace, connect to, or change the real cessoftware.com in any way.
> - **No DNS changes, no custom domain, no `CNAME` file.** It is published only at the GitHub Pages project URL: `https://owenrogan02.github.io/New-CES-Site/`.
> - The real site is used **only as a read-only content source** (copy, images, logo, colours).
> - It is kept out of search engines (§8) so it never competes with or duplicates the real site.
> - Nothing in it is functional beyond navigation. The **dealer login is a visual mock-up only** (§6).

## 0. Decisions already made (do not re-open)

| Topic | Decision |
|---|---|
| Purpose | **Design concept / pitch** shown to CES Software. Not production, not a replacement |
| Hosting | GitHub Pages project site (`owenrogan02.github.io/New-CES-Site/`), deployed by GitHub Actions. **No custom domain** |
| Stack | **Astro** (static output) + **GSAP** (ScrollTrigger, SplitText, Draggable/Inertia, DrawSVG, all free since 2025) + **Lenis** smooth scroll |
| Visual direction | **Clean, light, premium** (Stripe-like): mostly white, crisp type, vivid gradient accents, polished product mock-ups, a few deliberate dark "ink" bands for contrast |
| Motion level | **High-impact**: WebGL gradient hero, scroll-pinned storytelling, split-text reveals, counters, magnetic buttons, page transitions. Must degrade gracefully (reduced motion, touch, low power, no JS) |
| Content | **All existing content from cessoftware.com is kept** but may be restructured, merged and re-ordered |
| Forms | None. Contact = `mailto:` / `tel:` links using the real CES details |
| Dealer login | **Complete placeholder.** Shows *where* it lives in the new front end and what it would look like. No integration, no link to the real portal, never submits anything (§6) |
| Brand colour | **Use CES's existing primary brand colour** as `--brand` and build the gradient palette around it (§4.1) |
| Sitemap gate | **No pause.** Build the session's own best mapping using the §3 rules, and record it in `docs/content-inventory.md` for review afterwards |
| Copy | **Light polish**: body copy stays verbatim; headlines, eyebrows and button labels may be tightened, and long paragraphs split. No new claims or facts. Log every change in `docs/copy-changes.md` (original → new) |
| Missing content | **Omit** any section (testimonials, logos, stats, dealer map, etc.) that has no real content. No placeholders, no dummy content |
| Weak or missing imagery | Use **styled UI illustrations** (generic interface vignettes such as charts, tables and cards in the brand palette, SVG/HTML) inside device frames where real screenshots are missing or low quality. They must not imitate or claim to be CES's actual product screens. Real images are used wherever they are good enough |
| Concept footer note | **Removed.** No "design concept" note on the site (`noindex` safeguards stay) |
| Publishing | When everything passes §8–§9, **merge to `main` and push** to deploy (§10) |

## 1. Content source: capture first

The planning session could not reach cessoftware.com (network policy), so **no copy, images or sitemap have been captured yet**. The information architecture in §3 is therefore *provisional*. Phase 0 captures the real content, and the build session then decides the final sitemap itself (no confirmation pause).

> If `curl -sSI https://cessoftware.com/` fails from the build session too, stop and ask the user to add `cessoftware.com` and `www.cessoftware.com` to the environment's allowed domains. Do **not** invent placeholder marketing copy and present it as real content.

The crawl is **read-only**: only `GET` requests, at a polite rate (≤ 2 requests/second). Never submit forms or log in, and never follow the dealer-login link beyond recording its URL.

## 2. Phase plan (each phase = one or more commits, each ends green)

### Phase 0: Content capture and inventory
1. Write `scripts/capture.mjs` (Playwright is pre-installed: `require('playwright')`, `chromium.launch()`):
   - Seed from `https://cessoftware.com/`, plus `/sitemap.xml`, `/sitemap_index.xml` and `/robots.txt` if present.
   - Breadth-first crawl of same-origin `<a href>` links (strip hashes and query strings, cap ~200 pages, skip login/account paths).
   - Per page, save: final URL, `<title>`, meta description, H1–H4 outline, full visible text in reading order (prefer `main`/`article`, falling back to `body` minus header and footer), every CTA (text + href), every image (src, alt, rendered size), every outbound link, and any embedded video or map.
   - Save full-page screenshots at 1440px and 390px wide (for before/after reference, not for committing).
   - Download the images and documents that are referenced to `capture/assets/`.
   - If the site is WordPress (`/wp-json/` responds), also pull `/wp-json/wp/v2/pages?per_page=100` and `/posts` for clean copy.
2. Output `docs/content-inventory.md`: one section per URL with the copy **verbatim**, the CTAs, the images and the outbound links. Record specifically:
   - the logo (SVG if available) and brand colours (sample computed styles: primary, secondary, link colour)
   - **where the dealer login appears** on the current site (header, footer, menu) and its label, used only to decide placement in the concept
   - contact details (phone, email, address, hours), social links, legal pages
   - product names, pricing (if any), downloads, support or knowledge-base links
3. Add `capture/` to `.gitignore` (raw dumps and screenshots). Commit the inventory and **only** the assets that will be used (they move to `src/assets/` in Phase 3).
4. Produce a mapping table `current page → concept page/section` (§3) at the top of `docs/content-inventory.md`, then **carry straight on** (no confirmation pause). Every inventoried piece of content must appear in the table: nothing is silently dropped.

### Phase 1: Project scaffold and deploy pipeline
- `npm create astro@latest` (minimal template, TypeScript strict). Pin exact versions in `package.json`, use the current stable releases, and commit `package-lock.json`.
- Dependencies: `gsap`, `lenis`, `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, `@fontsource/instrument-serif`. No UI framework (React/Vue) is needed, and none should be added unless a component really requires one.
- `astro.config.mjs`: `site: 'https://owenrogan02.github.io'`, `base: process.env.BASE_PATH ?? '/New-CES-Site/'`, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`.
- **No `public/CNAME`.** Do not configure a custom domain anywhere.
- `.github/workflows/deploy.yml`: on push to `main` and `workflow_dispatch`, using `withastro/action` then `actions/deploy-pages` (permissions `pages: write`, `id-token: write`, concurrency group `pages`).
- **Base path discipline:** because the site lives under `/New-CES-Site/`, every internal link and `public/` asset URL goes through a `url()` helper built on `import.meta.env.BASE_URL`. Never hard-code a leading `/`. (Images imported via `astro:assets` handle this automatically.)
- Add npm scripts: `dev`, `build`, `preview`, `check` (`astro check`), `shots` (Playwright screenshot script, §9).

### Phase 2: Design system and global shell
Tokens, typography, layout primitives, header (including the Dealer Login button), footer, mobile menu, motion utilities and the WebGL gradient. Detailed in §4–§6. Build a hidden `/styleguide/` page showing every token and component, and use it for review.

### Phase 3: Pages
Build the pages in the mapped IA order (Home first, then the dealer-login placeholder), using the section components in §5. Move the captured assets into `src/assets/` and render them through `astro:assets` `<Image>`/`<Picture>`.

### Phase 4: Motion pass
Wire up the animations in §5 section by section, then do the reduced-motion and touch fallbacks, then performance tuning.

### Phase 5: QA and publish the concept
Run the checks in §8–§9, then publish to GitHub Pages (§10).

## 3. Information architecture (provisional, finalised by the build session after Phase 0)

CES Software sells (at least partly) **through dealers**. The likely structure is below. Adjust it to the real content, preferring **fewer, richer pages** over many thin ones.

```
/                       Home: story of the product(s), proof, CTA
/products/              Overview (only if >1 product), bento grid
/products/<slug>/       One page per product: features, screenshots, specs, FAQ
/solutions/ or /industries/   Only if the current site segments by audience
/dealers/               Become a dealer / find a dealer (if the current site has dealer content)
/support/               Support, downloads, docs links, contact for help
/about/                 Company story, team or values, history
/contact/               Contact details (mailto/tel), address, map image, hours
/dealer-login/          Placeholder mock-up (§6)
/privacy/, /terms/ etc. Legal pages carried over verbatim
/404.html               Custom 404 (GitHub Pages serves 404.html)
```

Restructuring rules:
- Merge pages under ~150 words into the most relevant richer page.
- Copy follows the **light polish** rule (§0): body copy verbatim; headlines, eyebrows and button labels may be tightened; every change is logged in `docs/copy-changes.md`.
- Navigation: at most 5 top-level items, plus **Dealer Login** as a secondary (ghost) button and the primary CTA ("Contact us" or the current primary CTA) on the right.
- Products with several pages use a mega-menu dropdown (product name, one-line description, icon).
- No redirects are needed: this concept doesn't replace any live URLs.

## 4. Design system

### 4.1 Colour (OKLCH custom properties in `src/styles/tokens.css`)
Use the **current CES brand primary** captured in Phase 0 as `--brand` (decided). Build `--grad-2..4` as harmonious hues around it (analogous + one warm accent), and derive `--brand-ink` for text contrast. The values below are fallbacks, used only if no brand colour can be found:

```css
:root {
  --ink: oklch(18% 0.03 265);        /* headings, dark bands */
  --ink-2: oklch(38% 0.02 265);      /* body text */
  --ink-3: oklch(55% 0.015 265);     /* muted/secondary */
  --paper: oklch(100% 0 0);          /* page bg */
  --paper-2: oklch(98% 0.005 265);   /* alt section bg */
  --line: oklch(92% 0.01 265);       /* hairlines, card borders */
  --brand: <CES primary>;            /* fallback oklch(55% 0.22 270) */
  --brand-ink: <brand at ~35% L>;    /* brand text on white, ≥4.5:1 */
  --grad-1: <brand>;                 /* 4-stop hero gradient, analogous + one warm */
  --grad-2: oklch(70% 0.17 230);
  --grad-3: oklch(72% 0.19 330);
  --grad-4: oklch(82% 0.15 70);
  --radius-s: 8px; --radius-m: 14px; --radius-l: 24px;
  --shadow-card: 0 1px 2px oklch(0% 0 0 / .04), 0 8px 24px -8px oklch(30% 0.05 265 / .12);
  --shadow-float: 0 30px 60px -20px oklch(30% 0.08 265 / .25);
}
```
- Light theme only (no dark-mode toggle). Dark "ink" bands (CTA band, stats, footer) use `--ink` backgrounds with `--paper` text.
- Gradients are for accents (hero canvas, highlighted word, card glows, CTA borders). Body text is never placed on a gradient without a solid or blurred backing at ≥4.5:1 contrast.

### 4.2 Typography
- **Geist Variable** for headings and body; **Instrument Serif Italic** for a single emphasised word or phrase in key headlines (premium editorial touch, used sparingly: max one per section); **Geist Mono** for eyebrows, labels, stats units and code-like details.
- Fluid scale with `clamp()`: display 3rem→6rem (letter-spacing −0.035em, line-height 1.0), h1 2.5→4rem, h2 2→3rem, h3 1.25→1.5rem, body 1.0625rem/1.6, small 0.875rem.
- Self-hosted via Fontsource. Preload only the Geist woff2 used above the fold; `font-display: swap`; use metric-matched fallbacks (`size-adjust`) to avoid layout shift.

### 4.3 Layout
- Container max 1200px (wide 1360px for bento and hero), gutters `clamp(16px, 4vw, 40px)`, 12-column CSS grid.
- Section vertical rhythm `clamp(80px, 12vw, 160px)`.
- Breakpoints: 640 / 900 / 1200. Design mobile-first, with no horizontal scroll at 360px.

### 4.4 Components (`src/components/`)
`Header`, `MobileMenu`, `Footer`, `Button` (primary / secondary / ghost / link-arrow; magnetic on fine pointers), `DealerLoginButton`, `Eyebrow`, `SectionHeading` (eyebrow + split-reveal title + lede), `Card` (spotlight border), `BentoGrid`, `FeatureStory` (pinned), `StatCounter`, `LogoMarquee`, `Testimonials`, `DeviceFrame` (browser/laptop/phone chrome around screenshots), `FAQ` (`<details>` based), `CTABand`, `GradientCanvas`, `Breadcrumbs`, `ContactCard`, `DownloadList`, `LegalProse`, `LoginCard`, `Toast`.

## 5. Motion and section spec

### 5.1 Motion architecture (`src/scripts/motion/`)
- `index.ts`: entry, loaded on every page via an Astro `<script>`. It checks `prefers-reduced-motion`, `(pointer: fine)` and `navigator.connection?.saveData`, sets `html.classList.add('js', 'motion-ok' | 'motion-reduced')`, then dynamically imports feature modules **only when their elements exist on the page**.
- **Progressive enhancement:** initial hidden states (opacity 0, translate) are applied only under `.js.motion-ok`, so without JS or with reduced motion all content is visible and static.
- `lenis.ts`: Lenis (`lerp: 0.1`, smoothing off on touch) synced to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`). Not started under reduced motion. Anchor links go through `lenis.scrollTo` with a header offset.
- `reveal.ts`: `[data-reveal]` (`fade-up` | `fade` | `scale` | `clip`) via `ScrollTrigger.batch`, with a 0.08s stagger for children of `[data-reveal-group]`. It runs once and never re-hides.
- `split.ts`: `[data-split]` headings use SplitText (lines, masked) with `autoSplit: true` so they re-split on resize or font load. Lines rise from 100% with `power4.out`, 0.9s, staggered 0.08s. `aria-label` stays intact because SplitText handles a11y.
- `magnetic.ts`: buttons follow the pointer by up to 6px using `gsap.quickTo`, on fine pointers only.
- `spotlight.ts`: one pointermove listener per grid sets `--mx/--my` on cards for a radial-gradient border glow (CSS only does the painting).
- `counters.ts`, `pin-story.ts`, `marquee.ts` (CSS animation with JS only for pause-offscreen), `draw-path.ts`, `tilt.ts`, `carousel.ts`.
- Easing vocabulary (use only these): `power4.out` (entrances), `power2.inOut` (scrubbed), `expo.out` (UI micro-interactions), plus durations of 0.2 / 0.4 / 0.9s.
- Everything is cleaned up on `pagehide`. Use `gsap.matchMedia()` for all breakpoint- and reduced-motion-dependent timelines.

### 5.2 Page transitions
Use **native cross-document View Transitions** (`@view-transition { navigation: auto; }` in global CSS), *not* Astro's `<ClientRouter />`. This keeps GSAP/Lenis lifecycles simple (each page is a normal load).
- The header has `view-transition-name: site-header`, so it stays put.
- `main` gets a custom 300ms fade plus 12px slide (`::view-transition-old/new(root)`).
- Product cards → product page hero image share a `view-transition-name` per slug, so the image morphs between pages.
- The Dealer Login button → login card share a `view-transition-name`, so the button visibly "opens" into the sign-in card.
- Browsers without support simply navigate normally. Disable under reduced motion.

### 5.3 Hero WebGL gradient (`GradientCanvas`)
- A custom, dependency-free WebGL2 fragment shader (~4–6 KB): an animated mesh gradient using `--grad-1..4` read from CSS, simplex-noise flow, and slight grain. Rendered into an angled (skewed −6°) band behind the hero, like Stripe.
- Lazy-initialised after first paint (`requestIdleCallback`). Before it loads, a static CSS gradient of the same colours is shown, which is also the permanent fallback (no WebGL2, reduced motion, `saveData`).
- Pauses when offscreen (IntersectionObserver) or when the tab is hidden. DPR is capped at 1.5 (1 on mobile), and the frame is throttled if frames drop below ~45fps.
- Scroll coupling: the band's skew and saturation ease slightly as the hero scrolls out (scrubbed).

### 5.4 Section-by-section (Home; other pages reuse the same parts)
| # | Section | Content source | Motion |
|---|---|---|---|
| 1 | **Hero** | Current H1/tagline, primary + secondary CTA | Gradient canvas; headline split-line reveal with an italic serif word; CTAs fade up after the headline; a product mock-up (`DeviceFrame` with a real screenshot) floats in from below with a 3D tilt (`rotateX 18°→0` as you scroll) and pointer parallax ±4° on fine pointers; 2–3 floating UI "chips" (e.g. key benefits) drift on separate parallax depths |
| 2 | **Trust strip** | Current client logos / accreditations / "trusted by" (if any; otherwise key facts) | Infinite marquee, grayscale→colour on hover, edge fade masks, pauses offscreen |
| 3 | **Products / what we do** | Product list | Bento grid (one large and several small cards) with spotlight borders, hover lift (`translateY -4px`, shadow-float), staggered reveal; card image subtly zooms on hover |
| 4 | **Feature story** | Top 3–5 features / benefits | **Pinned** (desktop ≥900px): text steps on the left scroll by while a sticky device frame on the right cross-fades or slides between screenshots; a progress rail fills. On mobile it un-pins into stacked cards with reveals |
| 5 | **How it works / process** | Current process, onboarding or "why us" | SVG connector path draws on scroll (DrawSVG, scrubbed), and step nodes pop in as the line reaches them |
| 6 | **Stats** (dark ink band) | Years in business, customers, dealers, installs, etc., **only real figures from the current site** | Counters tween from 0 with snap, triggered once; a subtle gradient glow drifts behind |
| 7 | **Dealer network** | Current dealer content (if any) | Dotted SVG map with pulsing dealer-region points; CTAs to `/dealers/` and the Dealer Login placeholder |
| 8 | **Testimonials** | Current quotes (verbatim; omit the section if none) | Draggable carousel (Draggable + Inertia, snap to card), keyboard arrows, autoplay off |
| 9 | **CTA band** | Current contact CTA | Large split headline; button with an animated conic-gradient border; magnetic |
| 10 | **Footer** | Nav, contact, legal, social, dealer links | Oversized "CES" wordmark that rises/clips in as the footer enters; link hover underline grows |

Global chrome:
- **Header:** transparent over the hero, then switches to a frosted backdrop (`backdrop-filter: blur(14px) saturate(1.4)`, hairline border) after 24px of scroll. It hides when scrolling down and reappears when scrolling up. The active nav link has a sliding pill indicator.
- **Mobile menu:** full-screen sheet with links staggering in, focus trap, `Esc` closes, `inert` on the page behind it.
- **Scroll progress:** 2px gradient bar at the top of long pages (product, about, legal) only.

### 5.5 Product page template
Hero (product name and one-liner, `DeviceFrame` screenshot with tilt-in, shared view-transition with the product card) → feature grid (icon cards, spotlight) → feature story (pinned, reused) → specs / requirements table → downloads (if any) → FAQ accordion (animated height via `interpolate-size: allow-keywords`, with a GSAP fallback) → CTA band.

### 5.6 Fallback matrix
| Condition | Behaviour |
|---|---|
| `prefers-reduced-motion: reduce` | No Lenis, no pins, no parallax/tilt, no split reveals (text static), static gradient, counters show final values, view transitions off. Simple opacity fades (≤200ms) are allowed |
| Touch / coarse pointer | No magnetic, tilt, spotlight or pointer parallax; native scrolling; pins only at ≥900px |
| No JS | All content visible, nav works (CSS `:has`/`details` menu fallback), static gradient |
| `saveData` or no WebGL2 | Static gradient image |

## 6. Dealer login: complete placeholder

**Purpose:** to show CES *where* dealer sign-in would sit in the new front end and how it would look. It is **purely visual**: no integration, no link to the real dealer portal, and no data is ever sent anywhere.

### 6.1 Where it appears in the concept
| Location | Treatment |
|---|---|
| **Desktop header** (top right, every page) | "Dealer Login" ghost button with a lock icon, placed left of the primary "Contact us" button. Always visible, including in the frosted header state |
| **Mobile menu** | Full-width secondary button pinned at the bottom of the menu sheet, under the nav links |
| **Footer** | A "Dealers" column: *Become a dealer* (→ `/dealers/` if that page exists), *Dealer Login* (→ `/dealer-login/`) |
| **Home: Dealer network section** (if included) | Secondary CTA "Dealer Login" alongside "Become a dealer" |
| **`/dealers/` page** (if included) | Callout card: "Already a CES dealer? Sign in →" |

Every one of these links goes to the internal `/dealer-login/` page. **None of them link to the real dealer portal.** (The real portal's URL is only recorded in the inventory to mirror its placement.)

### 6.2 `/dealer-login/` page
- Split layout on desktop: on the left, a premium sign-in card (`LoginCard`); on the right, a soft animated gradient panel with a short dealer value proposition built from the current dealer copy (if any), or else just the CES logo and "Dealer Portal". On mobile, only the card, over a gradient background.
- Card contents: CES logo, "Dealer Portal" title, "Sign in to your dealer account" subtitle, email and password fields (with show/hide password toggle), "Remember me" checkbox, "Forgot password?" link, a "Sign in" primary button, and a footer link "Not a dealer yet? Become a dealer".
- Micro-interactions (to make the mock-up feel real): floating labels, focus glow on fields, a button loading spinner for ~800ms on submit, then a friendly toast.
- **Behaviour:**
  - The `<form>` has **no `action`** and the fields have **no `name` attributes**, so nothing can be submitted. The submit handler calls `preventDefault()`, runs the spinner, and shows the toast: *"This is a design preview. Dealer sign-in isn't connected in this concept."*
  - "Forgot password?" shows the same toast. "Become a dealer" goes to `/dealers/` (or `/contact/` if there is no dealers page).
  - Use `autocomplete="off"`, and never store, log or transmit the field values.
  - A small "Concept preview" badge sits on the card.
- All copy for this page lives in `src/config/site.ts` (`dealerLogin` object), so the wording can be changed in one place.

## 7. Project structure

```
.github/workflows/deploy.yml
public/favicon.svg, robots.txt, og-default.png        (no CNAME)
scripts/capture.mjs, scripts/shots.mjs
docs/REDESIGN_PLAN.md, docs/content-inventory.md
src/
  assets/            images (optimised by astro:assets), logo.svg
  components/        see §4.4 (one folder per complex component if needed)
  config/site.ts     name, nav, contact details, socials, dealerLogin copy, concept note
  content/           content collections: products/*.md, testimonials.json, faqs, stats.json, legal/*.md
  content.config.ts  zod schemas for the collections
  layouts/Base.astro head/meta, header, footer, skip link, motion entry
  pages/             routes per §3
  scripts/motion/    see §5.1
  styles/            tokens.css, global.css (reset, type, utilities), transitions.css
```
Copy lives in `src/content/` and `site.ts`, not hard-coded across components, so the user can edit text without touching layout code.

## 8. Quality bars (must pass before publishing the concept)

**Performance** (Lighthouse mobile, home and one product page). The concept must *feel* fast when demoed:
- Performance ≥ 95, LCP < 2.0s, CLS < 0.05, TBT < 150ms
- JS on Home ≤ 90 KB gzipped total (GSAP core + ScrollTrigger + SplitText + Lenis + own code); other pages load only what they use
- Hero LCP element is the headline text (not the canvas or an image); the hero mock-up image is `fetchpriority="high"` with explicit dimensions
- All images AVIF/WebP with responsive `srcset` and explicit width/height; below-the-fold images lazy

**Accessibility:** WCAG 2.2 AA
- Contrast ≥ 4.5:1 for body text and ≥ 3:1 for UI and large text, including text over gradients
- Visible `:focus-visible` rings, a skip link, landmarks, one H1 per page, logical heading order
- Every image has meaningful `alt` (improve empty alts from the current site); decorative images use `alt=""`
- Carousel and menus are keyboard operable; pinned sections stay readable when navigated by keyboard; no content is reachable only by hover
- Lighthouse Accessibility = 100, and axe (via Playwright) reports no serious or critical issues

**Concept safeguards (must be in place):**
- `<meta name="robots" content="noindex, nofollow">` on **every** page, and `public/robots.txt` with `User-agent: * / Disallow: /`. The concept must never appear in search results or compete with the real cessoftware.com.
- No sitemap, no canonical tags pointing at cessoftware.com, and no analytics or tracking.
- Page titles keep the current site's titles. Meta descriptions are kept so the demo looks complete.
- **No** "design concept" footer note (decided).
- Custom `404.astro` that respects the base path.

## 9. Verification workflow for the build session

- `scripts/shots.mjs`: build and preview, then use Playwright to capture full-page screenshots of every route at **390, 768 and 1440px**, once with `reducedMotion: 'reduce'` and once normally (after scrolling through the page to trigger reveals). Review these images after every phase. Never claim a visual result without looking at the screenshots.
- Optionally produce side-by-side before/after images (the current-site screenshots from Phase 0 next to the concept). These are useful for the pitch.
- Run Lighthouse via Chromium at `/opt/pw-browsers/chromium` (`--headless --no-sandbox`) on Home and one product page in Phase 5.
- Check for: horizontal overflow at 360px, console errors, broken internal links (a crawl of the built `dist/`), and any link that resolves outside `/New-CES-Site/` by mistake.
- Test the dealer-login page: submitting the form makes **no network request** (assert with Playwright's `page.on('request')`).
- `npm run check && npm run build` must pass before every push.

## 10. Publishing the concept

1. When §8–§9 pass, the build session **merges to `main` and pushes** (decided), which makes the workflow deploy. The user sets repo **Settings → Pages → Source → GitHub Actions** once (the session can't change repo settings; if the first deploy fails for that reason, say so). Leave **Custom domain empty**.
2. The concept is then live at **`https://owenrogan02.github.io/New-CES-Site/`**. Share this link with CES.
3. Note: a GitHub Pages site is publicly reachable by anyone with the link (even from a private repo on paid plans). The noindex safeguards in §8 keep it out of search engines. If it should be fully private, unpublish Pages after the demo, or share a screen recording instead.
4. **Do not change any DNS records or anything about the real cessoftware.com.** If CES later adopts the design, going live becomes a separate project (custom domain, redirects, SEO, real dealer portal), and it is out of scope here.

## 11. Out of scope
Making this the live website, custom domain or DNS work, working dealer authentication or any link to the real dealer portal, forms or back-end, CMS integration, blog creation (unless the current site has a blog, which is then migrated as a content collection), analytics, dark mode, and multi-language.

## 12. Decisions log (all resolved, do not ask again)
1. Sitemap mapping: decided by the build session, recorded in `docs/content-inventory.md`.
2. Copy edits: light polish, logged in `docs/copy-changes.md`.
3. Brand colour: CES's existing primary.
4. Footer concept note: removed.
5. Missing testimonials, logos or stats: section omitted.
6. Weak or missing product imagery: styled UI illustrations.
7. Publishing: merge to `main` and deploy when QA passes.
