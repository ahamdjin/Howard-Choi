import { ArrowRight, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import SpanishInquiryForm from "@/components/SpanishInquiryForm";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import { brand } from "@/data/injurySite";

const EsContact = () => (
  <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <SpanishNavigation />
    <main>
      <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#17130f] pt-[60px] text-[#f3eee5]">
        <img src={heroCityBoardroom} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,.88),rgba(20,16,13,.62)_56%,rgba(20,16,13,.34))]" />
        <div className="site-shell relative z-10 grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-white/46">Contacto</div>
            <h1 className="editorial-serif mt-5 text-[clamp(3rem,5.2vw,5.6rem)] leading-[0.93] tracking-[-0.04em]">Empiece con lo que sabe ahora.</h1>
            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-white/70">No necesita tener todos los reportes o expedientes para comunicarse. Comparta qué ocurrió, cuándo pasó y qué necesita entender.</p>
            <div className="mt-9 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
              <a href={brand.phoneHref} className="flex items-start gap-3 text-sm"><Phone className="mt-0.5 h-4 w-4" /><span><span className="block text-white/48">Teléfono</span><strong className="mt-1 block">{brand.phoneDisplay}</strong></span></a>
              <a href={brand.emailHref} className="flex items-start gap-3 text-sm"><Mail className="mt-0.5 h-4 w-4" /><span><span className="block text-white/48">Correo</span><strong className="mt-1 block">{brand.email}</strong></span></a>
            </div>
          </div>
          <div className="rounded-[3px] bg-[#f7f6f3] p-6 text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:p-8">
            <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/38">Consulta inicial gratuita</div>
            <h2 className="editorial-serif mt-3 text-[clamp(1.8rem,2.6vw,2.5rem)] leading-[1.08]">Solicite que la firma se comunique con usted.</h2>
            <SpanishInquiryForm />
          </div>
        </div>
      </section>

      <section className="site-shell py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="border-t border-foreground/12 pt-5"><MapPin className="h-4 w-4 text-[#7b5b3e]" /><h2 className="mt-5 text-xl">Oficina</h2><p className="mt-3 text-sm leading-6 text-foreground/58">{brand.address}</p><a href={brand.mapsHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs underline underline-offset-4">Ver en Google Maps <ArrowRight className="h-3.5 w-3.5" /></a></div>
          <div className="border-t border-foreground/12 pt-5"><FileText className="h-4 w-4 text-[#7b5b3e]" /><h2 className="mt-5 text-xl">Qué puede enviar</h2><p className="mt-3 text-sm leading-6 text-foreground/58">Fecha y lugar del accidente, fotos, reporte, información del seguro, tratamiento actual y una explicación breve de lo que necesita.</p></div>
          <div className="border-t border-foreground/12 pt-5"><ShieldCheck className="h-4 w-4 text-[#7b5b3e]" /><h2 className="mt-5 text-xl">Antes de enviar información sensible</h2><p className="mt-3 text-sm leading-6 text-foreground/58">Contactar a la firma no crea por sí solo una relación abogado-cliente. Evite enviar información altamente confidencial hasta que la firma confirme la representación.</p></div>
        </div>
        <div className="mt-12 rounded-[3px] bg-[#eee8df] p-6 md:p-8"><strong className="text-sm">Nota sobre el idioma:</strong><p className="mt-2 max-w-[820px] text-sm leading-6 text-foreground/60">La firma indica atención en inglés y coreano. Esta versión del sitio ofrece información general en español; confirme la disponibilidad de asistencia lingüística cuando se comunique.</p></div>
      </section>
    </main>
    <SpanishFooter />
  </div>
);

export default EsContact;
