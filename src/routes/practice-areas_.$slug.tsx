import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

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

// Search intent differs by injury type. Keep the recently updated car page stable
// until the post-change Search Console comparison has enough data.
const serviceSeo: Record<string, { title: string; description: string }> = {
  "car-accidents": {
    title: "Buena Park Car Accident Lawyer | Free Consultation",
    description: "Injured in a Buena Park car crash? Lawyer Howard Choi reviews accident evidence, insurance coverage, medical expenses and lost wages. Free consultation.",
  },
  "truck-accidents": {
    title: "Buena Park Truck Accident Lawyer | Commercial Vehicle Claims",
    description: "Hurt in a commercial truck or delivery vehicle crash in Buena Park? Learn about carrier records, driver responsibility, insurance and serious injury claims.",
  },
  "motorcycle-accidents": {
    title: "Buena Park Motorcycle Accident Lawyer | Injury Claims",
    description: "Injured riding a motorcycle in Buena Park? Explore disputed fault, left-turn crashes, safety evidence, medical costs, coverage and future care.",
  },
  "pedestrian-accidents": {
    title: "Buena Park Pedestrian Accident Lawyer | Free Consultation",
    description: "Struck while walking in Buena Park? Understand crosswalk and intersection evidence, hit-and-run insurance, treatment and injury-claim next steps.",
  },
  "rideshare-accidents": {
    title: "Buena Park Uber & Lyft Accident Lawyer | Injury Claims",
    description: "Injured in an Uber or Lyft crash near Buena Park? Review driver app status, trip records, overlapping insurance coverage and possible liability.",
  },
  "slip-and-fall": {
    title: "Buena Park Slip and Fall Lawyer | Premises Liability",
    description: "Injured in a Buena Park slip-and-fall? Explore store and property hazards, notice, security video, medical losses and premises-liability evidence.",
  },
  "wrongful-death": {
    title: "Buena Park Wrongful Death Lawyer | Family Claims",
    description: "After a fatal accident in Buena Park, learn how a California wrongful-death claim addresses evidence, eligible family members, financial losses and insurance.",
  },
  "serious-injuries": {
    title: "Buena Park Brain & Catastrophic Injury Lawyer | Howard Choi",
    description: "Serious brain, head, spinal or orthopedic injury in Buena Park? Learn how future care, lost earning capacity, insurance and long-term losses are evaluated.",
  },
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