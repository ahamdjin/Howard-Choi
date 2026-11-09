import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import LocationExperiencePage from "@/pages/locations/LocationExperiencePage";
import { getServiceLocation } from "@/data/injurySite";
import { getLocationExperience } from "@/data/locationExperiences";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { locationGuidesKo } from "@/data/locationGuidesKo";

export const Route = createFileRoute("/ko/locations/$slug")({
  loader: ({ params }) => {
    const experience = getLocationExperience(params.slug, "ko");
    const location = experience ?? getServiceLocation(params.slug);
    if (!location) throw notFound();
    const guide = locationGuidesKo[params.slug];
    return {
      slug: location.slug,
      name: "koName" in location ? location.koName : location.name,
      title: experience?.seoTitle ?? guide.seoTitle,
      description: experience?.seoDescription ?? guide.seoDescription,
      experience,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/ko/locations/${loaderData.slug}`;
    return {
      ...buildSeo({ title: loaderData.title, description: loaderData.description, path, locale: "ko-US", noindex: true, followWhenNoindex: true }),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "홈", path: "/ko" },
        { name: "서비스 지역", path: "/ko/locations" },
        { name: loaderData.name, path },
      ])) }],
    };
  },
  component: LocalizedLocationRoute,
});

function LocalizedLocationRoute() {
  const { experience } = Route.useLoaderData();
  return experience ? <LocationExperiencePage city={experience} locale="ko" /> : <LocationDetailPage locale="ko" />;
}
