import { ArrowUpRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";

const copy = {
  en: {
    eyebrow: "Personal injury representation · Howard Choi",
    title: "How a personal injury lawyer evaluates your claim.",
    intro: "A claim has to explain what happened, which insurance may respond and what the injury changed. Those questions overlap, but each needs its own evidence. Start with the part you need to understand, then use the detailed guides to go further.",
    cards: [
      { title: "What happened?", body: "An accident label is only the beginning. A car crash, an Uber trip and a fall in a store leave different records. Photos, witness details, incident reports and the people or businesses involved help put the event in order. The service guides explain the questions specific to each type of injury.", label: "Choose an injury service", path: "/practice-areas" },
      { title: "Which coverage needs review?", body: "Knowing an insurer's name does not answer every coverage question. The vehicles, the driver's activity and the policies involved can change what needs investigating. For a rideshare collision, trip records and the driver's app status are a useful starting point for the discussion with your lawyer.", label: "Explore Uber and Lyft injury claims", path: "/practice-areas/rideshare-accidents" },
      { title: "What has the injury changed?", body: "Medical bills show one part of the picture. Time away from work, changes to everyday activities and a documented need for continuing care may raise different questions. The case-value guide explains why a supported assessment needs records and context, rather than a single settlement number.", label: "Understand how injury losses are assessed", path: "/blogs/how-much-is-my-personal-injury-case-worth-california" },
    ],
    lawyer: "Meet Howard Choi, your Buena Park personal injury lawyer",
    consultation: "Discuss your injury with Howard Choi",
    source: "Understand lawyer fees and case costs · California State Bar",
  },
  ko: {
    eyebrow: "개인상해 법률 서비스 · Howard Choi",
    title: "개인상해 변호사는 청구를 어떻게 검토하나요?",
    intro: "청구에서는 사고 경위, 검토할 보험, 부상으로 달라진 점을 설명해야 합니다. 서로 연결된 문제이지만 각각을 뒷받침할 자료가 필요합니다. 궁금한 부분부터 살펴보고 자세한 가이드로 이어가세요.",
    cards: [
      { title: "무슨 일이 있었나요?", body: "사고 유형은 출발점입니다. 자동차 충돌, 우버 탑승 중 사고와 매장 낙상은 남기는 기록이 다릅니다. 사진, 목격자 정보, 사고 보고서와 관련 개인·사업체 정보는 경위를 정리하는 데 도움이 됩니다. 업무 분야별 가이드에서 각 부상의 구체적인 쟁점을 확인하세요.", label: "상해 업무 분야 선택", path: "/practice-areas" },
      { title: "어떤 보험을 검토해야 하나요?", body: "보험사 이름만으로 모든 보장 문제에 답할 수는 없습니다. 차량, 운전자의 활동과 관련 보험에 따라 조사할 내용이 달라질 수 있습니다. 차량공유 사고에서는 운행 기록과 운전자 앱 상태가 변호사와의 상담을 위한 출발점이 됩니다.", label: "우버·리프트 상해 청구 안내", path: "/practice-areas/rideshare-accidents" },
      { title: "부상으로 무엇이 달라졌나요?", body: "의료비는 전체 상황의 일부입니다. 결근, 일상 활동의 변화와 기록으로 확인되는 지속 치료 필요성은 각각 다른 쟁점을 제기할 수 있습니다. 사건 가치 가이드는 단일 합의금 수치보다 기록과 맥락이 필요한 이유를 설명합니다.", label: "상해 손실을 평가하는 방법", path: "/blogs/how-much-is-my-personal-injury-case-worth-california" },
    ],
    lawyer: "부에나파크 개인상해 변호사 Howard Choi 소개",
    consultation: "Howard Choi 변호사에게 상해 상담 문의",
    source: "변호사 보수와 사건 비용 안내 · California State Bar",
  },
  es: {
    eyebrow: "Representación por lesiones personales · Howard Choi",
    title: "Cómo evalúa un abogado su reclamo por lesiones.",
    intro: "Un reclamo debe explicar lo ocurrido, qué seguros podrían responder y qué cambió por la lesión. Son preguntas relacionadas, pero cada una necesita sus propias pruebas. Empiece por lo que necesita entender y consulte las guías para profundizar.",
    cards: [
      { title: "¿Qué ocurrió?", body: "El tipo de accidente es solo el comienzo. Un choque, un viaje en Uber y una caída en una tienda dejan registros diferentes. Fotos, testigos, reportes y datos de las personas o empresas involucradas ayudan a ordenar los hechos. Las guías explican las preguntas propias de cada lesión.", label: "Elegir un servicio para su lesión", path: "/practice-areas" },
      { title: "¿Qué cobertura debe revisarse?", body: "El nombre de una aseguradora no resuelve todas las preguntas sobre cobertura. Los vehículos, la actividad del conductor y las pólizas involucradas pueden cambiar lo que debe investigarse. En un choque de transporte compartido, los registros del viaje y el estado de la aplicación ayudan a iniciar la conversación con su abogado.", label: "Explorar reclamos por accidentes de Uber y Lyft", path: "/practice-areas/rideshare-accidents" },
      { title: "¿Qué cambió por la lesión?", body: "Las facturas médicas muestran una parte de la situación. La ausencia laboral, los cambios en actividades cotidianas y la necesidad documentada de atención continua pueden plantear preguntas distintas. La guía de valoración explica por qué hacen falta registros y contexto en lugar de una sola cifra de acuerdo.", label: "Entender cómo se evalúan las pérdidas", path: "/blogs/how-much-is-my-personal-injury-case-worth-california" },
    ],
    lawyer: "Conozca a Howard Choi, abogado de lesiones personales en Buena Park",
    consultation: "Consulte su lesión con Howard Choi",
    source: "Honorarios y gastos del caso · California State Bar",
  },
};

export default function PersonalInjuryGuide({ locale }: { locale: SiteLocale }) {
  const content = copy[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <section aria-labelledby="personal-injury-guide" className="bg-[#211c17] py-16 text-[#f3eee5] md:py-24">
      <div className="site-shell">
        <p className="text-xs tracking-wide text-[#d2bd9e]">{content.eyebrow}</p>
        <h2 id="personal-injury-guide" className="editorial-serif mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">{content.title}</h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/75">{content.intro}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {content.cards.map((card, index) => (
            <article key={card.path} className="flex flex-col border-t border-white/25 pt-5">
              <span aria-hidden="true" className="text-sm text-[#d2bd9e]">0{index + 1}</span>
              <h3 className="editorial-serif mt-5 text-3xl">{card.title}</h3>
              <p className="mb-6 mt-5 text-base leading-8 text-white/75">{card.body}</p>
              <a href={`${prefix}${card.path}`} className="mt-auto inline-flex items-center gap-2 py-3 text-sm underline underline-offset-4">{card.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/20 pt-7 text-sm">
          <a href={`${prefix}/attorney`} className="py-2 underline underline-offset-4">{content.lawyer}</a>
          <a href={`${prefix}/contact`} className="rounded-full bg-[#f3eee5] px-6 py-3 font-medium text-[#211c17]">{content.consultation}</a>
          <a href="https://www.calbar.ca.gov/public/legal-resources/working-attorney/what-expect-regarding-fees-and-billing" target="_blank" rel="noreferrer" className="py-2 text-white/65 underline underline-offset-4">{content.source}</a>
        </div>
      </div>
    </section>
  );
}
