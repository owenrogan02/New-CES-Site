import { gsap, ScrollTrigger } from './gsap';

/** Sticky "feature story": text steps scroll past while a sticky stage swaps visuals. */
export function initStory() {
  document.querySelectorAll<HTMLElement>('[data-story]').forEach((root) => {
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    const visuals = Array.from(root.querySelectorAll<HTMLElement>('[data-visual]'));
    const rail = root.querySelector<HTMLElement>('[data-rail-fill]');
    const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-dot]'));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const set = (i: number) => {
        steps.forEach((s, n) => s.classList.toggle('is-active', n === i));
        visuals.forEach((v, n) => {
          v.classList.toggle('is-active', n === i);
          v.classList.toggle('is-before', n < i);
        });
        dots.forEach((d, n) => d.classList.toggle('is-on', n <= i));
      };
      set(0);
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 58%',
          end: 'bottom 58%',
          onToggle: (self) => { if (self.isActive) set(i); },
        });
      });
      if (rail) {
        gsap.fromTo(rail, { scaleY: 0 }, {
          scaleY: 1, ease: 'none', transformOrigin: 'top',
          scrollTrigger: { trigger: root.querySelector('[data-steps-col]') ?? root, start: 'top 58%', end: 'bottom 58%', scrub: 0.3 },
        });
      }
    });
  });
}
