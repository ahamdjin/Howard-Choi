import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeo({
    title: "Buena Park Personal Injury Lawyer | Howard Choi",
    description: "Buena Park personal injury lawyer Howard Choi represents people hurt in car, truck, motorcycle, pedestrian, rideshare, premises-liability, wrongful-death, and serious-injury matters. California Bar No. 284364.",
    path: "/",
    alternatePath: "/ko",
    locale: "en-US",
  }),
  component: Index,
});
