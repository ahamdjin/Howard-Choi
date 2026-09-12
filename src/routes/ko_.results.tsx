import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/pages/RefinedInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/results")({
  head: () => buildSeo({
    title: "사건 결과 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer의 사건 결과 페이지입니다. 공개가 승인된 실제 결과만 적절한 고지와 함께 게시합니다.",
    path: "/ko/results",
    alternatePath: "/results",
    locale: "ko-US",
    noindex: true,
  }),
  component: () => <ResultsPage locale="ko" />,
});
