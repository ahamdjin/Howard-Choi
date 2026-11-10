import type { SiteLocale } from "@/data/injurySite";
import { hasLocalizedBlog } from "@/data/blogLocaleAvailability";
import { hasLocalizedLocation } from "@/data/locationLocaleAvailability";

/** Resolve a real equivalent route or its nearest localized directory. */
export function localizedPath(path: string, locale: SiteLocale): string {
  const base = path.replace(/^\/(?:ko|es)(?=\/|$)/, "") || "/";
  if (locale === "en") return base;
  const location = /^\/locations\/([^/]+)\/?$/.exec(base)?.[1];
  const blog = /^\/blogs\/([^/]+)\/?$/.exec(base)?.[1];
  const englishResource = /^\/(?:learning-hub|faqs|injury-types)(?:\/|$)/.test(base);
  const newService = /^\/practice-areas\/(?:bicycle-accidents|dog-bites)\/?$/.test(base);
  const fallback = englishResource ? "/blogs" : newService ? "/practice-areas" : base.startsWith("/about/") ? "/about"
    : base === "/practice-areas/personal-injury" ? "/practice-areas"
    : location && !hasLocalizedLocation(locale, location) ? "/locations"
    : blog && !hasLocalizedBlog(locale, blog) ? "/blogs"
    : base;
  return `/${locale}${fallback === "/" ? "" : fallback}`;
}

/** Preserve a specific English resource when no equivalent translated page exists. */
export function localizedContentHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const destination = localizedPath(href, locale);
  const base = destination.replace(/^\/(?:ko|es)(?=\/|$)/, "") || "/";
  return base === href ? destination : href;
}
