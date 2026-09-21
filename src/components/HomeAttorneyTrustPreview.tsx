import { ArrowUpRight, BadgeCheck, Languages, MapPin } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const HomeAttorneyTrustPreview = () => (
  <section aria-labelledby="home-attorney-heading" className="bg-[#f7f6f3] py-16 text-foreground md:py-20 lg:py-24">
    <div className="site-shell">
      <div className="border-t border-foreground/12 pt-6">
        <div className="text-[10px] font-medium tracking-[-0.01em] text-foreground/46">
          Attorney & Trust
        </div>
      </div>

      <div className="mt-10 grid overflow-hidden bg-[#ece9e3] lg:grid-cols-[0.86fr_1.14fr]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
          <img
            src={leadCounselImage}
            alt="Howard Choi, California personal injury attorney"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-12 xl:p-14">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/44">
              Meet the Attorney
            </div>
            <h2 id="home-attorney-heading" className="editorial-serif mt-4 text-[clamp(2.8rem,4.6vw,5rem)] leading-[0.94] tracking-[-0.035em]">
              Howard Choi
            </h2>
            <p className="mt-4 text-[14px] font-medium text-foreground/72">
              California Attorney · State Bar No. 284364
            </p>
            <p className="mt-7 max-w-[620px] text-[15px] leading-7 text-foreground/62">
              Howard Choi represents people and families dealing with personal injury claims in Buena Park and surrounding communities. Learn more about the attorney behind the firm, professional credentials, and the approach used to evaluate accident and injury matters.
            </p>
          </div>

          <div className="mt-10 border-t border-foreground/14">
            <div className="grid gap-0 sm:grid-cols-3">
              <div className="border-b border-foreground/12 py-5 sm:border-b-0 sm:border-r sm:pr-5">
                <BadgeCheck className="h-4 w-4 text-foreground/50" />
                <div className="mt-3 text-[12px] font-medium">California State Bar</div>
                <div className="mt-1 text-[11px] leading-5 text-foreground/48">Bar No. 284364</div>
              </div>
              <div className="border-b border-foreground/12 py-5 sm:border-b-0 sm:border-r sm:px-5">
                <Languages className="h-4 w-4 text-foreground/50" />
                <div className="mt-3 text-[12px] font-medium">Languages</div>
                <div className="mt-1 text-[11px] leading-5 text-foreground/48">English & Korean</div>
              </div>
              <div className="py-5 sm:pl-5">
                <MapPin className="h-4 w-4 text-foreground/50" />
                <div className="mt-3 text-[12px] font-medium">Buena Park Office</div>
                <div className="mt-1 text-[11px] leading-5 text-foreground/48">6301 Beach Blvd, Suite 216</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/attorney"
              className="inline-flex min-h-11 w-fit items-center gap-2 bg-[#171717] px-5 py-3 text-[12px] font-medium text-white transition-opacity hover:opacity-82"
            >
              View Attorney Profile <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 border border-foreground/20 px-5 py-3 text-[12px] font-medium transition-colors hover:bg-white/60"
            >
              Verify State Bar Record <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeAttorneyTrustPreview;
