import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Info, Mail, RotateCcw } from "lucide-react";
import { type SiteLocale } from "@/data/injurySite";
import { EditorialFrame, isKo } from "@/pages/editorial/shared";

type CaseType = "car" | "truck" | "motorcycle" | "pedestrian" | "rideshare" | "premises" | "other";
type Severity = "minor" | "moderate" | "serious" | "catastrophic";
type Treatment = "limited" | "er" | "therapy" | "injections" | "surgery";

type CalculatorState = {
  caseType: CaseType | "";
  severity: Severity | "";
  treatment: Treatment | "";
  medical: number;
  lostWages: number;
  futureMedical: number;
  futureIncome: number;
  property: number;
  fault: number;
  permanent: boolean;
};

const initialState: CalculatorState = {
  caseType: "",
  severity: "",
  treatment: "",
  medical: 0,
  lostWages: 0,
  futureMedical: 0,
  futureIncome: 0,
  property: 0,
  fault: 0,
  permanent: false,
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
  return Math.min(parsed, 5_000_000);
};

const ChoiceButton = ({ selected, title, detail, onClick }: { selected: boolean; title: string; detail?: string; onClick: () => void }) => (
  <button type="button" onClick={onClick} className={`flex min-h-[66px] w-full items-center justify-between gap-5 border px-4 py-3 text-left transition-colors ${selected ? "border-[#171717] bg-[#171717] text-white" : "border-black/12 bg-white hover:border-black/35"}`}>
    <span>
      <span className="block text-[14px] font-semibold">{title}</span>
      {detail ? <span className={`mt-1 block text-[11px] leading-4 ${selected ? "text-white/58" : "text-black/46"}`}>{detail}</span> : null}
    </span>
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-white bg-white text-black" : "border-black/20"}`}>{selected ? <Check className="h-3 w-3" /> : null}</span>
  </button>
);

export const CaseValueCalculatorPage = ({ locale }: { locale: SiteLocale }) => {
  const ko = isKo(locale);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CalculatorState>(initialState);
  const [review, setReview] = useState({ full_name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 10;
  const resultStep = step >= totalSteps;

  const caseTypes: Array<{ value: CaseType; en: string; ko: string }> = [
    { value: "car", en: "Car accident", ko: "자동차 사고" },
    { value: "truck", en: "Truck accident", ko: "트럭 사고" },
    { value: "motorcycle", en: "Motorcycle accident", ko: "오토바이 사고" },
    { value: "pedestrian", en: "Pedestrian accident", ko: "보행자 사고" },
    { value: "rideshare", en: "Uber / Lyft accident", ko: "우버·리프트 사고" },
    { value: "premises", en: "Slip, fall or unsafe property", ko: "낙상·시설 사고" },
    { value: "other", en: "Another injury claim", ko: "기타 상해 사건" },
  ];

  const severities: Array<{ value: Severity; en: string; ko: string; enDetail: string; koDetail: string }> = [
    { value: "minor", en: "Minor", ko: "경미", enDetail: "Short recovery, limited interruption", koDetail: "짧은 회복, 제한적 영향" },
    { value: "moderate", en: "Moderate", ko: "중간", enDetail: "Ongoing symptoms or treatment", koDetail: "지속적인 증상 또는 치료" },
    { value: "serious", en: "Serious", ko: "중상", enDetail: "Fracture, surgery risk, or long recovery", koDetail: "골절, 수술 가능성 또는 장기 회복" },
    { value: "catastrophic", en: "Catastrophic / permanent", ko: "중대·영구", enDetail: "Life-changing or permanent impact", koDetail: "삶을 바꾸는 영구적 영향" },
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
    return { economic, nonEconomicLow, nonEconomicHigh, faultFactor, low: Math.max(0, low), high: Math.max(low, high) };
  }, [state]);

  const buildSummary = () => {
    if (!estimate) return "";
    const caseLabel = caseTypes.find((item) => item.value === state.caseType);
    const severityLabel = severities.find((item) => item.value === state.severity);
    const treatmentLabel = treatments.find((item) => item.value === state.treatment);
    return (ko ? [
      `계산기 예상 범위: ${money(estimate.low)} – ${money(estimate.high)}`,
      `사건: ${caseLabel?.ko || "미선택"}`,
      `부상: ${severityLabel?.ko || "미선택"}`,
      `치료: ${treatmentLabel?.ko || "미선택"}`,
      `현재 의료비: ${money(state.medical)}`,
      `임금 손실: ${money(state.lostWages)}`,
      `향후 치료비: ${money(state.futureMedical)}`,
      `향후 소득 손실: ${money(state.futureIncome)}`,
      `재산 피해: ${money(state.property)}`,
      `본인 과실: ${state.fault}%`,
      `장기적 영향: ${state.permanent ? "예" : "아니오"}`,
      "",
      "이 계산 결과에 대해 전문가의 의견을 받고 싶습니다.",
    ] : [
      `Calculator estimate: ${money(estimate.low)} – ${money(estimate.high)}`,
      `Incident: ${caseLabel?.en || "Not selected"}`,
      `Injury: ${severityLabel?.en || "Not selected"}`,
      `Treatment: ${treatmentLabel?.en || "Not selected"}`,
      `Medical bills: ${money(state.medical)}`,
      `Lost wages: ${money(state.lostWages)}`,
      `Future medical care: ${money(state.futureMedical)}`,
      `Future income loss: ${money(state.futureIncome)}`,
      `Property damage: ${money(state.property)}`,
      `Estimated fault: ${state.fault}%`,
      `Long-term effects: ${state.permanent ? "Yes" : "No"}`,
      "",
      "I would like an expert opinion on this estimate.",
    ]).join("\n");
  };

  const moveNext = () => {
    const next = Math.min(totalSteps, step + 1);
    setStep(next);
    if (next === totalSteps) setReview((current) => ({ ...current, message: buildSummary() }));
  };

  const reset = () => {
    setState(initialState);
    setStep(0);
    setReview({ full_name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const requestReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!estimate || isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => window.location.assign(ko ? "/ko/thank-you" : "/thank-you"), 1600);
  };

  const progress = resultStep ? 100 : ((step + 1) / totalSteps) * 100;

  const NumberQuestion = ({ title, hint, value, setter }: { title: string; hint: string; value: number; setter: (value: number) => void }) => (
    <div>
      <h2 className="editorial-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.035em]">{title}</h2>
      <p className="mt-4 text-[13px] leading-6 text-black/48">{hint}</p>
      <div className="mt-8 flex h-16 items-center border-b-2 border-black/18 focus-within:border-black">
        <span className="mr-3 text-[1.7rem] text-black/32">$</span>
        <input type="number" min="0" step="100" inputMode="decimal" value={value || ""} onChange={(event) => setter(clampMoney(event.target.value))} placeholder="0" autoFocus className="w-full bg-transparent text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.04em] outline-none placeholder:text-black/16" />
      </div>
    </div>
  );

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#f4f2ed] pt-24 text-[#171717] md:pt-28">
        <section className="site-shell flex min-h-[calc(100svh-7rem)] items-center py-10 md:py-14">
          <div className="mx-auto w-full max-w-[980px] overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.07)]">
            <div className="h-1.5 bg-black/8"><div className="h-full bg-[#171717] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>

            <div className="flex min-h-[620px] flex-col">
              <div className="flex items-center justify-between border-b border-black/8 px-5 py-4 md:px-8">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/38">{ko ? "무료 사건 가치 계산기" : "Free case value estimate"}</div>
                  <div className="mt-1 text-[11px] text-black/54">{resultStep ? (ko ? "결과" : "Your estimate") : `${step + 1} / ${totalSteps}`}</div>
                </div>
                <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-[10px] font-semibold text-black/42 hover:text-black"><RotateCcw className="h-3.5 w-3.5" />{ko ? "다시 시작" : "Start over"}</button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 md:p-10 lg:p-12">
                {!resultStep ? (
                  <>
                    <div className="mx-auto w-full max-w-[720px]">
                      {step === 0 && <div><h1 className="editorial-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">{ko ? "어떤 사고가 있었나요?" : "What happened?"}</h1><p className="mt-4 text-[13px] leading-6 text-black/48">{ko ? "가장 가까운 사고 유형을 선택하세요." : "Choose the option closest to your situation."}</p><div className="mt-8 grid gap-2 sm:grid-cols-2">{caseTypes.map((item) => <ChoiceButton key={item.value} selected={state.caseType === item.value} title={ko ? item.ko : item.en} onClick={() => setState((current) => ({ ...current, caseType: item.value }))} />)}</div></div>}

                      {step === 1 && <div><h2 className="editorial-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">{ko ? "부상이 일상에 얼마나 영향을 주고 있나요?" : "How serious is the injury?"}</h2><p className="mt-4 text-[13px] leading-6 text-black/48">{ko ? "완벽한 분류일 필요는 없습니다." : "A rough answer is enough for this estimate."}</p><div className="mt-8 grid gap-2">{severities.map((item) => <ChoiceButton key={item.value} selected={state.severity === item.value} title={ko ? item.ko : item.en} detail={ko ? item.koDetail : item.enDetail} onClick={() => setState((current) => ({ ...current, severity: item.value }))} />)}</div></div>}

                      {step === 2 && <div><h2 className="editorial-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">{ko ? "지금까지 받은 가장 높은 수준의 치료는 무엇인가요?" : "What is the highest level of treatment so far?"}</h2><div className="mt-8 grid gap-2">{treatments.map((item) => <ChoiceButton key={item.value} selected={state.treatment === item.value} title={ko ? item.ko : item.en} onClick={() => setState((current) => ({ ...current, treatment: item.value }))} />)}</div></div>}

                      {step === 3 && <NumberQuestion title={ko ? "현재까지 의료비는 얼마나 발생했나요?" : "How much are the medical bills so far?"} hint={ko ? "대략적인 금액이어도 괜찮습니다." : "An approximate total is fine. Enter 0 if you do not know yet."} value={state.medical} setter={(value) => setState((current) => ({ ...current, medical: value }))} />}
                      {step === 4 && <NumberQuestion title={ko ? "지금까지 잃은 임금이나 소득은 얼마인가요?" : "How much income have you lost so far?"} hint={ko ? "결근, 근무시간 감소 또는 자영업 손실을 포함할 수 있습니다." : "Include missed work, reduced hours, or business income you can reasonably estimate."} value={state.lostWages} setter={(value) => setState((current) => ({ ...current, lostWages: value }))} />}
                      {step === 5 && <NumberQuestion title={ko ? "앞으로 예상되는 치료비가 있나요?" : "How much future medical care do you expect?"} hint={ko ? "추가 치료가 예상되지 않으면 0으로 두세요." : "Use 0 if no additional care is expected or you do not know yet."} value={state.futureMedical} setter={(value) => setState((current) => ({ ...current, futureMedical: value }))} />}
                      {step === 6 && <NumberQuestion title={ko ? "앞으로 예상되는 소득 손실이 있나요?" : "How much future income loss do you expect?"} hint={ko ? "추가적인 업무 손실이 없다면 0으로 두세요." : "Use 0 if you do not expect additional time away from work."} value={state.futureIncome} setter={(value) => setState((current) => ({ ...current, futureIncome: value }))} />}
                      {step === 7 && <NumberQuestion title={ko ? "재산 피해는 얼마나 되나요?" : "How much property damage is involved?"} hint={ko ? "차량 또는 기타 재산 피해가 없다면 0으로 두세요." : "Vehicle or other property loss. Use 0 if it does not apply."} value={state.property} setter={(value) => setState((current) => ({ ...current, property: value }))} />}

                      {step === 8 && <div><h2 className="editorial-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">{ko ? "본인에게 어느 정도 과실이 있다고 생각하나요?" : "What share of fault might be yours?"}</h2><p className="mt-4 text-[13px] leading-6 text-black/48">{ko ? "확실하지 않다면 0%로 두세요." : "If you are unsure, leave this at 0%. This only illustrates comparative fault."}</p><div className="mt-12"><div className="mb-5 text-[clamp(3rem,8vw,6rem)] font-medium tracking-[-0.06em]">{state.fault}%</div><input type="range" min="0" max="100" step="5" value={state.fault} onChange={(event) => setState((current) => ({ ...current, fault: Number(event.target.value) }))} className="w-full accent-[#171717]" /><div className="mt-3 flex justify-between text-[10px] text-black/35"><span>0%</span><span>50%</span><span>100%</span></div></div></div>}

                      {step === 9 && <div><h2 className="editorial-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">{ko ? "장기적 또는 영구적인 영향이 예상되나요?" : "Are long-term or permanent effects expected?"}</h2><p className="mt-4 text-[13px] leading-6 text-black/48">{ko ? "흉터, 장애 또는 지속적인 기능 제한 등을 포함합니다." : "This can include scarring, disability, or lasting physical limitations."}</p><div className="mt-8 grid gap-2 sm:grid-cols-2"><ChoiceButton selected={state.permanent} title={ko ? "예" : "Yes"} onClick={() => setState((current) => ({ ...current, permanent: true }))} /><ChoiceButton selected={!state.permanent} title={ko ? "아니오" : "No"} onClick={() => setState((current) => ({ ...current, permanent: false }))} /></div></div>}
                    </div>

                    <div className="mx-auto mt-10 flex w-full max-w-[720px] items-center justify-between border-t border-black/8 pt-5">
                      <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold disabled:opacity-25"><ArrowLeft className="h-4 w-4" />{ko ? "이전" : "Back"}</button>
                      <button type="button" onClick={moveNext} disabled={(step === 0 && !state.caseType) || (step === 1 && !state.severity) || (step === 2 && !state.treatment)} className="inline-flex min-h-11 items-center gap-3 bg-[#171717] px-5 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30">{step === totalSteps - 1 ? (ko ? "결과 보기" : "See my estimate") : (ko ? "계속" : "Continue")}<ArrowRight className="h-4 w-4" /></button>
                    </div>
                  </>
                ) : estimate ? (
                  <div className="mx-auto grid w-full max-w-[820px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/38">{ko ? "교육용 예상 범위" : "Educational estimate"}</div>
                      <div className="editorial-serif mt-5 text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.055em]">{money(estimate.low)}<br /><span className="text-black/28">to</span><br />{money(estimate.high)}</div>
                      <p className="mt-6 max-w-[470px] text-[12px] leading-6 text-black/50">{ko ? "입력한 정보만을 이용한 교육용 범위입니다. 실제 사건 가치에 대한 법률 의견이나 보장이 아닙니다." : "This is an educational range based only on the information you entered. It is not legal advice, a settlement offer, or a prediction of actual case value."}</p>
                      <div className="mt-7 space-y-2 border-y border-black/10 py-4 text-[11px]">
                        <div className="flex justify-between gap-5"><span className="text-black/45">{ko ? "경제적 손실" : "Economic losses"}</span><strong>{money(estimate.economic)}</strong></div>
                        <div className="flex justify-between gap-5"><span className="text-black/45">{ko ? "비경제적 모델" : "Non-economic model"}</span><strong>{money(estimate.nonEconomicLow)} – {money(estimate.nonEconomicHigh)}</strong></div>
                        <div className="flex justify-between gap-5"><span className="text-black/45">{ko ? "과실 조정" : "Fault adjustment"}</span><strong>× {estimate.faultFactor.toFixed(2)}</strong></div>
                      </div>
                      <div className="mt-5 flex gap-2 text-[10px] leading-5 text-black/42"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>{ko ? "보험 한도, 유치권, 인과관계, 증거의 질, 관할, 협상 상황 등은 이 계산기로 완전히 반영할 수 없습니다." : "Policy limits, liens, causation, evidence quality, venue, collectability, and negotiation posture are not fully captured by a formula."}</span></div>
                    </div>

                    <div className="border-t border-black/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                      <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4" /><div><h2 className="text-[15px] font-semibold">{ko ? "전문가 의견 받기" : "Want a human review?"}</h2><p className="mt-2 text-[11px] leading-5 text-black/48">{ko ? "계산 요약과 연락처를 보내면 팀이 검토할 수 있습니다." : "Send the calculator summary with your contact details for a closer review."}</p></div></div>
                      <form id="case-calculater" name="Case Calculater" data-form-name="Case Calculater" onSubmit={requestReview} className="mt-6 grid gap-3">
                        <input name="full_name" value={review.full_name} onChange={(event) => setReview((current) => ({ ...current, full_name: event.target.value }))} required autoComplete="name" placeholder={ko ? "성명" : "Full name"} className="h-11 border border-black/12 bg-white px-3 text-[12px] outline-none focus:border-black/45" />
                        <input name="email" type="email" value={review.email} onChange={(event) => setReview((current) => ({ ...current, email: event.target.value }))} required autoComplete="email" placeholder={ko ? "이메일" : "Email"} className="h-11 border border-black/12 bg-white px-3 text-[12px] outline-none focus:border-black/45" />
                        <textarea name="message" value={review.message} onChange={(event) => setReview((current) => ({ ...current, message: event.target.value }))} required rows={7} className="border border-black/12 bg-white p-3 text-[10px] leading-5 outline-none focus:border-black/45" />
                        <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 items-center justify-between bg-[#171717] px-4 text-[11px] font-semibold text-white disabled:opacity-50"><span>{isSubmitting ? (ko ? "전송 중..." : "Sending...") : (ko ? "검토 요청" : "Request review")}</span><ArrowRight className="h-4 w-4" /></button>
                        <p className="text-[9px] leading-4 text-black/35">{ko ? "제출은 변호사-의뢰인 관계를 형성하지 않습니다. 기밀 또는 긴급한 정보를 보내지 마세요." : "Submitting does not create an attorney-client relationship. Do not send confidential or time-sensitive information."}</p>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-white py-14 md:py-20">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/38">{ko ? "계산 방식" : "How it works"}</div><h2 className="editorial-serif mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[0.98] tracking-[-0.035em]">{ko ? "복잡한 사건을 단순한 공식으로 약속하지 않습니다." : "A useful starting point, not a promise."}</h2></div>
            <div className="grid border-t border-black/10 sm:grid-cols-3">
              {[
                ["01", ko ? "실제 손실" : "Documented losses", ko ? "의료비, 임금 손실 및 향후 비용." : "Medical costs, wage loss, future care, and other economic losses."],
                ["02", ko ? "부상과 치료" : "Injury + treatment", ko ? "부상 정도와 치료 수준을 넓은 교육용 범위에 반영합니다." : "Severity and treatment are used to model a broad educational non-economic range."],
                ["03", ko ? "비교 과실" : "Comparative fault", ko ? "입력한 과실 비율로 공유 책임의 영향을 보여줍니다." : "Your estimated share of fault illustrates how shared responsibility can affect recovery."],
              ].map(([number, title, body]) => <div key={number} className="border-b border-black/10 py-5 sm:border-l sm:px-5 sm:first:border-l-0"><div className="text-[9px] text-black/35">{number}</div><h3 className="mt-5 text-[14px] font-semibold">{title}</h3><p className="mt-3 text-[11px] leading-5 text-black/46">{body}</p></div>)}
            </div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};
