import { ArrowRight, ArrowUpRight, BadgeCheck, Languages, MapPin } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";
import { practiceAreas } from "@/data/injurySite";

const attorneyProfile = "/attorney";
const stateBarProfile = "https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364";

export const AnaheimQuickTrust = () => (
  <section className="border-b border-[#1E1C1A]/10 bg-[#f7f6f3] text-[#1E1C1A]">
    <div className="site-shell py-7 md:py-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/38">
            Serving Anaheim from nearby Buena Park
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1E1C1A]/66">
            <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 stroke-[1.4]" /> Howard Choi · California Bar No. 284364</span>
            <span className="inline-flex items-center gap-2"><Languages className="h-4 w-4 stroke-[1.4]" /> English & Korean</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 stroke-[1.4]" /> Buena Park office</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={attorneyProfile} className="inline-flex min-h-11 items-center gap-2 bg-[#171717] px-4 py-3 text-[11px] font-medium text-white">
            Attorney Profile <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="/contact" className="inline-flex min-h-11 items-center gap-2 border border-[#1E1C1A]/18 px-4 py-3 text-[11px] font-medium">
            Free Consultation <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export const AnaheimCasesPreview = () => (
  <section className="bg-[#f7f6f3] py-16 text-[#1E1C1A] md:py-20">
    <div className="site-shell">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1E1C1A]/36">
            Anaheim injury matters
          </div>
          <h2 className="editorial-serif mt-4 max-w-[480px] text-[clamp(2.4rem,3.7vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            Cases we handle for people injured in Anaheim.
          </h2>
          <p className="mt-5 max-w-[430px] text-[13px] leading-6 text-[#1E1C1A]/55">
            Each case type has its own evidence, insurance, and liability questions. These links lead to the firm&apos;s detailed practice-area pages rather than repeating the same information on the Anaheim page.
          </p>
        </div>

        <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
          {practiceAreas.map((practice, index) => (
            <a
              key={practice.slug}
              href={`/practice-areas/${practice.slug}`}
              className={`group flex min-h-[138px] flex-col justify-between border-b border-[#1E1C1A]/12 py-5 sm:px-6 ${index % 2 === 0 ? "sm:border-r sm:pl-0" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[9px] tabular-nums text-[#1E1C1A]/26">{String(index + 1).padStart(2, "0")}</span>
                <ArrowUpRight className="h-4 w-4 text-[#1E1C1A]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <h3 className="editorial-serif text-[1.45rem] leading-tight">{practice.title}</h3>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#1E1C1A]/48">{practice.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const AnaheimAttorneyPreview = () => (
  <section className="bg-[#171717] py-16 text-white md:py-20">
    <div className="site-shell">
      <div className="grid overflow-hidden bg-[#202020] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[430px] lg:min-h-[600px]">
          <img src={leadCounselImage} alt="Howard Choi, California personal injury attorney" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/38">Meet Howard Choi</div>
          <h2 className="editorial-serif mt-4 text-[clamp(2.8rem,4.5vw,4.9rem)] leading-[0.94] tracking-[-0.035em]">
            A verifiable attorney behind the advice.
          </h2>
          <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-white/56">
            Howard Choi is a California attorney serving personal injury clients from the firm&apos;s Buena Park office, including people injured in Anaheim. His attorney profile contains the fuller professional background, while the California State Bar record provides independent license verification.
          </p>

          <div className="mt-8 grid border-y border-white/12 sm:grid-cols-2">
            <div className="py-5 sm:border-r sm:border-white/12 sm:pr-6">
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/34">California State Bar</div>
              <div className="mt-2 text-[13px] text-white/84">Bar No. 284364</div>
            </div>
            <div className="border-t border-white/12 py-5 sm:border-t-0 sm:pl-6">
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/34">Languages</div>
              <div className="mt-2 text-[13px] text-white/84">English & Korean</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={attorneyProfile} className="inline-flex min-h-11 items-center gap-2 bg-[#f3eee5] px-5 py-3 text-[11px] font-medium text-[#17130f]">
              View Attorney Profile <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a href={stateBarProfile} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-white/18 px-5 py-3 text-[11px] font-medium text-white/82">
              Verify State Bar Record <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
