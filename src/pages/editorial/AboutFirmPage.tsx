import { ArrowRight, MessageSquareText, Scale, ShieldCheck } from "lucide-react";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
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

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "로펌 소개" : "About the firm"}
        title={isKo(locale) ? "지역에 집중하고, 설명은 명확하게." : "We keep it simple: what happened, who is responsible, and what comes next."}
        description={isKo(locale)
          ? "Buena Park를 중심으로 사고·개인상해 사건을 다루며, 의뢰인이 현재 상황과 다음 단계를 이해할 수 있도록 돕는 데 초점을 둡니다."
          : "We are based on Beach Blvd in Buena Park and we take accident and injury cases across north Orange County and the nearby LA County cities. Most of our clients have never dealt with an injury claim before, and honestly that is fine. Figuring it out is our job, not yours."}
        image={heroBoardroom}
      />

      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "로펌 · 소개" : "Firm · About"}
        sections={isKo(locale)
          ? [
              { id: "focus", label: "우리의 초점" }, { id: "working", label: "함께 일하는 방식" }, { id: "process", label: "사건 진행" },
              { id: "team", label: "변호사·업무 분야" }, { id: "local", label: "지역 중심" },
            ]
          : [
              { id: "focus", label: "What the firm focuses on" }, { id: "working", label: "How the relationship works" }, { id: "process", label: "How a case develops" },
              { id: "team", label: "Attorney & practice" }, { id: "local", label: "Local focus" },
            ]}
      >
        <ReadingSectionBlock
          id="focus"
          locale={locale}
          kicker={isKo(locale) ? "01 · 초점" : "01 · Focus"}
          title={isKo(locale) ? "사건을 복잡하게 보이게 만드는 요소를 정리합니다." : "The first job is making sense of the mess."}
          intro={isKo(locale)
            ? "사고 이후에는 치료, 보험, 책임 문제와 경제적 부담이 동시에 생길 수 있습니다. 로펌의 역할은 그 요소들을 정리하고 어떤 순서로 대응해야 하는지 명확하게 설명하는 것입니다."
            : "After a crash everything shows up at once. Treatment. Insurance calls. A car you cannot drive. Missed paychecks. Arguments about who was at fault. We start by pulling those apart, locking down the evidence that will not survive a delay, and telling you what actually needs your attention this week versus what can wait."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, MessageSquareText, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">{isKo(locale) ? ["사실 정리", "직접적인 소통", "신중한 준비"][index] : ["Figure out what happened", "Tell you straight", "Build the record"][index]}</h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">{isKo(locale)
                  ? ["사건의 핵심 사실과 우선순위를 먼저 확인합니다.", "현재 진행 상황과 다음 단계를 이해하기 쉽게 설명합니다.", "기록과 증거를 사건의 흐름에 맞게 준비합니다."][index]
                  : ["How the accident happened, who might be on the hook, where your treatment stands, and what needs dealing with right now.", "Where the case stands, what we still need from you, and what you will have to decide next. No hiding behind legal words.", "Evidence, medical records, insurance, lost income and future care, organized so the claim explains itself."][index]}</p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="working"
          locale={locale}
          kicker={isKo(locale) ? "02 · 관계" : "02 · Working relationship"}
          title={isKo(locale) ? "의뢰인이 사건의 진행을 이해할 수 있어야 합니다." : "You should know what is going on in your own case."}
          intro={isKo(locale)
            ? "좋은 법률 서비스는 결과만 이야기하는 것이 아니라 현재 단계와 필요한 자료, 앞으로 예상되는 절차를 설명하는 데서 시작합니다."
            : "Good representation is not just the settlement at the end. It is knowing what we are doing, which records matter, how your treatment affects the claim, what the insurer is fighting, and what you will have to decide next. You should not have to chase us for any of that."}
        >
          <div className="editorial-callout"><span className="editorial-callout__label">{isKo(locale) ? "원칙" : "Working principle"}</span><p>{isKo(locale) ? "과장된 약속보다 확인된 사실과 현실적인 다음 단계가 더 중요합니다." : "We would rather tell you the case has a weak spot than promise a number we cannot back up. You will hear what is solid and what still needs work."}</p></div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "03 · 진행" : "03 · Case development"}
          title={isKo(locale) ? "사건은 한 번에 만들어지지 않습니다." : "A case gets clearer over time."}
          intro={isKo(locale) ? "사고 직후의 증거부터 치료 경과, 보험 검토, 손실 기록과 해결 선택지까지 사건은 시간이 지나며 더 분명해집니다." : "The first phone call almost never has every answer, and that is normal. Things sharpen up as we lock down evidence, your treatment plays out, we find out which policies actually apply, and the real cost of the injury becomes clear."}
        >
          <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", isKo(locale) ? "초기 확인" : "First look", isKo(locale) ? "사고, 치료, 보험과 긴급한 문제를 정리합니다." : "What happened, where treatment stands, which policies are involved, and any deadline or evidence about to slip away."],
              ["02", isKo(locale) ? "기록 구축" : "Build the record", isKo(locale) ? "책임, 치료, 손실과 관련 자료를 정리합니다." : "Liability evidence, medical records, lost pay, and every policy we can find."],
              ["03", isKo(locale) ? "평가" : "Add it up", isKo(locale) ? "회복 과정과 향후 필요를 바탕으로 선택지를 검토합니다." : "Where the medical picture landed, the care you will still need, what is being disputed, and what the claim is realistically worth."],
              ["04", isKo(locale) ? "해결" : "Resolve it", isKo(locale) ? "합의 또는 필요한 다음 절차를 검토합니다." : "Negotiate, settle, or file. Whichever one the record actually supports."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                <div className="text-[9px] text-[#1E1C1A]/25">{number}</div><div className="mt-8 text-[12px] font-semibold">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="team"
          locale={locale}
          kicker={isKo(locale) ? "04 · 법률팀" : "04 · Attorney & practice"}
          title={isKo(locale) ? "사람과 사건 유형을 함께 확인하세요." : "Check who you would actually be working with."}
          intro={isKo(locale) ? "변호사 등록 정보와 사고 유형별 업무 페이지를 통해 로펌의 실제 업무 범위를 확인할 수 있습니다." : "Before you hire anybody you should be able to look the lawyer up and confirm they handle your kind of accident. Howard is California Bar No. 284364 and that record is public, so we link straight to it."}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`${localePrefix(locale)}/attorney`} className="editorial-link-card"><div className="editorial-link-card__top"><span>01</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "변호사" : "Meet Howard Choi"}</h3><p>{isKo(locale) ? "Howard Choi 변호사의 캘리포니아 등록 정보와 법률팀의 업무 방식을 확인하세요." : "His verified California Bar record, license number, status and admission date, plus how he works a case."}</p></a>
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-link-card"><div className="editorial-link-card__top"><span>02</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "업무 분야" : "Explore practice areas"}</h3><p>{isKo(locale) ? "자동차, 트럭, 보행자, 승차공유, 낙상, 중대 상해 등 사건 유형별 안내를 확인하세요." : "Car, truck, motorcycle, pedestrian, rideshare, slip and fall, wrongful death, and serious injury."}</p></a>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "05 · 지역" : "05 · Local focus"}
          title={isKo(locale) ? "Buena Park를 중심으로 인근 지역을 지원합니다." : "Buena Park is home, and we know the area."}
          intro={isKo(locale)
            ? "Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk, Whittier와 인근 지역의 사고·상해 문제를 지원합니다."
            : "We work with people in Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk and Whittier. Knowing the area matters more than it sounds. Which agency wrote the report, which nearby business might still have camera footage, whether the case lands in Orange County or LA County, and which insurers keep turning up."}
        >
          <a href={`${localePrefix(locale)}/locations`} className="editorial-inline-link"><span>{isKo(locale) ? "지역별 사고·상해 가이드 보기" : "See the local accident guides"}</span><ArrowRight className="h-4 w-4" /></a>
        </ReadingSectionBlock>
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);