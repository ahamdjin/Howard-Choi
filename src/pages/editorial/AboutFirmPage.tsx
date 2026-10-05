import { ArrowRight, MessageSquareText, Scale, ShieldCheck } from "lucide-react";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import reviewingDocuments from "@/assets/law-firm/reviewing-documents.jpg";
import attorneyClientTalking from "@/assets/law-firm/attorney-client-talking.jpg";
import signingMedicalForm from "@/assets/law-firm/signing-medical-form.jpg";
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
        title={isKo(locale) ? "지역에 집중하고, 설명은 명확하게." : isEs(locale) ? "Lo mantenemos simple: qué ocurrió, quién es responsable y qué sigue." : "A Buena Park personal injury firm built around direct access."}
        description={isKo(locale)
          ? "Buena Park를 중심으로 사고·개인상해 사건을 다루며, 의뢰인이 현재 상황과 다음 단계를 이해할 수 있도록 돕는 데 초점을 둡니다."
          : isEs(locale)
            ? "Estamos en Beach Blvd en Buena Park y atendemos casos de accidentes y lesiones en el norte del Condado de Orange y ciudades cercanas del Condado de Los Ángeles. La mayoría de nuestros clientes nunca han pasado por un reclamo de lesiones, y está bien. Nuestro trabajo es ayudar a ordenar el proceso."
            : "Howard Choi opened his own practice in 2015 after several years handling cases for other attorneys. He wanted more control over how injury cases were handled and, more importantly, how clients were treated. The goal was simple: direct communication, consistent updates, and a client who never feels like just another file number."}
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
                { id: "focus", label: "Why the firm exists" }, { id: "working", label: "Why personal injury law" }, { id: "process", label: "CPA & accounting background" },
                { id: "team", label: "Languages & access" }, { id: "law-firm", label: "What clients get wrong" }, { id: "attorney", label: "What to ask before hiring" }, { id: "local", label: "Buena Park & community" },
              ]}
      >
        <ReadingSectionBlock
          id="focus"
          locale={locale}
          kicker={isKo(locale) ? "01 · 초점" : isEs(locale) ? "01 · Enfoque" : "01 · Focus"}
          title={isKo(locale) ? "사건을 복잡하게 보이게 만드는 요소를 정리합니다." : isEs(locale) ? "El primer trabajo es poner orden en el caos." : "Why Howard Choi started his own firm."}
          intro={isKo(locale)
            ? "사고 이후에는 치료, 보험, 책임 문제와 경제적 부담이 동시에 생길 수 있습니다. 로펌의 역할은 그 요소들을 정리하고 어떤 순서로 대응해야 하는지 명확하게 설명하는 것입니다."
            : isEs(locale)
              ? "Después de un choque todo puede llegar al mismo tiempo: tratamiento, llamadas de seguros, un auto que no puede usar, ingresos perdidos y discusiones sobre responsabilidad. Empezamos separando esos problemas, preservando la evidencia que no sobrevivirá una demora y explicando qué necesita atención inmediata y qué puede esperar."
              : "Before opening the firm, Howard was working at another law firm handling cases for other attorneys. He learned a great deal there, but wanted more control over case strategy and the client experience. In 2015, he opened his own practice around a more personal model: the people handling the case should be accessible to the person living through it."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[Scale, MessageSquareText, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">{isKo(locale) ? ["사실 정리", "직접적인 소통", "신중한 준비"][index] : isEs(locale) ? ["Entender qué ocurrió", "Hablar con claridad", "Construir el expediente"][index] : ["Direct access", "Personal case handling", "Clear communication"][index]}</h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">{isKo(locale)
                  ? ["사건의 핵심 사실과 우선순위를 먼저 확인합니다.", "현재 진행 상황과 다음 단계를 이해하기 쉽게 설명합니다.", "기록과 증거를 사건의 흐름에 맞게 준비합니다."][index]
                  : isEs(locale)
                    ? ["Cómo ocurrió el accidente, quién podría ser responsable, dónde está el tratamiento y qué necesita atención ahora.", "Dónde está el caso, qué falta y qué decisiones vendrán después, sin esconderse detrás de términos legales.", "Evidencia, expedientes médicos, seguro, ingresos perdidos y atención futura, organizados para que el reclamo se explique con claridad."][index]
                    : ["Clients should be able to communicate directly with the people handling their personal injury claim.", "The firm was built so injured clients do not feel like another file number moving through a large system.", "Clients should understand where the case stands, what information still matters, and what happens next."][index]}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#1E1C1A]/12 bg-[#1E1C1A]/10 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [isKo(locale) ? "2015" : isEs(locale) ? "2015" : "2015", isKo(locale) ? "독립 개업" : isEs(locale) ? "Práctica independiente" : "Independent practice"],
              [isKo(locale) ? "2012" : isEs(locale) ? "2012" : "2012", isKo(locale) ? "캘리포니아 변호사 등록" : isEs(locale) ? "Admisión en California" : "California admission"],
              [isKo(locale) ? "CPA" : isEs(locale) ? "CPA" : "CPA", isKo(locale) ? "회계 배경" : isEs(locale) ? "Formación contable" : "Accounting background"],
              [isKo(locale) ? "3" : isEs(locale) ? "3" : "3", isKo(locale) ? "사무실 지원 언어" : isEs(locale) ? "Idiomas disponibles en la oficina" : "Office languages"],
            ].map(([value, label]) => (
              <div key={label} className="bg-[#F8F7F4] px-5 py-5">
                <div style={serifStyle(locale)} className="text-[2rem] leading-none tracking-[-0.04em] text-[#381907]">{value}</div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#1E1C1A]/48">{label}</div>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="working"
          locale={locale}
          kicker={isKo(locale) ? "02 · 관계" : isEs(locale) ? "02 · Relación de trabajo" : "02 · Working relationship"}
          title={isKo(locale) ? "의뢰인이 사건의 진행을 이해할 수 있어야 합니다." : isEs(locale) ? "Debe saber qué está pasando en su propio caso." : "Why personal injury law."}
          intro={isKo(locale)
            ? "좋은 법률 서비스는 결과만 이야기하는 것이 아니라 현재 단계와 필요한 자료, 앞으로 예상되는 절차를 설명하는 데서 시작합니다."
            : isEs(locale)
              ? "Una buena representación no es solo el resultado final. Es saber qué estamos haciendo, qué registros importan, cómo afecta el tratamiento al reclamo, qué está discutiendo la aseguradora y qué tendrá que decidir después."
              : "What drew Howard to personal injury law was how uneven the playing field can become after an accident. An injured person may suddenly be dealing with medical bills, missed work, pain, vehicle damage and insurance calls, while the insurance company handles claims every day. His role is to understand that system, protect the client's interests, and make the process less one-sided."}
        >
          <div className="editorial-callout"><span className="editorial-callout__label">{isKo(locale) ? "원칙" : isEs(locale) ? "Principio de trabajo" : "Working principle"}</span><p>{isKo(locale) ? "과장된 약속보다 확인된 사실과 현실적인 다음 단계가 더 중요합니다." : isEs(locale) ? "Preferimos explicar dónde tiene una debilidad el caso antes que prometer una cifra que no podemos respaldar. Sabrá qué está sólido y qué todavía necesita trabajo." : "The insurance company has a process it uses every day. An injured person should have someone who understands that process, the evidence, and the financial impact of the claim."}</p></div>
          <figure className="mt-8 overflow-hidden rounded-md border border-[#1E1C1A]/10 bg-white">
            <img src={attorneyClientTalking} alt={isKo(locale) ? "상해 사건에 대해 상담하는 변호사와 의뢰인" : isEs(locale) ? "Abogado y cliente conversando sobre un reclamo por lesiones" : "Attorney and client discussing an injury claim"} width={1400} height={933} loading="lazy" decoding="async" className="aspect-[16/8.5] w-full object-cover" />
            <figcaption className="border-t border-[#1E1C1A]/10 px-4 py-3 text-[10px] leading-5 text-[#1E1C1A]/44">
              {isKo(locale) ? "복잡한 절차를 이해하기 쉬운 대화로 바꾸는 것이 목표입니다." : isEs(locale) ? "La meta es convertir un proceso complicado en una conversación que el cliente pueda entender." : "The point is to turn a complicated claims process into a conversation the client can actually understand."}
            </figcaption>
          </figure>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "03 · 진행" : isEs(locale) ? "03 · Desarrollo del caso" : "03 · Case development"}
          title={isKo(locale) ? "사건은 한 번에 만들어지지 않습니다." : isEs(locale) ? "Un caso se vuelve más claro con el tiempo." : "A CPA and accounting background behind the legal work."}
          intro={isKo(locale) ? "사고 직후의 증거부터 치료 경과, 보험 검토, 손실 기록과 해결 선택지까지 사건은 시간이 지나며 더 분명해집니다." : isEs(locale) ? "La primera llamada casi nunca tiene todas las respuestas. El panorama se aclara cuando preservamos evidencia, avanza el tratamiento, identificamos las pólizas aplicables y se entiende el costo real de la lesión." : "Before his legal career, Howard worked in accounting and became a CPA. That background still matters in personal injury cases, especially for self-employed clients, business owners, and claims involving complicated lost-income calculations. Proving what an accident cost someone financially can require much more than looking at one paycheck."}
        >
          <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", isKo(locale) ? "초기 확인" : isEs(locale) ? "Primera revisión" : "Accounting first", isKo(locale) ? "사고, 치료, 보험과 긴급한 문제를 정리합니다." : isEs(locale) ? "Qué ocurrió, dónde está el tratamiento, qué pólizas intervienen y si existe un plazo o evidencia que podría perderse." : "Howard's accounting background came before his legal career and still shapes how he reads financial records."],
              ["02", isKo(locale) ? "기록 구축" : isEs(locale) ? "Construir el expediente" : "Self-employed losses", isKo(locale) ? "책임, 치료, 손실과 관련 자료를 정리합니다." : isEs(locale) ? "Evidencia de responsabilidad, expedientes médicos, ingresos perdidos y cada póliza que podamos identificar." : "For self-employed clients, lost income may require tax returns, invoices, business records and a more careful financial analysis."],
              ["03", isKo(locale) ? "평가" : isEs(locale) ? "Sumarlo todo" : "Business owners", isKo(locale) ? "회복 과정과 향후 필요를 바탕으로 선택지를 검토합니다." : isEs(locale) ? "Dónde terminó el panorama médico, qué atención futura se necesitará, qué está en disputa y cuál es un valor realista del reclamo." : "A business owner's injury can affect revenue, workload and earning capacity in ways a normal pay stub does not show."],
              ["04", isKo(locale) ? "해결" : isEs(locale) ? "Resolverlo" : "Financial damages", isKo(locale) ? "합의 또는 필요한 다음 절차를 검토합니다." : isEs(locale) ? "Negociar, resolver o presentar una demanda, según lo que realmente respalde el expediente." : "The CPA background helps Howard understand and organize the financial side of a personal injury claim, not just the medical side."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                <div className="text-[9px] text-[#1E1C1A]/25">{number}</div><div className="mt-8 text-[12px] font-semibold">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <figure className="overflow-hidden rounded-md border border-[#1E1C1A]/10 bg-white">
              <img src={reviewingDocuments} alt={isKo(locale) ? "손실 자료와 사건 기록 검토" : isEs(locale) ? "Revisión de registros del caso y documentación financiera" : "Reviewing case records and financial documentation"} width={1400} height={935} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover" />
            </figure>
            <div className="flex flex-col justify-between border border-[#1E1C1A]/12 bg-[#F1EEE8] p-6 md:p-8">
              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#381907]/65">{isKo(locale) ? "회계 + 법률" : isEs(locale) ? "Contabilidad + derecho" : "Accounting + law"}</div>
              <p style={serifStyle(locale)} className="mt-10 text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.12] tracking-[-0.025em] text-[#1E1C1A]">
                {isKo(locale) ? "소득 손실이 단순한 급여명세서 한 장으로 설명되지 않는 경우가 있습니다." : isEs(locale) ? "A veces, una pérdida de ingresos no se puede explicar con un solo talón de pago." : "Sometimes a lost-income claim cannot be explained by one pay stub."}
              </p>
              <p className="mt-6 text-[11px] leading-5 text-[#1E1C1A]/52">
                {isKo(locale) ? "자영업자와 사업주의 경우 세금 신고서, 송장, 사업 기록과 수입 흐름을 함께 봐야 할 수 있습니다." : isEs(locale) ? "Para trabajadores por cuenta propia y dueños de negocios, puede ser necesario revisar declaraciones de impuestos, facturas, registros comerciales y el flujo real de ingresos." : "For self-employed clients and business owners, tax returns, invoices, business records and the actual flow of income can matter."}
              </p>
            </div>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="team"
          locale={locale}
          kicker={isKo(locale) ? "04 · 변호사" : isEs(locale) ? "04 · Abogado y práctica" : "04 · Languages & access"}
          title={isKo(locale) ? "사람과 사건 유형을 함께 확인하세요." : isEs(locale) ? "Compruebe con quién trabajaría realmente." : "Korean roots. English, Korean and Spanish at the office."}
          intro={isKo(locale) ? "변호사 등록 정보와 사고 유형별 업무 페이지를 통해 로펌의 실제 업무 범위를 확인할 수 있습니다." : isEs(locale) ? "Antes de contratar a alguien, debe poder verificar al abogado y confirmar que maneja su tipo de accidente. Howard es California Bar No. 284364 y el registro es público." : "Howard grew up in a Korean household and understands both the language and the culture. He knows how much harder an already stressful legal problem becomes when someone is not fully comfortable communicating in English. Korean-speaking clients can discuss the process with someone who understands that context, and Spanish assistance is also available at the office."}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`${localePrefix(locale)}/attorney`} className="editorial-link-card"><div className="editorial-link-card__top"><span>01</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "변호사" : isEs(locale) ? "Conozca a Howard Choi" : "Meet Howard Choi"}</h3><p>{isKo(locale) ? "Howard Choi 변호사의 캘리포니아 등록 정보와 사건을 다루는 방식을 확인하세요." : isEs(locale) ? "Su registro verificado del State Bar de California, número de licencia, estado, fecha de admisión y la forma en que trabaja un caso." : "California Bar No. 284364, direct attorney access, and English and Korean communication with Howard. Spanish assistance is also available at the office."}</p></a>
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-link-card"><div className="editorial-link-card__top"><span>02</span><ArrowRight className="h-3.5 w-3.5" /></div><h3 style={serifStyle(locale)}>{isKo(locale) ? "업무 분야" : isEs(locale) ? "Explorar áreas de práctica" : "Explore practice areas"}</h3><p>{isKo(locale) ? "자동차, 트럭, 보행자, 승차공유, 낙상, 중대 상해 등 사건 유형별 안내를 확인하세요." : isEs(locale) ? "Accidentes de auto, camión, motocicleta, peatones, Uber y Lyft, resbalones y caídas, muerte injusta y lesiones graves." : "Car, truck, motorcycle, pedestrian, rideshare, slip and fall, wrongful death, and serious injury."}</p></a>
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="law-firm"
          locale={locale}
          kicker={isKo(locale) ? "05 · 로펌" : isEs(locale) ? "05 · La firma" : "05 · Common mistakes"}
          title={isKo(locale) ? "작은 로펌의 장점" : isEs(locale) ? "Una firma pequeña, a propósito." : "What accident victims often get wrong."}
          intro={isKo(locale)
            ? "규모보다 사건 하나하나에 집중하는 방식을 선택했습니다."
            : isEs(locale)
              ? "Esta es una firma pequeña por decisión. Once años después, sigue siendo lo suficientemente pequeña para que la persona que lee el expediente sea la misma que lo argumenta. Más grande no significa automáticamente mejor en lesiones personales. Aquí hay un solo abogado, así que no existe una cadena de traspasos. La otra cara también es real: no podemos aceptar cada caso que llama. Preferimos decirlo temprano antes que aceptar un asunto y darle una atención superficial."
              : "One of the most common assumptions Howard hears is that the insurance company will automatically be fair because the accident was not the client's fault. Another is focusing only on vehicle damage while delaying attention to injuries. What someone does early after a car accident or other injury can affect the claim later."}
        >
          <img src={signingMedicalForm} alt={isKo(locale) ? "사고 후 의료 및 보험 관련 서류 작성" : isEs(locale) ? "Documentación médica y del seguro después de un accidente" : "Medical and insurance documentation after an accident"} width={1400} height={935} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-md object-cover" />
          <p className="mt-8 text-[15px] leading-8 text-[#57514b]">
            {isKo(locale)
              ? "담당 변호사는 한 명이며, 사건을 직접 검토하고 진행합니다."
              : isEs(locale)
                ? "Para decirlo con claridad: hay un abogado. Howard lee el expediente y toma con usted las decisiones sobre resolver o presentar el caso. No tendrá que volver a explicar el accidente a una persona nueva cada pocas semanas. El lado opuesto es que una firma pequeña solo puede llevar bien cierta cantidad de casos a la vez."
                : "That is why the first conversation focuses on the timeline, medical treatment, available evidence, insurance information, missed work and anything that could become harder to prove later. A personal injury claim is easier to evaluate when the record is built early instead of reconstructed months afterward."}
          </p>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="attorney"
          locale={locale}
          kicker={isKo(locale) ? "06 · 변호사" : isEs(locale) ? "06 · El abogado" : "06 · Choosing a firm"}
          title={isKo(locale) ? "담당 변호사는 한 명입니다." : isEs(locale) ? "Qué significa que un abogado maneje su caso." : "Before hiring a personal injury firm, ask one question."}
          intro={isKo(locale)
            ? "Howard Choi 변호사가 사건을 직접 담당합니다. 캘리포니아 변호사 번호 284364."
            : isEs(locale)
              ? "Howard Choi es el abogado. California State Bar No. 284364, admitido en octubre de 2012, graduado de William Howard Taft University en Santa Ana. Habla inglés y coreano. En la práctica, un abogado significa que no explicará su accidente a una persona nueva cada mes y que quien evalúa si resolver o presentar el caso es la misma persona que revisó sus registros."
              : "“Who is actually going to handle my case?” Howard wishes more people asked that before signing with a firm they saw on a billboard. The attorney in the advertisement may not be the person you communicate with after signing. Ask who your point of contact will be, who makes the important decisions on your case, and whether you will actually have access to your attorney. At this firm, Howard Choi is the attorney handling the case. His California State Bar No. is 284364."}
        >
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="editorial-inline-link"><span>{isKo(locale) ? "주 변호사 협회 기록 확인" : isEs(locale) ? "Verificar el registro del State Bar" : "Check the State Bar record"}</span><ArrowRight className="h-4 w-4" /></a>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "07 · 지역" : isEs(locale) ? "07 · Enfoque local" : "07 · Local focus"}
          title={isKo(locale) ? "Buena Park를 중심으로 인근 지역을 지원합니다." : isEs(locale) ? "Buena Park es nuestra base y conocemos la zona." : "Based in Buena Park and built through local relationships."}
          intro={isKo(locale)
            ? "Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk, Whittier와 인근 지역의 사고·상해 문제를 지원합니다."
            : isEs(locale)
              ? "Trabajamos con personas en Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk y Whittier. Conocer el área ayuda a identificar qué agencia hizo el reporte, dónde puede existir video, qué condado corresponde y qué aseguradoras suelen aparecer."
              : "The office has been in Buena Park for several years, serving clients from Buena Park and nearby Orange County and Los Angeles County communities. Much of the practice has grown through referrals from former clients, friends, families and other people in the community. Howard also stays connected with the Southern California legal community through professional organizations and relationships with other attorneys."}
        >
          <img src={suburbanPalms} alt={isKo(locale) ? "북부 오렌지카운티 주택가" : isEs(locale) ? "Techos residenciales y palmeras en el norte del Condado de Orange" : "Residential rooftops and palms in north Orange County"} width={1400} height={1050} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-md object-cover" />
          <a href={`${localePrefix(locale)}/locations`} className="editorial-inline-link mt-8"><span>{isKo(locale) ? "지역별 사고·상해 가이드 보기" : isEs(locale) ? "Ver guías locales de accidentes" : "See the local accident guides"}</span><ArrowRight className="h-4 w-4" /></a>
        </ReadingSectionBlock>
      </ReadingLayout>

      <div className="site-shell pb-5 pt-1">
        <div
          aria-label="Credits. Website, automation, AI systems, and backend: Ahmad Yar"
          className="text-[10px] leading-4 tracking-[0.02em] text-[#1E1C1A]/35"
        >
          <span className="font-semibold uppercase tracking-[0.08em]">Credits</span>
          <span className="mx-1.5">·</span>
          <span>Website, automation, AI systems, and backend: </span>
          <a
            href="https://www.ahmadyar.co/"
            className="underline decoration-[#1E1C1A]/20 underline-offset-2 transition-colors hover:text-[#1E1C1A]/65"
            aria-label="Ahmad Yar — website, automation, AI systems, and backend"
          >
            Ahmad Yar
          </a>
        </div>
      </div>

      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);
