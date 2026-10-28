/** Prefix an internal path with the site base ("/New-CES-Site/"). Never hard-code a leading "/". */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+/, '');
  if (!clean) return `${base}/`;
  const hasExt = /\.[a-z0-9]+$/i.test(clean.split('#')[0].split('?')[0]);
  const withSlash = hasExt || clean.includes('#') || clean.includes('?') || clean.endsWith('/') ? clean : `${clean}/`;
  return `${base}/${withSlash}`;
}
