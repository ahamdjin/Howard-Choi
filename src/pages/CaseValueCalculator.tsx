import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Info, Mail, RotateCcw, Scale } from "lucide-react";
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
    {hint ? <span className="mt-1 block text-[10px] leading-4 text-[#211E1B]/42">{hint}</span> : null}
  </span>
);

const CurrencyInput = ({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <label className="block">
    <InputLabel hint={hint}>{label}</InputLabel>
    <div className="flex h-11 items-center rounded-[3px] border border-[#211E1B]/14 bg-white px-3 focus-within:border-[#6E635A]">
      <span className="mr-2 text-[13px] text-[#211E1B]/42">$</span>
      <input
        type="number"
        min="0"
        step="100"
        inputMode="decimal"
        value={value || ""}
        placeholder="0"
        onChange={(event) => onChange(clampMoney(event.target.value))}
        className="w-full bg-transparent text-[15px] font-medium tabular-nums text-[#211E1B] outline-none placeholder:text-[#211E1B]/25"
      />
    </div>
  </label>
);

const SelectInput = ({
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
    <InputLabel hint={hint}>{label}</InputLabel>
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-[3px] border border-[#211E1B]/14 bg-white px-3 pr-9 text-[15px] text-[#211E1B] outline-none focus:border-[#6E635A]"
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
  const [state, setState] = useState<CalculatorState>(initialState);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");
  const [review, setReview] = useState({ full_name: "", email: "" });
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
    { value: "minor", en: "Minor — short recovery", ko: "경미 — 짧은 회복" },
    { value: "moderate", en: "Moderate — ongoing treatment", ko: "중간 — 지속 치료" },
    { value: "serious", en: "Serious — fracture or long recovery", ko: "중상 — 골절 또는 장기 회복" },
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
      medicalBase,
      nonEconomicLow,
      nonEconomicHigh,
      multiplierLow,
      multiplierHigh,
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

    return ko
      ? `계산기 예상 범위: ${money(estimate.low)} – ${money(estimate.high)}\n사건: ${caseLabel?.ko || "미선택"}\n부상: ${severityLabel?.ko || "미선택"}\n치료: ${treatmentLabel?.ko || "미선택"}\n현재 의료비: ${money(state.medical)}\n향후 치료비: ${money(state.futureMedical)}\n임금 손실: ${money(state.lostWages)}\n향후 소득 손실: ${money(state.futureIncome)}\n재산 피해: ${money(state.property)}\n본인 과실 입력: ${state.fault}%\n장기적 영향: ${state.permanent ? "예" : "아니오"}\n\n이 계산 결과에 대해 전문가의 의견을 받고 싶습니다.`
      : `Calculator estimate: ${money(estimate.low)} – ${money(estimate.high)}\nIncident: ${caseLabel?.en || "Not selected"}\nInjury: ${severityLabel?.en || "Not selected"}\nTreatment: ${treatmentLabel?.en || "Not selected"}\nMedical bills: ${money(state.medical)}\nFuture medical care: ${money(state.futureMedical)}\nLost wages: ${money(state.lostWages)}\nFuture income loss: ${money(state.futureIncome)}\nProperty damage: ${money(state.property)}\nEstimated fault: ${state.fault}%\nLong-term effects: ${state.permanent ? "Yes" : "No"}\n\nI would like an expert opinion on this estimate.`;
  };

  const calculate = () => {
    const financialTotal = state.medical + state.futureMedical + state.lostWages + state.futureIncome + state.property;
    if (!state.severity || !state.treatment) {
      setError(ko ? "부상 정도와 치료 수준을 선택하세요." : "Choose injury severity and treatment level.");
      return;
    }
    if (financialTotal <= 0) {
      setError(ko ? "최소 한 가지 금전적 손실을 입력하세요." : "Add at least one financial loss to calculate a range.");
      return;
    }
    setError("");
    setCalculated(true);
    window.setTimeout(() => {
      document.getElementById("case-estimate-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  };

  const reset = () => {
    setState(initialState);
    setCalculated(false);
    setError("");
    setReview({ full_name: "", email: "" });
  };

  const requestReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimate || isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      window.location.assign(ko ? "/ko/thank-you" : "/thank-you");
    }, 900);
  };

  const factsUsed = [
    state.medical > 0 || state.futureMedical > 0 ? (ko ? "의료비" : "medical costs") : null,
    state.lostWages > 0 || state.futureIncome > 0 ? (ko ? "소득 손실" : "income loss") : null,
    state.severity ? (ko ? "부상 정도" : "injury severity") : null,
    state.treatment ? (ko ? "치료 수준" : "treatment level") : null,
    state.fault > 0 ? (ko ? "비교 과실" : "comparative fault") : null,
    state.permanent ? (ko ? "장기적 영향" : "lasting effects") : null,
  ].filter(Boolean).join(" · ");

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#F7F5F1] pt-[60px] text-[#211E1B]">
        <section className="border-b border-[#211E1B]/10 bg-[#F1EEE8]">
          <div className="site-shell grid gap-8 py-10 md:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14 lg:py-14">
            <div className="max-w-[760px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "캘리포니아 개인상해 합의금 계산기" : "California personal injury settlement calculator"}</div>
              <h1 style={serifStyle(locale)} className={ko ? "mt-4 text-[clamp(2.15rem,4vw,3.35rem)] font-medium leading-[1.18] tracking-[-0.035em]" : "editorial-serif mt-4 text-[clamp(2.55rem,4.4vw,3.9rem)] leading-[0.98] tracking-[-0.035em]"}>
                {ko ? "사건 가치의 현실적인 시작점을 확인하세요." : "Get a clearer starting point for what your injury claim may be worth."}
              </h1>
              <p className="mt-4 max-w-[670px] text-[14px] leading-6 text-[#211E1B]/60 md:text-[15px]">
                {ko ? "의료비, 소득 손실, 부상 정도, 치료, 향후 손실 및 과실 비율을 바탕으로 교육용 범위를 계산합니다." : "Use medical costs, lost income, injury severity, treatment, future losses, and fault to estimate an educational range."}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium text-[#211E1B]/52">
                <span>✓ {ko ? "무료" : "Free"}</span>
                <span>✓ {ko ? "가입 불필요" : "No signup"}</span>
                <span>✓ {ko ? "캘리포니아 기준" : "California-focused"}</span>
                <span>✓ {ko ? "결과 즉시 확인" : "Instant result"}</span>
              </div>
            </div>

            <div className="border-l border-[#211E1B]/12 pl-5 lg:pl-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6E635A]">{ko ? "이 도구가 하는 일" : "What this tool does"}</div>
              <p className="mt-3 max-w-[360px] text-[12px] leading-6 text-[#211E1B]/54">{ko ? "경제적 손실을 더하고, 부상·치료 수준을 바탕으로 비경제적 손해의 범위를 모델링한 뒤, 입력한 과실 비율을 반영합니다." : "It adds documented economic losses, models a broad non-economic range from injury and treatment, then applies the fault percentage you enter."}</p>
              <a href="#calculator" className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#211E1B]"><span>{ko ? "계산 시작" : "Start the estimate"}</span><ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </section>

        <section id="calculator" className="site-shell scroll-mt-20 py-10 md:py-14 lg:py-16">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[22px] font-semibold tracking-[-0.025em]">{ko ? "사건 가치 계산하기" : "Estimate your case value"}</h2>
                <p className="mt-1 text-[11px] leading-5 text-[#211E1B]/46">{ko ? "핵심 항목은 간단하게, 필요한 경우 추가 정보로 정확도를 높일 수 있습니다." : "Start with the essentials. Add optional details only if they apply."}</p>
              </div>
              <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-2 text-[11px] font-medium text-[#211E1B]/45 hover:text-[#211E1B]">
                <RotateCcw className="h-3.5 w-3.5" />{ko ? "초기화" : "Reset"}
              </button>
            </div>

            <div className="grid overflow-hidden rounded-[6px] border border-[#211E1B]/12 bg-white lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-5 md:p-7 lg:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectInput label={ko ? "사건 유형" : "Incident type"} hint={ko ? "사고의 기본 맥락" : "Sets the claim context"} value={state.caseType} placeholder={ko ? "선택" : "Choose"} options={caseTypes.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, caseType: value as CaseType | "" }))} />
                  <SelectInput label={ko ? "부상 정도" : "Injury severity"} hint={ko ? "회복 기간과 일상 영향" : "Recovery time and daily impact"} value={state.severity} placeholder={ko ? "선택" : "Choose"} options={severities.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, severity: value as Severity | "" }))} />
                  <SelectInput label={ko ? "최고 수준의 치료" : "Highest treatment level"} hint={ko ? "현재까지 받은 가장 높은 치료" : "Highest care received so far"} value={state.treatment} placeholder={ko ? "선택" : "Choose"} options={treatments.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, treatment: value as Treatment | "" }))} />
                  <CurrencyInput label={ko ? "현재 의료비" : "Medical bills to date"} hint={ko ? "사고 관련 치료비" : "Accident-related treatment costs"} value={state.medical} onChange={(value) => setState((current) => ({ ...current, medical: value }))} />
                  <CurrencyInput label={ko ? "현재까지 임금 손실" : "Lost wages to date"} hint={ko ? "결근으로 이미 잃은 소득" : "Income already lost from missed work"} value={state.lostWages} onChange={(value) => setState((current) => ({ ...current, lostWages: value }))} />

                  <div className="sm:col-span-2 rounded-[4px] bg-[#F7F5F1] px-4 py-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <InputLabel hint={ko ? "캘리포니아에서는 본인의 과실 비율이 회수액에 영향을 줄 수 있습니다." : "In California, your share of fault can reduce the modeled recovery."}>{ko ? "본인의 예상 과실" : "Your estimated share of fault"}</InputLabel>
                      </div>
                      <div className="text-[22px] font-semibold tabular-nums text-[#6E635A]">{state.fault}%</div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={state.fault}
                      onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))}
                      className="mt-2 w-full accent-[#6E635A]"
                      aria-label={ko ? "본인의 예상 과실" : "Your estimated share of fault"}
                    />
                    <div className="mt-1 flex justify-between text-[9px] text-[#211E1B]/32"><span>0% · {ko ? "과실 없음" : "none"}</span><span>50%</span><span>100%</span></div>
                  </div>
                </div>

                <details className="group mt-6 rounded-[4px] border border-[#211E1B]/10 bg-[#FBFAF8]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-4 py-4 marker:hidden">
                    <span>
                      <span className="block text-[13px] font-semibold text-[#211E1B]">{ko ? "추가 정보로 정확도 높이기" : "Improve the estimate with more details"}</span>
                      <span className="mt-1 block text-[10px] leading-4 text-[#211E1B]/42">{ko ? "향후 치료, 소득 손실, 재산 피해 또는 장기적 영향이 있을 때만 추가하세요." : "Optional — add these only if future care, future income loss, property damage, or lasting effects apply."}</span>
                    </span>
                    <span className="shrink-0 text-[16px] text-[#6E635A] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="grid gap-5 border-t border-[#211E1B]/8 px-4 py-5 sm:grid-cols-2">
                    <CurrencyInput label={ko ? "향후 의료비" : "Future medical care"} hint={ko ? "예정된 수술, 재활, 전문의 치료 등" : "Expected surgery, rehab, specialists, or ongoing care"} value={state.futureMedical} onChange={(value) => setState((current) => ({ ...current, futureMedical: value }))} />
                    <CurrencyInput label={ko ? "향후 소득 손실" : "Future income loss"} hint={ko ? "향후 결근 또는 근로 능력 감소" : "Expected time off or reduced earning capacity"} value={state.futureIncome} onChange={(value) => setState((current) => ({ ...current, futureIncome: value }))} />
                    <CurrencyInput label={ko ? "재산 피해" : "Property damage"} hint={ko ? "차량 또는 기타 재산 손실" : "Vehicle or other property loss"} value={state.property} onChange={(value) => setState((current) => ({ ...current, property: value }))} />
                    <label className="flex min-h-[70px] cursor-pointer items-start gap-3 rounded-[3px] border border-[#211E1B]/10 bg-white px-4 py-3">
                      <input type="checkbox" checked={state.permanent} onChange={(event) => setState((current) => ({ ...current, permanent: event.target.checked }))} className="mt-0.5 h-4 w-4 accent-[#6E635A]" />
                      <span><span className="block text-[12px] font-semibold leading-5">{ko ? "장기적 또는 영구적 영향" : "Long-term or permanent effects"}</span><span className="mt-1 block text-[10px] leading-4 text-[#211E1B]/42">{ko ? "지속적인 제한, 흉터, 장애 또는 장기 치료" : "Lasting limitations, scarring, disability, or substantial future care"}</span></span>
                    </label>
                  </div>
                </details>

                {error ? <div className="mt-5 rounded-[3px] bg-[#F4ECE7] px-4 py-3 text-[11px] font-medium text-[#7B4435]">{error}</div> : null}

                <button type="button" onClick={calculate} className="mt-6 inline-flex h-11 w-full items-center justify-between rounded-[3px] bg-[#211E1B] px-5 text-[12px] font-semibold text-white hover:bg-[#342F2B]">
                  <span>{ko ? "예상 범위 계산" : "Estimate my case value"}</span><ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[9px] leading-4 text-[#211E1B]/36">{ko ? "결과를 보기 위해 이메일이나 전화번호를 입력할 필요가 없습니다." : "No email or phone number is required to see your result."}</p>
              </div>

              <div className="border-t border-[#211E1B]/10 bg-[#F3F0EA] p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6E635A]">{ko ? "예상 범위" : "Estimated range"}</div>

                {calculated && estimate ? (
                  <div id="case-estimate-result" className="mt-5 scroll-mt-24">
                    <div style={serifStyle(locale)} className={ko ? "text-[2rem] font-medium leading-tight tracking-[-0.025em]" : "editorial-serif text-[clamp(2.25rem,4vw,3.3rem)] leading-[0.95] tracking-[-0.04em]"}>{money(estimate.low)} – {money(estimate.high)}</div>
                    <p className="mt-3 text-[11px] leading-5 text-[#211E1B]/48">{ko ? "입력한 정보만을 사용한 교육용 추정치입니다." : "An educational range based only on the information you entered."}</p>

                    <div className="mt-5 border-y border-[#211E1B]/10 py-2">
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "경제적 손실" : "Economic losses"}</span><strong className="font-semibold tabular-nums">{money(estimate.economic)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "비경제적 손해 모델" : "Modeled non-economic range"}</span><strong className="font-semibold tabular-nums text-right">{money(estimate.nonEconomicLow)} – {money(estimate.nonEconomicHigh)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "과실 조정" : "Fault adjustment"}</span><strong className="font-semibold tabular-nums">× {estimate.faultFactor.toFixed(2)}</strong></div>
                    </div>

                    <p className="mt-4 text-[10px] leading-5 text-[#211E1B]/42">{ko ? "반영된 항목: " : "Inputs reflected: "}<span className="font-medium text-[#211E1B]/62">{factsUsed || (ko ? "기본 손실" : "core losses")}</span></p>

                    <div className="mt-5 flex gap-2 rounded-[3px] border border-[#211E1B]/10 bg-white/70 p-4">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6E635A]" />
                      <p className="text-[10px] leading-5 text-[#211E1B]/50">{ko ? "이 결과는 법률 자문, 합의 제안 또는 실제 사건 가치에 대한 의견이 아닙니다. 보험 한도, 의료비 유치권, 인과관계, 증거의 강도, 관할 및 협상 상황 등은 반영하지 못합니다." : "This result is not legal advice, a settlement offer, or an opinion of actual case value. It cannot account for policy limits, medical liens, causation disputes, evidence quality, venue, or negotiation posture."}</p>
                    </div>

                    <div className="mt-6 border-t border-[#211E1B]/10 pt-5">
                      <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#6E635A]" />
                        <div>
                          <h3 className="text-[14px] font-semibold tracking-[-0.015em]">{ko ? "이 결과를 이메일로 받고 전문가 의견 요청" : "Email this estimate and request an expert opinion"}</h3>
                          <p className="mt-1 text-[10px] leading-5 text-[#211E1B]/44">{ko ? "이름과 이메일만 입력하면 계산 요약과 함께 팀에 검토 요청이 전달됩니다." : "Enter your name and email after seeing the result. The estimate summary is included with the review request."}</p>
                        </div>
                      </div>

                      <form id="case-value-review-form" name="case value review" data-form-name="case value review" onSubmit={requestReview} className="mt-4 grid gap-2">
                        <input
                          name="full_name"
                          value={review.full_name}
                          onChange={(event) => setReview((current) => ({ ...current, full_name: event.target.value }))}
                          required
                          autoComplete="name"
                          placeholder={ko ? "성명" : "Full name"}
                          aria-label={ko ? "성명" : "Full name"}
                          className="h-10 rounded-[3px] border border-[#211E1B]/12 bg-white px-3 text-[12px] outline-none focus:border-[#6E635A]"
                        />
                        <input
                          name="email"
                          type="email"
                          value={review.email}
                          onChange={(event) => setReview((current) => ({ ...current, email: event.target.value }))}
                          required
                          autoComplete="email"
                          placeholder={ko ? "이메일" : "Email"}
                          aria-label={ko ? "이메일" : "Email"}
                          className="h-10 rounded-[3px] border border-[#211E1B]/12 bg-white px-3 text-[12px] outline-none focus:border-[#6E635A]"
                        />
                        <input name="subject" value={ko ? "사건 가치 계산기 전문가 검토 요청" : "Case value calculator expert review"} readOnly className="sr-only" aria-hidden="true" tabIndex={-1} />
                        <textarea name="message" value={buildSummary()} readOnly rows={3} className="resize-none rounded-[3px] border border-[#211E1B]/10 bg-white/65 p-3 text-[9px] leading-4 text-[#211E1B]/42 outline-none" aria-label={ko ? "계산 결과 요약" : "Estimate summary"} />
                        <button type="submit" disabled={isSubmitting} className="inline-flex h-10 items-center justify-between rounded-[3px] bg-[#211E1B] px-4 text-[10px] font-semibold text-white disabled:opacity-60">
                          <span>{isSubmitting ? (ko ? "전송 중..." : "Sending...") : (ko ? "이메일로 결과 + 전문가 검토 요청" : "Email result + request review")}</span><ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <p className="text-[8px] leading-4 text-[#211E1B]/34">{ko ? "제출은 변호사-의뢰인 관계를 형성하지 않습니다. 기밀 또는 긴급한 정보를 보내지 마세요." : "Submitting does not create an attorney-client relationship. Do not send confidential or time-sensitive information."}</p>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <div style={serifStyle(locale)} className={ko ? "text-[1.8rem] font-medium text-[#211E1B]/28" : "editorial-serif text-[2.7rem] leading-none text-[#211E1B]/22"}>$— – $—</div>
                    <p className="mt-4 max-w-[310px] text-[11px] leading-5 text-[#211E1B]/45">{ko ? "핵심 정보를 입력한 뒤 계산 버튼을 누르세요. 결과는 이 자리에서 바로 나타납니다." : "Fill in the core details and calculate. Your range and breakdown will appear here without asking for contact information first."}</p>
                    <div className="mt-7 space-y-3 border-t border-[#211E1B]/10 pt-5 text-[10px] leading-5 text-[#211E1B]/46">
                      <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6E635A]" /><span>{ko ? "경제적 손실 합산" : "Adds documented economic losses"}</span></div>
                      <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6E635A]" /><span>{ko ? "부상·치료를 이용한 비경제적 손해 범위 모델" : "Models a non-economic range from injury and treatment"}</span></div>
                      <div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6E635A]" /><span>{ko ? "입력한 비교 과실 비율 반영" : "Applies the comparative-fault percentage you enter"}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-white">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px]">
              <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "계산 방식" : "How it is calculated"}</div>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "숫자를 만드는 세 부분" : "Three parts build the range"}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  {[
                    ko ? ["1. 경제적 손실", "현재·향후 의료비, 임금 및 소득 손실, 재산 피해 등 입력한 금액을 더합니다."] : ["1. Economic losses", "Adds the medical costs, wage loss, future income loss, future care, and property damage you enter."],
                    ko ? ["2. 비경제적 손해", "의료비를 기준으로 부상 정도와 치료 수준을 이용해 통증·생활 영향의 넓은 교육용 범위를 모델링합니다."] : ["2. Non-economic model", "Uses the medical-cost base plus injury severity and treatment level to model a broad pain-and-impact range."],
                    ko ? ["3. 과실 조정", "입력한 본인 과실 비율을 적용해 비교 과실이 결과에 미칠 수 있는 영향을 보여줍니다."] : ["3. Fault adjustment", "Applies your estimated share of fault to illustrate how California comparative fault can change recovery."],
                  ].map(([title, body]) => (
                    <div key={title} className="border-t border-[#211E1B]/12 pt-4">
                      <h3 className="text-[13px] font-semibold">{title}</h3>
                      <p className="mt-2 text-[11px] leading-5 text-[#211E1B]/50">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 rounded-[4px] bg-[#F7F5F1] px-5 py-4 text-[10px] leading-5 text-[#211E1B]/48">
                {ko ? "중요: 비경제적 손해에 사용되는 배수는 법이 정한 공식이 아닙니다. 이 계산기는 일반적인 손해 요소를 이해하기 위한 교육용 모델이며, 실제 합의나 배심 평결을 예측하지 않습니다." : "Important: the non-economic multiplier is not a formula required by California law. It is an educational modeling device for showing how injury severity and treatment can change a rough range; it does not predict a settlement or jury verdict."}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-[#F1EEE8]">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px]">
              <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "실제 캘리포니아 사례" : "A real California example"}</div>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">Audish v. Macias (2024)</h2>
                </div>
                <div>
                  <p className="text-[13px] leading-7 text-[#211E1B]/62">{ko ? "공개된 캘리포니아 항소법원 판결에서 자동차 충돌 사건의 배심은 총 손해액을 $65,699.50로 판단했습니다. 여기에는 과거 의료비 $29,288.94, 과거 비경제적 손해 $3,620, 향후 의료비 $32,790.56가 포함됐고, 배심은 양측에 각각 50%의 책임을 배정했습니다." : "In a published California Court of Appeal decision involving an auto collision, the jury found $65,699.50 in total damages: $29,288.94 in past medical expenses, $3,620 in past non-economic loss, and $32,790.56 in future medical expenses. The jury assigned 50% responsibility to each driver."}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[3px] border border-[#211E1B]/10 bg-white px-4 py-4"><div className="text-[9px] uppercase tracking-[0.11em] text-[#211E1B]/38">{ko ? "총 손해액" : "Total damages"}</div><div className="mt-2 text-[18px] font-semibold tabular-nums">$65,699.50</div></div>
                    <div className="rounded-[3px] border border-[#211E1B]/10 bg-white px-4 py-4"><div className="text-[9px] uppercase tracking-[0.11em] text-[#211E1B]/38">{ko ? "과거 의료비" : "Past medical"}</div><div className="mt-2 text-[18px] font-semibold tabular-nums">$29,288.94</div></div>
                    <div className="rounded-[3px] border border-[#211E1B]/10 bg-white px-4 py-4"><div className="text-[9px] uppercase tracking-[0.11em] text-[#211E1B]/38">{ko ? "원고 과실" : "Plaintiff fault"}</div><div className="mt-2 text-[18px] font-semibold tabular-nums">50%</div></div>
                  </div>
                  <p className="mt-4 text-[10px] leading-5 text-[#211E1B]/44">{ko ? "이 사건은 비교 대상이나 예상 결과가 아닙니다. 손해 항목과 비교 과실이 실제 사건에서 별도로 판단된다는 점을 보여주는 공개 사례입니다." : "This is not a comparable-case promise or prediction. It is a public example showing that damage categories and comparative fault are evaluated separately in real litigation."}</p>
                  <a href="https://law.justia.com/cases/california/court-of-appeal/2024/d081689.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold text-[#6E635A] underline underline-offset-3">{ko ? "공개 판결 읽기" : "Read the published decision"}<ArrowRight className="h-3 w-3" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-white">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px]">
              <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "가치를 바꾸는 요소" : "What can change case value"}</div>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "계산기 밖에서 중요한 것" : "The factors a calculator cannot fully measure"}</h2>
                </div>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  {[
                    ko ? ["의료비와 향후 치료", "이미 발생한 치료비뿐 아니라 의학적으로 뒷받침되는 향후 치료도 중요할 수 있습니다."] : ["Medical expenses and future care", "Past treatment costs matter, but medically supported future care can materially change the claim."],
                    ko ? ["임금 및 근로 능력", "이미 잃은 임금과 장기적인 소득 능력 감소는 서로 다른 손실일 수 있습니다."] : ["Lost earnings and earning capacity", "Income already lost and a long-term reduction in earning ability are different kinds of economic loss."],
                    ko ? ["통증과 생활 영향", "부상의 기간, 기능 제한, 흉터, 장애 및 일상생활에 미친 영향은 비경제적 손해와 관련됩니다."] : ["Pain and effect on daily life", "Duration, limitations, scarring, disability, and disruption to normal life can matter to non-economic damages."],
                    ko ? ["책임과 비교 과실", "캘리포니아에서는 원고의 과실도 회수액을 줄이는 요소가 될 수 있습니다."] : ["Liability and comparative fault", "California comparative-fault rules can reduce damages based on responsibility attributed to the injured person."],
                    ko ? ["증거와 인과관계", "사고가 실제로 해당 치료와 손실을 일으켰다는 의료기록, 사진, 증언 및 기타 증거가 중요합니다."] : ["Evidence and causation", "Medical records, photos, witnesses, and other proof help connect the accident to the treatment and losses claimed."],
                    ko ? ["보험과 회수 가능성", "보험 한도, 책임 당사자 수, 의료비 유치권 및 기타 회수 문제는 단순 계산으로 알 수 없습니다."] : ["Insurance and collectability", "Policy limits, multiple responsible parties, medical liens, and available coverage can change the practical outcome."],
                  ].map(([title, body]) => (
                    <div key={title} className="border-t border-[#211E1B]/10 py-4">
                      <h3 className="text-[12px] font-semibold">{title}</h3>
                      <p className="mt-1.5 text-[10px] leading-5 text-[#211E1B]/48">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-[#F7F5F1]">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px] grid gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "언제 사용하나요" : "When to use the calculator"}</div>
                <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">{ko ? "초기 방향을 잡는 데 사용하세요." : "Use it for orientation, not certainty."}</h2>
                <div className="mt-5 space-y-3 text-[11px] leading-5 text-[#211E1B]/54">
                  <p>• {ko ? "치료가 진행 중이고 현재까지의 비용을 대략 알고 있을 때" : "When treatment is underway and you know your current costs."}</p>
                  <p>• {ko ? "보험사의 초기 제안이 너무 낮거나 높은지 대략 이해하고 싶을 때" : "When you want context before evaluating an early insurance offer."}</p>
                  <p>• {ko ? "향후 치료나 소득 손실이 숫자에 얼마나 영향을 줄 수 있는지 살펴볼 때" : "When you want to see how future care or wage loss can change the range."}</p>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "언제 계산기에 의존하면 안 되나요" : "When not to rely on a calculator"}</div>
                <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">{ko ? "복잡하거나 큰 사건은 실제 검토가 필요합니다." : "Serious or disputed cases need a real review."}</h2>
                <div className="mt-5 space-y-3 text-[11px] leading-5 text-[#211E1B]/54">
                  <p>• {ko ? "수술, 영구적 장애, 뇌·척추 손상 또는 큰 향후 손실이 있는 경우" : "Surgery, permanent disability, brain/spinal injury, or major future losses."}</p>
                  <p>• {ko ? "책임이 다투어지거나 여러 차량·사업체·보험이 관련된 경우" : "Disputed fault or multiple vehicles, companies, or insurance policies."}</p>
                  <p>• {ko ? "청구 기한이 가까워졌거나 정부기관이 관련된 경우" : "A deadline may be close or a government entity may be involved."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-white">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px]">
              <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "결과를 본 다음" : "What to do next"}</div>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "계산 결과를 실제 정보로 바꾸기" : "Turn the estimate into a better-documented claim"}</h2>
                </div>
                <div className="divide-y divide-[#211E1B]/10 border-t border-[#211E1B]/10">
                  {[
                    ko ? ["1", "치료 및 의료비 기록 보관", "진료기록, 청구서, 처방, 재활 및 향후 치료 계획을 한곳에 모으세요."] : ["1", "Keep treatment and billing records", "Organize medical records, bills, prescriptions, therapy, and any written plan for future care."],
                    ko ? ["2", "소득 손실 기록", "결근일, 급여 명세서, 고용주 확인서 및 자영업 소득 자료를 보관하세요."] : ["2", "Document income loss", "Keep missed-work dates, pay records, employer confirmation, and self-employment income documentation."],
                    ko ? ["3", "사고 증거 보존", "사진, 영상, 경찰·사고 보고서, 목격자 연락처 및 보험 관련 문서를 보존하세요."] : ["3", "Preserve accident evidence", "Save photos, video, police or incident reports, witness contacts, and insurance correspondence."],
                    ko ? ["4", "기한 확인", "캘리포니아 개인상해 소송은 일반적으로 부상일로부터 2년이지만 예외가 있고 정부기관 관련 청구는 더 짧을 수 있습니다."] : ["4", "Check the deadline", "California personal-injury lawsuits generally have a two-year deadline from the injury, but exceptions exist and claims involving government entities can have shorter deadlines."],
                    ko ? ["5", "필요하면 변호사 검토", "중상, 과실 분쟁, 낮은 보험 제안 또는 큰 향후 손실이 있다면 계산기보다 사건 검토가 더 중요합니다."] : ["5", "Get a legal review when it matters", "For serious injuries, disputed fault, low insurance offers, or substantial future losses, a case review matters more than any calculator."],
                  ].map(([number, title, body]) => (
                    <div key={number} className="grid gap-2 py-4 sm:grid-cols-[34px_0.6fr_1.4fr] sm:items-start sm:gap-5">
                      <span className="text-[10px] font-semibold text-[#6E635A]">0{number}</span>
                      <h3 className="text-[12px] font-semibold">{title}</h3>
                      <p className="text-[10px] leading-5 text-[#211E1B]/48">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-[#F1EEE8]">
          <div className="site-shell py-12 md:py-16">
            <div className="mx-auto max-w-[1040px]">
              <div className="grid gap-8 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">FAQ</div>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.025em]">{ko ? "사건 가치 계산기 질문" : "Case value calculator questions"}</h2>
                </div>
                <div className="divide-y divide-[#211E1B]/10 border-t border-[#211E1B]/10">
                  {[
                    ko ? ["이 계산기가 실제 합의금을 알려주나요?", "아니요. 입력값을 바탕으로 한 교육용 범위일 뿐이며 실제 합의, 평결 또는 회수액을 예측하지 않습니다."] : ["Does this calculator tell me my actual settlement?", "No. It creates an educational range from your inputs. It does not predict a settlement, verdict, or actual recovery."],
                    ko ? ["왜 정확한 한 숫자가 아닌 범위인가요?", "책임, 보험, 의료 증거, 향후 손실 및 협상 상황이 사건마다 달라 한 숫자는 실제 불확실성을 숨길 수 있습니다."] : ["Why does it show a range instead of one number?", "Liability, insurance, medical proof, future losses, and negotiation posture vary from case to case. One number would hide that uncertainty."],
                    ko ? ["의료비의 몇 배가 사건 가치인가요?", "그런 고정 법칙은 없습니다. 배수 방식은 교육용 시작점으로 쓰일 수 있지만 캘리포니아 법이 요구하는 공식은 아닙니다."] : ["Is a case worth a fixed multiple of medical bills?", "No fixed rule says that. Multiplier methods can be educational starting points, but they are not a California legal formula."],
                    ko ? ["캘리포니아에서 과실이 있어도 보상받을 수 있나요?", "비교 과실 원칙에 따라 본인에게 일부 책임이 배정될 수 있고 그 비율이 손해액에 영향을 줄 수 있습니다. 실제 적용은 사건의 구체적 사실에 따라 달라집니다."] : ["Can I recover if I was partly at fault in California?", "California uses comparative fault. Responsibility attributed to an injured person can reduce damages, but the real allocation depends on the evidence and facts."],
                    ko ? ["결과를 변호사에게 검토받을 수 있나요?", "네. 결과가 나온 뒤 이름과 이메일을 입력해 계산 요약과 함께 전문가 검토를 요청할 수 있습니다."] : ["Can someone review my result?", "Yes. After the result appears, you can enter your name and email to send the estimate summary with a request for a human review."],
                  ].map(([question, answer]) => (
                    <div key={question} className="py-5">
                      <h3 className="text-[13px] font-semibold">{question}</h3>
                      <p className="mt-2 text-[11px] leading-5 text-[#211E1B]/50">{answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-white">
          <div className="site-shell py-10 md:py-12">
            <div className="mx-auto max-w-[1040px] grid gap-6 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "방법론 및 출처" : "Methodology & sources"}</div>
              </div>
              <div className="text-[10px] leading-5 text-[#211E1B]/48">
                <p>{ko ? "이 도구는 캘리포니아 법원이 설명하는 개인상해 손해의 일반적인 범주—의료비, 소득 손실, 비경제적 손해 및 비교 과실—를 이해하기 쉽게 모델링합니다. 비경제적 손해 범위는 법정 공식이 아닌 교육용 휴리스틱입니다." : "This tool models common categories of personal-injury damages reflected in California civil jury instructions—medical expenses, earnings-related losses, non-economic harm, and comparative fault. The non-economic range is an educational heuristic, not a court formula."}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  <a href="https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California CACI</a>
                  <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California Courts: Personal injury</a>
                  <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="font-semibold text-[#6E635A] underline underline-offset-3">California Courts: Deadlines</a>
                </div>
                <p className="mt-4 text-[9px] text-[#211E1B]/34">{ko ? "최종 업데이트: 2026년 9월 · 일반 정보이며 법률 자문이 아닙니다." : "Last updated September 2026 · General information only; not legal advice."}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#211E1B] text-white">
          <div className="site-shell grid gap-5 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="text-[15px] font-semibold">{ko ? "계산기로 알 수 없는 부분을 실제로 검토해 보세요." : "Have the facts reviewed beyond the calculator."}</div>
              <p className="mt-1 text-[10px] leading-5 text-white/45">{ko ? "중상, 과실 분쟁 또는 큰 향후 손실이 있다면 실제 기록과 보험 정보를 함께 봐야 합니다." : "Serious injuries, disputed fault, or major future losses require the records, coverage, and real evidence."}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`${localePrefix(locale)}/contact`} className="inline-flex h-10 items-center gap-2 rounded-[3px] bg-white px-4 text-[10px] font-semibold text-[#211E1B]"><span>{ko ? "상담 요청" : "Request a consultation"}</span><ArrowRight className="h-3.5 w-3.5" /></a>
              <a href={brand.phoneHref} className="inline-flex h-10 items-center px-3 text-[12px] font-semibold">{brand.phoneDisplay}</a>
            </div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
