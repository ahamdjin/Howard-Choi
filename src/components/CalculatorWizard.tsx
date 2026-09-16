import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ClipboardList, DollarSign, ShieldCheck } from "lucide-react";
import type { CalculatorState } from "@/pages/CaseValueCalculator";

type Choice = { value: string; en: string; ko: string };
type MoneyKey = "medical" | "lostWages" | "futureMedical" | "futureIncome" | "property";
type Props = {
  ko: boolean;
  active: boolean;
  value: CalculatorState;
  onChange: (update: Partial<CalculatorState>) => void;
  onCalculate: () => void;
  error: string;
  caseTypes: Choice[];
  severities: Choice[];
  treatments: Choice[];
};

export default function CalculatorWizard({ ko, active, value, onChange, onCalculate, error, caseTypes, severities, treatments }: Props) {
  const [step, setStep] = useState(0);
  const [editing, setEditing] = useState(false);
  const [permanentAnswered, setPermanentAnswered] = useState(false);
  const [validation, setValidation] = useState("");
  const [amounts, setAmounts] = useState<Record<MoneyKey, string>>({ medical: "", lostWages: "", futureMedical: "", futureIncome: "", property: "" });
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const reducedMotion = useReducedMotion();
  const steps = [
    { key: "caseType", title: ko ? "어떤 사고를 겪으셨나요?" : "What kind of accident happened?", hint: ko ? "가장 가까운 항목 하나를 선택하세요." : "Choose the closest match.", options: caseTypes },
    { key: "severity", title: ko ? "부상은 일상에 어떤 영향을 주나요?" : "How has the injury affected you?", hint: ko ? "현재 회복 상태에 가장 가까운 항목을 선택하세요." : "Choose the description closest to your recovery.", options: severities },
    { key: "treatment", title: ko ? "어떤 치료를 받으셨나요?" : "What treatment have you received?", hint: ko ? "지금까지 받은 치료 중 가장 높은 수준을 선택하세요." : "Select the highest level of care received so far.", options: treatments },
    { key: "permanent", title: ko ? "장기적인 영향이 있나요?" : "Are there lasting effects?", hint: ko ? "흉터, 장애 또는 지속적인 기능 제한 등이 해당됩니다." : "For example, scarring, disability, or lasting limitations.", options: [{ value: "yes", en: "Yes", ko: "예" }, { value: "no", en: "No", ko: "아니오" }] },
    { key: "medical", title: ko ? "현재까지 의료비는 얼마인가요?" : "What are your medical costs so far?", hint: ko ? "현재까지 발생한 치료비를 입력하세요." : "Include treatment costs already incurred." },
    { key: "lostWages", title: ko ? "이미 잃은 소득은 얼마인가요?" : "How much income have you already lost?", hint: ko ? "부상으로 인해 받지 못한 임금을 입력하세요." : "Include wages missed because of the injury." },
    { key: "futureMedical", title: ko ? "향후 치료비는 얼마로 예상되나요?" : "What future treatment costs do you expect?", hint: ko ? "예상 수술, 재활 또는 지속적인 치료비입니다." : "For expected surgery, rehabilitation, or ongoing care." },
    { key: "futureIncome", title: ko ? "향후 소득 손실은 얼마로 예상되나요?" : "What future income loss do you expect?", hint: ko ? "예상 결근 또는 근로 능력 감소로 인한 손실입니다." : "For future time off work or reduced earning capacity." },
    { key: "property", title: ko ? "재산 피해는 얼마인가요?" : "What was the cost of property damage?", hint: ko ? "차량 또는 기타 재산 피해를 입력하세요." : "Include damage to your vehicle or other property." },
    { key: "fault", title: ko ? "본인의 예상 과실 비율은 얼마인가요?" : "What share of fault are you assuming?", hint: ko ? "계산에 사용할 가정이며 법적 판단이 아닙니다. 기본값은 0%입니다." : "This is a calculation assumption, not a legal finding. The default is 0%." },
  ];
  const current = steps[step];
  const reviewing = step === steps.length;
  const monetary = !reviewing && !current.options && current.key !== "fault";
  const selected = current?.key === "permanent" ? (permanentAnswered ? (value.permanent ? "yes" : "no") : "") : value[current?.key as keyof CalculatorState];

  useEffect(() => {
    if (!active || !interacted.current) return;
    heading.current?.focus({ preventScroll: true });
    const bounds = heading.current?.getBoundingClientRect();
    if (bounds && (bounds.top < 80 || bounds.bottom > window.innerHeight)) {
      heading.current?.closest(".calculator-wizard")?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
    }
  }, [step, active, reducedMotion]);

  const goTo = (next: number) => {
    interacted.current = true;
    setValidation("");
    setStep(next);
  };
  const next = () => {
    if (current.options && !selected) {
      setValidation(ko ? "계속하려면 답변을 선택하세요." : "Choose an answer to continue.");
      return;
    }
    if (monetary) {
      const key = current.key as MoneyKey;
      const raw = amounts[key].trim().replace(/,/g, "");
      const amount = Number(raw);
      if (raw && (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(raw) || !Number.isFinite(amount) || amount > 5_000_000)) {
        setValidation(ko ? "$0~$5,000,000 사이의 금액을 입력하세요 (소수점 이하 두 자리까지)." : "Enter $0–$5,000,000, with no more than two decimal places.");
        return;
      }
      onChange({ [key]: amount });
    }
    goTo(editing ? steps.length : step + 1);
    setEditing(false);
  };
  const displayAnswer = (item: typeof steps[number]) => {
    if (item.key === "permanent") return value.permanent ? (ko ? "예" : "Yes") : (ko ? "아니오" : "No");
    if (item.key === "fault") return `${value.fault}%`;
    if (item.options) { const option = item.options.find((o) => o.value === value[item.key as keyof CalculatorState]); return option ? (ko ? option.ko : option.en) : "—"; }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value[item.key as MoneyKey]);
  };

  return (
    <div id="calculator-steps" className="calculator-wizard scroll-mt-20" hidden={!active}>
      <div className="mb-7 flex items-center justify-between gap-4 text-sm font-semibold text-[#6E635A]">
        <span>{reviewing ? (ko ? "답변 검토" : "Review your answers") : (ko ? `${steps.length}개 중 ${step + 1}번째 질문` : `Question ${step + 1} of ${steps.length}`)}</span>
        <span>{Math.round(step / steps.length * 100)}%</span>
      </div>
      <div role="progressbar" aria-label={ko ? "계산 진행률" : "Calculator progress"} aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={step} className="mb-8 h-1 overflow-hidden rounded-full bg-[#211E1B]/10">
        <motion.div className="h-full bg-[#6E635A]" animate={{ width: `${step / steps.length * 100}%` }} transition={{ duration: reducedMotion ? 0 : 0.25 }} />
      </div>
      <motion.div key={step} initial={step === 0 || reducedMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
        <h2 ref={heading} tabIndex={-1} id="calculator-question" className="scroll-mt-24 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tight outline-none">{reviewing ? (ko ? "계산 전에 확인하세요." : "Everything look right?") : current.title}</h2>
        <p id="calculator-hint" className="mt-3 text-base leading-relaxed text-[#211E1B]/70">{reviewing ? (ko ? "답변을 수정하거나 교육용 예상 범위를 확인하세요." : "Edit any answer, or continue to your educational estimate.") : current.hint}</p>
        <div className="mt-7 min-h-[280px]">
          {reviewing ? (
            <dl className="divide-y divide-[#211E1B]/10">
              {steps.map((item, index) => <div key={item.key} className="flex items-center justify-between gap-4 py-4"><div className="min-w-0"><dt className="text-sm text-[#211E1B]/65">{item.title}</dt><dd className="mt-1 text-base font-semibold">{displayAnswer(item)}</dd></div><button type="button" className="min-h-11 shrink-0 px-2 text-sm underline underline-offset-4" aria-label={`${ko ? "수정" : "Edit"}: ${item.title}`} onClick={() => { setEditing(true); goTo(index); }}>{ko ? "수정" : "Edit"}</button></div>)}
            </dl>
          ) : current.options ? (
            <fieldset aria-labelledby="calculator-question" aria-describedby="calculator-hint" className="grid gap-3 sm:grid-cols-2">
              {current.options.map((option) => <label key={option.value} className={`flex min-h-[64px] cursor-pointer items-center gap-3 rounded border px-4 py-3 transition-colors ${selected === option.value ? "border-[#6E635A] bg-[#F3F0EA]" : "border-[#211E1B]/20 bg-white hover:border-[#6E635A]"}`}>
                <input type="radio" name={`calculator-${current.key}`} value={option.value} checked={selected === option.value} onChange={() => { setValidation(""); if (current.key === "permanent") { setPermanentAnswered(true); onChange({ permanent: option.value === "yes" }); } else { onChange({ [current.key]: option.value }); } }} className="h-4 w-4 shrink-0 accent-[#6E635A]" />
                <span className="text-base font-medium leading-snug">{ko ? option.ko : option.en}</span>
                {selected === option.value ? <Check aria-hidden="true" className="ml-auto h-4 w-4 shrink-0" /> : null}
              </label>)}
            </fieldset>
          ) : monetary ? (
            <div className="max-w-[480px]">
              <div className="flex items-center gap-3 border-b-2 border-[#6E635A] py-4 focus-within:border-[#211E1B]">
                <DollarSign aria-hidden="true" className="h-7 w-7 shrink-0 text-[#6E635A]" />
                <input type="text" inputMode="decimal" autoComplete="off" aria-labelledby="calculator-question" aria-describedby="calculator-hint calculator-money-note" aria-invalid={Boolean(validation)} value={amounts[current.key as MoneyKey]} onChange={(event) => { setAmounts((previous) => ({ ...previous, [current.key]: event.target.value })); setValidation(""); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); next(); } }} placeholder="0" className="min-w-0 w-full bg-transparent text-3xl font-semibold tabular-nums outline-none" />
              </div>
              <p id="calculator-money-note" className="mt-4 text-sm leading-relaxed text-[#211E1B]/65">{ko ? "미국 달러 기준입니다. 해당하지 않으면 빈칸으로 두세요. 빈칸은 $0로 계산됩니다." : "In US dollars. Leave blank if it does not apply. Blank amounts count as $0."}</p>
            </div>
          ) : (
            <div className="max-w-[480px] py-3">
              <output htmlFor="calculator-fault" className="block text-5xl font-semibold tabular-nums">{value.fault}%</output>
              <input id="calculator-fault" aria-labelledby="calculator-question" aria-describedby="calculator-hint" type="range" min={0} max={100} step={5} value={value.fault} onChange={(event) => onChange({ fault: Number(event.target.value) })} className="mt-7 h-11 w-full accent-[#6E635A]" />
              <div aria-hidden="true" className="flex justify-between text-sm text-[#211E1B]/65"><span>0%</span><span>50%</span><span>100%</span></div>
            </div>
          )}
        </div>
      </motion.div>
      {validation || error ? <p role="alert" className="mt-5 rounded bg-[#F4ECE7] p-4 text-sm text-[#7B4435]">{validation || error}</p> : null}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#211E1B]/10 pt-6">
        <button type="button" disabled={step === 0 && !editing} onClick={() => { goTo(editing ? steps.length : step - 1); setEditing(false); }} className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold disabled:opacity-35"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{ko ? "뒤로" : "Back"}</button>
        <button type="button" onClick={reviewing ? onCalculate : next} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#211E1B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#514235]">{reviewing ? (ko ? "결과 보기" : "See my result") : editing ? (ko ? "답변 저장" : "Save answer") : (ko ? "계속" : "Continue")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </div>
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-[#211E1B]/65">{reviewing ? <ClipboardList aria-hidden="true" className="h-4 w-4 shrink-0" /> : <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />}{ko ? "결과 확인에 이름이나 이메일은 필요하지 않습니다." : "No name or email needed to see your result."}</p>
    </div>
  );
}
