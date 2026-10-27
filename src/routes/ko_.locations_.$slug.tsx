import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { locationGuidesKo } from "@/data/locationGuidesKo";

export const Route = createFileRoute("/ko_/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/ko/locations/${loaderData.slug}`;
    const citySeo = locationGuidesKo[loaderData.slug];
    const seo = buildSeo({
      title: citySeo.seoTitle,
      description: citySeo.seoDescription,
      path,
      alternatePath: `/locations/${loaderData.slug}`,
      locale: "ko-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "홈", path: "/ko" },
          { name: "서비스 지역", path: "/ko/locations" },
          { name: loaderData.koName, path },
        ])),
      }],
    };
  },
  component: () => <LocationDetailPage locale="ko" />,
});