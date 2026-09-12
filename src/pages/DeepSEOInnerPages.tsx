import { useParams } from "@tanstack/react-router";
import { FileText, Scale, ShieldCheck, Stethoscope, Users } from "lucide-react";
import {
  AboutFirmPage as RichAboutFirmPage,
  AttorneyPage as RichAttorneyPage,
  PracticeAreaDetailPage as RichPracticeAreaDetailPage,
  PracticeAreasPage as RichPracticeAreasPage,
  ResultsPage as RichResultsPage,
} from "@/pages/RichSEOInnerPages";
import {
  CaliforniaBasics,
  ClaimRoadmap,
  CompensationSection,
  DeepCard,
  DeepLabel,
  DeepPageShell,
  DeepSectionTitle,
} from "@/pages/DeepSEOShared";
import { getPracticeArea, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined);

const AttorneyDepth = ({ locale }: { locale: SiteLocale }) => {
  const items = isKo(locale) ? [
    [FileText, "책임과 사고 경위", "누가 무엇을 했는지뿐 아니라 사고 전후의 순서, 현장 상태, 보고서와 독립적인 자료를 함께 봅니다."],
    [Stethoscope, "의료 기록과 회복 과정", "진단명 한 줄보다 치료 경과, 증상 변화, 제한과 향후 필요가 더 완전한 그림을 만들 수 있습니다."],
    [ShieldCheck, "보험 구조", "상대방 보험뿐 아니라 본인 보험, 추가 피보험자, 회사 또는 다른 책임 당사자까지 검토가 필요할 수 있습니다."],
    [Users, "업무와 생활의 변화", "결근, 업무 제한, 가족 역할, 이동, 수면과 일상 활동의 변화를 기록하면 부상의 실제 영향을 설명하는 데 도움이 됩니다."],
    [Scale, "책임이 다투어질 때", "사고 당사자의 기억만으로 해결되지 않을 수 있습니다. 사진, 영상, 물리적 손상, 목격자와 객관적 기록이 중요해질 수 있습니다."],
    [FileText, "시간과 기한", "증거와 법적 기한 모두 시간이 중요합니다. 특히 정부기관이 관련된 사건은 일반적인 개인상해 사건보다 더 빠른 절차가 필요할 수 있습니다."],
  ] : [
    [FileText, "Liability and the sequence of events", "The useful question is not only who says what happened, but how the event unfolded, what the scene showed, and what independent records can confirm or challenge each account."],
    [Stethoscope, "The medical story over time", "A diagnosis alone rarely tells the full story. Treatment, symptom changes, restrictions, referrals, recovery, and future needs can make the medical picture much more complete."],
    [ShieldCheck, "The insurance structure", "The relevant coverage may extend beyond the obvious liability policy. First-party coverage, additional insureds, commercial policies, or other responsible parties can matter depending on the facts."],
    [Users, "Work and ordinary life", "Missed work, restrictions, family responsibilities, transportation, sleep, hobbies, and ordinary activities can help document the real-world impact of an injury."],
    [Scale, "When responsibility is disputed", "A case does not have to depend only on competing memories. Photographs, video, physical damage, witnesses, reports, and other objective records can become especially important."],
    [FileText, "Timing and deadlines", "Evidence can disappear and legal deadlines can expire. Claims involving a public agency can also follow a much faster process than an ordinary personal-injury matter."],
  ] as const;

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle
          locale={locale}
          label={isKo(locale) ? "사건을 보는 관점" : "What a complete injury file connects"}
          title={isKo(locale) ? "변호사 페이지가 풍부해지려면, 이력뿐 아니라 실제 사건에서 어떤 문제를 연결하는지도 보여줘야 합니다." : "A strong attorney page should show more than a biography. It should show how the moving parts of an injury matter fit together."}
          body={isKo(locale) ? "학력, 수상, 입회와 대표 사건 등 Howard Choi 변호사의 개별 경력 정보는 확인된 자료가 제공되는 즉시 추가할 수 있습니다. 그 전까지는 확인되지 않은 내용을 만들지 않고 실제 개인상해 사건에서 중요한 구조를 설명합니다." : "Verified education, admissions, awards, memberships, representative matters, and professional profiles can be added as soon as the firm supplies them. Until then, the page stays useful without inventing credentials."}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map(([Icon, title, body], index) => {
            const IconCmp = Icon as typeof FileText;
            return (
              <DeepCard key={String(title)} className="p-6">
                <div className="flex items-center justify-between"><IconCmp className="h-4 w-4 stroke-[1.3] text-[#381907]" /><span className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</span></div>
                <h3 style={serif(locale)} className="mt-8 text-[1.4rem] leading-[1.08]">{String(title)}</h3>
                <p className="mt-4 text-[11px] leading-6 text-[#1E1C1A]/52">{String(body)}</p>
              </DeepCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FirmDepth = ({ locale }: { locale: SiteLocale }) => {
  const rows = isKo(locale) ? [
    ["명확한 초기 평가", "사고 유형, 책임, 부상 정도, 보험과 현재 상황을 정리해 무엇이 중요한지 먼저 확인합니다."],
    ["증거 보존", "현장 사진, 영상, 목격자, 보고서, 사업장 기록 등 시간이 지나면 없어질 수 있는 자료를 빠르게 파악합니다."],
    ["치료와 손해 기록", "의료 기록, 업무 손실, 비용과 생활 변화를 하나의 일관된 타임라인으로 연결합니다."],
    ["보험과 책임 당사자", "한 명의 운전자나 한 개의 보험으로 끝나지 않는 사건에서는 추가 당사자와 정책을 함께 살펴봅니다."],
    ["현실적인 다음 단계", "모든 사건을 똑같은 방식으로 진행하지 않고, 증거와 현재 단계에 맞춰 다음 행동을 정합니다."],
  ] : [
    ["A clear first evaluation", "Organize the kind of accident, liability issues, injuries, insurance, and current posture so the important questions are visible early."],
    ["Preserving evidence", "Identify scene photographs, video, witnesses, reports, business records, or other material that may become harder to obtain with time."],
    ["Documenting treatment and loss", "Connect medical records, work impact, expenses, and daily-life changes into a consistent chronology rather than a pile of unrelated documents."],
    ["Coverage and responsible parties", "Some matters involve more than one driver, owner, employer, business, or insurance policy. The structure of responsibility can matter as much as the event itself."],
    ["A realistic next step", "The right next move depends on the evidence and posture of the matter. A good process should not force every claim into the same script."],
  ];

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <DeepLabel>{isKo(locale) ? "실제 업무" : "What the work actually involves"}</DeepLabel>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(2rem,3.6vw,3.8rem)] font-medium leading-[1.25]" : "editorial-serif mt-4 text-[clamp(2.6rem,4.5vw,4.9rem)] leading-[0.96] tracking-[-0.035em]"}`}>
            {isKo(locale) ? "좋은 로펌 소개는 가치관만 말하지 않고, 사고 이후 실제로 무엇을 정리하는지 보여줍니다." : "A useful firm page should explain the work behind the promise."}
          </h2>
        </div>
        <div className="grid gap-3">
          {rows.map(([title, body], index) => (
            <DeepCard key={title} className="grid gap-4 p-5 md:grid-cols-[54px_0.55fr_1.45fr] md:items-start md:p-6">
              <span className="text-[9px] text-[#1E1C1A]/26">0{index + 1}</span>
              <h3 className="text-[12px] font-semibold">{title}</h3>
              <p className="text-[11px] leading-6 text-[#1E1C1A]/52">{body}</p>
            </DeepCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultDepth = ({ locale }: { locale: SiteLocale }) => {
  const items = isKo(locale) ? [
    ["사건 유형", "어떤 종류의 사고와 청구였는지"],
    ["핵심 쟁점", "책임, 보험, 의료 또는 손해에서 무엇이 중요했는지"],
    ["결과의 맥락", "합의인지 평결인지, 어떤 단계에서 해결되었는지"],
    ["제한과 고지", "과거 결과가 다른 사건의 결과를 보장하지 않는다는 점"],
  ] : [
    ["Type of matter", "What kind of accident or claim the result came from."],
    ["Important issues", "What mattered in liability, insurance, medical proof, or damages."],
    ["Context of the outcome", "Whether it was a settlement or verdict and where the matter stood when it resolved."],
    ["Limits and disclaimer", "Why a past result does not guarantee or predict the outcome of a different matter."],
  ];

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle locale={locale} label={isKo(locale) ? "결과를 읽는 방법" : "How to read a case result"} title={isKo(locale) ? "숫자 하나보다 사건의 맥락이 더 많은 정보를 줍니다." : "A number means more when the page explains what sits behind it."} body={isKo(locale) ? "실제 결과가 제공되면 금액만 크게 보여주는 대신 아래 네 가지 정보를 함께 제공하는 구조가 더 유용합니다." : "When approved results are available, the page should present more than a large dollar figure. These four elements make a result more useful and more credible."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(([title, body], index) => <DeepCard key={title} className="p-6"><div className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</div><h3 style={serif(locale)} className="mt-8 text-[1.35rem] leading-tight">{title}</h3><p className="mt-4 text-[11px] leading-6 text-[#1E1C1A]/52">{body}</p></DeepCard>)}
        </div>
      </div>
    </section>
  );
};

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <DeepPageShell locale={locale} base={<RichAttorneyPage locale={locale} />}>
    <AttorneyDepth locale={locale} />
    <CaliforniaBasics locale={locale} />
    <ClaimRoadmap locale={locale} />
  </DeepPageShell>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <DeepPageShell locale={locale} base={<RichAboutFirmPage locale={locale} />}>
    <FirmDepth locale={locale} />
    <CaliforniaBasics locale={locale} showAutoInsurance={false} />
  </DeepPageShell>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <DeepPageShell locale={locale} base={<RichPracticeAreasPage locale={locale} />}>
    <CaliforniaBasics locale={locale} />
    <CompensationSection locale={locale} />
    <ClaimRoadmap locale={locale} />
  </DeepPageShell>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  const autoRelated = !!practice && ["car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents", "rideshare-accidents", "serious-injuries", "wrongful-death"].includes(practice.slug);

  return (
    <DeepPageShell locale={locale} base={<RichPracticeAreaDetailPage locale={locale} />}>
      <CaliforniaBasics locale={locale} showAutoInsurance={autoRelated} />
      <CompensationSection locale={locale} />
      <ClaimRoadmap locale={locale} />
    </DeepPageShell>
  );
};

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <DeepPageShell locale={locale} base={<RichResultsPage locale={locale} />}>
    <ResultDepth locale={locale} />
  </DeepPageShell>
);
