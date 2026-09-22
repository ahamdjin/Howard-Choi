import { ArrowUpRight } from "lucide-react";
import { serviceLocations, type SiteLocale } from "@/data/injurySite";
import carCollision from "@/assets/law-firm/car-collision.jpg";
import pedestrianCrossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import truckHighway from "@/assets/law-firm/truck-highway.jpg";
import motorcycleRoad from "@/assets/law-firm/motorcycle-road.jpg";

// Four, not all ten. Linking every city page from here with identical anchor
// text reads as a doorway-page pattern; the /locations hub carries the rest.
// These are the four largest nearby markets by reported collision volume.
const featured = [
  { slug: "anaheim", image: carCollision, alt: "Two cars after a rear-end collision" },
  { slug: "fullerton", image: pedestrianCrossing, alt: "Marked pedestrian crossing at a street corner" },
  { slug: "garden-grove", image: truckHighway, alt: "Commercial truck on a highway" },
  { slug: "la-habra", image: motorcycleRoad, alt: "Motorcyclist travelling along a road" },
]
  .map((entry) => ({ ...entry, location: serviceLocations.find((item) => item.slug === entry.slug) }))
  .filter((entry): entry is typeof entry & { location: (typeof serviceLocations)[number] } => Boolean(entry.location));

const HomeServiceAreas = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
  <section id="areas" aria-labelledby="home-service-areas-heading" className="bg-background py-20 text-foreground md:py-24 lg:py-28">
    <div className="site-shell">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div className="max-w-[860px]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">{ko ? "서비스 지역" : "Areas served"}</div>
          <h2 id="home-service-areas-heading" className="editorial-serif mt-5 text-[clamp(2.6rem,5vw,5.2rem)] leading-[0.92] tracking-[-0.04em]">
            {ko ? <>부에나파크를 기반으로,<br /><span className="text-foreground/38">인근 지역까지 지원합니다.</span></> : <>Based in Buena Park.<br /><span className="text-foreground/38">Serving the communities around it.</span></>}
          </h2>
          <p className="mt-7 max-w-[560px] text-[14px] leading-7 text-foreground/52">
            {ko ? "사무실은 부에나파크 Beach Blvd에 있으며, 북부 오렌지카운티와 인근 로스앤젤레스카운티 지역의 사고·개인상해 사건을 지원합니다." : "The office is on Beach Blvd in Buena Park, with accident and personal injury representation available across North Orange County and nearby Los Angeles County communities."}
          </p>
        </div>
        <a
          href={ko ? "/ko/locations" : "/locations"}
          className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60 lg:pb-2"
        >
          {ko ? "전체 지역 보기" : "View all service areas"} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {featured.map(({ slug, image, alt, location }) => (
          <a
            key={slug}
            href={`${ko ? "/ko" : ""}/locations/${slug}`}
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[3px] bg-[#181511] p-3 text-[#f3eee5]"
          >
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            {/* Light wash only. The photo has to stay readable. Text legibility
                comes from the blurred panel below, not from darkening the image. */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/55 via-transparent to-transparent" />
            <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#15110d]/45 backdrop-blur-[2px]">
              <ArrowUpRight className="h-3.5 w-3.5 text-[#f3eee5]/85 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <div className="relative rounded-[2px] bg-[#15110d]/55 px-4 py-3.5 backdrop-blur-[6px]">
              <h3 className="editorial-serif text-[clamp(1.7rem,2.2vw,2.2rem)] leading-[1.02] tracking-[-0.02em]">
                {ko ? location.koName : location.name}
              </h3>
              <div className="mt-1 text-[11px] text-[#f3eee5]/70">{location.county}</div>
              <div className="mt-2.5 border-t border-[#f3eee5]/20 pt-2.5 text-[11px] leading-4 text-[#f3eee5]/78">
                {ko ? `${location.ots.year}년 교통사고 ${location.ots.total.toLocaleString()}건` : `${location.ots.total.toLocaleString()} reported collisions · ${location.ots.year}`}
                <span className="mt-0.5 block text-[10px] text-[#f3eee5]/52">{ko ? "캘리포니아 교통안전국(OTS)" : "California OTS"}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
  );
};

export default HomeServiceAreas;
