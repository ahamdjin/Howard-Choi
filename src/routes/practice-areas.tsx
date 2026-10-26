import { createFileRoute } from "@tanstack/react-router";
import { PracticeAreasPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/practice-areas")({
  head: () => buildSeo({
    title: "Buena Park Personal Injury Practice Areas | Howard Choi",
    description: "Explore eight Buena Park injury practice areas: car, truck, motorcycle, pedestrian, rideshare, falls, wrongful death and serious injuries. Compare guides and evidence.",
    path: "/practice-areas",
    alternatePath: "/ko/practice-areas",
    locale: "en-US",
  }),
  component: () => <PracticeAreasPage locale="en" />,
});
