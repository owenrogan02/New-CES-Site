import { gsap, ScrollTrigger } from './gsap';

export function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    if (Number.isNaN(end)) return;
    const obj = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: end,
          duration: 2.2,
          ease: 'power2.out',
          snap: { v: 1 },
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        }),
    });
  });
}
