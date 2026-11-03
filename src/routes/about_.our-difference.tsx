import { createFileRoute } from "@tanstack/react-router";
import { FirmApproachPage } from "@/pages/editorial/FirmApproachPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about_/our-difference")({
  head: () => buildSeo({
    title: "Our Difference | Buena Park Injury Lawyer",
    description: "Learn how Howard Choi brings a lawyer’s review and an accounting background to evidence, insurance and injury losses.",
    path: "/about/our-difference",
    locale: "en-US",
  }),
  component: () => <FirmApproachPage page="difference" />,
});
