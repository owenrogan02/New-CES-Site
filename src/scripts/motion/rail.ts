import { gsap } from './gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

/** Horizontal rail. Touch uses native scroll-snap; mouse users get drag + inertia and arrow buttons. */
export function initRail(fine: boolean) {
  document.querySelectorAll<HTMLElement>('[data-rail]').forEach((root) => {
    const viewport = root.querySelector<HTMLElement>('[data-rail-viewport]');
    const track = root.querySelector<HTMLElement>('[data-rail-track]');
    const prev = root.querySelector<HTMLButtonElement>('[data-rail-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-rail-next]');
    if (!viewport || !track) return;
    const step = () => (track.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 320;

    if (fine) {
      root.classList.add('is-drag');
      const minX = () => Math.min(0, viewport.clientWidth - track.scrollWidth);
      const d = Draggable.create(track, {
        type: 'x', inertia: true, edgeResistance: 0.85, cursor: 'grab', activeCursor: 'grabbing',
        bounds: { minX: minX(), maxX: 0 },
        allowContextMenu: true,
        onDrag: () => update(),
        onThrowUpdate: () => update(),
      })[0];
      const update = () => {
        prev?.toggleAttribute('disabled', d.x >= -2);
        next?.toggleAttribute('disabled', d.x <= minX() + 2);
      };
      const go = (dir: number) => {
        const target = Math.max(minX(), Math.min(0, gsap.getProperty(track, 'x') as number - dir * (step() + 16)));
        gsap.to(track, { x: target, duration: 0.9, ease: 'power3.out', onUpdate: () => { d.update(); update(); } });
      };
      prev?.addEventListener('click', () => go(-1));
      next?.addEventListener('click', () => go(1));
      window.addEventListener('resize', () => { d.applyBounds({ minX: minX(), maxX: 0 }); update(); });
      update();
    } else {
      prev?.addEventListener('click', () => viewport.scrollBy({ left: -(step() + 16), behavior: 'smooth' }));
      next?.addEventListener('click', () => viewport.scrollBy({ left: step() + 16, behavior: 'smooth' }));
    }
  });
}
