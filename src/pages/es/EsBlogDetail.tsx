import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "@tanstack/react-router";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";
import { esBlogPosts, getSpanishBlogBySlug } from "@/data/esBlogs";

const EsBlogDetail = () => {
  const params = useParams({ strict: false }) as { slug?: string };
  const post = params.slug ? getSpanishBlogBySlug(params.slug) : undefined;
  if (!post) {
    return <div className="min-h-screen bg-background"><SpanishNavigation /><main className="site-shell flex min-h-[70svh] items-center justify-center"><div className="text-center"><div className="editorial-serif text-4xl">No encontramos esta guía.</div><Link to="/es/blogs" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Volver a las guías</Link></div></main><SpanishFooter /></div>;
  }

  const index = esBlogPosts.findIndex((item) => item.slug === post.slug);
  const related = esBlogPosts[(index + 1) % esBlogPosts.length];

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SpanishNavigation />
      <article>
        <header className="relative min-h-[620px] overflow-hidden bg-[#17130f] pt-[60px] text-[#f3eee5]">
          <img src={post.image} alt={post.alt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-48" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,13,11,.9),rgba(15,13,11,.56)_58%,rgba(15,13,11,.3))]" />
          <div className="site-shell relative z-10 flex min-h-[560px] items-end py-14 md:py-18">
            <div className="max-w-[930px]">
              <Link to="/es/blogs" className="mb-7 inline-flex items-center gap-2 text-[12px] text-[#f3eee5]/62 transition-colors hover:text-[#f3eee5]"><ArrowLeft className="h-3.5 w-3.5" /> Volver a las guías</Link>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/46">{post.category} · {post.date} · {post.readingTime}</div>
              <h1 className="editorial-serif mt-5 text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[0.93] tracking-[-0.04em]">{post.title}</h1>
              <p className="mt-7 max-w-[760px] text-[15px] leading-7 text-white/74">{post.intro}</p>
            </div>
          </div>
        </header>

        <div className="site-shell py-12 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border-t border-foreground/12 pt-5">
                <div className="mb-4 text-[10px] uppercase tracking-[0.12em] text-foreground/38">En esta guía</div>
                <nav className="space-y-3">{post.sections.map((section, sectionIndex) => <a key={section.heading} href={`#es-article-section-${sectionIndex + 1}`} className="group flex gap-3 text-[12px] leading-5 text-foreground/48 transition-colors hover:text-foreground"><span className="text-foreground/26">{String(sectionIndex + 1).padStart(2, "0")}</span><span>{section.heading}</span></a>)}</nav>
              </div>
            </aside>

            <div>
              <div className="rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.12em] text-foreground/38">Idea principal</div>
                <p className="editorial-serif mt-4 text-[1.55rem] leading-[1.3]">{post.takeaway}</p>
              </div>

              <div className="mt-10 space-y-12">
                {post.sections.map((section, sectionIndex) => (
                  <section id={`es-article-section-${sectionIndex + 1}`} key={section.heading} className="scroll-mt-28 border-t border-foreground/12 pt-7">
                    <div className="text-[10px] text-foreground/32">{String(sectionIndex + 1).padStart(2, "0")}</div>
                    <h2 className="editorial-serif mt-4 text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.06] tracking-[-0.025em]">{section.heading}</h2>
                    <div className="mt-6 max-w-[760px] space-y-6 text-[16px] leading-[1.85] text-foreground/84">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  </section>
                ))}
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                  <div className="text-[10px] uppercase tracking-[0.1em] text-foreground/38">Relacionado</div>
                  <h2 className="editorial-serif mt-5 text-[1.7rem] leading-[1.2]">{post.relatedLabel}</h2>
                  <Link to={post.relatedHref} className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium">Ver recurso <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div className="rounded-[3px] border border-foreground/10 p-7 md:p-8">
                  <div className="text-[10px] uppercase tracking-[0.1em] text-foreground/38">Fuentes oficiales</div>
                  <div className="mt-5 space-y-3 text-[12px] leading-5">
                    <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-foreground/10 py-3">California Courts · Personal injury <ArrowRight className="h-3.5 w-3.5" /></a>
                    <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-foreground/10 py-3">California Courts · Statutes of limitations <ArrowRight className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-[3px] bg-[#e9e6e1] p-7 md:p-8">
                <div className="flex items-start gap-4"><img src={brandLogo} alt="" width={42} height={42} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 object-contain" /><div><div className="text-[12px] font-medium">Buena Park Injury Lawyer</div><div className="mt-1 text-[12px] text-foreground/46">Información sobre accidentes y lesiones en California</div><p className="mt-4 max-w-[590px] text-[13px] leading-6 text-foreground/58">Estas páginas en español ofrecen información general. La firma indica atención en inglés y coreano; confirme la disponibilidad de asistencia lingüística al contactar. Las credenciales de Howard Choi están disponibles en la <Link to="/es/attorney" className="underline underline-offset-2">página del abogado</Link>.</p></div></div>
              </div>

              <div className="mt-8 border-t border-foreground/12 pt-6 text-[12px] leading-6 text-foreground/46">Esta guía ofrece información general y no constituye asesoría legal. La aplicación de la ley depende de los hechos, plazos, partes, seguro y otras circunstancias.</div>
            </div>
          </div>
        </div>
      </article>

      {related && (
        <section className="border-t border-foreground/10 bg-[#e9e6e1] py-14">
          <div className="site-shell"><span className="text-[11px] text-foreground/44">Leer después</span><Link to={`/es/blogs/${related.slug}`} className="group mt-4 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end"><h2 className="editorial-serif max-w-[780px] text-[clamp(2rem,3.2vw,3.35rem)] leading-[1.05] tracking-[-0.03em]">{related.title}</h2><div className="flex items-center justify-between border-t border-foreground/15 pt-4 text-[12px] text-foreground/64"><span>{related.category}</span><span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">Leer guía <ArrowRight className="h-4 w-4" /></span></div></Link></div>
        </section>
      )}

      <SpanishFooter />
    </div>
  );
};

export default EsBlogDetail;
