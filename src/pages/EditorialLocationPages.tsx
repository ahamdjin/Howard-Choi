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

const cityFaq: Record<string, { q: string; a: string }> = {
  "buena-park": {
    q: "The crash was on Beach Blvd. Does that change anything?",
    a: "Beach Blvd is a city street, so Buena Park PD normally works it, and the speeds there tend to be higher than people expect for a surface road. That matters because injury severity drives the claim far more than vehicle damage does.",
  },
  anaheim: {
    q: "I was hit by a hotel shuttle or a rideshare near the resort. Who pays?",
    a: "Not necessarily the driver. A shuttle usually means a commercial policy, and a rideshare means the answer depends on what the app said at that moment. Both are worth sorting out before you talk to anyone's insurer. Our Uber and Lyft page walks through the app-status problem in detail.",
  },
  fullerton: {
    q: "I am a student. Does missing class count for anything?",
    a: "Yes, and people leave it out. A delayed graduation, a dropped semester, a lost internship, those are real losses even though no paycheck stopped. Write down what the injury cost you academically, not just what it cost you medically.",
  },
  "garden-grove": {
    q: "Is anyone likely to have video of my crash?",
    a: "Often, yes. Harbor and Brookhurst are lined with small businesses and most have a camera pointed somewhere near the street. The catch is those systems overwrite themselves in days. If you think a shop saw it, say so early.",
  },
  cypress: {
    q: "It happened near the Los Alamitos line. Does that matter?",
    a: "It can. Which side of the line you were on decides which agency responded and, if a lawsuit follows, which courthouse. Worth pinning down the exact spot rather than the nearest cross street.",
  },
  "la-habra": {
    q: "The other driver was just passing through on Whittier Blvd. Does that complicate it?",
    a: "Not really, though it is common here. Out-of-area drivers mean out-of-area insurers and sometimes slower responses. Where the driver lives does not change your deadline or where the case would be filed.",
  },
  "la-mirada": {
    q: "I assumed my case works like an Orange County case. Does it?",
    a: "La Mirada is Los Angeles County, so no, not always. It borders Orange County closely enough that people get this wrong regularly. The county decides the courthouse and some of the local procedure.",
  },
  cerritos: {
    q: "I was hit on the 91 or the 605. Who has that report?",
    a: "Freeway collisions are CHP, not the city. That is a different records request than a surface-street crash, and the report can take longer to come back. Start it early rather than waiting until you need it.",
  },
  norwalk: {
    q: "Does my case go to the Norwalk courthouse?",
    a: "Possibly. Norwalk has one of the LA County courthouses, which surprises people who assume everything goes downtown. Where a case actually gets filed depends on the facts, not the nearest building.",
  },
  whittier: {
    q: "It happened on one of the hill streets. Is that different?",
    a: "The hill streets have limited sight lines and cars parked tight to the curb, so pedestrian and backing collisions look different here than on a flat commercial road. Photographs of the sight line matter more than usual. Our pedestrian accident page covers how those get argued.",
  },
};

const locationResources: Record<string, { agency: string; agencyHref: string; court: string; courtHref: string }> = {
  "buena-park": { agency: "Buena Park Police Department", agencyHref: "https://www.bppd.com/", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  anaheim: { agency: "Anaheim Police · Records Bureau", agencyHref: "https://pd.anaheim.net/173/Records", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  fullerton: { agency: "Fullerton Police · Traffic Collision Reports", agencyHref: "https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "garden-grove": { agency: "Garden Grove Police · Records Bureau", agencyHref: "https://ggcity.org/police/rar", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  cypress: { agency: "Cypress Police · Forms & Records", agencyHref: "https://www.cypressca.org/departments/police/forms-documents", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-habra": { agency: "La Habra Police · Operations & Services", agencyHref: "https://www.lahabraca.gov/396/Operations-Services", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-mirada": { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  cerritos: { agency: "Los Angeles County Sheriff · Cerritos Station", agencyHref: "https://lasd.org/cerritos/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  norwalk: { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  whittier: { agency: "Whittier Police · Police & Collision Reports", agencyHref: "https://www.cityofwhittier.org/how-do-i/request", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
};

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "서비스 지역" : "Personal injury service areas"}

const locationResources: Record<string, { agency: string; agencyHref: string; court: string; courtHref: string }> = {
  "buena-park": { agency: "Buena Park Police Department", agencyHref: "https://www.bppd.com/", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  anaheim: { agency: "Anaheim Police · Records Bureau", agencyHref: "https://pd.anaheim.net/173/Records", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  fullerton: { agency: "Fullerton Police · Traffic Collision Reports", agencyHref: "https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "garden-grove": { agency: "Garden Grove Police · Records Bureau", agencyHref: "https://ggcity.org/police/rar", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  cypress: { agency: "Cypress Police · Forms & Records", agencyHref: "https://www.cypressca.org/departments/police/forms-documents", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-habra": { agency: "La Habra Police · Operations & Services", agencyHref: "https://www.lahabraca.gov/396/Operations-Services", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-mirada": { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  cerritos: { agency: "Los Angeles County Sheriff · Cerritos Station", agencyHref: "https://lasd.org/cerritos/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  norwalk: { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  whittier: { agency: "Whittier Police · Police & Collision Reports", agencyHref: "https://www.cityofwhittier.org/how-do-i/request", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
};

const cityFaqEs: Record<string, { q: string; a: string }> = {
  "buena-park": {
    q: "El choque ocurrió en Beach Blvd. ¿Eso cambia algo?",
    a: "Beach Blvd es una calle de la ciudad, por lo que Buena Park PD normalmente investiga estos incidentes. La velocidad y la gravedad de la lesión pueden importar mucho más que el daño visible del vehículo.",
  },
  anaheim: {
    q: "Me golpeó un shuttle de hotel o un rideshare cerca del resort. ¿Quién paga?",
    a: "No necesariamente solo el conductor. Un shuttle suele implicar una póliza comercial, y en un rideshare la cobertura depende del estado de la aplicación en ese momento. Conviene aclararlo antes de dar una declaración detallada a una aseguradora.",
  },
  fullerton: {
    q: "Soy estudiante. ¿Perder clases puede contar como una pérdida?",
    a: "Puede importar. Un semestre interrumpido, una graduación retrasada o una práctica perdida pueden formar parte del impacto real de una lesión, aunque no se trate de un cheque de pago.",
  },
  "garden-grove": {
    q: "¿Es probable que exista video de mi accidente?",
    a: "Puede existir. Harbor y Brookhurst tienen muchos negocios con cámaras cercanas a la calle, pero esos sistemas pueden sobrescribir el video en pocos días. Conviene identificarlo temprano.",
  },
  cypress: {
    q: "Ocurrió cerca del límite con Los Alamitos. ¿Importa?",
    a: "Puede importar. El lado exacto de la línea municipal puede determinar qué agencia respondió y qué tribunal podría corresponder si se presenta una demanda.",
  },
  "la-habra": {
    q: "El otro conductor solo estaba pasando por Whittier Blvd. ¿Eso complica el caso?",
    a: "No necesariamente. Puede significar una aseguradora o conductor de otra zona, pero el domicilio del conductor no cambia por sí solo los plazos aplicables ni decide automáticamente dónde se presentaría un caso.",
  },
  "la-mirada": {
    q: "Pensé que mi caso funcionaría como uno de Orange County. ¿Es así?",
    a: "No siempre. La Mirada está en Los Angeles County aunque esté muy cerca de Orange County. El condado puede cambiar el tribunal y ciertos procedimientos locales.",
  },
  cerritos: {
    q: "Me chocaron en la 91 o la 605. ¿Quién tiene el reporte?",
    a: "Los choques en autopistas suelen ser investigados por CHP, no por la ciudad. Eso implica una solicitud de registros distinta a la de un choque en una calle local.",
  },
  norwalk: {
    q: "¿Mi caso iría al tribunal de Norwalk?",
    a: "Es posible, pero no se decide solo por el edificio más cercano. El lugar correcto depende de los hechos y de las reglas de jurisdicción y venue aplicables.",
  },
  whittier: {
    q: "Ocurrió en una calle con pendiente. ¿Eso cambia algo?",
    a: "Las calles con pendientes pueden tener líneas de visión limitadas. Fotografías de la perspectiva de cada conductor o peatón pueden ser especialmente importantes cuando la visibilidad está en disputa.",
  },
};

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "서비스 지역" : isEs(locale) ? "Zonas de servicio de lesiones personales" : "Personal injury service areas"}
        title={isKo(locale) ? "Buena Park를 중심으로 인근 지역까지." : isEs(locale) ? "Dónde trabajamos y por qué importa la ciudad." : "Where we work, and why the city matters."}
        description={isKo(locale)
          ? "Buena Park와 인근 Orange County·Los Angeles County 경계 지역의 사고·개인상해 사건을 지원합니다."
          : isEs(locale)
            ? "Estamos en Beach Blvd en Buena Park y atendemos casos en el norte de Orange County y las ciudades vecinas de Los Angeles County. Cada página local incluye datos de colisiones, la agencia que prepara reportes y el sistema judicial del condado."
            : "We are on Beach Blvd in Buena Park and take cases across north Orange County and the Los Angeles County cities next to it. Each page below covers one city: its own collision numbers, the police department that writes its reports, and the courthouse a filed case would go to."}
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
          title={isKo(locale) ? "가까운 지역 페이지에서 시작하세요." : isEs(locale) ? "Elija la ciudad donde realmente ocurrió." : "Pick the city where it actually happened."}
          intro={isKo(locale)
            ? "각 지역 페이지는 해당 지역에서 사고 이후 확인해야 할 일반적인 문제와 상담 시작 방법을 정리합니다."
            : isEs(locale)
              ? "La ciudad donde vive no hace que un reclamo sea más fuerte o más débil. El lugar exacto del accidente sí puede importar porque determina quién hizo el reporte, qué cámaras estaban cerca y qué condado podría intervenir si se presenta una demanda."
              : "The city you live in does not make a claim stronger or weaker. The spot where it happened can. It decides who wrote the report, which cameras were nearby, and which county a lawsuit would be filed in. That last one catches people out along the Orange and Los Angeles county line, where a few blocks changes the answer."}
        >
          <div className="editorial-link-grid">
            {serviceLocations.map((location, index) => {
              const esCopy = esLocationContent[location.slug];
              return (
                <a key={location.slug} href={`${localePrefix(locale)}/locations/${location.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? location.koName : location.name}</h3>
                  <p>{isKo(locale) ? location.koDescription : isEs(locale) ? (esCopy?.description || location.description) : location.description}</p>
                </a>
              );
            })}
          </div>
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

  const vulnerable = [
    { label: isKo(locale) ? "보행자" : isEs(locale) ? "peatones" : "pedestrians", n: location.ots.pedestrians },
    { label: isKo(locale) ? "자전거" : isEs(locale) ? "personas en bicicleta" : "people on bicycles", n: location.ots.bicyclists },
    { label: isKo(locale) ? "오토바이" : isEs(locale) ? "motociclistas" : "motorcycle riders", n: location.ots.motorcycles },
  ].sort((a, b) => b.n - a.n);
  const hitRunShare = Math.round((location.ots.hitRun / location.ots.total) * 100);
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
          image={heroJustice}
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
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "중요" : isEs(locale) ? "Útil saber" : "Useful to know"}</span>
              <p>{isKo(locale)
                ? "사고 장소의 사진, 경찰 또는 사고 보고서 정보, 치료 기록과 보험 관련 연락을 가능한 한 함께 보관하세요."
                : isEs(locale)
                  ? (esCopy?.localNote || `${name} está en ${location.county}. Mantenga juntos el lugar exacto, fotos de la escena, información del reporte, tratamiento y comunicaciones del seguro.`)
                  : `${name} is in ${location.county}. Keep the exact incident location, scene photos, police or incident-report information, treatment records, and insurance communications together when possible.`}</p>
            </div>
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
            intro={isKo(locale)
              ? "사고가 발생한 정확한 위치와 사건 유형에 따라 신고·기록 기관이 달라질 수 있습니다. 아래 링크는 지역 확인을 시작하기 위한 공식 자료입니다."
              : isEs(locale)
                ? `La agencia que respondió y el tribunal que podría importar dependen de la escena exacta, las partes y el tipo de reclamo. Estos recursos oficiales son un punto de partida práctico para localizar reportes y entender el sistema del condado.`
                : `The responding agency and the court that may ultimately matter depend on the exact scene, parties, and type of claim. These official resources are a practical starting point for locating reports and understanding the county system; they are not a statement that every ${name} claim is handled by one specific court.`}
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
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="cases"
            locale={locale}
            kicker={isKo(locale) ? "04 · 사건" : isEs(locale) ? "04 · Asuntos" : "04 · Matters"}
            title={isKo(locale) ? "지역보다 사건 유형과 증거가 더 중요합니다." : isEs(locale) ? `Lo que vemos con más frecuencia en ${name}.` : `What we see most often in ${name}.`}
            intro={isKo(locale)
              ? "자동차·트럭·오토바이 사고, 보행자 사고, 승차공유 사고, 낙상과 중대 상해 등 다양한 개인상해 문제를 검토할 수 있습니다."
              : isEs(locale)
                ? `De las ${location.ots.total.toLocaleString()} colisiones reportadas en ${name} en ${location.ots.year}, ${vulnerable[0].n} involucraron a ${vulnerable[0].label} y ${vulnerable[1].n} a ${vulnerable[1].label}. Cerca del ${hitRunShare}% fueron atropello y fuga. También manejamos reclamos de camiones, rideshare, caídas, muerte injusta y lesiones graves.`
                : `Of the ${location.ots.total.toLocaleString()} collisions reported in ${name} in ${location.ots.year}, ${vulnerable[0].n} involved ${vulnerable[0].label} and ${vulnerable[1].n} involved ${vulnerable[1].label}. Around ${hitRunShare}% were hit-and-run. We handle all of those, plus truck, rideshare, slip and fall, wrongful death and serious injury claims. Which one you have matters far more than which city you live in.`}
          >
            <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
              {practiceAreas.map((practice) => {
                const practiceEs = esPracticeContent[practice.slug];
                return (
                  <a key={practice.slug} href={`${localePrefix(locale)}/practice-areas/${practice.slug}`} className="group flex items-start justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 sm:even:border-l sm:even:pl-6">
                    <span className="min-w-0">
                      <span className="block text-[13px]">{isKo(locale) ? practice.koTitle : isEs(locale) ? (practiceEs?.shortTitle || practice.title) : practice.title}</span>
                      <span className="mt-1 block text-[11px] leading-5 text-[#1E1C1A]/45">{isKo(locale) ? practice.koIssues[0] : isEs(locale) ? (practiceEs?.issues[0] || practice.issues[0]) : practice.issues[0]}</span>
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
            intro={isKo(locale)
              ? "현장 사진, 영상, 신고 또는 사고 보고서, 목격자, 치료 기록과 보험사 연락 내용을 가능한 한 함께 정리해 두는 것이 좋습니다."
              : isEs(locale)
                ? "Preserve fotos y video de la escena, ubicación exacta, información de la agencia o reporte, testigos, datos del vehículo o propiedad, expedientes médicos, facturas, documentación de trabajo perdido y comunicaciones del seguro. Si existen cámaras cercanas, identificarlas temprano puede importar."
                : "Preserve scene photos and video, the exact location, responding-agency or incident-report information, witness details, vehicle or property information, medical records, bills, missed-work documentation, and insurance communications. If nearby cameras may have recorded the event, identifying them early can matter."}
          ><EvidenceVisuals locale={locale} /></ReadingSectionBlock>

          <ReadingSectionBlock
            id="deadlines"
            locale={locale}
            kicker={isKo(locale) ? "06 · 기한" : isEs(locale) ? "06 · Plazos de California" : "06 · California deadlines"}
            title={isKo(locale) ? "사고 장소와 상대방에 따라 기한이 달라질 수 있습니다." : isEs(locale) ? `${name} está en ${location.county}, y eso decide más de lo que parece.` : `${name} sits in ${location.county}, and that decides more than you would think.`}
            intro={isKo(locale)
              ? "캘리포니아의 많은 개인상해 소송에는 일반적으로 2년의 제소 기한이 적용되지만 공공기관 관련 청구는 더 짧은 사전 청구 절차가 적용될 수 있습니다. 사건별 기한을 실제 사실관계에서 확인하는 것이 중요합니다."
              : isEs(locale)
                ? `California generalmente permite dos años desde la lesión para presentar una demanda. Los reclamos contra una ciudad u otra entidad pública pueden requerir una notificación escrita en cuestión de meses. Si se presenta una demanda por un accidente en ${name}, el recurso judicial relevante es ${resource?.court ?? "el tribunal superior del condado"}. Verifique el plazo real según sus hechos.`
                : `California generally gives you two years from the injury to file. Claims against a city or other public agency are the trap. Those can need written notice in a matter of months, not years. And if a lawsuit does get filed for a ${name} accident, it goes to ${resource?.court ?? "the county superior court"}, not wherever you happen to live. Check the real deadline against your own facts rather than assuming the two-year rule covers you.`}
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
              {[
                [
                  isKo(locale) ? "사고가 이 도시에서 났지만 저는 다른 곳에 살아도 괜찮나요?" : isEs(locale) ? (cityFaqEs[location.slug]?.q ?? `¿Qué pasa si el accidente ocurrió en ${name}, pero vivo en otro lugar?`) : (cityFaq[location.slug]?.q ?? `What if the accident happened in ${name}, but I live somewhere else?`),
                  isKo(locale) ? "거주지가 다르다고 해서 사고 기록이나 청구가 사라지는 것은 아닙니다. 사고 장소, 책임 당사자, 보험, 관할과 적용 법률을 함께 확인해야 합니다." : isEs(locale) ? (cityFaqEs[location.slug]?.a ?? "Es común. Importa dónde ocurrió el incidente, dónde viven o trabajan las partes, qué agencia lo documentó, qué seguro aplica y qué reglas de tribunal pueden intervenir.") : (cityFaq[location.slug]?.a ?? "That is common. The useful questions are where the incident happened, where the defendants live or do business, which agency documented it, what insurance applies, and which court or venue rules may matter."),
                ],
                [
                  isKo(locale) ? "어느 경찰서나 기관에서 기록을 받아야 하나요?" : isEs(locale) ? `¿Quién tiene el reporte de un accidente en ${name}?` : `Who has the report for a ${name} accident?`,
                  isKo(locale) ? "정확한 사고 지점이 중요합니다. 도시 경찰, 보안관, CHP 또는 다른 기관이 관할할 수 있으므로 사고 당시 받은 사건번호나 담당기관 정보를 먼저 확인하세요." : isEs(locale) ? `Normalmente ${resource?.agency ?? "la policía local"} si ocurrió en una calle de la ciudad. En una autopista probablemente sea CHP, y en propiedad privada puede existir solo un reporte interno. Empiece con cualquier número de reporte que recibió en la escena.` : `Usually ${resource?.agency ?? "the local police department"}, if it happened on a city street. On a freeway it is more likely CHP, and on private property there may only be an incident report the business wrote itself. Start with whatever report number you were given at the scene. That number is what everyone else will ask you for.`,
                ],
                [
                  isKo(locale) ? "지역 변호사를 꼭 선임해야 하나요?" : isEs(locale) ? `¿Necesito un abogado con oficina en ${name}?` : `Do I need a lawyer based in ${name}?`,
                  isKo(locale) ? "도시 이름만으로 변호사를 선택할 필요는 없습니다. 캘리포니아 자격, 사건 유형 경험, 지역 절차 이해, 소통 방식과 실제 사건을 처리할 능력을 함께 보는 것이 더 중요합니다." : isEs(locale) ? `No. Es más importante la licencia de California, experiencia real con su tipo de reclamo, conocimiento de ${location.county} y la forma en que se manejará su caso. Nuestra oficina está en Buena Park.` : `No, and a city name is a poor way to choose one. What actually matters is California licensure, real experience with your type of claim, and knowing how ${location.county} handles these. Our office is in Buena Park, so ${name} is a short drive either way.`,
                ],
              ].map(([question, answer], index) => (
                <div key={question} className="border-b border-[#1E1C1A]/12 py-6"><div className="flex gap-4"><span className="text-[10px] text-[#1E1C1A]/30">0{index + 1}</span><div><h3 style={serifStyle(locale)} className="text-[1.25rem] leading-tight">{question}</h3><p className="mt-3 max-w-[720px] text-[12px] leading-6 text-[#1E1C1A]/54">{answer}</p></div></div></div>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="nearby" locale={locale} kicker={isKo(locale) ? "08 · 인근" : isEs(locale) ? "08 · Cerca" : "08 · Nearby"} title={isKo(locale) ? "인근 서비스 지역" : isEs(locale) ? "Comunidades cercanas atendidas." : "Nearby communities served."}>
            <div className="editorial-link-grid">
              {serviceLocations.filter((item) => item.slug !== location.slug).slice(0, 4).map((item) => (
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
