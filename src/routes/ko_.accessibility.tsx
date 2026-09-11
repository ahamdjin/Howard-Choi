import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/accessibility")({
  head: () => buildSeo({
    title: "접근성 안내 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer 웹사이트 접근성 안내와 이용 지원 요청 방법을 확인하세요.",
    path: "/ko/accessibility",
    alternatePath: "/accessibility",
    locale: "ko-US",
  }),
  component: () => <LegalPage type="accessibility" locale="ko" />,
});
