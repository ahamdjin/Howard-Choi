import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import LocationExperiencePage from "@/pages/locations/LocationExperiencePage";
import { getServiceLocation } from "@/data/injurySite";
import { getLocationExperience } from "@/data/locationExperiences";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { locationGuidesEs } from "@/data/locationGuidesEs";

export const Route = createFileRoute("/es/locations/$slug")({
  loader: ({ params }) => {
    const experience = getLocationExperience(params.slug, "es");
    const location = experience ?? getServiceLocation(params.slug);
    if (!location) throw notFound();
    const guide = locationGuidesEs[params.slug];
    return {
      slug: location.slug,
      name: location.name,
      title: experience?.seoTitle ?? guide.seoTitle,
      description: experience?.seoDescription ?? guide.seoDescription,
      experience,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/es/locations/${loaderData.slug}`;
    return {
      ...buildSeo({ title: loaderData.title, description: loaderData.description, path, locale: "es-US", noindex: true, followWhenNoindex: true }),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "Inicio", path: "/es" },
        { name: "Zonas de servicio", path: "/es/locations" },
        { name: loaderData.name, path },
      ])) }],
    };
  },
  component: LocalizedLocationRoute,
});

function LocalizedLocationRoute() {
  const { experience } = Route.useLoaderData();
  return experience ? <LocationExperiencePage city={experience} locale="es" /> : <LocationDetailPage locale="es" />;
}
