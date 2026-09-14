import { ArrowRight, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import type { SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  localePrefix,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "사건 결과" : "Case results"}
        title={isKo(locale) ? "결과는 숫자만으로 설명되지 않습니다." : "Results need context."}
        description={isKo(locale)
          ? "승인된 실제 사건 결과가 제공되면 사건 유형, 핵심 사실과 결과를 함께 보여주는 구조입니다."
          : "This page is structured for approved, real case outcomes presented with the case type, relevant context, and the result rather than isolated numbers."}
        image={heroCourthouse}
      />

      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "사건 결과 · 안내" : "Case results · Guide"}
        sections={isKo(locale)
          ? [{ id: "principle", label: "표시 원칙" }, { id: "results", label: "승인된 결과" }, { id: "calculator", label: "사건 가치 계산기" }, { id: "context", label: "결과의 의미" }]
          : [{ id: "principle", label: "How results are presented" }, { id: "results", label: "Approved outcomes" }, { id: "calculator", label: "Case value estimator" }, { id: "context", label: "Why context matters" }]}
      >
        <ReadingSectionBlock
          id="principle"
          locale={locale}
          kicker={isKo(locale) ? "01 · 원칙" : "01 · Principle"}
          title={isKo(locale) ? "실제 결과만, 필요한 맥락과 함께." : "Only real outcomes, with enough context to understand them."}
          intro={isKo(locale)
            ? "과거 결과는 향후 사건의 결과를 보장하지 않습니다. 따라서 승인된 사건 결과는 사건의 유형과 사실관계를 설명하는 방식으로 게시해야 합니다."
            : "Past results do not guarantee a future outcome. Approved matters should therefore be shown with enough information to understand the type of case and why the result is relevant."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[FileCheck2, Scale, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["실제 사건", "사실 맥락", "적절한 고지"][index] : ["Verified matter", "Relevant context", "Clear disclaimer"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["로펌이 승인한 실제 사건만 게시합니다.", "사건 유형과 핵심 사실을 함께 설명합니다.", "개별 사건 결과가 보장되지 않음을 명확히 표시합니다."][index]
                    : ["Publish only matters the firm has verified and approved.", "Explain the case type and facts that make the outcome meaningful.", "Make clear that every matter is different and outcomes are not guaranteed."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="results"
          locale={locale}
          kicker={isKo(locale) ? "02 · 결과" : "02 · Outcomes"}
          title={isKo(locale) ? "승인된 사건 결과가 들어갈 자리" : "Approved case outcomes will live here."}
          intro={isKo(locale)
            ? "현재는 검증되지 않은 금액이나 결과를 표시하지 않습니다. 실제 결과가 승인되면 동일한 구조에서 추가할 수 있습니다."
            : "The site intentionally does not invent settlement amounts or case outcomes. Once real matters are approved, they can be added here without redesigning the page."}
        >
          <div className="editorial-result-placeholder">
            <span>01</span>
            <div>
              <strong>{isKo(locale) ? "사건 유형 · 결과 · 짧은 설명" : "Case type · Result · Short context"}</strong>
              <p>{isKo(locale) ? "실제 자료 제공 후 이 카드가 승인된 사건 결과로 교체됩니다." : "This reserved card becomes a verified case-result entry once the firm supplies an approved matter."}</p>
            </div>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="calculator"
          locale={locale}
          kicker={isKo(locale) ? "03 · 계산기" : "03 · Estimator"}
          title={isKo(locale) ? "내 사건의 가치에 영향을 주는 요소를 직접 확인하세요." : "Build an educational case-value range from the facts you know."}
          intro={isKo(locale)
            ? "캘리포니아 개인상해 계산기는 의료비, 소득 손실, 부상 정도, 치료 수준과 비교과실을 이용해 교육용 범위를 보여줍니다. 결과를 보기 위해 연락처를 입력할 필요가 없습니다."
            : "The California personal-injury estimator uses medical costs, income loss, injury severity, treatment, and comparative fault to show an illustrative range. No contact information is required to see the result."}
        >
          <a href={`${localePrefix(locale)}/case-value-calculator`} className="editorial-inline-link">
            <span>{isKo(locale) ? "사건 가치 계산기 시작" : "Start the case value estimator"}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="context"
          locale={locale}
          kicker={isKo(locale) ? "04 · 맥락" : "04 · Context"}
          title={isKo(locale) ? "두 사건이 완전히 같을 수는 없습니다." : "No two cases have exactly the same facts."}
          intro={isKo(locale)
            ? "책임, 보험 한도, 부상 정도, 치료, 증거와 당사자의 상황에 따라 결과는 크게 달라질 수 있습니다."
            : "Liability, available insurance, injury severity, treatment, evidence, and the individual circumstances of the parties can materially change an outcome."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
