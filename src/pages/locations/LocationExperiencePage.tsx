import { locationExperienceCopy, formatLocationText } from "@/data/locationExperienceCopy";
import { localizedContentHref } from "@/lib/localized-path";
import { ArrowRight, ArrowUpRight, Phone, MapPin, FileText, HeartPulse, BriefcaseBusiness, Clock, ChevronDown } from "lucide-react";
import { CaseStories } from "@/components/editorial/CaseStories";
import { ClaimProcessSteps } from "@/components/editorial/ClaimProcess";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ImageTextFeature } from "@/components/editorial/ImageTextFeature";
import { GuideDetails, GuideStatistics } from "@/components/editorial/GuideDetails";
import { claimProcessCopy } from "@/data/claimProcessCopy";
import { brand, type SiteLocale } from "@/data/injurySite";
import { localizedLocationMedia, localizedPracticeMedia } from "@/data/locationMediaTranslations";
import { practiceMedia } from "@/data/practiceMedia";
import type { AdditionalLocation } from "@/data/additionalLocations";
import { EditorialFrame, EditorialHero, ReadingLayout } from "@/pages/editorial/shared";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import treatment from "@/assets/law-firm/medical-care.jpg";
import consultation from "@/assets/law-firm/attorney-client-talking.jpg";
import support from "@/assets/law-firm/family-support.jpg";
import office from "@/assets/law-firm/hero-law-office.webp";
import "./location-experience.css";

const sectionIcons = { records: FileText, injuries: HeartPulse, work: BriefcaseBusiness, deadlines: Clock };
const featureImages = { consultation, treatment, support, documents };

/** The presentation is shared; cities opt in after individual content and visual review. */
export default function LocationExperiencePage({ city, locale = "en" }: { city: AdditionalLocation; locale?: SiteLocale }) {
  const copy = locationExperienceCopy[locale];
  const t = (key: keyof typeof copy) => formatLocationText(copy[key], city);
  const href = (path: string) => localizedContentHref(path, locale);
  const process = claimProcessCopy[locale];
  const photo = localizedLocationMedia(city.slug, locale);
  const stories = city.sections.filter(section => section.practice && practiceMedia[section.practice]);
  const caseOverview = city.sections.find(section => section.id === "cases" && !section.practice);
  const feature = city.feature && city.sections.find(section => section.id === city.feature?.sectionId);
  const guide = city.sections.slice(1).filter(section => !stories.includes(section) && section !== caseOverview && section !== feature);
  const local = city.sections[0];
  return <EditorialFrame locale={locale}><main className="location-experience" lang={locale}>
    <EditorialHero locale={locale} eyebrow={t("serving")} title={city.heading ?? t("heading")} description={city.lead} image={photo.src} imageAlt={photo.alt} imagePosition={photo.position} imageCaption={city.heroCaption} imageFallback={office} detail />
    <div className="experience-credentials"><div className="site-shell">
      <span><strong>{t("consultation")}</strong>{t("beforeDecision")}</span>
      <span><strong>{t("fee")}</strong>{t("agreement")}</span>
      <a href={href("/attorney")}><strong>Howard Choi</strong>{t("meet")} <ArrowUpRight size={14} /></a>
    </div></div>

    <section id="local" className="experience-section site-shell experience-intro">
      <div><SectionHeading eyebrow={t("after")}>{local.title}</SectionHeading>
        {local.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <a className="experience-link" href={href("/contact")}>{t("talk")} <ArrowRight size={17} /></a>
      </div>
      <figure className="experience-city-photo"><img src={photo.src} alt={photo.alt} style={{objectPosition: photo.position}} width={800} height={700} loading="lazy" decoding="async" /></figure>
    </section>

    <section id="process" className="experience-section experience-warm"><div className="site-shell">
      <SectionHeading eyebrow={process.eyebrow} text={process.intro}>{process.title}</SectionHeading>
      <ClaimProcessSteps locale={locale} />
      <a className="experience-link" href={href("/about/what-to-expect")}>{process.link}{locale !== "en" && <span className="experience-resource-language">({t("englishResource")})</span>}<ArrowRight size={17} /></a>
    </div></section>

    {feature && city.feature && <ImageTextFeature id={feature.id} eyebrow={city.feature.eyebrow} title={feature.title} paragraphs={feature.paragraphs} image={{src: featureImages[city.feature.image], alt: city.feature.alt}} link={feature.link && {href: href(feature.link.href), label: feature.link.label}} />}

    <section id="cases" className="experience-section site-shell">
      <SectionHeading eyebrow={t("representation")} text={t("casesIntro")}>{t("casesTitle")}</SectionHeading>
      {caseOverview && <div className="experience-case-overview"><h3>{caseOverview.title}</h3><div>{caseOverview.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>{caseOverview.link && <a className="experience-link" href={href(caseOverview.link.href)}>{caseOverview.link.label}<ArrowRight size={16} aria-hidden="true" /></a>}</div>}
      <CaseStories stories={stories.map(section => ({
        id: section.id,
        title: section.title,
        label: section.label ?? section.title,
        paragraphs: section.paragraphs,
        image: localizedPracticeMedia(section.practice!, locale),
        link: { href: href(section.link?.href ?? `/practice-areas/${section.practice}`), label: section.link?.label ?? t("practiceLink") },
      }))} />
    </section>

    <section className="experience-contact"><div className="site-shell">
      <div><SectionHeading eyebrow={t("contactEyebrow")}>{t("contactTitle")}</SectionHeading><p>{t("contactIntro")}</p></div>
      <div className="experience-actions"><a className="experience-button" href={href("/contact")}>{t("requestFree")}<ArrowUpRight size={18} /></a><a href={brand.phoneHref}><Phone size={18} />{brand.phoneDisplay}</a></div>
    </div></section>

    <div className="experience-guide-intro site-shell"><SectionHeading eyebrow={t("guide")} text={t("guideIntro")}>{t("guideTitle")}</SectionHeading></div>
    <ReadingLayout locale={locale} label={t("guide")} sections={[...guide.map(section => ({ id: section.id, label: section.label ?? section.title })), { id: "consultation", label: t("contactOffice") }]}>
      <div className="experience-reading">
        {guide.map(section => {
          const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
          return <section id={section.id} key={section.id} className={`experience-guide-section experience-guide-section--${section.id}`}>
            {Icon && <Icon className="experience-section-icon" size={27} strokeWidth={1.4} aria-hidden="true" />}
            <h2>{section.title}</h2>
            {section.kind === "faq" || section.id === "questions" ? <div className="experience-faq" data-location-faq>{section.paragraphs.map((paragraph, index) => {
              const end = paragraph.indexOf("?");
              return end >= 0 ? <details key={index}><summary>{paragraph.slice(0, end + 1)}<ChevronDown size={20} aria-hidden="true" /></summary><p>{paragraph.slice(end + 1).trim()}</p></details> : <p key={index}>{paragraph}</p>;
            })}</div> : <>
              {section.id === "records" && <img className="experience-reading-photo" src={documents} alt={t("documentsAlt")} width={900} height={500} loading="lazy" />}
              {section.id === "injuries" && <img className="experience-reading-photo" src={treatment} alt={t("treatmentAlt")} width={900} height={500} loading="lazy" />}
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </>}
            {section.stats && <GuideStatistics stats={section.stats} locale={locale} />}
            {section.items && <GuideDetails items={section.items} />}
            {section.link && <a className="experience-link" href={href(section.link.href)}>{section.link.label}{locale !== "en" && section.link.href.startsWith("/about/") && <span className="experience-resource-language">({t("englishResource")})</span>}<ArrowRight size={16} aria-hidden="true" /></a>}
            {section.links?.length ? <ul className="experience-resources">{section.links.map(link => <li key={link.href}><a href={href(link.href)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul> : null}
            {section.id === "records" && <ul className="experience-resources">{city.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul>}
          </section>;
        })}
        <section id="consultation" className="experience-guide-section experience-office">
          <MapPin size={28} strokeWidth={1.4} aria-hidden="true" /><h2>{t("officeTitle")}</h2>
          <address>6301 Beach Blvd, Suite 216<br />Buena Park, CA 90621</address>
          <p>{t("officeIntro")}</p>
          <div className="experience-actions"><a className="experience-button" href={href("/contact")}>{t("request")}<ArrowUpRight size={18} /></a><a href={brand.phoneHref}><Phone size={18} />{brand.phoneDisplay}</a></div>
          <a className="experience-link" href={href("/locations")}>{t("communities")}<ArrowRight size={16} /></a>
        </section>
      </div>
    </ReadingLayout>
  </main></EditorialFrame>;
}
