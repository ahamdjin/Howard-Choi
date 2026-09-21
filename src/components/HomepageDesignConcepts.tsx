import { ArrowRight, ArrowUpRight } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";
import logo from "@/assets/law-firm/howard-choi-logo.png";
import carImage from "@/assets/law-firm/car-collision.jpg";
import truckImage from "@/assets/law-firm/truck-highway.jpg";
import motorcycleImage from "@/assets/law-firm/motorcycle-road.jpg";
import pedestrianImage from "@/assets/law-firm/pedestrian-crossing.jpg";
import medicalImage from "@/assets/law-firm/medical-care.jpg";
import familyImage from "@/assets/law-firm/family-support.jpg";
import courtImage from "@/assets/law-firm/hero-courthouse.webp";
import cityImage from "@/assets/law-firm/hero-city-boardroom.webp";
import { practiceAreas, serviceLocations } from "@/data/injurySite";

const demoMarks = [
  { top: "DEMO", main: "SUPER", bottom: "LAWYERS" },
  { top: "DEMO", main: "AVVO", bottom: "RATING" },
  { top: "DEMO", main: "TOP", bottom: "ATTORNEY" },
];

const ConceptHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="absolute left-6 right-6 top-6 z-30 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] md:left-9 md:right-9 md:top-8">
    <span className="rounded-full bg-black/55 px-3 py-2 text-white/76 backdrop-blur-md">Concept {number}</span>
    <span className="rounded-full bg-black/55 px-3 py-2 text-white/60 backdrop-blur-md">{title}</span>
  </div>
);

const DemoMark = ({ top, main, bottom }: { top: string; main: string; bottom: string }) => (
  <div className="flex h-[94px] w-[94px] shrink-0 flex-col items-center justify-center rounded-full border border-white/28 bg-black/20 text-center text-white backdrop-blur-md md:h-[112px] md:w-[112px]">
    <span className="text-[7px] tracking-[0.22em] text-white/50">{top}</span>
    <span className="editorial-serif mt-1 text-[20px] leading-none md:text-[24px]">{main}</span>
    <span className="mt-1 text-[7px] tracking-[0.14em] text-white/58">{bottom}</span>
  </div>
);

const HomepageDesignConcepts = () => (
  <div className="bg-[#f6f3ee] text-foreground">

    {/* CONCEPT A — ATTORNEY / TRUST. Image-led, centered, brand + demo recognition marks. */}
    <section className="relative mx-auto flex h-[96svh] min-h-[720px] max-h-[980px] w-full items-center overflow-hidden bg-[#191713] text-white">
      <ConceptHeader number="A" title="Attorney / Trust" />

      <div className="absolute inset-0">
        <img src={leadCounselImage} alt="Howard Choi, California personal injury attorney" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.14)_45%,rgba(0,0,0,.58)_100%)]" />
      </div>

      <div className="site-shell relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <img src={logo} alt="Buena Park Injury Lawyer" className="mb-7 h-auto w-[150px] object-contain brightness-0 invert md:w-[190px]" />

        <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">California personal injury attorney</p>
        <h2 className="editorial-serif mt-4 text-[clamp(3.7rem,8vw,8.2rem)] leading-[0.82] tracking-[-0.055em]">
          Howard Choi
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {["BAR NO. 284364", "ENGLISH / KOREAN", "FREE CONSULTATION", "CONTINGENCY FEE"].map((item) => (
            <span key={item} className="rounded-full border border-white/24 bg-black/18 px-4 py-2.5 text-[8px] tracking-[0.15em] text-white/72 backdrop-blur-md">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 md:gap-5">
          {demoMarks.map((mark) => <DemoMark key={mark.main} {...mark} />)}
        </div>
        <div className="mt-3 text-[7px] uppercase tracking-[0.2em] text-white/34">Demo recognition marks · replace with verified awards</div>

        <div className="mt-9 flex flex-wrap justify-center gap-5">
          <a href="/attorney" className="inline-flex items-center gap-2 border-b border-white/52 pb-1 text-[11px] text-white">
            Attorney profile <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-white/24 pb-1 text-[11px] text-white/64">
            State Bar record <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* CONCEPT B — PRACTICE AREAS. Central image stage, visual filmstrip, minimal copy. */}
    <section className="relative mx-auto h-[98svh] min-h-[720px] max-h-[1000px] w-full overflow-hidden bg-[#f5f1ea] text-[#1b1814]">
      <div className="absolute left-6 right-6 top-6 z-30 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] md:left-9 md:right-9 md:top-8">
        <span className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-black/56 backdrop-blur">Concept B</span>
        <span className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-black/42 backdrop-blur">Practice Areas</span>
      </div>

      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20">
        <div className="mb-7 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-black/34">What we handle</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.92] tracking-[-0.04em]">
            Personal injury,<br /><span className="text-black/34">shown before explained.</span>
          </h2>
        </div>

        <div className="relative h-[48vh] min-h-[340px] max-h-[500px] w-full max-w-[1120px] overflow-hidden rounded-[3px] bg-black">
          <img src={carImage} alt="Car collision representing personal injury claims" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/4 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white md:p-8">
            <div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-white/50">Featured practice</div>
              <div className="editorial-serif mt-2 text-[clamp(2rem,4vw,4.3rem)] leading-none">Car Accidents</div>
            </div>
            <a href="/practice-areas/car-accidents" className="hidden items-center gap-2 text-[10px] underline underline-offset-4 sm:inline-flex">
              Explore <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-3 grid w-full max-w-[1120px] grid-cols-4 gap-2">
          {[
            [truckImage, "Truck", "truck-accidents"],
            [motorcycleImage, "Motorcycle", "motorcycle-accidents"],
            [pedestrianImage, "Pedestrian", "pedestrian-accidents"],
            [medicalImage, "Serious Injury", "serious-injuries"],
          ].map(([image, title, slug]) => (
            <a key={slug} href={`/practice-areas/${slug}`} className="group relative h-[86px] overflow-hidden rounded-[2px] bg-black md:h-[110px]">
              <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-black/36" />
              <span className="absolute inset-x-3 bottom-3 text-[9px] font-medium text-white md:text-[10px]">{title}</span>
            </a>
          ))}
        </div>

        <div className="mt-5 flex max-w-[1120px] flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] text-black/46">
          {practiceAreas.map((practice) => (
            <a key={practice.slug} href={`/practice-areas/${practice.slug}`} className="underline-offset-4 hover:underline">{practice.title}</a>
          ))}
        </div>
      </div>
    </section>

    {/* CONCEPT C — RECOGNITION / FEE. A central brand composition with imagery, logo and seals. */}
    <section className="relative mx-auto h-[92svh] min-h-[700px] max-h-[920px] w-full overflow-hidden bg-[#221f1b] text-white">
      <ConceptHeader number="C" title="Recognition / Fees" />

      <img src={courtImage} alt="Courthouse interior" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-[#17130f]/58" />

      <div className="site-shell relative z-10 flex h-full w-full items-center justify-center py-16">
        <div className="w-full max-w-[1060px] text-center">
          <img src={logo} alt="Buena Park Injury Lawyer" className="mx-auto h-auto w-[140px] brightness-0 invert md:w-[180px]" />
          <div className="mx-auto mt-7 max-w-[840px]">
            <h2 className="editorial-serif text-[clamp(3.2rem,6vw,6.8rem)] leading-[0.86] tracking-[-0.05em]">
              No fee unless<br /><span className="text-white/42">there is a recovery.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[520px] text-[12px] leading-6 text-white/58">
              Free consultations and contingency-fee representation, presented as a visual trust statement rather than another paragraph-heavy section.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-[650px] items-center justify-center gap-4 md:gap-7">
            {demoMarks.map((mark) => <DemoMark key={`c-${mark.main}`} {...mark} />)}
          </div>
          <div className="mt-3 text-[7px] uppercase tracking-[0.2em] text-white/30">Demo award marks only</div>

          <a href="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[11px] font-medium text-black">
            Free consultation <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* CONCEPT D — AREAS SERVED. Image is central, cities frame it. */}
    <section className="relative mx-auto h-[96svh] min-h-[720px] max-h-[980px] w-full overflow-hidden bg-[#f7f5f1] text-[#1c1915]">
      <div className="absolute left-6 right-6 top-6 z-30 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] md:left-9 md:right-9 md:top-8">
        <span className="rounded-full border border-black/10 bg-white/85 px-3 py-2 text-black/56 backdrop-blur">Concept D</span>
        <span className="rounded-full border border-black/10 bg-white/85 px-3 py-2 text-black/42 backdrop-blur">Areas Served</span>
      </div>

      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20 text-center">
        <div className="relative h-[55vh] min-h-[390px] max-h-[560px] w-full max-w-[980px] overflow-hidden rounded-[3px]">
          <img src={cityImage} alt="Southern California city view representing nearby service areas" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/24" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
            <img src={logo} alt="" className="mb-5 h-auto w-[110px] brightness-0 invert opacity-90 md:w-[140px]" />
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/58">Based in Buena Park</div>
            <h2 className="editorial-serif mt-3 text-[clamp(3rem,6vw,6.4rem)] leading-[0.86] tracking-[-0.05em]">
              Nearby when<br />it matters.
            </h2>
          </div>
        </div>

        <div className="mt-7 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {serviceLocations.slice(0, 8).map((location) => (
            <a key={location.slug} href={`/locations/${location.slug}`} className="editorial-serif text-[clamp(1.25rem,2.1vw,2.15rem)] leading-none tracking-[-0.025em] text-black/70 transition-opacity hover:opacity-40">
              {location.name}
            </a>
          ))}
        </div>

        <a href="/locations" className="mt-6 inline-flex items-center gap-2 text-[10px] underline underline-offset-4">
          View all service areas <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>

    {/* CONCEPT E — EDITORIAL RESOURCE GALLERY. Every item uses imagery. */}
    <section className="relative mx-auto h-[98svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#181715] text-white">
      <ConceptHeader number="E" title="Useful PI Information" />

      <div className="site-shell flex h-full w-full flex-col justify-center py-20">
        <div className="mx-auto mb-9 max-w-[760px] text-center">
          <img src={logo} alt="" className="mx-auto mb-5 h-auto w-[105px] brightness-0 invert opacity-80" />
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/38">Before your first call</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.9] tracking-[-0.045em]">
            Four things worth<br /><span className="text-white/38">knowing early.</span>
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-2 md:grid-cols-4">
          {[
            [carImage, "01", "What to do after an accident", "/blogs/what-to-do-after-a-car-accident-in-california"],
            [courtImage, "02", "California injury deadlines", "/blogs/california-personal-injury-deadlines"],
            [medicalImage, "03", "Insurance & medical evidence", "/practice-areas/car-accidents"],
            [familyImage, "04", "What affects claim value", "/case-value-calculator"],
          ].map(([image, number, title, href]) => (
            <a key={number} href={href} className="group relative h-[250px] overflow-hidden rounded-[2px] md:h-[340px]">
              <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/5 to-black/8" />
              <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <div className="text-[8px] text-white/42">{number}</div>
                <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">{title}</h3>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/48 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default HomepageDesignConcepts;
