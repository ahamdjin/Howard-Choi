import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/RichSEOLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/locations/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/ko/locations/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.koName} 사고·상해 변호사 | Buena Park Injury Lawyer`,
      description: loaderData.koDescription,
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
