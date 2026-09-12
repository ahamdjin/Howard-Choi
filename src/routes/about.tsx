import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/RichSEOInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildSeo({
    title: "About | Buena Park Injury Lawyer",
    description: "Learn about Buena Park Injury Lawyer, a focused local injury-law practice serving Buena Park and nearby communities in Orange and Los Angeles counties.",
    path: "/about",
    alternatePath: "/ko/about",
    locale: "en-US",
  }),
  component: () => <AboutFirmPage locale="en" />,
});
