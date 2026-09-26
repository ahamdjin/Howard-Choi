import { ArrowRight, BadgeCheck, FileText, Languages, MapPin, Scale, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import { brand, getPracticeArea, practiceAreas, serviceLocations } from "@/data/injurySite";
import { esPracticeContent, getSpanishPractice } from "@/data/esPracticeContent";
import {
  SpanishConsultationCta,
  SpanishFrame,
  SpanishHero,
  SpanishPracticeLinks,
  SpanishReadingLayout,
  SpanishReviewed,
  SpanishSectionBlock,
} from "./shared";

const relatedGuides: Record<string, Array<{ slug: string; title: string }>> = {
  "car-accidents": [
    { slug: "what-to-do-after-a-car-accident-in-california", title: "Qué hacer después de un accidente de auto en California" },
    { slug: "california-comparative-fault-personal-injury", title: "Culpa comparativa en California" },
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
  "truck-accidents": [
    { slug: "truck-accident-evidence-eld-records-california", title: "Evidencia de camiones: ELD y registros" },
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
  "motorcycle-accidents": [
    { slug: "california-comparative-fault-personal-injury", title: "Culpa comparativa en California" },
    { slug: "how-much-is-my-personal-injury-case-worth-california", title: "Cómo se analiza el valor de un caso" },
  ],
  "pedestrian-accidents": [
    { slug: "california-comparative-fault-personal-injury", title: "Culpa comparativa en California" },
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
  "rideshare-accidents": [
    { slug: "uber-lyft-accident-insurance-california", title: "Seguro en accidentes de Uber y Lyft" },
    { slug: "how-much-is-my-personal-injury-case-worth-california", title: "Cómo se analiza el valor de un caso" },
  ],
  "slip-and-fall": [
    { slug: "california-comparative-fault-personal-injury", title: "Culpa comparativa en California" },
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
  "wrongful-death": [
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
  "serious-injuries": [
    { slug: "how-much-is-my-personal-injury-case-worth-california", title: "Cómo se analiza el valor de un caso" },
    { slug: "california-personal-injury-deadlines", title: "Plazos para lesiones personales en California" },
  ],
};

export const SpanishAboutPage = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="La firma"
        title="Una firma de lesiones personales centrada en claridad y evidencia."
        description="Buena Park Injury Lawyer atiende asuntos de accidentes y lesiones desde su oficina de Buena Park, con un enfoque directo en preservar evidencia, entender el seguro y documentar las pérdidas reales."
        image={heroLawOffice}
      />
      <SpanishReadingLayout
        label="La firma · Buena Park"
        sections={[
          { id: "approach", label: "Nuestro enfoque" },
          { id: "direct", label: "Comunicación directa" },
          { id: "evidence", label: "Evidencia y documentación" },
          { id: "languages", label: "Idiomas" },
          { id: "areas", label: "Zonas de servicio" },
        ]}
      >
        <SpanishSectionBlock id="approach" kicker="01 · Enfoque" title="Primero entendemos qué cambió después del accidente." intro="Un reclamo por lesiones personales puede mezclar tratamiento médico, responsabilidad, seguros, pérdida de ingresos y plazos. La prioridad es ordenar esas piezas y explicar el siguiente paso de forma comprensible." />
        <SpanishSectionBlock id="direct" kicker="02 · Comunicación" title="Acceso más directo al abogado." intro="La firma se presenta como una práctica pequeña y centrada en el abogado. El objetivo es reducir pasos innecesarios y mantener al cliente cerca de quien revisa la estrategia legal." />
        <SpanishSectionBlock id="evidence" kicker="03 · Evidencia" title="La evidencia se organiza antes de negociar." intro="Fotografías, videos, reportes, expedientes médicos, información de seguros, salarios perdidos y registros que pueden desaparecer se revisan como parte de una sola cronología." />
        <SpanishSectionBlock id="languages" kicker="04 · Idiomas" title="Información disponible en varios idiomas." intro="La firma ofrece atención en inglés y coreano. Esta versión en español proporciona información general; al contactar, confirme la disponibilidad de asistencia lingüística para su consulta específica.">
          <div className="grid gap-4 border-y border-[#1E1C1A]/12 py-6 sm:grid-cols-3">
            <div><Languages className="h-4 w-4 text-[#7b5b3e]" /><div className="mt-3 text-sm font-medium">English</div></div>
            <div><Languages className="h-4 w-4 text-[#7b5b3e]" /><div className="mt-3 text-sm font-medium">한국어</div></div>
            <div><Languages className="h-4 w-4 text-[#7b5b3e]" /><div className="mt-3 text-sm font-medium">Español · información del sitio</div></div>
          </div>
        </SpanishSectionBlock>
        <SpanishSectionBlock id="areas" kicker="05 · Cobertura" title="Buena Park y comunidades cercanas." intro="La firma atiende asuntos en el norte de Orange County y ciudades cercanas de Los Angeles County. Las páginas locales explican recursos, datos y cuestiones prácticas de cada ciudad.">
          <div className="editorial-link-grid">
            {serviceLocations.slice(0, 6).map((location, index) => (
              <a key={location.slug} href={`/es/locations/${location.slug}`} className="editorial-link-card">
                <div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div>
                <h3>{location.name}</h3>
                <p>Información local sobre accidentes, registros, evidencia y próximos pasos.</p>
              </a>
            ))}
          </div>
        </SpanishSectionBlock>
      </SpanishReadingLayout>
      <div className="site-shell pb-12"><SpanishReviewed /></div>
      <SpanishConsultationCta />
    </main>
  </SpanishFrame>
);

export const SpanishAttorneyPage = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="Abogado"
        title="Howard Choi"
        description="Abogado de California en Buena Park, State Bar No. 284364. Su práctica se centra en accidentes, lesiones personales, evidencia, seguros y pérdidas médicas y económicas."
        image={leadCounsel}
      />
      <SpanishReadingLayout
        label="Howard Choi · Abogado"
        sections={[
          { id: "credentials", label: "Credenciales" },
          { id: "practice", label: "Práctica" },
          { id: "communication", label: "Comunicación" },
          { id: "review", label: "Cómo se revisa un caso" },
        ]}
      >
        <SpanishSectionBlock id="credentials" kicker="01 · Credenciales" title="Licencia de California verificable." intro="Howard Jong-yol Choi figura como abogado activo del State Bar of California con número 284364 y admisión en 2012.">
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="editorial-inline-link mt-6"><span>Ver perfil del State Bar of California</span><ArrowRight className="h-4 w-4" /></a>
        </SpanishSectionBlock>
        <SpanishSectionBlock id="practice" kicker="02 · Práctica" title="Accidentes y lesiones personales." intro="La práctica incluye accidentes de auto, camión, motocicleta, peatones, Uber y Lyft, resbalones y caídas, muerte por negligencia y lesiones graves.">
          <SpanishPracticeLinks />
        </SpanishSectionBlock>
        <SpanishSectionBlock id="communication" kicker="03 · Comunicación" title="Un modelo de firma pequeña y acceso directo." intro="El sitio refleja una práctica orientada a comunicación directa, explicación de decisiones y menos capas entre el cliente y el abogado que revisa el caso." />
        <SpanishSectionBlock id="review" kicker="04 · Revisión" title="Los hechos primero." intro="Antes de una conclusión sobre fuerza del caso, valor o estrategia, deben revisarse los hechos, el tratamiento, la evidencia, la responsabilidad, el seguro y los plazos aplicables.">
          <div className="grid gap-5 sm:grid-cols-2">
            {[["Evidencia", "Fotos, reportes, video, testigos y registros."], ["Daños", "Tratamiento, trabajo perdido, atención futura y limitaciones."], ["Seguro", "Pólizas disponibles y partes potencialmente responsables."], ["Plazos", "Fechas de accidente, reclamos y posibles excepciones."]].map(([title, body]) => <div key={title} className="border-t border-[#1E1C1A]/12 pt-5"><h3 className="text-lg">{title}</h3><p className="mt-2 text-sm text-[#1E1C1A]/62">{body}</p></div>)}
          </div>
        </SpanishSectionBlock>
      </SpanishReadingLayout>
      <div className="site-shell pb-12"><SpanishReviewed /></div>
      <SpanishConsultationCta />
    </main>
  </SpanishFrame>
);

export const SpanishResultsPage = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="Resultados y experiencia"
        title="Resultados reportados por la firma."
        description="Las cifras que aparecen aquí son información reportada por la firma. Los resultados anteriores no garantizan un resultado similar en otro asunto."
        image={heroCourthouse}
      />
      <SpanishReadingLayout label="Resultados · Contexto" sections={[{ id: "numbers", label: "Cifras reportadas" }, { id: "context", label: "Cómo leerlas" }, { id: "factors", label: "Factores del caso" }]}>
        <SpanishSectionBlock id="numbers" kicker="01 · Cifras" title="Experiencia expresada con contexto.">
          <div className="grid gap-4 md:grid-cols-3">
            {[["$100M+", "Recuperaciones totales reportadas"], ["$1M", "Mayor recuperación reportada para un solo cliente"], ["11 años", "Historia operativa de la firma"]].map(([value, label]) => <div key={label} className="border border-[#1E1C1A]/12 p-6"><div className="editorial-serif text-4xl">{value}</div><p className="mt-3 text-sm text-[#1E1C1A]/58">{label}</p></div>)}
          </div>
        </SpanishSectionBlock>
        <SpanishSectionBlock id="context" kicker="02 · Contexto" title="Un resultado anterior no es una promesa." intro="Cada asunto depende de sus propios hechos, lesiones, evidencia, seguro, partes responsables, lugar y estrategia. Una cifra histórica no permite predecir otro caso." />
        <SpanishSectionBlock id="factors" kicker="03 · Factores" title="El valor necesita hechos y documentación." intro="La responsabilidad, el tratamiento, la atención futura, la pérdida de ingresos, la evidencia, los límites de seguro y la culpa comparativa pueden cambiar de forma importante el resultado de un reclamo.">
          <a href="/es/case-value-calculator" className="editorial-inline-link mt-6"><span>Usar la calculadora educativa</span><ArrowRight className="h-4 w-4" /></a>
        </SpanishSectionBlock>
      </SpanishReadingLayout>
      <SpanishConsultationCta />
    </main>
  </SpanishFrame>
);

export const SpanishPracticeAreasPage = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="Lesiones personales"
        title="Áreas de práctica."
        description="Guías para los tipos de accidentes y lesiones que atiende la firma, con información sobre evidencia, seguro, daños y próximos pasos."
        image={heroJustice}
      />
      <SpanishReadingLayout label="Áreas de práctica" sections={[{ id: "areas", label: "Tipos de casos" }, { id: "how", label: "Cómo usar estas guías" }]}>
        <SpanishSectionBlock id="areas" kicker="01 · Casos" title="Empiece por el tipo de accidente." intro="Cada guía explica los problemas que suelen aparecer en ese tipo de reclamo y conecta con recursos relacionados.">
          <SpanishPracticeLinks />
        </SpanishSectionBlock>
        <SpanishSectionBlock id="how" kicker="02 · Guías" title="Información general, no una conclusión sobre su caso." intro="Estas páginas ayudan a organizar preguntas sobre evidencia, responsabilidad, seguro y daños. Una evaluación legal específica requiere revisar los hechos y documentos de su situación." />
      </SpanishReadingLayout>
      <SpanishConsultationCta />
    </main>
  </SpanishFrame>
);

export const SpanishPracticeAreaDetailPage = () => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  const copy = params.slug ? getSpanishPractice(params.slug) : undefined;
  if (!practice || !copy) return null;
  const guides = relatedGuides[copy.slug] || [];

  return (
    <SpanishFrame>
      <main className="detail-guide">
        <SpanishHero eyebrow="Área de práctica" title={copy.title} description={copy.description} image={heroJustice} />
        <SpanishReadingLayout
          label={copy.shortTitle}
          sections={[
            { id: "overview", label: "Panorama" },
            { id: "issues", label: "Problemas comunes" },
            { id: "evidence", label: "Evidencia" },
            { id: "value", label: "Daños y valor" },
            { id: "insurance", label: "Seguro" },
            { id: "faq", label: "Preguntas" },
            { id: "guides", label: "Guías relacionadas" },
            { id: "related", label: "Otros casos" },
            { id: "areas", label: "Zonas" },
          ]}
        >
          <SpanishSectionBlock id="overview" kicker="01 · Panorama" title={copy.shortTitle} intro={copy.intro} />
          <SpanishSectionBlock id="issues" kicker="02 · Problemas comunes" title="Qué suele necesitar una revisión más cuidadosa.">
            <div className="grid border-y border-[#1E1C1A]/12 sm:grid-cols-2">
              {copy.issues.map((issue, index) => <div key={issue} className={`py-5 ${index % 2 ? "sm:border-l sm:pl-6" : "sm:pr-6"} border-b border-[#1E1C1A]/10 last:border-b-0`}><span className="text-[10px] text-[#1E1C1A]/34">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 text-sm">{issue}</p></div>)}
            </div>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="evidence" kicker="03 · Evidencia" title={copy.evidenceTitle} intro={copy.evidenceIntro}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[["Escena", "Fotos, video, ubicación y condiciones."], ["Registros", "Reportes policiales o de incidente."], ["Personas", "Testigos y comunicaciones relevantes."], ["Pérdidas", "Tratamiento, facturas, salarios y atención futura."]].map(([title, body]) => <div key={title} className="border-t border-[#1E1C1A]/12 pt-4"><h3 className="text-base">{title}</h3><p className="mt-2 text-sm text-[#1E1C1A]/60">{body}</p></div>)}
            </div>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="value" kicker="04 · Daños" title="Qué puede influir en el valor de un reclamo." intro={copy.valueIntro}>
            <a href="/es/case-value-calculator" className="editorial-inline-link mt-6"><span>Ver la calculadora educativa de valor</span><ArrowRight className="h-4 w-4" /></a>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="insurance" kicker="05 · Seguro" title="Identifique la cobertura antes de asumir quién paga." intro={copy.insuranceIntro} />
          <SpanishSectionBlock id="faq" kicker="06 · Preguntas" title="Preguntas frecuentes.">
            <div className="space-y-6">
              {copy.faqs.map(([q, a]) => <div key={q} className="border-t border-[#1E1C1A]/12 pt-5"><h3 className="text-[1.1rem]">{q}</h3><p className="mt-2 text-sm leading-6 text-[#1E1C1A]/62">{a}</p></div>)}
            </div>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="guides" kicker="07 · Recursos" title="Guías relacionadas.">
            <div className="border-t border-[#1E1C1A]/12">
              {guides.map((guide) => <a key={guide.slug} href={`/es/blogs/${guide.slug}`} className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 text-[12px]"><span>{guide.title}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>)}
            </div>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="related" kicker="08 · Explorar" title="Otras áreas de lesiones personales.">
            <div className="editorial-link-grid">
              {practiceAreas.filter((item) => item.slug !== copy.slug).slice(0, 4).map((item, index) => {
                const itemCopy = esPracticeContent[item.slug];
                return <a key={item.slug} href={`/es/practice-areas/${item.slug}`} className="editorial-link-card"><div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div><h3>{itemCopy?.shortTitle || item.title}</h3><p>{itemCopy?.description || item.description}</p></a>;
              })}
            </div>
          </SpanishSectionBlock>
          <SpanishSectionBlock id="areas" kicker="09 · Zonas" title="Dónde atiende la firma." intro="Explore información local para Buena Park y comunidades cercanas.">
            <div className="editorial-link-grid">
              {serviceLocations.slice(0, 6).map((location, index) => <a key={location.slug} href={`/es/locations/${location.slug}`} className="editorial-link-card"><div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3.5 w-3.5" /></div><h3>{location.name}</h3><p>Guía local de accidentes, registros y evidencia.</p></a>)}
            </div>
            <a href="/es/locations" className="editorial-inline-link mt-7"><span>Ver todas las zonas</span><ArrowRight className="h-4 w-4" /></a>
          </SpanishSectionBlock>
        </SpanishReadingLayout>
        <div className="site-shell pb-12"><SpanishReviewed /></div>
        <SpanishConsultationCta />
      </main>
    </SpanishFrame>
  );
};
