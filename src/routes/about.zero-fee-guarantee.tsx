import { createFileRoute } from "@tanstack/react-router";
import FirmHelpPage from "@/pages/editorial/FirmHelpPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about/zero-fee-guarantee")({
  head: () => buildSeo({
    title: "Zero Fee Guarantee | Buena Park Injury Lawyer",
    description: "No attorney fee unless there is a recovery. Learn about Howard Choi’s fee promise and start with a free personal injury consultation.",
    path: "/about/zero-fee-guarantee",
    locale: "en-US",
  }),
  component: () => <FirmHelpPage />,
});
