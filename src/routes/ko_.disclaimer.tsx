import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/disclaimer")({
  head: () => buildSeo({
    title: "법률 고지 | Buena Park Injury Lawyer",
    description: "변호사 광고, 일반 법률정보, 변호사-의뢰인 관계 및 사건 결과에 관한 중요 고지를 확인하세요.",
    path: "/ko/disclaimer",
    alternatePath: "/disclaimer",
    locale: "ko-US",
  }),
  component: () => <LegalPage type="disclaimer" locale="ko" />,
});
