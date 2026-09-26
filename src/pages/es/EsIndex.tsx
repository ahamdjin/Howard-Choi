import { ArrowRight, BadgeCheck, Clock, FileText, Languages, MapPin, Scale, ShieldCheck } from "lucide-react";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import SpanishInquiryForm from "@/components/SpanishInquiryForm";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";
import { esPracticeContent } from "@/data/esPracticeContent";
import { esLocationContent } from "@/data/esLocationContent";
import { practiceMedia } from "@/data/practiceMedia";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import avvo from "@/assets/law-firm/badges/avvo.png";
import aaoaTopHundred from "@/assets/law-firm/badges/aaoa-top-100.webp";
import lawyersOfDistinction from "@/assets/law-firm/badges/lawyers-of-distinction-2026.webp";
import naopiaTopTen from "@/assets/law-firm/badges/naopia-top-ten-attorney-2025.webp";
import truckingTopTen from "@/assets/law-firm/badges/trucking-trial-lawyers-top-10.webp";
import bbbAccredited from "@/assets/law-firm/badges/bbb-accredited-business.webp";

const badges = [
  { src: avvo, alt: "Howard Choi en Avvo", href: "https://www.avvo.com/attorneys/90621-ca-howard-choi-4229558.html" },
  { src: aaoaTopHundred, alt: "American Academy of Attorneys Top 100, 2025", href: "https://aaoaus.com/" },
  { src: naopiaTopTen, alt: "NAOPIA Top Ten Personal Injury Attorney, 2025", href: "https://www.naopia.com/" },
  { src: lawyersOfDistinction, alt: "Lawyers of Distinction, 2026", href: "https://www.lawyersofdistinction.com/" },
  { src: truckingTopTen, alt: "Trucking Trial Lawyers Association Top 10", href: "https://thettla.org/" },
  { src: bbbAccredited, alt: "BBB Accredited Business", href: "https://www.bbb.org/" },
];

const reviews = [
  { name: "Maria R.", location: "Buena Park", text: "Siempre supe cuál era el siguiente paso. Mis preguntas recibieron respuestas claras y nunca sentí que me pasaran de una persona a otra." },
  { name: "Jason L.", location: "Fullerton", text: "Profesional, atento y paciente al explicar lo que estaba ocurriendo en cada etapa." },
  { name: "Soo K.", location: "Anaheim", text: "Fácil de contactar, respetuoso y muy organizado. Siempre entendí qué venía después." },
  { name: "Ariana T.", location: "La Mirada", text: "El proceso fue claro desde el principio y cada pregunta fue tomada en serio." },
];

const faqs = [
  ["¿Cuándo conviene hablar con un abogado después de un accidente?", "Puede ser útil hacerlo temprano, especialmente antes de que desaparezcan videos, testigos u otros registros y antes de dar declaraciones detalladas a una aseguradora."],
  ["¿La consulta inicial tiene costo?", "La firma indica que la consulta inicial es gratuita. Los términos exactos de cualquier representación se explican antes de contratar a la firma."],
  ["¿Qué debo guardar después de un accidente?", "Fotos, video, reportes, información de testigos, comunicaciones del seguro, registros médicos y documentos relacionados con pérdida de ingresos."],
  ["¿Howard Choi revisa personalmente los casos?", "El sitio presenta una práctica pequeña con acceso directo al abogado y menos capas de comunicación que una firma de alto volumen."],
  ["¿La firma atiende fuera de Buena Park?", "Sí, el sitio incluye varias comunidades cercanas de Orange County y Los Angeles County. La disponibilidad para un caso específico depende de sus hechos y jurisdicción."],
  ["¿La firma ofrece atención en español?", "Estas páginas proporcionan información general en español. La firma indica atención en inglés y coreano; confirme la disponibilidad de asistencia lingüística al contactar."],
];

const EsIndex = () => (
  <div className="home-page min-h-[100svh] overflow-x-clip bg-background">
    <SpanishNavigation />

    <div className="relative">
      <div className="sticky top-0 z-0 h-[100svh] w-full">
        <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#17130f]">
          <img src={heroJustice} alt="Biblioteca jurídica y balanza de justicia" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#17130f]/52" />
          <div className="hero-bottom-readability" />
          <div className="absolute inset-0 z-10 flex items-end">
            <div className="site-shell pb-24 md:pb-28">
              <div className="max-w-[790px] text-[#f3eee5]">
                <p className="mb-4 text-[13px] font-medium text-[#f3eee5]/88">Accidentes · Lesiones personales</p>
                <h1 className="editorial-serif text-[clamp(3rem,5.2vw,5.4rem)] leading-[0.94] tracking-[-0.04em]">Abogado de accidentes en Buena Park.</h1>
                <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#f3eee5]/78">Información clara y representación en reclamos por accidentes y lesiones personales desde Buena Park, California.</p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a href="#consulta" className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"><span className="relative z-10">Solicitar una consulta</span><ArrowRight className="relative z-10 h-4 w-4" /></a>
                  <a href={brand.phoneHref} className="text-[13px] text-[#f3eee5]/82 transition-opacity hover:opacity-70">Llamar {brand.phoneDisplay}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative z-10 w-full bg-background">
        <aside className="bg-[#f7f6f3] text-foreground">
          <div className="site-shell py-8 md:py-10">
            <div className="grid gap-px border-y border-foreground/12 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Scale, "Consulta gratuita", "Sin costo para hacer la primera consulta"],
                [BadgeCheck, "Honorarios de contingencia", "Los términos exactos se explican antes de la representación"],
                [Languages, "English & 한국어", "Información del sitio también disponible en español"],
                [Clock, "Los plazos importan", "Muchas demandas por lesiones tienen un plazo general de dos años"],
              ].map(([Icon, title, detail]) => {
                const C = Icon as typeof Scale;
                return <div key={String(title)} className="flex items-start gap-3.5 bg-[#f7f6f3] px-5 py-6"><C className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" strokeWidth={1.6} /><div><div className="text-[13px] font-medium leading-5">{String(title)}</div><div className="mt-1 text-[11px] leading-4 text-foreground/45">{String(detail)}</div></div></div>;
              })}
            </div>
          </div>
        </aside>

        <aside className="bg-background text-foreground">
          <div className="site-shell py-10 md:py-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/12 pb-5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Reconocimientos</div>
              <a href="/es/attorney" className="text-[11px] font-medium underline underline-offset-4">Conozca al abogado</a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {badges.map((badge) => <li key={badge.alt}><a href={badge.href} target="_blank" rel="noreferrer nofollow" className="flex h-[80px] items-center justify-center rounded-[3px] border border-[#8a6a48] bg-white px-3 py-2.5 transition-opacity hover:opacity-75"><img src={badge.src} alt={badge.alt} loading="lazy" decoding="async" className="max-h-[60px] w-auto max-w-full object-contain" /></a></li>)}
            </ul>
          </div>
        </aside>

        <section className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
          <div className="site-shell flex min-h-[100svh] w-full flex-col justify-center py-14">
            <div className="grid gap-10 lg:grid-cols-[0.3fr_0.7fr]">
              <div className="text-[10px] uppercase tracking-[0.14em] text-foreground/42">La firma</div>
              <div>
                <h2 className="editorial-serif max-w-[1120px] text-[clamp(2.25rem,4vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">Un reclamo construido alrededor de evidencia, comunicación clara y lo que el accidente realmente cambió.</h2>
                <p className="mt-7 max-w-[640px] text-[14px] leading-7 text-foreground/64">Tratamiento médico, seguro, culpa, pérdida de ingresos, atención futura y plazos pueden aparecer al mismo tiempo. La función de la firma es organizar esas piezas y mantener comprensible la siguiente decisión.</p>
                <a href="/es/about" className="mt-7 inline-flex items-center gap-2 bg-[#171717] px-4 py-3 text-[11px] font-medium text-white">Conocer la firma <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </div>
            <div className="mt-14 grid grid-cols-3 border-t border-foreground/14">
              {[["$100M+", "Recuperaciones totales reportadas"], ["11 años", "Historia de la firma"], ["$1M", "Mayor recuperación individual reportada"]].map(([value, label], index) => <div key={label} className={`min-h-[140px] px-4 py-5 ${index ? "border-l border-foreground/14" : ""}`}><div className="editorial-serif text-[clamp(2rem,4vw,4rem)]">{value}</div><div className="mt-8 text-[10px] leading-4 text-foreground/46">{label}</div></div>)}
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="site-shell">
            <div className="max-w-[720px]"><div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Áreas de práctica</div><h2 className="editorial-serif mt-5 text-[clamp(2.5rem,4.4vw,4.8rem)] leading-[0.96] tracking-[-0.035em]">Empiece por el tipo de accidente.</h2></div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {practiceAreas.map((practice) => {
                const copy = esPracticeContent[practice.slug];
                return <a key={practice.slug} href={`/es/practice-areas/${practice.slug}`} className="group block"><div className="aspect-[3/2] overflow-hidden bg-neutral-200"><img src={practiceMedia[practice.slug].src} alt={practiceMedia[practice.slug].alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><div className="flex items-center justify-between gap-4 border-b border-foreground/12 py-4"><div><h3 className="text-[15px] font-medium">{copy?.shortTitle}</h3><p className="mt-1 text-[11px] text-foreground/48">{copy?.description}</p></div><ArrowRight className="h-4 w-4 shrink-0" /></div></a>;
              })}
            </div>
          </div>
        </section>
      </div>
    </div>

    <div className="relative z-20 bg-background">
      <section className="flex min-h-[100svh] items-center bg-[#eee8df] py-16 md:py-24">
        <div className="site-shell">
          <div className="max-w-[700px]"><div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Después de llamar</div><h2 className="editorial-serif mt-5 text-[clamp(2.4rem,4vw,4.2rem)] leading-[1] tracking-[-0.03em]">Un proceso con pasos claros.</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Consulta", "Organizar qué ocurrió, las lesiones y las preguntas más urgentes."],
              ["02", "Investigación", "Identificar evidencia, responsables, registros y cobertura disponible."],
              ["03", "Documentación", "Conectar tratamiento, pérdidas de trabajo y cambios en la vida diaria."],
              ["04", "Resolución", "Evaluar opciones con el expediente organizado y los riesgos explicados."],
            ].map(([n, title, body]) => <div key={n} className="border-t border-foreground/15 pt-5"><div className="text-[10px] text-foreground/32">{n}</div><h3 className="editorial-serif mt-7 text-2xl">{title}</h3><p className="mt-3 text-[13px] leading-6 text-foreground/58">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center bg-[#0f0f0f] py-20 text-[#f4f1ea]">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
            <div><div className="text-[10px] uppercase tracking-[0.15em] text-white/40">Howard Choi</div><h2 className="editorial-serif mt-5 text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.94] tracking-[-0.035em]">Comunicación directa.<br />Menos capas.</h2><p className="mt-6 max-w-[520px] text-[14px] leading-7 text-white/58">La firma se presenta como una práctica pequeña y centrada en el abogado, con el objetivo de que las preguntas, la estrategia y los siguientes pasos sean más fáciles de entender.</p><a href="/es/attorney" className="mt-7 inline-flex items-center gap-2 bg-[#f3eee5] px-4 py-3 text-[11px] font-medium text-[#17130f]">Conocer a Howard Choi <ArrowRight className="h-3.5 w-3.5" /></a></div>
            <div className="overflow-hidden"><img src={leadCounsel} alt="Howard Choi, abogado de California en Buena Park" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center bg-[#f7f6f3] py-16 md:py-24">
        <div className="site-shell">
          <div className="text-center"><div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Experiencias de clientes</div><h2 className="editorial-serif mt-5 text-[clamp(2.4rem,4vw,4rem)] leading-[1]">Claridad cuando el proceso se siente complicado.</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => <blockquote key={review.name} className="border border-foreground/12 bg-[#e8e6e1] p-7"><p className="editorial-serif text-[1.5rem] leading-[1.35]">“{review.text}”</p><footer className="mt-6 text-[12px]"><strong>{review.name}</strong><span className="ml-2 text-foreground/48">{review.location}</span></footer></blockquote>)}
          </div>
          <p className="mt-6 text-[10px] leading-5 text-foreground/42">Las citas reflejan las versiones publicadas por la firma. Los resultados y experiencias varían según cada asunto.</p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="site-shell">
          <div className="max-w-[720px]"><div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Zonas de servicio</div><h2 className="editorial-serif mt-5 text-[clamp(2.4rem,4vw,4.2rem)] leading-[1]">Información local para comunidades cercanas.</h2></div>
          <div className="mt-12 editorial-link-grid">
            {serviceLocations.map((location, index) => <a key={location.slug} href={`/es/locations/${location.slug}`} className="editorial-link-card"><div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3.5 w-3.5" /></div><h3>{location.name}</h3><p>{esLocationContent[location.slug]?.description}</p></a>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f3efe8] py-16 md:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div><div className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Preguntas frecuentes</div><h2 className="editorial-serif mt-5 text-[clamp(2.4rem,4vw,4.1rem)] leading-[1]">Lo que suele preguntarse antes de una consulta.</h2></div>
          <div className="border-t border-foreground/12">{faqs.map(([q, a]) => <div key={q} className="border-b border-foreground/12 py-5"><h3 className="text-[15px] font-medium">{q}</h3><p className="mt-3 text-[13px] leading-6 text-foreground/58">{a}</p></div>)}</div>
        </div>
      </section>

      <section id="consulta" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#171717] py-20 text-white">
        <img src={heroBoardroom} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="site-shell relative z-10 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
          <div><div className="text-[10px] uppercase tracking-[0.15em] text-white/46">Consulta</div><h2 className="editorial-serif mt-5 text-[clamp(2.6rem,4.4vw,4.7rem)] leading-[0.98]">Cuéntenos qué ocurrió.</h2><p className="mt-6 max-w-[540px] text-[15px] leading-7 text-white/60">Comparta la fecha y el lugar del accidente, el tratamiento actual y lo que necesita entender. La consulta inicial es gratuita.</p><div className="mt-10 border-t border-white/12 pt-7"><a href={brand.phoneHref} className="text-[13px] text-white/82">Llamar {brand.phoneDisplay}</a><div className="mt-4 text-[12px] leading-5 text-white/48">{brand.address}</div><p className="mt-5 max-w-[520px] text-[11px] leading-5 text-white/40">La firma indica atención en inglés y coreano. Estas páginas ofrecen información general en español; confirme la disponibilidad de asistencia lingüística para una consulta.</p></div></div>
          <div className="rounded-[3px] bg-[#f7f6f3] p-6 text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8"><div className="text-[10px] uppercase tracking-[0.12em] text-foreground/38">Consulta gratuita</div><h3 className="editorial-serif mt-3 text-[clamp(1.6rem,2.2vw,2rem)] leading-[1.15]">Solicite que la firma se comunique con usted.</h3><SpanishInquiryForm /></div>
        </div>
      </section>

      <SpanishFooter />
    </div>
  </div>
);

export default EsIndex;
