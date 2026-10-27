import { ArrowRight, MapPin, Route, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import ClaimJourney from "@/components/ClaimJourney";
import { EvidenceVisuals, GuideAttorney } from "@/components/ClaimVisuals";
import ClientProof from "@/components/ClientProof";
import PageReviewed from "@/components/PageReviewed";
import cityCarCollision from "@/assets/law-firm/car-collision.jpg";
import cityCollisionDamage from "@/assets/law-firm/collision-damage.jpg";
import cityTruckHighway from "@/assets/law-firm/truck-highway.jpg";
import cityMotorcycleRoad from "@/assets/law-firm/motorcycle-road.jpg";
import cityPedestrianCrossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import citySuburbanPalms from "@/assets/law-firm/suburban-palms.jpg";
import { locationMedia } from "@/data/locationMedia";
import { LocationDetailHighlights } from "@/components/DetailPageHighlights";
import { LocationHubDirectory } from "@/components/HubDirectories";
import { locationGuidesEn } from "@/data/locationGuidesEn";
import { locationGuidesKo } from "@/data/locationGuidesKo";
import { locationGuidesEs } from "@/data/locationGuidesEs";
import { locationFocus } from "@/data/locationFocus";

// Each city gets its own image so ten pages do not share one photo. Chosen to
// echo the collision mix described in that city's localIntro.
const cityImages: Record<string, string> = {
  "buena-park": citySuburbanPalms,
  anaheim: cityPedestrianCrossing,
  fullerton: cityCarCollision,
  "garden-grove": cityCollisionDamage,
  cypress: citySuburbanPalms,
  "la-habra": cityMotorcycleRoad,
  "la-mirada": cityCollisionDamage,
  cerritos: cityTruckHighway,
  norwalk: cityTruckHighway,
  whittier: citySuburbanPalms,
};
import { getServiceLocation, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
import { esLocationContent } from "@/data/esLocationContent";
import { esPracticeContent } from "@/data/esPracticeContent";
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
} from "./editorial/shared";

const locationResources: Record<string, { agency: string; agencyHref: string; court: string; courtHref: string }> = {
  "buena-park": { agency: "Buena Park Police Department", agencyHref: "https://www.bppd.com/", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  anaheim: { agency: "Anaheim Police · Records Bureau", agencyHref: "https://pd.anaheim.net/173/Records", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  fullerton: { agency: "Fullerton Police · Traffic Collision Reports", agencyHref: "https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "garden-grove": { agency: "Garden Grove Police · Records Bureau", agencyHref: "https://ggcity.org/police/rar", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  cypress: { agency: "Cypress Police · Forms & Records", agencyHref: "https://www.cypressca.org/departments/police/forms-documents", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-habra": { agency: "La Habra Police · Records & Traffic", agencyHref: "https://www.lahabraca.gov/398/Contact", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-mirada": { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  cerritos: { agency: "Los Angeles County Sheriff · Cerritos Station", agencyHref: "https://lasd.org/cerritos/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  norwalk: { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  whittier: { agency: "Whittier Police · Records Bureau", agencyHref: "https://www.whittierpd.org/services/services-division/police-records", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
};

/**
 * Real-world/**
 * Real-world *scenarios* and evidence questions, not claims that the firm
 * handled a particular case in a given city. Keep any city references factual.
 * Two contextually useful links rise to the top; all practice pages stay linked.
 */
const cityServiceFocus: Record<string, Record<string, string>> = {
  "buena-park": {
    "car-accidents": "For a collision on Beach Boulevard or near I-5/SR-91, record lane markings, signals and nearby cameras.",
    "pedestrian-accidents": "For a crosswalk or parking-entrance injury, photographs of sightlines and turning traffic can matter.",
  },
  anaheim: {
    "rideshare-accidents": "After an Uber or Lyft ride near the resort district, preserve the trip receipt and driver-app timeline.",
    "pedestrian-accidents": "For a busy crossing near hotels or attractions, document signals, vehicle movements and potential video.",
  },
  fullerton: {
    "pedestrian-accidents": "For an incident near a campus or commuter crossing, preserve signal timing, witnesses and any video.",
    "car-accidents": "For an intersection collision, document the exact approach, lanes and impact location.",
  },
  "garden-grove": {
    "car-accidents": "For a crash along Harbor or Brookhurst, identify the precise intersection and possible storefront video.",
    "slip-and-fall": "For a fall at a business, document the condition, warning signs and who controlled the property.",
  },
  cypress: {
    "car-accidents": "For a crash close to a city boundary, record the exact location and responding agency.",
    "motorcycle-accidents": "For a rider injury, road markings and visibility from each driver's approach can be important.",
  },
  "la-habra": {
    "car-accidents": "For a collision on Whittier Boulevard or Imperial Highway, preserve right-of-way and turning evidence.",
    "motorcycle-accidents": "For a turning-vehicle crash, document lane position and sightlines before the scene changes.",
  },
  "la-mirada": {
    "car-accidents": "For a collision near the county line, confirm the scene location and the agency holding the report.",
    "pedestrian-accidents": "For a walking injury, record crossing conditions, sightlines and potential witnesses.",
  },
  cerritos: {
    "truck-accidents": "For a commercial-vehicle crash on SR-91 or I-605, preserve carrier details and identify CHP records.",
    "car-accidents": "For a freeway collision, note the exact highway segment and investigating agency.",
  },
  norwalk: {
    "car-accidents": "For a collision on I-5, I-605, Firestone or Rosecrans, preserve the roadway and report details.",
    "truck-accidents": "For a collision with a delivery or commercial vehicle, keep company identifiers and witness information.",
  },
  whittier: {
    "pedestrian-accidents": "For a pedestrian injury on a hillside or commercial street, document parked cars and visibility.",
    "motorcycle-accidents": "For a rider injury on a curved or sloping road, photographs from both approaches can matter.",
  },
};

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "서비스 지역" : isEs(locale) ? "Zonas de servicio de lesiones personales" : "Personal injury service areas"}
        title={isKo(locale) ? "Buena Park를 중심으로 인근 지역까지." : isEs(locale) ? "Dónde trabajamos y por qué importa la ciudad." : "Injury Lawyer Serving Buena Park & Nearby Communities"}
        description={isKo(locale)
          ? "Buena Park와 인근 Orange County·Los Angeles County 경계 지역의 사고·개인상해 사건을 지원합니다."
          : isEs(locale)
            ? "Estamos en Beach Blvd en Buena Park y atendemos casos en el norte de Orange County y las ciudades vecinas de Los Angeles County. Cada página local incluye datos de colisiones, la agencia que prepara reportes y el sistema judicial del condado."
            : "Our office is in Buena Park, California. Explore accident and injury guides for ten nearby cities across Orange and Los Angeles counties, with official traffic-safety figures, reporting resources and practical evidence questions for each community."}
        image={heroBoardroom}
      />
      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "지역 · 서비스 범위" : isEs(locale) ? "Ubicaciones · Zona de servicio" : "Locations · Service area"}
        sections={isKo(locale)
          ? [{ id: "areas", label: "서비스 지역" }, { id: "local", label: "지역 중심 접근" }, { id: "visit", label: "상담 시작" }]
          : isEs(locale)
            ? [{ id: "areas", label: "Comunidades atendidas" }, { id: "local", label: "Por qué importa el contexto local" }, { id: "visit", label: "Iniciar una consulta" }]
            : [{ id: "areas", label: "Communities served" }, { id: "local", label: "Why local context matters" }, { id: "visit", label: "Start a consultation" }]}
      >
        <ReadingSectionBlock
          id="areas"
          locale={locale}
          kicker={isKo(locale) ? "01 · 지역" : isEs(locale) ? "01 · Comunidades" : "01 · Communities"}
          title={isKo(locale) ? "가까운 지역 페이지에서 시작하세요." : isEs(locale) ? "Elija la ciudad donde realmente ocurrió." : "Local accident and injury guides for ten communities."}
          intro={isKo(locale)
            ? "각 지역 페이지는 해당 지역에서 사고 이후 확인해야 할 일반적인 문제와 상담 시작 방법을 정리합니다."
            : isEs(locale)
              ? "La ciudad donde vive no hace que un reclamo sea más fuerte o más débil. El lugar exacto del accidente sí puede importar porque determina quién hizo el reporte, qué cámaras estaban cerca y qué condado podría intervenir si se presenta una demanda."
              : "The exact location of a collision helps identify which agency may have handled the report, where witnesses or video might be found, and which legal rules or venues may be relevant. Our single office is in Buena Park; the surrounding cities below are communities we serve, not additional branch offices."}
        >
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-[#1E1C1A]/15 bg-[#EAE4DA] px-5 py-5">
            <div>
              <strong className="text-[13px] font-semibold">{isKo(locale) ? "실제 사무실 · 부에나파크" : isEs(locale) ? "Única oficina física · Buena Park" : "Our only office · Buena Park"}</strong>
              <p className="mt-1 text-[12px] leading-6 text-[#5D5349]">6301 Beach Blvd, Suite 216, Buena Park, CA 90621</p>
            </div>
            <a href={`${localePrefix(locale)}/contact`} className="inline-flex min-h-11 items-center gap-2 text-[12px] font-semibold underline underline-offset-4">
              {isKo(locale) ? "연락처 및 상담" : isEs(locale) ? "Contacto y consulta" : "Contact the Buena Park office"} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <LocationHubDirectory locale={locale} />
          <p className="mt-6 max-w-[760px] text-[12px] leading-6 text-[#675D54]">
            {isKo(locale) ? "교통안전 수치는 각 카드에 표시된 California OTS 연도별 통계이며 개별 사건의 예측치가 아닙니다." : isEs(locale) ? "Las cifras proceden de los reportes de California OTS para el año indicado en cada tarjeta; no predicen el resultado de un caso." : "Collision figures are city-level California Office of Traffic Safety data for the year shown on each card—not forecasts of individual cases. Locations may have different data years."}
          </p>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "02 · 지역성" : isEs(locale) ? "02 · Contexto local" : "02 · Local context"}
          title={isKo(locale) ? "사건은 지역 이름보다 사실과 증거로 결정됩니다." : isEs(locale) ? "El contexto local sirve cuando ayuda a preservar la evidencia correcta." : "Local context is useful when it helps preserve the right evidence."}
          intro={isKo(locale)
            ? "사고 장소, 도로, 관할기관, 치료 동선과 보험 문제는 사건 준비에 실제 영향을 줄 수 있습니다."
            : isEs(locale)
              ? "La escena, carretera o propiedad, la agencia que respondió, cámaras cercanas, tratamiento, condado y seguro disponible pueden cambiar cómo se documenta un reclamo por lesiones. Por eso cada página local se concentra en hechos prácticos."
              : "The scene, roadway or property, responding agency, nearby cameras, treatment path, county, and available insurance can all shape how an injury claim is documented. That is why each local page focuses on practical facts instead of repeating the same city description."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[MapPin, Route, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사고 장소", "이동·치료", "보험·책임"][index] : isEs(locale) ? ["Lugar exacto del incidente", "Tratamiento y registros", "Cobertura y responsabilidad"][index] : ["Exact incident location", "Treatment & records", "Coverage & responsibility"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사고가 발생한 정확한 위치와 관련 기록을 확인합니다.", "치료 과정과 이동, 의료기록을 정리합니다.", "적용 가능한 보험과 책임 관계를 확인합니다."][index]
                    : isEs(locale)
                      ? ["Precise la carretera, intersección, negocio, propiedad u otro lugar donde pueda existir evidencia.", "Mantenga organizados tratamiento, expedientes médicos, gastos, pérdida laboral y recuperación.", "Identifique conductores, propietarios, negocios, empleadores, pólizas y otras relaciones que puedan importar."][index]
                      : ["Pin down the roadway, intersection, business, property, or other place where evidence may exist.", "Keep treatment, medical records, expenses, work loss, and recovery information organized.", "Identify the drivers, owners, businesses, employers, policies, and other relationships that may matter."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="visit"
          locale={locale}
          kicker={isKo(locale) ? "03 · 상담" : isEs(locale) ? "03 · Consulta" : "03 · Consultation"}
          title={isKo(locale) ? "현재 상황부터 설명해 주세요." : isEs(locale) ? "No necesita tener todos los registros antes de iniciar la conversación." : "You do not need every record before starting the conversation."}
          intro={isKo(locale) ? "사고 장소, 날짜, 치료 상황과 현재 가지고 있는 보험 또는 사고 관련 문서를 알려주시면 됩니다." : isEs(locale) ? "El lugar y fecha del accidente, tratamiento actual, información de seguro, fotos, reportes y cualquier comunicación que ya tenga son suficientes para empezar." : "The accident location and date, current treatment, insurance information, photos, reports, and any communication you already have are enough to begin. The legal team can help identify what else may be worth preserving."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  if (!location) return null;

  const esCopy = esLocationContent[location.slug];
  const name = isKo(locale) ? location.koName : location.name;
  const description = isKo(locale) ? location.koDescription : isEs(locale) ? (esCopy?.description || location.description) : location.description;
  const localIntro = isKo(locale) ? location.koLocalIntro : isEs(locale) ? (esCopy?.localIntro || location.localIntro) : location.localIntro;
  const statLabel = isKo(locale) ? `${location.ots.year} 교통안전 통계` : isEs(locale) ? `Datos de colisiones de California OTS · ${location.ots.year}` : `${location.ots.year} California OTS collision data`;
  const resource = locationResources[location.slug];
  const localGuide = locale === "ko" ? locationGuidesKo[location.slug] : locale === "es" ? locationGuidesEs[location.slug] : locationGuidesEn[location.slug];
  const localFocus = locationFocus[location.slug];

  const isBuenaPark = location.slug === "buena-park";
  const heroTitle = isKo(locale)
    ? (isBuenaPark ? "부에나파크 사고·상해 가이드" : `${name} 개인상해 변호사`)
    : isEs(locale)
      ? (isBuenaPark ? "Guía de accidentes y lesiones en Buena Park" : `Abogado de lesiones personales en ${name}`)
      : (isBuenaPark ? "Buena Park Accident & Injury Guide" : `${name} Personal Injury Lawyer`);

  return (
    <EditorialFrame locale={locale}>
      <main className="detail-guide">
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "서비스 지역" : isEs(locale) ? `${location.county} · Zona de servicio` : `${location.county} · Service area`}
          title={heroTitle}
          description={isBuenaPark && !isKo(locale) && !isEs(locale)
            ? "A practical local guide to Buena Park collision data, accident records, evidence preservation, California deadlines, and the injury matters handled from the firm's Buena Park office."
            : isBuenaPark && isEs(locale)
              ? "Una guía práctica con datos de colisiones de Buena Park, registros de accidentes, preservación de evidencia, plazos de California y los asuntos de lesiones atendidos desde la oficina de Buena Park."
              : description}
          image={locationMedia[location.slug]?.src ?? cityImages[location.slug] ?? heroJustice}
          imageAlt={locationMedia[location.slug]?.alt || `${name}, California`}
          imageFallback={cityImages[location.slug] ?? heroJustice}
          detail
        />
        <LocationDetailHighlights
          locale={locale}
          name={name}
          county={location.county}
          year={location.ots.year}
          total={location.ots.total}
          agency={resource.agency}
          dataHref={location.ots.source}
        />
        <ClaimJourney locale={locale} subject={name} guideId="overview" contextImage={cityImages[location.slug]} />
        <GuideAttorney locale={locale} />
        <ReadingLayout
          locale={locale}
          label={`${name} · ${isKo(locale) ? "지역 안내" : isEs(locale) ? "Guía local de lesiones" : "Local injury guide"}`}
          sections={isKo(locale)
            ? [
                { id: "overview", label: "지역 안내" }, { id: "data", label: "교통사고 통계" }, { id: "records", label: "지역 기록" },
                { id: "cases", label: "사건 유형" }, { id: "evidence", label: "증거" }, { id: "deadlines", label: "기한" },
                { id: "faq", label: "자주 묻는 질문" }, { id: "nearby", label: "인근 지역" },
              ]
            : isEs(locale)
              ? [
                  { id: "overview", label: "Panorama local" }, { id: "data", label: "Datos de colisiones" }, { id: "records", label: "Registros y agencias" },
                  { id: "cases", label: "Asuntos atendidos" }, { id: "evidence", label: "Evidencia a preservar" }, { id: "deadlines", label: "Plazos de California" },
                  { id: "faq", label: "Preguntas locales" }, { id: "nearby", label: "Comunidades cercanas" },
                ]
              : [
                  { id: "overview", label: "Local overview" }, { id: "data", label: "Local collision data" }, { id: "records", label: "Local records & agencies" },
                  { id: "cases", label: "Matters handled" }, { id: "evidence", label: "Evidence to preserve" }, { id: "deadlines", label: "California deadlines" },
                  { id: "faq", label: "Local claim questions" }, { id: "nearby", label: "Nearby communities" },
                ]}
        >
          <ReadingSectionBlock
            id="overview"
            locale={locale}
            kicker={isKo(locale) ? "01 · 지역" : isEs(locale) ? "01 · Panorama local" : "01 · Local overview"}
            title={isKo(locale) ? `${name}에서 사고가 발생했다면` : isEs(locale) ? `Si ocurrió un accidente en ${name} o cerca.` : `If an accident happened in or around ${name}.`}
            intro={localIntro}
          >
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="data"
            locale={locale}
            kicker={isKo(locale) ? "02 · 데이터" : isEs(locale) ? "02 · Datos locales" : "02 · Local data"}
            title={isKo(locale) ? statLabel : isEs(locale) ? `Lesiones por colisiones en ${name}, en contexto.` : `${name} collision injuries in context.`}
            intro={isKo(locale)
              ? "California Office of Traffic Safety의 도시별 통계는 지역에서 발생한 교통사고의 규모를 이해하는 데 참고가 됩니다."
              : isEs(locale)
                ? `California Office of Traffic Safety reportó ${location.ots.total.toLocaleString()} personas fallecidas o lesionadas en colisiones de tráfico en ${name} durante ${location.ots.year}. El mismo conjunto registró ${location.ots.motorcycles} víctimas en motocicleta, ${location.ots.pedestrians} peatones y ${location.ots.bicyclists} ciclistas. Estas cifras ofrecen contexto local y no predicen ningún caso individual.`
                : `California's Office of Traffic Safety reported ${location.ots.total.toLocaleString()} people killed or injured in traffic collisions in ${name} in ${location.ots.year}. The same dataset recorded ${location.ots.motorcycles} motorcycle victims, ${location.ots.pedestrians} pedestrian victims, and ${location.ots.bicyclists} bicyclist victims. These citywide numbers do not predict any individual case; they provide local safety context.`}
          >
            <div className="grid border-y border-[#1E1C1A]/12 sm:grid-cols-3">
              <div className="py-6 sm:pr-6"><div className="editorial-serif text-[2.1rem]">{location.ots.total.toLocaleString()}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "사망·부상 피해자" : isEs(locale) ? "Víctimas fallecidas o lesionadas" : "Killed or injured victims"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:px-6"><div className="editorial-serif text-[2.1rem]">{location.ots.speed}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "과속 관련 사고" : isEs(locale) ? "Colisiones con lesión/muerte relacionadas con velocidad" : "Speed-related fatal/injury collisions"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:pl-6"><div className="editorial-serif text-[2.1rem]">{location.ots.hitRun}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "뺑소니 관련 사고" : isEs(locale) ? "Colisiones con lesión/muerte por atropello y fuga" : "Hit-and-run fatal/injury collisions"}</div></div>
            </div>
            <a href={location.ots.source} target="_blank" rel="noreferrer" className="editorial-inline-link mt-5"><span>{isKo(locale) ? "California OTS 데이터 보기" : isEs(locale) ? "Ver datos de California OTS" : "View the California OTS city data"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="records"
            locale={locale}
            kicker={isKo(locale) ? "03 · 지역 기록" : isEs(locale) ? "03 · Registros locales" : "03 · Local records"}
            title={isKo(locale) ? "사고 기록은 정확한 관할기관에서 시작됩니다." : isEs(locale) ? `Recursos oficiales locales para un incidente en ${name}.` : `Official local resources for an incident in ${name}.`}
            intro={localGuide.records}
          >
            <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-2">
              <a href={resource.agencyHref} target="_blank" rel="noreferrer" className="group border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:pr-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/34">{isKo(locale) ? "경찰·기록" : isEs(locale) ? "Policía / registros" : "Police / records"}</div>
                <div className="mt-5 flex items-center justify-between gap-4 text-[13px]"><span>{resource.agency}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
              </a>
              <a href={resource.courtHref} target="_blank" rel="noreferrer" className="group py-6 md:border-l md:border-[#1E1C1A]/12 md:pl-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/34">{isKo(locale) ? "카운티 법원" : isEs(locale) ? "Recurso del tribunal del condado" : "County court resource"}</div>
                <div className="mt-5 flex items-center justify-between gap-4 text-[13px]"><span>{resource.court}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
              </a>
            </div>
            <div className="mt-7 border-t border-[#1E1C1A]/12 pt-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/50">{isKo(locale) ? "공식 기관 원문" : isEs(locale) ? "Fuentes oficiales" : "Original government sources"}</p>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {locationGuidesEn[location.slug].sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] leading-6 underline underline-offset-4 hover:text-[#806049]">
                    <span>{source.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="cases"
            locale={locale}
            kicker={isKo(locale) ? "04 · 사건" : isEs(locale) ? "04 · Asuntos" : "04 · Matters"}
            title={isKo(locale) ? `${name} 사고 유형별 자료 안내` : isEs(locale) ? `Guías según el tipo de lesión en ${name}.` : `Injury-claim guides relevant to ${name}.`}
            intro={localFocus.intro[locale]}
          >
            <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
              {practiceAreas.filter((practice) => localFocus.practices.includes(practice.slug))
                .sort((a, b) => localFocus.practices.indexOf(a.slug) - localFocus.practices.indexOf(b.slug))
                .map((practice) => {
                const practiceEs = esPracticeContent[practice.slug];
                const localServiceContext = locale === "en" ? cityServiceFocus[location.slug]?.[practice.slug] : undefined;
                return (
                  <a key={practice.slug} href={`${localePrefix(locale)}/practice-areas/${practice.slug}`} className="group flex items-start justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 sm:even:border-l sm:even:pl-6">
                    <span className="min-w-0">
                      <span className="block text-[13px]">{isKo(locale) ? practice.koTitle : isEs(locale) ? (practiceEs?.shortTitle || practice.title) : practice.title}</span>
                      <span className="mt-1 block text-[11px] leading-5 text-[#1E1C1A]/55">{localServiceContext || (isKo(locale) ? practice.koIssues[0] : isEs(locale) ? (practiceEs?.issues[0] || practice.issues[0]) : practice.issues[0])}</span>
                    </span>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#1E1C1A]/35 transition-transform group-hover:translate-x-1" />
                  </a>
                );
              })}
            </div>
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-inline-link mt-7"><span>{isKo(locale) ? "업무 분야 보기" : isEs(locale) ? "Ver todas las áreas de lesiones personales" : "See all personal injury practice areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="evidence"
            locale={locale}
            kicker={isKo(locale) ? "05 · 증거" : isEs(locale) ? "05 · Evidencia" : "05 · Evidence"}
            title={isKo(locale) ? "지역 기록과 사고 기록을 함께 보관하세요." : isEs(locale) ? `Registros útiles después de un accidente en ${name}.` : `Useful records after an accident in ${name}.`}
            intro={localGuide.evidence}
          ><EvidenceVisuals locale={locale} /></ReadingSectionBlock>

          <ReadingSectionBlock
            id="deadlines"
            locale={locale}
            kicker={isKo(locale) ? "06 · 기한" : isEs(locale) ? "06 · Plazos de California" : "06 · California deadlines"}
            title={isKo(locale) ? `${name} 사고에 적용되는 법적 기한` : isEs(locale) ? `¿Qué plazos podrían aplicarse en ${name}?` : `Which legal deadlines may apply in ${name}?`}
            intro={localGuide.deadlines}
          >
            <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="editorial-inline-link"><span>{isKo(locale) ? "California Courts 기한 안내" : isEs(locale) ? "California Courts · Plazos legales" : "California Courts · Statutes of limitations"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="faq"
            locale={locale}
            kicker={isKo(locale) ? "07 · 질문" : isEs(locale) ? "07 · Preguntas locales" : "07 · Local claim questions"}
            title={isKo(locale) ? `${name} 사고 이후 자주 묻는 질문` : isEs(locale) ? `Preguntas prácticas después de un accidente en ${name}.` : `Practical questions after an accident in ${name}.`}
          >
            <div className="border-t border-[#1E1C1A]/12">
              {localGuide.faqs.map(([question, answer], index) => (
                <div key={question} className="border-b border-[#1E1C1A]/12 py-6"><div className="flex gap-4"><span className="text-[10px] text-[#1E1C1A]/30">0{index + 1}</span><div><h3 style={serifStyle(locale)} className="text-[1.25rem] leading-tight">{question}</h3><p className="mt-3 max-w-[720px] text-[12px] leading-6 text-[#1E1C1A]/54">{answer}</p></div></div></div>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="nearby" locale={locale} kicker={isKo(locale) ? "08 · 인근" : isEs(locale) ? "08 · Cerca" : "08 · Nearby"} title={isKo(locale) ? "인근 서비스 지역" : isEs(locale) ? "Comunidades cercanas atendidas." : "Nearby communities served."}>
            <div className="editorial-link-grid">
              {serviceLocations.filter((item) => localFocus.nearby.includes(item.slug))
                .sort((a, b) => localFocus.nearby.indexOf(a.slug) - localFocus.nearby.indexOf(b.slug))
                .map((item) => (
                <a key={item.slug} href={`${localePrefix(locale)}/locations/${item.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koName : item.name}</h3>
                  <p>{isKo(locale) ? item.koDescription : isEs(locale) ? (esLocationContent[item.slug]?.description || item.description) : item.description}</p>
                </a>
              ))}
            </div>
          </ReadingSectionBlock>
        </ReadingLayout>
        <div className="site-shell pb-12"><PageReviewed locale={locale} /></div>
        <ClientProof locale={locale} city={isKo(locale) ? location.koName : location.name} />
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
