import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo, reviewedWebPageJsonLd } from "@/lib/seo";

const practiceSearchNames: Record<string, string> = {
  "car-accidents": "Car Accident",
  "truck-accidents": "Truck Accident",
  "motorcycle-accidents": "Motorcycle Accident",
  "pedestrian-accidents": "Pedestrian Accident",
  "rideshare-accidents": "Uber & Lyft Accident",
  "slip-and-fall": "Slip and Fall",
  "wrongful-death": "Wrongful Death",
  "serious-injuries": "Serious Injury",
};

export const Route = createFileRoute("/practice-areas_/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    const path = `/practice-areas/${loaderData.slug}`;
    const searchName = practiceSearchNames[loaderData.slug] || loaderData.title;
    const seo = buildSeo({
      title: `Buena Park ${searchName} Lawyer | Evidence, Damages & Deadlines`,
      description: loaderData.description,
      path,
      alternatePath: `/ko/practice-areas/${loaderData.slug}`,
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Practice Areas", path: "/practice-areas" },
            { name: searchName, path },
          ])),
        },
        ...(reviewedWebPageJsonLd({ path, name: `Buena Park ${searchName} Lawyer` }) ? [{ type: "application/ld+json", children: JSON.stringify(reviewedWebPageJsonLd({ path, name: `Buena Park ${searchName} Lawyer` })) }] : []),
      ],
    };
  },
  component: () => <PracticeAreaDetailPage locale="en" />,
});