import { gsap } from './gsap';

export function initFooter() {
  const mark = document.querySelector<HTMLElement>('[data-footer-mark]');
  if (!mark) return;
  const word = mark.querySelector('span');
  const dots = mark.querySelectorAll('i');
  const tl = gsap.timeline({ scrollTrigger: { trigger: mark, start: 'top 95%', once: true } });
  tl.from(word, { yPercent: 70, opacity: 0, duration: 1.2 })
    .from(dots, { scale: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(2.2)' }, '-=0.7');
}
