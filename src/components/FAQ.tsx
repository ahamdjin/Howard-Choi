import { ButtonLink } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
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
      ["Can I call before the police report is ready?", "Yes. Give the date and location of the crash, the name of the investigating agency and any report number you have. Tell the office which details you saw yourself and which ones you’re still waiting to confirm.", "crash"],
      ["Can a family member make the first call?", "Yes. Explain your relationship, whether the injured person can join the conversation and what needs attention first. Ask what permission the office needs before it can discuss someone else’s records."],
      ["What should I keep if an insurer has already contacted me?", "Save the letter or email, claim number, adjuster’s contact details and any stated response date. For a phone call, write down when it happened and what the adjuster asked you to send or sign."],
    ],
  },
  es: {
    eyebrow: "Después de un accidente",
    title: "Respuestas útiles antes de su primera llamada.",
    body: "Las preguntas que las personas suelen necesitar resolver primero después de un accidente grave en California.",
    questions: [
      ["¿Cuánto cuesta un abogado de accidentes?", "Los casos de lesiones personales suelen llevarse con honorarios de contingencia. Esto significa que solo se deben honorarios de abogado si se obtiene una recuperación. Usted no paga por hora mientras el caso está abierto y la primera consulta es gratuita. El porcentaje específico y el manejo de los gastos del caso se detallan en un acuerdo escrito antes de empezar."],
      ["¿Ofrecen consultas gratuitas?", "Sí. La primera conversación es gratuita y no hay obligación de contratar al bufete después. Traiga lo que ya tenga, como la fecha y el lugar del accidente, fotos, un número de informe o cartas de la aseguradora. Puede hacer sus preguntas antes de tomar una decisión.", "consultation"],
      ["¿Qué son los honorarios de contingencia?", "Son un porcentaje de lo que realmente se recupera y solo se deben si se obtiene una recuperación. Si el reclamo no genera una recuperación, usted no debe honorarios de abogado. Los gastos, como obtener documentos o presentar la demanda, se manejan por separado y se explican en el acuerdo escrito."],
      ["¿Cuánto tiempo tengo para presentar una demanda por lesiones personales en California?", "Por lo general, en California hay dos años desde la fecha de la lesión para presentar una demanda por lesiones personales. Hay excepciones y los reclamos contra entidades públicas pueden tener plazos de aviso mucho más cortos. Conviene comprobar pronto qué plazo corresponde según los hechos."],
      ["¿Qué pasa si tuve parte de la culpa?", "California aplica la culpa comparativa. Puede presentar un reclamo aunque se le atribuya parte de la responsabilidad, pero el monto recuperable puede reducirse según su porcentaje de culpa. Las pruebas de cómo ocurrió el accidente cobran especial importancia cuando se discute la responsabilidad.", "fault"],
      ["¿Cuánto vale mi caso?", "No hay una fórmula única para calcular un acuerdo. Pueden influir el tratamiento, la atención futura, la pérdida de ingresos o de capacidad para ganarlos, el dolor, las limitaciones, la responsabilidad, el seguro disponible, los gravámenes, la solidez de las pruebas y la duración de las pérdidas. La calculadora puede darle un rango orientativo, pero evaluar su caso requiere revisar los documentos.", "value"],
      ["¿Puedo llamar antes de tener el informe policial?", "Sí. Indique la fecha y el lugar del choque, el organismo que lo investigó y cualquier número de informe que tenga. Diga qué detalles observó usted y cuáles quedan por confirmar.", "crash"],
      ["¿Puede un familiar hacer la primera llamada?", "Sí. Explique su relación con la persona lesionada, si ella puede participar y qué necesita atención primero. Pregunte qué autorización necesita el bufete para hablar de los documentos de otra persona."],
      ["¿Qué debo guardar si la aseguradora ya me contactó?", "Guarde la carta o el correo, el número de reclamo, los datos de contacto del ajustador y cualquier plazo de respuesta indicado. Si le llamaron, anote cuándo y qué le pidieron enviar o firmar."],
    ],
  },
  ko: {
    eyebrow: "사고 이후",
    title: "첫 상담 전에 알아두면 좋은 답변.",
    body: "캘리포니아에서 큰 사고를 당한 뒤 가장 먼저 궁금해지는 질문들을 정리했습니다.",
    questions: [
      ["사고 사건을 맡기는 데 변호사 비용이 얼마나 드나요?", "개인상해 사건은 보통 성공보수제로 진행하며, 보상금을 받았을 때만 변호사 수임료가 발생합니다. 사건이 진행되는 동안 시간당 수임료를 내지 않으며 첫 상담은 무료입니다. 구체적인 보수 비율과 사건 비용 처리 방식은 업무를 시작하기 전에 서면 계약서에 명시합니다."],
      ["무료 상담을 받을 수 있나요?", "네. 첫 상담은 무료이며 상담 후 사건을 맡길 의무는 없습니다. 사고 일시와 장소, 사진, 보고서 번호, 보험사 서신 등 이미 가지고 있는 자료를 준비하세요. 결정을 내리기 전에 궁금한 점을 물어볼 수 있습니다.", "consultation"],
      ["성공보수제란 무엇인가요?", "실제로 받은 보상금의 일정 비율을 변호사 수임료로 지급하는 방식입니다. 보상금을 받지 못하면 변호사 수임료를 내지 않습니다. 자료 발급비나 소송 접수비 등 사건 비용은 별도로 처리하며 서면 계약서에 설명합니다."],
      ["캘리포니아에서 개인상해 소송을 제기할 수 있는 기한은 얼마인가요?", "일반적으로 부상일로부터 2년 이내에 개인상해 소송을 제기해야 합니다. 다만 예외가 있으며 공공기관 관련 청구에는 훨씬 짧은 사전 통지 기한이 적용될 수 있습니다. 정확한 기한은 사실관계에 따라 달라지므로 일찍 확인하는 것이 좋습니다."],
      ["사고에 제 과실도 일부 있다면 어떻게 되나요?", "캘리포니아는 비교과실 제도를 적용합니다. 일부 책임이 있어도 청구할 수 있지만, 받을 수 있는 금액은 본인의 과실 비율에 따라 줄어들 수 있습니다. 과실을 다툴 때는 사고 경위를 보여 주는 증거가 특히 중요합니다.", "fault"],
      ["제 사건의 보상액은 얼마나 되나요?", "합의금을 산정하는 한 가지 공식은 없습니다. 치료와 향후 돌봄, 임금이나 소득 능력의 감소, 통증과 기능 제한, 사고 책임, 적용 가능한 보험, 유치권, 증거의 강도, 손실이 지속되는 기간 등이 영향을 줄 수 있습니다. 계산기는 참고 범위를 보여 주며, 실제 사건을 평가하려면 관련 자료를 검토해야 합니다.", "value"],
      ["경찰 보고서가 나오기 전에 전화해도 되나요?", "네. 사고 날짜와 장소, 조사 기관 이름, 알고 있는 보고서 번호를 알려 주세요. 직접 확인한 사실과 아직 확인을 기다리는 내용을 구분해 설명해 주세요.", "crash"],
      ["가족이 대신 첫 전화를 해도 되나요?", "네. 부상자와의 관계, 부상자가 상담에 참여할 수 있는지, 무엇을 먼저 해결해야 하는지 설명해 주세요. 다른 사람의 기록을 논의하려면 어떤 동의가 필요한지도 물어보세요."],
      ["보험사에서 이미 연락했다면 무엇을 보관해야 하나요?", "서신이나 이메일, 청구번호, 보험사 담당자의 연락처, 안내받은 답변 기한을 보관하세요. 전화로 연락받았다면 통화 날짜와 담당자가 보내거나 서명하라고 요청한 내용을 적어 두세요."],
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
  const copy = faqCopy[locale];
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section id="faq" className="relative min-h-[100svh] bg-[#f3efe8] text-foreground">
      <div className="site-shell flex min-h-[100svh] w-full items-center py-16 md:py-20 lg:py-20">
        <div className="grid w-full gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-16 xl:gap-24">
          <div>
            <span className="mb-4 block text-[9px] font-medium uppercase tracking-[0.18em] text-foreground/70">{copy.eyebrow}</span>
            <h2
              style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
              className={`${ko ? "text-[clamp(2rem,2.55vw,3rem)] font-medium leading-[1.3] tracking-[-0.045em]" : "editorial-serif text-[clamp(2rem,2.7vw,3.2rem)] leading-[1.04] tracking-[-0.026em]"} max-w-[520px]`}
            >
              {copy.title}
            </h2>
            <p className="mt-4 max-w-[390px] text-[13px] leading-5 text-foreground/70">{copy.body}</p>
            <div className="mt-6 flex max-w-[390px] items-center gap-3 border-t border-foreground/12 pt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-foreground/70">
              <span>{String(copy.questions.length).padStart(2, "0")}</span><span>{ko ? "질문" : es ? "Preguntas" : "Questions"}</span>
            </div>
          </div>

          <div className="border-t border-foreground/14">
            {copy.questions.map(([question, answer, topic], index) => (
              <details key={question} name="homepage-faq" className="group border-b border-foreground/12">
                <summary className="grid w-full cursor-pointer list-none grid-cols-[28px_1fr_auto] items-center gap-2.5 py-[17px] text-left md:grid-cols-[36px_1fr_auto] md:gap-4 md:py-5 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="text-[9px] tabular-nums text-foreground/70">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`${ko ? "text-[13px] leading-6 md:text-[14px]" : "text-[13px] leading-5 md:text-[15px]"} font-medium tracking-[-0.012em]`}>{question}</span>
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/12">
                    <Plus aria-hidden="true" className="h-3 w-3 stroke-[1.45] group-open:hidden" />
                    <Minus aria-hidden="true" className="hidden h-3 w-3 stroke-[1.45] group-open:block" />
                  </span>
                </summary>
                <div className="max-w-[860px] pb-5 pl-[40px] pr-9 text-sm leading-6 text-foreground/75 md:pb-6 md:pl-[52px] md:pr-14">
                  <p>{answer}</p>
                  {topic && (
                    <ButtonLink variant="editorial" href={guideLinks[topic].href.startsWith("#") ? guideLinks[topic].href : `${prefix}${guideLinks[topic].href}`} className="mt-2">
                      {guideLinks[topic].label[locale]}
                    </ButtonLink>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
