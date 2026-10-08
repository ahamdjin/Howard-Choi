import { imageVariants, mobileHeroVariants } from './responsive-image-data';
export const mobileHeroSource = (src: string) => mobileHeroVariants[src];

export function responsiveImageProps(src: string, sizes = '(max-width: 767px) 100vw, 50vw') {
  const local = imageVariants[src];
  if (local) return { ...local, sizes, loading: 'lazy' as const, decoding: 'async' as const };
  if (src.startsWith('https://images.unsplash.com/')) {
    const image = new URL(src);
    const srcSet = [480, 960, 1440].map((width) => {
      image.searchParams.set('w', String(width));
      image.searchParams.set('q', '80');
      return `${image.href} ${width}w`;
    }).join(', ');
    return { srcSet, sizes, loading: 'lazy' as const, decoding: 'async' as const };
  }
  return { loading: 'lazy' as const, decoding: 'async' as const };
}
