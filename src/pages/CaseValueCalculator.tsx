import PageBreadcrumb from "@/components/PageBreadcrumb";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Info, Mail, RotateCcw } from "lucide-react";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import { brand, type SiteLocale } from "@/data/injurySite";
import { EditorialFrame, isKo, localePrefix, serifStyle } from "@/pages/editorial/shared";

type CaseType = "car" | "truck" | "motorcycle" | "pedestrian" | "rideshare" | "premises" | "other";
type Severity = "minor" | "moderate" | "serious" | "catastrophic";
type Treatment = "limited" | "er" | "therapy" | "injections" | "surgery";

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
  fault: number;
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
  fault: 0,
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

const clampMoney = (value: string, max = 5_000_000) => {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, max);
};

const InputLabel = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
  <span className="mb-2 block">
    <span className="block text-[13px] font-semibold text-[#211E1B]">{children}</span>
    {hint ? <span className="mt-1 block text-[13px] leading-5 text-[#211E1B]/70">{hint}</span> : null}
  </span>
);

const CurrencyInput = ({ label, hint, value, onChange }: {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <label className="block">
    <InputLabel hint={hint}>{label}</InputLabel>
    <div className="flex h-11 items-center rounded-[3px] border border-[#211E1B]/14 bg-white px-3 focus-within:border-[#6E635A]">
      <span className="mr-2 text-[13px] text-[#211E1B]/70">$</span>
      <input
        type="number"
        min="0"
        step="100"
        inputMode="decimal"
        value={value || ""}
        placeholder="0"
        onChange={(event) => onChange(clampMoney(event.target.value))}
        className="w-full bg-transparent text-[16px] font-medium tabular-nums text-[#211E1B] outline-none placeholder:text-[#211E1B]/25"
      />
    </div>
  </label>
);

const SelectInput = ({ label, hint, value, placeholder, options, onChange }: {
  label: string;
  hint?: string;
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) => (
  <label className="block">
    <InputLabel hint={hint}>{label}</InputLabel>
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-[3px] border border-[#211E1B]/14 bg-white px-3 pr-9 text-[16px] text-[#211E1B] outline-none focus:border-[#6E635A]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#211E1B]/45">↓</span>
    </div>
  </label>
);

export const CaseValueCalculatorPage = ({ locale }: { locale: SiteLocale }) => {
  const ko = isKo(locale);
  const [state, setInputs] = useState<CalculatorState>(initialState);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");
  const setState = (update: React.SetStateAction<CalculatorState>) => {
    setInputs(update);
    setCalculated(false);
    setError("");
  };
  const [review, setReview] = useState({ full_name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const caseTypes: Array<{ value: CaseType; en: string; ko: string }> = [
    { value: "car", en: "Car accident", ko: "자동차 사고" },
    { value: "truck", en: "Truck accident", ko: "트럭 사고" },
    { value: "motorcycle", en: "Motorcycle accident", ko: "오토바이 사고" },
    { value: "pedestrian", en: "Pedestrian accident", ko: "보행자 사고" },
    { value: "rideshare", en: "Rideshare accident", ko: "라이드셰어 사고" },
    { value: "premises", en: "Slip, fall or unsafe property", ko: "낙상·시설 사고" },
    { value: "other", en: "Another injury claim", ko: "기타 상해 사건" },
  ];

  const severities: Array<{ value: Severity; en: string; ko: string }> = [
    { value: "minor", en: "Minor, short recovery", ko: "경미, 짧은 회복" },
    { value: "moderate", en: "Moderate, ongoing treatment", ko: "중간, 지속 치료" },
    { value: "serious", en: "Serious, fracture or long recovery", ko: "중상, 골절 또는 장기 회복" },
    { value: "catastrophic", en: "Catastrophic / permanent", ko: "중대·영구 부상" },
  ];

  const treatments: Array<{ value: Treatment; en: string; ko: string }> = [
    { value: "limited", en: "Limited / conservative care", ko: "제한적·보존적 치료" },
    { value: "er", en: "ER / urgent care", ko: "응급실·긴급 진료" },
    { value: "therapy", en: "Physical therapy / ongoing care", ko: "물리치료·지속 치료" },
    { value: "injections", en: "Injections / specialist procedures", ko: "주사·전문의 시술" },
    { value: "surgery", en: "Surgery / hospitalization", ko: "수술·입원" },
  ];

  const estimate = useMemo(() => {
    if (!state.severity || !state.treatment) return null;
    const medicalBase = state.medical + state.futureMedical;
    const economic = medicalBase + state.lostWages + state.futureIncome + state.property;
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
      nonEconomicLow,
      nonEconomicHigh,
      faultFactor,
      low: Math.max(0, low),
      high: Math.max(low, high),
    };
  }, [state]);

  const buildSummary = () => {
    if (!estimate) return "";
    const caseLabel = caseTypes.find((item) => item.value === state.caseType);
    const severityLabel = severities.find((item) => item.value === state.severity);
    const treatmentLabel = treatments.find((item) => item.value === state.treatment);

    return (ko ? [
      `계산기 예상 범위: ${money(estimate.low)} to ${money(estimate.high)}`,
      `사건: ${caseLabel?.ko || "미선택"}`,
      `부상: ${severityLabel?.ko || "미선택"}`,
      `치료: ${treatmentLabel?.ko || "미선택"}`,
      `현재 의료비: ${money(state.medical)}`,
      `향후 치료비: ${money(state.futureMedical)}`,
      `임금 손실: ${money(state.lostWages)}`,
      `향후 소득 손실: ${money(state.futureIncome)}`,
      `재산 피해: ${money(state.property)}`,
      `본인 과실: ${state.fault}%`,
      `장기적 영향: ${state.permanent ? "예" : "아니오"}`,
      "",
      "이 계산 결과에 대해 전문가의 의견을 받고 싶습니다.",
    ] : [
      `Calculator estimate: ${money(estimate.low)} to ${money(estimate.high)}`,
      `Incident: ${caseLabel?.en || "Not selected"}`,
      `Injury: ${severityLabel?.en || "Not selected"}`,
      `Treatment: ${treatmentLabel?.en || "Not selected"}`,
      `Medical bills: ${money(state.medical)}`,
      `Future medical care: ${money(state.futureMedical)}`,
      `Lost wages: ${money(state.lostWages)}`,
      `Future income loss: ${money(state.futureIncome)}`,
      `Property damage: ${money(state.property)}`,
      `Estimated fault: ${state.fault}%`,
      `Long-term effects: ${state.permanent ? "Yes" : "No"}`,
      "",
      "I would like someone to look at this properly.",
    ]).join("\n");
  };

  const calculate = () => {
    const financialTotal = state.medical + state.futureMedical + state.lostWages + state.futureIncome + state.property;
    if (!state.severity || !state.treatment) {
      setError(ko ? "부상 정도와 치료 수준을 선택하세요." : "Choose injury severity and treatment level.");
      return;
    }
    if (financialTotal <= 0) {
      setError(ko ? "최소 한 가지 금전적 손실을 입력하세요." : "Add at least one financial loss and we can show a range.");
      return;
    }
    setError("");
    setCalculated(true);
    setReview((current) => ({ ...current, message: buildSummary() }));
    window.setTimeout(() => {
      document.getElementById("case-estimate-result")?.focus({ preventScroll: true });
      document.getElementById("case-estimate-result")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }, 60);
  };

  const reset = () => {
    setState(initialState);
    setCalculated(false);
    setError("");
    setReview({ full_name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const requestReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimate || isSubmitting) return;
    setIsSubmitting(true);
    // HighLevel External Tracking listens for this native form submission.
    // Keep the page alive briefly so its background request can complete.
    window.setTimeout(() => window.location.assign(ko ? "/ko/thank-you" : "/thank-you"), 1600);
  };

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#F7F6F3] pt-[60px] text-[#211E1B]">
        <section className="bg-[#17130f] text-[#f3eee5]">
          <div className="site-shell grid min-h-[520px] gap-0 lg:grid-cols-[0.86fr_1.14fr] lg:min-h-[590px]">
            <div className="flex items-end py-10 pr-0 md:py-12 lg:pr-12 lg:py-14">
              <div className="max-w-[560px]">
                <div className="text-[10px] font-medium text-[#f3eee5]/52">{ko ? "캘리포니아 개인상해 계산기" : "California personal injury calculator"}</div>
                <PageBreadcrumb locale={locale} title={ko ? "예상 배상액 계산기" : "Case Value Calculator"} />
                <h1 style={serifStyle(locale)} className={ko ? "mt-4 text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.03em]" : "editorial-serif mt-4 text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[0.98] tracking-[-0.026em]"}>
                  {ko ? "내 사건의 가치는 얼마일까요?" : "What could your case be worth?"}
                </h1>
                <p className="mt-4 max-w-[480px] text-[13px] leading-6 text-[#f3eee5]/64 md:text-[14px]">
                  {ko ? "핵심 정보를 입력해 캘리포니아 개인상해 사건의 교육용 예상 범위를 확인하세요." : "Answer a few questions and you will get a rough range. It is a starting point for the conversation, not a valuation of your case."}
                </p>
                <a href="#calculator" className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#f3eee5] px-5 py-3 text-[11px] font-medium text-[#17130f]">
                  {ko ? "계산 시작" : "Start the calculator"}<ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden lg:min-h-0">
              <img src={heroBoardroom} alt={ko ? "법률 사무실 회의 공간" : "Law firm conference room"} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/18" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2 text-[9px] font-medium text-white/74 md:bottom-7 md:left-7">
                <span className="rounded-full border border-white/24 bg-black/15 px-3 py-1.5 backdrop-blur-sm">{ko ? "무료" : "Free"}</span>
                <span className="rounded-full border border-white/24 bg-black/15 px-3 py-1.5 backdrop-blur-sm">{ko ? "가입 불필요" : "No signup"}</span>
                <span className="rounded-full border border-white/24 bg-black/15 px-3 py-1.5 backdrop-blur-sm">{ko ? "즉시 결과" : "Instant result"}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="calculator" className="site-shell scroll-mt-20 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-7 flex items-end justify-between gap-4 border-t border-[#211E1B]/12 pt-5">
              <div>
                <div className="text-[10px] text-[#211E1B]/44">{ko ? "01 · 계산하기" : "01 · Calculate"}</div>
                <h2 className="mt-2 text-[21px] font-semibold tracking-[-0.02em]">{ko ? "핵심 정보만 입력하세요." : "Start with the facts that matter."}</h2>
                <p className="mt-1 text-[13px] leading-5 text-[#211E1B]/70">{ko ? "빠른 계산은 핵심 정보만 사용합니다. 더 복잡한 사건은 추가 정보를 펼치세요." : "Fill in the main fields first. Open the extra details only if they apply to you."}</p>
              </div>
              <button type="button" onClick={reset} className="inline-flex h-9 shrink-0 items-center gap-2 text-[10px] font-medium text-[#211E1B]/45 hover:text-[#211E1B]"><RotateCcw className="h-3.5 w-3.5" />{ko ? "초기화" : "Reset"}</button>
            </div>

            <div className="grid overflow-hidden rounded-[4px] border border-[#211E1B]/12 bg-white lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-5 md:p-7 lg:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectInput label={ko ? "사건 유형" : "Incident type"} hint={ko ? "선택 사항" : "Optional: what happened"} value={state.caseType} placeholder={ko ? "선택" : "Choose"} options={caseTypes.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, caseType: value as CaseType | "" }))} />
                  <SelectInput label={ko ? "부상 정도" : "Injury severity"} hint={ko ? "회복과 생활 영향" : "Recovery and daily impact"} value={state.severity} placeholder={ko ? "선택" : "Choose"} options={severities.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, severity: value as Severity | "" }))} />
                  <SelectInput label={ko ? "치료 수준" : "Treatment level"} hint={ko ? "가장 높은 치료 수준" : "Highest care received"} value={state.treatment} placeholder={ko ? "선택" : "Choose"} options={treatments.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, treatment: value as Treatment | "" }))} />
                  <CurrencyInput label={ko ? "현재 의료비" : "Medical bills"} hint={ko ? "현재까지 발생한 치료비" : "Treatment costs so far"} value={state.medical} onChange={(value) => setState((current) => ({ ...current, medical: value }))} />
                  <CurrencyInput label={ko ? "임금 손실" : "Lost wages"} hint={ko ? "이미 잃은 소득" : "Income already lost"} value={state.lostWages} onChange={(value) => setState((current) => ({ ...current, lostWages: value }))} />

                  <div className="sm:col-span-2 rounded-[3px] bg-[#F3F0EA] px-4 py-4">
                    <div className="flex items-end justify-between gap-4">
                      <InputLabel hint={ko ? "확실하지 않다면 0%에서 시작하세요." : "If unsure, start at 0%."}>{ko ? "본인의 예상 과실" : "Your estimated share of fault"}</InputLabel>
                      <div className="text-[20px] font-semibold tabular-nums text-[#6E635A]">{state.fault}%</div>
                    </div>
                    <input type="range" min="0" max="100" step="5" value={state.fault} onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))} className="mt-2 w-full accent-[#6E635A]" aria-label={ko ? "본인의 예상 과실" : "Your estimated share of fault"} />
                    <div className="mt-1 flex justify-between text-[9px] text-[#211E1B]/32"><span>0%</span><span>50%</span><span>100%</span></div>
                  </div>
                </div>

                <details className="group mt-6 border-t border-[#211E1B]/10 pt-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 marker:hidden">
                    <span>
                      <span className="block text-[13px] font-semibold">{ko ? "더 정확한 범위를 원하시나요?" : "Want a more complete estimate?"}</span>
                      <span className="mt-1 block max-w-[470px] text-[13px] leading-5 text-[#211E1B]/44">{ko ? "향후 치료, 향후 소득 손실, 재산 피해 또는 장기적 영향이 있다면 여기에 추가하세요." : "Worth opening if treatment is still ongoing, you are still losing work, property was damaged, or the injury looks like it will leave something behind."}</span>
                    </span>
                    <span className="text-[18px] leading-none text-[#6E635A] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-5 grid gap-5 rounded-[3px] bg-[#F8F7F4] p-4 sm:grid-cols-2">
                    <CurrencyInput label={ko ? "향후 의료비" : "Future medical care"} hint={ko ? "예상 수술·재활·치료" : "Expected surgery, rehab, or ongoing care"} value={state.futureMedical} onChange={(value) => setState((current) => ({ ...current, futureMedical: value }))} />
                    <CurrencyInput label={ko ? "향후 소득 손실" : "Future income loss"} hint={ko ? "향후 결근 또는 근로 능력 감소" : "Future time off or reduced earning capacity"} value={state.futureIncome} onChange={(value) => setState((current) => ({ ...current, futureIncome: value }))} />
                    <CurrencyInput label={ko ? "재산 피해" : "Property damage"} hint={ko ? "차량 또는 기타 재산 피해" : "Vehicle or other property loss"} value={state.property} onChange={(value) => setState((current) => ({ ...current, property: value }))} />
                    <label className="flex min-h-[70px] cursor-pointer items-start gap-3 rounded-[3px] border border-[#211E1B]/10 bg-white px-4 py-3">
                      <input type="checkbox" checked={state.permanent} onChange={(event) => setState((current) => ({ ...current, permanent: event.target.checked }))} className="mt-0.5 h-4 w-4 accent-[#6E635A]" />
                      <span><span className="block text-[12px] font-semibold leading-5">{ko ? "장기적 또는 영구적 영향" : "Long-term or permanent effects"}</span><span className="mt-1 block text-[13px] leading-5 text-[#211E1B]/70">{ko ? "흉터, 장애, 기능 제한 등" : "Scarring, disability, lasting limitations"}</span></span>
                    </label>
                  </div>
                </details>

                {error ? <div role="alert" className="mt-5 rounded-[3px] bg-[#F4ECE7] px-4 py-3 text-[11px] font-medium text-[#7B4435]">{error}</div> : null}

                <button type="button" onClick={calculate} className="mt-6 inline-flex h-11 w-full items-center justify-between rounded-[3px] bg-[#211E1B] px-5 text-[12px] font-semibold text-white hover:bg-[#342F2B]">
                  <span>{ko ? "예상 범위 계산" : "Estimate my case value"}</span><ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[9px] text-[#211E1B]/36">{ko ? "결과를 보기 위해 이메일이 필요하지 않습니다." : "No email is required to see your result."}</p>
              </div>

              <div className="border-t border-[#211E1B]/10 bg-[#F3F0EA] p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8" aria-live="polite">
                <div className="text-[10px] font-medium text-[#211E1B]/44">{ko ? "예상 범위" : "Estimated range"}</div>
                {calculated && estimate ? (
                  <div id="case-estimate-result" tabIndex={-1} className="mt-4 scroll-mt-24">
                    <div style={serifStyle(locale)} className={ko ? "text-[1.9rem] font-medium leading-tight" : "editorial-serif text-[clamp(2rem,3.6vw,3rem)] leading-[0.98] tracking-[-0.035em]"}>{money(estimate.low)} to {money(estimate.high)}</div>
                    <p className="mt-3 text-[10px] leading-5 text-[#211E1B]/46">{ko ? "입력한 정보만을 바탕으로 한 교육용 범위입니다." : "A range built from what you entered, nothing more."}</p>

                    <div className="mt-5 border-y border-[#211E1B]/10 py-2">
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/50">{ko ? "경제적 손실" : "Economic losses"}</span><strong>{money(estimate.economic)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/50">{ko ? "비경제적 손해 모델" : "Non-economic model"}</span><strong className="text-right">{money(estimate.nonEconomicLow)} to {money(estimate.nonEconomicHigh)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/50">{ko ? "과실 조정" : "Fault adjustment"}</span><strong>× {estimate.faultFactor.toFixed(2)}</strong></div>
                    </div>

                    <div className="mt-4 flex gap-2 text-[9px] leading-4 text-[#211E1B]/70"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /><p>{ko ? "법률 자문이나 실제 사건 가치에 대한 의견이 아닙니다. 보험 한도, 유치권, 인과관계, 증거 및 협상 상황은 반영하지 못합니다." : "Not legal advice or an opinion of actual case value. Policy limits, liens, causation, evidence, and negotiation posture are not fully captured."}</p></div>

                    <div className="mt-6 border-t border-[#211E1B]/10 pt-5">
                      <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#6E635A]" /><div><h3 className="text-[13px] font-semibold">{ko ? "전문가 의견 받기" : "Get an expert opinion"}</h3><p className="mt-1 text-[9px] leading-4 text-[#211E1B]/70">{ko ? "이름, 이메일과 계산 요약을 팀에 보내 검토를 요청합니다." : "Send your name, email, and calculator summary to the team for review."}</p></div></div>

                      <form id="case-calculater" name="Case Calculater" data-form-name="Case Calculater" onSubmit={requestReview} className="mt-4 grid gap-3">
                        <label className="block">
                          <span className="mb-1.5 block text-[10px] font-medium text-[#211E1B]/58">{ko ? "성명" : "Full name"}</span>
                          <input name="full_name" value={review.full_name} onChange={(event) => setReview((current) => ({ ...current, full_name: event.target.value }))} required autoComplete="name" placeholder={ko ? "성명" : "Full name"} className="h-10 w-full rounded-[3px] border border-[#211E1B]/12 bg-white px-3 text-[12px] outline-none focus:border-[#6E635A]" />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-[10px] font-medium text-[#211E1B]/58">{ko ? "이메일" : "Email"}</span>
                          <input name="email" type="email" value={review.email} onChange={(event) => setReview((current) => ({ ...current, email: event.target.value }))} required autoComplete="email" placeholder="name@example.com" className="h-10 w-full rounded-[3px] border border-[#211E1B]/12 bg-white px-3 text-[12px] outline-none focus:border-[#6E635A]" />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-[10px] font-medium text-[#211E1B]/58">{ko ? "메시지 / 계산 요약" : "Message / calculator summary"}</span>
                          <textarea name="message" value={review.message} onChange={(event) => setReview((current) => ({ ...current, message: event.target.value }))} required rows={6} className="w-full resize-y rounded-[3px] border border-[#211E1B]/10 bg-white p-3 text-[10px] leading-5 text-[#211E1B]/62 outline-none focus:border-[#6E635A]" />
                        </label>
                        <button type="submit" disabled={isSubmitting} className="inline-flex h-10 items-center justify-between rounded-[3px] bg-[#211E1B] px-4 text-[10px] font-semibold text-white disabled:opacity-60"><span>{isSubmitting ? (ko ? "전송 중..." : "Sending...") : (ko ? "결과 전송 + 검토 요청" : "Send result + request review")}</span><ArrowRight className="h-3.5 w-3.5" /></button>
                        <p className="text-[8px] leading-4 text-[#211E1B]/34">{ko ? "제출은 변호사-의뢰인 관계를 형성하지 않습니다. 기밀 또는 긴급한 정보를 보내지 마세요." : "Submitting does not create an attorney-client relationship. Do not send confidential or time-sensitive information."}</p>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <div className="editorial-serif text-[2.4rem] leading-none text-[#211E1B]/20">$0 to $0</div>
                    <p className="mt-4 max-w-[300px] text-[10px] leading-5 text-[#211E1B]/44">{ko ? "왼쪽 정보를 입력하고 계산하세요." : "Enter or update your details, then select “Estimate my case value” to see your result."}</p>
                    <div className="mt-7 space-y-3 border-t border-[#211E1B]/10 pt-5 text-[10px] leading-5 text-[#211E1B]/46">
                      <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />{ko ? "경제적 손실" : "Economic losses"}</div>
                      <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />{ko ? "부상 및 치료" : "Injury and treatment"}</div>
                      <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />{ko ? "비교 과실" : "Comparative fault"}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="site-shell grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <div className="relative min-h-[360px] overflow-hidden rounded-[4px] bg-neutral-200 lg:min-h-[520px]">
              <img src={heroJusticeLibrary} alt={ko ? "법률 자료와 정의의 상징" : "Justice and legal reference library"} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/12" />
            </div>
            <div className="flex flex-col justify-center py-2 lg:pl-6">
              <div className="text-[10px] text-[#211E1B]/70">{ko ? "02 · 계산 방식" : "02 · How it works"}</div>
              <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "세 가지가 범위를 만듭니다." : "Three things shape the range."}</h2>
              <div className="mt-8 border-t border-[#211E1B]/12">
                {[
                  ko ? ["01", "경제적 손실", "의료비, 임금 손실, 향후 치료 및 향후 소득 손실을 더합니다."] : ["01", "Economic losses", "Medical costs, wage loss, future care, and future income loss."],
                  ko ? ["02", "부상과 치료", "부상 정도와 치료 수준을 이용해 비경제적 손해의 넓은 교육용 범위를 모델링합니다."] : ["02", "Injury + treatment", "Severity and treatment are used to model a broad non-economic range."],
                  ko ? ["03", "과실", "입력한 본인 과실 비율을 적용해 비교 과실의 영향을 보여줍니다."] : ["03", "Fault", "Your estimated share of fault is applied to illustrate comparative fault."],
                ].map(([number, title, body]) => (
                  <div key={number} className="grid gap-2 border-b border-[#211E1B]/10 py-5 sm:grid-cols-[40px_0.65fr_1.35fr] sm:gap-5">
                    <span className="text-[10px] font-medium text-[#6E635A]">{number}</span>
                    <h3 className="text-[13px] font-semibold">{title}</h3>
                    <p className="text-[11px] leading-5 text-[#211E1B]/50">{body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[9px] leading-4 text-[#211E1B]/38">{ko ? "비경제적 손해에 사용하는 배수는 캘리포니아 법이 정한 공식이 아니라 교육용 모델입니다." : "The non-economic multiplier is an educational model, not a formula required by California law."}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#101010] py-12 text-[#f3eee5] md:py-16 lg:py-20">
          <div className="site-shell grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="text-[10px] text-white/42">{ko ? "03 · 실제 사례" : "03 · Real California example"}</div>
              <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">Audish v. Macias (2024)</h2>
              <p className="mt-5 max-w-[520px] text-[13px] leading-6 text-white/58">{ko ? "캘리포니아 항소법원에 공개된 자동차 사고 사건에서 배심은 총 손해액을 $65,699.50로 판단하고 양측에 각각 50%의 책임을 배정했습니다." : "In a published California auto-collision case, the jury found $65,699.50 in total damages and assigned 50% responsibility to each driver."}</p>
              <div className="mt-7 grid grid-cols-3 border-y border-white/12 py-5">
                <div><div className="text-[18px] font-semibold">$65.7K</div><div className="mt-1 text-[9px] text-white/38">{ko ? "총 손해" : "Total damages"}</div></div>
                <div className="border-l border-white/12 pl-4"><div className="text-[18px] font-semibold">$29.3K</div><div className="mt-1 text-[9px] text-white/38">{ko ? "과거 의료비" : "Past medical"}</div></div>
                <div className="border-l border-white/12 pl-4"><div className="text-[18px] font-semibold">50%</div><div className="mt-1 text-[9px] text-white/38">{ko ? "원고 과실" : "Plaintiff fault"}</div></div>
              </div>
              <p className="mt-5 text-[9px] leading-4 text-white/34">{ko ? "다른 사건의 결과를 예측하는 사례가 아닙니다. 실제 소송에서 손해액과 과실이 별도로 판단된다는 점을 보여주는 공개 예시입니다." : "Not a prediction for another case. It simply shows how damages and fault can be treated as separate questions in real litigation."}</p>
              <a href="https://law.justia.com/cases/california/court-of-appeal/2024/d081689.html" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-white/76 underline underline-offset-4">{ko ? "공개 판결 보기" : "Read the published decision"}<ArrowRight className="h-3 w-3" /></a>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[4px] bg-[#1b1b1b] lg:min-h-[520px]">
              <img src={heroCourthouse} alt={ko ? "캘리포니아 법원 내부" : "Courthouse interior"} className="absolute inset-0 h-full w-full object-cover opacity-72" />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F3] py-12 md:py-16 lg:py-20">
          <div className="site-shell">
            <div className="grid gap-8 border-t border-[#211E1B]/12 pt-5 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
              <div>
                <div className="text-[10px] text-[#211E1B]/70">{ko ? "04 · 무엇이 가치를 바꾸나요" : "04 · What changes case value"}</div>
                <h2 className="mt-3 max-w-[360px] text-[22px] font-semibold tracking-[-0.025em]">{ko ? "숫자 밖의 사실도 중요합니다." : "The facts around the numbers matter."}</h2>
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {[
                  ko ? ["향후 치료", "의학적으로 뒷받침되는 수술, 재활 또는 장기 치료."] : ["Future medical care", "Supported future surgery, rehabilitation, or ongoing treatment."],
                  ko ? ["소득 능력", "이미 잃은 임금과 장기적인 근로 능력 감소."] : ["Earning capacity", "Wages already lost and long-term reduction in earning ability."],
                  ko ? ["생활 영향", "통증의 기간, 기능 제한, 흉터 및 장애."] : ["Daily-life impact", "Duration of pain, limitations, scarring, and disability."],
                  ko ? ["과실", "사고 책임이 어떻게 나뉘는지에 따라 회수액이 달라질 수 있습니다."] : ["Liability", "How responsibility is divided can change the practical recovery."],
                  ko ? ["증거", "의료기록, 사진, 영상, 목격자 및 사고 보고서."] : ["Evidence", "Medical records, photos, video, witnesses, and reports."],
                  ko ? ["보험", "보험 한도, 복수 책임자, 유치권 및 실제 회수 가능성."] : ["Insurance", "Policy limits, multiple responsible parties, liens, and collectability."],
                ].map(([title, body]) => (
                  <div key={title} className="border-t border-[#211E1B]/10 py-5">
                    <h3 className="text-[13px] font-semibold">{title}</h3>
                    <p className="mt-2 text-[10px] leading-5 text-[#211E1B]/48">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="site-shell grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <div className="relative min-h-[340px] overflow-hidden rounded-[4px] bg-neutral-200 lg:min-h-[500px]">
              <img src={heroLawOffice} alt={ko ? "법률 사무실과 사건 자료" : "Law office and case preparation"} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/[0.08]" />
            </div>
            <div className="flex flex-col justify-center lg:pl-6">
              <div className="text-[10px] text-[#211E1B]/70">{ko ? "05 · 다음 단계" : "05 · What to do next"}</div>
              <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "계산 후에는 기록을 정리하세요." : "After the estimate, document the claim."}</h2>
              <div className="mt-7 border-t border-[#211E1B]/12">
                {[
                  ko ? ["치료 기록", "진료기록, 청구서, 처방 및 향후 치료 계획을 보관하세요."] : ["Treatment records", "Keep medical records, bills, prescriptions, and future-care plans."],
                  ko ? ["소득 손실", "결근일, 급여 명세 및 고용주 확인 자료를 모으세요."] : ["Income loss", "Keep missed-work dates, pay records, and employer confirmation."],
                  ko ? ["사고 증거", "사진, 영상, 보고서, 목격자 및 보험 서신을 보존하세요."] : ["Accident evidence", "Preserve photos, video, reports, witnesses, and insurance correspondence."],
                  ko ? ["기한", "캘리포니아의 개인상해 소송 기한은 일반적으로 2년이지만 예외가 있습니다."] : ["Deadlines", "California personal-injury lawsuits generally have a two-year deadline, but exceptions exist."],
                ].map(([title, body], index) => (
                  <div key={title} className="grid gap-2 border-b border-[#211E1B]/10 py-4 sm:grid-cols-[34px_0.7fr_1.3fr] sm:gap-5">
                    <span className="text-[10px] font-medium text-[#6E635A]">0{index + 1}</span>
                    <h3 className="text-[12px] font-semibold">{title}</h3>
                    <p className="text-[10px] leading-5 text-[#211E1B]/48">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F1EEE8] py-12 md:py-16">
          <div className="site-shell mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <div>
              <div className="text-[10px] text-[#211E1B]/70">FAQ</div>
              <h2 className="mt-3 text-[21px] font-semibold tracking-[-0.02em]">{ko ? "계산기 질문" : "Common calculator questions"}</h2>
            </div>
            <div className="divide-y divide-[#211E1B]/10 border-t border-[#211E1B]/10">
              {[
                ko ? ["이 계산기가 실제 합의금을 알려주나요?", "아니요. 입력값을 바탕으로 한 교육용 범위이며 실제 합의나 평결을 예측하지 않습니다."] : ["Does this tell me my actual settlement?", "No. It is an educational range from your inputs, not a prediction of a settlement or verdict."],
                ko ? ["왜 한 숫자가 아닌 범위인가요?", "책임, 보험, 의료 증거 및 향후 손실이 사건마다 달라 하나의 숫자는 실제 불확실성을 숨깁니다."] : ["Why a range instead of one number?", "Liability, insurance, medical proof, and future losses vary too much for one number to be honest."],
                ko ? ["의료비의 몇 배가 사건 가치인가요?", "고정 법칙은 없습니다. 이 페이지의 배수는 교육용 모델일 뿐 캘리포니아 법정 공식이 아닙니다."] : ["Is a case worth a fixed multiple of medical bills?", "No. The multiplier here is an educational model, not a California legal formula."],
                ko ? ["일부 과실이 있어도 회수할 수 있나요?", "캘리포니아 비교 과실 원칙에 따라 본인의 책임 비율이 손해액을 줄일 수 있습니다."] : ["What if I was partly at fault?", "California comparative fault can reduce damages based on the responsibility attributed to you."],
              ].map(([question, answer]) => (
                <div key={question} className="py-5"><h3 className="text-[13px] font-semibold">{question}</h3><p className="mt-2 text-[10px] leading-5 text-[#211E1B]/50">{answer}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10 md:py-12">
          <div className="site-shell mx-auto grid max-w-[1080px] gap-6 md:grid-cols-[0.65fr_1.35fr] md:gap-12">
            <div className="text-[10px] text-[#211E1B]/70">{ko ? "방법론 및 출처" : "Methodology & sources"}</div>
            <div className="text-[10px] leading-5 text-[#211E1B]/48">
              <p>{ko ? "이 도구는 캘리포니아 민사 배심 지침에서 다루는 일반적인 손해 항목과 비교 과실 개념을 교육 목적으로 모델링합니다." : "This tool models common personal-injury damage categories and comparative fault concepts reflected in California civil jury instructions. It is educational, not a court formula."}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a href="https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California CACI</a>
                <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California Courts: Personal injury</a>
                <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California Courts: Deadlines</a>
              </div>
              <p className="mt-4 text-[9px] text-[#211E1B]/32">{ko ? "최종 업데이트: 2026년 9월 · 일반 정보이며 법률 자문이 아닙니다." : "Last updated September 2026 · General information only; not legal advice."}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#17130f] text-[#f3eee5]">
          <div className="site-shell grid gap-5 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
            <div><div className="text-[14px] font-semibold">{ko ? "계산기보다 더 자세한 검토가 필요하신가요?" : "Need more than a calculator?"}</div><p className="mt-1 text-[10px] leading-5 text-white/42">{ko ? "중상, 과실 분쟁 또는 큰 향후 손실이 있다면 실제 기록과 보험을 함께 검토해야 합니다." : "Serious injuries, disputed fault, or major future losses deserve a real review of the records and coverage."}</p></div>
            <div className="flex flex-wrap gap-3"><a href={`${localePrefix(locale)}/contact`} className="inline-flex h-10 items-center gap-2 rounded-[3px] bg-[#f3eee5] px-4 text-[10px] font-semibold text-[#17130f]">{ko ? "상담 요청" : "Request a consultation"}<ArrowRight className="h-3.5 w-3.5" /></a><a href={brand.phoneHref} className="inline-flex h-10 items-center px-3 text-[12px] font-semibold">{brand.phoneDisplay}</a></div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
