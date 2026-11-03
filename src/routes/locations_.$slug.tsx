import AnaheimLandingPage from "@/pages/locations/AnaheimLandingPage";
import { anaheimSeo } from "@/data/anaheimLanding";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { citySearchFocus } from "@/data/citySearchFocus";
import { locationGuidesEn } from "@/data/locationGuidesEn";

export const Route = createFileRoute("/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/locations/${loaderData.slug}`;
    const citySeo = locationGuidesEn[loaderData.slug];
    const seo = buildSeo({
      title: loaderData.slug === "anaheim" ? anaheimSeo.title : `${citySearchFocus[loaderData.slug].heading} | Howard Choi`,
      description: loaderData.slug === "anaheim" ? anaheimSeo.description : citySeo.seoDescription,
      path,
      alternatePath: `/ko/locations/${loaderData.slug}`,
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loaderData.name, path },
        ])),
      }],
    };
  },
  component: LocationRoute,
});
function LocationRoute() {
  const { slug } = Route.useParams();
  return slug === "anaheim" ? <AnaheimLandingPage /> : <LocationDetailPage locale="en" />;
}
