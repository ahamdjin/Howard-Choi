import { ArrowRight, MapPin, Route, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import { getServiceLocation, serviceLocations } from "@/data/injurySite";
import { getSpanishLocation, esLocationContent } from "@/data/esLocationContent";
import {
  SpanishConsultationCta,
  SpanishFrame,
  SpanishHero,
  SpanishPracticeLinks,
  SpanishReadingLayout,
  SpanishReviewed,
  SpanishSectionBlock,
} from "./shared";

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

export const SpanishLocationsPage = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="Zonas de servicio"
        title="Buena Park y comunidades cercanas."
        description="Guías locales sobre accidentes y lesiones en el norte de Orange County y ciudades cercanas de Los Angeles County, con datos, recursos de registros, evidencia y próximos pasos."
        image={heroBoardroom}
      />
      <SpanishReadingLayout label="Zonas · Cobertura local" sections={[{ id: "areas", label: "Comunidades" }, { id: "local", label: "Por qué importa la ubicación" }, { id: "start", label: "Comenzar" }]}>
        <SpanishSectionBlock id="areas" kicker="01 · Comunidades" title="Empiece por la ciudad donde ocurrió el accidente." intro="El lugar puede determinar qué agencia preparó el reporte, qué cámaras pueden existir y qué condado sería relevante si hubiera litigio.">
          <div className="editorial-link-grid">
            {serviceLocations.map((location, index) => {
              const copy = esLocationContent[location.slug];
              return <a key={location.slug} href={`/es/locations/${location.slug}`} className="editorial-link-card"><div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div><h3>{location.name}</h3><p>{copy?.description || "Información local sobre accidentes y lesiones."}</p></a>;
            })}
          </div>
        </SpanishSectionBlock>
        <SpanishSectionBlock id="local" kicker="02 · Contexto local" title="La ubicación es útil cuando ayuda a encontrar la evidencia correcta." intro="La escena, la vía, la propiedad, la agencia que respondió, cámaras cercanas, el condado y el seguro pueden cambiar cómo se documenta un reclamo.">
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[
              [MapPin, "Lugar exacto", "Intersección, carretera, negocio, propiedad o punto preciso donde ocurrió."],
              [Route, "Registros y tratamiento", "Reporte, atención médica, gastos y cronología después del accidente."],
              [ShieldCheck, "Seguro y responsabilidad", "Personas, empresas, propietarios y pólizas que pueden ser relevantes."],
            ].map(([Icon, title, body], index) => {
              const C = Icon as typeof MapPin;
              return <div key={String(title)} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><C className="h-4 w-4 stroke-[1.3] text-[#381907]" /><h3 className="mt-9 text-[1.35rem]">{String(title)}</h3><p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">{String(body)}</p></div>;
            })}
          </div>
        </SpanishSectionBlock>
        <SpanishSectionBlock id="start" kicker="03 · Consulta" title="No necesita tener todos los documentos antes de empezar." intro="La fecha y lugar del accidente, el tratamiento actual, la información del seguro, fotos, reportes y comunicaciones que ya tenga son suficientes para comenzar una conversación." />
      </SpanishReadingLayout>
      <SpanishConsultationCta />
    </main>
  </SpanishFrame>
);

export const SpanishLocationDetailPage = () => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  const copy = params.slug ? getSpanishLocation(params.slug) : undefined;
  if (!location || !copy) return null;
  const resource = locationResources[location.slug];

  return (
    <SpanishFrame>
      <main className="detail-guide">
        <SpanishHero
          eyebrow={`${location.county} · Zona de servicio`}
          title={location.slug === "buena-park" ? "Guía de accidentes y lesiones en Buena Park" : `Abogado de lesiones personales en ${location.name}`}
          description={copy.description}
          image={heroJustice}
        />
        <SpanishReadingLayout
          label={`${location.name} · Guía local`}
          sections={[
            { id: "overview", label: "Panorama local" },
            { id: "data", label: "Datos de colisiones" },
            { id: "records", label: "Registros locales" },
            { id: "cases", label: "Tipos de casos" },
            { id: "evidence", label: "Evidencia" },
            { id: "deadlines", label: "Plazos" },
            { id: "nearby", label: "Ciudades cercanas" },
          ]}
        >
          <SpanishSectionBlock id="overview" kicker="01 · Panorama local" title={`Si el accidente ocurrió en ${location.name}.`} intro={copy.localIntro}>
            <div className="editorial-callout"><span className="editorial-callout__label">Útil saber</span><p>{copy.localNote}</p></div>
          </SpanishSectionBlock>

          <SpanishSectionBlock id="data" kicker="02 · Datos locales" title={`Colisiones con lesiones en ${location.name}.`} intro={`California Office of Traffic Safety reportó ${location.ots.total.toLocaleString()} personas fallecidas o lesionadas en colisiones de tráfico en ${location.name} durante ${location.ots.year}. Estos datos de ciudad ofrecen contexto general y no predicen el resultado de ningún caso individual.`}>
            <div className="grid border-y border-[#1E1C1A]/12 sm:grid-cols-3">
              <div className="py-6 sm:pr-6"><div className="editorial-serif text-[2.1rem]">{location.ots.total.toLocaleString()}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">Víctimas fallecidas o lesionadas</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:px-6"><div className="editorial-serif text-[2.1rem]">{location.ots.pedestrians}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">Víctimas peatonales</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:pl-6"><div className="editorial-serif text-[2.1rem]">{location.ots.motorcycles}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">Víctimas en motocicleta</div></div>
            </div>
            <a href={location.ots.source} target="_blank" rel="noreferrer" className="editorial-inline-link mt-5"><span>Ver datos oficiales de California OTS</span><ArrowRight className="h-4 w-4" /></a>
          </SpanishSectionBlock>

          <SpanishSectionBlock id="records" kicker="03 · Registros" title="Agencias y recursos oficiales." intro="La agencia correcta depende del lugar y del tipo de accidente. Estos enlaces ayudan a identificar dónde pueden encontrarse reportes o información judicial.">
            {resource ? <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-2">
              <a href={resource.agencyHref} target="_blank" rel="noreferrer" className="group border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:pr-7"><div className="text-[10px] text-[#1E1C1A]/40">Agencia / registros</div><div className="mt-3 flex items-center justify-between gap-4 text-sm font-medium">{resource.agency}<ArrowRight className="h-4 w-4" /></div></a>
              <a href={resource.courtHref} target="_blank" rel="noreferrer" className="group py-6 md:border-l md:border-[#1E1C1A]/12 md:pl-7"><div className="text-[10px] text-[#1E1C1A]/40">Tribunal</div><div className="mt-3 flex items-center justify-between gap-4 text-sm font-medium">{resource.court}<ArrowRight className="h-4 w-4" /></div></a>
            </div> : null}
          </SpanishSectionBlock>

          <SpanishSectionBlock id="cases" kicker="04 · Casos" title="El tipo de accidente cambia la evidencia y el seguro." intro="Seleccione el tipo de asunto para ver información específica sobre responsabilidad, documentación y cobertura.">
            <SpanishPracticeLinks />
          </SpanishSectionBlock>

          <SpanishSectionBlock id="evidence" kicker="05 · Evidencia" title="Preserve lo que puede cambiar o desaparecer." intro="Fotografías, video, reportes, testigos, registros médicos, comunicaciones de seguro y documentos de trabajo ayudan a construir una cronología más clara. Si existen cámaras cercanas, el tiempo puede importar." />

          <SpanishSectionBlock id="deadlines" kicker="06 · Plazos" title="Los plazos legales y la vida útil de la evidencia son problemas distintos." intro="Muchas demandas por lesiones personales en California tienen un plazo general de dos años, pero existen excepciones y los reclamos contra entidades públicas pueden requerir acciones mucho antes.">
            <a href="/es/blogs/california-personal-injury-deadlines" className="editorial-inline-link mt-6"><span>Leer la guía de plazos de California</span><ArrowRight className="h-4 w-4" /></a>
          </SpanishSectionBlock>

          <SpanishSectionBlock id="nearby" kicker="07 · Cerca" title="Comunidades cercanas.">
            <div className="editorial-link-grid">
              {serviceLocations.filter((item) => item.slug !== location.slug).slice(0, 4).map((item, index) => (
                <a key={item.slug} href={`/es/locations/${item.slug}`} className="editorial-link-card"><div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div><h3>{item.name}</h3><p>{esLocationContent[item.slug]?.description}</p></a>
              ))}
            </div>
          </SpanishSectionBlock>
        </SpanishReadingLayout>
        <div className="site-shell pb-12"><SpanishReviewed /></div>
        <SpanishConsultationCta />
      </main>
    </SpanishFrame>
  );
};
