import { useMemo, useState } from "react";
import { ArrowRight, Info, Mail, RotateCcw } from "lucide-react";
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

const InputLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-2 block text-[13px] font-semibold text-[#211E1B]">{children}</span>
);

const CurrencyInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <label className="block">
    <InputLabel>{label}</InputLabel>
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
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) => (
  <label className="block">
    <InputLabel>{label}</InputLabel>
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
      ? `계산기 예상 범위: ${money(estimate.low)} – ${money(estimate.high)}\n사건: ${caseLabel?.ko || "미선택"}\n부상: ${severityLabel?.ko || "미선택"}\n치료: ${treatmentLabel?.ko || "미선택"}\n의료비: ${money(state.medical)}\n향후 치료비: ${money(state.futureMedical)}\n임금 손실: ${money(state.lostWages)}\n향후 소득 손실: ${money(state.futureIncome)}\n재산 피해: ${money(state.property)}\n본인 과실 입력: ${state.fault}%\n\n이 계산 결과에 대해 전문가의 의견을 받고 싶습니다.`
      : `Calculator estimate: ${money(estimate.low)} – ${money(estimate.high)}\nIncident: ${caseLabel?.en || "Not selected"}\nInjury: ${severityLabel?.en || "Not selected"}\nTreatment: ${treatmentLabel?.en || "Not selected"}\nMedical bills: ${money(state.medical)}\nFuture medical care: ${money(state.futureMedical)}\nLost wages: ${money(state.lostWages)}\nFuture income loss: ${money(state.futureIncome)}\nProperty damage: ${money(state.property)}\nEstimated fault: ${state.fault}%\n\nI would like an expert opinion on this estimate.`;
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
    setReview({ full_name: "", email: "", message: "" });
  };

  const requestReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimate || isSubmitting) return;
    setIsSubmitting(true);

    window.setTimeout(() => {
      window.location.assign(ko ? "/ko/thank-you" : "/thank-you");
    }, 900);
  };

  const reviewMessage = review.message || (calculated ? buildSummary() : "");

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#F7F5F1] pt-[60px] text-[#211E1B]">
        <section className="border-b border-[#211E1B]/10 bg-[#F1EEE8]">
          <div className="site-shell py-10 md:py-12 lg:py-14">
            <div className="max-w-[760px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "캘리포니아 개인상해 계산기" : "California personal injury calculator"}</div>
              <h1 style={serifStyle(locale)} className={ko ? "mt-4 text-[clamp(2.15rem,4vw,3.4rem)] font-medium leading-[1.2] tracking-[-0.035em]" : "editorial-serif mt-4 text-[clamp(2.5rem,4.5vw,3.8rem)] leading-[0.98] tracking-[-0.035em]"}>
                {ko ? "내 사건의 가치는 얼마일까요?" : "What could your case be worth?"}
              </h1>
              <p className="mt-4 max-w-[640px] text-[14px] leading-6 text-[#211E1B]/58 md:text-[15px]">
                {ko ? "핵심 정보를 입력하면 예상 범위와 간단한 손해액 분석을 확인할 수 있습니다." : "Enter the core facts to get a rough range and a simple breakdown of what is driving it."}
              </p>
            </div>
          </div>
        </section>

        <section className="site-shell py-10 md:py-14 lg:py-16">
          <div className="mx-auto max-w-[980px]">
            <div className="grid overflow-hidden rounded-[5px] border border-[#211E1B]/12 bg-white lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-5 md:p-7 lg:p-8">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#211E1B]/10 pb-5">
                  <div>
                    <h2 className="text-[19px] font-semibold tracking-[-0.02em]">{ko ? "사건 정보" : "Your case details"}</h2>
                    <p className="mt-1 text-[11px] leading-5 text-[#211E1B]/46">{ko ? "필요한 정보만 묻습니다." : "Only the inputs that meaningfully change the estimate."}</p>
                  </div>
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-[11px] font-medium text-[#211E1B]/45 hover:text-[#211E1B]">
                    <RotateCcw className="h-3.5 w-3.5" />{ko ? "초기화" : "Reset"}
                  </button>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectInput label={ko ? "사건 유형" : "Incident type"} value={state.caseType} placeholder={ko ? "선택" : "Choose"} options={caseTypes.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, caseType: value as CaseType | "" }))} />
                  <SelectInput label={ko ? "부상 정도" : "Injury severity"} value={state.severity} placeholder={ko ? "선택" : "Choose"} options={severities.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, severity: value as Severity | "" }))} />
                  <SelectInput label={ko ? "최고 수준의 치료" : "Highest treatment level"} value={state.treatment} placeholder={ko ? "선택" : "Choose"} options={treatments.map((item) => ({ value: item.value, label: ko ? item.ko : item.en }))} onChange={(value) => setState((current) => ({ ...current, treatment: value as Treatment | "" }))} />
                  <CurrencyInput label={ko ? "현재 의료비" : "Medical bills"} value={state.medical} onChange={(value) => setState((current) => ({ ...current, medical: value }))} />
                  <CurrencyInput label={ko ? "임금 손실" : "Lost wages"} value={state.lostWages} onChange={(value) => setState((current) => ({ ...current, lostWages: value }))} />

                  <div className="sm:col-span-2">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <InputLabel>{ko ? "본인의 예상 과실" : "Your estimated share of fault"}</InputLabel>
                        <p className="text-[11px] leading-5 text-[#211E1B]/44">{ko ? "확실하지 않다면 0%에서 시작하세요." : "If you are unsure, start at 0%."}</p>
                      </div>
                      <div className="text-[23px] font-semibold tabular-nums text-[#6E635A]">{state.fault}%</div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={state.fault}
                      onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))}
                      className="mt-3 w-full accent-[#6E635A]"
                      aria-label={ko ? "본인의 예상 과실" : "Your estimated share of fault"}
                    />
                    <div className="mt-1 flex justify-between text-[9px] text-[#211E1B]/32"><span>0%</span><span>50%</span><span>100%</span></div>
                  </div>
                </div>

                <details className="mt-6 border-t border-[#211E1B]/10 pt-5">
                  <summary className="cursor-pointer text-[12px] font-semibold text-[#6E635A]">{ko ? "+ 더 자세한 정보 추가 (선택)" : "+ Add more details (optional)"}</summary>
                  <p className="mt-2 text-[11px] leading-5 text-[#211E1B]/44">{ko ? "향후 손실이나 장기적 영향이 있다면 추가하면 범위를 더 세밀하게 조정할 수 있습니다." : "Add future losses or lasting effects if they apply. These can materially change the range."}</p>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <CurrencyInput label={ko ? "예상 향후 의료비" : "Future medical care"} value={state.futureMedical} onChange={(value) => setState((current) => ({ ...current, futureMedical: value }))} />
                    <CurrencyInput label={ko ? "향후 소득 손실" : "Future income loss"} value={state.futureIncome} onChange={(value) => setState((current) => ({ ...current, futureIncome: value }))} />
                    <CurrencyInput label={ko ? "재산 피해" : "Property damage"} value={state.property} onChange={(value) => setState((current) => ({ ...current, property: value }))} />
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[3px] border border-[#211E1B]/12 px-4 py-3">
                      <input type="checkbox" checked={state.permanent} onChange={(event) => setState((current) => ({ ...current, permanent: event.target.checked }))} className="h-4 w-4 accent-[#6E635A]" />
                      <span className="text-[12px] font-medium leading-5">{ko ? "장기적 또는 영구적 영향이 예상됨" : "Long-term or permanent effects expected"}</span>
                    </label>
                  </div>
                </details>

                {error ? <div className="mt-5 rounded-[3px] bg-[#F4ECE7] px-4 py-3 text-[11px] font-medium text-[#7B4435]">{error}</div> : null}

                <button type="button" onClick={calculate} className="mt-6 inline-flex h-11 w-full items-center justify-between rounded-[3px] bg-[#211E1B] px-5 text-[12px] font-semibold text-white hover:bg-[#342F2B]">
                  <span>{ko ? "예상 범위 계산" : "Estimate my case value"}</span><ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="border-t border-[#211E1B]/10 bg-[#F3F0EA] p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6E635A]">{ko ? "예상 범위" : "Estimated range"}</div>

                {calculated && estimate ? (
                  <div id="case-estimate-result" className="mt-5 scroll-mt-24">
                    <div style={serifStyle(locale)} className={ko ? "text-[2rem] font-medium leading-tight tracking-[-0.025em]" : "editorial-serif text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.04em]"}>{money(estimate.low)} – {money(estimate.high)}</div>
                    <p className="mt-3 text-[11px] leading-5 text-[#211E1B]/48">{ko ? "입력한 정보만을 사용한 교육용 추정치입니다." : "Educational estimate based only on the information entered."}</p>

                    <div className="mt-6 border-y border-[#211E1B]/10 py-2">
                      <div className="flex items-center justify-between gap-4 py-2.5 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "경제적 손실" : "Economic losses"}</span><strong className="font-semibold tabular-nums">{money(estimate.economic)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2.5 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "비경제적 손해 모델" : "Modeled non-economic damages"}</span><strong className="font-semibold tabular-nums">{money(estimate.nonEconomicLow)} – {money(estimate.nonEconomicHigh)}</strong></div>
                      <div className="flex items-center justify-between gap-4 py-2.5 text-[11px]"><span className="text-[#211E1B]/52">{ko ? "비교 과실 조정" : "Comparative-fault adjustment"}</span><strong className="font-semibold tabular-nums">× {estimate.faultFactor.toFixed(2)}</strong></div>
                    </div>

                    <div className="mt-5 flex gap-2 rounded-[3px] border border-[#211E1B]/10 bg-white/70 p-4">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6E635A]" />
                      <p className="text-[10px] leading-5 text-[#211E1B]/50">{ko ? "이 결과는 법률 자문, 합의 제안 또는 실제 사건 가치에 대한 의견이 아닙니다. 보험 한도, 의료비 유치권, 인과관계, 증거의 강도, 관할 및 협상 상황 등은 반영하지 못합니다." : "This is not legal advice, a settlement offer, or an opinion of actual case value. It cannot account for policy limits, liens, causation disputes, evidence quality, venue, or negotiation posture."}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <div style={serifStyle(locale)} className={ko ? "text-[1.8rem] font-medium text-[#211E1B]/28" : "editorial-serif text-[2.7rem] leading-none text-[#211E1B]/22"}>$— – $—</div>
                    <p className="mt-4 max-w-[300px] text-[11px] leading-5 text-[#211E1B]/45">{ko ? "왼쪽의 핵심 정보를 입력한 뒤 계산 버튼을 누르세요." : "Fill in the core details and calculate. Optional details can make the estimate more specific."}</p>
                    <div className="mt-7 border-t border-[#211E1B]/10 pt-5 text-[10px] leading-5 text-[#211E1B]/42">
                      {ko ? "계산에 사용: 의료비 · 임금 손실 · 부상 정도 · 치료 수준 · 향후 손실 · 영구적 영향 · 비교 과실" : "Uses: medical costs · wage loss · injury severity · treatment · future losses · lasting effects · comparative fault"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {calculated && estimate ? (
              <section className="mt-8 rounded-[5px] border border-[#211E1B]/12 bg-white p-5 md:p-7" aria-labelledby="expert-review-heading">
                <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
                  <div>
                    <Mail className="h-5 w-5 text-[#6E635A]" />
                    <h2 id="expert-review-heading" className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">{ko ? "이메일로 전문가 의견 받기" : "Get an expert opinion by email"}</h2>
                    <p className="mt-2 text-[12px] leading-6 text-[#211E1B]/52">{ko ? "계산 결과를 팀에 보내 검토를 요청할 수 있습니다. 결과를 보기 위해 연락처를 입력할 필요는 없습니다." : "Send the estimate to the team for a human review. Contact information is never required to see the calculator result."}</p>
                  </div>

                  <form id="case-value-review-form" name="case value review" data-form-name="case value review" onSubmit={requestReview} className="grid gap-3 sm:grid-cols-2">
                    <input
                      name="full_name"
                      value={review.full_name}
                      onChange={(event) => setReview((current) => ({ ...current, full_name: event.target.value }))}
                      required
                      autoComplete="name"
                      placeholder={ko ? "성명" : "Full name"}
                      aria-label={ko ? "성명" : "Full name"}
                      className="h-11 rounded-[3px] border border-[#211E1B]/12 bg-[#F7F5F1] px-3 text-[13px] outline-none focus:border-[#6E635A]"
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
                      className="h-11 rounded-[3px] border border-[#211E1B]/12 bg-[#F7F5F1] px-3 text-[13px] outline-none focus:border-[#6E635A]"
                    />
                    <input name="subject" value={ko ? "사건 가치 계산기 전문가 검토 요청" : "Case value calculator expert review"} readOnly className="sr-only" aria-hidden="true" tabIndex={-1} />
                    <textarea
                      name="message"
                      value={reviewMessage}
                      onChange={(event) => setReview((current) => ({ ...current, message: event.target.value }))}
                      rows={5}
                      className="resize-none rounded-[3px] border border-[#211E1B]/12 bg-[#F7F5F1] p-3 text-[11px] leading-5 text-[#211E1B]/65 outline-none focus:border-[#6E635A] sm:col-span-2"
                      aria-label={ko ? "검토 요청 내용" : "Review request summary"}
                    />
                    <button type="submit" disabled={isSubmitting} className="inline-flex h-11 items-center justify-between rounded-[3px] bg-[#211E1B] px-4 text-[11px] font-semibold text-white disabled:opacity-60 sm:col-span-2">
                      <span>{isSubmitting ? (ko ? "전송 중..." : "Sending...") : (ko ? "전문가 검토 요청" : "Request expert review")}</span><ArrowRight className="h-4 w-4" />
                    </button>
                    <p className="text-[9px] leading-4 text-[#211E1B]/38 sm:col-span-2">{ko ? "제출은 변호사-의뢰인 관계를 형성하지 않습니다. 기밀 또는 긴급한 정보를 보내지 마세요." : "Submitting this form does not create an attorney-client relationship. Do not send confidential or time-sensitive information."}</p>
                  </form>
                </div>
              </section>
            ) : null}
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-white">
          <div className="site-shell py-12 md:py-14">
            <div className="mx-auto max-w-[980px]">
              <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-10">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E635A]">{ko ? "예시" : "Examples"}</div>
                  <h2 className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">{ko ? "왜 사건마다 범위가 다른가" : "Why the range changes"}</h2>
                </div>
                <div className="divide-y divide-[#211E1B]/10 border-t border-[#211E1B]/10">
                  {[
                    ko ? ["후방 추돌 + 물리치료", "중간 정도의 부상, 치료비와 임금 손실이 있지만 수술은 없는 경우."] : ["Rear-end crash + physical therapy", "Moderate injury, treatment costs and some wage loss, but no surgery."],
                    ko ? ["오토바이 사고 + 수술", "큰 의료비, 장기 회복, 향후 치료와 소득 손실이 있는 경우."] : ["Motorcycle crash + surgery", "Higher medical costs, a longer recovery, future care and meaningful income loss."],
                    ko ? ["낙상 + 과실 분쟁", "치료비가 있어도 책임이 나뉘면 비교 과실 때문에 회수 범위가 줄어들 수 있습니다."] : ["Slip and fall + disputed fault", "Even with real treatment costs, shared responsibility can reduce the modeled recovery."],
                  ].map(([title, body]) => (
                    <div key={title} className="grid gap-2 py-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
                      <div className="text-[13px] font-semibold">{title}</div>
                      <p className="text-[11px] leading-5 text-[#211E1B]/48">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#211E1B]/10 bg-[#F1EEE8]">
          <div className="site-shell py-12 md:py-14">
            <div className="mx-auto flex max-w-[980px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-[21px] font-semibold tracking-[-0.02em]">{ko ? "계산기로 알 수 없는 부분이 있습니다." : "A calculator can only go so far."}</h2>
                <p className="mt-2 max-w-[620px] text-[12px] leading-6 text-[#211E1B]/50">{ko ? "실제 보험 한도, 의료 기록, 인과관계, 증거의 질 및 협상 상황은 사건을 직접 검토해야 판단할 수 있습니다." : "Policy limits, medical records, causation, evidence quality and negotiation context require a real case review."}</p>
              </div>
              <a href={`${localePrefix(locale)}/contact`} className="inline-flex h-11 shrink-0 items-center gap-3 rounded-[3px] bg-[#211E1B] px-5 text-[11px] font-semibold text-white"><span>{ko ? "상담 요청" : "Request a consultation"}</span><ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#211E1B] text-white">
          <div className="site-shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[12px] text-white/65">{ko ? "질문이 있나요?" : "Prefer to talk it through?"}</div>
            <a href={brand.phoneHref} className="text-[16px] font-semibold">{brand.phoneDisplay}</a>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
