import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/privacy-policy")({
  head: () => buildSeo({
    title: "개인정보 처리방침 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer 웹사이트의 개인정보 수집, 이용, 예약 및 커뮤니케이션 처리방침을 확인하세요.",
    path: "/ko/privacy-policy",
    alternatePath: "/privacy-policy",
    locale: "ko-US",
  }),
  component: () => <LegalPage type="privacy" locale="ko" />,
});
