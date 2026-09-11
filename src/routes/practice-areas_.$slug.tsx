import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/practice-areas/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    const path = `/practice-areas/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.title} Lawyer | Buena Park Injury Lawyer`,
      description: loaderData.description,
      path,
      alternatePath: `/ko/practice-areas/${loaderData.slug}`,
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
          { name: loaderData.title, path },
        ])),
      }],
    };
  },
  component: () => <PracticeAreaDetailPage locale="en" />,
});
