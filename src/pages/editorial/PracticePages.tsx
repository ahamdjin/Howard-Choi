import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import { getPracticeArea, practiceAreas, type SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  localePrefix,
  PracticeLinks,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "업무 분야" : "Practice areas"}
        title={isKo(locale) ? "사고 유형보다 중요한 것은 사건이 실제로 어떻게 영향을 미쳤는지입니다." : "Different accidents. One clear way to understand the claim."}
        description={isKo(locale)
          ? "자동차 사고부터 중대 상해까지, 각 사건 분야에서 어떤 사실과 증거가 중요한지 명확하게 설명합니다."
          : "From vehicle collisions to serious injuries, each practice area explains the facts, evidence, insurance questions, and next steps that commonly matter."}
        image={heroJustice}
      />
      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "개인상해 · 업무 분야" : "Personal injury · Practice areas"}
        sections={isKo(locale)
          ? [{ id: "overview", label: "전체 분야" }, { id: "process", label: "사건 진행" }, { id: "evidence", label: "증거와 기록" }]
          : [{ id: "overview", label: "All practice areas" }, { id: "process", label: "How a claim develops" }, { id: "evidence", label: "Evidence & records" }]}
      >
        <ReadingSectionBlock
          id="overview"
          locale={locale}
          kicker={isKo(locale) ? "01 · 분야" : "01 · Areas"}
          title={isKo(locale) ? "필요한 정보를 사건 유형별로 찾으세요." : "Find the issue that is closest to what happened."}
          intro={isKo(locale) ? "각 페이지는 일반적인 사건 구조를 설명하기 위한 것이며 실제 사건의 사실관계에 따라 접근은 달라집니다." : "Each page gives a practical overview of that claim type. The exact approach still depends on the facts, coverage, injuries, and evidence in the individual matter."}
        >
          <PracticeLinks locale={locale} />
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "02 · 진행" : "02 · Process"}
          title={isKo(locale) ? "좋은 사건 준비는 순서가 있습니다." : "A strong claim is built in the right order."}
          intro={isKo(locale) ? "초기에는 치료와 증거 보존이 중요하고, 이후에는 보험과 손실을 정리하며 책임과 손해를 설명할 수 있는 기록을 만들어갑니다." : "Early work usually focuses on treatment and preserving evidence. From there, the claim becomes a clearer record of responsibility, insurance coverage, medical impact, work loss, and day-to-day consequences."}
        >
          <div className="grid gap-0 border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[FileText, ShieldCheck, CheckCircle2].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["기록 확보", "보험 확인", "손실 정리"][index] : ["Preserve the record", "Understand coverage", "Document the loss"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사진, 영상, 진료기록과 목격자 등 초기 증거를 확보합니다.", "적용 가능한 보험과 책임 당사자를 확인합니다.", "치료비뿐 아니라 업무와 일상생활에 미친 영향을 정리합니다."][index]
                    : ["Secure photos, video, medical records, witness information, and other early evidence.", "Identify the policies and responsible parties that may matter.", "Show the medical, work, and everyday impact rather than only the first bill."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="evidence"
          locale={locale}
          kicker={isKo(locale) ? "03 · 증거" : "03 · Evidence"}
          title={isKo(locale) ? "사건은 기억보다 기록으로 설명하는 것이 좋습니다." : "Claims are easier to understand when the record is organized."}
          intro={isKo(locale) ? "사고 현장 자료, 차량 정보, 진료 기록, 보험 서신과 업무 손실 자료를 일관된 흐름으로 정리하면 사건을 설명하기 쉬워집니다." : "Scene material, vehicle information, treatment records, insurance correspondence, and work-loss documentation become much more useful when they tell one consistent story."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  if (!practice) return null;

  const title = isKo(locale) ? practice.koTitle : practice.title;
  const description = isKo(locale) ? practice.koDescription : practice.description;
  const intro = isKo(locale) ? practice.koIntro : practice.intro;
  const issues = isKo(locale) ? practice.koIssues : practice.issues;

  return (
    <EditorialFrame locale={locale}>
      <main>
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "개인상해 · 업무 분야" : "Personal injury · Practice area"}
          title={title}
          description={description}
          image={heroCourthouse}
        />
        <ReadingLayout
          locale={locale}
          label={`${title} · ${isKo(locale) ? "안내" : "Guide"}`}
          sections={isKo(locale)
            ? [{ id: "understand", label: "사건 이해" }, { id: "issues", label: "주요 쟁점" }, { id: "next", label: "다음 단계" }, { id: "related", label: "다른 업무 분야" }]
            : [{ id: "understand", label: "Understanding the claim" }, { id: "issues", label: "Key issues" }, { id: "next", label: "What happens next" }, { id: "related", label: "Related practice areas" }]}
        >
          <ReadingSectionBlock
            id="understand"
            locale={locale}
            kicker={isKo(locale) ? "01 · 이해" : "01 · Understand"}
            title={isKo(locale) ? `${title} 사건에서 먼저 확인할 것` : `What matters first in a ${title.toLowerCase()} claim.`}
            intro={intro}
          >
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "핵심" : "Key point"}</span>
              <p>{isKo(locale) ? "사건의 가치는 단일 숫자가 아니라 책임, 보험, 치료, 향후 영향과 실제 증거를 함께 보고 판단해야 합니다." : "A claim is not one number. Liability, available coverage, treatment, future impact, and the quality of the evidence all work together."}</p>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="issues"
            locale={locale}
            kicker={isKo(locale) ? "02 · 주요 쟁점" : "02 · Key issues"}
            title={isKo(locale) ? "이 유형의 사건에서 자주 확인하는 항목" : "Common issues that deserve a closer look."}
          >
            <div className="editorial-issue-list">
              {issues.map((issue, index) => (
                <div key={issue} className="editorial-issue-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{issue}</strong>
                </div>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="next"
            locale={locale}
            kicker={isKo(locale) ? "03 · 다음 단계" : "03 · Next step"}
            title={isKo(locale) ? "지금 가지고 있는 정보부터 정리하면 됩니다." : "Start with the facts you already have."}
            intro={isKo(locale) ? "사고 일시와 장소, 치료 상황, 보험 정보, 사진이나 문서가 있다면 상담 전에 함께 정리해 두는 것이 좋습니다." : "The date and location of the incident, current treatment, insurance information, photos, documents, and any communication you have already received are a useful starting point."}
          >
            <a href={`${localePrefix(locale)}/contact`} className="editorial-inline-link">
              <span>{isKo(locale) ? "상담 요청" : "Request a consultation"}</span><ArrowRight className="h-4 w-4" />
            </a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="related"
            locale={locale}
            kicker={isKo(locale) ? "04 · 더 보기" : "04 · Explore"}
            title={isKo(locale) ? "다른 개인상해 업무 분야" : "Related personal-injury topics."}
          >
            <div className="editorial-link-grid">
              {practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 4).map((item) => (
                <a key={item.slug} href={`${localePrefix(locale)}/practice-areas/${item.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koTitle : item.title}</h3>
                  <p>{isKo(locale) ? item.koDescription : item.description}</p>
                </a>
              ))}
            </div>
          </ReadingSectionBlock>
        </ReadingLayout>
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
