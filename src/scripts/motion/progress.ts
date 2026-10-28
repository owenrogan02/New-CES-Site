import { gsap } from './gsap';

export function initProgress() {
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
}
