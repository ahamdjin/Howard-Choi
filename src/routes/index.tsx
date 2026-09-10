import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeo({
    title: "Buena Park Injury Lawyer | Accident & Personal Injury Attorney",
    description: "Buena Park Injury Lawyer provides accident and personal injury representation in Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra.",
    path: "/",
    alternatePath: "/ko",
    locale: "en-US",
  }),
  component: Index,
});
