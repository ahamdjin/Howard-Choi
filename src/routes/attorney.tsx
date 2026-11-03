import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => {
    const seo = buildSeo({
      title: "Howard Choi | Buena Park Personal Injury Lawyer",
      description:
        "Meet Howard Choi, a personal injury lawyer in Buena Park. View California Bar No. 284364, his background and how to arrange a free consultation.",
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
            name: "Howard Choi, Buena Park personal injury lawyer",
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
