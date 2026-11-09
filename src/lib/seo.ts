import { getBlogAuthor, authorProfilePath } from "@/data/blogAuthors";
import { brand, serviceLocations } from "@/data/injurySite";
import defaultSocialImage from "@/assets/law-firm/hero-law-office.webp";

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
  locale?: "en-US" | "ko-US" | "es-US";
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
  followWhenNoindex?: boolean;
};

export const buildSeo = ({
  title,
  description,
  path,
  locale = "en-US",
  type = "website",
  image = defaultSocialImage,
  noindex = false,
  followWhenNoindex = false,
}: SeoOptions) => {
  const canonical = absoluteUrl(path);
  // Korean remains accessible for visitors, but is excluded from search.
  // Check the path too so a missing locale cannot accidentally index it.
  const koreanPage = locale === "ko-US" || /^\/ko(?:\/|$)/.test(path);
  noindex ||= koreanPage;
  followWhenNoindex ||= koreanPage;
  const robots = noindex
    ? `noindex, ${followWhenNoindex ? "follow" : "nofollow"}`
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const ogLocale = locale === "ko-US" ? "ko_KR" : locale === "es-US" ? "es_US" : "en_US";
  const ogAlternate = locale === "ko-US" ? "en_US" : locale === "es-US" ? "en_US" : "ko_KR";

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
    { property: "og:locale", content: ogLocale },
    { property: "og:locale:alternate", content: ogAlternate },
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
  jobTitle: "Personal Injury Lawyer",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "State Bar of California",
    value: "284364",
  },
  sameAs: [
    "https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364",
    "https://www.avvo.com/attorneys/90621-ca-howard-choi-4229558.html",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "William Howard Taft University" },
  knowsLanguage: ["English", "Korean"],
  areaServed: serviceLocations.map((location) => ({ "@type": "City", name: location.name })),
  worksFor: { "@id": `${SITE_URL}/#legal-service` },
};

export const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#legal-service`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: brand.phoneHref.replace(/^tel:/, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "6301 Beach Blvd, Suite 216",
    addressLocality: "Buena Park",
    addressRegion: "CA",
    postalCode: "90621",
    addressCountry: "US",
  },
  employee: [{ "@id": `${SITE_URL}/#howard-choi` }],
  areaServed: serviceLocations.map((location) => ({ "@type": "City", name: location.name })),
  knowsAbout: ["Personal Injury", "Car Accidents", "Truck Accidents", "Motorcycle Accidents", "Pedestrian Accidents", "Rideshare Accidents", "Wrongful Death", "Premises Liability", "Serious Injuries"],
  knowsLanguage: ["English", "Korean", "Spanish"],
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en-US", "ko-US", "es-US"],
  publisher: { "@id": `${SITE_URL}/#legal-service` },
};

export const serviceJsonLd = ({ name, description, path, locale }: {
  name: string;
  description: string;
  path: string;
  locale: "en-US" | "ko-US" | "es-US";
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl(path)}#service`,
  name,
  description,
  url: absoluteUrl(path),
  serviceType: name,
  provider: { "@id": `${SITE_URL}/#legal-service` },
  areaServed: { "@type": "City", name: "Buena Park" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(path),
    inLanguage: locale,
  },
});

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
  updatedAt,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  locale: "en-US" | "ko-US" | "es-US";
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${absoluteUrl(path)}#article`,
  headline: title,
  description,
  image: absoluteUrl(image),
  datePublished: publishedAt,
  dateModified: updatedAt || publishedAt,
  inLanguage: locale,
  mainEntityOfPage: absoluteUrl(path),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#howard-choi` },
  author: (() => {
    const author = getBlogAuthor(path.split("/").filter(Boolean).at(-1));
    const language = locale.startsWith("ko") ? "ko" : locale.startsWith("es") ? "es" : "en";
    return {
      "@type": "Person",
      "@id": `${SITE_URL}/#${author.id}`,
      name: author.name,
      url: absoluteUrl(authorProfilePath(author, language)),
      image: absoluteUrl(author.image),
      jobTitle: author.role[language],
      description: author.bio[language],
      sameAs: author.sameAs,
      identifier: author.credentials.map(c => ({ "@type": "PropertyValue", propertyID: c.label, value: c.value })),
    };
  })(),
  publisher: { "@id": `${SITE_URL}/#legal-service` },
});
