import { getLocationExperience } from "@/data/locationExperiences";
import { hasLocalizedLocation } from "@/data/locationLocaleAvailability";
import { additionalLocations } from "@/data/additionalLocations";
import { practiceGroups } from "@/data/practiceGroups";
import { useState } from "react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { serviceLocations, type SiteLocale } from "@/data/injurySite";
import { practiceMedia } from "@/data/practiceMedia";
import { locationMedia } from "@/data/locationMedia";
import { esPracticeContent } from "@/data/esPracticeContent";
import { responsiveImageProps } from "@/lib/responsive-images";
import localStreet from "@/assets/law-firm/suburban-palms.jpg";
import localCrosswalk from "@/assets/law-firm/pedestrian-crossing.jpg";
import localRoad from "@/assets/law-firm/car-collision.jpg";

// Keep the directory summaries short, useful, and specific to each type of
// injury claim. The full legal discussion lives on each individual practice page.
const practiceFocus: Record<string, string> = {
  "car-accidents": "Rear-end and intersection crashes, disputed fault, uninsured drivers, medical records and available insurance.",
  "truck-accidents": "Commercial-carrier responsibility, electronic logs, inspection records, maintenance and multiple possible insurers.",
  "motorcycle-accidents": "Left-turn and lane-change collisions, sightlines, roadway evidence and the effect of serious rider injuries.",
  "pedestrian-accidents": "Crosswalk and parking-lot incidents, traffic signals, witnesses, video and hit-and-run evidence.",
  "rideshare-accidents": "Uber and Lyft trip status, commercial liability coverage, passenger injuries and overlapping policies.",
  "slip-and-fall": "Unsafe surfaces, property control, warnings, maintenance records and evidence of when a hazard existed.",
  "wrongful-death": "Fatal-collision investigations, eligible family claims, financial support and legally recoverable losses.",
  "serious-injuries": "Brain, spinal and other catastrophic injuries, rehabilitation, functional changes and supported future-care needs.",
};

const cityFocus: Record<string, string> = {
  "buena-park": "Beach Boulevard, local intersections and traffic near the 5 and 91 freeways.",
  anaheim: "Resort-area traffic, hotel shuttles, rideshare collisions and busy pedestrian routes.",
  fullerton: "Campus routes, commuter streets, walking and cycling incidents, and the effect on school or work.",
  "garden-grove": "Harbor and Brookhurst corridors, business surveillance and neighborhood intersections.",
  cypress: "Incidents near city borders where the exact location can affect which agency holds a report.",
  "la-habra": "Whittier and Imperial corridors, right-of-way disputes and Orange–Los Angeles County boundaries.",
  "la-mirada": "Los Angeles County records and claims near the Orange County boundary.",
  cerritos: "Freeway incidents involving the 91 and 605 and related California Highway Patrol records.",
  norwalk: "5 and 605 freeway traffic and surface-street incidents near Firestone and Rosecrans.",
  whittier: "Commercial streets, hillside roads, parked vehicles and visibility at the collision scene.",
};

const imageFallbacks = [localStreet, localCrosswalk, localRoad] as const;
const localePrefix = (locale: SiteLocale) => locale === "ko" ? "/ko" : locale === "es" ? "/es" : "";

function CityPhoto({ index, slug, name }: { index: number; slug: string; name: string }) {
  const photo = locationMedia[slug];
  const [failed, setFailed] = useState(false);
  const fallback = imageFallbacks[index % imageFallbacks.length];
  const src = !failed && photo ? photo.src : fallback;

  return (
    <>
      <img
        src={src}
        alt={!failed && photo ? `View in ${name}, California` : "Illustrative roadway in Southern California"}
        width={720}
        height={455}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
      />
    </>
  );
}

export function PracticeHubDirectory({ locale }: { locale: SiteLocale }) {
  const prefix = localePrefix(locale);
  const ko = locale === "ko";
  const es = locale === "es";

  return (
    <div className="space-y-12">
      {practiceGroups.map((group, index) => {
        const photo = practiceMedia[group.practices[0].slug];
        return (
          <section key={group.id} id={group.id} aria-labelledby={`practice-group-${group.id}`} className="overflow-hidden border-y border-[#1E1C1A]/15 bg-[#F9F7F3] md:grid md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative isolate flex min-h-52 flex-col justify-end bg-[#292119] p-6 text-[#FFF9F1] md:min-h-72">
              {photo && <img {...responsiveImageProps(photo.src, "(max-width: 767px) 94vw, 32vw")} src={photo.src} alt="" width={720} height={450} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <span className="text-xs tracking-widest">0{index + 1}</span>
              <h3 id={`practice-group-${group.id}`} className="editorial-serif mt-3 text-4xl leading-tight">{group.title[locale]}</h3>
            </div>
            <ul className="divide-y divide-[#1E1C1A]/15 px-5 md:px-7">
              {group.id === "personal-injury" && locale === "en" && (
                <li><a href="/practice-areas/personal-injury" className="group flex items-center justify-between gap-4 py-5">
                  <span><strong className="block text-[15px]">Personal Injury Lawyer</strong><span className="mt-1 block text-sm leading-6 text-[#5D5349]">Start here if you are unsure which kind of injury claim you have.</span></span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </a></li>
              )}
              {group.practices.map((practice) => {
                const esCopy = esPracticeContent[practice.slug];
                const name = ko ? practice.koTitle : es ? esCopy?.shortTitle || practice.title : practice.title;
                const description = ko ? practice.koDescription : es ? esCopy?.description || practice.description : practiceFocus[practice.slug] || practice.description;
                return (
                  <li key={practice.slug}><a href={`${prefix}/practice-areas/${practice.slug}`} className="group flex items-center justify-between gap-4 py-5">
                    <span><strong className="block text-[15px]">{name}</strong><span className="mt-1 block text-sm leading-6 text-[#5D5349]">{description}</span></span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </a></li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export function LocationHubDirectory({ locale }: { locale: SiteLocale }) {
  const prefix = localePrefix(locale);
  const ko = locale === "ko";
  const es = locale === "es";
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-7" aria-label={ko ? "서비스 지역" : es ? "Comunidades atendidas" : "Communities served from our Buena Park office"}>
      {additionalLocations.filter(city => hasLocalizedLocation(locale, city.slug)).map(original => {
        const city = getLocationExperience(original.slug, locale) ?? original;
        return (
        <article key={city.slug} className="border border-[#1E1C1A]/15 bg-[#F9F7F3] p-6">
          <span className="text-xs">{city.county}</span>
          <h3 className="editorial-serif mt-5 text-3xl"><a href={prefix + "/locations/" + city.slug}>{city.name}</a></h3>
          <p className="my-5 text-sm leading-7">{city.lead}</p>
          <a href={prefix + "/locations/" + city.slug} className="underline underline-offset-4">{ko ? `${city.name} 상해 사건 안내 보기` : es ? `Explore la guía de lesiones de ${city.name}` : `Explore the ${city.name} injury guide`} →</a>
        </article>
      );})}
      {serviceLocations.map((location, index) => {
        const name = ko ? location.koName : location.name;
        const href = `${prefix}/locations/${location.slug}`;
        return (
          <article key={location.slug} className="group min-w-0 overflow-hidden rounded-[3px] border border-[#1E1C1A]/15 bg-[#F9F7F3]">
            <a href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#E6DFD4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px]" aria-label={ko ? `${name} 지역 안내 보기` : es ? `Ver guía local: ${name}` : `Explore the ${name} accident and injury guide`}>
              <CityPhoto index={index} slug={location.slug} name={location.name} />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm bg-[#1E1C1A]/85 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.09em] text-[#F7F2E8]">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {location.county}
              </span>
            </a>
            <div className="px-5 pb-6 pt-5 sm:px-6">
              <h3 className="editorial-serif text-[clamp(1.65rem,2.4vw,2.05rem)] leading-[1.13] text-[#211B16]">
                <a href={href} className="underline-offset-4 hover:underline">{name}</a>
              </h3>
              <p className="mt-3 min-h-[55px] text-[14px] leading-[1.65] text-[#5D5349]">
                {ko ? location.koDescription : es ? location.description : cityFocus[location.slug]}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E1C1A]/12 pt-3 text-[11px] leading-5 text-[#74685D]">
                <span>{ko ? "공식 교통안전 통계" : es ? "Datos de seguridad vial" : "California OTS · killed or injured"}: <strong className="text-[#3E352E]">{location.ots.total.toLocaleString()}</strong> ({location.ots.year})</span>
                <a href={location.ots.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-[#1E1C1A]">
                  {ko ? "자료 출처" : es ? "Fuente oficial" : "Official source"}<ExternalLink aria-hidden="true" className="h-3 w-3" />
                </a>
              </div>
              <a href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#7E573B] text-[12px] font-semibold text-[#453322] hover:border-[#1E1C1A]">
                {ko ? `${name} 안내 보기` : es ? `Guía de accidentes en ${name}` : `Explore the ${name} injury guide`}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
