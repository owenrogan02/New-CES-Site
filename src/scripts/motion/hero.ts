import { gsap, ScrollTrigger } from './gsap';

export function initHero(fine: boolean) {
  const stage = document.querySelector<HTMLElement>('[data-hero-visual]');
  if (!stage) return;
  const device = stage.querySelector<HTMLElement>('[data-device]');
  const chips = stage.querySelectorAll<HTMLElement>('[data-depth]');
  const hero = stage.closest<HTMLElement>('[data-hero]') ?? stage;

  if (device) {
    gsap.fromTo(device,
      { opacity: 0, y: 90, rotateX: 18, scale: 0.94, transformPerspective: 1400, transformOrigin: '50% 100%' },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.7, delay: 0.55, ease: 'power4.out' });
    gsap.to(device, {
      y: -40, scale: 0.97, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 },
    });
  }
  chips.forEach((c, i) => {
    gsap.from(c, { opacity: 0, y: 30, scale: 0.9, duration: 1, delay: 1.2 + i * 0.15 });
  });

  if (fine) {
    const rx = gsap.quickTo(stage, 'rotationX', { duration: 0.9, ease: 'power3.out' });
    const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    gsap.set(stage, { transformPerspective: 1400 });
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      ry(nx * 4); rx(-ny * 3);
      chips.forEach((c) => {
        const depth = Number(c.dataset.depth ?? 1);
        gsap.to(c, { x: nx * 10 * depth, duration: 1, overwrite: 'auto', ease: 'power3.out' });
      });
    });
    hero.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }
  ScrollTrigger.refresh();
}
