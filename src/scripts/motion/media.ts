/** YouTube click-to-load facade + dealer-login placeholder behaviour (nothing is ever submitted). */
export function initMedia() {
  document.querySelectorAll<HTMLElement>('[data-yt]').forEach((box) => {
    const btn = box.querySelector<HTMLButtonElement>('button');
    btn?.addEventListener('click', () => {
      const src = box.dataset.yt!;
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.title = box.dataset.title ?? 'Video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      box.appendChild(frame);
      box.classList.add('playing');
    });
  });

  const form = document.querySelector<HTMLFormElement>('[data-login-form]');
  if (form) {
    const toast = document.querySelector<HTMLElement>('[data-toast]');
    let timer = 0;
    const show = () => {
      if (!toast) return;
      toast.classList.add('show');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => toast.classList.remove('show'), 4200);
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
      btn?.classList.add('loading');
      window.setTimeout(() => { btn?.classList.remove('loading'); show(); }, 800);
    });
    document.querySelectorAll('[data-toast-link]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); show(); }));
    form.querySelector('[data-pw-toggle]')?.addEventListener('click', (e) => {
      const input = form.querySelector<HTMLInputElement>('[data-pw]');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      (e.currentTarget as HTMLElement).setAttribute('aria-pressed', String(show));
    });
  }
}
