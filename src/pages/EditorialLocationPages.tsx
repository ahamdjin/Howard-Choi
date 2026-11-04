import { whittierReading } from "@/data/whittierReading";
import { norwalkReading } from "@/data/norwalkReading";
import { cerritosReading } from "@/data/cerritosReading";
import { laMiradaReading } from "@/data/laMiradaReading";
import { laHabraReading } from "@/data/laHabraReading";
import { cypressReading } from "@/data/cypressReading";
import { gardenGroveReading } from "@/data/gardenGroveReading";
import { fullertonReading } from "@/data/fullertonReading";
import { citySearchFocus } from "@/data/citySearchFocus";
import { practiceMedia } from "@/data/practiceMedia";
import { cityLandingCopy } from "@/data/cityLandingCopy";
import { getBlogBySlug } from "@/data/blogs";
import SiteDepthSection from "@/components/SiteDepthSection";
import { ArrowRight, ClipboardList, Footprints, GraduationCap, MapPin, Route, ShieldCheck, TrainFront, Truck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
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
import { locationPracticeContexts } from "@/data/locationPracticeContexts";
import { cityEvidencePaths } from "@/data/cityEvidencePaths";

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
import { brand, getServiceLocation, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
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
            : "Our office is in Buena Park, California. Explore accident and injury guides for cities across Orange and Los Angeles counties, with official traffic-safety figures, reporting resources and practical evidence questions for each community."}
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
          title={isKo(locale) ? "가까운 지역 페이지에서 시작하세요." : isEs(locale) ? "Elija la ciudad donde realmente ocurrió." : "Local accident and injury guides across Orange and Los Angeles counties."}
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
      <SiteDepthSection locale={locale} topic="location-hub" />
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

  const landing = cityLandingCopy[location.slug];
  const search = citySearchFocus[location.slug];
  const featuredCases = locale === "en" ? [...new Set([...search.cases, ...localFocus.practices])] : localFocus.practices;
  const fullertonSections = location.slug === "fullerton" && locale === "en" ? fullertonReading : [];
  const fullertonIcons = [TrainFront, GraduationCap, Route, MapPin, ClipboardList, Truck, Footprints, ShieldCheck];
  const localReadingSections = locale === "en"
    ? ({ "garden-grove": gardenGroveReading, cypress: cypressReading, "la-habra": laHabraReading, "la-mirada": laMiradaReading, cerritos: cerritosReading, norwalk: norwalkReading, whittier: whittierReading } as const)[location.slug as "garden-grove" | "cypress" | "la-habra" | "la-mirada" | "cerritos" | "norwalk" | "whittier"] ?? []
    : [];
  const locationPhoto = locationMedia[location.slug];
  const isBuenaPark = location.slug === "buena-park";
  const heroTitle = isBuenaPark
    ? (isKo(locale) ? "부에나파크 사무실과 지역 상해 자료" : isEs(locale) ? "Oficina de Buena Park y recursos locales para lesiones" : "Buena Park Office & Local Accident Resources")
    : isKo(locale)
    ? `${name} 개인상해 변호사`
    : isEs(locale)
      ? `Abogado de lesiones personales en ${name}`
      : search.heading;

  const caseSection = (
    <ReadingSectionBlock
      id="cases"
      locale={locale}
      kicker={isKo(locale) ? "04 · 사건" : isEs(locale) ? "04 · Asuntos" : "Cases we handle"}
      title={isKo(locale) ? `${name} 사고 유형별 자료 안내` : isEs(locale) ? `Guías según el tipo de lesión en ${name}.` : `Injury and accident cases we handle in ${name}`}
      intro={localFocus.intro[locale]}
    >
      <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
        {practiceAreas.filter((practice) => featuredCases.includes(practice.slug))
          .sort((a, b) => featuredCases.indexOf(a.slug) - featuredCases.indexOf(b.slug))
          .map((practice) => {
          const practiceEs = esPracticeContent[practice.slug];
          const localServiceContext = locationPracticeContexts[location.slug]?.[practice.slug]?.[locale];
          return (
            <a key={practice.slug} href={`${localePrefix(locale)}/practice-areas/${practice.slug}`} className="group flex items-start gap-4 border-b border-[#1E1C1A]/12 py-5 sm:pr-5">
              {locale === "en" && practiceMedia[practice.slug] && <img src={practiceMedia[practice.slug].src} alt="" width={88} height={68} loading="lazy" className="h-[68px] w-[88px] shrink-0 rounded-sm object-cover" />}
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-[15px]">{isKo(locale) ? practice.koTitle : isEs(locale) ? (practiceEs?.shortTitle || practice.title) : `${practice.title} in ${name}`}</span>
                <span className="mt-1 block text-[13px] leading-6 text-[#1E1C1A]/75">{localServiceContext || (isKo(locale) ? practice.koIssues[0] : isEs(locale) ? (practiceEs?.issues[0] || practice.issues[0]) : practice.issues[0])}</span>
              </span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#1E1C1A]/35 transition-transform group-hover:translate-x-1" />
            </a>
          );
        })}
      </div>
      {locale === "en" && <p className="mt-6 text-sm leading-7">Unsure which type of case you have? Start with <a href="/practice-areas/personal-injury" className="underline underline-offset-4">Howard Choi’s personal injury service</a> for an overview of how an injury claim is evaluated.</p>}
      <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-inline-link mt-7"><span>{isKo(locale) ? "업무 분야 보기" : isEs(locale) ? "Ver todas las áreas de lesiones personales" : "See all personal injury practice areas"}</span><ArrowRight className="h-4 w-4" /></a>
    </ReadingSectionBlock>

  );

  return (
    <EditorialFrame locale={locale}>
      <main className="detail-guide">
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "서비스 지역" : isEs(locale) ? `${location.county} · Zona de servicio` : `${location.county} · Service area`}
          title={heroTitle}
          description={locale === "en" ? landing.lead : description}
          image={locationPhoto?.src ?? cityImages[location.slug] ?? heroJustice}
          imageAlt={locationPhoto?.alt || `${name}, California`}
          imageFallback={cityImages[location.slug] ?? heroJustice}
          detail
        />
        {locationPhoto && (
          <p className="site-shell py-2 text-right text-xs text-foreground/70">
            <a href={locationPhoto.source} className="underline underline-offset-4">
              {locationPhoto.credit} · {locationPhoto.license}
            </a>
            {" · "}{isKo(locale) ? "화면에 맞춰 잘라낸 사진" : isEs(locale) ? "Foto recortada" : "Photo cropped to fit"}
          </p>
        )}
        {locale === "en" && (
          <section aria-label="Office and consultation" className="border-b border-foreground/15 bg-white">
            <div className="site-shell grid gap-6 py-7 text-sm leading-6 md:grid-cols-3">
              <div>
                <strong className="block">{isBuenaPark ? "Visit the Buena Park office" : `Serving ${name} from Buena Park`}</strong>
                <a className="underline underline-offset-4" href={brand.mapsHref}>{brand.address}</a>
              </div>
              <div>
                <strong className="block">Talk through the accident</strong>
                <a className="underline underline-offset-4" href="/about/what-to-expect">See what happens from your first call</a>
              </div>
              <div>
                <strong className="block">Get to know the firm</strong>
                <a className="underline underline-offset-4" href="/about/our-difference">How Howard approaches injury cases</a>
              </div>
            </div>
          </section>
        )}
        <LocationDetailHighlights
          locale={locale}
          name={name}
          county={location.county}
          year={location.ots.year}
          total={location.ots.total}
          agency={resource.agency}
          dataHref={location.ots.source}
        />
        <ReadingLayout
          locale={locale}
          label={`${name} · ${isKo(locale) ? "지역 안내" : isEs(locale) ? "Guía local de lesiones" : "Local injury guide"}`}
          sections={isKo(locale)
            ? [
                { id: "overview", label: "지역 안내" }, { id: "data", label: "교통사고 통계" }, { id: "records", label: "지역 기록" },
                { id: "cases", label: "사건 유형" }, { id: "evidence", label: "증거" }, { id: "situations", label: "현장별 증거 판단" }, { id: "deadlines", label: "기한" },
                { id: "faq", label: "자주 묻는 질문" }, { id: "nearby", label: "인근 지역" },
              ]
            : isEs(locale)
              ? [
                  { id: "overview", label: "Panorama local" }, { id: "data", label: "Datos de colisiones" }, { id: "records", label: "Registros y agencias" },
                  { id: "cases", label: "Asuntos atendidos" }, { id: "evidence", label: "Evidencia a preservar" }, { id: "situations", label: "Situaciones locales" }, { id: "deadlines", label: "Plazos de California" },
                  { id: "faq", label: "Preguntas locales" }, { id: "nearby", label: "Comunidades cercanas" },
                ]
              : [
                  { id: "overview", label: "Local overview" }, { id: "first-steps", label: "What to do first" }, { id: "cases", label: "Cases we handle" },
                  ...localReadingSections.map(({ id, label }) => ({ id, label })),
                  ...fullertonSections.map(({ id, label }) => ({ id, label })),
                  ...(isBuenaPark ? [{ id: "beach-boulevard", label: "Beach Boulevard crashes" }, { id: "visitor-route", label: "Visitor routes" }, { id: "freeway-approach", label: "Freeway approaches" }, { id: "disputed-turn", label: "Disputed turns" }, { id: "shift-records", label: "Work and recovery" }, { id: "property-records", label: "Property incident records" }, { id: "family-records", label: "Helping an injured family member" }, { id: "office-visit", label: "Visiting the office" }] : []), { id: "data", label: "Local collision data" }, { id: "records", label: "Local records & agencies" },
                  { id: "evidence", label: "Evidence to preserve" }, { id: "situations", label: "Local evidence scenarios" }, { id: "deadlines", label: "California deadlines" },
                  { id: "claim-value", label: "What affects claim value" }, { id: "faq", label: "Local claim questions" }, { id: "guides", label: "Related guides" }, { id: "nearby", label: "Nearby communities" },
                ]}
        >
          <ReadingSectionBlock
            id="overview"
            locale={locale}
            kicker={isKo(locale) ? "01 · 지역" : isEs(locale) ? "01 · Panorama local" : "Local overview"}
            title={isKo(locale) ? `${name}에서 사고가 발생했다면` : isEs(locale) ? `Si ocurrió un accidente en ${name} o cerca.` : `If an accident happened in or around ${name}.`}
            intro={localIntro}
          />

          {locale === "en" && (
            <ReadingSectionBlock id="first-steps" locale={locale} kicker="After an injury" title={`What to do after an accident in ${name}`}>
              <ol className="divide-y divide-foreground/15 border-y border-foreground/15 text-[15px] leading-7">
                <li className="py-4"><strong className="block">01. Put safety and treatment first</strong>Get appropriate medical care and keep copies of treatment instructions and work restrictions.</li>
                <li className="py-4"><strong className="block">02. Save the details that are easy to lose</strong>{search.next}</li>
                <li className="py-4"><strong className="block">03. Keep insurance requests together</strong>Save claim numbers, letters and offers. Bring them to a consultation if you have questions about coverage or what an offer includes.</li>
              </ol>
              <a className="editorial-inline-link mt-5" href="/blogs/what-to-do-after-a-car-accident-in-california">Read the California accident checklist</a>
            </ReadingSectionBlock>
          )}
          {locale === "en" && caseSection}
          {localReadingSections.map(({ id, label, title, paragraphs, Icon }) => (
            <ReadingSectionBlock key={id} id={id} locale={locale} kicker={label} title={title} Icon={Icon}>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </ReadingSectionBlock>
          ))}
          {fullertonSections.map(({ id, label, title, paragraphs }, index) => (
            <ReadingSectionBlock key={id} id={id} locale={locale} kicker={label} title={title} Icon={fullertonIcons[index]}>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </ReadingSectionBlock>
          ))}
          {locale === "en" && isBuenaPark && (
            <>
              <ReadingSectionBlock id="beach-boulevard" locale="en" kicker="Buena Park collision evidence" title="Reconstruct the turn from Beach Boulevard">
                <img src={cityCarCollision} alt="Illustrative photograph of a car collision" width={900} height={500} loading="lazy" className="mb-7 aspect-[16/9] w-full object-cover" />
                <p>After a collision at a Beach Boulevard business entrance, identify whether each vehicle was turning into the property, leaving it or continuing along the street. Draw the driveway, nearest signal and the lane where contact occurred. If the cars later pulled into the lot, mark that location separately. A store address may identify where you stopped without showing where the crash began.</p>
                <p>A pedestrian coming from the lot and a driver approaching on Beach Boulevard may have different views of the same turn. Identify where a parked car or queue blocked either view. A camera above a doorway may record someone leaving the store while missing the street entirely. Keep the original recording if you have it, and note the location and direction of any other camera you observed.</p>
                <p>For a crash near an I-5 or SR-91 ramp, record the freeway direction, ramp or intersection and the agency on the report card. A Buena Park address does not settle which department investigated. Buena Park Police has documented city-street investigations handled by CHP, so check the actual report reference before making a request.</p>
                <a className="editorial-inline-link mt-5" href="/practice-areas/car-accidents">Read the car accident practice guide</a>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="visitor-route" locale="en" kicker="Buena Park visitor routes" title="Pin down the walk between a hotel, an attraction and the street" Icon={MapPin}>
                <p>If you were hurt near a Beach Boulevard hotel or attraction, the destination name is only the beginning. Start with the entrance you used and trace the route to the point where you fell or were struck. A person leaving a parking area may cross a private drive before reaching a public sidewalk. A person waiting for a ride may be directed from the lobby to a separate pickup area. Describe where the change happened and what you could see from there.</p>
                <p>If the accident involved a shuttle or rideshare vehicle, save the booking record and any instructions about where to wait. Write down the vehicle identifier, the door you were approaching and whether you were already inside when the vehicle moved. A receipt can help establish when you were there. A message changing the pickup location may explain why you crossed a lane or went to a different entrance.</p>
                <p>For an injury on a walkway, record whether the condition was at a curb, ramp, doorway or inside the property. Include a wider photograph showing a sign or other fixed feature if you can take it safely. A close-up can show a defect but leave it difficult to locate. If the condition changed after the incident, label any later photos with their date and explain what was different.</p>
                <p>Keep the names of the staff or security personnel you spoke with and any separate reference they gave you. The attraction, hotel and operator of a shuttle may hold different records. Howard can use the route, time and available documents to work out which inquiries are relevant to your situation.</p>
                <div className="mt-5 flex flex-wrap gap-5">
                  <a href="/practice-areas/rideshare-accidents" className="underline underline-offset-4">Rideshare accident guide</a>
                  <a href="/practice-areas/slip-and-fall" className="underline underline-offset-4">Slip and fall guide</a>
                </div>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="freeway-approach" locale="en" kicker="Freeway and surface-street evidence" title="Separate the impact from the place you pulled over" Icon={Route}>
                <img src={cityTruckHighway} alt="Illustrative photograph of commercial traffic on a highway" width={900} height={500} loading="lazy" className="mb-7 aspect-[16/9] w-full object-cover" />
                <p>A driver coming off I-5 or SR-91 may describe a crash by the first Buena Park business they reached afterward. Record the freeway direction, last exit sign and where you first felt contact. If you pulled into a lot or onto a side street, mark that as a later stop. A tow invoice can place the collection point, while a passenger’s photo or a report diagram may help locate the impact.</p>
                <p>When traffic was slowing toward an exit, describe the order of events before trying to assign responsibility. Note whether you saw the queue form, felt more than one impact or moved lanes before stopping. If available, preserve the longer dashcam recording rather than only the final seconds. Howard can compare what the recording shows with accounts from people who saw different parts of the slowdown.</p>
                <p>If a commercial vehicle was involved, keep the identifiers for the tractor and trailer separately when available. Note whether it was continuing through traffic, entering a ramp or turning toward a delivery. The business logo, plate and trip destination may point to different records. Bring the information you have and flag anything learned from another person so it can be verified.</p>
                <a href="/practice-areas/truck-accidents" className="editorial-inline-link mt-5">Read the commercial truck accident guide</a>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="disputed-turn" locale="en" kicker="Compare the accounts" title="What a disputed turn near a Buena Park business can look like" Icon={Route}>
                <p>Imagine a car leaving a lot along Beach Boulevard while another driver moves toward the entrance. Both people say the other turned first. A customer near the door sees the vehicles come together, and someone waiting at the sidewalk sees only the first car cross the walking route. A useful first step is to map what each person could see. The customer can help locate the contact even if they did not see which turn began first.</p>
                <p>Mark the driveway and nearby lanes on a sketch. Place the contact separately from the spot where the cars were parked after the crash. If a witness describes a car as coming from the north, ask where the witness was looking and whether they saw it before or after it crossed the driveway. Preserve any recording with the time before contact so the movement can be considered in context.</p>
                <p>If the police diagram shows the driveway but not the delivery van you recall blocking the view, keep both the report and your separate note. A later photograph can illustrate the space without showing the obstruction at the time. Label when it was taken. Howard can discuss what the materials establish and whether another witness, recording or vehicle record could resolve a particular difference.</p>
                <p>These questions matter even when the crash appears minor from a distance. Vehicle damage helps explain how the cars touched, while treatment records help explain what happened to you. Bring both categories to the office and keep them distinct so the injury evaluation can be considered alongside the investigation.</p>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="shift-records" locale="en" kicker="Work and daily activities" title="Show which parts of a Buena Park shift you could do after the injury">
                <p>A worker near the visitor corridor might handle the front counter, stock supplies and help close the property during the same shift. If you returned to the counter but stopped lifting or closing, write down which tasks changed and on what dates. A return-to-work date may leave those details out. Keep the normal assignment alongside any written instructions restricting standing, carrying or driving.</p>
                <p>Compare schedules from before and after the accident. If the business normally changes hours around weekends or events, bring several representative weeks. Mark a shift that was canceled separately from one you traded or worked later. Keep any messages showing that someone took over a duty. Payroll can show the change in earnings while the schedule and messages help explain why it happened.</p>
                <p>If you received care at more than one location, keep the visits and restrictions in date order. Note which provider first recommended a change and when your employer received it. A later note can revise an earlier restriction. Preserve both rather than keeping only the most recent one. Howard can use the timeline to review whether the records support a temporary loss, a continuing limitation or a question that needs additional information.</p>
                <p>Describe changes at home with the same care. If someone helped with groceries or drove you to appointments, write down when it started and when you could resume the task. Keep actual expenses separate from unpaid help. Dated examples can explain the day-to-day impact without assuming every change will be treated the same way in a claim.</p>
                <a href="/blogs/how-much-is-my-personal-injury-case-worth-california" className="editorial-inline-link mt-5">Read the guide to documenting injury losses</a>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="property-records" locale="en" kicker="Falls and property injuries" title="Identify who maintained the exact spot where you fell">
                <p>A visit to a Buena Park restaurant, shopping center or attraction can take you across several separately managed spaces. You might park in a shared lot, cross a walkway maintained by the center and then enter a shop that handles its own doorway. If you fall between two storefronts, the name on the nearest sign is a useful landmark. The first question is which area you were in when you lost your footing.</p>
                <p>Describe your route from a fixed point. For example, you walked from the parking aisle toward the corner entrance and fell beside the curb ramp before reaching the door. A wider photo can show that path and a closer photo can show the surface. Keep the originals and write down when they were taken. If you go back later and see a mat, warning sign or patch that you do not recall, label it as a later observation. Ask witnesses to describe what they personally saw before or immediately after the fall.</p>
                <p>If staff took an incident report, record the business name, the approximate time you spoke and any reference number. Save receipts, mobile order confirmations or parking records that help narrow the time window. A report may identify the person who responded, while a cleaning schedule, repair request or prior complaint could help answer how the condition developed. Those records can be held by different businesses. Bring correspondence from each so Howard can evaluate who to contact and what information to request.</p>
                <p>Where a parking lot crosses into a sidewalk, use a photo or map pin to show the boundary as accurately as you can. If the issue was poor visibility, explain the time of day, what lights were on and where you were looking as you approached. For a sudden spill, record whether you saw an overturned container or whether someone told you about it afterward. That distinction helps separate firsthand observations from leads that still need corroboration.</p>
                <p>Keep any shoes or other items involved as they were after the incident if possible. You can document them without recreating the fall. A practical first consultation can then focus on which details locate the incident, which records might explain the condition and how the treatment timeline fits with the account.</p>
                <a href="/practice-areas/slip-and-fall" className="editorial-inline-link mt-5">Explore slip and fall cases</a>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="family-records" locale="en" kicker="For family members" title="What to organize when the injured person cannot handle the first calls">
                <p>After a serious crash in Buena Park, one relative may be at the hospital while another is trying to find the vehicle or identify the responding agency. Start a shared list with the time and place as you understand them, the names of people you spoke with and any reference numbers they gave you. Put a question mark next to anything uncertain. If you heard the location from a caller who arrived later, record who provided it so the family can distinguish it from an official incident location.</p>
                <p>Keep transport, hospital and vehicle details on separate lines. The facility where a person is receiving care may be different from the first facility that assessed them. A vehicle may be transferred after the original tow. For every transfer, note the date and who confirmed it. If a vehicle is at a yard, find out where it is held and ask what deadlines or charges apply before making decisions about storage. Bring those details to the consultation if access or preservation is urgent.</p>
                <p>Set aside messages from witnesses, businesses or agencies in the form you received them. If someone offers a clip, ask for the original and record whether the camera time is known to be accurate. If a business says it can only speak to an authorized person, note the name and date of the conversation. Howard can review who may be able to request the material and what information the custodian will need to identify it.</p>
                <p>For a family member who is recovering, keep a simple list of things they can and cannot manage independently. If a clinician gave instructions about mobility or follow-up, keep a copy alongside appointment dates and examples of help actually provided. You may also want to track who has been paying for transportation or other immediate needs. This gives Howard concrete information to review even when the full course of recovery is still unknown.</p>
                <p>If the injury was fatal, the first consultation can focus on the people involved, the records already available and decisions that cannot wait. Bring any existing correspondence and explain who has been handling arrangements or receiving calls. If there are conflicting accounts of what occurred, keep them separately with the source and date of each. You can ask Howard which records may help resolve those differences and what information he needs to discuss the family’s options.</p>
              </ReadingSectionBlock>
              <ReadingSectionBlock id="office-visit" locale="en" kicker="Consultation in Buena Park" title="Bring the question you need answered to the Beach Boulevard office" Icon={MapPin}>
                <p>Howard Choi’s office is at {brand.address}. Call to arrange a free consultation before coming in. If you are bringing a report, include the agency name and incident number. For a fall at a business, bring the exact route to the surface and any reference given by staff. If you are waiting on a record, bring the request confirmation and explain what is still missing.</p>
                <p>Organize the first medical visit and later appointments by date. Bring current restrictions and examples of how they affected work or daily activities. For instance, someone may have resumed a shift while handing off lifting duties, or returned to work while still needing rides to appointments. A dated schedule and the provider’s instructions can help explain what changed.</p>
                <p>Start the discussion with the decision you are facing. You may need to identify an agency, understand a disputed turn or work out which documents support a change in earnings. Howard can review what the current records establish and which questions require follow-up. No fee unless there is a recovery.</p>
                <p>It can be useful to bring a one-page timeline if the same trip produced several records. A collision near a freeway approach might appear under one location in the tow paperwork and another in your appointment notes because you described a nearby landmark. Add the direction you were traveling, where the vehicles stopped and where the officer met you. Keeping those points separate helps someone reading the file understand why the records may use different descriptions.</p>
                <p>If you are deciding whether an in-person visit is practical, call ahead to discuss your options. Tell the office if getting there is difficult because you cannot drive or are relying on someone else for transportation. When arranging the appointment, mention any immediate records issue, such as a vehicle that will be moved or footage a business has agreed to hold for a short time. Bring the business’s response or notice so Howard can see what it actually says and decide what to review first.</p>
                <div className="mt-5 flex flex-wrap gap-5">
                  <a href={brand.mapsHref} className="underline underline-offset-4">Directions to the Buena Park office</a>
                  <a href="/contact" className="underline underline-offset-4">Arrange a free consultation</a>
                </div>
              </ReadingSectionBlock>
            </>
          )}
          {locale === "en" && (
            <aside className="my-10 bg-[#27211C] px-6 py-8 text-[#FAF5ED] md:p-9">
              <h2 className="editorial-serif text-3xl">What can an injury lawyer help you sort out?</h2>
              <p className="mt-4 max-w-prose text-[15px] leading-7">Howard Choi can review which records are missing, which insurance policies may be relevant, and how treatment or time away from work has affected you. A case review is also a chance to ask about fees and what would happen if the firm takes your case.</p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm">
                <a className="underline underline-offset-4" href="/contact">Request a free consultation</a>
                <a className="underline underline-offset-4" href="/case-value-calculator">Explore the case value calculator</a>
                <a className="underline underline-offset-4" href="/results">See selected past results</a>
              </div>
            </aside>
          )}

          <ReadingSectionBlock
            id="data"
            locale={locale}
            kicker={isKo(locale) ? "02 · 데이터" : isEs(locale) ? "02 · Datos locales" : "Local collision data"}
            title={isKo(locale) ? statLabel : isEs(locale) ? `Lesiones por colisiones en ${name}, en contexto.` : `${name} collision injuries in context.`}
            intro={isKo(locale)
              ? `California Office of Traffic Safety(OTS)에 따르면 ${location.ots.year}년 ${name}에서는 교통사고로 ${location.ots.total.toLocaleString()}명이 사망하거나 다쳤습니다. 같은 자료에 오토바이 탑승 피해자 ${location.ots.motorcycles}명, 보행자 ${location.ots.pedestrians}명, 자전거 이용자 ${location.ots.bicyclists}명이 기록되어 있습니다. 이 수치는 지역 교통안전의 참고 자료이며 개별 사건의 결과를 예측하지는 않습니다.`
              : isEs(locale)
                ? `California Office of Traffic Safety reportó ${location.ots.total.toLocaleString()} personas fallecidas o lesionadas en colisiones de tráfico en ${name} durante ${location.ots.year}. El mismo conjunto registró ${location.ots.motorcycles} víctimas en motocicleta, ${location.ots.pedestrians} peatones y ${location.ots.bicyclists} ciclistas. Estas cifras ofrecen contexto local y no predicen ningún caso individual.`
                : `California's Office of Traffic Safety reported ${location.ots.total.toLocaleString()} people killed or injured in traffic collisions in ${name} in ${location.ots.year}. The same dataset recorded ${location.ots.motorcycles} motorcycle victims, ${location.ots.pedestrians} pedestrian victims, and ${location.ots.bicyclists} bicyclist victims. These citywide numbers do not predict any individual case; they provide local safety context.`}
          >
            <div className="grid border-y border-[#1E1C1A]/12 sm:grid-cols-3">
              <div className="py-6 sm:pr-6"><div className="editorial-serif text-[2.1rem]">{location.ots.total.toLocaleString()}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "사망·부상 피해자" : isEs(locale) ? "Víctimas fallecidas o lesionadas" : "Killed or injured victims"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:px-6"><div className="editorial-serif text-[2.1rem]">{location.ots.speed}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "과속 관련 사망·부상 사고" : isEs(locale) ? "Colisiones con lesión/muerte relacionadas con velocidad" : "Speed-related fatal/injury collisions"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:pl-6"><div className="editorial-serif text-[2.1rem]">{location.ots.hitRun}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "뺑소니 관련 사망·부상 사고" : isEs(locale) ? "Colisiones con lesión/muerte por atropello y fuga" : "Hit-and-run fatal/injury collisions"}</div></div>
            </div>
            <a href={location.ots.source} target="_blank" rel="noreferrer" className="editorial-inline-link mt-5"><span>{isKo(locale) ? "California OTS 데이터 보기" : isEs(locale) ? "Ver datos de California OTS" : "View the California OTS city data"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="records"
            locale={locale}
            kicker={isKo(locale) ? "03 · 지역 기록" : isEs(locale) ? "03 · Registros locales" : "Local records"}
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

          {locale !== "en" && caseSection}

          <ReadingSectionBlock
            id="evidence"
            locale={locale}
            kicker={isKo(locale) ? "05 · 증거" : isEs(locale) ? "05 · Evidencia" : "Evidence"}
            title={isKo(locale) ? "지역 기록과 사고 기록을 함께 보관하세요." : isEs(locale) ? `Registros útiles después de un accidente en ${name}.` : `Useful records after an accident in ${name}.`}
            intro={localGuide.evidence}
          />

          <ReadingSectionBlock
            id="situations"
            locale={locale}
            kicker={isKo(locale) ? "현장 분석" : isEs(locale) ? "Situaciones locales" : "Local investigation examples"}
            title={cityEvidencePaths[location.slug].title[locale]}
          >
            <div className="article-reading-width border-t border-[#1E1C1A]/15">
              {cityEvidencePaths[location.slug].paths.map((path, index) => (
                <section key={path.question.en} className="grid gap-3 border-b border-[#1E1C1A]/12 py-7 md:grid-cols-[35px_1fr]">
                  <span className="text-[11px] tabular-nums text-[#1E1C1A]/40">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="editorial-serif text-[clamp(1.45rem,2.1vw,1.9rem)] leading-[1.2]">{path.question[locale]}</h3>
                    <p className="mt-3 max-w-[740px] text-[15px] leading-8 text-[#57514b]">{path.answer[locale]}</p>
                  </div>
                </section>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="deadlines"
            locale={locale}
            kicker={isKo(locale) ? "06 · 기한" : isEs(locale) ? "06 · Plazos de California" : "California deadlines"}
            title={isKo(locale) ? `${name} 사고에 적용되는 법적 기한` : isEs(locale) ? `¿Qué plazos podrían aplicarse en ${name}?` : `Which legal deadlines may apply in ${name}?`}
            intro={localGuide.deadlines}
          >
            <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="editorial-inline-link"><span>{isKo(locale) ? "California Courts 기한 안내" : isEs(locale) ? "California Courts · Plazos legales" : "California Courts · Statutes of limitations"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          {locale === "en" && (
            <ReadingSectionBlock id="claim-value" locale={locale} kicker="Claim value" title={`What affects the value of an injury claim in ${name}?`} intro="Start with how the injury changed your life. Then look at what the records can support, what fault is disputed, and what insurance may be available. The city and type of crash alone do not determine a dollar amount.">
              <dl className="grid gap-5 border-y border-foreground/15 py-6 sm:grid-cols-3">
                <div><dt className="font-semibold">Treatment and recovery</dt><dd className="mt-2 text-sm leading-6">Save bills, treatment notes, and any documented need for continuing care.</dd></div>
                <div><dt className="font-semibold">Work and daily life</dt><dd className="mt-2 text-sm leading-6">Keep wage records, missed shifts, work restrictions, and notes on changes to your usual activities.</dd></div>
                <div><dt className="font-semibold">Fault and coverage</dt><dd className="mt-2 text-sm leading-6">Keep incident reports and insurance correspondence so the facts and available policies can be reviewed together.</dd></div>
              </dl>
              <a className="editorial-inline-link mt-5" href="/blogs/how-much-is-my-personal-injury-case-worth-california">Read how California injury claims are valued</a>
            </ReadingSectionBlock>
          )}

          <ReadingSectionBlock
            id="faq"
            locale={locale}
            kicker={isKo(locale) ? "07 · 질문" : isEs(locale) ? "07 · Preguntas locales" : "Local claim questions"}
            title={isKo(locale) ? `${name} 사고 이후 자주 묻는 질문` : isEs(locale) ? `Preguntas prácticas después de un accidente en ${name}.` : `Practical questions after an accident in ${name}.`}
          >
            <div className="border-t border-[#1E1C1A]/12">
              {localGuide.faqs.map(([question, answer], index) => (
                <div key={question} className="border-b border-[#1E1C1A]/12 py-6"><div className="flex gap-4"><span className="text-[10px] text-[#1E1C1A]/30">0{index + 1}</span><div><h3 style={serifStyle(locale)} className="text-[1.25rem] leading-tight">{question}</h3><p className="mt-3 max-w-[720px] text-[12px] leading-6 text-[#1E1C1A]/54">{answer}</p></div></div></div>
              ))}
            </div>
          </ReadingSectionBlock>

          {locale === "en" && (
            <ReadingSectionBlock id="guides" locale={locale} kicker="Keep reading" title="Guides for your next decision">
              <ul className="space-y-3">
                {landing.guides.map(getBlogBySlug).filter((post) => post != null).map((post) => (
                  <li key={post.slug}><a className="editorial-inline-link" href={`/blogs/${post.slug}`}>{post.title}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></li>
                ))}
                <li><a className="editorial-inline-link" href="/about/what-to-expect">What to expect when you contact Howard Choi</a></li>
              </ul>
            </ReadingSectionBlock>
          )}

          <ReadingSectionBlock id="nearby" locale={locale} kicker={isKo(locale) ? "08 · 인근" : isEs(locale) ? "08 · Cerca" : "Nearby communities"} title={isKo(locale) ? "인근 서비스 지역" : isEs(locale) ? "Comunidades cercanas atendidas." : "Nearby communities served."}>
            <div className="editorial-link-grid">
              {serviceLocations.filter((item) => localFocus.nearby.includes(item.slug))
                .sort((a, b) => localFocus.nearby.indexOf(a.slug) - localFocus.nearby.indexOf(b.slug))
                .map((item) => (
                <a key={item.slug} href={`${localePrefix(locale)}/locations/${item.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koName : item.name}</h3>
                  <p>{item.county}</p>
                </a>
              ))}
            </div>
          </ReadingSectionBlock>
        </ReadingLayout>
        <div className="site-shell pb-12"><PageReviewed locale={locale} /></div>
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
