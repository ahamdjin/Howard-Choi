import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Link } from "react-router-dom";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import { esBlogPosts } from "@/data/esBlogs";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";

const resourcePaths = [
  { label: "Acabo de tener un accidente", body: "Empiece con los pasos inmediatos, evidencia, tratamiento, seguro y los registros que vale la pena preservar.", href: "/es/blogs/what-to-do-after-a-car-accident-in-california" },
  { label: "La culpa está en disputa", body: "Entienda la culpa comparativa de California y por qué una discusión sobre responsabilidad no termina automáticamente un reclamo.", href: "/es/blogs/california-comparative-fault-personal-injury" },
  { label: "Quiero entender el valor del caso", body: "Revise los factores médicos, financieros, de seguro, culpa y largo plazo que pueden afectar un reclamo por lesiones.", href: "/es/blogs/how-much-is-my-personal-injury-case-worth-california" },
  { label: "Me preocupan los plazos", body: "Revise los plazos de California, los reclamos contra entidades públicas y por qué la evidencia puede desaparecer mucho antes de que venza una demanda.", href: "/es/blogs/california-personal-injury-deadlines" },
];

const EsBlogs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.018]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <SpanishNavigation />
      <div className="relative">
        <div className="relative min-h-[100svh] md:sticky md:top-0 md:h-[70svh] md:min-h-[620px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
          <motion.img src={heroJusticeLibrary} alt="Biblioteca jurídica y estatua de la Justicia" style={{ y: imageY, scale: heroScale }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[112%] w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#17130f]/58" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/90 via-[#17130f]/14 to-[#17130f]/22" />
          <div className="hero-bottom-readability" />
          <div className="site-shell relative z-10 flex min-h-[100svh] items-end pb-10 pt-24 md:h-full md:min-h-0 md:pb-12 lg:pb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-white/18 pt-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <div><span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">Recursos legales</span><div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">Guías de lesiones de California<br />Buena Park, California</div></div>
              <div className="max-w-[980px]"><PageBreadcrumb locale="es" title="Guías" /><h1 className="editorial-serif text-[clamp(2.35rem,3.45vw,3.9rem)] leading-[1] tracking-[-0.026em]">Respuestas claras para las preguntas que aparecen después de un accidente.</h1><p className="mt-5 max-w-[700px] text-[14px] leading-6 text-[#f3eee5]/67 md:text-[15px] md:leading-7">Información práctica de California sobre reclamos por accidentes, seguro, evidencia, plazos, lesiones y valor del caso, respaldada por fuentes legales y oficiales dentro de cada guía.</p></div>
            </motion.div>
          </div>
        </div>

        <main className="relative z-10 bg-background py-16 md:py-20 lg:py-24">
          <div className="site-shell">
            <a href="#all-guides" className="mb-8 inline-flex min-h-11 items-center border-b border-current text-sm">Ver todos los artículos ↓</a>
            <section className="mb-16 border-b border-foreground/12 pb-16 md:mb-20 md:pb-20">
              <div className="grid gap-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Empiece con su pregunta</span>
                <div>
                  <h2 className="editorial-serif max-w-[760px] text-[clamp(1.9rem,2.6vw,2.8rem)] leading-[1.05] tracking-[-0.022em]">Encuentre la guía que corresponda a lo que necesita entender ahora.</h2>
                  <div className="mt-9 grid border-t border-foreground/12 sm:grid-cols-2">
                    {resourcePaths.map((item, index) => (
                      <Link key={item.href} to={item.href} className="group border-b border-foreground/12 py-6 sm:border-l sm:px-6 sm:odd:border-l-0 sm:odd:pl-0">
                        <div className="flex items-center justify-between text-[9px] text-foreground/28"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                        <h3 className="editorial-serif mt-7 text-[1.45rem] leading-tight">{item.label}</h3>
                        <p className="mt-3 max-w-[460px] text-[11px] leading-5 text-foreground/50">{item.body}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                    <Link to="/es/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">Ver áreas de lesiones personales <ArrowRight className="h-3.5 w-3.5" /></Link>
                    <Link to="/es/case-value-calculator" className="inline-flex items-center gap-2 hover:opacity-60">Usar la calculadora de valor del caso <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>
              </div>
            </section>

            <div id="all-guides" className="scroll-mt-24 grid gap-5 border-b border-foreground/12 pb-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Todas las guías</span>
              <div className="flex items-end justify-between gap-6"><h2 className="editorial-serif text-[clamp(1.8rem,2.35vw,2.45rem)] leading-[1.08] tracking-[-0.02em]">Ley de lesiones de California, explicada con claridad.</h2><span className="hidden text-[10px] text-muted-foreground sm:block">{esBlogPosts.length} artículos</span></div>
            </div>

            <div className="divide-y divide-foreground/12">
              {esBlogPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.65, delay: Math.min(index * 0.05, 0.15) }} className="py-7 md:py-9 lg:py-10">
                  <Link to={`/es/blogs/${post.slug}`} className="group grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-10 xl:gap-14">
                    <div className="relative min-h-[280px] overflow-hidden bg-[#17130f] md:min-h-[340px]"><img src={post.image} alt={post.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018]" /><div className="absolute inset-0 bg-[#17130f]/10 transition-colors duration-500 group-hover:bg-transparent" /></div>
                    <div className="flex min-h-[280px] flex-col justify-between py-1 md:min-h-[340px] lg:py-2">
                      <div><div className="mb-5 flex items-center gap-4 text-[10px] text-muted-foreground"><span>{String(index + 1).padStart(2, "0")}</span><span>{post.category}</span><span>·</span><span>{post.readingTime}</span></div><h2 className="editorial-serif max-w-[760px] text-[clamp(1.8rem,2.65vw,2.85rem)] leading-[1.02] tracking-[-0.022em]">{post.title}</h2><p className="mt-4 max-w-[650px] text-[13px] leading-6 text-foreground/60">{post.excerpt}</p></div>
                      <div className="mt-8 flex items-center justify-between border-t border-foreground/12 pt-4 text-[11px]"><span className="text-muted-foreground">{post.date}</span><span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">Leer guía <ArrowRight className="h-3.5 w-3.5" /></span></div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
      </div>
      <SpanishFooter />
    </div>
  );
};

export default EsBlogs;
