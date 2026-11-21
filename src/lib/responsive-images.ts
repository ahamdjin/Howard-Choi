import { guideImageSizes } from "./guide-image-sizes";
import { imageVariants, mobileHeroVariants } from './responsive-image-data';
export const mobileHeroSource = (src: string) => mobileHeroVariants[src];

export function responsiveImageProps(src: string, sizes = '(max-width: 767px) 100vw, 50vw') {
  const guide = guideImageSizes[src];
  if (guide) return {
    srcSet: `${guide.small} ${guide.smallWidth}w, ${src} ${guide.width}w`,
    sizes, width: guide.width, height: guide.height,
    loading: 'lazy' as const, decoding: 'async' as const,
  };
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

// Reading-column photos top out at 760 CSS pixels. Keep a local WebP fallback
// for clients that ignore srcset and avoid requesting a full-resolution master.
export function readingImageProps(src: string, sizes: string) {
  const props = responsiveImageProps(src, sizes);
  const local = imageVariants[src];
  if (!local) return { ...props, src };
  const candidates = local.srcSet.split(', ').filter(candidate => {
    const width = Number(candidate.slice(candidate.lastIndexOf(' ') + 1, -1));
    return width <= 960;
  });
  const largest = candidates.at(-1);
  if (!largest) return { ...props, src };
  return { ...props, src: largest.slice(0, largest.lastIndexOf(' ')), srcSet: candidates.join(', ') };
}
