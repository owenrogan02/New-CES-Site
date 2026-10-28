import { gsap, ScrollTrigger } from './gsap';

export function initReveal() {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  ScrollTrigger.batch(els, {
    start: 'top 90%',
    once: true,
    interval: 0.1,
    batchMax: 6,
    onEnter: (batch) => {
      batch.forEach((el, i) => {
        const kind = (el as HTMLElement).dataset.reveal;
        const to: gsap.TweenVars = { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: i * 0.08, ease: 'power4.out' };
        if (kind === 'clip') {
          Object.assign(to, { clipPath: 'inset(0 0 0% 0 round 24px)', duration: 1.1 });
        }
        to.onComplete = () => { el.classList.add('is-in'); gsap.set(el, { clearProps: 'transform,opacity,clip-path,visibility' }); };
        gsap.to(el, to);
      });
    },
  });
}
