import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildSeo({
    title: "About Howard Choi | Buena Park Personal Injury Lawyer",
    description: "Learn why Howard Choi founded his personal injury firm in 2015, how his CPA background helps injury claims, and why clients get direct access in Buena Park.",
    path: "/about",
    alternatePath: "/ko/about",
    locale: "en-US",
  }),
  component: () => <AboutFirmPage locale="en" />,
});
