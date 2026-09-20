import { ArrowRight, ArrowUpRight } from "lucide-react";
import logo from "@/assets/law-firm/howard-choi-logo.png";
import howardImage from "@/assets/law-firm/lead-counsel.avif";
import carImage from "@/assets/law-firm/car-collision.jpg";
import truckImage from "@/assets/law-firm/truck-highway.jpg";
import motorcycleImage from "@/assets/law-firm/motorcycle-road.jpg";
import pedestrianImage from "@/assets/law-firm/pedestrian-crossing.jpg";
import medicalImage from "@/assets/law-firm/medical-care.jpg";
import familyImage from "@/assets/law-firm/family-support.jpg";
import cityImage from "@/assets/law-firm/hero-city-boardroom.webp";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";

const studyPill = "rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md";

const DemoBadge = ({ title, sub }: { title: string; sub: string }) => (
  <div className="flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full border border-white/28 bg-black/25 text-center text-white backdrop-blur-md md:h-[112px] md:w-[112px]">
    <span className="text-[7px] uppercase tracking-[0.2em] text-white/42">Demo only</span>
    <span className="editorial-serif mt-1 text-[18px] leading-none md:text-[22px]">{title}</span>
    <span className="mt-1 text-[7px] uppercase tracking-[0.12em] text-white/52">{sub}</span>
  </div>
);

const HomepageDesignGallery = () => (
  <div className="bg-[#171717]">

    {/* A — Attorney / trust */}
    <section className="relative mx-auto flex h-[94svh] min-h-[720px] max-h-[980px] w-full items-center justify-center overflow-hidden bg-[#161513] text-white">
      <img src={howardImage} alt="Howard Choi, California personal injury attorney" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/52" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.08)_42%,rgba(0,0,0,.58)_100%)]" />

      <div className="absolute left-7 right-7 top-7 z-20 flex items-center justify-between md:left-10 md:right-10 md:top-9">
        <span className={studyPill}>Study A</span>
        <span className={studyPill}>Attorney + trust</span>
      </div>

      <div className="site-shell relative z-10 flex w-full flex-col items-center text-center">
        <img src={logo} alt="Buena Park Injury Lawyer" className="h-auto w-[142px] brightness-0 invert md:w-[184px]" />
        <p className="mt-7 text-[9px] uppercase tracking-[0.22em] text-white/52">California personal injury attorney</p>
        <h2 className="editorial-serif mt-4 text-[clamp(3.7rem,8vw,8.4rem)] leading-[0.82] tracking-[-0.055em]">Howard Choi</h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="rounded-full border border-white/24 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/72 backdrop-blur">Bar No. 284364</span>
          <span className="rounded-full border border-white/24 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/72 backdrop-blur">English / Korean</span>
          <span className="rounded-full border border-white/24 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/72 backdrop-blur">Free consultation</span>
          <span className="rounded-full border border-white/24 bg-black/20 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/72 backdrop-blur">Contingency fee</span>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 md:gap-5">
          <DemoBadge title="TOP" sub="Attorney" />
          <DemoBadge title="10.0" sub="Rating" />
          <DemoBadge title="2026" sub="Recognition" />
        </div>

        <p className="mt-3 text-[7px] uppercase tracking-[0.19em] text-white/30">Demo recognition marks for layout only</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <a href="/attorney" className="inline-flex items-center gap-2 border-b border-white/48 pb-1 text-[11px] text-white">
            Attorney profile <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-white/24 pb-1 text-[11px] text-white/62">
            State Bar record <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* B — Visual practice areas */}
    <section className="relative mx-auto h-[96svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#f4f0e8] text-[#191612]">
      <div className="absolute left-7 right-7 top-7 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-9">
        <span className="rounded-full border border-black/10 bg-white/82 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-black/56 backdrop-blur">Study B</span>
        <span className="rounded-full border border-black/10 bg-white/82 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-black/44 backdrop-blur">Practice areas</span>
      </div>

      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20">
        <div className="mb-7 text-center">
          <img src={logo} alt="" className="mx-auto mb-5 h-auto w-[105px] opacity-65" />
          <p className="text-[8px] uppercase tracking-[0.2em] text-black/32">Personal injury practice areas</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5.2vw,5.5rem)] leading-[0.9] tracking-[-0.045em]">
            See the claim.<br /><span className="text-black/34">Then explore the details.</span>
          </h2>
        </div>

        <div className="grid h-[50vh] min-h-[360px] max-h-[520px] w-full max-w-[1180px] grid-cols-12 grid-rows-2 gap-2">
          <a href="/practice-areas/car-accidents" className="group relative col-span-7 row-span-2 overflow-hidden rounded-[3px] bg-black">
            <img src={carImage} alt="Car collision representing car accident claims" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/5" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white md:inset-x-7 md:bottom-7">
              <div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-white/48">Featured</span>
                <h3 className="editorial-serif mt-2 text-[clamp(2rem,4vw,4rem)] leading-none">Car Accidents</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 text-white/62" />
            </div>
          </a>

          <a href="/practice-areas/truck-accidents" className="group relative col-span-5 overflow-hidden rounded-[3px] bg-black">
            <img src={truckImage} alt="Truck on highway representing truck accident claims" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white md:bottom-5 md:left-5">
              <h3 className="editorial-serif text-[clamp(1.3rem,2vw,2rem)]">Truck Accidents</h3>
            </div>
          </a>

          <div className="col-span-5 grid grid-cols-3 gap-2">
            <a href="/practice-areas/motorcycle-accidents" className="group relative overflow-hidden rounded-[3px] bg-black">
              <img src={motorcycleImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/28" />
              <span className="absolute inset-x-3 bottom-3 text-[9px] font-medium text-white">Motorcycle</span>
            </a>
            <a href="/practice-areas/pedestrian-accidents" className="group relative overflow-hidden rounded-[3px] bg-black">
              <img src={pedestrianImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/28" />
              <span className="absolute inset-x-3 bottom-3 text-[9px] font-medium text-white">Pedestrian</span>
            </a>
            <a href="/practice-areas/serious-injuries" className="group relative overflow-hidden rounded-[3px] bg-black">
              <img src={medicalImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/28" />
              <span className="absolute inset-x-3 bottom-3 text-[9px] font-medium text-white">Serious Injury</span>
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] text-black/46">
          <a href="/practice-areas/rideshare-accidents" className="underline-offset-4 hover:underline">Uber & Lyft</a>
          <a href="/practice-areas/slip-and-fall" className="underline-offset-4 hover:underline">Slip & Fall</a>
          <a href="/practice-areas/wrongful-death" className="underline-offset-4 hover:underline">Wrongful Death</a>
          <a href="/practice-areas" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">All practices <ArrowUpRight className="h-3 w-3" /></a>
        </div>
      </div>
    </section>

    {/* C — Fee + recognition */}
    <section className="relative mx-auto flex h-[92svh] min-h-[700px] max-h-[940px] w-full items-center justify-center overflow-hidden bg-[#1c1916] text-white">
      <img src={courthouseImage} alt="Courthouse interior" className="absolute inset-0 h-full w-full object-cover opacity-48" />
      <div className="absolute inset-0 bg-[#17130f]/62" />

      <div className="absolute left-7 right-7 top-7 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-9">
        <span className={studyPill}>Study C</span>
        <span className={studyPill}>Fees + recognition</span>
      </div>

      <div className="site-shell relative z-10 flex w-full flex-col items-center text-center">
        <img src={logo} alt="Buena Park Injury Lawyer" className="h-auto w-[130px] brightness-0 invert md:w-[170px]" />
        <h2 className="editorial-serif mt-7 text-[clamp(3.2rem,6.8vw,7rem)] leading-[0.86] tracking-[-0.052em]">
          No fee unless<br /><span className="text-white/42">there is a recovery.</span>
        </h2>
        <p className="mt-6 max-w-[540px] text-[12px] leading-6 text-white/56">
          Free consultations. Contingency-fee representation. A simple visual statement instead of another wall of legal copy.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 md:gap-6">
          <DemoBadge title="TOP" sub="Attorney" />
          <DemoBadge title="10.0" sub="Rating" />
          <DemoBadge title="2026" sub="Recognition" />
        </div>
        <p className="mt-3 text-[7px] uppercase tracking-[0.19em] text-white/30">Demo recognition marks for layout only</p>

        <a href="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[11px] font-medium text-black">
          Free consultation <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>

    {/* D — Areas served */}
    <section className="relative mx-auto h-[94svh] min-h-[720px] max-h-[980px] w-full overflow-hidden bg-[#f6f3ed] text-[#1b1814]">
      <div className="absolute left-7 right-7 top-7 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-9">
        <span className="rounded-full border border-black/10 bg-white/82 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-black/56 backdrop-blur">Study D</span>
        <span className="rounded-full border border-black/10 bg-white/82 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-black/44 backdrop-blur">Areas served</span>
      </div>

      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20 text-center">
        <div className="relative h-[56vh] min-h-[400px] max-h-[570px] w-full max-w-[1020px] overflow-hidden rounded-[3px] bg-black">
          <img src={cityImage} alt="Southern California city view representing nearby communities" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
            <img src={logo} alt="" className="mb-6 h-auto w-[115px] brightness-0 invert md:w-[145px]" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/52">Based in Buena Park</p>
            <h2 className="editorial-serif mt-4 text-[clamp(3.1rem,6vw,6.2rem)] leading-[0.87] tracking-[-0.05em]">
              Nearby when<br />it matters.
            </h2>
          </div>
        </div>

        <div className="mt-7 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href="/locations/buena-park" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">Buena Park</a>
          <a href="/locations/anaheim" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">Anaheim</a>
          <a href="/locations/fullerton" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">Fullerton</a>
          <a href="/locations/garden-grove" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">Garden Grove</a>
          <a href="/locations/cerritos" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">Cerritos</a>
          <a href="/locations/la-mirada" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">La Mirada</a>
          <a href="/locations/la-habra" className="editorial-serif text-[clamp(1.2rem,2vw,2rem)]">La Habra</a>
        </div>

        <a href="/locations" className="mt-6 inline-flex items-center gap-2 text-[10px] underline underline-offset-4">
          View all service areas <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>

    {/* E — Visual resource index */}
    <section className="relative mx-auto h-[96svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#181715] text-white">
      <div className="absolute left-7 right-7 top-7 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-9">
        <span className={studyPill}>Study E</span>
        <span className={studyPill}>Useful PI information</span>
      </div>

      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20">
        <div className="mb-9 text-center">
          <img src={logo} alt="" className="mx-auto mb-5 h-auto w-[108px] brightness-0 invert opacity-80" />
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/36">Before your first call</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.9] tracking-[-0.045em]">
            Four things worth<br /><span className="text-white/38">knowing early.</span>
          </h2>
        </div>

        <div className="grid w-full max-w-[1180px] grid-cols-2 gap-2 md:grid-cols-4">
          <a href="/blogs/what-to-do-after-a-car-accident-in-california" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
            <img src={carImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <span className="text-[8px] text-white/42">01</span>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">What to do after an accident</h3>
            </div>
          </a>

          <a href="/blogs/california-personal-injury-deadlines" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
            <img src={courthouseImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <span className="text-[8px] text-white/42">02</span>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">California injury deadlines</h3>
            </div>
          </a>

          <a href="/practice-areas/car-accidents" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
            <img src={medicalImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <span className="text-[8px] text-white/42">03</span>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">Insurance & medical evidence</h3>
            </div>
          </a>

          <a href="/case-value-calculator" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
            <img src={familyImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <span className="text-[8px] text-white/42">04</span>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">What affects claim value</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default HomepageDesignGallery;
