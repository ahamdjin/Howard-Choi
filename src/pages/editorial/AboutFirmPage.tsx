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
        title={isKo(locale) ? "지역에 집중하고, 설명은 명확하게." : "A personal injury law firm built around clarity, preparation, and local access."}
        description={isKo(locale)
          ? "Buena Park를 중심으로 사고·개인상해 사건을 다루며, 의뢰인이 현재 상황과 다음 단계를 이해할 수 있도록 돕는 데 초점을 둡니다."
          : "Based in Buena Park and serving nearby Orange and Los Angeles County communities, the firm focuses on accident and injury matters that require careful evidence, insurance analysis, and clear communication with the people whose lives have been disrupted."}
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
          title={isKo(locale) ? "사건을 복잡하게 보이게 만드는 요소를 정리합니다." : "The first job is to make a complicated injury claim understandable."}
          intro={isKo(locale)
            ? "사고 이후에는 치료, 보험, 책임 문제와 경제적 부담이 동시에 생길 수 있습니다. 로펌의 역할은 그 요소들을 정리하고 어떤 순서로 대응해야 하는지 명확하게 설명하는 것입니다."
            : "After an accident, medical treatment, insurance, responsibility, vehicle or property damage, missed work, future care, and deadlines can arrive at once. The legal work begins by separating those issues, protecting the evidence, and deciding what needs attention now versus what develops over time."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, MessageSquareText, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사실 정리", "직접적인 소통", "신중한 준비"][index] : ["Understand the facts", "Communicate clearly", "Build the record"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사건의 핵심 사실과 우선순위를 먼저 확인합니다.", "현재 진행 상황과 다음 단계를 이해하기 쉽게 설명합니다.", "기록과 증거를 사건의 흐름에 맞게 준비합니다."][index]
                    : ["Identify how the accident happened, who may be responsible, what treatment is underway, and which issues need an immediate response.", "Explain the current stage, what information is still needed, and the choices that may come next without hiding the process behind legal language.", "Organize evidence, medical documentation, insurance information, financial loss, and future needs into a record that explains the claim clearly."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="working"
          locale={locale}
          kicker={isKo(locale) ? "02 · 관계" : "02 · Working relationship"}
          title={isKo(locale) ? "의뢰인이 사건의 진행을 이해할 수 있어야 합니다." : "Clients should understand what is happening in their own case."}
          intro={isKo(locale)
            ? "좋은 법률 서비스는 결과만 이야기하는 것이 아니라 현재 단계와 필요한 자료, 앞으로 예상되는 절차를 설명하는 데서 시작합니다."
            : "Good injury representation is not only about an eventual settlement or verdict. It also means knowing what the legal team is doing, what records matter, how treatment and recovery affect the claim, what the insurer is disputing, and what decision is coming next."}
        >
          <div className="editorial-callout">
            <span className="editorial-callout__label">{isKo(locale) ? "원칙" : "Working principle"}</span>
            <p>{isKo(locale) ? "과장된 약속보다 확인된 사실과 현실적인 다음 단계가 더 중요합니다." : "A useful legal strategy starts with verified facts and realistic options. The firm aims to explain both the strength of the record and the questions that still need answers."}</p>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "03 · 지역" : "03 · Local focus"}
          title={isKo(locale) ? "Buena Park를 중심으로 인근 지역을 지원합니다." : "Based in Buena Park, with a practical focus on the surrounding communities."}
          intro={isKo(locale)
            ? "Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, La Habra와 인근 지역의 사고·상해 문제를 지원합니다."
            : "The firm serves people in Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, La Habra, and nearby communities. Local context can help identify the right police or incident records, nearby cameras, treatment logistics, county-specific venue questions, and the businesses or insurers connected to an accident."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
