import { gsap } from './gsap';

/** "4 easy steps": connector line draws on scroll, nodes pop as it reaches them. */
export function initSteps() {
  document.querySelectorAll<HTMLElement>('[data-steps]').forEach((root) => {
    const line = root.querySelector<HTMLElement>('[data-line]');
    const nodes = root.querySelectorAll<HTMLElement>('[data-node]');
    const cards = root.querySelectorAll<HTMLElement>('[data-step-card]');
    if (line) {
      gsap.fromTo(line, { scaleX: 0, scaleY: 0 }, {
        scaleX: 1, scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 72%', end: 'bottom 70%', scrub: 0.4 },
      });
    }
    nodes.forEach((n, i) => {
      gsap.from(n, { scale: 0, duration: 0.7, ease: 'back.out(2.4)', scrollTrigger: { trigger: cards[i] ?? n, start: 'top 80%', once: true } });
    });
  });
}
