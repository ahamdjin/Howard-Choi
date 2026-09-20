import { ArrowUpRight, MapPin } from "lucide-react";
import { serviceLocations } from "@/data/injurySite";

const HomeServiceAreas = () => (
  <section aria-labelledby="home-service-areas-heading" className="bg-[#f3efe8] py-16 text-foreground md:py-20">
    <div className="site-shell">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">Areas served</div>
          <h2 id="home-service-areas-heading" className="editorial-serif mt-4 max-w-[520px] text-[clamp(2.5rem,3.8vw,4.2rem)] leading-[0.96] tracking-[-0.03em]">
            Based in Buena Park. Serving nearby communities.
          </h2>
          <p className="mt-5 max-w-[450px] text-[13px] leading-6 text-foreground/55">
            The firm&apos;s office is in Buena Park, with personal injury representation available to clients across nearby Orange County and Los Angeles County communities.
          </p>
          <a href="/locations" className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium underline underline-offset-4">
            View all service areas <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid border-t border-foreground/12 sm:grid-cols-2">
          {serviceLocations.slice(0, 8).map((location) => (
            <a
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group flex min-h-[118px] items-center justify-between gap-4 border-b border-foreground/12 py-5 sm:px-5 sm:odd:border-r sm:odd:pl-0"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] text-foreground/36"><MapPin className="h-3.5 w-3.5" /> {location.county}</div>
                <h3 className="editorial-serif mt-2 text-[1.45rem] leading-none">{location.name}</h3>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/28 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomeServiceAreas;
