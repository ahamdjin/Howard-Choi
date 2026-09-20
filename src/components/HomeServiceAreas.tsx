import { ArrowUpRight } from "lucide-react";
import { serviceLocations } from "@/data/injurySite";

const featured = ["buena-park", "anaheim", "fullerton", "garden-grove", "cerritos", "la-mirada", "la-habra", "cypress"]
  .map((slug) => serviceLocations.find((location) => location.slug === slug))
  .filter((location): location is (typeof serviceLocations)[number] => Boolean(location));

const HomeServiceAreas = () => (
  <section aria-labelledby="home-service-areas-heading" className="bg-[#f7f6f3] py-24 text-foreground md:py-28 lg:py-32">
    <div className="site-shell">
      <div className="max-w-[980px]">
        <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Areas served</div>
        <h2 id="home-service-areas-heading" className="editorial-serif mt-5 text-[clamp(3.2rem,6vw,6.7rem)] leading-[0.9] tracking-[-0.04em]">
          Based in Buena Park.<br />
          <span className="text-foreground/38">Serving the communities around it.</span>
        </h2>
        <p className="mt-7 max-w-[560px] text-[14px] leading-7 text-foreground/52">
          The office is in Buena Park, with personal injury representation available to people in nearby Orange County and Los Angeles County communities.
        </p>
      </div>

      <div className="mt-16 flex max-w-[1180px] flex-wrap gap-x-3 gap-y-2 md:mt-20 md:gap-x-5 md:gap-y-4">
        {featured.map((location, index) => (
          <span key={location.slug} className="inline-flex items-center">
            <a
              href={`/locations/${location.slug}`}
              className="editorial-serif text-[clamp(2rem,4.2vw,4.7rem)] leading-[1.05] tracking-[-0.035em] transition-opacity hover:opacity-45"
            >
              {location.name}
            </a>
            {index < featured.length - 1 ? <span className="mx-3 text-[clamp(1.8rem,3vw,3rem)] text-foreground/18 md:mx-5">/</span> : null}
          </span>
        ))}
      </div>

      <div className="mt-14 border-t border-foreground/12 pt-6 md:mt-20">
        <a href="/locations" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
          View all service areas <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </section>
);

export default HomeServiceAreas;
