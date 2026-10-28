import { initHeader } from './header';
import { initMedia } from './media';

const root = document.documentElement;
const motionOk = root.classList.contains('motion-ok');
const fine = window.matchMedia('(pointer: fine)').matches;
const has = (sel: string) => document.querySelector(sel) !== null;

initHeader();
initMedia();

// Safety net: never leave headings hidden if the motion bundle fails to load.
const safety = window.setTimeout(() => {
  document.querySelectorAll('[data-split]').forEach((el) => el.classList.add('is-split'));
}, 3500);

async function boot() {
  if (!motionOk) {
    window.clearTimeout(safety);
    if (has('[data-gradient]')) void import('./gradient').then((m) => m.initGradient({ animate: false }));
    return;
  }
  const { gsap } = await import('./gsap');
  void gsap;
  await import('./lenis').then((m) => m.initLenis());
  await Promise.all([
    import('./reveal').then((m) => m.initReveal()),
    import('./split').then((m) => m.initSplit()),
    import('./counters').then((m) => m.initCounters()),
    import('./footer').then((m) => m.initFooter()),
    has('[data-story]') ? import('./story').then((m) => m.initStory()) : null,
    has('[data-steps]') ? import('./steps').then((m) => m.initSteps()) : null,
    has('[data-hero-visual]') ? import('./hero').then((m) => m.initHero(fine)) : null,
    has('[data-rail]') ? import('./rail').then((m) => m.initRail(fine)) : null,
    has('[data-marquee]') ? import('./marquee').then((m) => m.initMarquee()) : null,
    has('[data-progress]') ? import('./progress').then((m) => m.initProgress()) : null,
    has('[data-gradient]') ? import('./gradient').then((m) => m.initGradient({ animate: !root.classList.contains('save-data') })) : null,
    fine ? import('./pointer').then((m) => m.initPointer()) : null,
  ]);
  window.clearTimeout(safety);
}
void boot();
