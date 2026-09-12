import { createFileRoute } from "@tanstack/react-router";
import { PracticeAreasPage } from "@/pages/RefinedInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/practice-areas")({
  head: () => buildSeo({
    title: "Personal Injury Practice Areas | Buena Park Injury Lawyer",
    description: "Explore car accident, truck accident, motorcycle accident, pedestrian, rideshare, slip and fall, wrongful death, and serious injury representation in Buena Park.",
    path: "/practice-areas",
    alternatePath: "/ko/practice-areas",
    locale: "en-US",
  }),
  component: () => <PracticeAreasPage locale="en" />,
});
