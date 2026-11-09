import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildSeo({
      title: "Buena Park Personal Injury & Car Accident Lawyer | Free Consultation",
      description: "Injured? Howard Choi helps Buena Park personal injury and car accident victims pursue compensation. Free consultation. No fee unless there is a recovery.",
      path: "/",
      alternatePath: "/ko",
      locale: "en-US",
    });

    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl("/")}#webpage`,
          url: absoluteUrl("/"),
          name: "Buena Park Personal Injury & Car Accident Lawyer | Free Consultation",
          inLanguage: "en-US",
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          about: { "@id": `${absoluteUrl("/")}#legal-service` },
          mainEntity: { "@id": `${absoluteUrl("/")}#legal-service` },
          contributor: { "@id": `${absoluteUrl("/")}#howard-choi` },
        }),
      }],
    };
  },
  component: Index,
});
