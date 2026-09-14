import { Award, Quote, Scale } from "lucide-react";
import heroOffice from "@/assets/law-firm/hero-law-office.webp";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import type { SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  PracticeLinks,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

const sections = (locale: SiteLocale) => isKo(locale)
  ? [
      { id: "approach", label: "업무 방식" },
      { id: "profile", label: "전문 프로필" },
      { id: "recognition", label: "후기 · 인정" },
      { id: "practice", label: "주요 사건 분야" },
    ]
  : [
      { id: "approach", label: "How he works" },
      { id: "profile", label: "Professional profile" },
      { id: "recognition", label: "Testimonials & recognition" },
      { id: "practice", label: "Practice focus" },
    ];

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "변호사" : "Attorney"}
        title="Howard Choi"
        description={isKo(locale)
          ? "사고·상해 사건에서 직접적인 소통과 명확한 다음 단계에 초점을 둡니다."
          : "Accident and injury representation built around direct communication, careful case development, and a clear next step."}
        image={heroOffice}
      />

      <ReadingLayout locale={locale} label={isKo(locale) ? "Howard Choi · 변호사" : "Howard Choi · Attorney"} sections={sections(locale)}>
        <ReadingSectionBlock
          id="approach"
          locale={locale}
          kicker={isKo(locale) ? "01 · 접근 방식" : "01 · Approach"}
          title={isKo(locale) ? "사건보다 먼저, 현재 상황을 명확하게 이해합니다." : "Start by making the situation understandable."}
          intro={isKo(locale)
            ? "부상 사건은 치료, 보험, 책임 문제와 생활상의 부담이 동시에 생길 수 있습니다. 중요한 것은 무엇이 지금 필요한지 우선순위를 세우는 것입니다."
            : "An injury matter can involve medical treatment, insurance, fault, evidence, and day-to-day pressure at the same time. The first job is to make those moving parts understandable."}
        >
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="overflow-hidden bg-[#DDD6CC]">
              <img src={leadCounsel} alt="Howard Choi" loading="lazy" decoding="async" className="aspect-[4/5] h-full w-full object-cover" />
            </div>
            <div className="space-y-6 text-[14px] leading-7 text-[#1E1C1A]/64">
              <p>{isKo(locale) ? "초기 상담에서는 사건이 법률적으로 맞는지뿐 아니라 의뢰인이 실제로 어떤 문제를 해결해야 하는지부터 확인합니다." : "The initial conversation should determine not only whether a matter fits legally, but what problem the client actually needs solved first."}</p>
              <p>{isKo(locale) ? "그 다음에는 필요한 기록과 증거를 정리하고, 보험과 치료 상황을 확인하며, 사건을 단계별로 준비합니다." : "From there, the work is to organize records and evidence, understand the insurance and treatment picture, and develop the claim step by step."}</p>
            </div>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="profile"
          locale={locale}
          kicker={isKo(locale) ? "02 · 전문 프로필" : "02 · Professional profile"}
          title={isKo(locale) ? "확인된 자격 정보만 공개합니다." : "Professional details should be precise, not decorative."}
          intro={isKo(locale)
            ? "학력, 캘리포니아 변호사 등록, 언어, 협회 및 전문 프로필 링크는 확인되는 즉시 이 영역에 추가할 수 있습니다."
            : "Education, California bar information, languages, memberships, and verified third-party profiles belong here once confirmed by the firm."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, Award, Quote].map((Icon, index) => (
              <div key={index} className="min-h-[190px] border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-10 text-[1.35rem] leading-tight">
                  {isKo(locale)
                    ? ["변호사 자격", "수상 · 협회", "전문 프로필"][index]
                    : ["Admissions", "Recognition", "Professional profiles"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">{isKo(locale) ? "확인된 실제 정보만 게시합니다." : "Reserved for verified information supplied by the firm."}</p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="recognition"
          locale={locale}
          kicker={isKo(locale) ? "03 · 신뢰" : "03 · Trust"}
          title={isKo(locale) ? "후기와 결과는 맥락과 함께 보여야 합니다." : "Credibility works best when it has context."}
          intro={isKo(locale)
            ? "실제 고객 후기, 대표 결과, 수상 경력은 승인 후 추가되며 과장된 성과 표현은 사용하지 않습니다."
            : "Approved client testimonials, representative outcomes, and verified recognition can be added here without turning the profile into a wall of claims."}
        >
          <blockquote className="border-l border-[#381907]/40 pl-6 md:pl-8">
            <p style={serifStyle(locale)} className="max-w-[760px] text-[clamp(1.65rem,2.7vw,2.8rem)] leading-[1.18] tracking-[-0.02em]">
              {isKo(locale) ? "실제 고객의 승인된 후기 한 문장이 이곳에 표시됩니다." : "One approved client quote can say more here than a row of generic trust badges."}
            </p>
            <footer className="mt-5 text-[9px] uppercase tracking-[0.15em] text-[#1E1C1A]/38">{isKo(locale) ? "실제 후기 승인 후 교체" : "Placeholder · replace with approved testimonial"}</footer>
          </blockquote>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="practice"
          locale={locale}
          kicker={isKo(locale) ? "04 · 주요 업무" : "04 · Practice focus"}
          title={isKo(locale) ? "주요 개인상해 사건 분야" : "Focused personal-injury practice areas."}
          intro={isKo(locale) ? "각 사건 분야 페이지에서 필요한 증거, 보험 문제와 일반적인 진행 방향을 확인할 수 있습니다." : "Each practice page explains the issues, evidence, and insurance questions that commonly matter in that type of claim."}
        >
          <PracticeLinks locale={locale} />
        </ReadingSectionBlock>
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
