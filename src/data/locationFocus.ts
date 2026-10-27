/** Curated local subject matter: link to relevant claim information without
 * implying any incident occurred, or that this law firm handled a given case.
 * The full set of practice areas remains one click away in the hub.
 */
export const locationFocus: Record<string, {
  practices: string[];
  nearby: string[];
  intro: { en: string; ko: string; es: string };
}> = {
  "buena-park": {
    practices: ["car-accidents", "pedestrian-accidents", "rideshare-accidents", "slip-and-fall"],
    nearby: ["anaheim", "fullerton", "cypress", "la-mirada"],
    intro: {
      en: "A Beach Boulevard collision, visitor-area crossing and shopping-center fall involve different evidence. These guides separate roadway fault, insurance and property-control questions without assuming every incident is a car crash.",
      ko: "Beach Boulevard의 차량 충돌, 관광지 인근 보행자 사고, 쇼핑시설 낙상은 필요한 자료가 다릅니다. 사고 유형에 맞는 책임·보험·부지관리 쟁점을 구분해 살펴보세요.",
      es: "Un choque en Beach Boulevard, un cruce peatonal y una caída en un comercio requieren pruebas diferentes. Estas guías separan responsabilidad vial, seguros y control del inmueble.",
    },
  },
  anaheim: {
    practices: ["rideshare-accidents", "pedestrian-accidents", "car-accidents", "truck-accidents"],
    nearby: ["fullerton", "buena-park", "garden-grove", "la-habra"],
    intro: {
      en: "Near Anaheim's hotels and attractions, the key distinction may be a rideshare app status, a shuttle operator, a pedestrian signal or ordinary driver fault. Start with the matching type of claim.",
      ko: "애너하임 호텔·관광지 주변 사고는 승차공유 앱 상태, 셔틀 운영사, 보행자 신호 또는 운전자 과실이 핵심일 수 있습니다. 실제 사고 유형에 해당하는 안내를 선택하세요.",
      es: "En zonas hoteleras y turísticas de Anaheim, pueden importar el estado de la aplicación de viaje, el operador de transporte, la señal peatonal o la culpa del conductor.",
    },
  },
  fullerton: {
    practices: ["pedestrian-accidents", "car-accidents", "motorcycle-accidents", "serious-injuries"],
    nearby: ["anaheim", "buena-park", "la-habra", "la-mirada"],
    intro: {
      en: "Fullerton incidents can raise school-area crossing, commuter intersection and longer-term medical or academic-loss questions. Match the evidence to the actual roadway and injury rather than the city's name.",
      ko: "풀러턴에서는 학교 주변 횡단, 통근 교차로, 장기 치료 및 실제 학업 손실 기록이 중요할 수 있습니다. 도시명보다 사고 지점과 부상 유형을 기준으로 안내를 선택하세요.",
      es: "Los cruces cerca de escuelas, las intersecciones de tránsito y las posibles pérdidas académicas o médicas requieren pruebas adaptadas al hecho concreto.",
    },
  },
  "garden-grove": {
    practices: ["car-accidents", "slip-and-fall", "pedestrian-accidents", "motorcycle-accidents"],
    nearby: ["anaheim", "cypress", "buena-park", "fullerton"],
    intro: {
      en: "A turning collision along a commercial corridor and a fall inside a business have different records. Choose a roadway or premises guide based on where the event happened and who controlled the area.",
      ko: "상업도로의 회전 충돌과 매장 내부 낙상은 기록과 책임 판단이 다릅니다. 실제 사건이 도로에 있었는지 사업장 안에 있었는지를 먼저 구분하세요.",
      es: "Un giro conflictivo en una avenida comercial y una caída dentro de una tienda no se investigan igual. Distinga la vía pública del espacio controlado por un negocio.",
    },
  },
  cypress: {
    practices: ["car-accidents", "motorcycle-accidents", "pedestrian-accidents", "slip-and-fall"],
    nearby: ["buena-park", "garden-grove", "cerritos", "la-mirada"],
    intro: {
      en: "For collisions near a Cypress boundary, establishing the exact incident location and responding agency comes before assumptions about fault or a courthouse. Car, motorcycle and walking injuries require different scene details.",
      ko: "사이프러스 경계 지역 사고는 책임이나 법원을 추정하기 전에 정확한 장소와 출동 기관을 확인해야 합니다. 자동차·오토바이·보행자 사고별로 필요한 현장 자료가 다릅니다.",
      es: "Cerca de un límite municipal de Cypress, primero hay que fijar la ubicación real y la agencia que respondió; después se estudian el tipo de lesión y las pruebas.",
    },
  },
  "la-habra": {
    practices: ["car-accidents", "motorcycle-accidents", "pedestrian-accidents", "serious-injuries"],
    nearby: ["fullerton", "la-mirada", "whittier", "buena-park"],
    intro: {
      en: "An Imperial Highway or Whittier Boulevard dispute may turn on lane movements, turning signals or rider visibility. These topics are separate from deciding which county's procedure might apply to a later lawsuit.",
      ko: "Imperial Highway나 Whittier Boulevard 사고는 차선 이동, 회전 신호와 이륜차 시야가 쟁점이 될 수 있습니다. 소송 법원 문제는 사고 책임 판단과 별도로 확인해야 합니다.",
      es: "En Imperial Highway o Whittier Boulevard pueden importar giros, señales, carriles y visibilidad de motociclistas; el tribunal competente se determina por otros factores.",
    },
  },
  "la-mirada": {
    practices: ["car-accidents", "pedestrian-accidents", "slip-and-fall", "rideshare-accidents"],
    nearby: ["buena-park", "la-habra", "norwalk", "cerritos"],
    intro: {
      en: "La Mirada injuries often start with two separate questions: who controlled the road or property, and which Los Angeles County agency holds the incident record. The claim type then determines the relevant insurance and evidence.",
      ko: "라미라다에서는 도로나 건물을 누가 관리했는지와 어떤 LA 카운티 기관이 기록을 보관하는지를 구분하는 것이 중요합니다. 그다음 사고 유형별 보험과 증거를 확인하세요.",
      es: "En La Mirada conviene separar quién controlaba la vía o propiedad de qué organismo del condado conserva el expediente. El tipo de reclamo determina las pruebas restantes.",
    },
  },
  cerritos: {
    practices: ["truck-accidents", "car-accidents", "slip-and-fall", "motorcycle-accidents"],
    nearby: ["norwalk", "cypress", "la-mirada", "buena-park"],
    intro: {
      en: "A commercial vehicle collision on SR-91 or I-605 and an injury at a Cerritos shopping center require entirely different records. Choose between carrier, freeway and premises evidence before deciding what to request.",
      ko: "91번·605번 고속도로의 상업용 차량 사고와 세리토스 쇼핑시설 부상은 필요한 자료가 다릅니다. 운송회사·CHP 기록과 부지관리 자료를 사건에 맞게 구분하세요.",
      es: "Un choque comercial en SR-91 o I-605 y una lesión en un centro comercial exigen documentos distintos: del transportista, de CHP o de la propiedad.",
    },
  },
  norwalk: {
    practices: ["car-accidents", "truck-accidents", "pedestrian-accidents", "rideshare-accidents"],
    nearby: ["la-mirada", "cerritos", "whittier", "buena-park"],
    intro: {
      en: "In Norwalk, a surface-street collision, freeway crash and transit-area incident can involve different investigating or property agencies. The useful injury guide depends on the actual vehicle, setting and responsible parties.",
      ko: "노워크의 시내 도로 충돌, 고속도로 사고, 교통시설 주변 부상은 조사 또는 시설관리 기관이 다를 수 있습니다. 차량·장소·책임 당사자에 맞춰 자료를 확인하세요.",
      es: "Un choque en la calle, uno en autopista y un incidente junto a una instalación de transporte pueden involucrar agencias distintas en Norwalk.",
    },
  },
  whittier: {
    practices: ["pedestrian-accidents", "motorcycle-accidents", "car-accidents", "serious-injuries"],
    nearby: ["la-habra", "norwalk", "la-mirada", "fullerton"],
    intro: {
      en: "A Whittier hillside visibility dispute differs from a crossing incident on a commercial street. The claim may depend on road curvature, parked vehicles, rider position and which law-enforcement agency served the scene.",
      ko: "휘티어 언덕길 시야 분쟁과 상업거리 횡단보도 사고는 다른 증거를 요구합니다. 도로 굴곡, 주차 차량, 운전자·보행자의 위치와 담당 기관을 살펴보세요.",
      es: "Una disputa de visibilidad en una calle inclinada de Whittier exige pruebas distintas de un cruce comercial: curvas, vehículos estacionados y posiciones de los implicados.",
    },
  },
};
