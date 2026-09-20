import { ArrowRight, ArrowUpRight } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";
import carCollisionImage from "@/assets/law-firm/car-collision.jpg";
import motorcycleImage from "@/assets/law-firm/motorcycle-road.jpg";
import wetFloorImage from "@/assets/law-firm/wet-floor.jpg";
import cityImage from "@/assets/law-firm/hero-city-boardroom.webp";
import { practiceAreas, serviceLocations } from "@/data/injurySite";

const reviewLabel = "Design concept · for review";

const HomepageDesignConcepts = () => (
  <div className="bg-[#f7f6f3] text-foreground">
    <section className="flex min-h-[36svh] items-end border-t border-foreground/12 bg-[#f7f6f3]">
      <div className="site-shell w-full py-14 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/34">Experimental homepage sections</div>
        <h2 className="editorial-serif mt-4 max-w-[900px] text-[clamp(2.5rem,5vw,5.3rem)] leading-[0.94] tracking-[-0.035em]">
          New sections only.<br />
          <span className="text-foreground/38">Choose what earns a place on the homepage.</span>
        </h2>
      </div>
    </section>

    {/* CONCEPT 01 — IMAGE-LED ATTORNEY / TRUST */}
    <section className="grid min-h-[100svh] bg-[#f3efe8] lg:grid-cols-[0.48fr_0.52fr]">
      <div className="relative min-h-[58svh] overflow-hidden lg:min-h-[100svh]">
        <img
          src={leadCounselImage}
          alt="Howard Choi, California personal injury attorney"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[0.18em] text-white/64 md:bottom-8 md:left-8">
          Howard Choi · California Attorney
        </div>
      </div>

      <div className="site-shell flex min-h-[72svh] flex-col justify-between py-10 lg:min-h-[100svh] lg:px-12 lg:py-12 xl:px-16">
        <div className="flex items-center justify-between border-t border-foreground/14 pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">01 · {reviewLabel}</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">Attorney / Trust</span>
        </div>

        <div className="py-16 lg:py-10">
          <h2 className="editorial-serif max-w-[720px] text-[clamp(3.2rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.045em]">
            Howard<br />Choi.
          </h2>
          <p className="mt-6 max-w-[520px] text-[14px] leading-7 text-foreground/56">
            California personal injury attorney serving clients from the firm&apos;s Buena Park office.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {["BAR NO. 284364", "ENGLISH / KOREAN", "FREE CONSULTATION", "CONTINGENCY FEE"].map((item) => (
              <span key={item} className="rounded-full border border-foreground/18 px-4 py-2.5 text-[9px] font-medium tracking-[0.11em] text-foreground/66">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-5 border-t border-foreground/14 pt-5">
          <a href="/attorney" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
            View Attorney Profile <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] text-foreground/54 underline underline-offset-4">
            Verify State Bar <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* CONCEPT 02 — EDITORIAL PRACTICE INDEX + IMAGE MOSAIC */}
    <section className="min-h-[100svh] bg-[#171717] text-white">
      <div className="site-shell flex min-h-[100svh] flex-col py-10 md:py-12">
        <div className="flex items-center justify-between border-t border-white/14 pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/34">02 · {reviewLabel}</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/34">Practice Areas</span>
        </div>

        <div className="grid flex-1 gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="grid min-h-[520px] grid-cols-2 grid-rows-2 gap-2 lg:min-h-0">
            <div className="relative row-span-2 overflow-hidden">
              <img src={carCollisionImage} alt="Vehicle collision" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/12" />
            </div>
            <div className="relative overflow-hidden">
              <img src={motorcycleImage} alt="Motorcycle roadway" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/12" />
            </div>
            <div className="relative overflow-hidden">
              <img src={wetFloorImage} alt="Premises hazard" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/12" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-7 text-[10px] uppercase tracking-[0.18em] text-white/36">What we handle</div>
            <div className="border-t border-white/14">
              {practiceAreas.map((practice, index) => (
                <a
                  key={practice.slug}
                  href={`/practice-areas/${practice.slug}`}
                  className="group grid grid-cols-[34px_1fr_auto] items-center border-b border-white/12 py-4 md:py-5"
                >
                  <span className="text-[9px] text-white/26">{String(index + 1).padStart(2, "0")}</span>
                  <span className="editorial-serif text-[clamp(1.45rem,2.2vw,2.45rem)] leading-none tracking-[-0.025em] text-white/88 transition-colors group-hover:text-white">
                    {practice.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/28 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CONCEPT 03 — TYPOGRAPHIC CREDENTIAL / FEE STATEMENT */}
    <section className="flex min-h-[100svh] items-center bg-[#efeae2] text-foreground">
      <div className="site-shell w-full py-12">
        <div className="flex items-center justify-between border-t border-foreground/14 pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">03 · {reviewLabel}</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">Trust / Fees / Credentials</span>
        </div>

        <div className="py-[10vh]">
          {[
            ["FREE", "CONSULTATION"],
            ["CONTINGENCY", "FEE"],
            ["CALIFORNIA BAR", "284364"],
            ["ENGLISH", "+ KOREAN"],
          ].map(([left, right], index) => (
            <div key={left} className="grid border-b border-foreground/12 py-5 sm:grid-cols-[1fr_auto] sm:items-end md:py-7">
              <div className="editorial-serif text-[clamp(2.7rem,6vw,7rem)] leading-[0.85] tracking-[-0.05em]">{left}</div>
              <div className={`editorial-serif mt-2 text-[clamp(2rem,4.2vw,4.8rem)] leading-[0.9] tracking-[-0.04em] sm:mt-0 ${index === 1 ? "text-foreground/38" : "text-foreground/42"}`}>
                {right}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-foreground/14 pt-5">
          <p className="max-w-[520px] text-[11px] leading-5 text-foreground/46">
            A visual trust section that can later hold verified award or association marks without turning the page into a wall of text.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
            Start a free consultation <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* CONCEPT 04 — LARGE WHITESPACE SERVICE-AREA INDEX */}
    <section className="relative flex min-h-[100svh] overflow-hidden bg-[#f8f7f4] text-foreground">
      <img src={cityImage} alt="" className="absolute bottom-0 right-0 h-[34%] w-[38%] object-cover opacity-[0.16] grayscale" />
      <div className="site-shell relative z-10 flex min-h-[100svh] w-full flex-col py-10 md:py-12">
        <div className="flex items-center justify-between border-t border-foreground/14 pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">04 · {reviewLabel}</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">Areas Served</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16">
          <div className="max-w-[1000px]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/34">Based in Buena Park</div>
            <h2 className="editorial-serif mt-5 text-[clamp(3.4rem,7vw,7.6rem)] leading-[0.87] tracking-[-0.05em]">
              Close enough<br />
              <span className="text-foreground/34">to stay connected.</span>
            </h2>
          </div>

          <div className="mt-14 flex max-w-[1180px] flex-wrap gap-x-3 gap-y-3 md:mt-16 md:gap-x-5 md:gap-y-4">
            {serviceLocations.slice(0, 8).map((location, index) => (
              <span key={location.slug} className="inline-flex items-center">
                <a href={`/locations/${location.slug}`} className="editorial-serif text-[clamp(1.8rem,3.6vw,4rem)] leading-none tracking-[-0.035em] transition-opacity hover:opacity-45">
                  {location.name}
                </a>
                {index < 7 ? <span className="mx-3 text-[clamp(1.4rem,2vw,2.2rem)] text-foreground/16 md:mx-5">/</span> : null}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-foreground/14 pt-5">
          <p className="text-[11px] text-foreground/42">Orange County + nearby Los Angeles County communities</p>
          <a href="/locations" className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
            View all locations <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* CONCEPT 05 — IMAGE-LED EDITORIAL RESOURCE SECTION */}
    <section className="grid min-h-[100svh] bg-[#f3efe8] text-foreground lg:grid-cols-[0.44fr_0.56fr]">
      <div className="relative min-h-[48svh] overflow-hidden lg:min-h-[100svh]">
        <img src={carCollisionImage} alt="Collision scene representing personal injury resources" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#17130f]/20" />
        <div className="absolute inset-x-6 bottom-6 text-white md:inset-x-8 md:bottom-8">
          <div className="text-[9px] uppercase tracking-[0.18em] text-white/60">Before your first call</div>
          <div className="editorial-serif mt-3 max-w-[480px] text-[clamp(2.4rem,4vw,4.6rem)] leading-[0.92] tracking-[-0.035em]">
            Know what matters early.
          </div>
        </div>
      </div>

      <div className="site-shell flex min-h-[72svh] flex-col py-10 lg:min-h-[100svh] lg:px-12 lg:py-12 xl:px-16">
        <div className="flex items-center justify-between border-t border-foreground/14 pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">05 · {reviewLabel}</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-foreground/34">Editorial Resources</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          {[
            ["01", "What should I do after an accident?", "/blogs/what-to-do-after-a-car-accident-in-california"],
            ["02", "How long do I have to take legal action?", "/blogs/california-personal-injury-deadlines"],
            ["03", "What insurance may apply?", "/practice-areas/car-accidents"],
            ["04", "What affects the value of an injury claim?", "/case-value-calculator"],
          ].map(([number, title, href]) => (
            <a key={number} href={href} className="group grid grid-cols-[38px_1fr_auto] items-center border-b border-foreground/12 py-6 md:py-7">
              <span className="text-[9px] text-foreground/26">{number}</span>
              <span className="editorial-serif text-[clamp(1.45rem,2.35vw,2.55rem)] leading-[1.04] tracking-[-0.025em]">{title}</span>
              <ArrowUpRight className="h-4 w-4 text-foreground/28 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>

        <div className="border-t border-foreground/14 pt-5 text-[11px] leading-5 text-foreground/42">
          Short, useful entry points instead of another wall of legal copy.
        </div>
      </div>
    </section>
  </div>
);

export default HomepageDesignConcepts;
