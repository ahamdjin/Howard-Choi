import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/terms")({
  head: () => buildSeo({
    title: "이용약관 | 부에나파크 사고 변호사",
    description: "Buena Park Injury Lawyer 웹사이트 이용약관과 법률정보, 연락 및 상담 예약 관련 조건을 확인하세요.",
    path: "/ko/terms",
    alternatePath: "/terms",
    locale: "ko-US",
    noindex: true,
  }),
  component: () => <LegalPage type="terms" locale="ko" />,
});