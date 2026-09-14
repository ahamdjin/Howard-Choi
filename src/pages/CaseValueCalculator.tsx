import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Info, RotateCcw, Scale } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";
import { EditorialFrame, isKo, localePrefix, serifStyle } from "@/pages/editorial/shared";

type CaseType = "car" | "truck" | "motorcycle" | "pedestrian" | "rideshare" | "premises" | "other";
type Severity = "minor" | "moderate" | "serious" | "catastrophic";
type Treatment = "limited" | "er" | "therapy" | "injections" | "surgery";
type EvidenceKey = "report" | "photos" | "witness" | "medical";

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

const clampMoney = (value: string) => {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, 100_000_000);
};

const Option = ({
  selected,
  title,
  body,
  onClick,
}: {
  selected: boolean;
  title: string;
  body?: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`group min-h-[96px] border px-5 py-4 text-left transition-all ${
      selected
        ? "border-[#381907] bg-[#381907] text-[#F8F7F4]"
        : "border-[#1E1C1A]/12 bg-white/35 text-[#1E1C1A] hover:border-[#1E1C1A]/28"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <span className="text-[13px] font-semibold tracking-[-0.015em]">{title}</span>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-white/35" : "border-[#1E1C1A]/16"}`}>
        {selected ? <Check className="h-3 w-3" /> : null}
      </span>
    </div>
    {body ? <p className={`mt-2 max-w-[300px] text-[10px] leading-5 ${selected ? "text-white/62" : "text-[#1E1C1A]/48"}`}>{body}</p> : null}
  </button>
);

const MoneyInput = ({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <label className="block border-t border-[#1E1C1A]/12 py-5">
    <div className="grid gap-4 sm:grid-cols-[1fr_180px] sm:items-center">
      <div>
        <div className="text-[12px] font-semibold">{label}</div>
        <div className="mt-1 text-[10px] leading-5 text-[#1E1C1A]/45">{hint}</div>
      </div>
      <div className="flex h-11 items-center border border-[#1E1C1A]/14 bg-white/65 px-3 focus-within:border-[#381907]/55">
        <span className="mr-2 text-[12px] text-[#1E1C1A]/40">$</span>
        <input
          type="number"
          min="0"
          step="100"
          inputMode="decimal"
          value={value || ""}
          placeholder="0"
          onChange={(event) => onChange(clampMoney(event.target.value))}
          className="w-full bg-transparent text-right text-[15px] font-medium outline-none placeholder:text-[#1E1C1A]/24"
        />
      </div>
    </div>
  </label>
);

export const CaseValueCalculatorPage = ({ locale }: { locale: SiteLocale }) => {
  const ko = isKo(locale);
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>(initialState);
  const [error, setError] = useState("");

  const copy = ko ? {
    eyebrow: "캘리포니아 개인상해 계산기",
    hero: "내 사건의 가치는 얼마일까요?",
    heroBody: "몇 가지 핵심 정보를 바탕으로 교육용 범위를 확인하세요. 결과를 보기 위해 이메일이나 전화번호를 입력할 필요가 없습니다.",
    note: "약 2분 · 무료 · 결과 즉시 확인",
    next: "계속",
    back: "이전",
    calculate: "예상 범위 보기",
    restart: "다시 시작",
  } : {
    eyebrow: "California personal injury estimator",
    hero: "What might your case be worth?",
    heroBody: "Use a few core facts to build an educational range. No email or phone number is required to see the result.",
    note: "About 2 minutes · Free · Instant result",
    next: "Continue",
    back: "Back",
    calculate: "See estimated range",
    restart: "Start over",
  };

  const caseTypes: Array<{ value: CaseType; en: string; ko: string; body: string; koBody: string }> = [
    { value: "car", en: "Car accident", ko: "자동차 사고", body: "Passenger vehicles, rear-end and intersection crashes.", koBody: "승용차, 후방 추돌 및 교차로 사고." },
    { value: "truck", en: "Truck accident", ko: "트럭 사고", body: "Commercial trucks, delivery vehicles and larger carriers.", koBody: "상업용 트럭, 배송 차량 및 대형 운송 차량." },
    { value: "motorcycle", en: "Motorcycle accident", ko: "오토바이 사고", body: "Motorcycle collisions and serious rider injuries.", koBody: "오토바이 충돌 및 라이더의 중상." },
    { value: "pedestrian", en: "Pedestrian accident", ko: "보행자 사고", body: "Pedestrians struck in streets, lots or crosswalks.", koBody: "도로, 주차장 또는 횡단보도에서 발생한 보행자 사고." },
    { value: "rideshare", en: "Rideshare accident", ko: "라이드셰어 사고", body: "Uber, Lyft and other app-based transportation.", koBody: "Uber, Lyft 등 앱 기반 운송 서비스 사고." },
    { value: "premises", en: "Slip, fall or unsafe property", ko: "미끄러짐·낙상·시설 사고", body: "Falls and injuries involving unsafe property conditions.", koBody: "위험한 시설 상태와 관련된 낙상 및 부상." },
    { value: "other", en: "Another injury claim", ko: "기타 상해 사건", body: "Use the estimator as a rough educational starting point.", koBody: "교육용 시작점으로 계산기를 이용하세요." },
  ];

  const severities: Array<{ value: Severity; en: string; ko: string; body: string; koBody: string }> = [
    { value: "minor", en: "Minor", ko: "경미", body: "Short recovery, strains, soreness or limited treatment.", koBody: "짧은 회복 기간, 염좌·통증 또는 제한적인 치료." },
    { value: "moderate", en: "Moderate", ko: "중간", body: "Ongoing treatment with meaningful disruption to normal life.", koBody: "지속적인 치료와 일상생활에 의미 있는 영향." },
    { value: "serious", en: "Serious", ko: "중상", body: "Fracture, significant injury, invasive treatment or long recovery.", koBody: "골절, 중대한 부상, 침습적 치료 또는 장기간 회복." },
    { value: "catastrophic", en: "Catastrophic / permanent", ko: "중대·영구 부상", body: "Life-changing injury, major disability or substantial future care.", koBody: "삶을 바꾸는 부상, 중대한 장애 또는 상당한 향후 치료." },
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
      multiplierLow,
      multiplierHigh,
      faultFactor,
      low: Math.max(0, low),
      high: Math.max(low, high),
      midpoint: Math.max(0, (low + high) / 2),
    };
  }, [state]);

  const updateMoney = (key: MoneyKey, value: number) => setState((current) => ({ ...current, [key]: value }));

  const next = () => {
    if (step === 1 && !state.caseType) {
      setError(ko ? "사건 유형을 선택하세요." : "Choose the type of incident first.");
      return;
    }
    if (step === 2 && (!state.severity || !state.treatment)) {
      setError(ko ? "부상 정도와 치료 유형을 선택하세요." : "Choose both injury severity and treatment level.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  };

  const calculate = () => {
    const financialTotal = state.medical + state.futureMedical + state.lostWages + state.futureIncome + state.property + state.otherCosts;
    if (financialTotal <= 0) {
      setError(ko ? "의미 있는 범위를 계산하려면 최소 한 가지 금전적 손실을 입력하세요." : "Add at least one documented financial loss so the estimator has a meaningful starting point.");
      setStep(3);
      return;
    }
    setError("");
    setStep(5);
  };

  const reset = () => {
    setState(initialState);
    setError("");
    setStep(1);
  };

  const progress = step >= 5 ? 100 : step * 25;
  const selectedCase = caseTypes.find((item) => item.value === state.caseType);

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#F8F7F4] pt-[60px]">
        <section className="border-b border-[#1E1C1A]/10 bg-[#211A16] text-[#F3EEE5]">
          <div className="site-shell grid gap-10 py-12 md:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-20">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/42">{copy.eyebrow}</div>
              <div className="mt-6 flex items-center gap-3 text-[10px] text-white/40"><Scale className="h-4 w-4 stroke-[1.25]" /><span>{copy.note}</span></div>
            </div>
            <div>
              <h1 style={serifStyle(locale)} className={ko ? "max-w-[820px] text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.18] tracking-[-0.045em]" : "editorial-serif max-w-[880px] text-[clamp(3.2rem,6.5vw,7rem)] leading-[0.9] tracking-[-0.05em]"}>{copy.hero}</h1>
              <p className="mt-7 max-w-[680px] text-[14px] leading-7 text-white/62 md:text-[15px]">{copy.heroBody}</p>
            </div>
          </div>
        </section>

        <section className="site-shell py-10 md:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <aside className="lg:sticky lg:top-[88px] lg:self-start">
              <div className="border-t border-[#1E1C1A]/12 pt-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">{ko ? "진행 상황" : "Your estimate"}</div>
                <div className="mt-4 h-[2px] bg-[#1E1C1A]/8"><div className="h-full bg-[#381907] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
                <div className="mt-5 space-y-1">
                  {[1, 2, 3, 4].map((number) => (
                    <div key={number} className={`grid grid-cols-[28px_1fr] border-b border-[#1E1C1A]/8 py-3 text-[10px] transition-colors ${step === number ? "text-[#381907]" : number < step ? "text-[#1E1C1A]/65" : "text-[#1E1C1A]/30"}`}>
                      <span className="tabular-nums">0{number}</span>
                      <span>{ko ? ["사고 유형", "부상·치료", "금전적 손실", "과실·증거"][number - 1] : ["Incident", "Injury & treatment", "Financial losses", "Fault & evidence"][number - 1]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2 text-[10px] leading-5 text-[#1E1C1A]/42"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /><p>{ko ? "이 계산기는 교육용이며 법률 자문이나 합의 제안이 아닙니다." : "Educational only. This is not legal advice, a valuation opinion, or a settlement offer."}</p></div>
              </div>
            </aside>

            <div className="min-w-0">
              {step === 1 ? (
                <section>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">01 · {ko ? "사건" : "Incident"}</div>
                  <h2 style={serifStyle(locale)} className={ko ? "mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.3]" : "editorial-serif mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]"}>{ko ? "어떤 일이 있었나요?" : "What happened?"}</h2>
                  <p className="mt-4 max-w-[640px] text-[13px] leading-6 text-[#1E1C1A]/54">{ko ? "사건 유형은 후속 질문과 결과 설명을 맞추는 데 사용됩니다." : "The incident type helps tailor the explanation around your estimate. It does not automatically inflate or reduce the number."}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {caseTypes.map((item) => <Option key={item.value} selected={state.caseType === item.value} title={ko ? item.ko : item.en} body={ko ? item.koBody : item.body} onClick={() => setState((current) => ({ ...current, caseType: item.value }))} />)}
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">02 · {ko ? "부상·치료" : "Injury & treatment"}</div>
                  <h2 style={serifStyle(locale)} className={ko ? "mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.3]" : "editorial-serif mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]"}>{ko ? "부상이 삶에 얼마나 영향을 미쳤나요?" : "How serious was the injury and treatment?"}</h2>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {severities.map((item) => <Option key={item.value} selected={state.severity === item.value} title={ko ? item.ko : item.en} body={ko ? item.koBody : item.body} onClick={() => setState((current) => ({ ...current, severity: item.value }))} />)}
                  </div>
                  <div className="mt-10 border-t border-[#1E1C1A]/12 pt-6">
                    <div className="text-[12px] font-semibold">{ko ? "가장 높은 수준의 치료" : "Highest level of treatment"}</div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {treatments.map((item) => <Option key={item.value} selected={state.treatment === item.value} title={ko ? item.ko : item.en} onClick={() => setState((current) => ({ ...current, treatment: item.value }))} />)}
                    </div>
                  </div>
                  <label className="mt-7 flex cursor-pointer items-start gap-3 border-y border-[#1E1C1A]/12 py-5">
                    <input type="checkbox" checked={state.permanent} onChange={(event) => setState((current) => ({ ...current, permanent: event.target.checked }))} className="mt-0.5 h-4 w-4 accent-[#381907]" />
                    <span><span className="block text-[12px] font-semibold">{ko ? "장기적 또는 영구적인 영향이 예상됩니다" : "There may be long-term or permanent effects"}</span><span className="mt-1 block text-[10px] leading-5 text-[#1E1C1A]/45">{ko ? "예: 영구적 제한, 흉터, 장애 또는 장기 치료." : "For example: lasting limitations, scarring, disability, or substantial future care."}</span></span>
                  </label>
                </section>
              ) : null}

              {step === 3 ? (
                <section>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">03 · {ko ? "금전적 손실" : "Financial losses"}</div>
                  <h2 style={serifStyle(locale)} className={ko ? "mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.3]" : "editorial-serif mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]"}>{ko ? "확인할 수 있는 숫자부터 시작하세요." : "Start with the losses you can document."}</h2>
                  <p className="mt-4 max-w-[680px] text-[13px] leading-6 text-[#1E1C1A]/54">{ko ? "정확한 금액을 모르면 현재 알고 있는 합리적인 금액을 입력하세요. 나중에 다시 조정할 수 있습니다." : "If an amount is not final, use the best reasonable figure you have now. You can revise it before calculating."}</p>
                  <div className="mt-8 border-b border-[#1E1C1A]/12">
                    <MoneyInput label={ko ? "현재까지의 의료비" : "Medical bills to date"} hint={ko ? "응급실, 영상검사, 치료, 전문의 진료 등." : "ER, imaging, therapy, specialists, prescriptions and related care."} value={state.medical} onChange={(value) => updateMoney("medical", value)} />
                    <MoneyInput label={ko ? "예상 향후 의료비" : "Expected future medical care"} hint={ko ? "예정된 치료, 수술, 재활 또는 장기 관리." : "Expected treatment, procedures, rehabilitation or long-term care."} value={state.futureMedical} onChange={(value) => updateMoney("futureMedical", value)} />
                    <MoneyInput label={ko ? "현재까지의 임금 손실" : "Lost wages to date"} hint={ko ? "부상 때문에 일을 쉬면서 잃은 소득." : "Income already lost because the injury kept you from working."} value={state.lostWages} onChange={(value) => updateMoney("lostWages", value)} />
                    <MoneyInput label={ko ? "예상 향후 소득 손실" : "Future lost income / earning capacity"} hint={ko ? "향후 결근 또는 장기적인 소득 능력 감소." : "Expected future time off or reduced ability to earn."} value={state.futureIncome} onChange={(value) => updateMoney("futureIncome", value)} />
                    <MoneyInput label={ko ? "재산 피해" : "Property damage"} hint={ko ? "차량 수리 또는 기타 사고 관련 재산 손실." : "Vehicle repair or other incident-related property loss."} value={state.property} onChange={(value) => updateMoney("property", value)} />
                    <MoneyInput label={ko ? "기타 확인 가능한 비용" : "Other documented out-of-pocket costs"} hint={ko ? "교통, 보조기구 또는 기타 직접 비용." : "Transportation, equipment and other direct incident-related costs."} value={state.otherCosts} onChange={(value) => updateMoney("otherCosts", value)} />
                  </div>
                </section>
              ) : null}

              {step === 4 ? (
                <section>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">04 · {ko ? "과실·증거" : "Fault & evidence"}</div>
                  <h2 style={serifStyle(locale)} className={ko ? "mt-3 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.3]" : "editorial-serif mt-3 text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]"}>{ko ? "책임과 증거도 숫자를 바꿉니다." : "Fault can change the recovery substantially."}</h2>
                  <div className="mt-8 border-y border-[#1E1C1A]/12 py-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div><div className="text-[12px] font-semibold">{ko ? "본인의 과실 비율" : "Your estimated share of fault"}</div><p className="mt-1 max-w-[580px] text-[10px] leading-5 text-[#1E1C1A]/45">{ko ? "캘리포니아에서는 본인의 과실 비율만큼 손해액이 줄어들 수 있습니다." : "California comparative-fault rules can reduce damages by the percentage of responsibility attributed to the injured person."}</p></div>
                      <div className="editorial-serif text-[2.5rem] leading-none text-[#381907]">{state.fault}%</div>
                    </div>
                    <input type="range" min="0" max="100" step="5" value={state.fault} onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))} className="mt-6 w-full accent-[#381907]" aria-label={ko ? "본인의 과실 비율" : "Your estimated share of fault"} />
                    <div className="mt-2 flex justify-between text-[9px] text-[#1E1C1A]/34"><span>0% · {ko ? "과실 없음" : "none"}</span><span>100%</span></div>
                  </div>

                  <div className="mt-8">
                    <div className="text-[12px] font-semibold">{ko ? "현재 어떤 자료가 있나요?" : "What documentation do you already have?"}</div>
                    <p className="mt-1 text-[10px] leading-5 text-[#1E1C1A]/45">{ko ? "이 항목은 숫자를 자동으로 올리지는 않지만 결과 설명에 포함됩니다." : "These items do not automatically increase the arithmetic; they help explain how complete the claim record may be."}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {([
                        ["report", ko ? "경찰·사고 보고서" : "Police / incident report"],
                        ["photos", ko ? "사진·영상" : "Photos / video"],
                        ["witness", ko ? "목격자 정보" : "Witness information"],
                        ["medical", ko ? "의료 기록·진단서" : "Medical records / diagnosis"],
                      ] as Array<[EvidenceKey, string]>).map(([key, label]) => {
                        const selected = state.evidence.includes(key);
                        return <Option key={key} selected={selected} title={label} onClick={() => setState((current) => ({ ...current, evidence: selected ? current.evidence.filter((item) => item !== key) : [...current.evidence, key] }))} />;
                      })}
                    </div>
                  </div>
                </section>
              ) : null}

              {step === 5 && estimate ? (
                <section aria-live="polite">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">{ko ? "교육용 추정치" : "Educational estimate"}</div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#1E1C1A]/40">{selectedCase ? (ko ? selectedCase.ko : selectedCase.en) : ""} · California</p>
                  <h2 style={serifStyle(locale)} className={ko ? "mt-5 text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.25]" : "editorial-serif mt-5 text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]"}>{ko ? "예상 범위" : "Estimated range"}</h2>
                  <div className="mt-7 border-y border-[#1E1C1A]/12 py-7">
                    <div className="flex flex-wrap items-end justify-between gap-5">
                      <div className="editorial-serif text-[clamp(2.2rem,6vw,5.5rem)] leading-none tracking-[-0.04em] text-[#381907]">{money(estimate.low)} <span className="text-[#1E1C1A]/28">–</span> {money(estimate.high)}</div>
                      <div className="max-w-[280px] text-[10px] leading-5 text-[#1E1C1A]/45">{ko ? "변호사 비용, 사건 비용, 의료비 상환·유치권 및 보험 한도를 반영하기 전의 교육용 손해액 시나리오입니다." : "Illustrative damages scenario before attorney fees, case costs, medical reimbursement/liens, and insurance-policy limits."}</div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-0 border-y border-[#1E1C1A]/12 sm:grid-cols-3">
                    <div className="py-5 sm:pr-5"><div className="text-[9px] uppercase tracking-[0.14em] text-[#1E1C1A]/36">{ko ? "경제적 손실" : "Economic losses"}</div><div className="mt-3 text-[1.35rem] font-semibold">{money(estimate.economic)}</div></div>
                    <div className="border-t border-[#1E1C1A]/12 py-5 sm:border-l sm:border-t-0 sm:px-5"><div className="text-[9px] uppercase tracking-[0.14em] text-[#1E1C1A]/36">{ko ? "비경제적 손해 모델" : "Non-economic model"}</div><div className="mt-3 text-[1.05rem] font-semibold">{money(estimate.nonEconomicLow)} – {money(estimate.nonEconomicHigh)}</div></div>
                    <div className="border-t border-[#1E1C1A]/12 py-5 sm:border-l sm:border-t-0 sm:pl-5"><div className="text-[9px] uppercase tracking-[0.14em] text-[#1E1C1A]/36">{ko ? "과실 조정" : "Fault adjustment"}</div><div className="mt-3 text-[1.35rem] font-semibold">× {estimate.faultFactor.toFixed(2)}</div></div>
                  </div>

                  <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/40">{ko ? "이 범위에 영향을 준 요소" : "What moved this range"}</div>
                      <ul className="mt-4 divide-y divide-[#1E1C1A]/10 border-t border-[#1E1C1A]/10 text-[12px]">
                        <li className="py-3">{ko ? "입력한 의료비와 향후 치료비" : "Medical costs and projected future care you entered"}</li>
                        <li className="py-3">{ko ? "부상 정도와 가장 높은 치료 수준" : "Injury severity and highest level of treatment"}</li>
                        {state.permanent ? <li className="py-3">{ko ? "장기적·영구적 영향 가능성" : "Possible long-term or permanent effects"}</li> : null}
                        <li className="py-3">{ko ? `본인 과실 ${state.fault}% 가정` : `${state.fault}% estimated comparative fault`}</li>
                        {state.evidence.length ? <li className="py-3">{ko ? `현재 확인된 자료 ${state.evidence.length}종` : `${state.evidence.length} documentation categories already identified`}</li> : null}
                      </ul>
                    </div>
                    <div className="bg-[#F1EEE8] p-6">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/40">{ko ? "계산기가 알 수 없는 것" : "What the calculator cannot know"}</div>
                      <p className="mt-4 text-[12px] leading-6 text-[#1E1C1A]/60">{ko ? "보험 한도, 의료비 유치권, 인과관계 분쟁, 기존 부상, 증인의 신뢰도, 관할 법원, 실제 의료 기록과 협상·재판 전략은 사건 가치에 큰 영향을 줄 수 있습니다." : "Insurance limits, liens, causation disputes, pre-existing conditions, witness credibility, venue, the actual medical record, and negotiation or trial strategy can materially change case value."}</p>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-6 border-t border-[#1E1C1A]/12 pt-7 md:grid-cols-[1fr_auto] md:items-end">
                    <div><div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">{ko ? "다음 단계" : "Next step"}</div><h3 style={serifStyle(locale)} className={ko ? "mt-3 text-[1.7rem] font-medium" : "editorial-serif mt-3 text-[2.25rem] leading-tight"}>{ko ? "Howard에게 이 추정치를 검토받으세요." : "Have Howard review what the calculator cannot."}</h3><p className="mt-3 max-w-[620px] text-[11px] leading-5 text-[#1E1C1A]/48">{ko ? "상담 요청 시 계산기 결과를 제출할 필요는 없습니다. 사건의 실제 사실을 바탕으로 별도로 검토합니다." : "You do not need to submit the calculator inputs. A consultation can review the actual facts independently."}</p></div>
                    <a href={`${localePrefix(locale)}/contact`} className="inline-flex h-12 items-center justify-center gap-3 bg-[#381907] px-6 text-[11px] font-semibold text-white transition-opacity hover:opacity-90">{ko ? "상담 요청" : "Request a consultation"}<ArrowRight className="h-4 w-4" /></a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button type="button" onClick={() => setStep(4)} className="inline-flex h-10 items-center gap-2 border border-[#1E1C1A]/14 px-4 text-[10px] font-semibold"><ArrowLeft className="h-3.5 w-3.5" />{ko ? "입력 수정" : "Refine estimate"}</button>
                    <button type="button" onClick={reset} className="inline-flex h-10 items-center gap-2 px-2 text-[10px] font-semibold text-[#1E1C1A]/52"><RotateCcw className="h-3.5 w-3.5" />{copy.restart}</button>
                  </div>
                </section>
              ) : null}

              {error ? <div role="alert" className="mt-6 border-l-2 border-[#381907] bg-[#F1EEE8] px-4 py-3 text-[11px] leading-5 text-[#381907]">{error}</div> : null}

              {step < 5 ? (
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E1C1A]/12 pt-6">
                  <button type="button" onClick={() => { setError(""); setStep((current) => Math.max(1, current - 1)); }} disabled={step === 1} className="inline-flex h-11 items-center gap-2 px-2 text-[10px] font-semibold text-[#1E1C1A]/52 disabled:cursor-not-allowed disabled:opacity-25"><ArrowLeft className="h-3.5 w-3.5" />{copy.back}</button>
                  {step < 4 ? <button type="button" onClick={next} className="inline-flex h-11 items-center gap-3 bg-[#1E1C1A] px-6 text-[10px] font-semibold text-white">{copy.next}<ArrowRight className="h-3.5 w-3.5" /></button> : <button type="button" onClick={calculate} className="inline-flex h-11 items-center gap-3 bg-[#381907] px-6 text-[10px] font-semibold text-white">{copy.calculate}<ArrowRight className="h-3.5 w-3.5" /></button>}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="border-t border-[#1E1C1A]/10 bg-[#F1EEE8]">
          <div className="site-shell grid gap-10 py-12 md:grid-cols-[0.7fr_1.3fr] md:py-16">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/38">{ko ? "계산 방식" : "How the estimate works"}</div>
            <div>
              <h2 style={serifStyle(locale)} className={ko ? "text-[1.8rem] font-medium leading-[1.35]" : "editorial-serif text-[clamp(2rem,3.5vw,3.6rem)] leading-[1.04] tracking-[-0.03em]"}>{ko ? "하나의 확정 숫자보다, 가정을 보여주는 범위가 더 정직합니다." : "A range with visible assumptions is more useful than a fake exact number."}</h2>
              <div className="mt-8 grid gap-7 text-[12px] leading-6 text-[#1E1C1A]/58 md:grid-cols-2">
                <p>{ko ? "계산기는 입력한 경제적 손실을 더한 뒤, 의료비에 부상 정도와 치료 수준을 반영한 교육용 범위를 적용합니다. 이후 캘리포니아 비교과실 가정에 따라 결과를 조정합니다." : "The estimator adds the economic losses you enter, models a range for non-economic harm from medical costs plus injury/treatment severity, then applies the comparative-fault percentage you choose."}</p>
                <p>{ko ? "실제 사건 가치는 공식으로 정해지지 않습니다. 보험 적용 범위, 증거, 법적 책임, 의료 기록, 향후 손실 및 사건의 구체적인 사실이 결과를 바꿀 수 있습니다." : "Real case value is not determined by a formula. Coverage, evidence, liability, medical documentation, future losses, and the specific facts can move the outcome substantially."}</p>
              </div>
              <div className="mt-8 border-t border-[#1E1C1A]/12 pt-5 text-[10px] leading-5 text-[#1E1C1A]/42">{ko ? `교육용 정보이며 법률 자문이 아닙니다. 계산기 사용은 변호사-의뢰인 관계를 만들지 않습니다. 사건 검토: ${brand.phoneDisplay}.` : `For educational information only; not legal advice. Using the calculator does not create an attorney-client relationship. For an individual review, call ${brand.phoneDisplay}.`}</div>
            </div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
