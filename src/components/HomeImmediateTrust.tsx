import { ArrowUpRight, BadgeCheck, Languages, MapPin } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const HomeImmediateTrust = () => (
  <section aria-labelledby="home-trust-heading" className="bg-[#f7f6f3] text-foreground">
    <div className="site-shell py-8 md:py-10">
      <div className="grid gap-7 border-y border-foreground/12 py-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-[#e8e4de] md:h-24 md:w-24">
          <img
            src={leadCounselImage}
            alt="Howard Choi, California personal injury attorney"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">Attorney & trust</div>
          <h2 id="home-trust-heading" className="editorial-serif mt-2 text-[clamp(1.9rem,2.7vw,2.8rem)] leading-none tracking-[-0.025em]">
            Howard Choi
          </h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-foreground/56">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5" /> California Attorney · Bar No. 284364</span>
            <span className="inline-flex items-center gap-1.5"><Languages className="h-3.5 w-3.5" /> English & Korean</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Buena Park, California</span>\n            <span>Free consultation · Contingency-fee representation</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <a
            href="/attorney"
            className="inline-flex min-h-11 items-center gap-2 bg-[#171717] px-4 py-3 text-[11px] font-medium text-white"
          >
            View Attorney Profile <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-foreground/18 px-4 py-3 text-[11px] font-medium"
          >
            Verify State Bar <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeImmediateTrust;
