import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildSeo({
      title: "Buena Park Personal Injury Lawyer | Howard Choi",
      description: "Buena Park personal injury lawyer Howard Choi represents people injured in car, truck, motorcycle, pedestrian, rideshare, slip-and-fall, and other accidents.",
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
          name: "Buena Park Personal Injury Lawyer | Howard Choi",
          description: "Personal injury representation in Buena Park, California for people injured in vehicle accidents, premises incidents, and other negligence-related matters.",
          inLanguage: "en-US",
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          mainEntity: { "@id": `${absoluteUrl("/")}#legal-service` },
          author: { "@id": `${absoluteUrl("/")}#howard-choi` },
          reviewedBy: { "@id": `${absoluteUrl("/")}#howard-choi` },
        }),
      }],
    };
  },
  component: Index,
});
