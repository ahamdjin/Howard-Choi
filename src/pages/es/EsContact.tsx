import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import GHLCalendar from "@/components/GHLCalendar";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import { brand } from "@/data/injurySite";

const EsContact = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <SpanishNavigation />

      <section className="relative flex min-h-[100svh] items-end pt-24 md:min-h-[560px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img src={heroCityBoardroom} alt="Sala de conferencias privada de un bufete" style={{ y: heroY }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[112%] w-full object-cover" />
        <div className="absolute inset-0 bg-[#17130f]/64" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/78 via-transparent to-[#17130f]/12" />
        <div className="hero-bottom-readability" />

        <div className="site-shell relative z-10 pb-12 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-[700px]">
            <span className="mb-4 block text-[11px] text-[#f3eee5]/62">Contacto · Buena Park</span>
            <PageBreadcrumb locale="es" title="Contacto" />
            <h1 className="editorial-serif text-[clamp(2.75rem,4.15vw,4.25rem)] leading-[0.95] tracking-[-0.024em]">Cuéntenos qué ocurrió. Le diremos dónde está parado.</h1>
            <div className="mt-6 flex flex-wrap gap-3"><a href="#calendar" className="inline-flex min-h-11 items-center rounded-full bg-[#f3eee5] px-5 py-3 text-sm font-semibold text-[#17130f]">Reservar una consulta</a><a href="#message" className="inline-flex min-h-11 items-center rounded-full border border-white/50 px-5 py-3 text-sm">Enviar un mensaje</a></div>
            <p className="mt-5 max-w-[540px] text-[14px] leading-6 text-[#f3eee5]/68 md:text-[15px]">La fecha y el lugar del accidente, cómo va el tratamiento, lo que haya enviado la aseguradora y las preguntas que le preocupan. Un resumen sencillo es suficiente para la primera llamada. No necesita un expediente completo.</p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="mb-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href={brand.phoneHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Phone className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">Teléfono</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.phoneDisplay}</div></a>
          <a href={brand.emailHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Mail className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">Correo electrónico</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.email}</div></a>
          <a href="https://share.google/LBJ1C8zWrZFjJBkVe" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><MapPin className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">Oficina</div><div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">{brand.address}</div></a>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          <motion.section id="message" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.68 }} className="scroll-mt-24 rounded-[4px] bg-[#e9e6e1] p-7 md:p-9 xl:sticky xl:top-24">
            <span className="text-[11px] text-foreground/48">Enviar una nota</span>
            <h2 className="editorial-serif mt-3 text-[clamp(2rem,2.55vw,3rem)] leading-[0.98] tracking-[-0.022em]">¿Dónde está el asunto ahora mismo?</h2>
            <p className="mt-4 max-w-[470px] text-[14px] leading-6 text-foreground/58">Puede incluir dónde y cuándo ocurrió, qué se lesionó, cómo va el tratamiento, si ha perdido trabajo y cualquier detalle del reclamo o seguro. Nadie espera un expediente completo. Evite enviar información altamente confidencial o urgente hasta que la firma haya confirmado una relación abogado-cliente.</p>
            <WebsiteInquiryForm locale="es" />
          </motion.section>

          <motion.section id="calendar" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.68, delay: 0.06 }} className="w-full scroll-mt-20 rounded-[4px] bg-[#1a1714] p-4 text-[#f3eee5] md:p-5">
            <div className="flex items-start justify-between gap-6 px-3 pb-5 pt-3 md:px-4 md:pb-6 md:pt-4">
              <div><span className="text-[11px] text-[#f3eee5]/42">Consulta</span><h2 className="editorial-serif mt-3 max-w-[620px] text-[clamp(2rem,2.8vw,3rem)] leading-[0.98] tracking-[-0.022em]">Reserve un horario de consulta disponible.</h2><p className="mt-4 max-w-[620px] text-[14px] leading-6 text-[#f3eee5]/52">Elija una fecha y hora disponible y complete la reserva aquí. Si ya tiene fotos, reportes, información de seguro, expedientes médicos o correspondencia, téngalos juntos para la conversación; no es necesario subirlos todos por adelantado.</p></div>
              <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#f3eee5]/42" />
            </div>
            <GHLCalendar locale="es" />
          </motion.section>
        </div>

        <section className="mt-16 border-t border-foreground/12 pt-7 md:mt-20 md:pt-9">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
            <div><span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Antes de la consulta</span></div>
            <div>
              <h2 className="editorial-serif max-w-[760px] text-[clamp(2rem,3vw,3.2rem)] leading-[1.02] tracking-[-0.025em]">Traiga lo que tenga. La primera llamada sirve sobre todo para identificar lo que falta.</h2>
              <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-3">
                {[
                  [MapPin, "Cronología del incidente", "La fecha, el lugar exacto, cómo ocurrió y cualquier número de reporte o reclamo que haya recibido."],
                  [FileText, "Registros que ya tiene", "Fotos, video, información del seguro, detalles de tratamiento, facturas, pérdida de trabajo y correspondencia importante."],
                  [ShieldCheck, "Plazos y próximos pasos", "Si le preocupa un plazo, una entidad pública, preservación de evidencia o una solicitud de la aseguradora, menciónelo en la primera conversación."],
                ].map(([Icon, title, body], index) => {
                  const ItemIcon = Icon as typeof MapPin;
                  return <div key={String(title)} className="border-b border-foreground/12 py-7 md:border-b-0 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><ItemIcon className="h-4 w-4 text-foreground/52" /><div className="mt-8 text-[12px] font-semibold">{String(title)}</div><p className="mt-3 text-[11px] leading-5 text-foreground/52">{String(body)}</p></div>;
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                <Link to="/es/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">Explorar áreas de práctica <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link to="/es/attorney" className="inline-flex items-center gap-2 hover:opacity-60">Conozca a Howard Choi <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
              <p className="mt-7 max-w-[780px] text-[11px] leading-5 text-foreground/45">Howard Choi habla inglés y coreano. Esta página ofrece información del sitio en español; confirme la disponibilidad de asistencia lingüística al comunicarse con la firma.</p>
            </div>
          </div>
        </section>
      </main>

      <SpanishFooter />
    </div>
  );
};

export default EsContact;
