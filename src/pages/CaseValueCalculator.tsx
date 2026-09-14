import { useMemo, useState } from "react";
import { ArrowRight, Check, Info, RotateCcw, Scale, ShieldCheck } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";
import { EditorialFrame, isKo, localePrefix, serifStyle } from "@/pages/editorial/shared";

type CaseType = "car" | "truck" | "motorcycle" | "pedestrian" | "rideshare" | "premises" | "other";
type Severity = "minor" | "moderate" | "serious" | "catastrophic";
type Treatment = "limited" | "er" | "therapy" | "injections" | "surgery";
type EvidenceKey = "report" | "photos" | "witness" | "medical" | "faultAccepted";
type MoneyKey = "medical" | "futureMedical" | "lostWages" | "futureIncome" | "property" | "otherCosts";

type CalculatorState = {
  caseType: CaseType | "";
  severity: Severity | "";
  treatment: Treatment | "";
  permanent: boolean;
  medical: number;
  futureMedical: number;
  lostWages: number;
  futureIncome: number;
  property: number;
  otherCosts: number;
  fault: number;
  evidence: EvidenceKey[];
};

const initialState: CalculatorState = {
  caseType: "",
  severity: "",
  treatment: "",
  permanent: false,
  medical: 0,
  futureMedical: 0,
  lostWages: 0,
  futureIncome: 0,
  property: 0,
  otherCosts: 0,
  fault: 0,
  evidence: [],
};

const severityRange: Record<Severity, [number, number]> = {
  minor: [1, 1.75],
  moderate: [1.75, 2.75],
  serious: [2.75, 4],
  catastrophic: [4, 5],
};

const treatmentBoost: Record<Treatment, number> = {
  limited: -0.25,
  er: 0,
  therapy: 0.15,
  injections: 0.35,
  surgery: 0.75,
};

const money = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(Math.max(0, Math.round(value)));

const clampMoney = (value: string | number, max = 10_000_000) => {
  const parsed = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, max);
};

const FieldLabel = ({ label, hint }: { label: string; hint?: string }) => (
  <div>
    <div className="text-[15px] font-semibold tracking-[-0.015em] text-[#18201D]">{label}</div>
    {hint ? <div className="mt-1.5 max-w-[620px] text-[12px] leading-5 text-[#18201D]/52">{hint}</div> : null}
  </div>
);

const SelectField = ({
  label,
  hint,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) => (
  <label className="block">
    <FieldLabel label={label} hint={hint} />
    <div className="relative mt-3">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[54px] w-full appearance-none rounded-[3px] border border-[#18201D]/14 bg-[#FCFBF8] px-4 pr-11 text-[16px] font-medium text-[#18201D] outline-none transition-colors focus:border-[#5D6C62]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#18201D]/45">↓</span>
    </div>
  </label>
);

const CurrencySlider = ({
  label,
  hint,
  value,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) => {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className="border-t border-[#18201D]/10 py-7">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_170px] md:items-start">
        <FieldLabel label={label} hint={hint} />
        <div className="flex h-[46px] items-center rounded-[3px] border border-[#18201D]/12 bg-[#FCFBF8] px-3 focus-within:border-[#5D6C62]">
          <span className="mr-2 text-[13px] text-[#18201D]/40">$</span>
          <input
            type="number"
            min="0"
            max={max}
            step={step}
            inputMode="decimal"
            value={value || ""}
            placeholder="0"
            onChange={(event) => onChange(clampMoney(event.target.value, max))}
            className="w-full bg-transparent text-right text-[16px] font-semibold tabular-nums text-[#18201D] outline-none placeholder:text-[#18201D]/24"
          />
        </div>
      </div>
      <div className="mt-5">
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{ background: `linear-gradient(90deg, #5D6C62 ${percent}%, rgba(24,32,29,.10) ${percent}%)` }}
          className="case-value-range h-[4px] w-full cursor-pointer appearance-none rounded-full"
          aria-label={label}
        />
        <div className="mt-2 flex justify-between text-[10px] tabular-nums text-[#18201D]/34"><span>$0</span><span>{money(max)}</span></div>
      </div>
    </div>
  );
};

const SectionHeader = ({ number, eyebrow, title, body, locale }: { number: string; eyebrow: string; title: string; body: string; locale: SiteLocale }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D6C62]"><span>{number}</span><span className="h-px w-8 bg-[#5D6C62]/35" /><span>{eyebrow}</span></div>
    <h2 style={serifStyle(locale)} className={isKo(locale) ? "mt-4 max-w-[760px] text-[clamp(2rem,3.4vw,3.5rem)] font-medium leading-[1.25] tracking-[-0.035em] text-[#18201D]" : "editorial-serif mt-4 max-w-[760px] text-[clamp(2.35rem,4vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-[#18201D]"}>{title}</h2>
    <p className="mt-4 max-w-[690px] text-[14px] leading-7 text-[#18201D]/58">{body}</p>
  </div>
);

export const CaseValueCalculatorPage = ({ locale }: { locale: SiteLocale }) => {
  const ko = isKo(locale);
  const [state, setState] = useState<CalculatorState>(initialState);

  const caseTypes: Array<{ value: CaseType; en: string; ko: string }> = [
    { value: "car", en: "Car accident", ko: "자동차 사고" },
    { value: "truck", en: "Truck accident", ko: "트럭 사고" },
    { value: "motorcycle", en: "Motorcycle accident", ko: "오토바이 사고" },
    { value: "pedestrian", en: "Pedestrian accident", ko: "보행자 사고" },
    { value: "rideshare", en: "Rideshare accident", ko: "라이드셰어 사고" },
    { value: "premises", en: "Slip, fall or unsafe property", ko: "미끄러짐·낙상·시설 사고" },
    { value: "other", en: "Another injury claim", ko: "기타 상해 사건" },
  ];

  const severities: Array<{ value: Severity; en: string; ko: string }> = [
    { value: "minor", en: "Minor — short recovery / limited treatment", ko: "경미 — 짧은 회복 / 제한적인 치료" },
    { value: "moderate", en: "Moderate — ongoing treatment / meaningful disruption", ko: "중간 — 지속 치료 / 일상생활 영향" },
    { value: "serious", en: "Serious — fracture / invasive care / long recovery", ko: "중상 — 골절 / 침습적 치료 / 장기 회복" },
    { value: "catastrophic", en: "Catastrophic or permanent — life-changing injury", ko: "중대·영구 부상 — 삶을 바꾸는 부상" },
  ];

  const treatments: Array<{ value: Treatment; en: string; ko: string }> = [
    { value: "limited", en: "Limited / conservative care", ko: "제한적·보존적 치료" },
    { value: "er", en: "ER / urgent care", ko: "응급실·긴급 진료" },
    { value: "therapy", en: "Physical therapy / ongoing treatment", ko: "물리치료·지속 치료" },
    { value: "injections", en: "Injections / specialist procedures", ko: "주사·전문의 시술" },
    { value: "surgery", en: "Surgery / hospitalization", ko: "수술·입원" },
  ];

  const estimate = useMemo(() => {
    if (!state.severity || !state.treatment) return null;
    const medicalBase = state.medical + state.futureMedical;
    const economic = medicalBase + state.lostWages + state.futureIncome + state.property + state.otherCosts;
    const [severityLow, severityHigh] = severityRange[state.severity];
    const boost = treatmentBoost[state.treatment] + (state.permanent ? 0.5 : 0);
    const multiplierLow = Math.min(5.5, Math.max(0.75, severityLow + boost));
    const multiplierHigh = Math.min(6.25, Math.max(1.25, severityHigh + boost));
    const nonEconomicLow = medicalBase * multiplierLow;
    const nonEconomicHigh = medicalBase * multiplierHigh;
    const faultFactor = Math.max(0, 1 - state.fault / 100);
    const low = (economic + nonEconomicLow) * faultFactor * 0.85;
    const high = (economic + nonEconomicHigh) * faultFactor * 1.15;
    return {
      economic,
      medicalBase,
      nonEconomicLow,
      nonEconomicHigh,
      low: Math.max(0, low),
      high: Math.max(low, high),
    };
  }, [state]);

  const hasMoney = state.medical + state.futureMedical + state.lostWages + state.futureIncome + state.property + state.otherCosts > 0;
  const ready = Boolean(estimate && hasMoney);
  const evidenceCount = state.evidence.length;
  const updateMoney = (key: MoneyKey, value: number) => setState((current) => ({ ...current, [key]: value }));
  const toggleEvidence = (key: EvidenceKey) => setState((current) => ({
    ...current,
    evidence: current.evidence.includes(key) ? current.evidence.filter((item) => item !== key) : [...current.evidence, key],
  }));
  const reset = () => setState(initialState);

  const estimateCard = (
    <div className="rounded-[6px] border border-[#18201D]/12 bg-[#FCFBF8] p-5 md:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#18201D]/10 pb-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5D6C62]">{ko ? "실시간 예상 범위" : "Live estimated range"}</div>
          <p className="mt-2 max-w-[330px] text-[11px] leading-5 text-[#18201D]/48">{ko ? "입력값을 변경하면 범위가 즉시 업데이트됩니다." : "Updates instantly as you change the inputs."}</p>
        </div>
        <Scale className="h-5 w-5 stroke-[1.3] text-[#5D6C62]" />
      </div>

      <div className="py-7">
        {ready && estimate ? (
          <>
            <div style={serifStyle(locale)} className={ko ? "text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-tight tracking-[-0.04em] text-[#18201D]" : "editorial-serif text-[clamp(2.7rem,4.8vw,4.8rem)] leading-[0.9] tracking-[-0.05em] text-[#18201D]"}>
              {money(estimate.low)}<span className="mx-2 text-[#18201D]/25">–</span>{money(estimate.high)}
            </div>
            <div className="mt-5 inline-flex rounded-full bg-[#E7ECE7] px-3 py-1.5 text-[10px] font-semibold text-[#455249]">{ko ? "교육용 추정치" : "Educational estimate"}</div>
          </>
        ) : (
          <>
            <div style={serifStyle(locale)} className={ko ? "text-[2rem] font-medium leading-tight text-[#18201D]/32" : "editorial-serif text-[3.5rem] leading-none tracking-[-0.04em] text-[#18201D]/22"}>$— to $—</div>
            <p className="mt-5 max-w-[330px] text-[12px] leading-6 text-[#18201D]/52">{ko ? "부상 정도, 치료 수준, 그리고 최소 한 가지 금전적 손실을 입력하면 범위가 나타납니다." : "Choose injury severity and treatment, then add at least one financial loss to see a range."}</p>
          </>
        )}
      </div>

      <div className="grid border-t border-[#18201D]/10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="border-b border-[#18201D]/10 py-4 sm:border-r sm:pr-4 lg:border-r-0 xl:border-r xl:pr-4">
          <div className="text-[9px] uppercase tracking-[0.12em] text-[#18201D]/36">{ko ? "경제적 손실" : "Economic losses"}</div>
          <div className="mt-2 text-[16px] font-semibold tabular-nums text-[#18201D]">{estimate ? money(estimate.economic) : "$0"}</div>
        </div>
        <div className="border-b border-[#18201D]/10 py-4 sm:pl-4 lg:pl-0 xl:pl-4">
          <div className="text-[9px] uppercase tracking-[0.12em] text-[#18201D]/36">{ko ? "본인 과실" : "Your fault input"}</div>
          <div className="mt-2 text-[16px] font-semibold tabular-nums text-[#18201D]">{state.fault}%</div>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-[11px] leading-5 text-[#18201D]/55">
        <div className="flex items-center justify-between gap-4"><span>{ko ? "의료비 기준" : "Medical-cost base"}</span><strong className="font-semibold text-[#18201D]">{estimate ? money(estimate.medicalBase) : "$0"}</strong></div>
        <div className="flex items-center justify-between gap-4"><span>{ko ? "비경제적 손해 모델" : "Modeled non-economic range"}</span><strong className="font-semibold text-right text-[#18201D]">{estimate ? `${money(estimate.nonEconomicLow)} – ${money(estimate.nonEconomicHigh)}` : "$0 – $0"}</strong></div>
        <div className="flex items-center justify-between gap-4"><span>{ko ? "자료 스냅샷" : "Documentation snapshot"}</span><strong className="font-semibold text-[#18201D]">{ko ? `${evidenceCount}/5 항목` : `${evidenceCount}/5 items`}</strong></div>
      </div>

      <div className="mt-6 border-t border-[#18201D]/10 pt-5">
        <p className="text-[10px] leading-5 text-[#18201D]/42">{ko ? "보험 한도, 의료비 유치권, 인과관계 분쟁, 향후 손실, 관할 및 실제 증거의 강도는 이 계산기가 알 수 없습니다." : "The calculator cannot know policy limits, liens, causation disputes, future proof, venue, or the real strength of the evidence."}</p>
        <a href={`${localePrefix(locale)}/contact`} className="mt-5 inline-flex w-full items-center justify-between rounded-[3px] bg-[#18201D] px-5 py-4 text-[11px] font-semibold text-white transition-opacity hover:opacity-88">
          <span>{ko ? "Howard에게 실제 검토 요청" : "Have Howard review the real facts"}</span><ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );

  const examples = ko ? [
    { title: "후방 추돌 + 물리치료", body: "응급실 또는 진료 후 몇 주간 물리치료를 받고 일부 임금 손실이 있는 비교적 단순한 자동차 사고 예시입니다.", meta: "중간 부상 · 물리치료 · 의료비 + 임금 손실" },
    { title: "오토바이 사고 + 수술", body: "골절, 수술, 장기 회복 및 상당한 결근이 있는 사건은 의료비와 향후 손실 입력이 크게 달라질 수 있습니다.", meta: "중상 · 수술 · 향후 치료 + 소득 손실" },
    { title: "낙상 + 과실 분쟁", body: "치료비가 있더라도 책임이 명확하지 않으면 과실 비율과 증거의 질이 예상 회수액에 큰 영향을 줄 수 있습니다.", meta: "중간 부상 · 치료 · 비교 과실" },
  ] : [
    { title: "Rear-end crash + physical therapy", body: "A relatively straightforward car-crash example with an ER or clinic visit, several weeks of therapy, and some missed work.", meta: "Moderate injury · Therapy · Medical bills + wages" },
    { title: "Motorcycle crash + surgery", body: "A fracture, surgery, long recovery, and significant time away from work can change both the medical and future-loss inputs dramatically.", meta: "Serious injury · Surgery · Future care + income loss" },
    { title: "Slip and fall + disputed fault", body: "Even with real treatment costs, unclear responsibility can make the fault percentage and quality of evidence especially important.", meta: "Moderate injury · Treatment · Comparative fault" },
  ];

  return (
    <EditorialFrame locale={locale}>
      <style>{`
        .case-value-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 999px; background: #FCFBF8; border: 2px solid #5D6C62; box-shadow: 0 1px 4px rgba(24,32,29,.12); }
        .case-value-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 999px; background: #FCFBF8; border: 2px solid #5D6C62; box-shadow: 0 1px 4px rgba(24,32,29,.12); }
      `}</style>
      <main className="bg-[#F4F1EB] pt-[60px] text-[#18201D]">
        <section className="overflow-hidden border-b border-[#18201D]/10 bg-[#ECEAE4]">
          <div className="site-shell grid gap-10 py-12 md:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#5D6C62]"><Scale className="h-4 w-4 stroke-[1.3]" /><span>{ko ? "캘리포니아 개인상해 계산기" : "California personal injury calculator"}</span></div>
              <h1 style={serifStyle(locale)} className={ko ? "mt-7 max-w-[850px] text-[clamp(2.7rem,5.2vw,5.4rem)] font-medium leading-[1.14] tracking-[-0.05em]" : "editorial-serif mt-7 max-w-[900px] text-[clamp(3.6rem,7vw,7.8rem)] leading-[0.87] tracking-[-0.055em]"}>
                {ko ? "내 사건의 가치는 얼마일까요?" : "What could your case be worth?"}
              </h1>
              <p className="mt-7 max-w-[680px] text-[16px] leading-8 text-[#18201D]/62">{ko ? "단계별 설문이 아니라 한 페이지에서 직접 숫자를 조정해 보세요. 입력값을 움직일 때 예상 범위도 함께 바뀝니다." : "Skip the quiz. Adjust the facts on one page and watch the educational range change with them."}</p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#18201D]/10 pt-5 text-[11px] font-medium text-[#18201D]/56">
                <span>✓ {ko ? "이메일 불필요" : "No email required"}</span>
                <span>✓ {ko ? "실시간 업데이트" : "Live estimate"}</span>
                <span>✓ {ko ? "캘리포니아 중심" : "California-focused"}</span>
              </div>
            </div>

            <div className="rounded-[6px] border border-[#18201D]/10 bg-[#FCFBF8]/85 p-6 md:p-7">
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#5D6C62]">{ko ? "어떤 결과를 보게 되나요" : "What the tool gives you"}</div>
              <div style={serifStyle(locale)} className={ko ? "mt-5 text-[2.2rem] font-medium leading-tight text-[#18201D]" : "editorial-serif mt-5 text-[3.4rem] leading-[0.94] tracking-[-0.04em] text-[#18201D]"}>{ko ? "하나의 숫자가 아니라 범위." : "A range, not a fake exact number."}</div>
              <div className="mt-7 grid grid-cols-3 border-y border-[#18201D]/10 py-4 text-center">
                <div><div className="text-[18px] font-semibold">01</div><div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[#18201D]/40">{ko ? "손실" : "Losses"}</div></div>
                <div className="border-x border-[#18201D]/10"><div className="text-[18px] font-semibold">02</div><div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[#18201D]/40">{ko ? "부상" : "Injury"}</div></div>
                <div><div className="text-[18px] font-semibold">03</div><div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[#18201D]/40">{ko ? "과실" : "Fault"}</div></div>
              </div>
              <p className="mt-5 text-[11px] leading-5 text-[#18201D]/48">{ko ? "결과는 교육용 시작점이며 실제 사건 가치를 결정하지 않습니다." : "The output is an educational starting point. It does not determine the value of a real claim."}</p>
            </div>
          </div>
        </section>

        <section id="calculator" className="site-shell py-12 md:py-16 lg:py-20">
          <div className="mb-12 grid gap-7 border-b border-[#18201D]/10 pb-10 lg:grid-cols-[0.52fr_1.48fr] lg:gap-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D6C62]">{ko ? "실시간 계산기" : "Live calculator"}</div>
            <div><h2 style={serifStyle(locale)} className={ko ? "text-[2rem] font-medium leading-[1.25]" : "editorial-serif text-[clamp(2.5rem,4.2vw,4.7rem)] leading-[0.98] tracking-[-0.035em]"}>{ko ? "아래로 스크롤하면서 입력값을 조정하세요." : "Scroll, adjust, and watch the estimate move."}</h2><p className="mt-4 max-w-[700px] text-[14px] leading-7 text-[#18201D]/56">{ko ? "드롭다운은 사건의 구조를 설정하고 슬라이더는 금액과 과실 비율을 빠르게 조정합니다. 정확한 금액은 옆의 숫자 칸에 직접 입력할 수 있습니다." : "Dropdowns set the shape of the claim. Sliders make the money and fault inputs fast to explore, while the number fields let you enter exact amounts."}</p></div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-20">
            <div className="min-w-0 space-y-16 md:space-y-20">
              <section>
                <SectionHeader number="01" eyebrow={ko ? "사고" : "Incident"} title={ko ? "먼저 사건의 종류를 알려주세요." : "Start with the kind of incident."} body={ko ? "사건 유형 자체가 숫자를 올리지는 않지만 이후 설명과 상담 맥락을 맞추는 데 도움이 됩니다." : "The incident type does not automatically increase the number. It helps frame the estimate and the questions that matter next."} locale={locale} />
                <div className="grid gap-6 md:grid-cols-2">
                  <SelectField label={ko ? "사건 유형" : "Type of incident"} value={state.caseType} placeholder={ko ? "선택하세요" : "Choose one"} options={caseTypes.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, caseType: value as CaseType | "" }))} />
                  <SelectField label={ko ? "장기적 또는 영구적 영향" : "Long-term or permanent effects"} value={state.permanent ? "yes" : "no"} placeholder="" options={[{ value: "no", label: ko ? "현재 예상되지 않음" : "Not currently expected" }, { value: "yes", label: ko ? "예상됨 / 가능성 있음" : "Expected / possible" }]} onChange={(value) => setState((current) => ({ ...current, permanent: value === "yes" }))} />
                </div>
              </section>

              <section>
                <SectionHeader number="02" eyebrow={ko ? "부상·치료" : "Injury & treatment"} title={ko ? "부상과 치료 수준을 설정하세요." : "Set the injury and treatment level."} body={ko ? "통증 자체를 숫자로 바꾸는 공식은 없습니다. 이 계산기는 치료비와 선택한 부상·치료 수준을 사용해 넓은 교육용 범위를 모델링합니다." : "There is no formula that turns pain into a precise dollar amount. This tool uses the medical-cost base plus the injury and treatment level to model a broad educational range."} locale={locale} />
                <div className="grid gap-6 md:grid-cols-2">
                  <SelectField label={ko ? "부상 정도" : "Injury severity"} hint={ko ? "회복 기간과 일상생활 영향에 가장 가까운 항목." : "Choose the description closest to the recovery and impact."} value={state.severity} placeholder={ko ? "부상 정도 선택" : "Choose severity"} options={severities.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, severity: value as Severity | "" }))} />
                  <SelectField label={ko ? "가장 높은 수준의 치료" : "Highest level of treatment"} hint={ko ? "현재까지 받은 가장 높은 수준의 치료." : "Use the highest level of treatment received so far."} value={state.treatment} placeholder={ko ? "치료 수준 선택" : "Choose treatment"} options={treatments.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, treatment: value as Treatment | "" }))} />
                </div>
              </section>

              <section>
                <SectionHeader number="03" eyebrow={ko ? "금전적 손실" : "Financial losses"} title={ko ? "금액을 움직여 사건의 경제적 기반을 만드세요." : "Move the numbers that form the economic base."} body={ko ? "슬라이더로 빠르게 조정하거나 오른쪽 입력창에 정확한 금액을 적으세요. 확실하지 않은 금액은 합리적인 현재 추정치를 사용하면 됩니다." : "Drag the sliders for speed or type an exact amount into the field. If a number is not final, use the best reasonable figure you have today."} locale={locale} />
                <div className="border-b border-[#18201D]/10">
                  <CurrencySlider label={ko ? "현재까지의 의료비" : "Medical bills to date"} hint={ko ? "응급실, 영상검사, 치료, 전문의, 처방 등." : "ER, imaging, therapy, specialists, prescriptions and related care."} value={state.medical} max={250000} step={500} onChange={(value) => updateMoney("medical", value)} />
                  <CurrencySlider label={ko ? "예상 향후 의료비" : "Expected future medical care"} hint={ko ? "예정된 치료, 수술, 재활 또는 장기 관리." : "Expected procedures, rehabilitation, surgery or long-term care."} value={state.futureMedical} max={500000} step={1000} onChange={(value) => updateMoney("futureMedical", value)} />
                  <CurrencySlider label={ko ? "현재까지의 임금 손실" : "Lost wages to date"} hint={ko ? "부상으로 일을 쉬면서 이미 잃은 소득." : "Income already lost because the injury kept you from working."} value={state.lostWages} max={150000} step={500} onChange={(value) => updateMoney("lostWages", value)} />
                  <CurrencySlider label={ko ? "향후 소득 손실" : "Future lost income / earning capacity"} hint={ko ? "예상되는 결근 또는 장기적인 소득 능력 감소." : "Expected future time away from work or reduced ability to earn."} value={state.futureIncome} max={1000000} step={2500} onChange={(value) => updateMoney("futureIncome", value)} />
                  <CurrencySlider label={ko ? "재산 피해" : "Property damage"} hint={ko ? "차량 수리 또는 기타 사고 관련 재산 손실." : "Vehicle repair or other incident-related property loss."} value={state.property} max={100000} step={500} onChange={(value) => updateMoney("property", value)} />
                  <CurrencySlider label={ko ? "기타 직접 비용" : "Other documented out-of-pocket costs"} hint={ko ? "교통, 장비, 도움 비용 등 직접적인 사고 관련 지출." : "Transportation, equipment, assistance and other direct incident-related expenses."} value={state.otherCosts} max={50000} step={250} onChange={(value) => updateMoney("otherCosts", value)} />
                </div>
              </section>

              <section>
                <SectionHeader number="04" eyebrow={ko ? "과실·증거" : "Fault & evidence"} title={ko ? "책임 비율과 현재 자료를 반영하세요." : "Account for fault and the record you have."} body={ko ? "캘리포니아에서는 부상자의 책임 비율에 따라 손해 회수액이 줄어들 수 있습니다. 아래 증거 항목은 산술을 올리지는 않지만 실제 검토에서 중요한 맥락입니다." : "In California, a recovery can be reduced by the injured person's share of responsibility. The evidence items below do not boost the arithmetic; they simply show what documentation may already exist."} locale={locale} />
                <div className="rounded-[5px] border border-[#18201D]/10 bg-[#FCFBF8]/65 p-5 md:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <FieldLabel label={ko ? "본인의 예상 과실 비율" : "Your estimated share of fault"} hint={ko ? "확실하지 않다면 0%에서 시작하고 실제 검토에서 조정할 수 있습니다." : "If you are unsure, start at 0% and let the real facts determine it later."} />
                    <div style={serifStyle(locale)} className="text-[clamp(2.8rem,5vw,4.5rem)] leading-none tracking-[-0.04em] text-[#5D6C62]">{state.fault}%</div>
                  </div>
                  <input type="range" min="0" max="100" step="5" value={state.fault} onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))} style={{ background: `linear-gradient(90deg, #5D6C62 ${state.fault}%, rgba(24,32,29,.10) ${state.fault}%)` }} className="case-value-range mt-7 h-[4px] w-full cursor-pointer appearance-none rounded-full" aria-label={ko ? "본인의 예상 과실 비율" : "Your estimated share of fault"} />
                  <div className="mt-3 flex justify-between text-[10px] text-[#18201D]/38"><span>0% · {ko ? "과실 없음" : "none"}</span><span>50%</span><span>100%</span></div>
                </div>

                <div className="mt-8">
                  <FieldLabel label={ko ? "현재 가지고 있는 자료" : "Documentation you already have"} hint={ko ? "해당되는 항목을 선택하세요." : "Select anything that already exists."} />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {([
                      ["report", ko ? "경찰·사고 보고서" : "Police / incident report"],
                      ["photos", ko ? "사진 또는 영상" : "Photos or video"],
                      ["witness", ko ? "목격자 정보" : "Witness information"],
                      ["medical", ko ? "의료 기록·청구서" : "Medical records / bills"],
                      ["faultAccepted", ko ? "상대 보험사의 책임 인정" : "Other insurer accepted fault"],
                    ] as Array<[EvidenceKey, string]>).map(([key, label]) => {
                      const selected = state.evidence.includes(key);
                      return <button key={key} type="button" onClick={() => toggleEvidence(key)} aria-pressed={selected} className={`flex min-h-[52px] items-center justify-between gap-4 rounded-[3px] border px-4 text-left text-[13px] font-medium transition-colors ${selected ? "border-[#5D6C62] bg-[#E7ECE7] text-[#18201D]" : "border-[#18201D]/10 bg-[#FCFBF8]/70 text-[#18201D]/70 hover:border-[#18201D]/24"}`}><span>{label}</span><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#5D6C62] bg-[#5D6C62] text-white" : "border-[#18201D]/18"}`}>{selected ? <Check className="h-3 w-3" /> : null}</span></button>;
                    })}
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#18201D]/10 pt-6">
                <div className="flex max-w-[600px] gap-2 text-[11px] leading-5 text-[#18201D]/45"><Info className="mt-0.5 h-4 w-4 shrink-0" /><span>{ko ? "이 계산기는 교육용이며 법률 자문, 합의 제안 또는 결과 보장이 아닙니다." : "Educational only. This calculator is not legal advice, a settlement offer, or a promise of any outcome."}</span></div>
                <button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 text-[11px] font-semibold text-[#18201D]/56 hover:text-[#18201D]"><RotateCcw className="h-3.5 w-3.5" />{ko ? "모두 초기화" : "Reset all"}</button>
              </div>
            </div>

            <aside className="min-w-0 lg:sticky lg:top-[88px]">
              {estimateCard}
            </aside>
          </div>
        </section>

        <section className="border-y border-[#18201D]/10 bg-[#FCFBF8]">
          <div className="site-shell py-14 md:py-18 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:gap-14">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D6C62]">{ko ? "예시 시나리오" : "Example scenarios"}</div>
              <div><h2 style={serifStyle(locale)} className={ko ? "max-w-[760px] text-[2rem] font-medium leading-[1.3]" : "editorial-serif max-w-[850px] text-[clamp(2.5rem,4vw,4.5rem)] leading-[1] tracking-[-0.035em]"}>{ko ? "같은 사고 유형이라도 입력값은 크게 달라질 수 있습니다." : "The same accident type can produce very different inputs."}</h2><p className="mt-4 max-w-[690px] text-[13px] leading-7 text-[#18201D]/55">{ko ? "아래는 실제 결과가 아니라 계산기에 어떤 사실을 넣는지 보여주는 예시입니다." : "These are not actual case results. They simply show the kinds of facts that change what you enter into the calculator."}</p></div>
            </div>
            <div className="mt-12 grid border-t border-[#18201D]/10 md:grid-cols-3">
              {examples.map((example, index) => <article key={example.title} className="border-b border-[#18201D]/10 py-7 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><div className="text-[10px] tabular-nums text-[#5D6C62]">0{index + 1}</div><h3 style={serifStyle(locale)} className="mt-8 text-[1.65rem] leading-[1.08] tracking-[-0.025em] text-[#18201D]">{example.title}</h3><p className="mt-4 text-[12px] leading-6 text-[#18201D]/54">{example.body}</p><div className="mt-6 border-t border-[#18201D]/8 pt-4 text-[10px] leading-5 text-[#18201D]/42">{example.meta}</div></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#E7ECE7]">
          <div className="site-shell grid gap-10 py-14 md:py-18 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-20">
            <div>
              <ShieldCheck className="h-5 w-5 stroke-[1.3] text-[#5D6C62]" />
              <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D6C62]">{ko ? "계산기가 알 수 없는 것" : "What a calculator cannot know"}</div>
            </div>
            <div>
              <h2 style={serifStyle(locale)} className={ko ? "text-[2rem] font-medium leading-[1.3]" : "editorial-serif text-[clamp(2.5rem,4vw,4.5rem)] leading-[1] tracking-[-0.035em]"}>{ko ? "실제 사건 가치는 결국 증거와 맥락에서 나옵니다." : "Real case value comes from evidence and context."}</h2>
              <div className="mt-8 grid gap-x-10 gap-y-0 md:grid-cols-2">
                {(ko ? ["보험 한도 및 추가 보장", "의료비 유치권과 상환", "기존 질환과 인과관계", "향후 치료를 뒷받침하는 증거", "증인과 기록의 신뢰도", "재판지와 실제 협상 상황"] : ["Insurance limits and additional coverage", "Medical liens and reimbursement", "Pre-existing conditions and causation", "Proof supporting future treatment", "Witness and record credibility", "Venue and real negotiation posture"]).map((item) => <div key={item} className="border-t border-[#18201D]/10 py-4 text-[13px] font-medium text-[#18201D]/70">{item}</div>)}
              </div>
              <a href={`${localePrefix(locale)}/contact`} className="mt-8 inline-flex items-center gap-3 rounded-[3px] bg-[#18201D] px-6 py-4 text-[11px] font-semibold text-white"><span>{ko ? "Howard Choi에게 사건 검토 요청" : "Ask Howard Choi to review the case"}</span><ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F1EB]">
          <div className="site-shell grid gap-10 py-14 md:py-18 lg:grid-cols-[0.52fr_1.48fr] lg:gap-14 lg:py-20">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5D6C62]">FAQ</div>
            <div className="border-t border-[#18201D]/10">
              {(ko ? [
                ["이 계산기 결과가 실제 합의 금액인가요?", "아닙니다. 입력값을 바탕으로 한 교육용 모델일 뿐이며 실제 합의, 평결 또는 회수 가능 금액을 예측하지 않습니다."],
                ["왜 정확한 한 숫자를 보여주지 않나요?", "개인상해 사건은 책임, 보험, 의료 기록, 향후 손실 및 증거에 따라 크게 달라집니다. 범위가 그 불확실성을 더 정직하게 보여줍니다."],
                ["계산기를 사용하면 변호사-의뢰인 관계가 생기나요?", "아닙니다. 계산기 사용만으로 변호사-의뢰인 관계가 형성되지 않습니다."],
              ] : [
                ["Is this my actual settlement value?", "No. It is an educational model based only on the inputs you provide. It does not predict a settlement, verdict, or actual recovery."],
                ["Why not give one exact number?", "Personal-injury claims can change materially with liability, coverage, medical evidence, future losses, and credibility. A range is a more honest way to show that uncertainty."],
                ["Does using the calculator create an attorney-client relationship?", "No. Using this calculator or viewing its output does not create an attorney-client relationship."],
              ]).map(([question, answer]) => <div key={question} className="grid gap-3 border-b border-[#18201D]/10 py-6 md:grid-cols-[0.7fr_1.3fr] md:gap-8"><h3 className="text-[14px] font-semibold leading-6 text-[#18201D]">{question}</h3><p className="text-[12px] leading-6 text-[#18201D]/54">{answer}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bg-[#18201D] text-white">
          <div className="site-shell grid gap-10 py-14 md:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:py-20">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">{ko ? "다음 단계" : "Next step"}</div><h2 style={serifStyle(locale)} className={ko ? "mt-5 max-w-[720px] text-[2.4rem] font-medium leading-[1.25]" : "editorial-serif mt-5 max-w-[760px] text-[clamp(3rem,5vw,5.8rem)] leading-[0.94] tracking-[-0.04em]"}>{ko ? "계산기가 모르는 사실을 실제 상담에서 확인하세요." : "Let a real review replace the assumptions."}</h2></div>
            <div className="border-t border-white/14 pt-5"><a href={`${localePrefix(locale)}/contact`} className="group flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>{ko ? "상담 요청" : "Request a consultation"}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a><a href={brand.phoneHref} className="flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>{brand.phoneDisplay}</span><span className="text-white/35">Call</span></a><p className="pt-5 text-[10px] leading-5 text-white/38">{ko ? "일반 정보용이며 법률 자문이 아닙니다. 과거 결과는 유사한 결과를 보장하지 않습니다." : "General information only; not legal advice. Prior results do not guarantee a similar outcome."}</p></div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
