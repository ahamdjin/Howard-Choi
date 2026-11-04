import registry from "./locationExperienceRegistry.json";
import type { SiteLocale } from "@/data/injurySite";

// Lightweight route registry for navigation. Do not import full city articles
// into the site-wide header just to decide whether a translation exists.
export const additionalLocationDirectory = [
  { slug: "costa-mesa", name: "Costa Mesa", koName: "코스타메사" },
  { slug: "irvine", name: "Irvine", koName: "어바인" },
  { slug: "long-beach", name: "Long Beach", koName: "롱비치" },
  { slug: "los-angeles", name: "Los Angeles", koName: "로스앤젤레스" },
  { slug: "huntington-beach", name: "Huntington Beach", koName: "헌팅턴비치" },
  { slug: "newport-beach", name: "Newport Beach", koName: "뉴포트비치" },
] as const;

// Add a city only when both complete translated documents are ready to render.
export const mirroredLocationSlugs: readonly string[] = registry.mirrored;
export const experienceLocationSlugs: readonly string[] = registry.english;
export function hasLocalizedLocation(locale: SiteLocale, slug: string) {
  return locale === "en" || !additionalLocationDirectory.some(city => city.slug === slug) || mirroredLocationSlugs.includes(slug);
}
