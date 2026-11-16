import type { SiteLocale } from "./injurySite";

type LocalGuidance = {
  introduction: string[];
  title: string;
  label: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
};

// Practical consultation guidance. This copy makes no new claim about past
// results, the attorney's personal experience or a family's legal eligibility.
export const practiceLocalGuidance: Partial<Record<string, Record<SiteLocale, LocalGuidance>>> = {
  "car-accidents": {
    en: {
      introduction: [
        "Howard Choi helps people injured in car accidents in Buena Park and across Orange County and Los Angeles County. From the Buena Park office on Beach Boulevard, the first review can address the collision, the injury and the insurance questions together. Tell the office where the crash happened and which decision you need help with, such as responding to an adjuster, finding a report or dealing with bills while treatment continues.",
        "Bring the information you already have. A report that is still pending, a disputed lane change or a vehicle that has already been moved can each require a different next step. Explain what you personally remember and identify any gaps. You can ask for a consultation before you have collected every record.",
      ],
      title: "Keep the collision, medical bills and vehicle settlement on separate tracks",
      label: "Your next claim decision",
      paragraphs: [
        "A repair payment can arrive while your injury is still being evaluated. Keep the vehicle estimate, deductible, rental approval and any proposed property release together. Keep treatment records, current provider balances, work restrictions and injury correspondence in a second file. Before signing, ask which claims the document closes and whether it addresses expenses that another payer has already paid. The amount offered for the car does not explain the amount available for an injury.",
        "If a report describes the wrong driveway, lane or direction, retain the original copy and identify the exact entry you dispute. Put a photograph, diagram or witness contact beside that entry and record when you asked the investigating agency about a correction. If no report exists, organize the other evidence rather than describing the file as complete. The guides below explain both situations.",
        "For a commute between Orange County and Los Angeles County, record the actual scene separately from your home address, workplace and the place you later stopped. A freeway direction, exit or nearby intersection may help locate the event more accurately than the city name on a tow receipt. Tell Howard which agency responded and give each insurer's claim number so correspondence can be matched to the right file.",
      ],
      links: [
        { label: "Claim evidence when there is no police report", href: "/blogs/car-insurance-claim-without-police-report-california" },
        { label: "Requesting a correction to an inaccurate crash report", href: "/blogs/correct-inaccurate-car-accident-police-report-california" },
        { label: "Medical bills while an accident claim is pending", href: "/blogs/medical-bills-while-car-accident-claim-pending-california" },
      ],
    },
    es: {
      introduction: [
        "Howard Choi ayuda a personas lesionadas en accidentes de automóvil en Buena Park y en los condados de Orange y Los Angeles. Desde la oficina de Buena Park en Beach Boulevard, la revisión inicial puede abordar juntos la colisión, las lesiones y las preguntas sobre seguros. Indique dónde ocurrió el choque y qué decisión necesita tomar, como responder a un ajustador, localizar un informe o afrontar facturas mientras continúa el tratamiento.",
        "Traiga la información que ya tenga. Un informe pendiente, un cambio de carril en disputa o un vehículo que ya fue trasladado pueden exigir pasos diferentes. Explique lo que recuerda personalmente e identifique los datos que faltan. Puede solicitar una consulta antes de reunir todos los registros.",
      ],
      title: "Organice por separado la colisión, las facturas médicas y el acuerdo del vehículo",
      label: "La próxima decisión sobre su reclamo",
      paragraphs: [
        "Un pago por reparaciones puede llegar mientras sus lesiones aún se están evaluando. Guarde juntos el presupuesto del vehículo, el deducible, la autorización del alquiler y cualquier propuesta de liberación por daños materiales. Mantenga en otro expediente los registros de tratamiento, saldos actuales, restricciones laborales y comunicaciones sobre lesiones. Antes de firmar, pregunte qué reclamos cierra el documento y si incluye gastos ya pagados por otra entidad. La oferta por el automóvil no explica la cantidad disponible por una lesión.",
        "Si un informe identifica incorrectamente la entrada, el carril o el sentido de circulación, conserve la copia original y señale el dato concreto que cuestiona. Adjunte una foto, un diagrama o el contacto de un testigo a ese dato y anote cuándo consultó a la agencia investigadora sobre una corrección. Si no existe informe, organice las demás pruebas sin presentar el expediente como completo. Las guías siguientes explican ambas situaciones.",
        "En un viaje entre los condados de Orange y Los Angeles, registre el lugar real del choque por separado de su domicilio, trabajo y lugar donde se detuvo después. El sentido de la autopista, la salida o una intersección cercana pueden ubicar el hecho mejor que la ciudad indicada en un recibo de grúa. Indique a Howard qué agencia respondió y facilite el número de reclamo de cada aseguradora para relacionar cada comunicación con el expediente correcto.",
      ],
      links: [
        { label: "Pruebas cuando no hay informe policial (en inglés)", href: "/blogs/car-insurance-claim-without-police-report-california" },
        { label: "Solicitar la corrección de un informe inexacto (en inglés)", href: "/blogs/correct-inaccurate-car-accident-police-report-california" },
        { label: "Facturas médicas durante un reclamo pendiente (en inglés)", href: "/blogs/medical-bills-while-car-accident-claim-pending-california" },
      ],
    },
    ko: {
      introduction: [
        "Howard Choi는 Buena Park와 Orange County, Los Angeles County 전역에서 자동차 사고로 다친 분들을 돕습니다. Beach Boulevard의 Buena Park 사무실에서는 충돌 경위, 부상, 보험 문제를 함께 검토할 수 있습니다. 사고 장소와 함께 보험 담당자에게 답변하기, 사고 보고서 찾기, 치료 중 청구서 처리하기 등 지금 도움이 필요한 결정을 알려 주세요.",
        "현재 가지고 있는 자료부터 준비하세요. 아직 나오지 않은 보고서, 다툼이 있는 차선 변경, 이미 옮겨진 차량은 각각 다른 후속 조치가 필요할 수 있습니다. 직접 기억하는 내용과 확인하지 못한 부분을 구분해 설명하세요. 모든 기록을 모으기 전에도 상담을 요청할 수 있습니다.",
      ],
      title: "충돌 경위, 의료비, 차량 합의 자료를 구분해 정리하세요",
      label: "청구 과정의 다음 결정",
      paragraphs: [
        "부상을 평가하는 동안 차량 수리비가 먼저 지급될 수 있습니다. 차량 견적, 자기부담금, 렌터카 승인, 재산 피해에 관한 합의서 초안은 함께 보관하세요. 치료 기록, 현재 의료기관 잔액, 업무 제한, 부상 관련 연락은 별도 파일로 정리하세요. 서명하기 전에 어떤 청구가 종결되는지, 다른 지급자가 이미 부담한 비용이 포함되는지 질문하세요. 차량에 대한 제안액만으로 부상 청구 금액을 알 수는 없습니다.",
        "보고서의 진입로, 차선, 진행 방향이 잘못되었다면 원본을 보관하고 다투는 항목을 정확히 표시하세요. 해당 항목과 관련된 사진, 도면, 목격자 연락처를 함께 정리하고 조사 기관에 정정을 문의한 날짜를 기록하세요. 보고서가 없다면 다른 증거를 정리하면서 아직 확인되지 않은 부분도 밝히세요. 아래 안내는 두 상황을 각각 설명합니다.",
        "Orange County와 Los Angeles County 사이를 이동하다 사고가 났다면 실제 현장을 집, 직장, 사고 후 정차한 장소와 구분해 기록하세요. 고속도로 진행 방향, 출구, 가까운 교차로가 견인 영수증의 도시명보다 정확한 위치 확인에 도움이 될 수 있습니다. 출동 기관과 각 보험사의 청구 번호를 Howard에게 알려 연락 기록을 올바른 파일과 연결할 수 있게 하세요.",
      ],
      links: [
        { label: "경찰 보고서가 없을 때의 청구 증거 (영문)", href: "/blogs/car-insurance-claim-without-police-report-california" },
        { label: "부정확한 사고 보고서 정정 요청 (영문)", href: "/blogs/correct-inaccurate-car-accident-police-report-california" },
        { label: "사고 청구가 진행 중일 때의 의료비 (영문)", href: "/blogs/medical-bills-while-car-accident-claim-pending-california" },
      ],
    },
  },
  "wrongful-death": {
    en: {
      introduction: [
        "Howard Choi assists families seeking legal help after a fatal accident in Buena Park, Orange County or Los Angeles County. A consultation can begin with the event, the people affected and any request from an insurer. You do not need a finished investigation or a settlement figure to explain what happened and ask which records need attention.",
        "Tell the office if one relative is gathering information for others, if records are still pending or if someone has asked for a signature. A family contact, a person named in estate documents and a person entitled to bring a particular claim may have different roles. Ask Howard to review those roles before anyone assumes they can sign for everyone.",
      ],
      title: "Prepare a family record alongside the accident record",
      label: "Preparing the first conversation",
      paragraphs: [
        "Start the accident file with the location, date, investigating agency and any incident number. Keep available scene images, witness details, medical or death records and insurer letters in their original form. If a document has been requested but not received, keep the request confirmation. Identify what comes from your own observations and what another person has told you. A pending report is a reason to identify the missing information during the consultation.",
        "For the family file, list the relationships involved and gather the records already available about financial support and household contributions. Pay records, recurring transfers, shared expenses and a description of regular childcare or caregiving can help explain the questions the family needs reviewed. Keep funeral invoices with the name of the person who paid them. These materials help organize a discussion of losses. They do not establish that every person or expense qualifies for recovery.",
        "If relatives have received different calls or offers, put the correspondence together before responding. Record who the sender represents, what the offer says it covers and whether there is a stated response date. Ask about the scope of a proposed release, who may act on the claim and any applicable deadline. The family guide below explains the first consultation, while the deadlines guide addresses why waiting for every outstanding record can require a separate legal review.",
      ],
      links: [
        { label: "Preparing for a Buena Park wrongful death consultation", href: "/blogs/buena-park-wrongful-death-attorney" },
        { label: "California injury and wrongful death deadline questions", href: "/blogs/california-personal-injury-deadlines" },
        { label: "The Buena Park office and consultation information", href: "/locations/buena-park" },
      ],
    },
    es: {
      introduction: [
        "Howard Choi ayuda a familias que buscan orientación legal después de un accidente mortal en Buena Park, Orange County o Los Angeles County. La consulta puede empezar por el hecho, las personas afectadas y cualquier solicitud de una aseguradora. No necesita una investigación terminada ni una cifra de acuerdo para explicar lo ocurrido y preguntar qué registros requieren atención.",
        "Avise si un familiar reúne información para los demás, si faltan registros o si alguien ha pedido una firma. El contacto familiar, una persona nombrada en documentos sucesorios y quien puede presentar un reclamo concreto pueden tener funciones diferentes. Pida a Howard que revise esas funciones antes de suponer que alguien puede firmar por todos.",
      ],
      title: "Prepare los registros familiares junto con los del accidente",
      label: "Preparar la primera conversación",
      paragraphs: [
        "Empiece el expediente del accidente con el lugar, la fecha, la agencia investigadora y el número de incidente disponible. Conserve en su formato original las imágenes del lugar, los datos de testigos, los registros médicos o de defunción y las cartas de aseguradoras. Si pidió un documento y aún no lo recibió, guarde la confirmación. Distinga sus observaciones de lo que otra persona le contó. Un informe pendiente permite identificar durante la consulta qué información falta.",
        "Para el expediente familiar, enumere los parentescos y reúna los registros disponibles de apoyo económico y contribuciones al hogar. Los comprobantes de sueldo, transferencias periódicas, gastos compartidos y una descripción del cuidado habitual de niños u otras personas pueden ayudar a explicar las preguntas que necesitan revisión. Guarde las facturas funerarias con el nombre de quien las pagó. Estos materiales organizan la conversación sobre pérdidas. No demuestran que cada persona o gasto reúna los requisitos para recibir compensación.",
        "Si los familiares recibieron llamadas u ofertas diferentes, reúna las comunicaciones antes de responder. Anote a quién representa el remitente, qué dice cubrir la oferta y si indica una fecha de respuesta. Pregunte por el alcance de la liberación propuesta, quién puede actuar en el reclamo y los plazos aplicables. La guía familiar explica la consulta inicial; la guía de plazos aborda por qué esperar todos los documentos pendientes puede requerir una revisión legal separada.",
      ],
      links: [
        { label: "Preparar una consulta por muerte injusta en Buena Park (en inglés)", href: "/blogs/buena-park-wrongful-death-attorney" },
        { label: "Preguntas sobre plazos de California", href: "/blogs/california-personal-injury-deadlines" },
        { label: "La oficina de Buena Park y la consulta", href: "/locations/buena-park" },
      ],
    },
    ko: {
      introduction: [
        "Howard Choi는 Buena Park, Orange County, Los Angeles County에서 사망 사고 후 법률 도움이 필요한 가족을 돕습니다. 상담은 사고 경위, 영향을 받은 가족, 보험사의 요청부터 시작할 수 있습니다. 조사가 끝나거나 합의 금액이 정해지기 전에도 상황을 설명하고 어떤 기록을 먼저 확인해야 하는지 질문할 수 있습니다.",
        "가족 한 분이 다른 가족의 자료를 모으고 있는지, 아직 받지 못한 기록이 있는지, 서명을 요청받았는지 알려 주세요. 가족 연락 담당자, 상속 관련 서류에 기재된 사람, 특정 청구를 제기할 수 있는 사람의 역할은 다를 수 있습니다. 누군가 모두를 대신해 서명할 수 있다고 가정하기 전에 Howard에게 해당 역할의 검토를 요청하세요.",
      ],
      title: "사고 기록과 함께 가족 관련 자료를 준비하세요",
      label: "첫 상담 준비",
      paragraphs: [
        "사고 파일에는 장소, 날짜, 조사 기관, 확인된 사건 번호부터 정리하세요. 확보한 현장 사진, 목격자 정보, 의료·사망 관련 기록, 보험사 편지는 원본 형태로 보관하세요. 요청했지만 아직 받지 못한 문서는 요청 확인서를 보관하세요. 직접 본 내용과 다른 사람에게 들은 내용을 구분하세요. 보고서가 아직 나오지 않았다면 상담에서 어떤 정보가 빠져 있는지 확인할 수 있습니다.",
        "가족 파일에는 관련 가족관계를 적고 현재 확보한 경제적 지원 및 가사 기여 자료를 모으세요. 급여 기록, 정기 송금, 공동 지출, 평소의 육아나 돌봄에 대한 설명은 가족이 검토받고 싶은 문제를 구체화하는 데 도움이 됩니다. 장례비 청구서는 실제 지급한 사람의 이름과 함께 보관하세요. 이런 자료는 손실에 관한 상담을 정리하는 데 도움이 되지만 모든 사람이나 비용의 배상 자격을 입증하는 것은 아닙니다.",
        "가족마다 다른 전화나 제안을 받았다면 답변하기 전에 연락 기록을 모으세요. 발신자가 누구를 대리하는지, 제안이 어떤 손실을 다룬다고 하는지, 답변 기한이 있는지 기록하세요. 합의서의 범위, 청구를 처리할 수 있는 사람, 적용 기한에 관해 질문하세요. 아래 가족 안내는 초기 상담을 설명하고, 기한 안내는 모든 미수령 기록을 기다리는 문제를 별도로 법률 검토해야 하는 이유를 다룹니다.",
      ],
      links: [
        { label: "Buena Park 사망 사고 상담 준비 (영문)", href: "/blogs/buena-park-wrongful-death-attorney" },
        { label: "캘리포니아 상해·사망 사고 청구 기한", href: "/blogs/california-personal-injury-deadlines" },
        { label: "Buena Park 사무실 및 상담 안내", href: "/locations/buena-park" },
      ],
    },
  },
};
