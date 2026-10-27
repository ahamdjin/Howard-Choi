import type { SiteLocale } from "./injurySite";

/** Same city scenarios in EN/KO/ES, with no unsupported claim of cases handled. */
type Context = Record<SiteLocale, string>;
export const locationPracticeContexts: Record<string, Record<string, Context>> = {
  "buena-park": {
    "car-accidents": { en: "For a collision on Beach Boulevard or near I-5/SR-91, record lane markings, signals and nearby cameras.", ko: "Beach Boulevard나 5번·91번 고속도로 인근 충돌에서는 차선 표시, 신호와 주변 카메라 위치를 기록하세요.", es: "Si hubo un choque en Beach Boulevard o cerca de I-5/SR-91, anote carriles, semáforos y posibles cámaras." },
    "pedestrian-accidents": { en: "For a crosswalk or parking-entrance injury, photographs of sightlines and turning traffic can matter.", ko: "횡단보도나 주차장 진출입로 보행자 사고에서는 시야와 회전 차량을 보여주는 사진이 중요할 수 있습니다.", es: "En un cruce o entrada de aparcamiento, pueden importar fotos de visibilidad y vehículos que giraban." },
  },
  anaheim: {
    "rideshare-accidents": { en: "After an Uber or Lyft ride near the resort district, preserve the trip receipt and driver-app timeline.", ko: "관광지 인근 우버·리프트 운행 사고에서는 탑승 영수증과 운전자의 앱 상태를 보여주는 기록을 보존하세요.", es: "Tras un viaje de Uber o Lyft cerca de los hoteles, conserve el recibo y la secuencia de estados de la aplicación." },
    "pedestrian-accidents": { en: "For a busy crossing near hotels or attractions, document signals, vehicle movements and potential video.", ko: "호텔이나 관광시설 근처 혼잡한 횡단보도 사고에서는 신호, 차량 움직임과 영상 가능성을 기록하세요.", es: "En un cruce transitado cerca de hoteles o atracciones, registre señales, movimientos de vehículos y posibles videos." },
  },
  fullerton: {
    "pedestrian-accidents": { en: "For an incident near a campus or commuter crossing, preserve signal timing, witnesses and any video.", ko: "학교나 통근 횡단구간 사고에서는 신호 시각, 목격자와 가능한 영상을 보존하세요.", es: "Cerca de un campus o cruce de viajeros, preserve horarios de señales, testigos y posibles grabaciones." },
    "car-accidents": { en: "For an intersection collision, document the exact approach, lanes and impact location.", ko: "교차로 충돌에서는 양측의 진입 방향과 차선, 정확한 충돌 지점을 기록하세요.", es: "En un choque de intersección, documente la aproximación, los carriles y el lugar exacto del impacto." },
  },
  "garden-grove": {
    "car-accidents": { en: "For a crash along Harbor or Brookhurst, identify the precise intersection and possible storefront video.", ko: "Harbor나 Brookhurst 도로 충돌에서는 정확한 교차로와 상점 영상의 존재 여부를 확인하세요.", es: "En Harbor o Brookhurst, identifique la intersección exacta y si algún negocio conserva video." },
    "slip-and-fall": { en: "For a fall at a business, document the condition, warning signs and who controlled the property.", ko: "사업장 낙상에서는 위험 상태와 경고 표시, 실제 부지 관리자를 기록하세요.", es: "En una caída en un negocio, documente el peligro, los avisos y quién controlaba el inmueble." },
  },
  cypress: {
    "car-accidents": { en: "For a crash close to a city boundary, record the exact location and responding agency.", ko: "시 경계 인근 사고에서는 정확한 위치와 실제 출동 기관을 기록하세요.", es: "Cerca de un límite municipal, registre la ubicación exacta y la agencia que acudió." },
    "motorcycle-accidents": { en: "For a rider injury, road markings and visibility from each driver's approach can be important.", ko: "오토바이 부상에서는 도로 표시와 양측 차량 진입 방향의 시야가 중요할 수 있습니다.", es: "En una lesión de motociclista, pueden importar las marcas viales y la visibilidad desde ambos accesos." },
  },
  "la-habra": {
    "car-accidents": { en: "For a collision on Whittier Boulevard or Imperial Highway, preserve right-of-way and turning evidence.", ko: "Whittier Boulevard나 Imperial Highway 충돌에서는 우선통행과 회전 상황의 증거를 보관하세요.", es: "En Whittier Boulevard o Imperial Highway, conserve pruebas de prioridad de paso y giros." },
    "motorcycle-accidents": { en: "For a turning-vehicle crash, document lane position and sightlines before the scene changes.", ko: "회전 차량과의 사고에서는 현장 상황이 바뀌기 전에 차선 위치와 시야를 기록하세요.", es: "En un choque por giro, documente la posición de carril y las líneas de visión antes de que cambie la escena." },
  },
  "la-mirada": {
    "car-accidents": { en: "For a collision near the county line, confirm the scene location and the agency holding the report.", ko: "카운티 경계 근처 충돌에서는 사고 위치와 보고서를 보관하는 기관을 확인하세요.", es: "En un choque cerca del límite del condado, confirme el lugar y la agencia que conserva el informe." },
    "pedestrian-accidents": { en: "For a walking injury, record crossing conditions, sightlines and potential witnesses.", ko: "보행자 부상에서는 횡단 상황, 시야와 목격자 정보를 기록하세요.", es: "En una lesión peatonal, registre las condiciones del cruce, visibilidad y testigos." },
  },
  cerritos: {
    "truck-accidents": { en: "For a commercial-vehicle crash on SR-91 or I-605, preserve carrier details and identify CHP records.", ko: "91번 또는 605번 고속도로 상업용 차량 사고에서는 운송회사 정보와 CHP 기록을 확인하세요.", es: "En SR-91 o I-605, preserve los datos del transportista y averigüe si CHP investigó." },
    "car-accidents": { en: "For a freeway collision, note the exact highway segment and investigating agency.", ko: "고속도로 충돌에서는 정확한 구간과 조사 기관을 기록하세요.", es: "En un choque de autopista, anote el tramo exacto y la agencia investigadora." },
  },
  norwalk: {
    "car-accidents": { en: "For a collision on I-5, I-605, Firestone or Rosecrans, preserve the roadway and report details.", ko: "5번·605번 고속도로 또는 Firestone·Rosecrans 사고에서는 도로와 보고서 정보를 보존하세요.", es: "En I-5, I-605, Firestone o Rosecrans, conserve la ubicación vial y los datos del reporte." },
    "truck-accidents": { en: "For a collision with a delivery or commercial vehicle, keep company identifiers and witness information.", ko: "배송·상업용 차량 충돌에서는 회사 식별정보와 목격자 자료를 보존하세요.", es: "Si intervino un vehículo de reparto o comercial, guarde los datos de la empresa y de los testigos." },
  },
  whittier: {
    "pedestrian-accidents": { en: "For a pedestrian injury on a hillside or commercial street, document parked cars and visibility.", ko: "언덕길이나 상업거리 보행자 사고에서는 주차된 차량과 시야를 기록하세요.", es: "En una lesión peatonal en una calle inclinada o comercial, registre vehículos estacionados y visibilidad." },
    "motorcycle-accidents": { en: "For a rider injury on a curved or sloping road, photographs from both approaches can matter.", ko: "곡선·경사 도로의 오토바이 부상에서는 양측 접근 방향의 사진이 중요할 수 있습니다.", es: "En una lesión de motociclista en una curva o pendiente, pueden importar fotografías desde ambos sentidos." },
  },
};
