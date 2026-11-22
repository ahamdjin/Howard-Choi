import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ClipboardList, MessagesSquare, Users } from "lucide-react";
import consultationImage from "@/assets/law-firm/reviewing-documents.jpg";
import { responsiveImageProps } from "@/lib/responsive-images";
import "@/components/editorial/claim-guidance.css";

import type { SiteLocale } from "@/data/injurySite";
import { localizedContentHref } from "@/lib/localized-path";

const questions = [
  {
    title: {"en": "An insurer wants an answer", "es": "La aseguradora le pide una respuesta", "ko": "보험사가 답변을 요구할 때"},
    icon: MessagesSquare,
    text: {"en": "Keep the letter, claim number and any response date together. Explain whether the request concerns vehicle damage, medical records or an injury settlement. Those decisions can follow different timelines, and a payment for repairs may leave the injury questions unresolved.", "es": "Guarde juntos la carta, el número de reclamo y cualquier plazo de respuesta. Explique si la solicitud se refiere a daños del vehículo, expedientes médicos o un acuerdo por lesiones. Cada asunto puede tener plazos distintos, y el pago de la reparación puede dejar pendiente el reclamo por lesiones.", "ko": "서신, 보험 청구번호, 답변 기한을 한곳에 모아 두세요. 요청이 차량 파손, 진료 기록, 부상에 대한 합의 중 무엇과 관련되는지 설명해 주세요. 사안별로 처리 일정이 다를 수 있고, 수리비가 지급되어도 부상 관련 문제는 남을 수 있습니다."},
    href: "/practice-areas/car-accidents",
    label: {"en": "Help with a car accident injury claim", "es": "Ayuda con un reclamo por lesiones en un accidente de auto", "ko": "교통사고 부상 보상 청구 도움받기"},
  },
  {
    title: {"en": "You need to understand your options", "es": "Quiere entender sus opciones", "ko": "어떤 선택지가 있는지 알아보고 싶을 때"},
    icon: ClipboardList,
    text: {"en": "Start with what happened, where you were hurt and what has changed since the injury. You can ask about a consultation while a report or medical record is still pending. Identify what you already know and what you need help confirming.", "es": "Empiece por explicar qué pasó, dónde se lesionó y qué ha cambiado desde entonces. Puede pedir una consulta aunque todavía no tenga el informe o el expediente médico. Distinga lo que ya sabe de lo que necesita ayuda para confirmar.", "ko": "어떤 일이 있었는지, 어디에서 다쳤는지, 부상 후 무엇이 달라졌는지부터 이야기해 주세요. 사고 보고서나 진료 기록을 아직 받지 못했어도 상담을 문의할 수 있습니다. 이미 아는 사실과 확인에 도움이 필요한 점을 정리해 보세요."},
    href: "/practice-areas/personal-injury",
    label: {"en": "How an injury claim is evaluated", "es": "Cómo se evalúa un reclamo por lesiones", "ko": "부상 보상 청구를 검토하는 과정"},
  },
  {
    title: {"en": "You are making the first call for family", "es": "Llama por primera vez en nombre de un familiar", "ko": "가족을 대신해 처음 전화할 때"},
    icon: Users,
    text: {"en": "Tell the office your relationship to the injured person and whether they can take part in the conversation. Describe the immediate concern without sending an entire private medical file. Ask which records to prepare and how the office would keep the family informed.", "es": "Diga qué relación tiene con la persona lesionada y si puede participar en la conversación. Explique la preocupación inmediata sin enviar el expediente médico completo. Pregunte qué documentos debe preparar y cómo mantendrán informada a la familia.", "ko": "부상자와 어떤 관계인지, 부상자가 상담에 함께할 수 있는지 알려 주세요. 개인 진료 기록 전체를 보내기 전에 당장 걱정되는 문제를 설명하세요. 어떤 자료를 준비해야 하는지, 가족에게 진행 상황을 어떻게 알려 주는지 물어보세요."},
    href: "/about/what-to-expect",
    label: {"en": "What to expect from the first conversation", "es": "Qué esperar de la primera conversación", "ko": "첫 상담에서 나누는 이야기"},
  },
];

export default function HomeInjuryClaimHelp({ locale }: { locale: SiteLocale }) {
  const tr = (en: string, es: string, ko: string) => ({ en, es, ko })[locale];
  const href = (path: string) => localizedContentHref(path, locale);
  return (
    <section className="claim-help" aria-labelledby="injury-claim-help">
      <div className="claim-help__inner">
        <div className="claim-help__heading">
          <h2 id="injury-claim-help" className="editorial-serif scroll-mt-28 text-balance">{tr("What do you need help with after an injury?", "¿Con qué necesita ayuda después de una lesión?", "부상 후 어떤 도움이 필요하신가요?")}</h2>
          <p>{tr("From our Buena Park office, we help people across Orange and Los Angeles counties. Start with the question you need answered today. You can call while the facts and the value of your claim are still taking shape.", "Desde nuestra oficina en Buena Park, ayudamos a personas en los condados de Orange y Los Ángeles. Empiece por la pregunta que necesita resolver hoy. Puede llamar mientras aún se aclaran los hechos y el valor de su reclamo.", "부에나파크 사무실에서 오렌지 카운티와 로스앤젤레스 카운티 주민을 돕습니다. 오늘 답을 얻고 싶은 질문부터 이야기해 주세요. 사실관계가 아직 정리되지 않았거나 보상액을 모르더라도 전화하실 수 있습니다.")}</p>

          <figure className="claim-help__image">
            <img {...responsiveImageProps(consultationImage, "(min-width: 1024px) 40vw, 100vw")} src={consultationImage} alt={tr("Illustrative consultation with documents and a laptop", "Imagen ilustrativa de una consulta con documentos y una computadora portátil", "서류와 노트북을 놓고 상담하는 모습을 담은 예시 사진")} loading="lazy" decoding="async" />
          </figure></div>
          <div className="claim-help__questions">
            {questions.map(({ icon: Icon, ...item }, index) => <details name="home-claim-options" open={index === 0} key={item.href} className="claim-help__question">
              <summary><Icon className="claim-help__icon" aria-hidden="true" strokeWidth={1.4} />
              <h3>{item.title[locale]}</h3><span className="claim-toggle" aria-hidden="true" /></summary><div>
                <p>{item.text[locale]}</p>
                <ArrowLink direction="right" variant="editorial" href={href(item.href)}>{item.label[locale]}</ArrowLink>
              </div>
            </details>)}
        <nav aria-label={tr("Injury-specific consultation help", "Ayuda según el tipo de lesión", "부상 유형별 상담 안내")} className="mt-7 grid gap-px overflow-hidden border border-black/15 bg-black/10 sm:grid-cols-2">
          <ButtonLink variant="paper" href={href("/practice-areas/rideshare-accidents")}>{tr("Injured in an Uber or Lyft? See what to keep from the trip.", "¿Se lesionó en un viaje de Uber o Lyft? Vea qué información del viaje conviene guardar.", "Uber나 Lyft 이용 중 다치셨나요? 어떤 운행 기록을 보관해야 하는지 알아보세요.")}</ButtonLink>
          <ButtonLink variant="paper" href={href("/practice-areas/serious-injuries")}>{tr("Helping someone after a brain injury? Prepare for the first call.", "¿Está ayudando a alguien con una lesión cerebral? Prepárese para la primera llamada.", "뇌 손상을 입은 분을 돕고 계신가요? 첫 상담 전화에 대비하세요.")}</ButtonLink>
        </nav>
        <div className="claim-help__next">
          <p>{tr("When choosing a lawyer, ask who will call you when the insurer makes an offer and who will explain your options.", "Al elegir abogado, pregunte quién le llamará cuando la aseguradora haga una oferta y quién le explicará sus opciones.", "변호사를 선택할 때는 보험사가 제안을 하면 누가 연락하고, 가능한 선택지를 누가 설명하는지 물어보세요.")}</p>
          <nav aria-label={tr("Getting to know the firm", "Conozca el bufete", "법률사무소 알아보기")}><ArrowLink variant="editorial" href={href("/attorney")}>{tr("Howard’s credentials", "Credenciales de Howard", "Howard Choi 변호사 자격 및 경력")}</ArrowLink><ArrowLink variant="editorial" href={href("/locations/buena-park")}>{tr("Buena Park office", "Oficina de Buena Park", "부에나파크 사무실")}</ArrowLink><ArrowLink direction="right" variant="ink" href={href("/contact")}>{tr("Free consultation", "Consulta gratuita", "무료 상담")}</ArrowLink></nav>
        </div>
          </div>
      </div>
    </section>
  );
}
