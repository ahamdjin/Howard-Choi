import { ArrowUpRight } from "lucide-react";
import boardroomImage from "@/assets/law-firm/hero-city-boardroom.webp";
import { trustProfile } from "@/data/trustProfile";

const SelectedResult = () => (
  <section id="results" className="relative min-h-[100svh] overflow-hidden bg-[#11110f] text-[#f4f1ea]">
    <div className="site-shell grid min-h-[100svh] w-full gap-10 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:py-16">
      <div className="max-w-[560px]">
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/38">Case Results</span>
        <h2 className="editorial-serif mt-5 text-[clamp(3.2rem,5vw,5.8rem)] leading-[0.9] tracking-[-0.04em]">
          The numbers matter.<br />
          <span className="text-white/38">So does the work behind them.</span>
        </h2>
        <p className="mt-7 max-w-[500px] text-[14px] leading-6 text-white/58">
          The firm reports more than {trustProfile.firmResults.totalRecovered} recovered for clients across personal injury matters. Its largest reported single-client recovery is {trustProfile.firmResults.largestRecovery}.
        </p>
        <a
          href="/results"
          className="mt-8 inline-flex min-h-11 items-center gap-2 bg-[#f3eee5] px-5 py-3 text-[11px] font-medium text-[#17130f]"
        >
          View Case Results <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <div className="mt-12 grid grid-cols-2 border-y border-white/12">
          <div className="py-6 pr-5 sm:py-7">
            <div className="editorial-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-none tracking-[-0.045em]">
              {trustProfile.firmResults.totalRecovered}
            </div>
            <div className="mt-3 text-[9px] uppercase tracking-[0.15em] text-white/34">Recovered for clients</div>
          </div>
          <div className="border-l border-white/12 py-6 pl-5 sm:py-7 sm:pl-7">
            <div className="editorial-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-none tracking-[-0.045em]">
              {trustProfile.firmResults.largestRecovery}
            </div>
            <div className="mt-3 text-[9px] uppercase tracking-[0.15em] text-white/34">Largest single-client recovery</div>
          </div>
        </div>

        <p className="mt-5 max-w-[520px] text-[9px] leading-4 text-white/28">
          Prior results do not guarantee a similar outcome. Every matter depends on its own facts, damages, insurance, evidence, and circumstances.
        </p>
      </div>

      <div className="relative min-h-[58svh] overflow-hidden rounded-[3px] bg-[#1c1b18] lg:h-[78svh] lg:max-h-[820px]">
        <img src={boardroomImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/5 to-black/12" />
        <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
          <div className="max-w-[520px] border-t border-white/24 pt-5">
            <p className="editorial-serif text-[clamp(1.8rem,3vw,3.4rem)] leading-[1.02]">
              Real results belong in context—not as a promise about what happens next.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SelectedResult;
