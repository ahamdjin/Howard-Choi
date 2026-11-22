import { ArrowLink } from "@/components/ui/button";
import { GuidanceCard } from "@/components/editorial/EditorialCards";
import type { SiteLocale } from "@/data/injurySite";

const consultationExamples = [
  {
    slug: "car-accidents",
    title: { en: "The insurer disputes fault", ko: "보험사가 과실을 다투는 경우", es: "La aseguradora disputa la responsabilidad" },
    body: {
      en: "Bring the insurer’s explanation, the collision report number and any photos. If the crash happened near the I-5 and SR-91 interchange, note the ramp and direction of travel. Those details help identify which records or witnesses could clarify what happened.",
      ko: "보험사의 설명, 사고 보고서 번호, 사진을 준비하세요. I-5와 SR-91 나들목 근처에서 사고가 났다면 진출입로와 진행 방향도 기록하세요. 어떤 기록이나 목격자가 사고 경위를 밝히는 데 도움이 될지 판단할 수 있습니다.",
      es: "Traiga la explicación de la aseguradora, el número de informe y las fotos disponibles. Si el choque ocurrió cerca del enlace entre la I-5 y la SR-91, anote la rampa y el sentido de circulación. Esto ayuda a identificar qué registros o testigos podrían aclarar lo ocurrido.",
    },
    link: { en: "Car accident claims", ko: "자동차 사고 청구", es: "Reclamos por accidentes de auto" },
  },
  {
    slug: "serious-injuries",
    title: { en: "Your injury is affecting your work", ko: "부상이 업무에 지장을 주는 경우", es: "Su lesión está afectando su trabajo" },
    body: {
      en: "Write down the days or shifts you missed. Bring any written work restrictions and a short treatment timeline. If you’ve returned on reduced hours or lighter duties, document those changes too so we can discuss how the injury is affecting your income.",
      ko: "일하지 못한 날짜나 근무 시간을 적고, 의료진이 작성한 업무 제한과 간단한 치료 경과를 준비하세요. 복귀 후 근무 시간이 줄었거나 업무가 바뀌었다면 그 내용도 기록해 두면 소득에 미친 영향을 상담하는 데 도움이 됩니다.",
      es: "Anote los días o turnos que perdió y traiga las restricciones laborales por escrito y un resumen de su tratamiento. Si volvió con menos horas o tareas más livianas, documente esos cambios para hablar de cómo la lesión está afectando sus ingresos.",
    },
    link: { en: "Serious injury claims", ko: "중상해 청구", es: "Reclamos por lesiones graves" },
  },
  {
    slug: "slip-and-fall",
    title: { en: "You were hurt on someone else’s property", ko: "다른 사람이 관리하는 장소에서 다친 경우", es: "Se lesionó en propiedad ajena" },
    body: {
      en: "After a fall at a store or in a Beach Boulevard parking lot, record the exact spot and who took your report. Photos, a receipt or an incident report can help identify who controlled that part of the property and which records to request.",
      ko: "매장이나 Beach Boulevard 주차장에서 넘어졌다면 정확한 장소와 신고를 받은 사람을 기록하세요. 사진, 영수증, 사고 보고서는 해당 장소의 관리 주체와 요청할 기록을 파악하는 데 도움이 될 수 있습니다.",
      es: "Si se cayó en una tienda o en un estacionamiento de Beach Boulevard, anote el lugar exacto y quién recibió su aviso. Las fotos, un recibo o el informe del incidente pueden ayudar a identificar quién controlaba esa parte del inmueble y qué registros pedir.",
    },
    link: { en: "Slip and fall claims", ko: "미끄러짐 및 낙상 청구", es: "Reclamos por resbalones y caídas" },
  },
] as const;

const FirmSnapshot = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section id="when-to-call" aria-labelledby="when-to-call-heading" className="!min-h-0 w-full bg-[#f7f6f3] text-foreground">
      <div className="site-shell w-full py-12 md:py-16">
        <h2 id="when-to-call-heading" className="editorial-serif max-w-[830px] text-[clamp(2rem,3.8vw,4rem)] leading-[1.08]">
          {ko ? "부에나파크 개인상해 변호사에게 언제 상담해야 할까요?" : es ? "Cuándo consultar a un abogado de lesiones en Buena Park" : "When to call a Buena Park injury lawyer"}
        </h2>
        <p className="mt-4 max-w-[65ch] text-[15px] leading-7 text-foreground/75">
          {ko ? "부상으로 일을 쉬어야 하거나 사고 경위에 다툼이 생겼다면, 먼저 어떤 자료가 필요한지 확인해 보세요. Howard Choi와 상담할 때 아래 사항을 참고할 수 있습니다." : es ? "Si faltó al trabajo por una lesión o hay desacuerdo sobre lo ocurrido, conviene saber qué documentos pueden ayudar. Estos son ejemplos de lo que puede comentar con Howard Choi en una consulta." : "If your injury kept you from working or there’s disagreement about what happened, a consultation can help you identify what records matter. Here’s what you can bring to a conversation with Howard Choi."}
        </p>
        <div className="my-7 grid gap-4 md:grid-cols-3">
          {consultationExamples.map(({ slug, title, body, link }) => (
            <GuidanceCard mobileDisclosure="consultation-examples" key={slug} title={title[locale]} source={{ href: `${prefix}/practice-areas/${slug}`, label: link[locale] }}>
              <p>{body[locale]}</p>
            </GuidanceCard>
          ))}
        </div>
        <ArrowLink variant="ink" href={prefix ? `${prefix}/about` : "/about/our-difference"}>{ko ? "로펌 소개" : es ? "Sobre el despacho" : "How we build your case"}</ArrowLink>
      </div>
    </section>
  );
};

export default FirmSnapshot;
