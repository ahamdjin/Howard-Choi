export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://howardchoi.vercel.app").replace(/\/$/, "");

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

export const buildSeo = ({
  title,
  description,
  path,
  alternatePath,
  locale = "en-US",
  type = "website",
  image,
  noindex = false,
}: SeoOptions) => {
  const canonical = absoluteUrl(path);
  const englishPath = locale === "ko-US" ? alternatePath : path;
  const koreanPath = locale === "ko-US" ? path : alternatePath;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const meta = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { property: "og:site_name", content: "Howard Choi Law" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: locale === "ko-US" ? "ko_KR" : "en_US" },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image) {
    const imageUrl = absoluteUrl(image);
    meta.push({ property: "og:image", content: imageUrl });
    meta.push({ name: "twitter:image", content: imageUrl });
  }

  const links: Array<Record<string, string>> = noindex
    ? []
    : [{ rel: "canonical", href: canonical }];

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

export const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: "Howard Choi Law",
  url: SITE_URL,
  telephone: "+1-714-690-0007",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6301 Beach Blvd",
    addressLocality: "Buena Park",
    addressRegion: "CA",
    postalCode: "90621",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Buena Park" },
    { "@type": "AdministrativeArea", name: "Orange County" },
  ],
  knowsLanguage: ["English", "Korean"],
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Howard Choi Law",
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

export const articleJsonLd = ({
  title,
  description,
  path,
  image,
  publishedAt,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  locale: "en-US" | "ko-US";
}) => ({
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
    name: "Howard Choi Law",
    url: SITE_URL,
  },
  publisher: { "@id": `${SITE_URL}/#legal-service` },
});
