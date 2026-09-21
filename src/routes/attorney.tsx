import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => buildSeo({
    title: "Howard Choi | Buena Park Accident & Personal Injury Attorney",
    description: "Howard Jong-yol Choi is a California personal injury attorney in Buena Park, State Bar No. 284364, admitted in 2012. See his verified credentials and how accident claims, evidence, insurance, and medical losses are handled.",
    path: "/attorney",
    alternatePath: "/ko/attorney",
    locale: "en-US",
  }),
  component: () => <AttorneyPage locale="en" />,
});