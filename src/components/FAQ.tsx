import { m as motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRef } from "react";
import type { SiteLocale } from "@/data/injurySite";

type FAQProps = {
  locale?: SiteLocale;
};

const faqCopy = {
  en: {
    eyebrow: "After an accident",
    title: "Useful answers before your first call.",
    body: "The questions people usually need answered first after a serious accident in California.",
    questions: [
      ["How much does an accident lawyer cost?", "Personal injury cases are generally handled on a contingency fee, which means there is no lawyer fee unless there is a recovery. You are not paying an hourly rate while the case is open, and the first consultation is free. The specific percentage, and how case costs are handled, are set out in a written fee agreement before any work begins."],
      ["Do you offer free consultations?", "Yes. The first conversation is free and there is no obligation to hire the firm afterward. Bring whatever you already have: the accident date and location, photos, a report number, insurance letters. You can get your questions answered before deciding anything.", "consultation"],
      ["What does a contingency fee mean?", "It means the lawyer fee is a percentage of what is actually recovered, and it is only owed if the case recovers something. If the claim does not result in a recovery, you do not owe a lawyer fee. Case costs, such as obtaining records or filing fees, are handled separately and explained in the written agreement."],
      ["How long do I have to file a personal injury lawsuit in California?", "California generally gives an injured person two years from the date of injury to file a personal injury lawsuit, but exceptions exist and claims involving a public entity can have much shorter notice deadlines. The correct deadline depends on the facts, so it is worth checking early rather than assuming the general rule applies."],
      ["What if I was partly at fault for the accident?", "California follows comparative fault. A person may still have a claim even when some responsibility is assigned to them, although the amount recoverable can be reduced by their share of fault. The evidence around how the accident happened becomes especially important when fault is disputed.", "fault"],
      ["How much is my case worth?", "There is no single settlement formula. Important factors can include medical treatment, future care, lost wages or earning capacity, pain and functional limitations, responsibility for the accident, available insurance, liens, the strength of the evidence, and whether losses are temporary or long term. Our case-value calculator can provide an educational starting range, but an actual case requires review of the record.", "value"],
    ],
  },
  es: {
    eyebrow: "Después de un accidente",
    title: "Respuestas útiles antes de su primera llamada.",
    body: "Las preguntas que las personas suelen necesitar resolver primero después de un accidente grave en California.",
    questions: [
      ["¿Cuánto cuesta un abogado de accidentes?", "Los casos de lesiones personales generalmente se manejan con honorarios de contingencia, lo que significa que no hay honorarios de abogado a menos que haya una recuperación. La primera consulta es gratuita. El porcentaje específico y la forma de manejar los costos del caso se explican en un acuerdo escrito antes de comenzar la representación."],
      ["¿Ofrecen consultas gratuitas?", "Sí. La primera conversación es gratuita y no existe obligación de contratar a la firma. Puede traer lo que ya tenga: fecha y lugar del accidente, fotos, número de reporte y cartas del seguro.", "consultation"],
      ["¿Qué significa honorario de contingencia?", "Significa que los honorarios del abogado son un porcentaje de lo que realmente se recupera y solo se deben si el caso obtiene una recuperación. Los costos del caso se manejan por separado y se explican en el acuerdo escrito."],
      ["¿Cuánto tiempo tengo para presentar una demanda por lesiones personales en California?", "California generalmente permite dos años desde la fecha de la lesión para presentar una demanda por lesiones personales, pero existen excepciones y los reclamos contra entidades públicas pueden tener plazos de aviso mucho más cortos. El plazo correcto depende de los hechos."],
      ["¿Qué pasa si tuve parte de la culpa?", "California sigue principios de culpa comparativa. Una persona todavía puede tener un reclamo aunque se le atribuya parte de la responsabilidad, aunque la cantidad recuperable puede reducirse según su porcentaje de culpa.", "fault"],
      ["¿Cuánto vale mi caso?", "No existe una fórmula única. Pueden importar el tratamiento médico, la atención futura, salarios perdidos, capacidad de ingresos, dolor y limitaciones, responsabilidad, seguro disponible, gravámenes, la calidad de la evidencia y si las pérdidas son temporales o permanentes.", "value"],
    ],
  },
  ko: {
    eyebrow: "사고 이후",
    title: "첫 상담 전에 알아두면 좋은 답변.",
    body: "캘리포니아에서 큰 사고를 당한 뒤 가장 먼저 궁금해지는 질문들을 정리했습니다.",
    questions: [
      ["상해 청구가 가능할 수 있는 사고 후 무엇을 먼저 해야 하나요?", "안전과 필요한 치료가 우선입니다. 가능하다면 현장 사진·영상, 운전자와 보험 정보, 목격자 정보, 경찰 또는 사고 보고서, 차량 손상, 치료 기록, 결근 및 사고 관련 비용을 함께 보관하세요. 시간이 지나면 사라질 수 있는 증거도 있습니다.", "crash"],
      ["캘리포니아 개인상해 소송 기한은 얼마나 되나요?", "일반적으로 개인상해 소송은 부상일로부터 2년 이내에 제기해야 하지만 예외가 있고 공공기관 관련 청구에는 훨씬 짧은 사전 통지 기한이 적용될 수 있습니다. 정확한 기한은 사건별로 확인해야 합니다."],
      ["저에게도 일부 과실이 있다면 청구할 수 있나요?", "캘리포니아는 비교과실 제도를 적용합니다. 일부 책임이 인정되더라도 청구가 완전히 사라지는 것은 아닐 수 있지만, 회복 가능한 금액이 본인의 과실 비율에 따라 줄어들 수 있습니다.", "fault"],
      ["개인상해 사건의 가치는 무엇으로 결정되나요?", "정해진 한 가지 공식은 없습니다. 치료 내용, 향후 치료, 임금 손실, 장래 수입 감소, 통증과 기능 제한, 과실, 보험 한도, 증거의 질, 유치권과 장기적인 영향 등이 함께 고려될 수 있습니다.", "value"],
      ["첫 상담에는 무엇을 준비하면 되나요?", "완벽한 서류가 필요하지는 않습니다. 사고 일시와 장소, 간단한 경위, 사진, 경찰 또는 사고 보고서 정보, 보험 정보, 현재 가지고 있는 치료 자료와 보험사 연락 내용을 준비하면 충분히 시작할 수 있습니다.", "consultation"],
    ],
  },
} as const;

const guideLinks = {
  consultation: {
    href: "#consultation-questions",
    label: { en: "Prepare for your first consultation", ko: "첫 상담 준비하기", es: "Prepare su primera consulta" },
  },
  fault: {
    href: "/blogs/california-comparative-fault-personal-injury",
    label: { en: "How California handles shared fault", ko: "캘리포니아의 비교과실 제도", es: "Cómo se reparte la culpa en California" },
  },
  value: {
    href: "/case-value-calculator",
    label: { en: "Explore the injury case value calculator", ko: "상해 사건 배상액 계산기", es: "Explore la calculadora de valor del caso" },
  },
  crash: {
    href: "/blogs/what-to-do-after-a-car-accident-in-california",
    label: { en: "What to do after a crash in Buena Park", ko: "부에나파크 교통사고 대응 가이드", es: "Qué hacer tras un choque en Buena Park" },
  },
} as const;

const FAQ = ({ locale = "en" }: FAQProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.14 });
  const copy = faqCopy[locale];
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section id="faq" ref={ref} className="relative min-h-[100svh] bg-[#f3efe8] text-foreground">
      <div className="site-shell flex min-h-[100svh] w-full items-center py-16 md:py-20 lg:py-20">
        <div className="grid w-full gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-16 xl:gap-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.68 }}>
            <span className="mb-4 block text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{copy.eyebrow}</span>
            <h2
              style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
              className={`${ko ? "text-[clamp(2rem,2.55vw,3rem)] font-medium leading-[1.3] tracking-[-0.045em]" : "editorial-serif text-[clamp(2rem,2.7vw,3.2rem)] leading-[1.04] tracking-[-0.026em]"} max-w-[520px]`}
            >
              {copy.title}
            </h2>
            <p className="mt-4 max-w-[390px] text-[13px] leading-5 text-foreground/52">{copy.body}</p>
            <div className="mt-6 flex max-w-[390px] items-center gap-3 border-t border-foreground/12 pt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-foreground/30">
              <span>{String(copy.questions.length).padStart(2, "0")}</span><span>{ko ? "질문" : es ? "Preguntas" : "Questions"}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72, delay: 0.06 }} className="border-t border-foreground/14">
            {copy.questions.map(([question, answer, topic], index) => (
              <details key={question} name="homepage-faq" className="group border-b border-foreground/12">
                <summary className="grid w-full cursor-pointer list-none grid-cols-[28px_1fr_auto] items-center gap-2.5 py-[17px] text-left md:grid-cols-[36px_1fr_auto] md:gap-4 md:py-5 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="text-[9px] tabular-nums text-foreground/26">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`${ko ? "text-[13px] leading-6 md:text-[14px]" : "text-[13px] leading-5 md:text-[15px]"} font-medium tracking-[-0.012em]`}>{question}</span>
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/12">
                    <Plus className="h-3 w-3 stroke-[1.45] group-open:hidden" />
                    <Minus className="hidden h-3 w-3 stroke-[1.45] group-open:block" />
                  </span>
                </summary>
                <div className="max-w-[860px] pb-5 pl-[40px] pr-9 text-sm leading-6 text-foreground/75 md:pb-6 md:pl-[52px] md:pr-14">
                  <p>{answer}</p>
                  {topic && (
                    <a href={guideLinks[topic].href.startsWith("#") ? guideLinks[topic].href : `${prefix}${guideLinks[topic].href}`} className="mt-2 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
                      {guideLinks[topic].label[locale]}
                    </a>
                  )}
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
