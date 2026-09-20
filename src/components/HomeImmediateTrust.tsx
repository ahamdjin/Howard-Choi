import { ArrowUpRight } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const HomeImmediateTrust = () => (
  <section aria-labelledby="home-trust-heading" className="bg-[#f7f6f3] text-foreground">
    <div className="site-shell py-10 md:py-12">
      <div className="grid gap-8 border-y border-foreground/12 py-8 md:grid-cols-[100px_1fr_auto] md:items-center md:gap-10">
        <div className="h-[88px] w-[88px] overflow-hidden rounded-[2px] bg-[#e8e4de] md:h-[100px] md:w-[100px]">
          <img
            src={leadCounselImage}
            alt="Howard Choi, California personal injury attorney"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Attorney</div>
          <h2 id="home-trust-heading" className="editorial-serif mt-2 text-[clamp(2rem,2.8vw,3rem)] leading-none tracking-[-0.03em]">
            Howard Choi
          </h2>
          <p className="mt-3 max-w-[760px] text-[12px] leading-6 text-foreground/54">
            California Attorney · State Bar No. 284364 · English & Korean · Buena Park, California
          </p>
          <p className="mt-1 text-[11px] leading-5 text-foreground/42">
            Free consultation · Contingency-fee representation
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-end">
          <a href="/attorney" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
            Attorney profile <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] text-foreground/62 underline underline-offset-4">
            State Bar record <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeImmediateTrust;
