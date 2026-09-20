import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.buenaparkinjurylawyer.com").replace(/\/$/, "");
export const SITE_NAME = "Buena Park Injury Lawyer";
export const ATTORNEY_NAME = "Howard Choi";

export const absoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  alternatePath?: string;
  locale?: "en-US" | "ko-US";
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
};

export const buildSeo = ({ title, description, path, alternatePath, locale = "en-US", type = "website", image, noindex = false }: SeoOptions) => {
  const canonical = absoluteUrl(path);
  const englishPath = locale === "ko-US" ? alternatePath : path;
  const koreanPath = locale === "ko-US" ? path : alternatePath;
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: locale === "ko-US" ? "ko_KR" : "en_US" },
    { property: "og:locale:alternate", content: locale === "ko-US" ? "en_US" : "ko_KR" },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image) {
    const imageUrl = absoluteUrl(image);
    meta.push({ property: "og:image", content: imageUrl });
    meta.push({ name: "twitter:image", content: imageUrl });
  }

  const links: Array<Record<string, string>> = noindex ? [] : [{ rel: "canonical", href: canonical }];
  if (!noindex && englishPath && koreanPath) {
    links.push(
      { rel: "alternate", hrefLang: "en-US", href: absoluteUrl(englishPath) },
      { rel: "alternate", hrefLang: "ko-US", href: absoluteUrl(koreanPath) },
      { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(englishPath) },
    );
  }

  return { meta, links };
};

export const noIndexSeo = (title: string) => ({
  meta: [
    { title },
    { name: "robots", content: "noindex, nofollow" },
    { name: "googlebot", content: "noindex, nofollow" },
  ],
});

export const attorneyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#howard-choi`,
  name: ATTORNEY_NAME,
  alternateName: "Howard Jong-yol Choi",
  url: absoluteUrl("/attorney"),
  jobTitle: "Attorney",
  image: absoluteUrl(leadCounselImage),
  knowsLanguage: ["English", "Korean"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "William Howard Taft University",
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "State Bar of California",
    value: "284364",
  },
  sameAs: ["https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364"],
  worksFor: { "@id": `${SITE_URL}/#legal-service` },
};

export const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+1-714-690-0007",
  logo: absoluteUrl(brandLogo),
  image: absoluteUrl(leadCounselImage),
  address: {
    "@type": "PostalAddress",
    streetAddress: "6301 Beach Blvd, Suite 216",
    addressLocality: "Buena Park",
    addressRegion: "CA",
    postalCode: "90621",
    addressCountry: "US",
  },
  employee: [{ "@id": `${SITE_URL}/#howard-choi` }],
  areaServed: ["Buena Park", "Fullerton", "Anaheim", "Cerritos", "La Mirada", "La Habra"].map((name) => ({ "@type": "City", name })),
  knowsAbout: ["Personal Injury", "Car Accidents", "Truck Accidents", "Motorcycle Accidents", "Pedestrian Accidents", "Rideshare Accidents", "Wrongful Death", "Premises Liability", "Serious Injuries"],
  knowsLanguage: ["English", "Korean"],
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en-US", "ko-US"],
  publisher: { "@id": `${SITE_URL}/#legal-service` },
};

export const breadcrumbJsonLd = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleJsonLd = ({ title, description, path, image, publishedAt, locale }: { title: string; description: string; path: string; image: string; publishedAt: string; locale: "en-US" | "ko-US" }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${absoluteUrl(path)}#article`,
  headline: title,
  description,
  image: absoluteUrl(image),
  datePublished: publishedAt,
  dateModified: publishedAt,
  inLanguage: locale,
  mainEntityOfPage: absoluteUrl(path),
  author: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#legal-service`,
    name: SITE_NAME,
    url: SITE_URL,
  },
  publisher: { "@id": `${SITE_URL}/#legal-service` },
});

export const attorneyProfilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/attorney")}#profile-page`,
  url: absoluteUrl("/attorney"),
  name: "Howard Choi | California Attorney Profile",
  mainEntity: { "@id": `${SITE_URL}/#howard-choi` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
