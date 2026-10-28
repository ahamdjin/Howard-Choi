import type { SiteLocale } from "@/data/injurySite";

/**
 * Lightweight routing index for translated legal articles.
 * Keep in sync with the published slugs in koBlogs.ts and esBlogs.ts.
 * Do not import those full article collections into the global navigation.
 */
const translated = {
  ko: new Set([
    "california-comparative-fault-personal-injury",
    "how-much-is-my-personal-injury-case-worth-california",
    "uber-lyft-accident-insurance-california",
    "truck-accident-evidence-eld-records-california",
    "california-personal-injury-deadlines",
    "what-to-do-after-a-car-accident-in-california",
    "california-uninsured-driver-hit-and-run-injury-claims",
    "how-long-car-accident-settlement-takes-california",
  ]),
  es: new Set([
    "california-comparative-fault-personal-injury",
    "how-much-is-my-personal-injury-case-worth-california",
    "uber-lyft-accident-insurance-california",
    "truck-accident-evidence-eld-records-california",
    "california-personal-injury-deadlines",
    "what-to-do-after-a-car-accident-in-california",
    "california-uninsured-driver-hit-and-run-injury-claims",
    "how-long-car-accident-settlement-takes-california",
  ]),
};

export const hasLocalizedBlog = (locale: SiteLocale, slug: string): boolean =>
  locale === "en" || translated[locale].has(slug);

// This returns a *real* URL; English is the safe fallback for articles without
// approved translations, instead of linking to a nonexistent /ko or /es path.
export const localizedBlogHref = (locale: SiteLocale, slug: string): string =>
  hasLocalizedBlog(locale, slug) && locale !== "en" ? `/${locale}/blogs/${slug}` : `/blogs/${slug}`;

// New translations stay out of indexing/hreflang until their legal-language
// review is approved. Existing indexed Korean URLs keep their prior status.
export const hasIndexableKoreanBlog = (slug: string): boolean =>
  translated.ko.has(slug) && ![
    "california-uninsured-driver-hit-and-run-injury-claims",
    "how-long-car-accident-settlement-takes-california",
  ].includes(slug);
