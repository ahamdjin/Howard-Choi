import { absoluteUrl, buildSeo, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { resourceImage, type LearningResource } from "@/data/learningResources";

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*|^### /gm, "");
export function learningResourceSeo(r: LearningResource) {
  const parent = r.kind === "service" ? { name: "Practice Areas", path: "/practice-areas" } : r.kind === "faq" ? { name: "FAQs", path: "/faqs" } : { name: "Injury Types", path: "/injury-types" };
  const schema = r.kind === "faq" ? {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": absoluteUrl(r.path) + "#faq", url: absoluteUrl(r.path),
    mainEntity: r.sections.map(s => ({ "@type": "Question", name: s.heading, acceptedAnswer: { "@type": "Answer", text: s.paragraphs.map(plain).join("\n") } })),
  } : r.kind === "service" ? serviceJsonLd({ name: "Buena Park " + (r.slug === "dog-bites" ? "Dog Bite" : "Bicycle Accident") + " Lawyer", description: r.description, path: r.path, locale: "en-US" }) : {
    "@context": "https://schema.org", "@type": "Article", headline: r.title, url: absoluteUrl(r.path), image: absoluteUrl(resourceImage(r).src),
    author: { "@type": "Person", name: "Howard Choi", url: absoluteUrl("/attorney") }, publisher: { "@type": "Organization", name: "Buena Park Injury Lawyer", url: absoluteUrl("/") },
  };
  return { ...buildSeo({ title: r.metaTitle, description: r.description, path: r.path, image: resourceImage(r).src.endsWith(".svg") ? undefined : resourceImage(r).src }), scripts: [
    { type: "application/ld+json", children: JSON.stringify(schema) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, parent, { name: r.title, path: r.path }])) },
  ] };
}
