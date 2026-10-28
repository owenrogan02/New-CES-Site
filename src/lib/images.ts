import type { ImageMetadata } from 'astro';

// Lazy glob so only images that are actually rendered get optimised and emitted.
const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{png,jpg,jpeg,webp,svg}');

/** Resolve an image by its path relative to src/assets/images (e.g. "pub.jpg"). */
export async function img(name: string): Promise<ImageMetadata> {
  const key = `/src/assets/images/${name.replace(/^\.?\/?(\.\.\/)?(images\/)?/, '')}`;
  const loader = all[key];
  if (!loader) throw new Error(`Image not found: ${name} (${key})`);
  return (await loader()).default;
}
