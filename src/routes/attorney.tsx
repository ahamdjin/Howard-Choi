import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { attorneyProfilePageJsonLd, breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => {
    const seo = buildSeo({
      title: "Howard Choi | Buena Park Personal Injury Attorney",
      description: "Meet Howard Choi, California attorney Bar No. 284364, based in Buena Park. Review verified licensing details, language information, practice focus, and how to contact the firm.",
      path: "/attorney",
      alternatePath: "/ko/attorney",
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(attorneyProfilePageJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Howard Choi", path: "/attorney" }])) },
      ],
    };
  },
  component: () => <AttorneyPage locale="en" />,
});