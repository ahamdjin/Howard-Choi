import { MessageSquareText, Scale, ShieldCheck } from "lucide-react";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import type { SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "로펌 소개" : "About the firm"}
        title={isKo(locale) ? "지역에 집중하고, 설명은 명확하게." : "Local focus. Clear communication."}
        description={isKo(locale)
          ? "Buena Park를 중심으로 사고·개인상해 사건을 다루며, 의뢰인이 현재 상황과 다음 단계를 이해할 수 있도록 돕는 데 초점을 둡니다."
          : "A focused injury-law practice serving Buena Park and nearby communities, built around clear explanations, direct access, and careful case development."}
        image={heroBoardroom}
      />

      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "로펌 · 소개" : "Firm · About"}
        sections={isKo(locale)
          ? [{ id: "focus", label: "우리의 초점" }, { id: "working", label: "함께 일하는 방식" }, { id: "local", label: "지역 중심" }]
          : [{ id: "focus", label: "What the firm focuses on" }, { id: "working", label: "How the relationship works" }, { id: "local", label: "Local focus" }]}
      >
        <ReadingSectionBlock
          id="focus"
          locale={locale}
          kicker={isKo(locale) ? "01 · 초점" : "01 · Focus"}
          title={isKo(locale) ? "사건을 복잡하게 보이게 만드는 요소를 정리합니다." : "The work is to make a complicated situation easier to act on."}
          intro={isKo(locale)
            ? "사고 이후에는 치료, 보험, 책임 문제와 경제적 부담이 동시에 생길 수 있습니다. 로펌의 역할은 그 요소들을 정리하고 어떤 순서로 대응해야 하는지 명확하게 설명하는 것입니다."
            : "After an accident, treatment, insurance, responsibility, paperwork, and financial pressure can arrive at once. The firm’s role is to organize those issues and make the next step understandable."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, MessageSquareText, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사실 정리", "직접적인 소통", "신중한 준비"][index] : ["Understand the facts", "Direct communication", "Careful preparation"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사건의 핵심 사실과 우선순위를 먼저 확인합니다.", "현재 진행 상황과 다음 단계를 이해하기 쉽게 설명합니다.", "기록과 증거를 사건의 흐름에 맞게 준비합니다."][index]
                    : ["Identify the facts that matter and what needs attention first.", "Explain where the matter stands and what should happen next.", "Build the record around evidence, treatment, coverage, and impact."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="working"
          locale={locale}
          kicker={isKo(locale) ? "02 · 관계" : "02 · Working relationship"}
          title={isKo(locale) ? "의뢰인이 사건의 진행을 이해할 수 있어야 합니다." : "You should know what is happening in your own case."}
          intro={isKo(locale)
            ? "좋은 법률 서비스는 결과만 이야기하는 것이 아니라 현재 단계와 필요한 자료, 앞으로 예상되는 절차를 설명하는 데서 시작합니다."
            : "Good representation is not only about the eventual result. It also means explaining the current stage, what information is still needed, and what the client should expect next."}
        >
          <div className="editorial-callout">
            <span className="editorial-callout__label">{isKo(locale) ? "원칙" : "Principle"}</span>
            <p>{isKo(locale) ? "과장된 약속보다 확인된 사실과 현실적인 다음 단계가 더 중요합니다." : "Verified facts and a realistic next step are more useful than oversized promises."}</p>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "03 · 지역" : "03 · Local"}
          title={isKo(locale) ? "Buena Park를 중심으로 인근 지역을 지원합니다." : "Built around Buena Park and the surrounding communities."}
          intro={isKo(locale)
            ? "Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, La Habra와 인근 지역의 사고·상해 문제를 지원합니다."
            : "The firm serves people in Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, La Habra, and nearby communities across North Orange County and the county line."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
