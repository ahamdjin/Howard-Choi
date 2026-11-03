import { createFileRoute } from "@tanstack/react-router";
import { FirmApproachPage } from "@/pages/editorial/FirmApproachPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about_/what-to-expect")({
  head: () => buildSeo({
    title: "What to Expect From Your Injury Claim | Howard Choi",
    description: "Learn what to bring to a first call, how an injury claim is investigated and what to consider before accepting a settlement.",
    path: "/about/what-to-expect",
    locale: "en-US",
  }),
  component: () => <FirmApproachPage page="process" />,
});
