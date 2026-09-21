import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeo({
    title: "Accident Lawyer in Buena Park, CA | Buena Park Injury Lawyer",
    description: "Buena Park accident lawyer Howard Choi helps people with personal injury claims involving car, truck, motorcycle, pedestrian, rideshare, slip-and-fall, wrongful-death, and serious-injury matters. California Bar No. 284364.",
    path: "/",
    alternatePath: "/ko",
    locale: "en-US",
  }),
  component: Index,
});
