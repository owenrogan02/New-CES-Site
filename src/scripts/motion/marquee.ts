export function initMarquee() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.target as HTMLElement).classList.toggle('paused', !e.isIntersecting));
  });
  document.querySelectorAll('[data-marquee]').forEach((m) => io.observe(m));
}
