import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildSeo({
      title: "Buena Park Accident Lawyer | Personal Injury Attorney",
      description: "Buena Park accident lawyer handling car, truck, motorcycle, pedestrian, rideshare, slip-and-fall, wrongful-death and serious-injury claims across north Orange County. Free consultation, no fee unless there is a recovery.",
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
          name: "Buena Park Accident Lawyer | Personal Injury Attorney",
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
