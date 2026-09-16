import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeo({
    title: "Buena Park Personal Injury Lawyers | Accident & Injury Law Firm",
    description: "Buena Park personal injury lawyers representing people hurt in car, truck, motorcycle, pedestrian, rideshare, premises-liability, wrongful-death, and serious-injury matters across North Orange County and nearby communities.",
    path: "/",
    alternatePath: "/ko",
    locale: "en-US",
  }),
  component: Index,
});
