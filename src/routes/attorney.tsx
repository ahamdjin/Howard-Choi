import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => {
    const seo = buildSeo({
      title: "Howard Choi | Buena Park Accident & Personal Injury Attorney",
      description:
        "Howard Jong-yol Choi is a California personal injury attorney in Buena Park, State Bar No. 284364, admitted in 2012. See his verified credentials and how accident claims, evidence, insurance, and medical losses are handled.",
      path: "/attorney",
      alternatePath: "/ko/attorney",
      locale: "en-US",
    });

    return {
      ...seo,
      // The root already declares the Person entity sitewide. This says the
      // page is *about* him, which is what Google reads to answer "who is
      // responsible for this business".
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${absoluteUrl("/attorney")}#profilepage`,
            url: absoluteUrl("/attorney"),
            name: "Howard Choi, Buena Park accident and personal injury attorney",
            inLanguage: "en-US",
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
            mainEntity: { "@id": `${absoluteUrl("/")}#howard-choi` },
            about: { "@id": `${absoluteUrl("/")}#howard-choi` },
          }),
        },
      ],
    };
  },
  component: () => <AttorneyPage locale="en" />,
});
