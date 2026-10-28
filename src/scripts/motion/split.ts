import { gsap, SplitText, ScrollTrigger } from './gsap';

export async function initSplit() {
  await document.fonts.ready;
  document.querySelectorAll<HTMLElement>('[data-split]:not([data-split="now"])').forEach((el) => {
    const delay = Number(el.dataset.splitDelay ?? 0);
    const immediate = el.dataset.split === 'now';
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        el.classList.add('is-split');
        return gsap.from(self.lines, {
          yPercent: 112,
          duration: 1,
          stagger: 0.09,
          delay,
          ease: 'power4.out',
          scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 90%', once: true },
        });
      },
    });
  });
  ScrollTrigger.refresh();
}
