import type { ReactNode } from "react";
import { ArrowRight, Camera, FileText, Phone, Scale, ShieldCheck, Stethoscope, Users } from "lucide-react";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import { brand, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (isKo(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined);

export const deepLayerStyles = `
.deep-seo-base > div > footer { display: none !important; }
.deep-seo-base > div > section:last-of-type { display: none !important; }
`;

export const DeepLabel = ({ children }: { children: ReactNode }) => (
  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#1E1C1A]/40">{children}</span>
);

export const DeepCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 ${className}`}>{children}</div>
);

export const DeepSectionTitle = ({ locale, label, title, body }: { locale: SiteLocale; label: string; title: string; body?: string }) => (
  <div className="max-w-[920px]">
    <DeepLabel>{label}</DeepLabel>
    <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(1.9rem,3.4vw,3.6rem)] font-medium leading-[1.26] tracking-[-0.04em]" : "editorial-serif mt-4 text-[clamp(2.35rem,4vw,4.55rem)] leading-[0.98] tracking-[-0.035em]"}`}>{title}</h2>
    {body && <p className="mt-5 max-w-[760px] text-[13px] leading-7 text-[#1E1C1A]/56">{body}</p>}
  </div>
);

const SourceLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.11em] text-[#381907] hover:opacity-60">
    {label}<ArrowRight className="h-3 w-3" />
  </a>
);

export const CaliforniaBasics = ({ locale, showAutoInsurance = true }: { locale: SiteLocale; showAutoInsurance?: boolean }) => {
  const cards = isKo(locale) ? [
    {
      icon: FileText,
      title: "일반적인 개인상해 소송 기한",
      body: "California Courts에 따르면 개인상해 소송은 일반적으로 부상일로부터 2년 안에 제기해야 합니다. 예외와 다른 기한이 적용될 수 있으므로 실제 사건의 날짜는 개별적으로 확인해야 합니다.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations",
      source: "California Courts",
    },
    {
      icon: ShieldCheck,
      title: "정부기관 관련 사고는 더 빠를 수 있습니다",
      body: "California Courts는 정부기관에 대한 부상 청구의 경우 일반적으로 6개월 안에 먼저 행정 청구를 해야 할 수 있다고 안내합니다. 정부 관련 사건은 일반 사건과 기한 구조가 다를 수 있습니다.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim",
      source: "California Courts",
    },
    ...(showAutoInsurance ? [{
      icon: Scale,
      title: "California 자동차 책임보험 최저 한도",
      body: "California DMV가 안내하는 현재 최저 책임보험 한도는 1인 상해·사망 $30,000, 2인 이상 $60,000, 재산 피해 $15,000입니다. 실제 이용 가능한 보험은 개별 정책에 따라 달라질 수 있습니다.",
      href: "https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/",
      source: "California DMV",
    }] : []),
    {
      icon: Camera,
      title: "증거는 시간이 지나며 사라질 수 있습니다",
      body: "사진, 영상, 목격자 정보, 보고서, 의료 기록과 보험 연락 기록은 사건의 책임과 손해를 이해하는 데 도움이 될 수 있습니다. 어떤 자료가 중요한지는 사고 유형에 따라 달라집니다.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury",
      source: "California Courts",
    },
  ] : [
    {
      icon: FileText,
      title: "California's general personal-injury deadline",
      body: "California Courts says a personal-injury lawsuit generally must be filed within two years of the injury. Exceptions and different rules can change the deadline, so the date for a specific matter should be checked individually.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations",
      source: "California Courts",
    },
    {
      icon: ShieldCheck,
      title: "Government claims can move much faster",
      body: "California Courts explains that an injury claim against a government entity may require an administrative claim within six months before a lawsuit can proceed. Government matters can have a very different deadline structure.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim",
      source: "California Courts",
    },
    ...(showAutoInsurance ? [{
      icon: Scale,
      title: "California's current auto-liability minimums",
      body: "California DMV lists minimum liability limits of $30,000 for injury or death to one person, $60,000 for more than one person, and $15,000 for property damage. Actual available coverage depends on the policies involved.",
      href: "https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/",
      source: "California DMV",
    }] : []),
    {
      icon: Camera,
      title: "Evidence can disappear with time",
      body: "Photographs, video, witness information, reports, medical records, and insurance communications can help explain liability and damages. The most useful evidence depends on the kind of accident and the issues being disputed.",
      href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury",
      source: "California Courts",
    },
  ];

  return (
    <section className="bg-[#F3EEE5] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle
          locale={locale}
          label={isKo(locale) ? "California 기본 정보" : "California essentials"}
          title={isKo(locale) ? "좋은 페이지는 법률 서비스만 말하지 않고, 독자가 알아야 할 기본 규칙도 설명합니다." : "A useful injury page should explain the legal basics, not just describe a service."}
          body={isKo(locale) ? "아래 내용은 일반적인 정보이며 법률 자문이 아닙니다. 실제 기한, 보험, 책임과 손해는 사건별 사실과 적용 법률에 따라 달라질 수 있습니다." : "These are general reference points, not legal advice. Deadlines, insurance, liability, and recoverable damages can change based on the facts and law that apply to a particular matter."}
        />
        <div className={`mt-10 grid gap-4 md:grid-cols-2 ${cards.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
          {cards.map(({ icon: Icon, title, body, href, source }) => (
            <DeepCard key={title} className="flex min-h-[260px] flex-col p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE5] text-[#381907]"><Icon className="h-4 w-4 stroke-[1.3]" /></div>
              <h3 style={serif(locale)} className="mt-8 text-[1.35rem] leading-[1.08]">{title}</h3>
              <p className="mt-4 flex-1 text-[11px] leading-6 text-[#1E1C1A]/52">{body}</p>
              <SourceLink href={href} label={source} />
            </DeepCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompensationSection = ({ locale }: { locale: SiteLocale }) => {
  const items = isKo(locale) ? [
    [Stethoscope, "치료와 향후 의료 필요", "응급치료, 진료, 영상검사, 재활, 전문의 치료와 장기적으로 필요한 치료가 사건 평가의 일부가 될 수 있습니다."],
    [Users, "소득과 업무 영향", "결근, 업무 제한, 복귀 지연 또는 장기적인 근로 능력 변화가 있다면 관련 기록이 중요할 수 있습니다."],
    [Scale, "일상생활과 비경제적 영향", "통증, 이동 제한, 수면, 가족 역할, 취미와 일상 활동의 변화도 부상의 전체 영향을 설명하는 데 관련될 수 있습니다."],
    [FileText, "기타 경제적 손실", "차량·재산 피해, 교통비, 도움을 받기 위한 비용 등 사고와 연결된 지출이 문제될 수 있습니다."],
  ] : [
    [Stethoscope, "Medical care and future needs", "Emergency care, appointments, imaging, rehabilitation, specialists, and reasonably anticipated future treatment can all become part of understanding the impact of an injury."],
    [Users, "Income and work impact", "Time away from work, restrictions, delayed return, or a longer-term change in earning ability may require documentation beyond a pay stub or a single missed shift."],
    [Scale, "Daily-life and non-economic impact", "Pain, mobility, sleep, family responsibilities, hobbies, and ordinary activities can help explain how an injury affected life beyond the medical bill."],
    [FileText, "Other economic losses", "Vehicle or property damage, transportation costs, replacement services, and other accident-related expenses may also matter depending on the claim."],
  ] as const;

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle
          locale={locale}
          label={isKo(locale) ? "손해의 전체 그림" : "The full picture of loss"}
          title={isKo(locale) ? "개인상해 사건은 첫 번째 병원비 한 장으로 설명되지 않습니다." : "An injury claim is usually bigger than the first medical bill."}
          body={isKo(locale) ? "어떤 손해가 실제로 보상 대상이 되는지는 사건별로 달라집니다. 중요한 것은 사고가 건강, 일, 비용과 일상생활에 어떤 변화를 만들었는지 일관된 기록으로 보여주는 것입니다." : "Which losses are legally recoverable depends on the facts and applicable law. The useful work is documenting how the accident changed health, work, expenses, and ordinary life in a consistent way."}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(([Icon, title, body], index) => {
            const IconCmp = Icon as typeof Stethoscope;
            return (
              <DeepCard key={String(title)} className="p-6">
                <div className="flex items-center justify-between"><IconCmp className="h-4 w-4 stroke-[1.3] text-[#381907]" /><span className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</span></div>
                <h3 style={serif(locale)} className="mt-8 text-[1.35rem] leading-[1.08]">{String(title)}</h3>
                <p className="mt-4 text-[11px] leading-6 text-[#1E1C1A]/52">{String(body)}</p>
              </DeepCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ClaimRoadmap = ({ locale }: { locale: SiteLocale }) => {
  const steps = isKo(locale) ? [
    ["01", "사실과 책임", "사고 경위, 당사자, 현장 자료와 초기 기록을 정리합니다."],
    ["02", "치료와 회복", "부상, 진단, 치료 경과, 제한과 향후 필요를 시간 순서로 정리합니다."],
    ["03", "보험과 적용 범위", "책임보험, 개인 보험, 추가 보험과 적용 가능한 정책을 확인합니다."],
    ["04", "손해 정리", "의료비, 소득, 일상생활의 변화와 기타 손실을 하나의 일관된 기록으로 연결합니다."],
    ["05", "해결 경로", "협상, 추가 조사 또는 소송 등 다음 단계는 증거와 사건의 상태에 따라 결정됩니다."],
  ] : [
    ["01", "Facts and liability", "Organize how the event happened, who may be responsible, and the scene evidence or reports that help explain it."],
    ["02", "Treatment and recovery", "Track diagnoses, treatment, restrictions, progress, setbacks, and any longer-term medical needs."],
    ["03", "Insurance and coverage", "Identify liability coverage, first-party coverage, additional policies, and the insurers or entities that may matter."],
    ["04", "Documenting the losses", "Connect medical expenses, work impact, daily limitations, and other financial consequences into one consistent record."],
    ["05", "Resolution strategy", "Negotiation, additional investigation, or litigation should follow the evidence and posture of the matter rather than a one-size-fits-all script."],
  ];

  return (
    <section className="bg-[#211A16] py-18 text-[#F3EEE5] md:py-24">
      <div className="site-shell">
        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/44">{isKo(locale) ? "사건의 흐름" : "How a claim develops"}</span>
        <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 max-w-[850px] text-[clamp(2rem,3.7vw,3.9rem)] font-medium leading-[1.24]" : "editorial-serif mt-4 max-w-[900px] text-[clamp(2.6rem,4.7vw,5.2rem)] leading-[0.96] tracking-[-0.035em]"}`}>
          {isKo(locale) ? "좋은 사건 준비는 많은 서류보다, 필요한 정보를 올바른 순서로 연결하는 일에 가깝습니다." : "A strong claim is less about producing more paper and more about connecting the right information in the right order."}
        </h2>
        <div className="mt-10 grid gap-3 lg:grid-cols-5">
          {steps.map(([number, title, body]) => (
            <div key={number} className="rounded-[5px] border border-white/12 bg-white/[0.04] p-5">
              <div className="text-[9px] text-white/28">{number}</div>
              <h3 style={serif(locale)} className="mt-7 text-[1.28rem] leading-tight">{title}</h3>
              <p className="mt-3 text-[10px] leading-5 text-white/48">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DeepPageShell = ({ locale, base, children }: { locale: SiteLocale; base: ReactNode; children: ReactNode }) => (
  <div className="min-h-screen bg-[#F9F8F6] text-[#1E1C1A]">
    <style>{deepLayerStyles}</style>
    <div className="deep-seo-base">{base}</div>
    {children}
    <section className="bg-[#211A16] text-[#F3EEE5]">
      <div className="site-shell grid gap-8 py-14 md:py-18 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
        <div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/48">{isKo(locale) ? "상담" : "Start here"}</span>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2.2rem,4.5vw,4.6rem)] font-medium leading-[1.22]" : "editorial-serif mt-5 max-w-[780px] text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"}`}>
            {isKo(locale) ? "사건의 사실부터 차분하게 정리할 수 있습니다." : "Start with the facts. The rest can be organized from there."}
          </h2>
        </div>
        <div className="rounded-[5px] bg-[#F3EEE5] p-6 text-[#1E1C1A] md:p-7">
          <p className="text-[12px] leading-6 text-[#1E1C1A]/56">{isKo(locale) ? "사고 경위, 치료 현황, 보험 연락과 가장 걱정되는 부분을 알려주세요." : "Share what happened, the treatment so far, any insurance communication, and what feels least clear right now."}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${prefix(locale)}/contact`} className="inline-flex items-center gap-3 rounded-full bg-[#381907] px-5 py-3 text-[11px] font-semibold text-[#F3EEE5]">{isKo(locale) ? "상담 예약" : "Schedule a consultation"}<ArrowRight className="h-3.5 w-3.5" /></a>
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#1E1C1A]/14 px-5 py-3 text-[11px] font-medium"><Phone className="h-3.5 w-3.5" />{brand.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);
