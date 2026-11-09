import { experienceLocationSlugs } from "@/data/locationLocaleAvailability";
import { getLocationExperience } from "@/data/locationExperiences";
import LocationExperiencePage from "@/pages/locations/LocationExperiencePage";
import AdditionalLocationPage from "@/pages/locations/AdditionalLocationPage";
import { additionalLocations } from "@/data/additionalLocations";
import AnaheimLandingPage from "@/pages/locations/AnaheimLandingPage";
import { anaheimSeo } from "@/data/anaheimLanding";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { citySearchFocus } from "@/data/citySearchFocus";
import { locationGuidesEn } from "@/data/locationGuidesEn";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug) || additionalLocations.find(city => city.slug === params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/locations/${loaderData.slug}`;
    const additional = additionalLocations.find(city => city.slug === loaderData.slug);
    const experience = getLocationExperience(loaderData.slug, "en");
    const citySeo = locationGuidesEn[loaderData.slug];
    const seo = buildSeo({
      title: experience?.seoTitle ?? (additional ? additional.seoTitle ?? (additional.heading ?? additional.name + " Personal Injury & Car Accident Lawyer") + " | Howard Choi" : loaderData.slug === "anaheim" ? anaheimSeo.title : `${citySearchFocus[loaderData.slug].heading} | Howard Choi`),
      description: experience?.seoDescription ?? (additional ? additional.seoDescription ?? additional.lead : loaderData.slug === "anaheim" ? anaheimSeo.description : citySeo.seoDescription),
      path,
      alternatePath: additional ? undefined : `/ko/locations/${loaderData.slug}`,
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
  const additional = additionalLocations.find(city => city.slug === slug);
  const experience = getLocationExperience(slug, "en");
  if (experience && experienceLocationSlugs.includes(slug)) return <LocationExperiencePage city={experience} />;
  if (additional) return <AdditionalLocationPage city={additional} />;
  return slug === "anaheim" ? <AnaheimLandingPage /> : <LocationDetailPage locale="en" />;
}
