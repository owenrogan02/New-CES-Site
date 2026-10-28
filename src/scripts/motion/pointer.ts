import { gsap } from './gsap';

/** Fine-pointer only: magnetic buttons + spotlight cards. */
export function initPointer() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'expo.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(Math.max(-6, Math.min(6, dx * 0.18)));
      yTo(Math.max(-6, Math.min(6, dy * 0.25)));
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  document.addEventListener('pointermove', (e) => {
    const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}
