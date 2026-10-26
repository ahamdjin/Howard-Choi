import { createFileRoute } from "@tanstack/react-router";
import { PracticeAreasPage } from "@/pages/EditorialInnerPages";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/practice-areas")({
  head: () => {
    const seo = buildSeo({
    title: "Buena Park Personal Injury Practice Areas | Howard Choi",
    description: "Explore eight Buena Park injury practice areas: car, truck, motorcycle, pedestrian, rideshare, falls, wrongful death and serious injuries. Compare guides and evidence.",
    path: "/practice-areas",
    alternatePath: "/ko/practice-areas",
    locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
        ])),
      }],
    };
  },
  component: () => <PracticeAreasPage locale="en" />,
});
