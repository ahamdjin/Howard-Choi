import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/RichSEOInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/attorney")({
  head: () => buildSeo({
    title: "Howard Choi 변호사 | Buena Park Injury Lawyer",
    description: "Howard Choi 변호사와 Buena Park Injury Lawyer의 직접적이고 명확한 사고·개인 상해 사건 접근 방식을 확인하세요.",
    path: "/ko/attorney",
    alternatePath: "/attorney",
    locale: "ko-US",
  }),
  component: () => <AttorneyPage locale="ko" />,
});
