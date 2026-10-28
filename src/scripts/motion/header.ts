/** Header behaviour: scroll state, hide-on-scroll-down, sliding pill, dropdowns, mobile menu. No GSAP needed. */
export function initHeader() {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // --- scroll state ---
  let last = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 24);
      const down = y > last && y > 160;
      const locked = root.classList.contains('menu-open') || header.querySelector('.open, :focus-within');
      header.classList.toggle('hide', down && !locked);
      last = y;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- sliding pill ---
  const list = header.querySelector<HTMLElement>('[data-nav-list]');
  const pill = header.querySelector<HTMLElement>('[data-nav-pill]');
  if (list && pill) {
    const move = (el: HTMLElement | null) => {
      if (!el) { pill.classList.remove('on'); return; }
      pill.style.setProperty('--x', `${el.offsetLeft}px`);
      pill.style.setProperty('--w', `${el.offsetWidth}px`);
      pill.classList.add('on');
    };
    list.querySelectorAll<HTMLElement>(':scope > li:not(.pill)').forEach((li) => {
      li.addEventListener('pointerenter', () => move(li));
      li.addEventListener('focusin', () => move(li));
    });
    list.addEventListener('pointerleave', () => move(null));
    list.addEventListener('focusout', (e) => { if (!list.contains(e.relatedTarget as Node)) move(null); });
  }

  // --- dropdown panels (click for touch / keyboard) ---
  const panels = Array.from(header.querySelectorAll<HTMLElement>('.has-panel'));
  const closeAll = (except?: HTMLElement) => panels.forEach((p) => {
    if (p === except) return;
    p.classList.remove('open');
    p.querySelector('button')?.setAttribute('aria-expanded', 'false');
  });
  panels.forEach((p) => {
    const btn = p.querySelector('button');
    btn?.addEventListener('click', () => {
      const open = !p.classList.contains('open');
      closeAll(p);
      p.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    p.addEventListener('pointerenter', () => btn?.setAttribute('aria-expanded', 'true'));
    p.addEventListener('pointerleave', () => btn?.setAttribute('aria-expanded', 'false'));
  });
  document.addEventListener('click', (e) => { if (!(e.target as HTMLElement).closest('.has-panel')) closeAll(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); closeMenu(); } });

  // --- mobile menu ---
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const openBtn = header.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
  const inertTargets = () => Array.from(document.querySelectorAll<HTMLElement>('[data-main], .site-footer, .site-header, .skip-link'));
  function openMenu() {
    if (!menu) return;
    root.classList.add('menu-open');
    menu.setAttribute('aria-hidden', 'false');
    openBtn?.setAttribute('aria-expanded', 'true');
    inertTargets().forEach((el) => el.setAttribute('inert', ''));
    menu.querySelectorAll<HTMLElement>('[data-mm-item]').forEach((li, i) => li.style.setProperty('--i', String(i)));
    window.setTimeout(() => closeBtn?.focus(), 60);
  }
  function closeMenu() {
    if (!menu || !root.classList.contains('menu-open')) return;
    root.classList.remove('menu-open');
    menu.setAttribute('aria-hidden', 'true');
    openBtn?.setAttribute('aria-expanded', 'false');
    inertTargets().forEach((el) => el.removeAttribute('inert'));
    openBtn?.focus();
  }
  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    root.classList.remove('menu-open');
    inertTargets().forEach((el) => el.removeAttribute('inert'));
  }));
  window.matchMedia('(min-width: 1061px)').addEventListener('change', (m) => { if (m.matches) closeMenu(); });
}
