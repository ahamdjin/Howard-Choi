import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo, serviceJsonLd } from "@/lib/seo";

import { practiceSearchNames, serviceSeo } from "@/data/practiceSeo";

export const Route = createFileRoute("/practice-areas/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/practice-areas/${loaderData.slug}`;
    const searchName = practiceSearchNames[loaderData.slug] || loaderData.title;
    const seo = buildSeo({
      title: serviceSeo[loaderData.slug]?.title || `Buena Park ${searchName} Lawyer | Injury Claims`,
      description: serviceSeo[loaderData.slug]?.description || loaderData.description,
      path,
      alternatePath: `/ko/practice-areas/${loaderData.slug}`,
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(serviceJsonLd({ name: `Buena Park ${searchName} Lawyer`, description: serviceSeo[loaderData.slug]?.description || loaderData.description, path, locale: "en-US" })),
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
          { name: searchName, path },
        ])),
      }],
    };
  },
  component: () => <PracticeAreaDetailPage locale="en" />,
});