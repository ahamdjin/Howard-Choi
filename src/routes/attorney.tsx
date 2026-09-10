import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/InjurySitePages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => buildSeo({
    title: "Howard Choi | Buena Park Injury Lawyer",
    description: "Meet Howard Choi and learn about the direct, focused approach behind Buena Park Injury Lawyer for accident and personal injury matters.",
    path: "/attorney",
    alternatePath: "/ko/attorney",
    locale: "en-US",
  }),
  component: () => <AttorneyPage locale="en" />,
});
