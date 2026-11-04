import type { SiteLocale } from "@/data/injurySite";
import type { AdditionalLocation } from "@/data/additionalLocations";
import { mirroredLocationSlugs } from "@/data/locationLocaleAvailability";

type Translation = { sourceHash: string; reviewStatus: string; content: AdditionalLocation };
const documents = import.meta.glob<AdditionalLocation | Translation>("./locations/*.json", { eager: true, import: "default" });

export function getLocationExperience(slug: string, locale: SiteLocale): AdditionalLocation | undefined {
  if (locale !== "en" && !mirroredLocationSlugs.includes(slug)) return undefined;
  const document = documents[`./locations/${slug}.${locale}.json`];
  if (!document) return undefined;
  if ("content" in document && document.reviewStatus !== "reviewed-for-source-parity") return undefined;
  return "content" in document ? document.content : document;
}
