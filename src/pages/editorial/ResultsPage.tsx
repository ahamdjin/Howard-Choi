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

const resultExamples = [
  { amount: "$1M", type: "Largest Single-Client Recovery", context: "Highest single-client recovery reported by the firm." },
  { amount: "$100M+", type: "Total Client Recoveries", context: "Total recovery reported by the firm across client matters." },
  { amount: "Since 2012", type: "Licensed in California", context: "Admitted to the State Bar of California in October 2012, No. 284364." },
];

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "사건 결과" : "Case results"}
        title={isKo(locale) ? "결과는 숫자만으로 설명되지 않습니다." : "A number on its own does not tell you much."}
        description={isKo(locale)
          ? "사건 결과는 금액만 보는 것이 아니라 사건 유형, 책임, 부상, 치료, 보험과 증거를 함께 봐야 의미가 있습니다."
          : "How badly someone was hurt, what treatment they needed, who was at fault, how much insurance existed, how strong the evidence was, what care they will still need, and what the injury did to their life. Those are what produced the number. Strip them away and the figure is just a figure."}
        image={heroCourthouse}
      />

      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "사건 결과 · 안내" : "Case results · Guide"}
        sections={isKo(locale)
          ? [{ id: "principle", label: "표시 원칙" }, { id: "results", label: "사건 결과" }, { id: "calculator", label: "사건 가치 계산기" }, { id: "context", label: "결과의 의미" }]
          : [{ id: "principle", label: "How to read results" }, { id: "results", label: "Selected outcomes" }, { id: "calculator", label: "Case value estimator" }, { id: "context", label: "Why context matters" }]}
      >
        <ReadingSectionBlock
          id="principle"
          locale={locale}
          kicker={isKo(locale) ? "01 · 원칙" : "01 · How to read a result"}
          title={isKo(locale) ? "과거 결과는 비교 기준이 아니라 맥락을 보여주는 자료입니다." : "Someone else's result is not a forecast of yours."}
          intro={isKo(locale)
            ? "두 사건은 부상 정도, 보험, 과실, 증거, 치료와 장래 손실이 모두 다를 수 있습니다. 따라서 과거 결과는 사건 유형과 핵심 사실을 함께 보는 것이 중요합니다."
            : "Two rear-end collisions can look identical on paper and land nowhere near each other. The medical record, future care, how fault gets split, the policy limits, lost earnings, liens, the county it is filed in, the evidence, and how hard the other side is willing to fight all move it."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[FileCheck2, Scale, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사건 유형", "핵심 사실", "결과의 한계"][index] : ["Case type", "Facts that mattered", "No guaranteed outcome"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["어떤 유형의 사고와 상해였는지 확인합니다.", "책임, 치료, 보험, 손실과 증거를 함께 봅니다.", "과거 사건 결과는 다른 사건의 결과를 보장하지 않습니다."][index]
                    : ["Start with what kind of accident and injury produced the result.", "Look at liability, medical treatment, insurance, financial loss, future impact, and evidence.", "Prior settlements and verdicts do not predict or guarantee the result of a different matter."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="results"
          locale={locale}
          kicker={isKo(locale) ? "02 · 결과" : "02 · Selected outcomes"}
          title={isKo(locale) ? "사건 결과를 핵심 맥락과 함께 확인하세요." : "Selected personal injury outcomes."}
          intro={isKo(locale)
            ? "각 결과는 사건 유형과 간단한 맥락을 함께 표시합니다."
            : "These firm-reported figures provide context on recoveries and experience without suggesting that any past outcome predicts a future case."}
        >
          <div className="space-y-3">
            {resultExamples.map((result, index) => (
              <div key={result.type} className="editorial-result-placeholder">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{result.amount} · {result.type}</strong>
                  <p>{result.context}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[10px] leading-5 text-[#1E1C1A]/42">Prior results do not guarantee a similar outcome. Every matter depends on its own facts and circumstances.</p>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="calculator"
          locale={locale}
          kicker={isKo(locale) ? "03 · 계산기" : "03 · Estimator"}
          title={isKo(locale) ? "내 사건의 가치에 영향을 주는 요소를 직접 확인하세요." : "See which facts can move an injury estimate up or down."}
          intro={isKo(locale)
            ? "캘리포니아 개인상해 계산기는 의료비, 소득 손실, 부상 정도, 치료 수준과 비교과실을 이용해 교육용 범위를 보여줍니다. 결과를 보기 위해 연락처를 입력할 필요가 없습니다."
            : "The California personal-injury estimator uses medical costs, income loss, injury severity, treatment, future losses, and comparative fault to show an educational range. No contact information is required to see the result."}
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
          title={isKo(locale) ? "두 사건이 완전히 같을 수는 없습니다." : "The number changes when the facts change."}
          intro={isKo(locale)
            ? "책임, 보험 한도, 부상 정도, 치료, 증거와 당사자의 상황에 따라 결과는 크게 달라질 수 있습니다."
            : "A result may be affected by liability disputes, policy limits, additional responsible parties, medical causation, the length and type of treatment, future medical needs, wage and earning losses, liens, comparative fault, and the quality of the supporting evidence."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
