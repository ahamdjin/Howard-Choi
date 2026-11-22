import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/button";
import type { SiteLocale } from "@/data/injurySite";

const content = {
  en: {
    title: "What should the first conversation clarify?",
    intro: "An injury enquiry is more useful when it separates the immediate problem from the questions that still need investigation. You do not need to arrive with a settlement figure or a complete medical file.",
    consultation: "Request a free consultation",
    practiceLink: "How a Buena Park personal injury lawyer can help",
    items: [
      ["What needs attention now?", "Explain when and where the incident occurred, whether treatment is ongoing, and whether an insurer, employer or public agency has already contacted you. Identify any document asking for a signature or a response by a particular date. A short factual outline helps identify urgent questions; it does not replace a review of the documents or establish that the firm has accepted your case."],
      ["What still needs to be investigated?", "The missing piece might be who controlled a property, whether a driver was working, what a witness saw, or which policy applies. Keep known facts separate from assumptions. The records that matter depend on how the injury happened."],
      ["What happens if representation is offered?", "Ask who will handle communication, what records the firm needs, and how fees, case expenses and any reimbursement claims will be addressed in a written agreement. A free consultation is an opportunity to understand the proposed scope and next steps. It is not a promise of recovery, a completed investigation or a filing on your behalf."],
    ],
  },
  ko: {
    title: "첫 상담에서 무엇을 확인해야 할까요?",
    intro: "상해 문의에서는 당장 해결해야 할 문제와 추가 조사가 필요한 사항을 구분하면 도움이 됩니다. 합의금 액수나 완전한 의료 기록을 미리 준비해야 하는 것은 아닙니다.",
    consultation: "무료 상담 요청",
    practiceLink: "부에나파크 개인상해 업무 분야",
    items: [
      ["지금 확인해야 할 문제는 무엇인가요?", "사고 시점과 장소, 치료가 진행 중인지, 보험사·고용주·공공기관이 이미 연락했는지 설명하세요. 서명이나 특정 날짜까지의 답변을 요구하는 문서가 있으면 알려 주세요. 짧은 사실 정리는 긴급한 쟁점을 찾는 데 도움이 되지만 문서 검토를 대신하거나 법률사무소가 사건을 수임했다는 뜻은 아닙니다."],
      ["어떤 사항을 더 조사해야 할까요?", "시설을 누가 관리했는지, 운전자가 업무 중이었는지, 목격자가 무엇을 봤는지 또는 어떤 보험이 적용되는지가 빠진 정보일 수 있습니다. 확인된 사실과 추정을 구분하세요. 필요한 기록은 부상이 발생한 경위에 따라 다릅니다."],
      ["수임 제안을 받으면 무엇을 확인하나요?", "누가 연락을 담당하는지, 어떤 기록이 필요한지, 보수·사건 비용·구상 또는 상환 청구를 서면 계약에서 어떻게 다루는지 질문하세요. 무료 상담은 제안된 업무 범위와 다음 단계를 이해할 기회입니다. 배상 보장, 조사 완료 또는 본인을 위한 소송 제기를 의미하지 않습니다."],
    ],
  },
  es: {
    title: "¿Qué debería aclarar la primera conversación?",
    intro: "Una consulta por lesiones resulta más útil cuando distingue el problema inmediato de las preguntas que requieren investigación. No necesita llegar con una cifra de acuerdo ni con un expediente médico completo.",
    consultation: "Solicite una consulta gratuita",
    practiceLink: "Áreas de práctica de lesiones en Buena Park",
    items: [
      ["¿Qué necesita atención ahora?", "Explique cuándo y dónde ocurrió el incidente, si sigue en tratamiento y si una aseguradora, un empleador o una agencia pública ya lo contactó. Identifique documentos que pidan una firma o una respuesta en una fecha concreta. Un resumen factual ayuda a detectar cuestiones urgentes; no sustituye la revisión documental ni significa que el despacho haya aceptado el caso."],
      ["¿Qué falta investigar?", "Puede faltar saber quién controlaba un inmueble, si un conductor estaba trabajando, qué vio un testigo o qué póliza se aplica. Separe los hechos conocidos de las suposiciones. Los documentos que importan dependen de cómo ocurrió la lesión."],
      ["¿Qué ocurre si se ofrece representación?", "Pregunte quién gestionará la comunicación, qué registros necesita el despacho y cómo se abordarán honorarios, gastos del caso y posibles reclamaciones de reembolso en un acuerdo escrito. La consulta gratuita permite entender el alcance propuesto y los próximos pasos. No promete una recuperación, una investigación terminada ni la presentación de una demanda en su nombre."],
    ],
  },
};
export default function HomeConsultationQuestions({ locale }: { locale: SiteLocale }) {
  const mobile = useIsMobile();
  const copy = content[locale];
  const practiceHref = locale === "en" ? "/practice-areas/personal-injury" : `/${locale}/practice-areas`;

  return (
    <section id="consultation-questions" aria-labelledby="consultation-questions-heading" className="!min-h-0 border-t border-foreground/15 bg-[#f7f6f3] py-14 md:py-20 lg:py-24">
      <div className="site-shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 xl:gap-16">
        <Card className="border-0 shadow-none rounded-[3px] bg-[#211c17] px-5 py-7 text-[#f7f6f3] sm:p-8 lg:p-10">
          <h2 id="consultation-questions-heading" className="editorial-serif max-w-[17ch] text-balance text-[clamp(2rem,3.65vw,4rem)] leading-[1.05]">{copy.title}</h2>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-7 text-[#eee7df]/90">{copy.intro}</p>
          <ArrowLink direction="right" variant="paper" href="#booking" className="mt-6">{copy.consultation}</ArrowLink>
        </Card>
        <div className="divide-y divide-foreground/15 border-y border-foreground/15">
          {copy.items.map(([heading, body]) => mobile ? (
            <details key={heading} name="consultation-topics" className="home-topic">
              <summary>{heading}</summary>
              <p>{body}</p>
            </details>
          ) : (
            <article key={heading} className="grid gap-2 py-5 sm:grid-cols-[0.7fr_1.3fr] sm:gap-6 lg:py-6">
              <h3 className="editorial-serif text-[clamp(1.35rem,2vw,1.8rem)] leading-tight">{heading}</h3>
              <p className="max-w-[67ch] text-[15px] leading-7 text-foreground/75">{body}</p>
            </article>
          ))}
          <div className="pt-2">
            <ArrowLink direction="right" variant="editorial" href={practiceHref}>{copy.practiceLink}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
