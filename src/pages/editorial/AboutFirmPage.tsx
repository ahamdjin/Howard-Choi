import { ArrowRight, MessageSquareText, Scale, ShieldCheck } from "lucide-react";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import reviewingDocuments from "@/assets/law-firm/reviewing-documents.jpg";
import suburbanPalms from "@/assets/law-firm/suburban-palms.jpg";
import type { SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isEs,
  isKo,
  localePrefix,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "로펌 소개" : isEs(locale) ? "Acerca del bufete" : "About the firm"}
        title={isKo(locale) ? "지역에 집중하고, 설명은 명확하게." : isEs(locale) ? "Lo mantenemos simple: qué ocurrió, quién es responsable y qué sigue." : "We keep it simple: what happened, who is responsible, and what comes next."}
        description={isKo(locale)
          ? "Buena Park를 중심으로 사고·개인상해 사건을 다루며, 의뢰인이 현재 상황과 다음 단계를 이해할 수 있도록 돕는 데 초점을 둡니다."
          : isEs(locale)
            ? "Estamos en Beach Blvd en Buena Park y atendemos casos de accidentes y lesiones en el norte del Condado de Orange y ciudades cercanas del Condado de Los Ángeles. La mayoría de nuestros clientes nunca han pasado por un reclamo de lesiones, y está bien. Nuestro trabajo es ayudar a ordenar el proceso."
            : "We are based on Beach Blvd in Buena Park and we take accident and injury cases across north Orange County and the nearby LA County cities. Most of our clients have never dealt with an injury claim before, and honestly that is fine. Figuring it out is our job, not yours."}
        image={heroBoardroom}
      />

      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "로펌 · 소개" : isEs(locale) ? "Firma · Acerca de" : "Firm · About"}
        sections={isKo(locale)
          ? [
              { id: "focus", label: "우리의 초점" }, { id: "working", label: "함께 일하는 방식" }, { id: "process", label: "사건 진행" },
              { id: "team", label: "변호사·업무 분야" }, { id: "local", label: "지역 중심" },
            ]
          : isEs(locale)
            ? [
                { id: "focus", label: "En qué se enfoca la firma" }, { id: "working", label: "Cómo funciona la relación" }, { id: "process", label: "Cómo se desarrolla un caso" },
                { id: "team", label: "Abogado y práctica" }, { id: "law-firm", label: "La firma" }, { id: "attorney", label: "Trabajar con un abogado" }, { id: "local", label: "Enfoque local" },
              ]
            : [
                { id: "focus", label: "What the firm focuses on" }, { id: "working", label: "How the relationship works" }, { id: "process", label: "How a case develops" },
                { id: "team", label: "Attorney & practice" }, { id: "law-firm", label: "The firm itself" }, { id: "attorney", label: "Working with one attorney" }, { id: "local", label: "Local focus" },
              ]}
      >
        <ReadingSectionBlock
          id="focus"
          locale={locale}
          kicker={isKo(locale) ? "01 · 초점" : isEs(locale) ? "01 · Enfoque" : "01 · Focus"}
          title={isKo(locale) ? "사건을 복잡하게 보이게 만드는 요소를 정리합니다." : isEs(locale) ? "El primer trabajo es poner orden en el caos." : "The first job is making sense of the mess."}
          intro={isKo(locale)
            ? "사고 이후에는 치료, 보험, 책임 문제와 경제적 부담이 동시에 생길 수 있습니다. 로펌의 역할은 그 요소들을 정리하고 어떤 순서로 대응해야 하는지 명확하게 설명하는 것입니다."
            : isEs(locale)
              ? "Después de un choque todo puede llegar al mismo tiempo: tratamiento, llamadas de seguros, un auto que no puede usar, ingresos perdidos y discusiones sobre responsabilidad. Empezamos separando esos problemas, preservando la evidencia que no sobrevivirá una demora y explicando qué necesita atención inmediata y qué puede esperar."
              : "After a crash everything shows up at once. Treatment. Insurance calls. A car you cannot drive. Missed paychecks. Arguments about who was at fault. We start by pulling those apart, locking down the evidence that will not survive a delay, and telling you what actually needs your attention this week versus what can wait."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, MessageSquareText, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">{isKo(locale) ? ["사실 정리", "직접적인 소통", "신중한 준비"][index] : isEs(locale) ? ["Entender qué ocurrió", "Hablar con claridad", "Construir el expediente"][index] : ["Figure out what happened", "Tell you straight", "Build the record"][index]}</h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">{isKo(locale)
                  ? ["사건의 핵심 사실과 우선순위를 먼저 확인합니다.", "현재 진행 상황과 다음 단계를 이해하기 쉽게 설명합니다.", "기록과 증거를 사건의 흐름에 맞게 준비합니다."][index]
                  : isEs(locale)
                    ? ["Cómo ocurrió el accidente, quién podría ser responsable, dónde está el tratamiento y qué necesita atención ahora.", "Dónde está el caso, qué falta y qué decisiones vendrán después, sin esconderse detrás de términos legales.", "Evidencia, expedientes médicos, seguro, ingresos perdidos y atención futura, organizados para que el reclamo se explique con claridad."][index]
                    : ["How the accident happened, who might be on the hook, where your treatment stands, and what needs dealing with right now.", "Where the case stands, what we still need from you, and what you will have to decide next. No hiding behind legal words.", "Evidence, medical records, insurance, lost income and future care, organized so the claim explains itself."][index]}</p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="working"
          locale={locale}
          kicker={isKo(locale) ? "02 · 관계" : isEs(locale) ? "02 · Relación de trabajo" : "02 · Working relationship"}
          title={isKo(locale) ? "의뢰인이 사건의 진행을 이해할 수 있어야 합니다." : isEs(locale) ? "Debe saber qué está pasando en su propio caso." : "You should know what is going on in your own case."}
          intro={isKo(locale)
            ? "좋은 법률 서비스는 결과만 이야기하는 것이 아니라 현재 단계와 필요한 자료, 앞으로 예상되는 절차를 설명하는 데서 시작합니다."
            : isEs(locale)
              ? "Una buena representación no es solo el resultado final. Es saber qué estamos haciendo, qué registros importan, cómo afecta el tratamiento al reclamo, qué está discutiendo la aseguradora y qué tendrá que decidir después."
              : "Good representation is not just the settlement at the end. It is knowing what we are doing, which records matter, how your treatment affects the claim, what the insurer is fighting, and what you will have to decide next. You should not have to chase us for any of that."}
        >
          <div className="editorial-callout"><span className="editorial-callout__label">{isKo(locale) ? "원칙" : isEs(locale) ? "Principio de trabajo" : "Working principle"}</span><p>{isKo(locale) ? "과장된 약속보다 확인된 사실과 현실적인 다음 단계가 더 중요합니다." : isEs(locale) ? "Preferimos explicar dónde tiene una debilidad el caso antes que prometer una cifra que no podemos respaldar. Sabrá qué está sólido y qué todavía necesita trabajo." : "We would rather tell you the case has a weak spot than promise a number we cannot back up. You will hear what is solid and what still needs work."}</p></div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "03 · 진행" : isEs(locale) ? "03 · Desarrollo del caso" : "03 · Case development"}
          title={isKo(locale) ? "사건은 한 번에 만들어지지 않습니다." : isEs(locale) ? "Un caso se vuelve más claro con el tiempo." : "A case gets clearer over time."}
          intro={isKo(locale) ? "사고 직후의 증거부터 치료 경과, 보험 검토, 손실 기록과 해결 선택지까지 사건은 시간이 지나며 더 분명해집니다." : isEs(locale) ? "La primera llamada casi nunca tiene todas las respuestas. El panorama se aclara cuando preservamos evidencia, avanza el tratamiento, identificamos las pólizas aplicables y se entiende el costo real de la lesión." : "The first phone call almost never has every answer, and that is normal. Things sharpen up as we lock down evidence, your treatment plays out, we find out which policies actually apply, and the real cost of the injury becomes clear."}
        >
          <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", isKo(locale) ? "초기 확인" : isEs(locale) ? "Primera revisión" : "First look", isKo(locale) ? "사고, 치료, 보험과 긴급한 문제를 정리합니다." : isEs(locale) ? "Qué ocurrió, dónde está el tratamiento, qué pólizas intervienen y si existe un plazo o evidencia que podría perderse." : "What happened, where treatment stands, which policies are involved, and any deadline or evidence about to slip away."],
              ["02", isKo(locale) ? "기록 구축" : isEs(locale) ? "Construir el expediente" : "Build the record", isKo(locale) ? "책임, 치료, 손실과 관련 자료를 정리합니다." : isEs(locale) ? "Evidencia de responsabilidad, expedientes médicos, ingresos perdidos y cada póliza que podamos identificar." : "Liability evidence, medical records, lost pay, and every policy we can find."],
              ["03", isKo(locale) ? "평가" : isEs(locale) ? "Sumarlo todo" : "Add it up", isKo(locale) ? "회복 과정과 향후 필요를 바탕으로 선택지를 검토합니다." : isEs(locale) ? "Dónde terminó el panorama médico, qué atención futura se necesitará, qué está en disputa y cuál es un valor realista del reclamo." : "Where the medical picture landed, the care you will still need, what is being disputed, and what the claim is realistically worth."],
              ["04", isKo(locale) ? "해결" : isEs(locale) ? "Resolverlo" : "Resolve it", isKo(locale) ? "합의 또는 필요한 다음 절차를 검토합니다." : isEs(locale) ? "Negociar, resolver o presentar una demanda, según lo que realmente respalde el expediente." : "Negotiate, settle, or file. Whichever one the record actually supports."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                <div className="text-[9px] text-[#1E1C1A]/25">{number}</div><div className="mt-8 text-[12px] font-semibold">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="team"
          locale={locale}
          kicker={isKo(locale) ? "04 · 변호사" : isEs(locale) ? "04 · Abogado y práctica" : "04 · Attorney & practice"}
          title={isKo(locale) ? "사람과 사건 유형을 함께 확인하세요." : isEs(locale) ? "Compruebe con quién trabajaría realmente." : "Check who you would actually be working with."}
          intro={isKo(locale) ? "변호사 등록 정보와 사고 유형별 업무 페이지를 통해 로펌의 실제 업무 범위를 확인할 수 있습니다." : isEs(locale) ? "Antes de contratar a alguien, debe poder verificar al abogado y confirmar que maneja su tipo de accidente. Howard es California Bar No. 284364 y el registro es público." : "Before you hire anybody you should be able to look the lawyer up and confirm they handle your kind of accident. Howard is California Bar No. 284364 and that record is public, so we link straight to it."}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`${localePrefix(locale)}/attorney`} className="editorial-link-card"><div className="editorial-link-card__top"><span>01</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "변호사" : isEs(locale) ? "Conozca a Howard Choi" : "Meet Howard Choi"}</h3><p>{isKo(locale) ? "Howard Choi 변호사의 캘리포니아 등록 정보와 사건을 다루는 방식을 확인하세요." : isEs(locale) ? "Su registro verificado del State Bar de California, número de licencia, estado, fecha de admisión y la forma en que trabaja un caso." : "His verified California Bar record, license number, status and admission date, plus how he works a case."}</p></a>
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-link-card"><div className="editorial-link-card__top"><span>02</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "업무 분야" : isEs(locale) ? "Explorar áreas de práctica" : "Explore practice areas"}</h3><p>{isKo(locale) ? "자동차, 트럭, 보행자, 승차공유, 낙상, 중대 상해 등 사건 유형별 안내를 확인하세요." : isEs(locale) ? "Accidentes de auto, camión, motocicleta, peatones, Uber y Lyft, resbalones y caídas, muerte injusta y lesiones graves." : "Car, truck, motorcycle, pedestrian, rideshare, slip and fall, wrongful death, and serious injury."}</p></a>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="law-firm"
          locale={locale}
          kicker={isKo(locale) ? "05 · 로펌" : isEs(locale) ? "05 · La firma" : "05 · The law firm"}
          title={isKo(locale) ? "작은 로펌의 장점" : isEs(locale) ? "Una firma pequeña, a propósito." : "A small law firm, on purpose."}
          intro={isKo(locale)
            ? "규모보다 사건 하나하나에 집중하는 방식을 선택했습니다."
            : isEs(locale)
              ? "Esta es una firma pequeña por decisión. Once años después, sigue siendo lo suficientemente pequeña para que la persona que lee el expediente sea la misma que lo argumenta. Más grande no significa automáticamente mejor en lesiones personales. Aquí hay un solo abogado, así que no existe una cadena de traspasos. La otra cara también es real: no podemos aceptar cada caso que llama. Preferimos decirlo temprano antes que aceptar un asunto y darle una atención superficial."
              : "This is a small law firm and that is deliberate. Eleven years in, the firm has stayed small enough that the person who reads your file is the person who argues it. Bigger is not automatically better in injury work. Ask any firm you call who will actually be handling your file day to day, and whether you will be speaking with an attorney or a case manager. It is a fair question and the answer varies. Here there is one attorney, so there is nobody to hand you off to. The tradeoff is real and worth saying out loud: we cannot take every case that calls. What we can do is tell you honestly, in the first conversation, whether yours is one we can genuinely move forward."}
        >
          <img src={reviewingDocuments} alt={isKo(locale) ? "서류를 검토하는 모습" : isEs(locale) ? "Revisión de expedientes del accidente y comunicaciones de seguro" : "Reviewing accident records and insurance correspondence"} width={1400} height={935} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-md object-cover" />
          <p className="mt-8 text-[15px] leading-8 text-[#57514b]">
            {isKo(locale)
              ? "담당 변호사는 한 명이며, 사건을 직접 검토하고 진행합니다."
              : isEs(locale)
                ? "Para decirlo con claridad: hay un abogado. Howard lee el expediente y toma con usted las decisiones sobre resolver o presentar el caso. No tendrá que volver a explicar el accidente a una persona nueva cada pocas semanas. El lado opuesto es que una firma pequeña solo puede llevar bien cierta cantidad de casos a la vez."
                : "People ask who else works here, so to be plain about it: there is one attorney. Howard reads the file, talks to the doctors, and decides with you whether to settle or file. Nobody is going to hand you to a case manager you have never met, and you will not be re-explaining your accident to a new person every few weeks. The flip side is that a small firm can only carry so many cases well at once, which is why we would rather turn one down early than take it and do a thin job."}
          </p>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="attorney"
          locale={locale}
          kicker={isKo(locale) ? "06 · 변호사" : isEs(locale) ? "06 · El abogado" : "06 · The attorney"}
          title={isKo(locale) ? "담당 변호사는 한 명입니다." : isEs(locale) ? "Qué significa que un abogado maneje su caso." : "What it means that one attorney handles your case."}
          intro={isKo(locale)
            ? "Howard Choi 변호사가 사건을 직접 담당합니다. 캘리포니아 변호사 번호 284364."
            : isEs(locale)
              ? "Howard Choi es el abogado. California State Bar No. 284364, admitido en octubre de 2012, graduado de William Howard Taft University en Santa Ana. Habla inglés y coreano. En la práctica, un abogado significa que no explicará su accidente a una persona nueva cada mes y que quien evalúa si resolver o presentar el caso es la misma persona que revisó sus registros."
              : "Howard Choi is the attorney. California State Bar No. 284364, admitted in October 2012, out of William Howard Taft University in Santa Ana. He speaks English and Korean, which matters more than it sounds in this part of Orange County, because insurance adjusters do not slow down for a language barrier and neither do the deadlines. Practically, one attorney means you are not explaining your accident to a new person every month. It also means the person deciding whether to settle or file is the same person who saw your MRI and talked to your doctor. You can check all of that yourself, which is the point. His license, his admission date and his complete record are public."}
        >
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="editorial-inline-link"><span>{isKo(locale) ? "주 변호사 협회 기록 확인" : isEs(locale) ? "Verificar el registro del State Bar" : "Check the State Bar record"}</span><ArrowRight className="h-4 w-4" /></a>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "07 · 지역" : isEs(locale) ? "07 · Enfoque local" : "07 · Local focus"}
          title={isKo(locale) ? "Buena Park를 중심으로 인근 지역을 지원합니다." : isEs(locale) ? "Buena Park es nuestra base y conocemos la zona." : "Buena Park is home, and we know the area."}
          intro={isKo(locale)
            ? "Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk, Whittier와 인근 지역의 사고·상해 문제를 지원합니다."
            : isEs(locale)
              ? "Trabajamos con personas en Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk y Whittier. Conocer el área ayuda a identificar qué agencia hizo el reporte, dónde puede existir video, qué condado corresponde y qué aseguradoras suelen aparecer."
              : "We work with people in Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk and Whittier. Knowing the area matters more than it sounds. Which agency wrote the report, which nearby business might still have camera footage, whether the case lands in Orange County or LA County, and which insurers keep turning up."}
        >
          <img src={suburbanPalms} alt={isKo(locale) ? "북부 오렌지카운티 주택가" : isEs(locale) ? "Techos residenciales y palmeras en el norte del Condado de Orange" : "Residential rooftops and palms in north Orange County"} width={1400} height={1050} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-md object-cover" />
          <a href={`${localePrefix(locale)}/locations`} className="editorial-inline-link mt-8"><span>{isKo(locale) ? "지역별 사고·상해 가이드 보기" : isEs(locale) ? "Ver guías locales de accidentes" : "See the local accident guides"}</span><ArrowRight className="h-4 w-4" /></a>
        </ReadingSectionBlock>
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
