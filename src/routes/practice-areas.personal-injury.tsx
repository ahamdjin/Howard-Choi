import { serviceSeo } from "@/data/practiceSeo";
import { createFileRoute } from "@tanstack/react-router";
import PersonalInjuryPage from "@/pages/editorial/PersonalInjuryPage";
import { breadcrumbJsonLd, buildSeo, serviceJsonLd } from "@/lib/seo";

const path = "/practice-areas/personal-injury";
const { title, description } = serviceSeo["personal-injury"];

export const Route = createFileRoute("/practice-areas/personal-injury")({
  head: () => ({
    ...buildSeo({ title, description, path, locale: "en-US" }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ name: "Buena Park Personal Injury Lawyer", description, path, locale: "en-US" })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Practice Areas", path: "/practice-areas" }, { name: "Personal Injury Lawyer", path }])) },
    ],
  }),
  component: PersonalInjuryPage,
});
