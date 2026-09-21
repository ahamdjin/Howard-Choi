import { ArrowUpRight } from "lucide-react";
import carImage from "@/assets/law-firm/car-collision.jpg";
import truckImage from "@/assets/law-firm/truck-highway.jpg";
import motorcycleImage from "@/assets/law-firm/motorcycle-road.jpg";
import pedestrianImage from "@/assets/law-firm/pedestrian-crossing.jpg";
import medicalImage from "@/assets/law-firm/medical-care.jpg";
import familyImage from "@/assets/law-firm/family-support.jpg";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";

const HomepageDesignGallery = () => (
  <div className="bg-[#171717]">

    {/* Selected Practice Areas concept */}
    <section className="relative mx-auto h-[96svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#f4f0e8] text-[#191612]">
      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20">
        <div className="mb-7 text-center">
          <p className="text-[8px] uppercase tracking-[0.2em] text-black/32">Personal injury practice areas</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5.2vw,5.5rem)] leading-[0.9] tracking-[-0.045em]">
            See the claim.<br />
            <span className="text-black/34">Then explore the details.</span>
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
          <a href="/practice-areas/personal-injury" className="underline-offset-4 hover:underline">Personal Injury</a>
          <a href="/practice-areas/rideshare-accidents" className="underline-offset-4 hover:underline">Uber & Lyft</a>
          <a href="/practice-areas/slip-and-fall" className="underline-offset-4 hover:underline">Slip & Fall</a>
          <a href="/practice-areas/wrongful-death" className="underline-offset-4 hover:underline">Wrongful Death</a>
          <a href="/practice-areas" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
            All practices <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>

    {/* Useful PI information — still a concept for later refinement */}
    <section className="relative mx-auto h-[96svh] min-h-[740px] max-h-[1000px] w-full overflow-hidden bg-[#181715] text-white">
      <div className="site-shell flex h-full w-full flex-col items-center justify-center py-20">
        <div className="mb-9 text-center">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/36">Before your first call</p>
          <h2 className="editorial-serif mt-3 text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.9] tracking-[-0.045em]">
            Four things worth<br />
            <span className="text-white/38">knowing early.</span>
          </h2>
        </div>

        <div className="grid w-full max-w-[1180px] grid-cols-2 gap-2 md:grid-cols-4">
          <a href="/blogs" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
            <img src={carImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/10" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
              <span className="text-[8px] text-white/42">01</span>
              <h3 className="editorial-serif mt-2 text-[clamp(1.15rem,1.8vw,1.8rem)] leading-[1.02]">What to do after an accident</h3>
            </div>
          </a>

          <a href="/blogs" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
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

          <a href="/blogs" className="group relative h-[250px] overflow-hidden rounded-[3px] md:h-[340px]">
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
