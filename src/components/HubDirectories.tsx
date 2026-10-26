import { useState } from "react";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
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
    <div className="grid gap-6 md:grid-cols-2 md:gap-7" aria-label={ko ? "업무 분야 8개" : es ? "Ocho áreas de práctica" : "Eight personal injury practice areas"}>
      {practiceAreas.map((practice, index) => {
        const media = practiceMedia[practice.slug];
        const esCopy = esPracticeContent[practice.slug];
        const name = ko ? practice.koTitle : es ? esCopy?.shortTitle || practice.title : practice.title;
        const description = ko
          ? practice.koDescription
          : es
            ? esCopy?.description || practice.description
            : practiceFocus[practice.slug] || practice.description;
        const href = `${prefix}/practice-areas/${practice.slug}`;
        return (
          <article key={practice.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-[3px] border border-[#1E1C1A]/15 bg-[#F9F7F3]">
            <a href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#E6DFD4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px]" aria-label={ko ? `${name} 안내 보기` : es ? `Ver orientación: ${name}` : `Explore ${name.toLowerCase()} injury claims`}>
              {media && (
                <img
                  {...responsiveImageProps(media.src, "(max-width: 767px) 94vw, (max-width: 1200px) 46vw, 400px")}
                  src={media.src}
                  alt={media.alt}
                  width={720}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
              )}
              <span className="absolute left-4 top-4 rounded-sm bg-[#1E1C1A]/85 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.10em] text-[#F7F2E8]">
                {String(index + 1).padStart(2, "0")} / {String(practiceAreas.length).padStart(2, "0")}
              </span>
            </a>
            <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
              <h3 className="editorial-serif text-[clamp(1.6rem,2.35vw,2rem)] leading-[1.13] text-[#211B16]">
                <a className="underline-offset-4 hover:underline" href={href}>
                  {name}{ko || es ? "" : " Claims"}
                </a>
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#5D5349]">{description}</p>
              <a href={href} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start border-b border-[#7E573B] text-[12px] font-semibold text-[#453322] hover:border-[#1E1C1A]">
                {ko ? "이 사건 분야 자세히 보기" : es ? "Ver esta área de práctica" : `Read the ${name.toLowerCase()} guide`} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
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
    <div className="grid gap-6 md:grid-cols-2 md:gap-7" aria-label={ko ? "서비스 지역 10곳" : es ? "Diez comunidades atendidas" : "Ten communities served from our Buena Park office"}>
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
