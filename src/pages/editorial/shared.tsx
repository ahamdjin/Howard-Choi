import { responsiveImageProps } from "@/lib/responsive-images";
import { useEffect, useRef, useState, type ReactNode } from "react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { ArrowRight, Phone, type LucideIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import SpanishNavigation from "@/components/SpanishNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import SpanishFooter from "@/components/SpanishFooter";
import { brand, practiceAreas, type SiteLocale } from "@/data/injurySite";
import { esPracticeContent } from "@/data/esPracticeContent";

export const isKo = (locale: SiteLocale) => locale === "ko";
export const isEs = (locale: SiteLocale) => locale === "es";
export const localePrefix = (locale: SiteLocale) => isKo(locale) ? "/ko" : isEs(locale) ? "/es" : "";
export const serifStyle = (locale: SiteLocale) =>
  isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

export const EditorialFrame = ({ locale, children }: { locale: SiteLocale; children: ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-[#F8F7F4] text-[#1E1C1A]" style={isKo(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
    {isKo(locale) ? <KoreanNavigation /> : isEs(locale) ? <SpanishNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : isEs(locale) ? <SpanishFooter /> : <Footer />}
  </div>
);

type EditorialHeroProps = {
  locale: SiteLocale;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  /** The split photographic hero is for specific services and real cities. */
  detail?: boolean;
  imageAlt?: string;
  imageFallback?: string;
  photoCredit?: { label: string; href: string };
};

export const EditorialHero = ({ locale, eyebrow, title, description, image, detail = false, imageAlt = "", imageFallback, photoCredit }: EditorialHeroProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const displayImage = imageFailed && imageFallback ? imageFallback : image;

  if (detail) {
    return (
      <section className="relative overflow-hidden border-b border-[#1E1C1A]/12 bg-[#F4F0E9] pt-[74px] text-[#1E1C1A]">
        <div className="grid min-h-[620px] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 md:py-16 lg:pl-[max(3rem,calc((100vw-1240px)/2))] lg:pr-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#755D46]">{eyebrow}</span>
            <div className="mt-8 max-w-[690px]">
              <PageBreadcrumb locale={locale} title={title} />
              <h1 style={serifStyle(locale)} className={isKo(locale)
                ? "mt-4 text-[clamp(2.3rem,4vw,4.2rem)] font-medium leading-[1.15] tracking-[-0.04em]"
                : "editorial-serif mt-4 text-[clamp(2.65rem,4.5vw,5.3rem)] leading-[1.02] tracking-[-0.045em]"}>
                {title}
              </h1>
              <p className="mt-7 max-w-[610px] text-[15px] leading-[1.75] text-[#534D46] md:text-[16px]">{description}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`${localePrefix(locale)}/contact`} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#211C17] px-6 py-3 text-[13px] font-semibold text-[#F6F1E9] transition-colors hover:bg-[#493323]">
                {isKo(locale) ? "무료 상담 요청" : isEs(locale) ? "Solicitar una consulta" : "Request a free consultation"}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href={brand.phoneHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#1E1C1A]/25 px-6 py-3 text-[13px] font-medium text-[#1E1C1A] hover:border-[#1E1C1A]/70">
                <Phone aria-hidden="true" className="mr-2 h-4 w-4" />{brand.phoneDisplay}
              </a>
            </div>
            <div className="mt-10 border-t border-[#1E1C1A]/15 pt-4 text-[11px] leading-5 text-[#655B52]">
              {isKo(locale) ? "담당 변호사 Howard Choi · 캘리포니아 변호사 등록번호 284364" : isEs(locale) ? "Abogado Howard Choi · Colegio de Abogados de California n.º 284364" : "Attorney Howard Choi · California State Bar No. 284364"}
              <span className="mx-2" aria-hidden="true">·</span>
              <a href={`${localePrefix(locale)}/attorney`} className="font-semibold underline underline-offset-4">
                {isKo(locale) ? "변호사 소개" : isEs(locale) ? "Conocer al abogado" : "Meet your attorney"}
              </a>
            </div>
          </div>
          <figure className="relative min-h-[330px] bg-[#25201A] lg:min-h-[620px]">
            <img
              {...responsiveImageProps(displayImage, "(max-width: 1023px) 100vw, 48vw")}
              src={displayImage}
              alt={imageFailed ? "" : imageAlt}
              width={900}
              height={1100}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              onError={() => { if (imageFallback && !imageFailed) setImageFailed(true); }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#17130f]/70 to-transparent" />
            <figcaption className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-[11px] leading-5 text-white/90 md:left-8 md:right-8">
              <span>{isKo(locale) ? "사고와 상해에 따른 법률 안내" : isEs(locale) ? "Guía sobre accidentes y lesiones" : "Accident and injury guidance"}</span>
              {photoCredit && !imageFailed && (
                <a href={photoCredit.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
                  {photoCredit.label}
                </a>
              )}
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#1E1A17] pt-[60px] text-[#F3EEE5] md:min-h-[620px]">
      <img {...responsiveImageProps(image)} src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,13,.86)_0%,rgba(20,16,13,.58)_48%,rgba(20,16,13,.30)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/80 via-transparent to-[#17130f]/25" />
      <div className="site-shell relative z-10 flex min-h-[500px] items-end py-12 md:min-h-[560px] md:py-16">
        <div className="grid w-full gap-8 border-t border-white/18 pt-5 lg:grid-cols-[minmax(180px,0.32fr)_minmax(0,1.68fr)] lg:gap-14">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/52">{eyebrow}</div>
            <div className="mt-4 hidden text-[10px] leading-5 text-white/36 lg:block">{brand.phoneDisplay}<br />Buena Park, California</div>
          </div>
          <div className="max-w-[900px]">
            <PageBreadcrumb locale={locale} title={title} />
            <h1 style={serifStyle(locale)} className={isKo(locale) ? "text-[clamp(2.25rem,4.5vw,4.8rem)] font-medium leading-[1.18] tracking-[-0.045em]" : "editorial-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.045em]"}>{title}</h1>
            <p className="mt-7 max-w-[700px] text-[14px] leading-7 text-white/85 md:text-[15px]">{description}</p>
            <a href={`${localePrefix(locale)}/contact`} className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#F3EEE5] px-6 py-3 text-sm font-semibold text-[#1E1C1A]">
              {isKo(locale) ? "상담 예약" : isEs(locale) ? "Programar una consulta" : "Schedule a consultation"}<ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export type ReadingSection = { id: string; label: string };

export const ReadingLayout = ({ locale, label, sections, children }: { locale: SiteLocale; label: string; sections: ReadingSection[]; children: ReactNode }) => {
  const sectionKey = sections.map((section) => section.id).join("|");
  const firstSectionId = sections[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstSectionId);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = sectionKey ? sectionKey.split("|") : [];
    let frame = 0;
    const updateActiveSection = () => {
      const marker = Math.min(window.innerHeight * 0.3, 220);
      let next = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) next = id;
        else break;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if (atBottom && sectionIds.length) next = sectionIds[sectionIds.length - 1];
      setActiveId((current) => current === next ? current : next);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { frame = 0; updateActiveSection(); });
    };
    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [firstSectionId, sectionKey]);

  useEffect(() => {
    if (window.innerWidth >= 1024 || !navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
    if (!activeLink) return;
    const nav = navRef.current;
    const targetLeft = activeLink.offsetLeft - nav.clientWidth / 2 + activeLink.clientWidth / 2;
    nav.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeId]);

  const onThisPage = isKo(locale) ? "페이지 목차" : isEs(locale) ? "En esta página" : "On this page";
  return (
    <div className="site-shell editorial-reading-grid py-12 md:py-16 lg:py-20">
      <aside className="editorial-reading-rail" aria-label={onThisPage}>
        <div className="editorial-reading-rail__inner">
          <div className="editorial-reading-rail__eyebrow">{onThisPage}</div>
          <div className="editorial-reading-rail__label">{label}</div>
          <div className="editorial-reading-rail__rule" />
          <nav ref={navRef} className="editorial-reading-rail__nav">
            {sections.map((section, index) => {
              const active = activeId === section.id;
              return (
                <a key={section.id} href={`#${section.id}`} data-section-id={section.id} data-active={active ? "true" : "false"} aria-current={active ? "location" : undefined} onClick={() => setActiveId(section.id)} className="editorial-reading-rail__link">
                  <span>{String(index + 1).padStart(2, "0")}</span><span>{section.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="editorial-reading-rail__meta"><span>{brand.phoneDisplay}</span><span>{isKo(locale) ? "부에나파크 · 캘리포니아" : "Buena Park · California"}</span></div>
        </div>
      </aside>
      <div className="editorial-reading-content">{children}</div>
    </div>
  );
};

export const ReadingSectionBlock = ({ id, locale, kicker, title, intro, children, tone = "plain", Icon }: { id: string; locale: SiteLocale; kicker: string; title: string; intro?: string; children?: ReactNode; tone?: "plain" | "warm"; Icon?: LucideIcon }) => (
  <section id={id} className={`editorial-reading-section ${tone === "warm" ? "editorial-reading-section--warm" : ""}`}>
    <div className="editorial-reading-section__kicker flex items-center gap-2.5">{Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 stroke-[1.5] text-[#7b5b3e]" /> : null}{kicker}</div>
    <h2 style={serifStyle(locale)} className={isKo(locale) ? "editorial-reading-section__title text-[clamp(1.7rem,2.8vw,2.8rem)] font-medium leading-[1.35] tracking-[-0.035em]" : "editorial-reading-section__title editorial-serif text-[clamp(2rem,3.3vw,3.6rem)] leading-[1.02] tracking-[-0.03em]"}>{title}</h2>
    {intro ? <p className="editorial-reading-section__intro">{intro}</p> : null}
    {children ? <div className="editorial-reading-section__body">{children}</div> : null}
  </section>
);

export const PracticeLinks = ({ locale }: { locale: SiteLocale }) => (
  <div className="editorial-link-grid">
    {practiceAreas.map((practice, index) => {
      const esCopy = esPracticeContent[practice.slug];
      const title = isKo(locale) ? practice.koTitle : isEs(locale) ? (esCopy?.shortTitle || practice.title) : practice.title;
      const description = isKo(locale) ? practice.koDescription : isEs(locale) ? (esCopy?.description || practice.description) : practice.description;
      return (
        <a key={practice.slug} href={`${localePrefix(locale)}/practice-areas/${practice.slug}`} className="editorial-link-card">
          <div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div>
          <h3 style={serifStyle(locale)}>{title}</h3><p>{description}</p>
        </a>
      );
    })}
  </div>
);

export const ConsultationCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#1E1C1A] text-[#F3EEE5]">
    <div className="site-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/42">{isKo(locale) ? "상담" : isEs(locale) ? "Siguiente paso" : "Next step"}</div>
        <h2 style={serifStyle(locale)} className={isKo(locale) ? "mt-5 max-w-[700px] text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.28] tracking-[-0.04em]" : "editorial-serif mt-5 max-w-[760px] text-[clamp(2.6rem,5vw,5.8rem)] leading-[0.94] tracking-[-0.04em]"}>
          {isKo(locale) ? "사고 이후의 다음 단계를 명확하게 정리하세요." : isEs(locale) ? "La claridad empieza con una conversación." : "Clarity starts with one conversation."}
        </h2>
      </div>
      <div className="border-t border-white/14 pt-5">
        <a href={`${localePrefix(locale)}/contact`} className="group flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>{isKo(locale) ? "온라인 상담 요청" : isEs(locale) ? "Solicitar una consulta" : "Request a consultation"}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        <a href={brand.phoneHref} className="flex items-center justify-between border-b border-white/14 py-5 text-[13px]"><span>{brand.phoneDisplay}</span><Phone className="h-4 w-4" /></a>
        <p className="pt-5 text-[10px] leading-5 text-white/38">{brand.address}<br />{isKo(locale) ? "웹사이트 정보는 일반 정보이며 법률 자문이 아닙니다." : isEs(locale) ? "La información del sitio es general y no constituye asesoría legal." : "Website information is general and is not legal advice."}</p>
      </div>
    </div>
  </section>
);
