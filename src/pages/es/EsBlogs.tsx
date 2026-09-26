import { ArrowRight } from "lucide-react";
import { esBlogPosts } from "@/data/esBlogs";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import { SpanishFrame, SpanishHero } from "./shared";

const EsBlogs = () => (
  <SpanishFrame>
    <main>
      <SpanishHero
        eyebrow="Guías legales"
        title="Accidentes, seguros y reclamos en California."
        description="Guías prácticas en español sobre evidencia, culpa comparativa, accidentes de auto y camión, Uber y Lyft, plazos y factores que pueden influir en un reclamo."
        image={heroCourthouse}
      />
      <section className="site-shell py-14 md:py-20">
        <div className="mb-10 grid gap-5 border-b border-foreground/12 pb-7 lg:grid-cols-[0.45fr_1fr]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/38">Biblioteca</div>
          <div><h2 className="editorial-serif text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">Información para entender el proceso antes de tomar una decisión.</h2><p className="mt-4 max-w-[680px] text-[14px] leading-7 text-foreground/58">Estas guías son información general. No sustituyen una revisión de los hechos, la evidencia, el seguro y los plazos de un caso específico.</p></div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {esBlogPosts.map((post) => (
            <a key={post.slug} href={`/es/blogs/${post.slug}`} className="group overflow-hidden border border-foreground/10 bg-[#f7f6f3]">
              <div className="aspect-[16/10] overflow-hidden"><img src={post.image} alt={post.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 text-[10px] text-foreground/42"><span>{post.category}</span><span>{post.readingTime}</span></div>
                <h2 className="editorial-serif mt-5 text-[1.7rem] leading-[1.06] tracking-[-0.025em]">{post.title}</h2>
                <p className="mt-4 text-[12px] leading-6 text-foreground/58">{post.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium">Leer guía <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  </SpanishFrame>
);

export default EsBlogs;
