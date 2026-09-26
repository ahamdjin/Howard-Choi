import type { ReactNode } from "react";
import { ArrowRight, Phone, type LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import SpanishNavigation from "@/components/SpanishNavigation";
import SpanishFooter from "@/components/SpanishFooter";
import { brand, practiceAreas } from "@/data/injurySite";
import { esPracticeContent } from "@/data/esPracticeContent";

export const SpanishFrame = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-[#F8F7F4] text-[#1E1C1A]">
    <SpanishNavigation />
    {children}
    <SpanishFooter />
  </div>
);

const SpanishBreadcrumb = ({ title }: { title: string }) => {
  const { pathname } = useLocation();
  const parent = [
    { path: "/practice-areas", label: "Áreas de práctica" },
    { path: "/locations", label: "Zonas de servicio" },
    { path: "/blogs", label: "Guías legales" },
  ].find((item) => pathname.startsWith("/es" + item.path + "/"));

  return (
    <nav aria-label="Ruta de navegación" className="mb-6 text-xs leading-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><a href="/es" className="underline underline-offset-4">Inicio</a></li>
        {parent && <li className="flex items-center gap-2"><span aria-hidden="true">/</span><a href={"/es" + parent.path} className="underline underline-offset-4">{parent.label}</a></li>}
        <li className="flex min-w-0 items-start gap-2"><span aria-hidden="true">/</span><span aria-current="page">{title}</span></li>
      </ol>
    </nav>
  );
};

export const SpanishHero = ({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image: string }) => (
  <section className="relative min-h-[560px] overflow-hidden bg-[#1E1A17] pt-[60px] text-[#F3EEE5] md:min-h-[620px]">
    <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,.86)_0%,rgba(20,16,13,.58)_48%,rgba(20,16,13,.30)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/80 via-transparent to-[#17130f]/25" />
    <div className="site-shell relative z-10 flex min-h-[500px] items-end py-12 md:min-h-[560px] md:py-16">
      <div className="grid w-full gap-8 border-t border-white/18 pt-5 lg:grid-cols-[minmax(180px,0.32fr)_minmax(0,1.68fr)] lg:gap-14">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/52">{eyebrow}</div>
          <div className="mt-4 hidden text-[10px] leading-5 text-white/36 lg:block">{brand.phoneDisplay}<br />Buena Park, California</div>
        </div>
        <div className="max-w-[900px]">
          <SpanishBreadcrumb title={title} />
          <h1 className="editorial-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.045em]">{title}</h1>
          <p className="mt-7 max-w-[700px] text-[14px] leading-7 text-white/85 md:text-[15px]">{description}</p>
          <a href="/es/contact" className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#F3EEE5] px-6 py-3 text-sm font-semibold text-[#1E1C1A]">Solicitar una consulta<ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </section>
);

export type SpanishReadingSection = { id: string; label: string };

export const SpanishReadingLayout = ({ label, sections, children }: { label: string; sections: SpanishReadingSection[]; children: ReactNode }) => (
  <div className="site-shell editorial-reading-grid py-12 md:py-16 lg:py-20">
    <aside className="editorial-reading-rail" aria-label="En esta página">
      <div className="editorial-reading-rail__inner">
        <div className="editorial-reading-rail__eyebrow">En esta página</div>
        <div className="editorial-reading-rail__label">{label}</div>
        <div className="editorial-reading-rail__rule" />
        <nav className="editorial-reading-rail__nav">
          {sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className="editorial-reading-rail__link">
              <span>{String(index + 1).padStart(2, "0")}</span><span>{section.label}</span>
            </a>
          ))}
        </nav>
        <div className="editorial-reading-rail__meta"><span>{brand.phoneDisplay}</span><span>Buena Park · California</span></div>
      </div>
    </aside>
    <div className="editorial-reading-content">{children}</div>
  </div>
);

export const SpanishSectionBlock = ({ id, kicker, title, intro, children, tone = "plain", Icon }: { id: string; kicker: string; title: string; intro?: string; children?: ReactNode; tone?: "plain" | "warm"; Icon?: LucideIcon }) => (
  <section id={id} className={`editorial-reading-section ${tone === "warm" ? "editorial-reading-section--warm" : ""}`}>
    <div className="editorial-reading-section__kicker flex items-center gap-2.5">{Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 stroke-[1.5] text-[#7b5b3e]" /> : null}{kicker}</div>
    <h2 className="editorial-reading-section__title editorial-serif text-[clamp(2rem,3.3vw,3.6rem)] leading-[1.02] tracking-[-0.03em]">{title}</h2>
    {intro ? <p className="editorial-reading-section__intro">{intro}</p> : null}
    {children ? <div className="editorial-reading-section__body">{children}</div> : null}
  </section>
);

export const SpanishPracticeLinks = () => (
  <div className="editorial-link-grid">
    {practiceAreas.map((practice, index) => {
      const copy = esPracticeContent[practice.slug];
      return (
        <a key={practice.slug} href={`/es/practice-areas/${practice.slug}`} className="editorial-link-card">
          <div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div>
          <h3>{copy?.shortTitle || practice.title}</h3>
          <p>{copy?.description || practice.description}</p>
        </a>
      );
    })}
  </div>
);

export const SpanishReviewed = () => (
  <div className="border-t border-[#1E1C1A]/10 pt-5 text-[11px] leading-5 text-[#1E1C1A]/45">
    Revisado por <a href="/es/attorney" className="underline underline-offset-4 hover:text-[#1E1C1A]">Howard Choi</a>, California Bar No. 284364 · Última revisión <time dateTime="2026-09-22">septiembre de 2026</time>
  </div>
);

export const SpanishConsultationCta = () => (
  <section className="bg-[#1E1C1A] text-[#F3EEE5]">
    <div className="site-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/42">Siguiente paso</div>
        <h2 className="editorial-serif mt-5 max-w-[760px] text-[clamp(2.6rem,5vw,5.8rem)] leading-[0.94] tracking-[-0.04em]">La claridad empieza con una conversación.</h2>
      </div>
      <div className="border-t border-white/14 pt-5">
        <a href="/es/contact" className="group flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>Solicitar una consulta</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        <a href={brand.phoneHref} className="flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>{brand.phoneDisplay}</span><Phone className="h-4 w-4" /></a>
        <p className="pt-5 text-[10px] leading-5 text-white/38">{brand.address}<br />La información de este sitio es general y no constituye asesoría legal.</p>
      </div>
    </div>
  </section>
);
