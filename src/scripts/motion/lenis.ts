import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

declare global {
  interface Window { __lenis?: Lenis }
}

export function initLenis() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90 });
    });
  });

  // Menu open should lock scroll.
  new MutationObserver(() => {
    if (document.documentElement.classList.contains('menu-open')) lenis.stop();
    else lenis.start();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
