import { createFileRoute } from "@tanstack/react-router";
import FirmHelpPage from "@/pages/editorial/FirmHelpPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about_/faqs")({
  head: () => buildSeo({
    title: "Personal Injury FAQs | Howard Choi",
    description: "Answers about consultations, fees, case timelines and working with Howard Choi, a personal injury lawyer in Buena Park.",
    path: "/about/faqs",
    locale: "en-US",
  }),
  component: () => <FirmHelpPage fees={false} />,
});
